import { n as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { a as getDb } from "./client-ColUhoxC.mjs";
import { K as onSnapshot, L as getDocs, Lt as collection, P as getDoc, Ut as doc, et as query, rt as setDoc, un as serverTimestamp, ut as where } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { s as inviteUrl } from "./site-BzUm8isV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/referrals-DGkFyR9U.js
var referrals_DGkFyR9U_exports = /* @__PURE__ */ __exportAll({
	a: () => watchReferrals,
	i: () => referrals_exports,
	n: () => captureReferralFromUrl,
	r: () => referralLink,
	t: () => 50
});
/**
* Convites (referral) — cada utilizador tem um link único e ganha pontos por
* cada amigo que criar conta através dele.
*
*   referrals/{novoUid} = { uid, referrerUid, createdAt }
*
* O novo utilizador é quem escreve o seu próprio registo (é o único que as
* regras autorizam), e o convidador lê os registos onde é o `referrerUid`.
* Assim os pontos são sempre calculados a partir do banco, nunca do frontend.
*/
var referrals_exports = /* @__PURE__ */ __exportAll$1({
	POINTS_PER_REFERRAL: () => 50,
	captureReferralFromUrl: () => captureReferralFromUrl,
	countReferrals: () => countReferrals,
	pendingReferral: () => pendingReferral,
	recordReferralOnce: () => recordReferralOnce,
	referralCode: () => referralCode,
	referralLink: () => referralLink,
	watchReferrals: () => watchReferrals
});
var PENDING_KEY = "bx_referral_code";
var POINTS_PER_REFERRAL = 50;
/** Código de convite público de um utilizador (o próprio uid). */
function referralCode(uid) {
	return uid;
}
/** Link único de convite — sempre no domínio oficial bazarixy.com. */
function referralLink(uid) {
	return inviteUrl(referralCode(uid));
}
/** Guarda o código presente no URL (?convite= / ?ref=) para usar no cadastro. */
function captureReferralFromUrl() {
	if (typeof window === "undefined") return;
	const params = new URLSearchParams(window.location.search);
	const code = params.get("convite") || params.get("ref");
	if (code && code.length >= 6) localStorage.setItem(PENDING_KEY, code);
}
function pendingReferral() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(PENDING_KEY);
}
/**
* Registra o convite na primeira vez que o utilizador aparece autenticado.
* Nunca sobrescreve um registo existente e ignora auto-convites.
*/
async function recordReferralOnce(uid) {
	const db = getDb();
	const code = pendingReferral();
	if (!db || !code || code === uid) return;
	try {
		const ref = doc(db, "referrals", uid);
		if ((await getDoc(ref)).exists()) {
			localStorage.removeItem(PENDING_KEY);
			return;
		}
		await setDoc(ref, {
			uid,
			referrerUid: code,
			createdAt: serverTimestamp()
		});
		localStorage.removeItem(PENDING_KEY);
	} catch {}
}
async function countReferrals(uid) {
	const db = getDb();
	if (!db) return 0;
	try {
		return (await getDocs(query(collection(db, "referrals"), where("referrerUid", "==", uid)))).size;
	} catch {
		return 0;
	}
}
function watchReferrals(uid, cb) {
	const db = getDb();
	if (!db) return () => {};
	return onSnapshot(query(collection(db, "referrals"), where("referrerUid", "==", uid)), (snap) => cb(snap.size), () => cb(0));
}
//#endregion
export { watchReferrals as a, referrals_DGkFyR9U_exports as i, captureReferralFromUrl as n, referralLink as r, POINTS_PER_REFERRAL as t };
