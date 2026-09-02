import { useSyncExternalStore } from "react";
import { type Product } from "@/lib/products";
import { attachSync } from "@/lib/firebase/sync-store";
import { ensureDb } from "@/lib/firebase/client";
import { canSyncSiteData } from "@/lib/firebase/roles";
import { stripUndefined } from "@/lib/firebase/sanitize";

const KEY = "shop_custom_products_v1";

/** Cache local apenas dos dados REAIS já recebidos do banco (nunca demo). */
function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = JSON.parse(localStorage.getItem(key) || "");
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

let list: Product[] = read<Product[]>(KEY, []);
/** Estado de carregamento do catálogo (banco de dados). */
let status: "loading" | "ready" | "error" = list.length ? "ready" : "loading";

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((l) => l());
}

function cache() {
  if (typeof window !== "undefined")
    localStorage.setItem(KEY, JSON.stringify(list));
}

function emit() {
  cache();
  status = "ready";
  notify();
  sync.push();
}

const sync = attachSync<Product[]>(
  "catalog",
  () => list,
  (value) => {
    // Compatibilidade com o formato antigo ({ custom, hidden, overrides }).
    const next = Array.isArray(value)
      ? value
      : Array.isArray((value as { custom?: Product[] })?.custom)
        ? (value as { custom: Product[] }).custom
        : null;
    if (!next) return;
    list = next;
    status = "ready";
    cache();
    notify();
  },
);

let loading = false;

async function subscribe() {
  if (typeof window === "undefined" || loading) return;
  loading = true;
  const [db, { collection, getDocs }] = await Promise.all([
    ensureDb(),
    import("firebase/firestore"),
  ]);
  if (!db) {
    loading = false;
    status = "error";
    notify();
    return;
  }
  getDocs(collection(db, "products"))
    .then((snap) => {
      list = snap.docs.map((d) => ({ ...(d.data() as Product), id: d.id }));
      status = "ready";
      cache();
      notify();
    })
    .catch(() => {
      status = list.length ? "ready" : "error";
      notify();
    })
    .finally(() => {
      loading = false;
    });
}

if (typeof window !== "undefined") void subscribe();

/** Tenta ligar de novo ao banco (usado pelos estados de erro na UI). */
export function retryProducts() {
  status = "loading";
  notify();
  void subscribe();
}

async function publishProduct(product: Product): Promise<void> {
  const [db, { doc, setDoc }] = await Promise.all([
    ensureDb(),
    import("firebase/firestore"),
  ]);
  if (!db) throw new Error("Sem ligação ao banco de dados.");
  if (!canSyncSiteData())
    throw new Error(
      "Sem permissão para publicar. Entre com uma conta de gestor.",
    );
  await setDoc(
    doc(db, "products", product.id),
    stripUndefined(product) as Product,
  );
}

const EMPTY: Product[] = [];

export function useProductsStatus(): "loading" | "ready" | "error" {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => status,
    () => "loading" as const,
  );
}

export function useCustomProducts(): Product[] {
  return useAllProducts();
}

export function useAllProducts(): Product[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => list,
    () => EMPTY,
  );
}

export function getAnyProduct(id: string): Product | undefined {
  return list.find((p) => p.id === id);
}

export const productActions = {
  add(p: Omit<Product, "id">) {
    const product = { ...p, id: `cp-${Date.now()}` } as Product;
    list = [product, ...list];
    emit();
    return { id: product.id, published: publishProduct(product) };
  },
  async update(id: string, patch: Partial<Product>) {
    list = list.map((p) => (p.id === id ? { ...p, ...patch } : p));
    emit();
    const product = list.find((p) => p.id === id);
    if (product) await publishProduct(product);
  },
  async remove(id: string) {
    list = list.filter((p) => p.id !== id);
    emit();
    const [db, { deleteDoc, doc }] = await Promise.all([
      ensureDb(),
      import("firebase/firestore"),
    ]);
    if (db && canSyncSiteData()) await deleteDoc(doc(db, "products", id));
  },
  moveCategory(id: string, category: string, subcategory?: string) {
    return this.update(id, { category, subcategory });
  },
  /** Semeia o banco com o catálogo de demonstração (acção manual do gestor). */
  async seed(products: Product[]) {
    for (const p of products) await publishProduct(p);
  },
};
