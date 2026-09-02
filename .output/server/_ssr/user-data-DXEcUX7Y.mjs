import { a as getDb } from "./client-ColUhoxC.mjs";
import { K as onSnapshot, L as getDocs, Lt as collection, P as getDoc, T as deleteDoc, Ut as doc, V as limit, X as orderBy, Zt as increment, dt as writeBatch, et as query, lt as updateDoc, rt as setDoc, un as serverTimestamp, ut as where } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-data-DXEcUX7Y.js
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
function watchAddresses(uid, cb) {
	const db = getDb();
	if (!db) return () => {};
	return onSnapshot(collection(db, "users", uid, "addresses"), (snap) => cb(snap.docs.map((d) => ({
		id: d.id,
		...d.data()
	}))));
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
async function deleteAddress(uid, id) {
	const db = getDb();
	if (!db) return;
	await deleteDoc(doc(db, "users", uid, "addresses", id));
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
async function recentSearches(uid, max = 10) {
	const db = getDb();
	if (!db) return [];
	return (await getDocs(query(collection(db, "users", uid, "searches"), orderBy("lastSearchedAt", "desc"), limit(max)))).docs.map((d) => d.data().term);
}
async function clearSearches(uid) {
	const db = getDb();
	if (!db) return;
	const snap = await getDocs(collection(db, "users", uid, "searches"));
	const batch = writeBatch(db);
	snap.docs.forEach((d) => batch.delete(d.ref));
	await batch.commit();
}
async function trackEvent(uid, event) {
	const db = getDb();
	if (!db || !uid) return;
	const ref = doc(collection(db, "users", uid, "events"));
	await setDoc(ref, {
		...event,
		createdAt: serverTimestamp()
	});
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
async function getCheckoutDraft(uid) {
	const db = getDb();
	if (!db) return null;
	const snap = await getDoc(doc(db, "users", uid, "checkouts", "current"));
	return snap.exists() ? snap.data() : null;
}
//#endregion
export { clearCheckoutDraft, clearSearches, deleteAddress, getCheckoutDraft, listAddresses, recentSearches, saveAddress, saveCheckoutDraft, setDefaultAddress, trackEvent, trackSearch, upsertUserProfile, watchAddresses };
