/**
 * Metas do negócio (admin) — guardadas em `siteData/goals` e sincronizadas
 * entre a equipa. Cada meta tem um alvo e é medida contra os pedidos reais.
 */
import { useSyncExternalStore } from "react";

import { attachSync } from "@/lib/firebase/sync-store";

export type GoalMetric = "revenue" | "orders" | "products" | "customers";

export type Goal = {
  id: string;
  title: string;
  metric: GoalMetric;
  target: number;
  period: string; // ex.: "2026-08" ou "2026"
  note?: string;
  createdAt: string;
};

export const METRIC_LABEL: Record<GoalMetric, string> = {
  revenue: "Receita (Kz)",
  orders: "Pedidos",
  products: "Produtos publicados",
  customers: "Clientes",
};

const KEY = "shop_goals_v1";

function read(): Goal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "");
    return Array.isArray(raw) ? raw : [];
  } catch { return []; }
}

let list: Goal[] = read();
const empty: Goal[] = [];
const listeners = new Set<() => void>();

function cache() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
}

function emit() {
  cache();
  listeners.forEach((l) => l());
  sync.push();
}

const sync = attachSync<Goal[]>(
  "goals",
  () => list,
  (value) => {
    if (!Array.isArray(value)) return;
    list = value;
    cache();
    listeners.forEach((l) => l());
  },
);

export function useGoals(): Goal[] {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => list,
    () => empty,
  );
}

export const goalActions = {
  add(g: Omit<Goal, "id" | "createdAt">) {
    const goal: Goal = { ...g, id: `goal-${Date.now()}`, createdAt: new Date().toISOString() };
    list = [goal, ...list];
    emit();
    return goal.id;
  },
  update(id: string, patch: Partial<Goal>) {
    list = list.map((g) => (g.id === id ? { ...g, ...patch } : g));
    emit();
  },
  remove(id: string) {
    list = list.filter((g) => g.id !== id);
    emit();
  },
};
