/**
 * Firebase client (browser only).
 * Todas as chaves vêm do .env (VITE_FIREBASE_*) — nunca hardcoded.
 *
 * Os SDKs do Firebase são carregados sob demanda (import dinâmico) para não
 * entrarem no JavaScript inicial da página — a home aparece primeiro e a
 * ligação ao banco liga-se logo depois, sem bloquear o primeiro render.
 */
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";

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

const canUse = () => typeof window !== "undefined" && firebaseEnabled;

let app: FirebaseApp | null = null;
let appPromise: Promise<FirebaseApp | null> | null = null;

async function ensureApp(): Promise<FirebaseApp | null> {
  if (!canUse()) return null;
  if (app) return app;
  if (!appPromise) {
    appPromise = import("firebase/app")
      .then(({ initializeApp, getApps }) => {
        app = getApps()[0] ?? initializeApp(firebaseConfig);
        return app;
      })
      .catch(() => null);
  }
  return appPromise;
}

// -------- Auth --------
let auth: Auth | null = null;
let authPromise: Promise<Auth | null> | null = null;

export async function ensureFirebaseAuth(): Promise<Auth | null> {
  if (!canUse()) return null;
  if (auth) return auth;
  if (!authPromise) {
    authPromise = (async () => {
      const [a, mod] = await Promise.all([ensureApp(), import("firebase/auth")]);
      if (!a) return null;
      auth = mod.getAuth(a);
      return auth;
    })().catch(() => null);
  }
  return authPromise;
}

/** Instância já carregada (null enquanto o SDK ainda está a chegar). */
export function getFirebaseAuth(): Auth | null {
  if (!auth) void ensureFirebaseAuth();
  return auth;
}

// -------- Firestore --------
let db: Firestore | null = null;
let dbPromise: Promise<Firestore | null> | null = null;

/**
 * Firestore com cache local persistente: em internet lenta (ou offline) os
 * produtos, lojas e banners aparecem imediatamente a partir do cache do
 * dispositivo e são actualizados quando a ligação responde.
 */
export async function ensureDb(): Promise<Firestore | null> {
  if (!canUse()) return null;
  if (db) return db;
  if (!dbPromise) {
    dbPromise = (async () => {
      const [a, mod] = await Promise.all([
        ensureApp(),
        import("firebase/firestore"),
      ]);
      if (!a) return null;
      try {
        db = mod.initializeFirestore(a, {
          localCache: mod.persistentLocalCache({
            tabManager: mod.persistentMultipleTabManager(),
          }),
        });
      } catch {
        db = mod.getFirestore(a);
      }
      return db;
    })().catch(() => null);
  }
  return dbPromise;
}

/** Instância já carregada (null enquanto o SDK ainda está a chegar). */
export function getDb(): Firestore | null {
  if (!db) void ensureDb();
  return db;
}

// -------- Storage --------
let storage: FirebaseStorage | null = null;
let storagePromise: Promise<FirebaseStorage | null> | null = null;

export async function ensureFirebaseStorage(): Promise<FirebaseStorage | null> {
  if (!canUse()) return null;
  if (storage) return storage;
  if (!storagePromise) {
    storagePromise = (async () => {
      const [a, mod] = await Promise.all([
        ensureApp(),
        import("firebase/storage"),
      ]);
      if (!a) return null;
      storage = mod.getStorage(a);
      return storage;
    })().catch(() => null);
  }
  return storagePromise;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  if (!storage) void ensureFirebaseStorage();
  return storage;
}

/** Analytics é opcional e carregado sob demanda (evita quebrar SSR/navegadores sem suporte). */
export async function initAnalytics() {
  const a = await ensureApp();
  if (!a || !firebaseConfig.measurementId) return null;
  try {
    const { getAnalytics, isSupported } = await import("firebase/analytics");
    if (!(await isSupported())) return null;
    return getAnalytics(a);
  } catch {
    return null;
  }
}
