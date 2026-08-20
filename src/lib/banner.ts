import { useSyncExternalStore } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { type Product } from "@/lib/products";
import { useAllProducts } from "@/lib/products-store";
import { getDb } from "@/lib/firebase/client";
import { canSyncSiteData } from "@/lib/firebase/roles";
import { stripUndefined } from "@/lib/firebase/sanitize";
import { createRetrier } from "@/lib/firebase/retry";

export type SlideData = {
  id: string;
  img: string; // url do Storage
  overlay?: string; // imagem sem fundo (PNG) sobreposta no banner mobile
  title: string;
  subtitle: string;
  caption: string;
  cta: string;
  pickIds: string[];
};

export type Slide = SlideData & { picks: Product[] };

const KEY = "banner_slides_v1";
const EMPTY: SlideData[] = [];

/** Só dados reais: os banners vivem na coleção `banners` do banco. */
let slidesData: SlideData[] = (() => {
  if (typeof window === "undefined") return EMPTY;
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "");
    if (Array.isArray(s) && s.length) return s;
  } catch {
    return EMPTY;
  }
  return EMPTY;
})();

let status: "loading" | "ready" | "error" = slidesData.length
  ? "ready"
  : "loading";

const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined")
    localStorage.setItem(KEY, JSON.stringify(slidesData));
  status = "ready";
  listeners.forEach((l) => l());
}

let unsubscribe: (() => void) | null = null;
const retrier = createRetrier(() => {
  unsubscribe?.();
  unsubscribe = null;
  subscribe();
});

function subscribe() {
  if (typeof window === "undefined" || unsubscribe) return;
  const db = getDb();
  if (!db) {
    status = "error";
    listeners.forEach((l) => l());
    retrier.schedule();
    return;
  }
  unsubscribe = onSnapshot(
    collection(db, "banners"),
    (snap) => {
      slidesData = snap.docs.map((d) => ({
        ...(d.data() as SlideData),
        id: d.id,
      }));
      retrier.cancel();
      emit();
    },
    () => {
      status = slidesData.length ? "ready" : "error";
      listeners.forEach((l) => l());
      retrier.schedule();
    },
  );
}

if (typeof window !== "undefined") subscribe();

export function retryBanners() {
  unsubscribe?.();
  unsubscribe = null;
  status = "loading";
  listeners.forEach((l) => l());
  subscribe();
}

async function publishBanner(slide: SlideData): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Sem ligação ao banco de dados.");
  if (!canSyncSiteData())
    throw new Error("Sem permissão para publicar banners.");
  await setDoc(
    doc(db, "banners", slide.id),
    stripUndefined(slide) as SlideData,
  );
}

export function useBannersStatus(): "loading" | "ready" | "error" {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => status,
    () => "loading" as const,
  );
}

export function useSlidesRaw(): SlideData[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => slidesData,
    () => EMPTY,
  );
}

export function useSlides(): Slide[] {
  const raw = useSlidesRaw();
  const products = useAllProducts();
  return raw.map((s) => ({
    ...s,
    picks: (s.pickIds ?? [])
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean) as Product[],
  }));
}

export const slideActions = {
  add(s: Omit<SlideData, "id">) {
    const id = `b${Date.now()}`;
    slidesData = [...slidesData, { ...s, id }];
    emit();
    return { id, published: publishBanner({ ...s, id }) };
  },
  async update(id: string, patch: Partial<SlideData>) {
    slidesData = slidesData.map((s) => (s.id === id ? { ...s, ...patch } : s));
    emit();
    const slide = slidesData.find((s) => s.id === id);
    if (slide) await publishBanner(slide);
  },
  async remove(id: string) {
    slidesData = slidesData.filter((s) => s.id !== id);
    emit();
    const db = getDb();
    if (db && canSyncSiteData()) await deleteDoc(doc(db, "banners", id));
  },
};

// -------- Banner index (slide activo) --------
let currentIndex = 0;
const idxListeners = new Set<() => void>();

export function setBannerIndex(i: number) {
  const len = slidesData.length || 1;
  currentIndex = ((i % len) + len) % len;
  idxListeners.forEach((l) => l());
}

export function useBannerIndex() {
  return useSyncExternalStore(
    (l) => {
      idxListeners.add(l);
      return () => idxListeners.delete(l);
    },
    () => currentIndex,
    () => 0,
  );
}
