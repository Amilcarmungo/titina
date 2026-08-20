/**
 * Seguir lojas — guardado por utilizador em `users/{uid}/follows/{shopId}`.
 * Sem sessão o botão pede login (nenhum dado anónimo é gravado).
 */
import { useSyncExternalStore } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { getDb } from "./client";

let ids: string[] = [];
const empty: string[] = [];
const listeners = new Set<() => void>();
let stop: (() => void) | null = null;
let current: string | null = null;

function emit(next: string[]) {
  ids = next;
  listeners.forEach((l) => l());
}

/** Liga a lista de lojas seguidas à conta autenticada. */
export function bindFollows(uid: string | null) {
  if (current === uid) return;
  current = uid;
  stop?.();
  stop = null;
  if (!uid) {
    emit(empty);
    return;
  }
  const db = getDb();
  if (!db) return;
  stop = onSnapshot(
    collection(db, "users", uid, "follows"),
    (snap) => emit(snap.docs.map((d) => d.id)),
    () => emit(empty),
  );
}

export function useFollowedShops(): string[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => ids,
    () => empty,
  );
}

export function isFollowing(shopId: string) {
  return ids.includes(shopId);
}

/** Alterna o seguir/deixar de seguir. Devolve o novo estado. */
export async function toggleFollow(
  shopId: string,
  shopName?: string,
): Promise<boolean> {
  const db = getDb();
  if (!db || !current) throw new Error("Entre na sua conta para seguir lojas.");
  const ref = doc(db, "users", current, "follows", shopId);
  const following = ids.includes(shopId);
  if (following) {
    emit(ids.filter((i) => i !== shopId));
    await deleteDoc(ref);
    return false;
  }
  emit([...ids, shopId]);
  await setDoc(ref, {
    shopId,
    shopName: shopName ?? null,
    createdAt: serverTimestamp(),
  });
  return true;
}
