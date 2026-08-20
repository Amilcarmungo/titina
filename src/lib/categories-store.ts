import { useSyncExternalStore } from "react";
import { seedCategories, type Category } from "@/lib/products";
import { attachSync } from "@/lib/firebase/sync-store";

export type CategoryFull = Category & {
  title?: string;
  subtitle?: string;
  subcategories: string[];
  subImages?: Record<string, string>;
};

const KEY = "shop_categories_v1";

/** Subcategorias sugeridas ao semear o banco com o catálogo de demonstração. */
const seedSubcats: Record<string, string[]> = {
  dresses: ["Midi", "Longo", "Curto", "Festa", "Casual"],
  tops: ["Blusas", "Camisetas", "Regatas", "Cropped"],
  pants: ["Cargo", "Alfaiataria", "Legging", "Wide-leg"],
  denim: ["Reta", "Skinny", "Wide", "Mom"],
  swim: ["Biquíni", "Maiô", "Saídas"],
  skirts: ["Mini", "Midi", "Longa"],
  jumpsuits: ["Curto", "Longo", "Festa"],
  knit: ["Cardigan", "Suéter", "Vestido"],
  beleza: ["Maquiagem", "Skincare", "Perfumes", "Pincéis"],
  eletronicos: ["Áudio", "Acessórios", "Smart Home"],
  casa: ["Cozinha", "Decoração", "Cama & Banho"],
  outros: ["Diversos"],
};

/** Categorias de demonstração — só entram no site se o gestor semear o banco. */
export const seedCategoriesFull: CategoryFull[] = seedCategories.map((c) => ({
  ...c,
  title: c.name,
  subtitle: "Coleção exclusiva",
  subcategories: seedSubcats[c.slug] ?? [],
}));

const EMPTY: CategoryFull[] = [];

function read(): CategoryFull[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "");
    if (Array.isArray(raw) && raw.length) return raw;
  } catch {}
  return EMPTY;
}

let list: CategoryFull[] = read();
let status: "loading" | "ready" | "error" = list.length ? "ready" : "loading";
const statusListeners = new Set<() => void>();
function setStatus(next: typeof status) {
  if (status === next) return;
  status = next;
  statusListeners.forEach((l) => l());
}

export function useCategoriesStatus(): "loading" | "ready" | "error" {
  return useSyncExternalStore(
    (l) => { statusListeners.add(l); return () => statusListeners.delete(l); },
    () => status,
    () => "loading" as const,
  );
}
const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l());
  setStatus("ready");
  sync.push();
}

const sync = attachSync<CategoryFull[]>("categories", () => list, (value) => {
  if (!Array.isArray(value)) return;
  list = value;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l());
  setStatus("ready");
}, {
  onSettled: (hasValue, failed) => setStatus(failed && !list.length ? "error" : hasValue || !failed ? "ready" : status),
});

export function useCategories(): CategoryFull[] {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => list,
    () => EMPTY,
  );
}

export function getCategory(slug: string): CategoryFull | undefined {
  return list.find((c) => c.slug === slug);
}

export const categoryActions = {
  add(c: Omit<CategoryFull, "subcategories"> & { subcategories?: string[] }) {
    list = [...list, { ...c, subcategories: c.subcategories ?? [] }];
    emit();
  },
  update(slug: string, patch: Partial<CategoryFull>) {
    list = list.map((c) => (c.slug === slug ? { ...c, ...patch } : c));
    emit();
  },
  remove(slug: string) {
    list = list.filter((c) => c.slug !== slug);
    emit();
  },
  addSub(slug: string, sub: string) {
    list = list.map((c) => c.slug === slug ? { ...c, subcategories: [...c.subcategories, sub] } : c);
    emit();
  },
  removeSub(slug: string, sub: string) {
    list = list.map((c) => c.slug === slug ? {
      ...c,
      subcategories: c.subcategories.filter(s => s !== sub),
      subImages: c.subImages ? Object.fromEntries(Object.entries(c.subImages).filter(([k]) => k !== sub)) : undefined,
    } : c);
    emit();
  },
  setSubImage(slug: string, sub: string, image: string) {
    list = list.map((c) => c.slug === slug ? { ...c, subImages: { ...(c.subImages ?? {}), [sub]: image } } : c);
    emit();
  },
  /** Semeia as categorias de demonstração no banco (acção manual do gestor). */
  seed() { list = seedCategoriesFull; emit(); },
};
