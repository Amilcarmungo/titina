import { r as __toESM } from "../_runtime.mjs";
import { a as getDb } from "./client-ColUhoxC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { K as onSnapshot, Ut as doc, Zt as increment, rt as setDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { a as watchReferrals, t as POINTS_PER_REFERRAL } from "./referrals-DGkFyR9U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/points-XcHjegxc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Pontos Bazarixy.
*
*  · Avaliações de pedidos → pontos guardados em `users/{uid}.points`.
*  · Convites aceites      → 50 pontos por amigo (contados em `referrals`).
*
* Sem sessão os pontos ficam apenas no dispositivo (localStorage) e são
* enviados para o banco assim que o utilizador entra.
*/
var KEY = "bx_points_v1";
var POINTS_PER_REVIEW = 25;
function readLocal() {
	if (typeof window === "undefined") return 0;
	const n = Number(localStorage.getItem(KEY) ?? "0");
	return Number.isFinite(n) ? n : 0;
}
var server = {
	earned: 0,
	referrals: 0,
	total: 0
};
var state = {
	earned: readLocal(),
	referrals: 0,
	total: readLocal()
};
var listeners = /* @__PURE__ */ new Set();
function set(patch) {
	const next = {
		...state,
		...patch
	};
	state = {
		...next,
		total: next.earned + next.referrals * 50
	};
	listeners.forEach((l) => l());
}
var uid = null;
var stopProfile = null;
var stopReferrals = null;
/** Liga os pontos à conta autenticada (chamado pelo FirebaseAuthSync). */
function bindPoints(nextUid) {
	if (uid === nextUid) return;
	stopProfile?.();
	stopReferrals?.();
	stopProfile = stopReferrals = null;
	uid = nextUid;
	if (!nextUid) {
		set({
			earned: readLocal(),
			referrals: 0
		});
		return;
	}
	const db = getDb();
	if (!db) return;
	const pending = readLocal();
	if (pending > 0) setDoc(doc(db, "users", nextUid), {
		uid: nextUid,
		points: increment(pending)
	}, { merge: true }).then(() => {
		localStorage.setItem(KEY, "0");
	}).catch(() => {});
	stopProfile = onSnapshot(doc(db, "users", nextUid), (snap) => set({ earned: Number(snap.data()?.["points"] ?? 0) }), () => {});
	stopReferrals = watchReferrals(nextUid, (count) => set({ referrals: count }));
}
function usePointsState() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => state, () => server);
}
function usePoints() {
	return usePointsState().total;
}
function addPoints(amount) {
	const db = getDb();
	if (uid && db) {
		set({ earned: state.earned + amount });
		setDoc(doc(db, "users", uid), {
			uid,
			points: increment(amount)
		}, { merge: true }).catch(() => {});
		return state.total;
	}
	const next = readLocal() + amount;
	if (typeof window !== "undefined") localStorage.setItem(KEY, String(next));
	set({ earned: next });
	return state.total;
}
//#endregion
export { POINTS_PER_REFERRAL, POINTS_PER_REVIEW, addPoints, bindPoints, usePoints, usePointsState };
