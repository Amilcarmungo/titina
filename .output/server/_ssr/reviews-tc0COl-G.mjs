import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-tc0COl-G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "shop_reviews_v1";
function read() {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(KEY) || "[]");
	} catch {
		return [];
	}
}
var list = read();
var listeners = /* @__PURE__ */ new Set();
function emit() {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
	listeners.forEach((l) => l());
}
function useReviews(productId) {
	const all = (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => list, () => []);
	return productId ? all.filter((r) => r.productId === productId) : all;
}
var reviewActions = {
	add(r) {
		list = [{
			...r,
			id: `rv-${Date.now()}`,
			createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR")
		}, ...list];
		emit();
	},
	remove(id) {
		list = list.filter((r) => r.id !== id);
		emit();
	}
};
var REVIEWED_KEY = "shop_reviewed_orders_v1";
function markOrderReviewed(orderId) {
	if (typeof window === "undefined") return;
	try {
		const set = new Set(JSON.parse(localStorage.getItem(REVIEWED_KEY) || "[]"));
		set.add(orderId);
		localStorage.setItem(REVIEWED_KEY, JSON.stringify([...set]));
	} catch {}
}
function isOrderReviewed(orderId) {
	if (typeof window === "undefined") return false;
	try {
		return JSON.parse(localStorage.getItem(REVIEWED_KEY) || "[]").includes(orderId);
	} catch {
		return false;
	}
}
//#endregion
export { useReviews as i, markOrderReviewed as n, reviewActions as r, isOrderReviewed as t };
