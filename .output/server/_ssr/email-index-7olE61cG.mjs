import { n as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { a as getDb } from "./client-ColUhoxC.mjs";
import { P as getDoc, Ut as doc, rt as setDoc, un as serverTimestamp } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/email-index-7olE61cG.js
var email_index_7olE61cG_exports = /* @__PURE__ */ __exportAll({
	n: () => email_index_exports,
	r: () => rememberEmail,
	t: () => emailIsRegistered
});
/**
* Verificação segura de "este email já tem conta?".
*
* Não usamos listagem de emails (enumeração) nem revelamos dados: guardamos
* apenas o SHA-256 do email em `emailIndex/{hash}`. Só quem já conhece o email
* consegue consultar o hash correspondente — as regras proibem `list`.
*/
var email_index_exports = /* @__PURE__ */ __exportAll$1({
	emailHash: () => emailHash,
	emailIsRegistered: () => emailIsRegistered,
	normalizeEmail: () => normalizeEmail,
	rememberEmail: () => rememberEmail
});
function normalizeEmail(email) {
	return email.trim().toLowerCase();
}
async function emailHash(email) {
	if (typeof window === "undefined" || !window.crypto?.subtle) return null;
	const bytes = new TextEncoder().encode(normalizeEmail(email));
	const digest = await window.crypto.subtle.digest("SHA-256", bytes);
	return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
/** true = já existe conta · false = não existe · null = não foi possível saber */
async function emailIsRegistered(email) {
	const db = getDb();
	const hash = await emailHash(email);
	if (!db || !hash) return null;
	try {
		return (await getDoc(doc(db, "emailIndex", hash))).exists();
	} catch {
		return null;
	}
}
/** Registra o hash do email após um login/cadastro bem-sucedido. */
async function rememberEmail(email) {
	const db = getDb();
	const hash = await emailHash(email);
	if (!db || !hash) return;
	try {
		await setDoc(doc(db, "emailIndex", hash), { createdAt: serverTimestamp() }, { merge: true });
	} catch {}
}
//#endregion
export { email_index_7olE61cG_exports as n, rememberEmail as r, emailIsRegistered as t };
