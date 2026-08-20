/**
 * Sincroniza os dados de gestão (catálogo, banners, categorias, lojas, cupões,
 * pagamentos, logística, home) entre o app e o Firestore.
 *
 *   siteData/{key} = { value, updatedAt, updatedBy }
 *
 * Leitura é pública (o catálogo é público); a escrita é restrita por função
 * nas regras do Firestore — o frontend nunca decide permissões.
 */
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { getDb } from "./client";
import { canSyncSiteData } from "./roles";
import { stripUndefined } from "./sanitize";
import { createRetrier } from "./retry";
import { getFirebaseAuth } from "./client";

export type SyncHandle = { push: () => void };

export type SyncOptions = {
  /** Chamado na primeira resposta do banco (com ou sem dados) e em caso de erro. */
  onSettled?: (hasValue: boolean, failed?: boolean) => void;
};

export function attachSync<T>(
  key: string,
  getLocal: () => T,
  setLocal: (value: T) => void,
  options?: SyncOptions,
): SyncHandle {
  let lastRemote = "";

  const push = () => {
    const db = getDb();
    if (!db || !canSyncSiteData()) return;
    const value = stripUndefined(getLocal());
    const json = JSON.stringify(value ?? null);
    if (json === lastRemote) return;
    lastRemote = json;
    void setDoc(
      doc(db, "siteData", key),
      {
        value,
        updatedAt: serverTimestamp(),
        updatedBy: getFirebaseAuth()?.currentUser?.uid ?? null,
      },
      { merge: true },
    ).catch(() => {
      lastRemote = "";
    });
  };

  if (typeof window !== "undefined") {
    let stop: (() => void) | null = null;
    const retrier = createRetrier(() => {
      stop?.();
      stop = null;
      start();
    });

    // Espera o app montar para não bloquear a hidratação.
    function start() {
      const db = getDb();
      if (!db) {
        options?.onSettled?.(false, true);
        retrier.schedule();
        return;
      }
      stop = onSnapshot(
        doc(db, "siteData", key),
        (snap) => {
          retrier.cancel();
          const value = snap.data()?.["value"];
          options?.onSettled?.(value !== undefined);
          if (value === undefined) return;
          const json = JSON.stringify(value);
          if (json === lastRemote) return;
          lastRemote = json;
          setLocal(value as T);
        },
        () => {
          options?.onSettled?.(false, true);
          retrier.schedule();
        },
      );
    }
    start();
  }

  return { push };
}
