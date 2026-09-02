import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import type { Order } from "@/lib/orders-store";

const STORAGE_KEY = "bazarixy_recommendation_signals_v1";
const SIGNAL_EVENT = "bazarixy:recommendation-signal";

type Signals = {
  viewed: string[];
  categories: Record<string, number>;
  views: Record<string, number>;
  searches: string[];
};

export type Recommendation = {
  product: Product;
  score: number;
  reason: string;
};

const emptySignals = (): Signals => ({
  viewed: [],
  categories: {},
  views: {},
  searches: [],
});

function readSignals(): Signals {
  if (typeof window === "undefined") return emptySignals();
  try {
    const value = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null",
    ) as Partial<Signals> | null;
    return {
      viewed: Array.isArray(value?.viewed) ? value.viewed : [],
      categories: value?.categories ?? {},
      views: value?.views ?? {},
      searches: readSearches(),
    };
  } catch {
    return emptySignals();
  }
}

function readSearches() {
  if (typeof window === "undefined") return [];
  try {
    const searches = JSON.parse(
      localStorage.getItem("search_recent_v1") || "[]",
    );
    return Array.isArray(searches)
      ? searches.filter((term): term is string => typeof term === "string")
      : [];
  } catch {
    return [];
  }
}

export function recordProductView(product: Product) {
  if (typeof window === "undefined") return;
  const current = readSignals();
  const viewed = [
    product.id,
    ...current.viewed.filter((id) => id !== product.id),
  ].slice(0, 30);
  const next: Signals = {
    viewed,
    categories: {
      ...current.categories,
      [product.category]: (current.categories[product.category] ?? 0) + 1,
    },
    views: {
      ...current.views,
      [product.id]: (current.views[product.id] ?? 0) + 1,
    },
    searches: current.searches,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(SIGNAL_EVENT));
}

export function recordSearchIntent(term: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SIGNAL_EVENT));
  }
}

export function useRecommendationSignals() {
  const [signals, setSignals] = useState<Signals>(readSignals);
  useEffect(() => {
    const refresh = () => setSignals(readSignals());
    window.addEventListener(SIGNAL_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SIGNAL_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return signals;
}

function purchasedIds(orders: Order[]) {
  return new Set(
    orders.flatMap((order) => order.items.map((item) => item.productId)),
  );
}

export function recommendProducts(
  products: Product[],
  options: {
    favorites?: string[];
    orders?: Order[];
    excludeIds?: Set<string>;
    limit?: number;
  } = {},
): Recommendation[] {
  const signals = readSignals();
  const favorites = new Set(options.favorites ?? []);
  const purchased = purchasedIds(options.orders ?? []);
  const excluded = options.excludeIds ?? new Set<string>();
  const maxViews = Math.max(1, ...Object.values(signals.views), 1);
  const maxSold = Math.max(1, ...products.map((product) => product.sold), 1);
  const scored = products
    .filter((product) => !excluded.has(product.id))
    .map((product) => {
      const searchIntent = signals.searches.some((term) =>
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(term.toLowerCase()),
      )
        ? 1
        : 0;
      const categoryInterest = Math.min(
        1,
        (signals.categories[product.category] ?? 0) / 5 + searchIntent * 0.5,
      );
      const viewHistory = Math.min(
        1,
        (signals.views[product.id] ?? 0) / maxViews,
      );
      const favorite = favorites.has(product.id) ? 1 : 0;
      const purchase = purchased.has(product.id) ? 1 : 0;
      const popularity = product.sold / maxSold;
      const novelty = 1 / (1 + Math.max(0, products.indexOf(product)) / 20);
      const discovery = signals.categories[product.category] ? 0 : 1;
      const score =
        categoryInterest * 0.3 +
        viewHistory * 0.2 +
        favorite * 0.2 +
        purchase * 0.15 +
        popularity * 0.05 +
        novelty * 0.05 +
        discovery * 0.05;
      let reason = "Uma escolha popular na Bazarixy";
      if (favorite) reason = "Está nos teus favoritos";
      else if (viewHistory) reason = "Porque viste este produto";
      else if (searchIntent) reason = "Relacionado com o que procuraste";
      else if (categoryInterest) reason = "Semelhante ao que tens explorado";
      else if (discovery) reason = "Fora do teu padrão habitual";
      return { product, score, reason };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, options.limit ?? 8);
}

export function recommendationSections(
  products: Product[],
  options: { favorites?: string[]; orders?: Order[] } = {},
) {
  const signals = readSignals();
  const viewed = new Set(signals.viewed);
  const favoriteProducts = recommendProducts(products, {
    ...options,
    excludeIds: viewed,
    limit: 8,
  });
  const similar = recommendProducts(products, { ...options, limit: 8 });
  const discovery = recommendProducts(products, {
    ...options,
    excludeIds: new Set([
      ...viewed,
      ...favoriteProducts.map((item) => item.product.id),
    ]),
    limit: 8,
  });
  return { personalized: favoriteProducts, similar, discovery };
}

function seededShuffle<T>(items: T[], seed: number) {
  const copy = [...items];
  let value = seed || 1;
  for (let index = copy.length - 1; index > 0; index -= 1) {
    value = (value * 9301 + 49297) % 233280;
    const target = Math.floor((value / 233280) * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

export function rankFeedProducts(
  products: Product[],
  options: {
    favorites?: string[];
    orders?: Order[];
    category?: string | string[] | null;
    seed?: number;
  } = {},
) {
  const categories = Array.isArray(options.category)
    ? options.category
    : options.category
      ? [options.category]
      : [];
  const source = categories.length
    ? products.filter((product) => categories.includes(product.category))
    : products;
  const signals = readSignals();
  const hasProfile =
    signals.viewed.length > 0 ||
    Object.keys(signals.categories).length > 0 ||
    (options.favorites?.length ?? 0) > 0 ||
    (options.orders?.length ?? 0) > 0;
  if (!hasProfile) return seededShuffle(source, options.seed ?? Date.now());

  const ranked = recommendProducts(source, {
    favorites: options.favorites,
    orders: options.orders,
    limit: source.length,
  });
  const rankedIds = new Set(ranked.map((item) => item.product.id));
  const remaining = seededShuffle(
    source.filter((product) => !rankedIds.has(product.id)),
    options.seed ?? Date.now(),
  );
  return [...ranked.map((item) => item.product), ...remaining];
}
