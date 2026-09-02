import { n as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-ColUhoxC.js
var client_ColUhoxC_exports = /* @__PURE__ */ __exportAll({
	a: () => getDb,
	i: () => firebaseEnabled,
	n: () => ensureDb,
	o: () => getFirebaseAuth,
	r: () => ensureFirebaseAuth,
	s: () => getFirebaseStorage,
	t: () => client_exports
});
var client_exports = /* @__PURE__ */ __exportAll$1({
	ensureDb: () => ensureDb,
	ensureFirebaseAuth: () => ensureFirebaseAuth,
	ensureFirebaseStorage: () => ensureFirebaseStorage,
	firebaseConfig: () => firebaseConfig,
	firebaseEnabled: () => firebaseEnabled,
	getDb: () => getDb,
	getFirebaseAuth: () => getFirebaseAuth,
	getFirebaseStorage: () => getFirebaseStorage,
	initAnalytics: () => initAnalytics
});
var env = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_FIREBASE_API_KEY": "AIzaSyDpOPBg4lerbbBHqOYH1qdhjqzzg2tzCkA",
	"VITE_FIREBASE_APP_ID": "1:161966137396:web:9f8c521b602dbfb00daa61",
	"VITE_FIREBASE_AUTH_DOMAIN": "auth.bazarixy.com",
	"VITE_FIREBASE_MEASUREMENT_ID": "G-YTKW4E8XX2",
	"VITE_FIREBASE_MESSAGING_SENDER_ID": "161966137396",
	"VITE_FIREBASE_PROJECT_ID": "bazarixymy",
	"VITE_FIREBASE_STORAGE_BUCKET": "bazarixymy.firebasestorage.app",
	"VITE_SUPABASE_PROJECT_ID": "mqpblpflcnpbwkxfmrhs",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_XSYTCkV5qFNEgK-zkDk4yA_FmQjid-7",
	"VITE_SUPABASE_URL": "https://mqpblpflcnpbwkxfmrhs.supabase.co"
};
var firebaseConfig = {
	apiKey: env["VITE_FIREBASE_API_KEY"] ?? "",
	authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"] ?? "",
	projectId: env["VITE_FIREBASE_PROJECT_ID"] ?? "",
	storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"] ?? "",
	messagingSenderId: env["VITE_FIREBASE_MESSAGING_SENDER_ID"] ?? "",
	appId: env["VITE_FIREBASE_APP_ID"] ?? "",
	measurementId: env["VITE_FIREBASE_MEASUREMENT_ID"] ?? ""
};
/** Firebase só é usado no browser e apenas quando as chaves existem. */
var firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
var canUse = () => typeof window !== "undefined" && firebaseEnabled;
var app = null;
var appPromise = null;
async function ensureApp() {
	if (!canUse()) return null;
	if (app) return app;
	if (!appPromise) appPromise = import("../_libs/firebase.mjs").then((n) => n.t).then(({ initializeApp, getApps }) => {
		app = getApps()[0] ?? initializeApp(firebaseConfig);
		return app;
	}).catch(() => null);
	return appPromise;
}
var auth = null;
var authPromise = null;
async function ensureFirebaseAuth() {
	if (!canUse()) return null;
	if (auth) return auth;
	if (!authPromise) authPromise = (async () => {
		const [a, mod] = await Promise.all([ensureApp(), import("../_libs/firebase.mjs").then((n) => n.i)]);
		if (!a) return null;
		auth = mod.getAuth(a);
		return auth;
	})().catch(() => null);
	return authPromise;
}
/** Instância já carregada (null enquanto o SDK ainda está a chegar). */
function getFirebaseAuth() {
	if (!auth) ensureFirebaseAuth();
	return auth;
}
var db = null;
var dbPromise = null;
/**
* Firestore com cache local persistente: em internet lenta (ou offline) os
* produtos, lojas e banners aparecem imediatamente a partir do cache do
* dispositivo e são actualizados quando a ligação responde.
*/
async function ensureDb() {
	if (!canUse()) return null;
	if (db) return db;
	if (!dbPromise) dbPromise = (async () => {
		const [a, mod] = await Promise.all([ensureApp(), import("../_libs/firebase.mjs").then((n) => n.a)]);
		if (!a) return null;
		try {
			db = mod.initializeFirestore(a, { localCache: mod.persistentLocalCache({ tabManager: mod.persistentMultipleTabManager() }) });
		} catch {
			db = mod.getFirestore(a);
		}
		return db;
	})().catch(() => null);
	return dbPromise;
}
/** Instância já carregada (null enquanto o SDK ainda está a chegar). */
function getDb() {
	if (!db) ensureDb();
	return db;
}
var storage = null;
var storagePromise = null;
async function ensureFirebaseStorage() {
	if (!canUse()) return null;
	if (storage) return storage;
	if (!storagePromise) storagePromise = (async () => {
		const [a, mod] = await Promise.all([ensureApp(), import("../_libs/firebase.mjs").then((n) => n.r)]);
		if (!a) return null;
		storage = mod.getStorage(a);
		return storage;
	})().catch(() => null);
	return storagePromise;
}
function getFirebaseStorage() {
	if (!storage) ensureFirebaseStorage();
	return storage;
}
/** Analytics é opcional e carregado sob demanda (evita quebrar SSR/navegadores sem suporte). */
async function initAnalytics() {
	const a = await ensureApp();
	if (!a || !firebaseConfig.measurementId) return null;
	try {
		const { getAnalytics, isSupported } = await import("../_libs/firebase.mjs").then((n) => n.n);
		if (!await isSupported()) return null;
		return getAnalytics(a);
	} catch {
		return null;
	}
}
//#endregion
export { getDb as a, firebaseEnabled as i, ensureDb as n, getFirebaseAuth as o, ensureFirebaseAuth as r, getFirebaseStorage as s, client_ColUhoxC_exports as t };
