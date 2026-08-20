/**
 * Dados do usuário no Firestore.
 *  users/{uid}                       perfil
 *  users/{uid}/addresses/{id}        endereços salvos
 *  users/{uid}/searches/{id}         histórico de pesquisas
 *  users/{uid}/events/{id}           sinais de interesse (o que o usuário procura/quer)
 *  users/{uid}/checkouts/current     checkout abandonado (apagado ao concluir o pedido)
 */
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { getDb } from "./client";
import type { AppUser } from "./auth";

export type SavedAddress = {
  id: string;
  name: string;
  phone: string;
  countryCode?: string;
  street: string;
  complement?: string;
  city: string;
  state?: string;
  cep?: string;
  country?: string;
  isDefault?: boolean;
};

export type CheckoutDraft = {
  step: number;
  total: number;
  items: { productId: string; qty: number; size?: string; color?: string; unitPrice?: number }[];
  address?: Partial<SavedAddress>;
  paymentMethod?: string | null;
  coupon?: string | null;
};

export type InterestEvent = {
  type: "product_view" | "add_to_cart" | "favorite" | "category_view" | "checkout_start";
  productId?: string;
  category?: string;
  meta?: Record<string, string | number | boolean | null>;
};

/* ------------------------------------------------------------------ perfil */

export async function upsertUserProfile(user: AppUser) {
  const db = getDb();
  if (!db) return;
  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      email: user.email,
      name: user.name ?? null,
      photoURL: user.photoURL ?? null,
      provider: user.provider ?? null,
      lastSeenAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}

/* --------------------------------------------------------------- endereços */

export async function listAddresses(uid: string): Promise<SavedAddress[]> {
  const db = getDb();
  if (!db) return [];
  const snap = await getDocs(collection(db, "users", uid, "addresses"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SavedAddress, "id">) }));
}

export function watchAddresses(uid: string, cb: (rows: SavedAddress[]) => void) {
  const db = getDb();
  if (!db) return () => {};
  return onSnapshot(collection(db, "users", uid, "addresses"), (snap) =>
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SavedAddress, "id">) }))),
  );
}

export async function saveAddress(uid: string, address: Omit<SavedAddress, "id"> & { id?: string }) {
  const db = getDb();
  if (!db) return null;
  const id = address.id || doc(collection(db, "users", uid, "addresses")).id;
  const { id: _ignored, ...data } = address;
  await setDoc(
    doc(db, "users", uid, "addresses", id),
    { ...data, updatedAt: serverTimestamp(), createdAt: serverTimestamp() },
    { merge: true },
  );
  if (address.isDefault) await setDefaultAddress(uid, id);
  return id;
}

export async function setDefaultAddress(uid: string, id: string) {
  const db = getDb();
  if (!db) return;
  const snap = await getDocs(
    query(collection(db, "users", uid, "addresses"), where("isDefault", "==", true)),
  );
  const batch = writeBatch(db);
  snap.docs.forEach((d) => {
    if (d.id !== id) batch.update(d.ref, { isDefault: false });
  });
  batch.set(doc(db, "users", uid, "addresses", id), { isDefault: true }, { merge: true });
  await batch.commit();
}

export async function deleteAddress(uid: string, id: string) {
  const db = getDb();
  if (!db) return;
  await deleteDoc(doc(db, "users", uid, "addresses", id));
}

/* --------------------------------------------------------------- pesquisas */

export async function trackSearch(uid: string | null, term: string, resultCount?: number) {
  const db = getDb();
  const value = term.trim();
  if (!db || !uid || value.length < 2) return;
  const id = encodeURIComponent(value.toLowerCase()).slice(0, 120);
  await setDoc(
    doc(db, "users", uid, "searches", id),
    {
      term: value,
      normalized: value.toLowerCase(),
      resultCount: resultCount ?? null,
      lastSearchedAt: serverTimestamp(),
      firstSearchedAt: serverTimestamp(),
    },
    { merge: true },
  );
  await updateDoc(doc(db, "users", uid, "searches", id), { lastSearchedAt: serverTimestamp() }).catch(
    () => {},
  );
}

export async function recentSearches(uid: string, max = 10) {
  const db = getDb();
  if (!db) return [];
  const snap = await getDocs(
    query(collection(db, "users", uid, "searches"), orderBy("lastSearchedAt", "desc"), limit(max)),
  );
  return snap.docs.map((d) => (d.data() as { term: string }).term);
}

export async function clearSearches(uid: string) {
  const db = getDb();
  if (!db) return;
  const snap = await getDocs(collection(db, "users", uid, "searches"));
  const batch = writeBatch(db);
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}

/* ------------------------------------------------- sinais de interesse */

export async function trackEvent(uid: string | null, event: InterestEvent) {
  const db = getDb();
  if (!db || !uid) return;
  const ref = doc(collection(db, "users", uid, "events"));
  await setDoc(ref, { ...event, createdAt: serverTimestamp() });
}

/* ------------------------------------------- checkout abandonado */

export async function saveCheckoutDraft(uid: string | null, draft: CheckoutDraft) {
  const db = getDb();
  if (!db || !uid) return;
  await setDoc(
    doc(db, "users", uid, "checkouts", "current"),
    { ...draft, status: "abandoned", updatedAt: serverTimestamp() },
    { merge: true },
  );
}

/** Pedido concluído (ou carrinho limpo) → o rascunho é APAGADO. */
export async function clearCheckoutDraft(uid: string | null) {
  const db = getDb();
  if (!db || !uid) return;
  await deleteDoc(doc(db, "users", uid, "checkouts", "current")).catch(() => {});
}

export async function getCheckoutDraft(uid: string) {
  const db = getDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, "users", uid, "checkouts", "current"));
  return snap.exists() ? (snap.data() as CheckoutDraft) : null;
}