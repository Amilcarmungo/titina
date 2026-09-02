import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as attachSync } from "./sync-store-BDWU_rBs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shops-store-Dm5LimXI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "shop_shops_v1";
/** Nada de lojas fictícias: a lista real vem do banco de dados. */
var defaults = [];
function read() {
	if (typeof window === "undefined") return defaults;
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) || "");
		if (Array.isArray(raw) && raw.length) return raw;
	} catch {
		return defaults;
	}
	return defaults;
}
var list = read();
var listeners = /* @__PURE__ */ new Set();
function emit() {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
	listeners.forEach((l) => l());
	sync.push();
}
var sync = attachSync("shops", () => list, (value) => {
	if (!Array.isArray(value)) return;
	list = value;
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
	listeners.forEach((l) => l());
});
function useShops() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => list, () => defaults);
}
function getShop(id) {
	return list.find((s) => s.id === id);
}
var shopActions = {
	add(s) {
		const id = `sh-${Date.now()}`;
		list = [...list, {
			...s,
			id,
			createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR")
		}];
		emit();
		return id;
	},
	update(id, patch) {
		list = list.map((s) => s.id === id ? {
			...s,
			...patch
		} : s);
		emit();
	},
	remove(id) {
		if (id === "main") return;
		list = list.filter((s) => s.id !== id);
		emit();
	}
};
//#endregion
export { shopActions as n, useShops as r, getShop as t };
