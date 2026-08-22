import { d as getApps, f as initializeApp } from "../_libs/@firebase/analytics+[...].mjs";
import "../_libs/firebase.mjs";
import { s as getAuth } from "../_libs/firebase__auth.mjs";
import { _ as initializeFirestore, h as getFirestore, o as persistentLocalCache, s as persistentMultipleTabManager } from "../_libs/@firebase/firestore+[...].mjs";
import { n as getStorage } from "../_libs/firebase__storage.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-C80F8PZn.js
/**
* Firebase client (browser only).
* Todas as chaves vêm do .env (VITE_FIREBASE_*) — nunca hardcoded.
*/
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
var app = null;
function ensureApp() {
	if (typeof window === "undefined" || !firebaseEnabled) return null;
	if (!app) app = getApps()[0] ?? initializeApp(firebaseConfig);
	return app;
}
function getFirebaseAuth() {
	const a = ensureApp();
	return a ? getAuth(a) : null;
}
var db = null;
/**
* Firestore com cache local persistente: em internet lenta (ou offline) os
* produtos, lojas e banners aparecem imediatamente a partir do cache do
* dispositivo e são actualizados quando a ligação responde.
*/
function getDb() {
	const a = ensureApp();
	if (!a) return null;
	if (!db) try {
		db = initializeFirestore(a, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
	} catch {
		db = getFirestore(a);
	}
	return db;
}
function getFirebaseStorage() {
	const a = ensureApp();
	return a ? getStorage(a) : null;
}
/** Analytics é opcional e carregado sob demanda (evita quebrar SSR/navegadores sem suporte). */
async function initAnalytics() {
	const a = ensureApp();
	if (!a || !firebaseConfig.measurementId) return null;
	try {
		const { getAnalytics, isSupported } = await import("../_libs/firebase.mjs").then((n) => n.t);
		if (!await isSupported()) return null;
		return getAnalytics(a);
	} catch {
		return null;
	}
}
//#endregion
export { initAnalytics as a, getFirebaseStorage as i, getDb as n, getFirebaseAuth as r, firebaseEnabled as t };
