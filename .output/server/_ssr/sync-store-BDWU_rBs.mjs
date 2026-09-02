import { n as ensureDb, o as getFirebaseAuth } from "./client-ColUhoxC.mjs";
import { r as canSyncSiteData } from "./roles-DIBzW3mP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sync-store-BDWU_rBs.js
/**
* O Firestore rejeita `undefined` em qualquer campo (`Unsupported field value: undefined`).
* Antes de gravar, removemos recursivamente todas as chaves com valor `undefined`.
*/
function stripUndefined(value) {
	if (Array.isArray(value)) return value.filter((v) => v !== void 0).map((v) => stripUndefined(v));
	if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
		const out = {};
		for (const [k, v] of Object.entries(value)) {
			if (v === void 0) continue;
			out[k] = stripUndefined(v);
		}
		return out;
	}
	return value;
}
function createRetrier(run) {
	let attempt = 0;
	let timer = null;
	let onlineHooked = false;
	const cancel = () => {
		if (timer) clearTimeout(timer);
		timer = null;
		attempt = 0;
	};
	const schedule = () => {
		if (typeof window === "undefined" || timer) return;
		const delay = Math.min(3e4, 1e3 * 2 ** attempt);
		attempt += 1;
		timer = setTimeout(() => {
			timer = null;
			run();
		}, delay);
		if (!onlineHooked) {
			onlineHooked = true;
			window.addEventListener("online", () => {
				cancel();
				run();
			});
		}
	};
	return {
		schedule,
		cancel
	};
}
/**
* Sincroniza os dados de gestão (catálogo, banners, categorias, lojas, cupões,
* pagamentos, logística, home) entre o app e o Firestore.
*
*   siteData/{key} = { value, updatedAt, updatedBy }
*
* Leitura é pública (o catálogo é público); a escrita é restrita por função
* nas regras do Firestore — o frontend nunca decide permissões.
*
* O SDK do Firestore é carregado sob demanda para não pesar no arranque.
*/
function attachSync(key, getLocal, setLocal, options) {
	let lastRemote = "";
	const push = () => {
		if (!canSyncSiteData()) return;
		const value = stripUndefined(getLocal());
		const json = JSON.stringify(value ?? null);
		if (json === lastRemote) return;
		lastRemote = json;
		(async () => {
			const [db, { doc, serverTimestamp, setDoc }] = await Promise.all([ensureDb(), import("../_libs/firebase.mjs").then((n) => n.a)]);
			if (!db) {
				lastRemote = "";
				return;
			}
			await setDoc(doc(db, "siteData", key), {
				value,
				updatedAt: serverTimestamp(),
				updatedBy: getFirebaseAuth()?.currentUser?.uid ?? null
			}, { merge: true }).catch(() => {
				lastRemote = "";
			});
		})();
	};
	if (typeof window !== "undefined") {
		let stop = null;
		const retrier = createRetrier(() => {
			stop?.();
			stop = null;
			start();
		});
		async function start() {
			const [db, { doc, onSnapshot }] = await Promise.all([ensureDb(), import("../_libs/firebase.mjs").then((n) => n.a)]);
			if (!db) {
				options?.onSettled?.(false, true);
				retrier.schedule();
				return;
			}
			stop = onSnapshot(doc(db, "siteData", key), (snap) => {
				retrier.cancel();
				const value = snap.data()?.["value"];
				options?.onSettled?.(value !== void 0);
				if (value === void 0) return;
				const json = JSON.stringify(value);
				if (json === lastRemote) return;
				lastRemote = json;
				setLocal(value);
			}, () => {
				options?.onSettled?.(false, true);
				retrier.schedule();
			});
		}
		start();
	}
	return { push };
}
//#endregion
export { createRetrier as n, stripUndefined as r, attachSync as t };
