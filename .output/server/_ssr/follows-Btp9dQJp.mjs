import { r as __toESM } from "../_runtime.mjs";
import { a as getDb } from "./client-ColUhoxC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { K as onSnapshot, Lt as collection, T as deleteDoc, Ut as doc, rt as setDoc, un as serverTimestamp } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/follows-Btp9dQJp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Seguir lojas — guardado por utilizador em `users/{uid}/follows/{shopId}`.
* Sem sessão o botão pede login (nenhum dado anónimo é gravado).
*/
var ids = [];
var empty = [];
var listeners = /* @__PURE__ */ new Set();
var stop = null;
var current = null;
function emit(next) {
	ids = next;
	listeners.forEach((l) => l());
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
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => ids, () => empty);
}
function isFollowing(shopId) {
	return ids.includes(shopId);
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
//#endregion
export { bindFollows, isFollowing, toggleFollow, useFollowedShops };
