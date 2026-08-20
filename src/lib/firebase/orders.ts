/**
 * Pedidos no Firestore — `orders/{orderId}`.
 * O cliente só vê/edita os próprios pedidos (regras); a equipa (staff/{uid})
 * vê todos e é a única que pode notificar/alterar etapas em nome da loja.
 */
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { getDb, getFirebaseAuth } from "./client";
import { can, useStaff } from "./roles";
import {
  mergeRemoteOrders,
  registerOrdersBridge,
  type Order,
} from "@/lib/orders-store";

let registered = false;

function withoutUndefined(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(withoutUndefined);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([, entry]) => entry !== undefined)
      .map(([key, entry]) => [key, withoutUndefined(entry)]),
  );
}

export function initOrdersBridge() {
  if (registered) return;
  registered = true;
  registerOrdersBridge(
    (order) => {
      const db = getDb();
      const uid = getFirebaseAuth()?.currentUser?.uid;
      if (!db || !uid) return;
      const payload = withoutUndefined({
        ...order,
        uid: order.uid ?? uid,
      }) as Record<string, unknown>;
      void setDoc(
        doc(db, "orders", order.id),
        { ...payload, updatedAt: serverTimestamp() },
        { merge: true },
      ).catch((error) => {
        console.error("Não foi possível guardar o estado do pedido:", error);
      });
    },
    (id) => {
      const db = getDb();
      if (!db) return;
      void deleteDoc(doc(db, "orders", id)).catch(() => {});
    },
  );
}

/** Observa os pedidos do utilizador (ou todos, se for staff). */
export function watchOrders(uid: string | null, isStaff: boolean) {
  const db = getDb();
  if (!db || !uid) return () => {};
  const ref = collection(db, "orders");
  const q = isStaff ? query(ref) : query(ref, where("uid", "==", uid));
  return onSnapshot(
    q,
    (snap) =>
      mergeRemoteOrders(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Order, "id">),
        })),
      ),
    () => {},
  );
}

/** Hook de conveniência: true quando o utilizador pode gerir estados de pedidos. */
export function useCanManageOrders() {
  const { staff } = useStaff();
  return can(staff, "orders.status");
}
