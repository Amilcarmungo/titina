import { r as __toESM } from "../_runtime.mjs";
import { n as ensureDb } from "./client-ColUhoxC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as canSyncSiteData } from "./roles-DIBzW3mP.mjs";
import { n as createRetrier, r as stripUndefined } from "./sync-store-BDWU_rBs.mjs";
import { i as useAllProducts } from "./products-store-DBaquvrN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/banner-Zgl4ECrY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "banner_slides_v1";
var EMPTY = [];
/** Só dados reais: os banners vivem na coleção `banners` do banco. */
var slidesData = (() => {
	if (typeof window === "undefined") return EMPTY;
	try {
		const s = JSON.parse(localStorage.getItem(KEY) || "");
		if (Array.isArray(s) && s.length) return s;
	} catch {
		return EMPTY;
	}
	return EMPTY;
})();
var status = slidesData.length ? "ready" : "loading";
var listeners = /* @__PURE__ */ new Set();
function emit() {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(slidesData));
	status = "ready";
	listeners.forEach((l) => l());
}
var unsubscribe = null;
var retrier = createRetrier(() => {
	unsubscribe?.();
	unsubscribe = null;
	subscribe();
});
async function subscribe() {
	if (typeof window === "undefined" || unsubscribe) return;
	const [db, { collection, onSnapshot }] = await Promise.all([ensureDb(), import("../_libs/firebase.mjs").then((n) => n.a)]);
	if (!db) {
		status = "error";
		listeners.forEach((l) => l());
		retrier.schedule();
		return;
	}
	unsubscribe = onSnapshot(collection(db, "banners"), (snap) => {
		slidesData = snap.docs.map((d) => ({
			...d.data(),
			id: d.id
		}));
		retrier.cancel();
		emit();
	}, () => {
		status = slidesData.length ? "ready" : "error";
		listeners.forEach((l) => l());
		retrier.schedule();
	});
}
if (typeof window !== "undefined") subscribe();
function retryBanners() {
	unsubscribe?.();
	unsubscribe = null;
	status = "loading";
	listeners.forEach((l) => l());
	subscribe();
}
async function publishBanner(slide) {
	const [db, { doc, setDoc }] = await Promise.all([ensureDb(), import("../_libs/firebase.mjs").then((n) => n.a)]);
	if (!db) throw new Error("Sem ligação ao banco de dados.");
	if (!canSyncSiteData()) throw new Error("Sem permissão para publicar banners.");
	await setDoc(doc(db, "banners", slide.id), stripUndefined(slide));
}
function useBannersStatus() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => status, () => "loading");
}
function useSlidesRaw() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => slidesData, () => EMPTY);
}
function useSlides() {
	const raw = useSlidesRaw();
	const products = useAllProducts();
	return raw.map((s) => ({
		...s,
		picks: (s.pickIds ?? []).map((id) => products.find((p) => p.id === id)).filter(Boolean)
	}));
}
var slideActions = {
	add(s) {
		const id = `b${Date.now()}`;
		slidesData = [...slidesData, {
			...s,
			id
		}];
		emit();
		return {
			id,
			published: publishBanner({
				...s,
				id
			})
		};
	},
	async update(id, patch) {
		slidesData = slidesData.map((s) => s.id === id ? {
			...s,
			...patch
		} : s);
		emit();
		const slide = slidesData.find((s) => s.id === id);
		if (slide) await publishBanner(slide);
	},
	async remove(id) {
		slidesData = slidesData.filter((s) => s.id !== id);
		emit();
		const [db, { deleteDoc, doc }] = await Promise.all([ensureDb(), import("../_libs/firebase.mjs").then((n) => n.a)]);
		if (db && canSyncSiteData()) await deleteDoc(doc(db, "banners", id));
	}
};
var currentIndex = 0;
var idxListeners = /* @__PURE__ */ new Set();
function setBannerIndex(i) {
	const len = slidesData.length || 1;
	currentIndex = (i % len + len) % len;
	idxListeners.forEach((l) => l());
}
function useBannerIndex() {
	return (0, import_react.useSyncExternalStore)((l) => {
		idxListeners.add(l);
		return () => idxListeners.delete(l);
	}, () => currentIndex, () => 0);
}
//#endregion
export { useBannersStatus as a, useBannerIndex as i, setBannerIndex as n, useSlides as o, slideActions as r, useSlidesRaw as s, retryBanners as t };
