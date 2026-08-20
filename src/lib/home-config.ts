import { useSyncExternalStore } from "react";
import { attachSync } from "@/lib/firebase/sync-store";

export type QuickStripItem = {
  id: string;
  label: string;
  image?: string;
  to?: string;
};

/** Aba principal da home (Mulher, Curve, Kids…) */
export type HomeTab = {
  id: string;
  label: string;
  slugs: string[];
  slideIds?: string[];
};

/** Tile lateral do hero em desktop */
export type HeroTile = {
  id: string;
  label: string;
  image?: string;
  slug?: string;
  badge?: string;
};

export type HomeConfig = {
  showQuickStrip: boolean;
  showCategories: boolean;
  showSuperOfertas: boolean;
  showViral: boolean;
  superTitle: string;
  viralTitle: string;
  superPicks: string[]; // product ids
  viralPicks: string[];
  storeName: string;
  currency: string;
  quickStripSaverLabel: string;
  quickStripSaverPrice: string;
  quickStripItems: QuickStripItem[];
  categoriesTitle: string;
  categoriesOrder: string[]; // category slugs; empty = default order
  homeTabs: HomeTab[];
  heroLeftTiles: HeroTile[];
  heroRightTiles: HeroTile[];
};

const KEY = "shop_home_config_v4";

const defaults: HomeConfig = {
  showQuickStrip: true,
  showCategories: true,
  showSuperOfertas: true,
  showViral: true,
  superTitle: "Super Ofertas",
  viralTitle: "Viral do Bazarixy",
  superPicks: [],
  viralPicks: [],
  storeName: "Bazarixy",
  currency: "Kz",
  quickStripSaverLabel: "Super Saver",
  quickStripSaverPrice: "Kz 600",
  quickStripItems: [
    { id: "q1", label: "Diário" },
    { id: "q2", label: "Férias" },
    { id: "q3", label: "Trabalho" },
    { id: "q4", label: "Noite" },
    { id: "q5", label: "Festa" },
  ],
  categoriesTitle: "Categorias",
  categoriesOrder: [],
  homeTabs: [
    { id: "t-all", label: "Tudo", slugs: [] },
    {
      id: "t-mulher",
      label: "Mulher",
      slugs: ["dresses", "tops", "skirts", "jumpsuits"],
    },
    { id: "t-curve", label: "Curve", slugs: ["dresses", "tops", "jumpsuits"] },
    { id: "t-kids", label: "Kids", slugs: ["outros"] },
    { id: "t-local", label: "Local", slugs: [] },
    { id: "t-jeans", label: "Jeans", slugs: ["denim", "pants"] },
    { id: "t-praia", label: "Praia", slugs: ["swim"] },
    { id: "t-trico", label: "Tricô", slugs: ["knit"] },
  ],
  heroLeftTiles: [
    { id: "hl1", label: "Mais Vendidos" },
    { id: "hl2", label: "Envio Nacional" },
    { id: "hl3", label: "Bazarixy Trends" },
  ],
  heroRightTiles: [
    { id: "hr1", label: "Elenzga", slug: "dresses", badge: "CURVE" },
    { id: "hr2", label: "Bazarixy BAE", slug: "tops", badge: "NEW" },
    { id: "hr3", label: "Bazarixy MOD", slug: "knit", badge: "TOP" },
  ],
};

function read(): HomeConfig {
  if (typeof window === "undefined") return defaults;
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return defaults;
  }
}

let cfg: HomeConfig = read();
const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined")
    localStorage.setItem(KEY, JSON.stringify(cfg));
  listeners.forEach((l) => l());
  sync.push();
}

const sync = attachSync<HomeConfig>(
  "homeConfig",
  () => cfg,
  (value) => {
    if (!value || typeof value !== "object") return;
    cfg = { ...defaults, ...value };
    if (typeof window !== "undefined")
      localStorage.setItem(KEY, JSON.stringify(cfg));
    listeners.forEach((l) => l());
  },
);

export function useHomeConfig(): HomeConfig {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => cfg,
    () => defaults,
  );
}

export const homeConfigActions = {
  update(patch: Partial<HomeConfig>) {
    cfg = { ...cfg, ...patch };
    emit();
  },
  reset() {
    cfg = defaults;
    emit();
  },
};

/* ------------------------------------------------------------------ aba activa
 * A aba escolhida na home é partilhada com o cabeçalho fixo, para que as
 * mesmas abas apareçam (e fiquem sincronizadas) no banner e ao rolar a página.
 */
let activeTab = 0;
const tabListeners = new Set<() => void>();

export function useActiveHomeTab(): number {
  return useSyncExternalStore(
    (l) => {
      tabListeners.add(l);
      return () => tabListeners.delete(l);
    },
    () => activeTab,
    () => 0,
  );
}

export function setActiveHomeTab(index: number) {
  if (activeTab === index) return;
  activeTab = index;
  tabListeners.forEach((l) => l());
}
