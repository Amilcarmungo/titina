import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as attachSync } from "./sync-store-s4DuzJ9B.mjs";
import { r as seedCategories } from "./products-De10hxZJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-store-DOmO1cei.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "shop_categories_v1";
/** Subcategorias sugeridas ao semear o banco com o catálogo de demonstração. */
var seedSubcats = {
	dresses: [
		"Midi",
		"Longo",
		"Curto",
		"Festa",
		"Casual"
	],
	tops: [
		"Blusas",
		"Camisetas",
		"Regatas",
		"Cropped"
	],
	pants: [
		"Cargo",
		"Alfaiataria",
		"Legging",
		"Wide-leg"
	],
	denim: [
		"Reta",
		"Skinny",
		"Wide",
		"Mom"
	],
	swim: [
		"Biquíni",
		"Maiô",
		"Saídas"
	],
	skirts: [
		"Mini",
		"Midi",
		"Longa"
	],
	jumpsuits: [
		"Curto",
		"Longo",
		"Festa"
	],
	knit: [
		"Cardigan",
		"Suéter",
		"Vestido"
	],
	beleza: [
		"Maquiagem",
		"Skincare",
		"Perfumes",
		"Pincéis"
	],
	eletronicos: [
		"Áudio",
		"Acessórios",
		"Smart Home"
	],
	casa: [
		"Cozinha",
		"Decoração",
		"Cama & Banho"
	],
	outros: ["Diversos"]
};
/** Categorias de demonstração — só entram no site se o gestor semear o banco. */
var seedCategoriesFull = seedCategories.map((c) => ({
	...c,
	title: c.name,
	subtitle: "Coleção exclusiva",
	subcategories: seedSubcats[c.slug] ?? []
}));
var EMPTY = [];
function read() {
	if (typeof window === "undefined") return EMPTY;
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) || "");
		if (Array.isArray(raw) && raw.length) return raw;
	} catch {}
	return EMPTY;
}
var list = read();
var status = list.length ? "ready" : "loading";
var statusListeners = /* @__PURE__ */ new Set();
function setStatus(next) {
	if (status === next) return;
	status = next;
	statusListeners.forEach((l) => l());
}
function useCategoriesStatus() {
	return (0, import_react.useSyncExternalStore)((l) => {
		statusListeners.add(l);
		return () => statusListeners.delete(l);
	}, () => status, () => "loading");
}
var listeners = /* @__PURE__ */ new Set();
function emit() {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
	listeners.forEach((l) => l());
	setStatus("ready");
	sync.push();
}
var sync = attachSync("categories", () => list, (value) => {
	if (!Array.isArray(value)) return;
	list = value;
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
	listeners.forEach((l) => l());
	setStatus("ready");
}, { onSettled: (hasValue, failed) => setStatus(failed && !list.length ? "error" : hasValue || !failed ? "ready" : status) });
function useCategories() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => list, () => EMPTY);
}
var categoryActions = {
	add(c) {
		list = [...list, {
			...c,
			subcategories: c.subcategories ?? []
		}];
		emit();
	},
	update(slug, patch) {
		list = list.map((c) => c.slug === slug ? {
			...c,
			...patch
		} : c);
		emit();
	},
	remove(slug) {
		list = list.filter((c) => c.slug !== slug);
		emit();
	},
	addSub(slug, sub) {
		list = list.map((c) => c.slug === slug ? {
			...c,
			subcategories: [...c.subcategories, sub]
		} : c);
		emit();
	},
	removeSub(slug, sub) {
		list = list.map((c) => c.slug === slug ? {
			...c,
			subcategories: c.subcategories.filter((s) => s !== sub),
			subImages: c.subImages ? Object.fromEntries(Object.entries(c.subImages).filter(([k]) => k !== sub)) : void 0
		} : c);
		emit();
	},
	setSubImage(slug, sub, image) {
		list = list.map((c) => c.slug === slug ? {
			...c,
			subImages: {
				...c.subImages ?? {},
				[sub]: image
			}
		} : c);
		emit();
	},
	/** Semeia as categorias de demonstração no banco (acção manual do gestor). */
	seed() {
		list = seedCategoriesFull;
		emit();
	}
};
//#endregion
export { useCategories as n, useCategoriesStatus as r, categoryActions as t };
