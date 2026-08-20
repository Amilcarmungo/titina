import { r as __toESM } from "../_runtime.mjs";
import "../_libs/firebase.mjs";
import { i as onSnapshot, m as doc } from "../_libs/@firebase/firestore+[...].mjs";
import { n as getDb, r as getFirebaseAuth } from "./client-nkMekIqc.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roles-BA0F-kDN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Funções (roles) do painel admin — a fonte da verdade é o Firestore (`staff/{uid}`),
* nunca o frontend. As regras em `firestore.rules` re-validam cada escrita.
*
*   staff/{uid} = { role: "admin" | "gerente" | "atendente", shopId?: string, name?: string, active: boolean }
*/
var MATRIX = {
	admin: [
		"catalog.write",
		"publish.approve",
		"orders.status",
		"orders.delete",
		"settings.write",
		"staff.manage"
	],
	gerente: [
		"catalog.write",
		"publish.approve",
		"orders.status"
	],
	atendente: ["orders.status"]
};
var ROLE_LABEL = {
	admin: "Administrador",
	gerente: "Gerente de loja",
	atendente: "Atendente"
};
var state = {
	staff: null,
	loading: true
};
var server = {
	staff: null,
	loading: true
};
var listeners = /* @__PURE__ */ new Set();
var unsubscribe = null;
function emit(next) {
	state = next;
	listeners.forEach((l) => l());
}
/** Liga/desliga a observação da função do utilizador autenticado. */
function watchStaff(uid) {
	unsubscribe?.();
	unsubscribe = null;
	if (!uid) {
		emit({
			staff: null,
			loading: false
		});
		return;
	}
	const db = getDb();
	if (!db) {
		emit({
			staff: null,
			loading: false
		});
		return;
	}
	emit({
		staff: null,
		loading: true
	});
	unsubscribe = onSnapshot(doc(db, "staff", uid), (snap) => {
		const data = snap.data();
		emit({
			staff: data && data.active !== false && data.role in MATRIX ? {
				uid,
				...data,
				active: true
			} : null,
			loading: false
		});
	}, () => emit({
		staff: null,
		loading: false
	}));
}
function useStaff() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => state, () => server);
}
function can(staff, permission) {
	if (!staff) return false;
	return MATRIX[staff.role].includes(permission);
}
function usePermission(permission) {
	const { staff } = useStaff();
	return can(staff, permission);
}
/**
* Tenta publicar sempre que existe sessão: a decisão final é das regras do
* Firestore (nunca do frontend). Enquanto a função ainda está a carregar não
* bloqueamos a publicação — o backend recusa se o utilizador não tiver direito.
*/
function canSyncSiteData() {
	if (can(state.staff, "catalog.write") || can(state.staff, "settings.write")) return true;
	if (state.loading) return Boolean(getFirebaseAuth()?.currentUser);
	return false;
}
//#endregion
export { useStaff as a, usePermission as i, can as n, watchStaff as o, canSyncSiteData as r, ROLE_LABEL as t };
