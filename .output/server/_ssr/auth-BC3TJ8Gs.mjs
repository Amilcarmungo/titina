import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { o as getFirebaseAuth, r as ensureFirebaseAuth } from "./client-ColUhoxC.mjs";
import "../_libs/firebase.mjs";
import { r as rememberEmail, t as emailIsRegistered } from "./email-index-7olE61cG.mjs";
import { $ as onAuthStateChanged, D as browserLocalPersistence, Dt as updateProfile, H as getRedirectResult, J as linkWithCredential, N as createUserWithEmailAndPassword, Tt as updatePassword, bt as signInWithRedirect, ft as setPersistence, gt as signInWithEmailAndPassword, j as confirmPasswordReset, jt as verifyPasswordResetCode, o as EmailAuthProvider, s as FacebookAuthProvider, u as GoogleAuthProvider, ut as sendPasswordResetEmail, xt as signOut, yt as signInWithPopup } from "../_libs/firebase__auth.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BC3TJ8Gs.js
var auth_exports = /* @__PURE__ */ __exportAll({
	NeedsPasswordLinkError: () => NeedsPasswordLinkError,
	activeSignInMethods: () => activeSignInMethods,
	authErrorMessage: () => authErrorMessage,
	completePasswordReset: () => completePasswordReset,
	emailHasAccount: () => emailHasAccount,
	ensurePasswordMethod: () => ensurePasswordMethod,
	linkGoogleToCurrentAccount: () => linkGoogleToCurrentAccount,
	linkGoogleToPasswordAccount: () => linkGoogleToPasswordAccount,
	resetPassword: () => resetPassword,
	signInWithEmail: () => signInWithEmail,
	signInWithFacebook: () => signInWithFacebook,
	signInWithGoogle: () => signInWithGoogle,
	signOutUser: () => signOutUser,
	signUpWithEmail: () => signUpWithEmail,
	subscribeToUser: () => subscribeToUser,
	toAppUser: () => toAppUser,
	validatePasswordResetCode: () => validatePasswordResetCode
});
function toAppUser(u) {
	return {
		uid: u.uid,
		email: u.email ?? "",
		name: u.displayName ?? void 0,
		photoURL: u.photoURL ?? void 0,
		provider: u.providerData[0]?.providerId
	};
}
function subscribeToUser(cb) {
	let stop = null;
	let disposed = false;
	ensureFirebaseAuth().then((auth) => {
		if (!auth || disposed) return;
		setPersistence(auth, browserLocalPersistence).catch(() => {});
		getRedirectResult(auth).catch(() => {});
		stop = onAuthStateChanged(auth, (u) => cb(u ? toAppUser(u) : null));
	});
	return () => {
		disposed = true;
		stop?.();
		stop = null;
	};
}
ensureFirebaseAuth();
function requireAuthInstance() {
	const auth = getFirebaseAuth();
	if (!auth) throw new Error("Firebase não está configurado.");
	return auth;
}
/**
* Descobre se o email já tem conta (passo 1 do login) sem permitir enumeração:
* consultamos apenas o hash SHA-256 do email no índice do Firestore.
* `null` = indeterminado (o ecrã segue para cadastro e o Firebase valida).
*/
async function emailHasAccount(email) {
	requireAuthInstance();
	return emailIsRegistered(email);
}
async function signInWithEmail(email, password) {
	const auth = requireAuthInstance();
	const cred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
	rememberEmail(email);
	return toAppUser(cred.user);
}
async function signUpWithEmail(email, password, name) {
	const auth = requireAuthInstance();
	const cred = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
	if (name) await updateProfile(cred.user, { displayName: name });
	rememberEmail(email);
	return toAppUser(cred.user);
}
/**
* Erro especial: o email já tem conta com senha. Guardamos a credencial do
* Google para a LIGAR à conta existente — nenhum método é eliminado, o
* utilizador passa a poder entrar com Google **ou** com a senha.
*/
var NeedsPasswordLinkError = class extends Error {
	email;
	credential;
	constructor(email, credential) {
		super("Esta conta já usa email e senha. Confirme a senha para ligar o Google.");
		this.email = email;
		this.credential = credential;
		this.name = "NeedsPasswordLinkError";
	}
};
async function signInWithGoogle() {
	const auth = requireAuthInstance();
	const provider = new GoogleAuthProvider();
	provider.setCustomParameters({ prompt: "select_account" });
	try {
		const cred = await signInWithPopup(auth, provider);
		if (cred.user.email) rememberEmail(cred.user.email);
		return toAppUser(cred.user);
	} catch (err) {
		const code = err.code ?? "";
		if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment") {
			await signInWithRedirect(auth, provider);
			return null;
		}
		if (code === "auth/account-exists-with-different-credential") {
			const credential = GoogleAuthProvider.credentialFromError(err);
			const email = err.customData?.email ?? "";
			if (credential && email) throw new NeedsPasswordLinkError(email, credential);
		}
		throw err;
	}
}
async function signInWithFacebook() {
	const auth = requireAuthInstance();
	const provider = new FacebookAuthProvider();
	try {
		const cred = await signInWithPopup(auth, provider);
		if (cred.user.email) rememberEmail(cred.user.email);
		return toAppUser(cred.user);
	} catch (err) {
		const code = err.code ?? "";
		if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment") {
			await signInWithRedirect(auth, provider);
			return null;
		}
		throw err;
	}
}
/** Entra com a senha existente e liga o Google à mesma conta (dois métodos activos). */
async function linkGoogleToPasswordAccount(email, password, credential) {
	const auth = requireAuthInstance();
	const cred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
	try {
		await linkWithCredential(cred.user, credential);
	} catch (err) {
		if (err.code !== "auth/provider-already-linked") throw err;
	}
	rememberEmail(email);
	return toAppUser(cred.user);
}
/** Métodos de entrada activos na conta actual. */
function activeSignInMethods() {
	const ids = (getFirebaseAuth()?.currentUser)?.providerData.map((p) => p.providerId) ?? [];
	return {
		password: ids.includes("password"),
		google: ids.includes("google.com")
	};
}
/** Acrescenta (ou actualiza) a senha da conta — o Google continua activo. */
async function ensurePasswordMethod(password) {
	const user = requireAuthInstance().currentUser;
	if (!user?.email) throw new Error("Entre na sua conta primeiro.");
	if (user.providerData.some((p) => p.providerId === "password")) {
		await updatePassword(user, password);
		return;
	}
	await linkWithCredential(user, EmailAuthProvider.credential(user.email, password));
}
/** Liga o Google a uma conta que hoje só tem senha (a partir das configurações). */
async function linkGoogleToCurrentAccount() {
	const user = requireAuthInstance().currentUser;
	if (!user) throw new Error("Entre na sua conta primeiro.");
	const provider = new GoogleAuthProvider();
	provider.setCustomParameters({ prompt: "select_account" });
	const { linkWithPopup } = await import("../_libs/firebase.mjs").then((n) => n.i);
	await linkWithPopup(user, provider);
}
async function resetPassword(email) {
	const auth = requireAuthInstance();
	await sendPasswordResetEmail(auth, email.trim().toLowerCase(), { url: `${window.location.origin}/auth` });
}
async function validatePasswordResetCode(code) {
	const auth = requireAuthInstance();
	return verifyPasswordResetCode(auth, code);
}
async function completePasswordReset(code, password) {
	const auth = requireAuthInstance();
	await confirmPasswordReset(auth, code, password);
}
async function signOutUser() {
	const auth = getFirebaseAuth();
	if (auth) await signOut(auth);
}
/** Mensagens de erro em português para os códigos do Firebase Auth. */
function authErrorMessage(err) {
	switch (err.code ?? "") {
		case "auth/invalid-email": return "Email inválido.";
		case "auth/missing-password": return "Digite sua senha.";
		case "auth/wrong-password":
		case "auth/invalid-credential": return "Senha incorreta.";
		case "auth/user-not-found": return "Não encontramos essa conta.";
		case "auth/email-already-in-use": return "Esse email já tem conta. Faça login.";
		case "auth/weak-password": return "Senha muito fraca (mínimo 8 caracteres).";
		case "auth/too-many-requests": return "Muitas tentativas. Tente novamente em alguns minutos.";
		case "auth/popup-closed-by-user":
		case "auth/cancelled-popup-request": return "Login social cancelado.";
		case "auth/network-request-failed": return "Sem conexão. Verifique sua internet.";
		case "auth/unauthorized-domain": return "Domínio não autorizado no Firebase Auth.";
		default: return err?.message?.replace("Firebase: ", "") || "Não foi possível continuar.";
	}
}
//#endregion
export { completePasswordReset as a, linkGoogleToCurrentAccount as c, signInWithEmail as d, signInWithGoogle as f, validatePasswordResetCode as h, auth_exports as i, linkGoogleToPasswordAccount as l, signUpWithEmail as m, activeSignInMethods as n, emailHasAccount as o, signOutUser as p, authErrorMessage as r, ensurePasswordMethod as s, NeedsPasswordLinkError as t, resetPassword as u };
