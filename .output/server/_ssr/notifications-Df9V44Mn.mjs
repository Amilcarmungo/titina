import { a as getDb } from "./client-ColUhoxC.mjs";
import { K as onSnapshot, Lt as collection, T as deleteDoc, Ut as doc, X as orderBy, et as query, lt as updateDoc, rt as setDoc, un as serverTimestamp } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { i as registerNotificationsBridge, t as mergeRemoteNotifications } from "./notifications-store-B_Op6deg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-Df9V44Mn.js
/**
* Notificações por utilizador — `users/{uid}/notifications/{id}`.
* Cada utilizador só lê/escreve as suas (regras do Firestore); a equipa pode
* criar notificações para o dono de um pedido, nunca ler as de outros.
*/
var stop = null;
var current = null;
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
	if (current === uid) return;
	current = uid;
	stop?.();
	stop = null;
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
	stop = onSnapshot(query(collection(db, "users", uid, "notifications"), orderBy("createdAtServer", "desc")), (snap) => mergeRemoteNotifications(snap.docs.map((d) => {
		return {
			...d.data(),
			id: d.id
		};
	})), () => {});
}
//#endregion
export { bindNotifications, pushNotificationTo };
