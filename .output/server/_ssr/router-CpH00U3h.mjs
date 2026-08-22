import { n as __exportAll, r as __toESM } from "../_runtime.mjs";
import "../_libs/firebase.mjs";
import { _ as signOut, a as confirmPasswordReset, b as verifyPasswordResetCode, c as getRedirectResult, d as onAuthStateChanged, f as sendPasswordResetEmail, g as signInWithRedirect, h as signInWithPopup, i as browserLocalPersistence, l as linkWithCredential, m as signInWithEmailAndPassword, n as FacebookAuthProvider, o as createUserWithEmailAndPassword, p as setPersistence, r as GoogleAuthProvider, t as EmailAuthProvider, v as updatePassword, y as updateProfile } from "../_libs/firebase__auth.mjs";
import { a as orderBy, c as query, d as where, f as writeBatch, g as increment, i as onSnapshot, l as setDoc, m as doc, n as getDoc, p as collection, r as getDocs, t as deleteDoc, u as updateDoc, v as serverTimestamp } from "../_libs/@firebase/firestore+[...].mjs";
import { a as initAnalytics, n as getDb, r as getFirebaseAuth, t as firebaseEnabled } from "./client-C80F8PZn.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as setOrdersOwner, f as registerNotificationsBridge, i as mergeRemoteOrders, p as setNotificationsOwner, s as registerOrdersBridge, u as mergeRemoteNotifications } from "./orders-store-B0X431Ym.mjs";
import { o as watchStaff } from "./roles-BxfhjeTv.mjs";
import { t as getShop } from "./shops-store-CX-UvhEW.mjs";
import { t as getProduct } from "./products-De10hxZJ.mjs";
import { S as useRouter, _ as createRootRouteWithContext, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as enumType, r as objectType } from "../_libs/zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/site-BzUm8isV.js
/**
* Domínio oficial e caminhos canónicos da Bazarixy.
*
* Todo link partilhado (produto, loja, convite) é construído aqui para que o
* SEO, o Open Graph e as partilhas apontem sempre para o mesmo endereço.
*/
var SITE_URL = "https://bazarixy.com";
var SITE_NAME = "Bazarixy";
var HOME_TITLE = "Bazarixy | Compras Online em Angola";
var HOME_DESCRIPTION = "Bazarixy — Compra online em Angola. Encontra promoções em roupas, telemóveis, eletrónicos, calçados, beleza, casa, desporto e muito mais. Descobre ofertas, produtos de lojas verificadas e compra com segurança.";
var SHARE_IMAGE = absoluteUrl("/detalhesdolinks.png");
/** Normaliza uma descrição para snippets do Google e prévias sociais. */
function seoDescription(value, fallback, max = 155) {
	const text = (value || fallback).replace(/\s+/g, " ").trim();
	if (text.length <= max) return text;
	return `${text.slice(0, max - 1).replace(/\s+\S*$/, "").trim()}…`;
}
/** Texto claro para partilhas: identifica o conteúdo e dá contexto à marca. */
function shareText(title, description, subject = "Veja na Bazarixy") {
	const detail = seoDescription(description, "", 220);
	return detail ? `${title} — ${detail} ${subject}` : `${title} · ${subject}`;
}
/** Junta um caminho relativo ao domínio oficial (sem barras duplicadas). */
function absoluteUrl(path = "/") {
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
var paths = {
	product: (id) => `/product/${encodeURIComponent(id)}`,
	shop: (id) => `/shop/${encodeURIComponent(id)}`,
	category: (slug) => `/category/${encodeURIComponent(slug)}`,
	invite: (code) => `/auth?convite=${encodeURIComponent(code)}`
};
var productUrl = (id) => absoluteUrl(paths.product(id));
var shopUrl = (id) => absoluteUrl(paths.shop(id));
var inviteUrl = (code) => absoluteUrl(paths.invite(code));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/referrals-Bjxjmw7g.js
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
var PENDING_KEY = "bx_referral_code";
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
function watchReferrals(uid, cb) {
	const db = getDb();
	if (!db) return () => {};
	return onSnapshot(query(collection(db, "referrals"), where("referrerUid", "==", uid)), (snap) => cb(snap.size), () => cb(0));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CpH00U3h.js
var router_CpH00U3h_exports = /* @__PURE__ */ __exportAll({
	A: () => signInWithFacebook,
	C: () => completePasswordReset,
	D: () => linkGoogleToPasswordAccount,
	E: () => linkGoogleToCurrentAccount,
	F: () => actions,
	I: () => useStore,
	L: () => bindNotifications,
	M: () => signOutUser,
	N: () => signUpWithEmail,
	O: () => resetPassword,
	P: () => validatePasswordResetCode,
	R: () => pushNotificationTo,
	S: () => authErrorMessage,
	T: () => ensurePasswordMethod,
	_: () => saveAddress,
	a: () => Route$20,
	b: () => NeedsPasswordLinkError,
	c: () => WHATSAPP,
	d: () => usePointsState,
	f: () => toggleFollow,
	g: () => listAddresses,
	getRouter: () => getRouter,
	h: () => clearCheckoutDraft,
	i: () => Route$3,
	j: () => signInWithGoogle,
	k: () => signInWithEmail,
	l: () => addPoints,
	m: () => watchOrders,
	n: () => Route$1,
	o: () => INSTAGRAM,
	p: () => useFollowedShops,
	r: () => Route$2,
	s: () => PHONE,
	t: () => router_exports,
	u: () => usePoints,
	v: () => saveCheckoutDraft,
	w: () => emailHasAccount,
	x: () => activeSignInMethods,
	y: () => trackSearch
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Notificações por utilizador — `users/{uid}/notifications/{id}`.
* Cada utilizador só lê/escreve as suas (regras do Firestore); a equipa pode
* criar notificações para o dono de um pedido, nunca ler as de outros.
*/
var stop$1 = null;
var current$1 = null;
/** Cria (ou actualiza) uma notificação na conta indicada. */
async function pushNotificationTo(uid, n) {
	const db = getDb();
	if (!db || !uid) return;
	const id = n.id ?? `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
	await setDoc(doc(db, "users", uid, "notifications", id), {
		kind: n.kind,
		title: n.title,
		body: n.body,
		href: n.href ?? null,
		read: false,
		createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-PT"),
		createdAtServer: serverTimestamp()
	}, { merge: true }).catch(() => {});
}
/** Liga a lista de notificações à conta autenticada (tempo real). */
function bindNotifications(uid) {
	if (current$1 === uid) return;
	current$1 = uid;
	stop$1?.();
	stop$1 = null;
	if (!uid) {
		registerNotificationsBridge(null);
		return;
	}
	const db = getDb();
	if (!db) return;
	registerNotificationsBridge({
		markRead: (id) => {
			updateDoc(doc(db, "users", uid, "notifications", id), { read: true }).catch(() => {});
		},
		remove: (id) => {
			deleteDoc(doc(db, "users", uid, "notifications", id)).catch(() => {});
		},
		add: (n) => {
			pushNotificationTo(uid, n);
		}
	});
	stop$1 = onSnapshot(query(collection(db, "users", uid, "notifications"), orderBy("createdAtServer", "desc")), (snap) => mergeRemoteNotifications(snap.docs.map((d) => {
		return {
			...d.data(),
			id: d.id
		};
	})), () => {});
}
var styles_default = "/assets/styles-Cd532Ws5.css";
var KEY$1 = "shop_state_v1";
var initial = {
	cart: [],
	favorites: [],
	user: null,
	loginOpen: false,
	cartDrawerOpen: false,
	favDrawerOpen: false,
	profileDrawerOpen: false,
	menuOpen: false,
	notifDrawerOpen: false
};
var state$1 = (() => {
	if (typeof window === "undefined") return initial;
	try {
		const saved = JSON.parse(localStorage.getItem(KEY$1) || "");
		return {
			...initial,
			...saved,
			loginOpen: false,
			cartDrawerOpen: false,
			favDrawerOpen: false,
			profileDrawerOpen: false,
			menuOpen: false,
			notifDrawerOpen: false
		};
	} catch {
		return initial;
	}
})();
var listeners$2 = /* @__PURE__ */ new Set();
function emit$1() {
	if (typeof window !== "undefined") localStorage.setItem(KEY$1, JSON.stringify(state$1));
	listeners$2.forEach((l) => l());
}
function subscribe(l) {
	listeners$2.add(l);
	return () => listeners$2.delete(l);
}
function useStore() {
	return (0, import_react.useSyncExternalStore)(subscribe, () => state$1, () => initial);
}
var actions = {
	addToCart(item) {
		const next = {
			selected: true,
			...item
		};
		const existing = state$1.cart.find((c) => c.id === item.id && c.size === item.size && c.color === item.color && c.variantId === item.variantId);
		if (existing) state$1 = {
			...state$1,
			cart: state$1.cart.map((c) => c === existing ? {
				...c,
				qty: c.qty + item.qty,
				selected: true
			} : c)
		};
		else state$1 = {
			...state$1,
			cart: [...state$1.cart, next]
		};
		if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([
			15,
			40,
			15
		]);
		emit$1();
	},
	removeFromCart(idx) {
		state$1 = {
			...state$1,
			cart: state$1.cart.filter((_, i) => i !== idx)
		};
		emit$1();
	},
	clearCart() {
		state$1 = {
			...state$1,
			cart: []
		};
		emit$1();
	},
	removeSelected() {
		state$1 = {
			...state$1,
			cart: state$1.cart.filter((c) => c.selected === false)
		};
		emit$1();
	},
	toggleSelected(idx) {
		state$1 = {
			...state$1,
			cart: state$1.cart.map((c, i) => i === idx ? {
				...c,
				selected: c.selected === false
			} : c)
		};
		emit$1();
	},
	setAllSelected(value) {
		state$1 = {
			...state$1,
			cart: state$1.cart.map((c) => ({
				...c,
				selected: value
			}))
		};
		emit$1();
	},
	updateQty(idx, qty) {
		if (qty < 1) return;
		state$1 = {
			...state$1,
			cart: state$1.cart.map((c, i) => i === idx ? {
				...c,
				qty
			} : c)
		};
		emit$1();
	},
	toggleFavorite(id) {
		state$1 = {
			...state$1,
			favorites: state$1.favorites.includes(id) ? state$1.favorites.filter((f) => f !== id) : [...state$1.favorites, id]
		};
		if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(20);
		emit$1();
	},
	signIn(email) {
		state$1 = {
			...state$1,
			user: {
				...state$1.user ?? {},
				email
			},
			loginOpen: false
		};
		emit$1();
	},
	/** Sincroniza o usuário autenticado (Firebase Auth). */
	setUser(user) {
		state$1 = {
			...state$1,
			user,
			loginOpen: user ? false : state$1.loginOpen
		};
		emit$1();
	},
	signOut() {
		state$1 = {
			...state$1,
			user: null
		};
		emit$1();
	},
	openLogin() {
		state$1 = {
			...state$1,
			loginOpen: true
		};
		emit$1();
	},
	closeLogin() {
		state$1 = {
			...state$1,
			loginOpen: false
		};
		emit$1();
	},
	openCartDrawer() {
		state$1 = {
			...state$1,
			cartDrawerOpen: true
		};
		emit$1();
	},
	closeCartDrawer() {
		state$1 = {
			...state$1,
			cartDrawerOpen: false
		};
		emit$1();
	},
	openFavDrawer() {
		state$1 = {
			...state$1,
			favDrawerOpen: true
		};
		emit$1();
	},
	closeFavDrawer() {
		state$1 = {
			...state$1,
			favDrawerOpen: false
		};
		emit$1();
	},
	openProfileDrawer() {
		state$1 = {
			...state$1,
			profileDrawerOpen: true
		};
		emit$1();
	},
	closeProfileDrawer() {
		state$1 = {
			...state$1,
			profileDrawerOpen: false
		};
		emit$1();
	},
	openMenu() {
		state$1 = {
			...state$1,
			menuOpen: true
		};
		emit$1();
	},
	closeMenu() {
		state$1 = {
			...state$1,
			menuOpen: false
		};
		emit$1();
	},
	setMenu(v) {
		state$1 = {
			...state$1,
			menuOpen: v
		};
		emit$1();
	},
	openNotifDrawer() {
		state$1 = {
			...state$1,
			notifDrawerOpen: true
		};
		emit$1();
	},
	closeNotifDrawer() {
		state$1 = {
			...state$1,
			notifDrawerOpen: false
		};
		emit$1();
	}
};
/**
* Verificação segura de "este email já tem conta?".
*
* Não usamos listagem de emails (enumeração) nem revelamos dados: guardamos
* apenas o SHA-256 do email em `emailIndex/{hash}`. Só quem já conhece o email
* consegue consultar o hash correspondente — as regras proibem `list`.
*/
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
	const auth = getFirebaseAuth();
	if (!auth) return () => {};
	setPersistence(auth, browserLocalPersistence).catch(() => {});
	getRedirectResult(auth).catch(() => {});
	return onAuthStateChanged(auth, (u) => cb(u ? toAppUser(u) : null));
}
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
	const { linkWithPopup } = await import("../_libs/firebase.mjs").then((n) => n.n);
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
/**
* Dados do usuário no Firestore.
*  users/{uid}                       perfil
*  users/{uid}/addresses/{id}        endereços salvos
*  users/{uid}/searches/{id}         histórico de pesquisas
*  users/{uid}/events/{id}           sinais de interesse (o que o usuário procura/quer)
*  users/{uid}/checkouts/current     checkout abandonado (apagado ao concluir o pedido)
*/
async function upsertUserProfile(user) {
	const db = getDb();
	if (!db) return;
	await setDoc(doc(db, "users", user.uid), {
		uid: user.uid,
		email: user.email,
		name: user.name ?? null,
		photoURL: user.photoURL ?? null,
		provider: user.provider ?? null,
		lastSeenAt: serverTimestamp(),
		createdAt: serverTimestamp()
	}, { merge: true });
}
async function listAddresses(uid) {
	const db = getDb();
	if (!db) return [];
	return (await getDocs(collection(db, "users", uid, "addresses"))).docs.map((d) => ({
		id: d.id,
		...d.data()
	}));
}
async function saveAddress(uid, address) {
	const db = getDb();
	if (!db) return null;
	const id = address.id || doc(collection(db, "users", uid, "addresses")).id;
	const { id: _ignored, ...data } = address;
	await setDoc(doc(db, "users", uid, "addresses", id), {
		...data,
		updatedAt: serverTimestamp(),
		createdAt: serverTimestamp()
	}, { merge: true });
	if (address.isDefault) await setDefaultAddress(uid, id);
	return id;
}
async function setDefaultAddress(uid, id) {
	const db = getDb();
	if (!db) return;
	const snap = await getDocs(query(collection(db, "users", uid, "addresses"), where("isDefault", "==", true)));
	const batch = writeBatch(db);
	snap.docs.forEach((d) => {
		if (d.id !== id) batch.update(d.ref, { isDefault: false });
	});
	batch.set(doc(db, "users", uid, "addresses", id), { isDefault: true }, { merge: true });
	await batch.commit();
}
async function trackSearch(uid, term, resultCount) {
	const db = getDb();
	const value = term.trim();
	if (!db || !uid || value.length < 2) return;
	const id = encodeURIComponent(value.toLowerCase()).slice(0, 120);
	await setDoc(doc(db, "users", uid, "searches", id), {
		term: value,
		normalized: value.toLowerCase(),
		resultCount: resultCount ?? null,
		searchCount: increment(1),
		lastSearchedAt: serverTimestamp(),
		firstSearchedAt: serverTimestamp()
	}, { merge: true });
	await updateDoc(doc(db, "users", uid, "searches", id), { lastSearchedAt: serverTimestamp() }).catch(() => {});
}
async function saveCheckoutDraft(uid, draft) {
	const db = getDb();
	if (!db || !uid) return;
	await setDoc(doc(db, "users", uid, "checkouts", "current"), {
		...draft,
		status: "abandoned",
		updatedAt: serverTimestamp()
	}, { merge: true });
}
/** Pedido concluído (ou carrinho limpo) → o rascunho é APAGADO. */
async function clearCheckoutDraft(uid) {
	const db = getDb();
	if (!db || !uid) return;
	await deleteDoc(doc(db, "users", uid, "checkouts", "current")).catch(() => {});
}
/**
* Pedidos no Firestore — `orders/{orderId}`.
* O cliente só vê/edita os próprios pedidos (regras); a equipa (staff/{uid})
* vê todos e é a única que pode notificar/alterar etapas em nome da loja.
*/
var registered = false;
function withoutUndefined(value) {
	if (Array.isArray(value)) return value.map(withoutUndefined);
	if (!value || typeof value !== "object") return value;
	return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== void 0).map(([key, entry]) => [key, withoutUndefined(entry)]));
}
function initOrdersBridge() {
	if (registered) return;
	registered = true;
	registerOrdersBridge((order) => {
		const db = getDb();
		const uid = getFirebaseAuth()?.currentUser?.uid;
		if (!db || !uid) return;
		const payload = withoutUndefined({
			...order,
			uid: order.uid ?? uid
		});
		setDoc(doc(db, "orders", order.id), {
			...payload,
			updatedAt: serverTimestamp()
		}, { merge: true }).catch((error) => {
			console.error("Não foi possível guardar o estado do pedido:", error);
		});
	}, (id) => {
		const db = getDb();
		if (!db) return;
		deleteDoc(doc(db, "orders", id)).catch(() => {});
	});
}
/** Observa os pedidos do utilizador (ou todos, se for staff). */
function watchOrders(uid, isStaff) {
	const db = getDb();
	if (!db || !uid) return () => {};
	const ref = collection(db, "orders");
	const q = isStaff ? query(ref) : query(ref, where("uid", "==", uid));
	return onSnapshot(q, (snap) => mergeRemoteOrders(snap.docs.map((d) => ({
		id: d.id,
		...d.data()
	}))), () => {});
}
/**
* Seguir lojas — guardado por utilizador em `users/{uid}/follows/{shopId}`.
* Sem sessão o botão pede login (nenhum dado anónimo é gravado).
*/
var ids = [];
var empty = [];
var listeners$1 = /* @__PURE__ */ new Set();
var stop = null;
var current = null;
function emit(next) {
	ids = next;
	listeners$1.forEach((l) => l());
}
/** Liga a lista de lojas seguidas à conta autenticada. */
function bindFollows(uid) {
	if (current === uid) return;
	current = uid;
	stop?.();
	stop = null;
	if (!uid) {
		emit(empty);
		return;
	}
	const db = getDb();
	if (!db) return;
	stop = onSnapshot(collection(db, "users", uid, "follows"), (snap) => emit(snap.docs.map((d) => d.id)), () => emit(empty));
}
function useFollowedShops() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners$1.add(l);
		return () => listeners$1.delete(l);
	}, () => ids, () => empty);
}
/** Alterna o seguir/deixar de seguir. Devolve o novo estado. */
async function toggleFollow(shopId, shopName) {
	const db = getDb();
	if (!db || !current) throw new Error("Entre na sua conta para seguir lojas.");
	const ref = doc(db, "users", current, "follows", shopId);
	if (ids.includes(shopId)) {
		emit(ids.filter((i) => i !== shopId));
		await deleteDoc(ref);
		return false;
	}
	emit([...ids, shopId]);
	await setDoc(ref, {
		shopId,
		shopName: shopName ?? null,
		createdAt: serverTimestamp()
	});
	return true;
}
/**
* Pontos Bazarixy.
*
*  · Avaliações de pedidos → pontos guardados em `users/{uid}.points`.
*  · Convites aceites      → 5 pontos por amigo (contados em `referrals`).
*
* Sem sessão os pontos ficam apenas no dispositivo (localStorage) e são
* enviados para o banco assim que o utilizador entra.
*/
var KEY = "bx_points_v1";
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
		total: next.earned + next.referrals * 5
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
/** Mantém o estado local em sincronia com o Firebase Auth. Não renderiza nada. */
function FirebaseAuthSync() {
	const stopOrders = (0, import_react.useRef)(null);
	const lastUid = (0, import_react.useRef)(null);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		if (!firebaseEnabled) return;
		captureReferralFromUrl();
		initAnalytics();
		initOrdersBridge();
		return subscribeToUser((user) => {
			stopOrders.current?.();
			stopOrders.current = null;
			if (!user) {
				const wasSignedIn = lastUid.current !== null;
				lastUid.current = null;
				actions.setUser(null);
				watchStaff(null);
				bindPoints(null);
				bindFollows(null);
				bindNotifications(null);
				setNotificationsOwner(null);
				setOrdersOwner(null);
				if (wasSignedIn) router.invalidate();
				return;
			}
			const isNewSession = lastUid.current !== user.uid;
			lastUid.current = user.uid;
			setOrdersOwner(user.uid);
			setNotificationsOwner(user.uid);
			bindNotifications(user.uid);
			actions.setUser({
				email: user.email,
				uid: user.uid,
				name: user.name,
				photoURL: user.photoURL
			});
			if (isNewSession) {
				actions.closeLogin();
				router.invalidate();
			}
			upsertUserProfile(user);
			recordReferralOnce(user.uid);
			bindPoints(user.uid);
			bindFollows(user.uid);
			if (user.email) rememberEmail(user.email);
			watchStaff(user.uid);
			stopOrders.current = watchOrders(user.uid, false);
		});
	}, [router]);
	return null;
}
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$44 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: HOME_TITLE },
			{
				name: "description",
				content: HOME_DESCRIPTION
			},
			{
				name: "author",
				content: SITE_NAME
			},
			{
				property: "og:site_name",
				content: SITE_NAME
			},
			{
				property: "og:locale",
				content: "pt_PT"
			},
			{
				property: "og:title",
				content: HOME_TITLE
			},
			{
				property: "og:description",
				content: HOME_DESCRIPTION
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: SITE_URL
			},
			{
				property: "og:image",
				content: SHARE_IMAGE
			},
			{
				property: "og:image:alt",
				content: "Bazarixy"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: HOME_TITLE
			},
			{
				name: "twitter:description",
				content: HOME_DESCRIPTION
			},
			{
				name: "twitter:image",
				content: SHARE_IMAGE
			},
			{
				name: "twitter:image:alt",
				content: "Bazarixy"
			}
		],
		links: [
			{
				rel: "canonical",
				href: SITE_URL
			},
			{
				rel: "sitemap",
				href: "/sitemap.xml",
				type: "application/xml"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "shortcut icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.ico"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$44.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirebaseAuthSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				offset: 0,
				gap: 10,
				expand: false,
				visibleToasts: 3,
				icons: {
					success: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white",
						children: "✓"
					}),
					error: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-500 text-white",
						children: "!"
					}),
					warning: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500 text-white",
						children: "!"
					}),
					info: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground text-background",
						children: "i"
					})
				},
				className: "!fixed !inset-x-0 !left-0 !top-1/2 !mx-auto !flex !w-[calc(100vw-24px)] !max-w-[420px] !-translate-y-1/2 !transform !flex-col !items-center",
				toastOptions: {
					unstyled: true,
					duration: 2600,
					classNames: {
						toast: "pointer-events-auto mx-auto flex w-full min-w-0 items-center justify-center gap-2.5 rounded-2xl border border-black/5 bg-white/95 px-3.5 py-3 text-center text-foreground shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-4",
						content: "flex min-w-0 flex-1 flex-col items-center gap-0.5",
						title: "w-full break-words text-[13px] font-bold leading-snug text-neutral-900 sm:text-[13.5px]",
						description: "w-full break-words text-[11.5px] font-medium leading-[1.35] text-neutral-500 sm:text-[12px]",
						actionButton: "shrink-0 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-bold text-background",
						cancelButton: "shrink-0 rounded-full border border-border px-3 py-1.5 text-[11px] font-bold",
						icon: "shrink-0"
					}
				}
			})
		]
	});
}
var $$splitComponentImporter$41 = () => import("./routes-D4uQeF1q.mjs");
var Route$43 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: HOME_TITLE },
		{
			name: "description",
			content: HOME_DESCRIPTION
		},
		{
			property: "og:title",
			content: HOME_TITLE
		},
		{
			property: "og:description",
			content: HOME_DESCRIPTION
		},
		{
			property: "og:url",
			content: SITE_URL
		},
		{
			property: "og:image",
			content: SHARE_IMAGE
		},
		{
			property: "og:image:alt",
			content: "Bazarixy - Compras online em Angola"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: HOME_TITLE
		},
		{
			name: "twitter:description",
			content: HOME_DESCRIPTION
		},
		{
			name: "twitter:image",
			content: SHARE_IMAGE
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./auth-BamESJnH.mjs");
var Route$42 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Entrar / Cadastrar — Bazarixy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitComponentImporter$39 = () => import("./cart-BthoTlt4.mjs");
var Route$41 = createFileRoute("/cart")({
	head: () => ({ meta: [
		{ title: "Sacola — Bazarixy" },
		{
			name: "description",
			content: "Reveja os produtos da sua sacola, escolha o que quer pagar agora e finalize a compra na Bazarixy."
		},
		{
			property: "og:title",
			content: "Sacola — Bazarixy"
		},
		{
			property: "og:description",
			content: "Seleccione os itens que quer pagar e finalize a compra."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
/**
* «Talvez goste também» — recomendações a partir das categorias dos itens da
* sacola (ou os mais recentes, quando a sacola está vazia).
*/
var $$splitComponentImporter$38 = () => import("./categories-ko_RNZ0Q.mjs");
var Route$40 = createFileRoute("/categories")({
	head: () => ({ meta: [
		{ title: "Buscar produtos — Bazarixy" },
		{
			name: "description",
			content: "Pesquise produtos, explore categorias e descubra as tendências mais vendidas na Bazarixy."
		},
		{
			property: "og:title",
			content: "Buscar produtos — Bazarixy"
		},
		{
			property: "og:description",
			content: "Pesquise produtos e explore todas as categorias da Bazarixy."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./checkout-civD_IJa.mjs");
var Route$39 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Finalizar Compra — Bazarixy" }, {
		name: "description",
		content: "Complete seu pedido em 3 etapas: endereço, confirmação e pagamento."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./como-pagar-O0bWIte3.mjs");
var Route$38 = createFileRoute("/como-pagar")({
	head: () => ({ meta: [{ title: "Como pagar — Bazarixy" }, {
		name: "description",
		content: "Aprenda a pagar na Bazarixy e a enviar um comprovativo válido."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./coupons-Be5_9gHf.mjs");
var Route$37 = createFileRoute("/coupons")({
	head: () => ({ meta: [
		{ title: "Meus cupões — Bazarixy" },
		{
			name: "description",
			content: "Veja os cupões de desconto disponíveis, os já usados e os expirados, e aplique-os ao finalizar a compra na Bazarixy."
		},
		{
			property: "og:title",
			content: "Meus cupões — Bazarixy"
		},
		{
			property: "og:description",
			content: "Cupões de desconto disponíveis para usar no checkout."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./favorites-BR9pbgwF.mjs");
var Route$36 = createFileRoute("/favorites")({
	head: () => ({ meta: [{ title: "Favoritos — Bazarixy" }, {
		name: "description",
		content: "Seus produtos favoritos."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./justina-CWqFBNDp.mjs");
var Route$35 = createFileRoute("/justina")({
	head: () => ({ meta: [
		{ title: "Admin — Bazarixy" },
		{
			name: "description",
			content: "Painel de administração — banners, produtos, categorias, pedidos, lojas."
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./me-CZ8eExP4.mjs");
var Route$34 = createFileRoute("/me")({
	head: () => ({ meta: [{ title: "Minha conta — Bazarixy" }, {
		name: "description",
		content: "Sua conta Bazarixy."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./notifications-5plLB3HY.mjs");
var Route$33 = createFileRoute("/notifications")({
	head: () => ({ meta: [
		{ title: "Notificações — Bazarixy" },
		{
			name: "description",
			content: "Acompanhe pedidos, entregas, cupões e novidades das lojas da Bazarixy num só lugar."
		},
		{
			property: "og:title",
			content: "Notificações — Bazarixy"
		},
		{
			property: "og:description",
			content: "Pedidos, entregas, cupões e novidades."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./orders-DoPjGni2.mjs");
var searchSchema = objectType({ tab: enumType([
	"unpaid",
	"processing",
	"shipped",
	"review",
	"returns"
]).optional() });
var Route$32 = createFileRoute("/orders")({
	head: () => ({ meta: [{ title: "Meus pedidos — Bazarixy" }] }),
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
/** Resumo da devolução e do reembolso — sem etapas antigas, só o que falta fazer. */
/** Etapa a partir da qual cada separador começa a contar (não repetimos o passado). */
/** Etapas visíveis: começam no separador atual e param na etapa em curso. */
/** Estado por loja: cada pacote pode andar num ritmo diferente. */
var $$splitComponentImporter$29 = () => import("./points-BHEy1XGm.mjs");
var Route$31 = createFileRoute("/points")({
	head: () => ({ meta: [
		{ title: "Meus pontos e convites — Bazarixy" },
		{
			name: "description",
			content: "Veja os seus pontos Bazarixy, convide amigos com o seu link único e ganhe pontos por cada avaliação."
		},
		{
			property: "og:title",
			content: "Meus pontos e convites — Bazarixy"
		},
		{
			property: "og:description",
			content: "Ganhe pontos por avaliações e por cada amigo convidado."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./privacidade-BD1TwJEU.mjs");
var Route$30 = createFileRoute("/privacidade")({
	head: () => ({ meta: [
		{ title: "Política de Privacidade — Bazarixy" },
		{
			name: "description",
			content: "Política de privacidade da plataforma Bazarixy, incluindo recolha, utilização, proteção e partilha de dados pessoais."
		},
		{
			property: "og:title",
			content: "Política de Privacidade — Bazarixy"
		},
		{
			property: "og:description",
			content: "Como o Bazarixy recolhe, utiliza, protege e partilha os dados dos utilizadores."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./settings-lcMgckGo.mjs");
var Route$29 = createFileRoute("/settings")({
	head: () => ({ meta: [{ title: "Configurações — Bazarixy" }, {
		name: "description",
		content: "Configurações da sua conta Bazarixy."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./store-sUG6mcCj.mjs");
var Route$28 = createFileRoute("/store")({
	head: () => ({ meta: [{ title: "MonkeyK Beauty Tool — Loja oficial | Bazarixy" }, {
		name: "description",
		content: "Descubra a loja oficial MonkeyK Beauty Tool na Bazarixy. Produtos de beleza com alta taxa de recompra."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./super-ofertas-BISiUMLK.mjs");
var Route$27 = createFileRoute("/super-ofertas")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./support-DoE7Pgq9.mjs");
var WHATSAPP = "https://wa.me/244934033532";
var INSTAGRAM = "https://www.instagram.com/bazarixy/";
var PHONE = "+244 934 033 532";
var Route$26 = createFileRoute("/support")({
	head: () => ({ meta: [
		{ title: "Suporte Bazarixy — Assistente e contactos" },
		{
			name: "description",
			content: "Fale com a Siyo, a assistente virtual da Bazarixy, ou contacte a equipa por WhatsApp, Instagram e telefone."
		},
		{
			property: "og:title",
			content: "Suporte Bazarixy — Assistente e contactos"
		},
		{
			property: "og:description",
			content: "Assistente virtual, WhatsApp, Instagram e telefone da Bazarixy."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./termos-CrOGfof3.mjs");
var Route$25 = createFileRoute("/termos")({
	head: () => ({ meta: [
		{ title: "Termos e Condições — Bazarixy" },
		{
			name: "description",
			content: "Termos e condições de utilização da plataforma Bazarixy, incluindo compras, pagamentos, entregas e responsabilidades da marketplace em Angola."
		},
		{
			property: "og:title",
			content: "Termos e Condições — Bazarixy"
		},
		{
			property: "og:description",
			content: "Regras de utilização, responsabilidades, pagamentos e protecção de dados da plataforma Bazarixy."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./trocas-devolucoes-CzSBpDHN.mjs");
var Route$24 = createFileRoute("/trocas-devolucoes")({
	head: () => ({ meta: [
		{ title: "Política de Trocas e Devoluções — Bazarixy" },
		{
			name: "description",
			content: "Política de trocas e devoluções da Bazarixy, incluindo prazos, defeitos, reembolsos e condições aplicáveis à compra."
		},
		{
			property: "og:title",
			content: "Política de Trocas e Devoluções — Bazarixy"
		},
		{
			property: "og:description",
			content: "Regras para devolução, troca e reembolso de produtos comprados na Bazarixy."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./wallet-Qh97DFfC.mjs");
var Route$23 = createFileRoute("/wallet")({
	head: () => ({ meta: [{ title: "Carteira — Bazarixy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
/**
* Componentes reutilizáveis para os e-mails da Bazarixy.
*
* São funções puras que devolvem HTML responsivo (tabelas + estilos inline),
* o formato que funciona em Gmail, Outlook, Apple Mail e webmails africanos.
* Nenhum destes ficheiros toca no Firebase — só constrói HTML.
*/
var BRAND = "#e83e8c";
var BRAND_DARK = "#c52d73";
var BRAND_PALE = "#fff0f6";
var TEXT = "#24202a";
var MUTED = "#766d78";
var BORDER = "#f1e5ec";
var LOGO_URL = absoluteUrl("/logotipo.webp");
/** Escapa texto vindo de dados do utilizador (nunca injectar HTML cru). */
function esc(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function heading(text) {
	return `<h1 style="margin:0 0 12px;font:700 24px/1.25 Arial,Helvetica,sans-serif;letter-spacing:-.2px;color:${TEXT}">${esc(text)}</h1>`;
}
function paragraph(text) {
	return `<p style="margin:0 0 16px;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:${TEXT}">${text}</p>`;
}
function muted(text) {
	return `<p style="margin:0 0 10px;font:400 13px/1.6 Arial,Helvetica,sans-serif;color:${MUTED}">${text}</p>`;
}
function noticeLabel(label) {
	return `<div style="display:inline-block;margin:0 0 16px;padding:7px 11px;border-radius:999px;background:${BRAND_PALE};font:700 11px Arial,Helvetica,sans-serif;letter-spacing:.4px;text-transform:uppercase;color:${BRAND_DARK}">${esc(label)}</div>`;
}
function messageBlock(text) {
	return `<div style="margin:18px 0;padding:16px 18px;border-left:4px solid ${BRAND};border-radius:0 10px 10px 0;background:#fff7fa;font:400 14px/1.65 Arial,Helvetica,sans-serif;color:${TEXT}">${esc(text).replace(/\r?\n/g, "<br />")}</div>`;
}
function button(label, href) {
	return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0">
    <tr><td style="background:${BRAND};border-radius:10px;box-shadow:0 5px 14px rgba(232,62,140,.2)">
      <a href="${esc(href)}" style="display:inline-block;padding:14px 26px;font:700 14px Arial,Helvetica,sans-serif;color:#fff;text-decoration:none">${esc(label)}</a>
    </td></tr>
  </table>`;
}
function codeBox(code) {
	return `<div style="margin:22px 0;padding:20px;border:1px solid #f6c4db;border-radius:14px;text-align:center;background:${BRAND_PALE}">
    <div style="font:700 34px/1 Arial,Helvetica,sans-serif;letter-spacing:9px;color:${BRAND_DARK}">${esc(code)}</div>
    <div style="margin-top:8px;font:400 12px Arial,Helvetica,sans-serif;color:${MUTED}">Código de verificação</div>
  </div>`;
}
function itemsTable(items) {
	return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER};border-bottom:1px solid ${BORDER};margin:18px 0">${items.map((i) => `<tr>
        <td style="padding:12px 0;width:62px;vertical-align:top">${i.image ? `<img src="${esc(i.image)}" width="56" height="56" alt="${esc(i.name)}" style="border-radius:10px;object-fit:cover;display:block;border:1px solid ${BORDER}" />` : ""}</td>
        <td style="padding:10px 8px;font:400 14px/1.4 Arial,Helvetica,sans-serif;color:${TEXT}">${esc(i.name)}<br /><span style="color:${MUTED};font-size:12px">Qtd: ${esc(i.qty)}</span></td>
        <td style="padding:10px 0;text-align:right;font:700 14px Arial,Helvetica,sans-serif;color:${TEXT};white-space:nowrap">${esc(i.price)}</td>
      </tr>`).join("")}</table>`;
}
function summaryRow(label, value, strong = false) {
	const weight = strong ? 700 : 400;
	return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="font:${weight} 14px Arial,Helvetica,sans-serif;color:${TEXT};padding:4px 0">${esc(label)}</td>
    <td style="font:${weight} 14px Arial,Helvetica,sans-serif;color:${strong ? BRAND_DARK : TEXT};padding:4px 0;text-align:right">${esc(value)}</td>
  </tr></table>`;
}
/** Envelope comum: cabeçalho, corpo centrado (máx. 600px) e rodapé. */
function shell(bodyHtml, preheader = "") {
	return `<!doctype html>
<html lang="pt"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${SITE_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#fff7fa">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff7fa;padding:30px 12px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${BORDER};border-radius:18px;overflow:hidden">
      <tr><td style="padding:22px 28px;border-bottom:1px solid ${BORDER};background:#fff">
        <a href="${SITE_URL}" style="display:inline-block;text-decoration:none"><img src="${LOGO_URL}" width="164" alt="${SITE_NAME}" style="display:block;width:164px;height:auto;max-height:58px;object-fit:contain;object-position:left center" /></a>
      </td></tr>
      <tr><td style="padding:26px 28px">${bodyHtml}</td></tr>
      <tr><td style="padding:24px 28px;background:${BRAND_PALE};font:400 12px/1.7 Arial,Helvetica,sans-serif;color:${MUTED}">
        <strong style="color:${TEXT}">Bazarixy</strong> · Compras online em Angola<br />
        Recebeu este e-mail porque tem uma conta ou uma encomenda na ${SITE_NAME}.<br />
        <a href="${SITE_URL}" style="color:${BRAND_DARK};font-weight:700;text-decoration:none">${SITE_URL.replace("https://", "")}</a> · <a href="${absoluteUrl("/support")}" style="color:${BRAND_DARK};font-weight:700;text-decoration:none">Contactar suporte</a><br />
        <span style="color:#9b8d97">Este é um e-mail automático. Por favor, não responda directamente.</span>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
/**
* Registo central dos e-mails da Bazarixy.
*
* Para acrescentar um novo tipo de e-mail no futuro basta adicionar uma entrada
* em `EMAIL_TEMPLATES`: assunto + HTML. Nada mais precisa de mudar (a API e o
* helper do frontend passam a aceitar o novo nome automaticamente).
*/
var url = (path) => path ? path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}` : SITE_URL;
var hello = (name) => paragraph(name ? `Olá <strong>${esc(name)}</strong>,` : "Olá,");
var EMAIL_TEMPLATES = {
	"verify-email": (d) => ({
		subject: `${d.code} é o seu código de verificação — Bazarixy`,
		html: shell(noticeLabel("Segurança da conta") + heading("Confirme o seu e-mail") + hello(d.name) + paragraph("Use o código abaixo para confirmar a sua conta na Bazarixy.") + codeBox(d.code) + muted(`O código expira em ${esc(d.minutes ?? 15)} minutos. Se não foi você, ignore este e-mail.`), "Código de verificação da sua conta")
	}),
	"password-reset": (d) => ({
		subject: "Recuperar a sua palavra-passe — Bazarixy",
		html: shell(heading("Recuperar palavra-passe") + hello(d.name) + paragraph("Recebemos um pedido para redefinir a sua palavra-passe. Toque no botão abaixo para criar uma nova.") + button("Criar nova palavra-passe", d.resetLink) + muted("O link é válido por tempo limitado e só pode ser usado uma vez. Se não pediu isto, pode ignorar este e-mail em segurança."), "Redefina a sua palavra-passe")
	}),
	"order-confirmation": (d) => ({
		subject: `Pedido ${d.orderCode} confirmado — Bazarixy`,
		html: shell(noticeLabel("Compra recebida") + heading("Pedido confirmado!") + hello(d.name) + paragraph(`Obrigado pela sua compra. O seu pedido <strong>${esc(d.orderCode)}</strong> foi registado e já está a ser tratado.`) + itemsTable(d.items) + summaryRow("Subtotal", d.subtotal) + (d.discount ? summaryRow("Desconto", `-${d.discount}`) : "") + summaryRow("Frete", "Grátis") + summaryRow("Total", d.total, true) + (d.paymentMethod ? muted(`Pagamento: ${esc(d.paymentMethod)}`) : "") + (d.address ? muted(`Entrega: ${esc(d.address)}`) : "") + button("Ver os meus pedidos", url("/orders")), `Pedido ${d.orderCode} confirmado`)
	}),
	notification: (d) => ({
		subject: `${d.title} — Bazarixy`,
		html: shell(noticeLabel("Actualização da encomenda") + heading(d.title) + hello(d.name) + messageBlock(d.message) + muted("Consulte os detalhes e acompanhe o progresso da sua encomenda a qualquer momento.") + (d.ctaLabel ? button(d.ctaLabel, url(d.ctaPath)) : ""), `Actualização da encomenda: ${d.title}`)
	}),
	promo: (d) => ({
		subject: d.headline,
		html: shell((d.imageUrl ? `<img src="${esc(d.imageUrl)}" alt="" width="544" style="display:block;width:100%;border-radius:12px;margin-bottom:18px" />` : "") + heading(d.headline) + hello(d.name) + paragraph(esc(d.message)) + button(d.ctaLabel ?? "Ver ofertas", url(d.ctaPath ?? "/super-ofertas")), d.headline)
	})
};
function isEmailTemplate(value) {
	return typeof value === "string" && value in EMAIL_TEMPLATES;
}
function buildEmail(template, data) {
	const build = EMAIL_TEMPLATES[template];
	return build(data ?? {});
}
/**
* API serverless de e-mails (Resend).
* POST /api/email  { template, to, data }
*
* Segurança:
*  - a chave do Resend vive só nas Environment Variables do servidor;
*  - é obrigatório um ID token válido do Firebase (Authorization: Bearer …);
*  - o destinatário tem de ser o e-mail do próprio utilizador autenticado
*    (excepto para membros com token de serviço interno em campanhas).
*/
var Route$22 = createFileRoute("/api/email")({ server: { handlers: { POST: async ({ request }) => {
	const { sendWithResend, verifyFirebaseIdToken, isActiveStaff } = await import("./resend.server-B5phQiG-.mjs");
	let payload;
	try {
		payload = await request.json();
	} catch {
		return Response.json({ error: "JSON inválido." }, { status: 400 });
	}
	const { template, to, data } = payload;
	if (!isEmailTemplate(template)) return Response.json({ error: "Template desconhecido." }, { status: 400 });
	if (typeof to !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return Response.json({ error: "Destinatário inválido." }, { status: 400 });
	const auth = request.headers.get("authorization") ?? "";
	const idToken = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "";
	const account = await verifyFirebaseIdToken(idToken);
	if (!account) return Response.json({ error: "Não autorizado." }, { status: 401 });
	if (account.email && account.email !== to.toLowerCase()) {
		if (!await isActiveStaff(idToken, account.uid)) return Response.json({ error: "Só é possível enviar para o seu próprio e-mail." }, { status: 403 });
	}
	try {
		const { subject, html } = buildEmail(template, data);
		const result = await sendWithResend({
			to,
			subject,
			html
		});
		return Response.json({
			ok: true,
			id: result.id
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Falha no envio.";
		console.error("[/api/email]", message);
		return Response.json({
			ok: false,
			error: message
		}, { status: 502 });
	}
} } } });
var MAX_AGE_SECONDS = 900;
var COOKIE = "bazarixy_signup_verification";
function secret() {
	return processModule.env["EMAIL_VERIFICATION_SECRET"] || processModule.env["RESEND_API_KEY"] || "development-only-verification-secret";
}
function base64Url(value) {
	const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);
	let binary = "";
	bytes.forEach((byte) => binary += String.fromCharCode(byte));
	return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function fromBase64Url(value) {
	const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
	return atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="));
}
async function digest(value) {
	const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
	return Array.from(new Uint8Array(bytes)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function signature(value) {
	const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret()), {
		name: "HMAC",
		hash: "SHA-256"
	}, false, ["sign"]);
	return base64Url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
}
async function seal(challenge) {
	const payload = base64Url(JSON.stringify(challenge));
	return `${payload}.${await signature(payload)}`;
}
async function unseal(value) {
	if (!value) return null;
	const [payload, provided] = value.split(".");
	if (!payload || !provided || await signature(payload) !== provided) return null;
	try {
		const data = JSON.parse(fromBase64Url(payload));
		if (typeof data.email !== "string" || typeof data.codeHash !== "string" || typeof data.expiresAt !== "number" || Date.now() > data.expiresAt) return null;
		return data;
	} catch {
		return null;
	}
}
function cookie(value, maxAge, secure) {
	return `${COOKIE}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`;
}
function getCookie(request) {
	return request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(29) ?? null;
}
var Route$21 = createFileRoute("/api/signup-verification")({ server: { handlers: { POST: async ({ request }) => {
	const secure = new URL(request.url).protocol === "https:";
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "JSON inválido." }, { status: 400 });
	}
	if (body.action === "request") {
		const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
		const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : void 0;
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Email inválido." }, { status: 400 });
		const code = String(Math.floor(Math.random() * 1e6)).padStart(6, "0");
		const challenge = {
			email,
			codeHash: await digest(`${email}:${code}`),
			expiresAt: Date.now() + MAX_AGE_SECONDS * 1e3
		};
		try {
			const { subject, html } = buildEmail("verify-email", {
				code,
				name,
				minutes: 15
			});
			const { sendWithResend } = await import("./resend.server-B5phQiG-.mjs");
			await sendWithResend({
				to: email,
				subject,
				html
			});
			return new Response(JSON.stringify({ ok: true }), { headers: {
				"content-type": "application/json",
				"set-cookie": await seal(challenge).then((value) => cookie(value, MAX_AGE_SECONDS, secure))
			} });
		} catch (error) {
			console.error("[/api/signup-verification]", error);
			return Response.json({ error: "Não foi possível enviar o código agora." }, { status: 502 });
		}
	}
	if (body.action === "verify") {
		const code = typeof body.code === "string" ? body.code.trim() : "";
		const challenge = await unseal(getCookie(request));
		if (!challenge || !/^\d{6}$/.test(code)) return Response.json({
			ok: false,
			error: "Código inválido ou expirado."
		}, { status: 400 });
		if (!(await digest(`${challenge.email}:${code}`) === challenge.codeHash)) return Response.json({
			ok: false,
			error: "Código incorrecto."
		}, { status: 400 });
		return new Response(JSON.stringify({
			ok: true,
			email: challenge.email
		}), { headers: {
			"content-type": "application/json",
			"set-cookie": cookie("", 0, secure)
		} });
	}
	return Response.json({ error: "Acção inválida." }, { status: 400 });
} } } });
var $$splitErrorComponentImporter$1 = () => import("./category._slug-bmCanHhQ.mjs");
var $$splitNotFoundComponentImporter$2 = () => import("./category._slug-BOpaib3n.mjs");
var $$splitComponentImporter$20 = () => import("./category._slug-yTM3vScw.mjs");
var Route$20 = createFileRoute("/category/$slug")({
	validateSearch: (search) => ({ sub: typeof search.sub === "string" ? search.sub : void 0 }),
	loader: ({ params }) => ({ slug: params.slug }),
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `Categoria — Bazarixy` }, {
		name: "description",
		content: `Compre produtos com preços incríveis.`
	}] : [] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent")
});
var $$splitComponentImporter$19 = () => import("./justina.index-CmAYknS0.mjs");
var Route$19 = createFileRoute("/justina/")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./justina.categorias-DxBXav_X.mjs");
var Route$18 = createFileRoute("/justina/categorias")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./justina.config-Bsos5-Ie.mjs");
var Route$17 = createFileRoute("/justina/config")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./justina.cupons-DCrT0hnI.mjs");
var Route$16 = createFileRoute("/justina/cupons")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./justina.equipa-DDzgx0ke.mjs");
var Route$15 = createFileRoute("/justina/equipa")({
	head: () => ({ meta: [
		{ title: "Equipa — Admin Bazarixy" },
		{
			name: "description",
			content: "Adicione membros da equipa e defina o sector de cada um."
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./justina.home-B7fZqLAY.mjs");
var Route$14 = createFileRoute("/justina/home")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./justina.logistica-_LI8a22I.mjs");
var Route$13 = createFileRoute("/justina/logistica")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./justina.lojas-afqzjvR8.mjs");
var Route$12 = createFileRoute("/justina/lojas")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./justina.metas-Dw0OYxg9.mjs");
var Route$11 = createFileRoute("/justina/metas")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./justina.pagamentos-CzqKBQ_k.mjs");
var Route$10 = createFileRoute("/justina/pagamentos")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./justina.pedidos-xJ-S7zcT.mjs");
/** Renders one quarter-A4 invoice card. Four of these fit on a single A4 sheet. */
/** Prints every «Processando» order — 4 invoices per A4 sheet. */
var Route$9 = createFileRoute("/justina/pedidos")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./justina.pesquisas-BcctIy2B.mjs");
var Route$8 = createFileRoute("/justina/pesquisas")({
	head: () => ({ meta: [
		{ title: "Pesquisas dos clientes — Bazarixy Admin" },
		{
			name: "description",
			content: "Veja o que os clientes procuram e encontre oportunidades para a loja."
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./justina.produtos-C8XqU9_V.mjs");
var Route$7 = createFileRoute("/justina/produtos")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
/** Sugestões de atributos por tipo de produto — funciona para roupa, eletrónica, casa, etc. */
var $$splitComponentImporter$6 = () => import("./justina.receita-D6Gtl5a1.mjs");
var Route$6 = createFileRoute("/justina/receita")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./justina.usuarios-Cth8Sszb.mjs");
var Route$5 = createFileRoute("/justina/usuarios")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./pay._method-B0UZbYps.mjs");
var Route$4 = createFileRoute("/pay/$method")({
	head: () => ({ meta: [
		{ title: "Pagamento — Bazarixy" },
		{
			name: "description",
			content: "Conclua o pagamento do seu pedido e envie o comprovativo para validação."
		},
		{
			property: "og:title",
			content: "Pagamento — Bazarixy"
		},
		{
			property: "og:description",
			content: "Instruções de pagamento e envio de comprovativo."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitErrorComponentImporter = () => import("./product._id-DHBmcByM.mjs");
var $$splitNotFoundComponentImporter$1 = () => import("./product._id-CQgU_mlI.mjs");
var $$splitComponentImporter$3 = () => import("./product._id-BfLMVrVI.mjs");
var Route$3 = createFileRoute("/product/$id")({
	validateSearch: (search) => ({ variant: typeof search.variant === "string" ? search.variant : void 0 }),
	loader: ({ params }) => getProduct(params.id) ?? null,
	head: ({ params, loaderData }) => {
		const path = paths.product(params.id);
		if (!loaderData) return {
			meta: [{ title: `Produto — ${SITE_NAME}` }],
			links: [{
				rel: "canonical",
				href: absoluteUrl(path)
			}]
		};
		const url = productUrl(params.id);
		const image = absoluteUrl(loaderData.image);
		const shareImage = SHARE_IMAGE;
		const price = loaderData.price;
		const desc = seoDescription(loaderData.description, `${loaderData.name} na ${SITE_NAME}.`);
		return {
			meta: [
				{ title: `${loaderData.name} — ${SITE_NAME}` },
				{
					name: "description",
					content: desc
				},
				{
					property: "og:site_name",
					content: SITE_NAME
				},
				{
					property: "og:locale",
					content: "pt_PT"
				},
				{
					property: "og:type",
					content: "product"
				},
				{
					property: "og:title",
					content: loaderData.name
				},
				{
					property: "og:description",
					content: desc
				},
				{
					property: "og:url",
					content: url
				},
				{
					property: "og:image",
					content: shareImage
				},
				{
					property: "og:image:alt",
					content: loaderData.name
				},
				{
					property: "product:price:amount",
					content: String(price)
				},
				{
					property: "product:price:currency",
					content: "AOA"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:title",
					content: loaderData.name
				},
				{
					name: "twitter:description",
					content: desc
				},
				{
					name: "twitter:image",
					content: shareImage
				},
				{
					name: "twitter:image:alt",
					content: loaderData.name
				}
			],
			links: [{
				rel: "canonical",
				href: url
			}],
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Product",
					name: loaderData.name,
					description: desc,
					image: [image],
					url,
					brand: {
						"@type": "Brand",
						name: SITE_NAME
					},
					offers: {
						"@type": "Offer",
						price,
						priceCurrency: "AOA",
						availability: "https://schema.org/InStock",
						url
					}
				})
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
/** Dados reais da loja associada ao produto; o toque leva ao respetivo perfil. */
/** Colour / detail selector — shows each variant's cover photo and swaps the gallery. */
var $$splitNotFoundComponentImporter = () => import("./shop._id-CNDPIdZ1.mjs");
var $$splitComponentImporter$2 = () => import("./shop._id-BDDyC2jR.mjs");
var Route$2 = createFileRoute("/shop/$id")({
	loader: ({ params }) => ({
		id: params.id,
		shop: getShop(params.id)
	}),
	head: ({ params, loaderData }) => {
		const shop = loaderData.shop;
		const name = shop?.name ?? "Loja";
		const desc = seoDescription(shop?.description, `Descubra a loja ${name} na ${SITE_NAME}.`);
		const image = absoluteUrl(shop?.cover || shop?.logo || "/favicon.ico");
		return {
			meta: [
				{ title: `${name} — Loja oficial | ${SITE_NAME}` },
				{
					name: "description",
					content: desc
				},
				{
					property: "og:site_name",
					content: SITE_NAME
				},
				{
					property: "og:title",
					content: `${name} — ${SITE_NAME}`
				},
				{
					property: "og:description",
					content: desc
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:locale",
					content: "pt_PT"
				},
				{
					property: "og:url",
					content: shopUrl(params.id)
				},
				{
					property: "og:image",
					content: SHARE_IMAGE
				},
				{
					property: "og:image:alt",
					content: name
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:title",
					content: `${name} — ${SITE_NAME}`
				},
				{
					name: "twitter:description",
					content: desc
				},
				{
					name: "twitter:image",
					content: SHARE_IMAGE
				},
				{
					name: "twitter:image:alt",
					content: name
				}
			],
			links: [{
				rel: "canonical",
				href: shopUrl(params.id)
			}],
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Store",
					name,
					description: desc,
					image,
					url: shopUrl(params.id),
					brand: {
						"@type": "Brand",
						name: SITE_NAME
					}
				})
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var $$splitComponentImporter$1 = () => import("./justina.abas._id-8E63sMiR.mjs");
var Route$1 = createFileRoute("/justina/abas/$id")({
	head: () => ({ meta: [
		{ title: "Gerir aba da home — Bazarixy Admin" },
		{
			name: "description",
			content: "Crie e edite abas principais da página inicial: nome, categorias e banners exclusivos."
		},
		{
			property: "og:title",
			content: "Gerir aba da home — Bazarixy Admin"
		},
		{
			property: "og:description",
			content: "Crie e edite abas principais da página inicial: nome, categorias e banners exclusivos."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./justina.lojas._id-CX70T6rp.mjs");
var Route = createFileRoute("/justina/lojas/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$43.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$44
});
var AuthRoute = Route$42.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$44
});
var CartRoute = Route$41.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$44
});
var CategoriesRoute = Route$40.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => Route$44
});
var CheckoutRoute = Route$39.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$44
});
var ComoPagarRoute = Route$38.update({
	id: "/como-pagar",
	path: "/como-pagar",
	getParentRoute: () => Route$44
});
var CouponsRoute = Route$37.update({
	id: "/coupons",
	path: "/coupons",
	getParentRoute: () => Route$44
});
var FavoritesRoute = Route$36.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => Route$44
});
var JustinaRoute = Route$35.update({
	id: "/justina",
	path: "/justina",
	getParentRoute: () => Route$44
});
var MeRoute = Route$34.update({
	id: "/me",
	path: "/me",
	getParentRoute: () => Route$44
});
var NotificationsRoute = Route$33.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => Route$44
});
var OrdersRoute = Route$32.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => Route$44
});
var PointsRoute = Route$31.update({
	id: "/points",
	path: "/points",
	getParentRoute: () => Route$44
});
var PrivacidadeRoute = Route$30.update({
	id: "/privacidade",
	path: "/privacidade",
	getParentRoute: () => Route$44
});
var SettingsRoute = Route$29.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$44
});
var StoreRoute = Route$28.update({
	id: "/store",
	path: "/store",
	getParentRoute: () => Route$44
});
var SuperOfertasRoute = Route$27.update({
	id: "/super-ofertas",
	path: "/super-ofertas",
	getParentRoute: () => Route$44
});
var SupportRoute = Route$26.update({
	id: "/support",
	path: "/support",
	getParentRoute: () => Route$44
});
var TermosRoute = Route$25.update({
	id: "/termos",
	path: "/termos",
	getParentRoute: () => Route$44
});
var TrocasDevolucoesRoute = Route$24.update({
	id: "/trocas-devolucoes",
	path: "/trocas-devolucoes",
	getParentRoute: () => Route$44
});
var WalletRoute = Route$23.update({
	id: "/wallet",
	path: "/wallet",
	getParentRoute: () => Route$44
});
var ApiEmailRoute = Route$22.update({
	id: "/api/email",
	path: "/api/email",
	getParentRoute: () => Route$44
});
var ApiSignupVerificationRoute = Route$21.update({
	id: "/api/signup-verification",
	path: "/api/signup-verification",
	getParentRoute: () => Route$44
});
var CategorySlugRoute = Route$20.update({
	id: "/category/$slug",
	path: "/category/$slug",
	getParentRoute: () => Route$44
});
var JustinaIndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => JustinaRoute
});
var JustinaCategoriasRoute = Route$18.update({
	id: "/categorias",
	path: "/categorias",
	getParentRoute: () => JustinaRoute
});
var JustinaConfigRoute = Route$17.update({
	id: "/config",
	path: "/config",
	getParentRoute: () => JustinaRoute
});
var JustinaCuponsRoute = Route$16.update({
	id: "/cupons",
	path: "/cupons",
	getParentRoute: () => JustinaRoute
});
var JustinaEquipaRoute = Route$15.update({
	id: "/equipa",
	path: "/equipa",
	getParentRoute: () => JustinaRoute
});
var JustinaHomeRoute = Route$14.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => JustinaRoute
});
var JustinaLogisticaRoute = Route$13.update({
	id: "/logistica",
	path: "/logistica",
	getParentRoute: () => JustinaRoute
});
var JustinaLojasRoute = Route$12.update({
	id: "/lojas",
	path: "/lojas",
	getParentRoute: () => JustinaRoute
});
var JustinaMetasRoute = Route$11.update({
	id: "/metas",
	path: "/metas",
	getParentRoute: () => JustinaRoute
});
var JustinaPagamentosRoute = Route$10.update({
	id: "/pagamentos",
	path: "/pagamentos",
	getParentRoute: () => JustinaRoute
});
var JustinaPedidosRoute = Route$9.update({
	id: "/pedidos",
	path: "/pedidos",
	getParentRoute: () => JustinaRoute
});
var JustinaPesquisasRoute = Route$8.update({
	id: "/pesquisas",
	path: "/pesquisas",
	getParentRoute: () => JustinaRoute
});
var JustinaProdutosRoute = Route$7.update({
	id: "/produtos",
	path: "/produtos",
	getParentRoute: () => JustinaRoute
});
var JustinaReceitaRoute = Route$6.update({
	id: "/receita",
	path: "/receita",
	getParentRoute: () => JustinaRoute
});
var JustinaUsuariosRoute = Route$5.update({
	id: "/usuarios",
	path: "/usuarios",
	getParentRoute: () => JustinaRoute
});
var PayMethodRoute = Route$4.update({
	id: "/pay/$method",
	path: "/pay/$method",
	getParentRoute: () => Route$44
});
var ProductIdRoute = Route$3.update({
	id: "/product/$id",
	path: "/product/$id",
	getParentRoute: () => Route$44
});
var ShopIdRoute = Route$2.update({
	id: "/shop/$id",
	path: "/shop/$id",
	getParentRoute: () => Route$44
});
var JustinaAbasIdRoute = Route$1.update({
	id: "/abas/$id",
	path: "/abas/$id",
	getParentRoute: () => JustinaRoute
});
var JustinaLojasRouteChildren = { JustinaLojasIdRoute: Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => JustinaLojasRoute
}) };
var JustinaRouteChildren = {
	JustinaCategoriasRoute,
	JustinaConfigRoute,
	JustinaCuponsRoute,
	JustinaEquipaRoute,
	JustinaHomeRoute,
	JustinaLogisticaRoute,
	JustinaLojasRoute: JustinaLojasRoute._addFileChildren(JustinaLojasRouteChildren),
	JustinaMetasRoute,
	JustinaPagamentosRoute,
	JustinaPedidosRoute,
	JustinaPesquisasRoute,
	JustinaProdutosRoute,
	JustinaReceitaRoute,
	JustinaUsuariosRoute,
	JustinaIndexRoute,
	JustinaAbasIdRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthRoute,
	CartRoute,
	CategoriesRoute,
	CheckoutRoute,
	ComoPagarRoute,
	CouponsRoute,
	FavoritesRoute,
	JustinaRoute: JustinaRoute._addFileChildren(JustinaRouteChildren),
	MeRoute,
	NotificationsRoute,
	OrdersRoute,
	PointsRoute,
	PrivacidadeRoute,
	SettingsRoute,
	StoreRoute,
	SuperOfertasRoute,
	SupportRoute,
	TermosRoute,
	TrocasDevolucoesRoute,
	WalletRoute,
	ApiEmailRoute,
	ApiSignupVerificationRoute,
	CategorySlugRoute,
	PayMethodRoute,
	ProductIdRoute,
	ShopIdRoute
};
var routeTree = Route$44._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll$1({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { toggleFollow as A, productUrl as B, saveAddress as C, signInWithGoogle as D, signInWithFacebook as E, useStore as F, shopUrl as H, validatePasswordResetCode as I, watchOrders as L, useFollowedShops as M, usePoints as N, signOutUser as O, usePointsState as P, captureReferralFromUrl as R, router_CpH00U3h_exports as S, signInWithEmail as T, shareText as V, linkGoogleToCurrentAccount as _, Route$2 as a, pushNotificationTo as b, WHATSAPP as c, addPoints as d, authErrorMessage as f, ensurePasswordMethod as g, emailHasAccount as h, Route$1 as i, trackSearch as j, signUpWithEmail as k, actions as l, completePasswordReset as m, NeedsPasswordLinkError as n, Route$20 as o, clearCheckoutDraft as p, PHONE as r, Route$3 as s, INSTAGRAM as t, activeSignInMethods as u, linkGoogleToPasswordAccount as v, saveCheckoutDraft as w, resetPassword as x, listAddresses as y, referralLink as z };
