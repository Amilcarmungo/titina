import { a as getDb, o as getFirebaseAuth } from "./client-ColUhoxC.mjs";
import { n as can, o as useStaff } from "./roles-DIBzW3mP.mjs";
import { K as onSnapshot, Lt as collection, T as deleteDoc, Ut as doc, et as query, rt as setDoc, un as serverTimestamp, ut as where } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { mergeRemoteOrders, registerOrdersBridge } from "./orders-store-DPNmKvMS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-Chh9kBqq.js
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
/** Hook de conveniência: true quando o utilizador pode gerir estados de pedidos. */
function useCanManageOrders() {
	const { staff } = useStaff();
	return can(staff, "orders.status");
}
//#endregion
export { initOrdersBridge, useCanManageOrders, watchOrders };
