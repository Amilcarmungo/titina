import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recommendations-CqZxQjbZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var STORAGE_KEY = "bazarixy_recommendation_signals_v1";
var SIGNAL_EVENT = "bazarixy:recommendation-signal";
var emptySignals = () => ({
	viewed: [],
	categories: {},
	views: {},
	searches: []
});
function readSignals() {
	if (typeof window === "undefined") return emptySignals();
	try {
		const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
		return {
			viewed: Array.isArray(value?.viewed) ? value.viewed : [],
			categories: value?.categories ?? {},
			views: value?.views ?? {},
			searches: readSearches()
		};
	} catch {
		return emptySignals();
	}
}
function readSearches() {
	if (typeof window === "undefined") return [];
	try {
		const searches = JSON.parse(localStorage.getItem("search_recent_v1") || "[]");
		return Array.isArray(searches) ? searches.filter((term) => typeof term === "string") : [];
	} catch {
		return [];
	}
}
function recordProductView(product) {
	if (typeof window === "undefined") return;
	const current = readSignals();
	const next = {
		viewed: [product.id, ...current.viewed.filter((id) => id !== product.id)].slice(0, 30),
		categories: {
			...current.categories,
			[product.category]: (current.categories[product.category] ?? 0) + 1
		},
		views: {
			...current.views,
			[product.id]: (current.views[product.id] ?? 0) + 1
		}
	};
	localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	window.dispatchEvent(new Event(SIGNAL_EVENT));
}
function recordSearchIntent(term) {
	if (typeof window !== "undefined") window.dispatchEvent(new Event(SIGNAL_EVENT));
}
function useRecommendationSignals() {
	const [signals, setSignals] = (0, import_react.useState)(readSignals);
	(0, import_react.useEffect)(() => {
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
function purchasedIds(orders) {
	return new Set(orders.flatMap((order) => order.items.map((item) => item.productId)));
}
function recommendProducts(products, options = {}) {
	const signals = readSignals();
	const favorites = new Set(options.favorites ?? []);
	const purchased = purchasedIds(options.orders ?? []);
	const excluded = options.excludeIds ?? /* @__PURE__ */ new Set();
	const maxViews = Math.max(1, ...Object.values(signals.views), 1);
	const maxSold = Math.max(1, ...products.map((product) => product.sold), 1);
	return products.filter((product) => !excluded.has(product.id)).map((product) => {
		const searchIntent = signals.searches.some((term) => `${product.name} ${product.category}`.toLowerCase().includes(term.toLowerCase())) ? 1 : 0;
		const categoryInterest = Math.min(1, (signals.categories[product.category] ?? 0) / 5 + searchIntent * .5);
		const viewHistory = Math.min(1, (signals.views[product.id] ?? 0) / maxViews);
		const favorite = favorites.has(product.id) ? 1 : 0;
		const purchase = purchased.has(product.id) ? 1 : 0;
		const popularity = product.sold / maxSold;
		const novelty = 1 / (1 + Math.max(0, products.indexOf(product)) / 20);
		const discovery = signals.categories[product.category] ? 0 : 1;
		const score = categoryInterest * .3 + viewHistory * .2 + favorite * .2 + purchase * .15 + popularity * .05 + novelty * .05 + discovery * .05;
		let reason = "Uma escolha popular na Bazarixy";
		if (favorite) reason = "Está nos teus favoritos";
		else if (viewHistory) reason = "Porque viste este produto";
		else if (searchIntent) reason = "Relacionado com o que procuraste";
		else if (categoryInterest) reason = "Semelhante ao que tens explorado";
		else if (discovery) reason = "Fora do teu padrão habitual";
		return {
			product,
			score,
			reason
		};
	}).sort((a, b) => b.score - a.score).slice(0, options.limit ?? 8);
}
function seededShuffle(items, seed) {
	const copy = [...items];
	let value = seed || 1;
	for (let index = copy.length - 1; index > 0; index -= 1) {
		value = (value * 9301 + 49297) % 233280;
		const target = Math.floor(value / 233280 * (index + 1));
		[copy[index], copy[target]] = [copy[target], copy[index]];
	}
	return copy;
}
function rankFeedProducts(products, options = {}) {
	const source = options.category ? products.filter((product) => product.category === options.category) : products;
	const signals = readSignals();
	if (!(signals.viewed.length > 0 || Object.keys(signals.categories).length > 0 || (options.favorites?.length ?? 0) > 0 || (options.orders?.length ?? 0) > 0)) return seededShuffle(source, options.seed ?? Date.now());
	const ranked = recommendProducts(source, {
		favorites: options.favorites,
		orders: options.orders,
		limit: source.length
	});
	const rankedIds = new Set(ranked.map((item) => item.product.id));
	const remaining = seededShuffle(source.filter((product) => !rankedIds.has(product.id)), options.seed ?? Date.now());
	return [...ranked.map((item) => item.product), ...remaining];
}
//#endregion
export { useRecommendationSignals as a, recordSearchIntent as i, recommendProducts as n, recordProductView as r, rankFeedProducts as t };
