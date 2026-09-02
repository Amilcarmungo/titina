import { n as __exportAll, r as __toESM } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as ensureDb, o as getFirebaseAuth } from "./client-ColUhoxC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roles-DIBzW3mP.js
var roles_DIBzW3mP_exports = /* @__PURE__ */ __exportAll({
	a: () => usePermission,
	i: () => roles_exports,
	n: () => can,
	o: () => useStaff,
	r: () => canSyncSiteData,
	t: () => ROLE_LABEL
});
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Funções (roles) do painel admin — a fonte da verdade é o Firestore (`staff/{uid}`),
* nunca o frontend. As regras em `firestore.rules` re-validam cada escrita.
*
*   staff/{uid} = { role: "admin" | "gerente" | "atendente", shopId?: string, name?: string, active: boolean }
*/
var roles_exports = /* @__PURE__ */ __exportAll$1({
	ROLE_LABEL: () => ROLE_LABEL,
	can: () => can,
	canSyncSiteData: () => canSyncSiteData,
	usePermission: () => usePermission,
	useStaff: () => useStaff,
	watchStaff: () => watchStaff
});
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
var watchToken = 0;
function emit(next) {
	state = next;
	listeners.forEach((l) => l());
}
/** Liga/desliga a observação da função do utilizador autenticado. */
function watchStaff(uid) {
	watchToken++;
	unsubscribe?.();
	unsubscribe = null;
	if (!uid) {
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
	startWatch(uid);
}
async function startWatch(uid) {
	const token = ++watchToken;
	const [db, { doc, onSnapshot }] = await Promise.all([ensureDb(), import("../_libs/firebase.mjs").then((n) => n.a)]);
	if (token !== watchToken) return;
	if (!db) {
		emit({
			staff: null,
			loading: false
		});
		return;
	}
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
export { usePermission as a, roles_DIBzW3mP_exports as i, can as n, useStaff as o, canSyncSiteData as r, ROLE_LABEL as t };
