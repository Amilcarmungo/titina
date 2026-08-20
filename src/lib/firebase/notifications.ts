/**
 * Notificações por utilizador — `users/{uid}/notifications/{id}`.
 * Cada utilizador só lê/escreve as suas (regras do Firestore); a equipa pode
 * criar notificações para o dono de um pedido, nunca ler as de outros.
 */
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getDb } from "./client";
import {
  mergeRemoteNotifications,
  registerNotificationsBridge,
  type AppNotification,
} from "@/lib/notifications-store";

let stop: (() => void) | null = null;
let current: string | null = null;

export type PushableNotification = Omit<
  AppNotification,
  "id" | "createdAt" | "read"
> & { id?: string };

/** Cria (ou actualiza) uma notificação na conta indicada. */
export async function pushNotificationTo(uid: string, n: PushableNotification) {
  const db = getDb();
  if (!db || !uid) return;
  const id =
    n.id ?? `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  await setDoc(
    doc(db, "users", uid, "notifications", id),
    {
      kind: n.kind,
      title: n.title,
      body: n.body,
      href: n.href ?? null,
      read: false,
      createdAt: new Date().toLocaleDateString("pt-PT"),
      createdAtServer: serverTimestamp(),
    },
    { merge: true },
  ).catch(() => {});
}

/** Liga a lista de notificações à conta autenticada (tempo real). */
export function bindNotifications(uid: string | null) {
  if (current === uid) return;
  current = uid;
  stop?.();
  stop = null;
  if (!uid) {
    registerNotificationsBridge(null);
    return;
  }
  const db = getDb();
  if (!db) return;
  registerNotificationsBridge({
    markRead: (id) => {
      void updateDoc(doc(db, "users", uid, "notifications", id), {
        read: true,
      }).catch(() => {});
    },
    remove: (id) => {
      void deleteDoc(doc(db, "users", uid, "notifications", id)).catch(
        () => {},
      );
    },
    add: (n) => {
      void pushNotificationTo(uid, n);
    },
  });
  stop = onSnapshot(
    query(
      collection(db, "users", uid, "notifications"),
      orderBy("createdAtServer", "desc"),
    ),
    (snap) =>
      mergeRemoteNotifications(
        snap.docs.map((d) => {
          const data = d.data() as Omit<AppNotification, "id">;
          return { ...data, id: d.id };
        }),
      ),
    () => {},
  );
}
