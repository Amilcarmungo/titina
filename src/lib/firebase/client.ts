/**
 * Firebase client (browser only).
 * Todas as chaves vêm do .env (VITE_FIREBASE_*) — nunca hardcoded.
 */
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const env = import.meta.env as Record<string, string | undefined>;

export const firebaseConfig = {
  apiKey: env["VITE_FIREBASE_API_KEY"] ?? "",
  authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"] ?? "",
  projectId: env["VITE_FIREBASE_PROJECT_ID"] ?? "",
  storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"] ?? "",
  messagingSenderId: env["VITE_FIREBASE_MESSAGING_SENDER_ID"] ?? "",
  appId: env["VITE_FIREBASE_APP_ID"] ?? "",
  measurementId: env["VITE_FIREBASE_MEASUREMENT_ID"] ?? "",
};

/** Firebase só é usado no browser e apenas quando as chaves existem. */
export const firebaseEnabled = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

let app: FirebaseApp | null = null;

function ensureApp(): FirebaseApp | null {
  if (typeof window === "undefined" || !firebaseEnabled) return null;
  if (!app) app = getApps()[0] ?? initializeApp(firebaseConfig);
  return app;
}

export function getFirebaseAuth(): Auth | null {
  const a = ensureApp();
  return a ? getAuth(a) : null;
}

let db: Firestore | null = null;

/**
 * Firestore com cache local persistente: em internet lenta (ou offline) os
 * produtos, lojas e banners aparecem imediatamente a partir do cache do
 * dispositivo e são actualizados quando a ligação responde.
 */
export function getDb(): Firestore | null {
  const a = ensureApp();
  if (!a) return null;
  if (!db) {
    try {
      db = initializeFirestore(a, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      });
    } catch {
      db = getFirestore(a);
    }
  }
  return db;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  const a = ensureApp();
  return a ? getStorage(a) : null;
}

/** Analytics é opcional e carregado sob demanda (evita quebrar SSR/navegadores sem suporte). */
export async function initAnalytics() {
  const a = ensureApp();
  if (!a || !firebaseConfig.measurementId) return null;
  try {
    const { getAnalytics, isSupported } = await import("firebase/analytics");
    if (!(await isSupported())) return null;
    return getAnalytics(a);
  } catch {
    return null;
  }
}
