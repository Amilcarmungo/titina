import { useSyncExternalStore } from "react";

export type NotificationKind =
  "order" | "delivery" | "coupon" | "product" | "system";

export type AppNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  href?: string | null;
};

/** Cada conta tem a sua própria cache — nunca partilhamos notificações. */
const keyFor = (uid: string) => `shop_notifications_v2:${uid}`;

const empty: AppNotification[] = [];

let owner: string | null = null;
let list: AppNotification[] = empty;
const listeners = new Set<() => void>();

function readFor(uid: string): AppNotification[] {
  if (typeof window === "undefined") return empty;
  try {
    const parsed = JSON.parse(localStorage.getItem(keyFor(uid)) || "[]");
    return Array.isArray(parsed) ? (parsed as AppNotification[]) : empty;
  } catch {
    return empty;
  }
}

function persist() {
  if (typeof window === "undefined" || !owner) return;
  localStorage.setItem(keyFor(owner), JSON.stringify(list.slice(0, 100)));
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

/** Troca de conta (ou logout): a lista anterior desaparece imediatamente. */
export function setNotificationsOwner(uid: string | null) {
  if (owner === uid) return;
  owner = uid;
  list = uid ? readFor(uid) : empty;
  listeners.forEach((l) => l());
}

type Bridge = {
  add: (n: Omit<AppNotification, "id" | "createdAt" | "read">) => void;
  markRead: (id: string) => void;
  remove: (id: string) => void;
};

let bridge: Bridge | null = null;
export function registerNotificationsBridge(next: Bridge | null) {
  bridge = next;
}

/** O backend manda: substitui a lista pelo que está no Firestore. */
export function mergeRemoteNotifications(remote: AppNotification[]) {
  list = remote;
  emit();
}

export function useNotifications(): AppNotification[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => list,
    () => empty,
  );
}

export function useUnreadCount(): number {
  const items = useNotifications();
  return items.filter((n) => !n.read).length;
}

export const notificationActions = {
  add(n: Omit<AppNotification, "id" | "createdAt" | "read">) {
    if (bridge) {
      bridge.add(n);
      return;
    }
    list = [
      {
        ...n,
        id: `n-${Date.now()}`,
        createdAt: new Date().toLocaleDateString("pt-PT"),
        read: false,
      },
      ...list,
    ];
    emit();
  },
  markRead(id: string) {
    list = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    emit();
    bridge?.markRead(id);
  },
  markAllRead() {
    const unread = list.filter((n) => !n.read).map((n) => n.id);
    list = list.map((n) => ({ ...n, read: true }));
    emit();
    unread.forEach((id) => bridge?.markRead(id));
  },
  remove(id: string) {
    list = list.filter((n) => n.id !== id);
    emit();
    bridge?.remove(id);
  },
  clear() {
    const ids = list.map((n) => n.id);
    list = [];
    emit();
    ids.forEach((id) => bridge?.remove(id));
  },
};
