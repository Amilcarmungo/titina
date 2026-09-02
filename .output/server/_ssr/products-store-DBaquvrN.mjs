import { r as __toESM } from "../_runtime.mjs";
import { n as ensureDb } from "./client-ColUhoxC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as canSyncSiteData } from "./roles-DIBzW3mP.mjs";
import { r as stripUndefined, t as attachSync } from "./sync-store-BDWU_rBs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-store-DBaquvrN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "shop_custom_products_v1";
/** Cache local apenas dos dados REAIS já recebidos do banco (nunca demo). */
function read(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		return JSON.parse(localStorage.getItem(key) || "") ?? fallback;
	} catch {
		return fallback;
	}
}
var list = read(KEY, []);
/** Estado de carregamento do catálogo (banco de dados). */
var status = list.length ? "ready" : "loading";
var listeners = /* @__PURE__ */ new Set();
function notify() {
	listeners.forEach((l) => l());
}
function cache() {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
}
function emit() {
	cache();
	status = "ready";
	notify();
	sync.push();
}
var sync = attachSync("catalog", () => list, (value) => {
	const next = Array.isArray(value) ? value : Array.isArray(value?.custom) ? value.custom : null;
	if (!next) return;
	list = next;
	status = "ready";
	cache();
	notify();
});
var loading = false;
async function subscribe() {
	if (typeof window === "undefined" || loading) return;
	loading = true;
	const [db, { collection, getDocs }] = await Promise.all([ensureDb(), import("../_libs/firebase.mjs").then((n) => n.a)]);
	if (!db) {
		loading = false;
		status = "error";
		notify();
		return;
	}
	getDocs(collection(db, "products")).then((snap) => {
		list = snap.docs.map((d) => ({
			...d.data(),
			id: d.id
		}));
		status = "ready";
		cache();
		notify();
	}).catch(() => {
		status = list.length ? "ready" : "error";
		notify();
	}).finally(() => {
		loading = false;
	});
}
if (typeof window !== "undefined") subscribe();
/** Tenta ligar de novo ao banco (usado pelos estados de erro na UI). */
function retryProducts() {
	status = "loading";
	notify();
	subscribe();
}
async function publishProduct(product) {
	const [db, { doc, setDoc }] = await Promise.all([ensureDb(), import("../_libs/firebase.mjs").then((n) => n.a)]);
	if (!db) throw new Error("Sem ligação ao banco de dados.");
	if (!canSyncSiteData()) throw new Error("Sem permissão para publicar. Entre com uma conta de gestor.");
	await setDoc(doc(db, "products", product.id), stripUndefined(product));
}
var EMPTY = [];
function useProductsStatus() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => status, () => "loading");
}
function useCustomProducts() {
	return useAllProducts();
}
function useAllProducts() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => list, () => EMPTY);
}
function getAnyProduct(id) {
	return list.find((p) => p.id === id);
}
var productActions = {
	add(p) {
		const product = {
			...p,
			id: `cp-${Date.now()}`
		};
		list = [product, ...list];
		emit();
		return {
			id: product.id,
			published: publishProduct(product)
		};
	},
	async update(id, patch) {
		list = list.map((p) => p.id === id ? {
			...p,
			...patch
		} : p);
		emit();
		const product = list.find((p) => p.id === id);
		if (product) await publishProduct(product);
	},
	async remove(id) {
		list = list.filter((p) => p.id !== id);
		emit();
		const [db, { deleteDoc, doc }] = await Promise.all([ensureDb(), import("../_libs/firebase.mjs").then((n) => n.a)]);
		if (db && canSyncSiteData()) await deleteDoc(doc(db, "products", id));
	},
	moveCategory(id, category, subcategory) {
		return this.update(id, {
			category,
			subcategory
		});
	},
	/** Semeia o banco com o catálogo de demonstração (acção manual do gestor). */
	async seed(products) {
		for (const p of products) await publishProduct(p);
	}
};
//#endregion
export { useCustomProducts as a, useAllProducts as i, productActions as n, useProductsStatus as o, retryProducts as r, getAnyProduct as t };
