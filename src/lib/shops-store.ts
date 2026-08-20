import { useSyncExternalStore } from "react";
import { attachSync } from "@/lib/firebase/sync-store";

export type Shop = {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  cover?: string;
  description?: string;
  ownerName?: string;
  createdAt: string;
};

const KEY = "shop_shops_v1";

/** Nada de lojas fictícias: a lista real vem do banco de dados. */
const defaults: Shop[] = [];

function read(): Shop[] {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "");
    if (Array.isArray(raw) && raw.length) return raw;
  } catch {
    return defaults;
  }
  return defaults;
}

let list: Shop[] = read();
const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined")
    localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l());
  sync.push();
}

const sync = attachSync<Shop[]>(
  "shops",
  () => list,
  (value) => {
    if (!Array.isArray(value)) return;
    list = value;
    if (typeof window !== "undefined")
      localStorage.setItem(KEY, JSON.stringify(list));
    listeners.forEach((l) => l());
  },
);

export function useShops(): Shop[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => list,
    () => defaults,
  );
}

export function getShop(id: string): Shop | undefined {
  return list.find((s) => s.id === id);
}

export const shopActions = {
  add(s: Omit<Shop, "id" | "createdAt">) {
    const id = `sh-${Date.now()}`;
    list = [
      ...list,
      { ...s, id, createdAt: new Date().toLocaleDateString("pt-BR") },
    ];
    emit();
    return id;
  },
  update(id: string, patch: Partial<Shop>) {
    list = list.map((s) => (s.id === id ? { ...s, ...patch } : s));
    emit();
  },
  remove(id: string) {
    if (id === "main") return;
    list = list.filter((s) => s.id !== id);
    emit();
  },
};
