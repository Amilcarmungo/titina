/**
 * Funções (roles) do painel admin — a fonte da verdade é o Firestore (`staff/{uid}`),
 * nunca o frontend. As regras em `firestore.rules` re-validam cada escrita.
 *
 *   staff/{uid} = { role: "admin" | "gerente" | "atendente", shopId?: string, name?: string, active: boolean }
 */
import { useSyncExternalStore } from "react";
import { ensureDb, getFirebaseAuth } from "./client";

export type StaffRole = "admin" | "gerente" | "atendente";

export type StaffMember = {
  uid: string;
  role: StaffRole;
  shopId?: string | null;
  name?: string | null;
  active: boolean;
};

export type StaffState = { staff: StaffMember | null; loading: boolean };

/** O que cada função pode fazer (espelho do que as regras do backend permitem). */
export type Permission =
  | "catalog.write" // produtos, categorias, banners, lojas
  | "publish.approve" // aprovar publicação de produtos/lojas
  | "orders.status" // alterar estado e notificar cliente
  | "orders.delete"
  | "settings.write" // pagamentos, logística, configurações
  | "staff.manage";

const MATRIX: Record<StaffRole, Permission[]> = {
  admin: [
    "catalog.write",
    "publish.approve",
    "orders.status",
    "orders.delete",
    "settings.write",
    "staff.manage",
  ],
  gerente: ["catalog.write", "publish.approve", "orders.status"],
  atendente: ["orders.status"],
};

export const ROLE_LABEL: Record<StaffRole, string> = {
  admin: "Administrador",
  gerente: "Gerente de loja",
  atendente: "Atendente",
};

let state: StaffState = { staff: null, loading: true };
const server: StaffState = { staff: null, loading: true };
const listeners = new Set<() => void>();
let unsubscribe: (() => void) | null = null;
let watchToken = 0;

function emit(next: StaffState) {
  state = next;
  listeners.forEach((l) => l());
}

/** Liga/desliga a observação da função do utilizador autenticado. */
export function watchStaff(uid: string | null) {
  watchToken++;
  unsubscribe?.();
  unsubscribe = null;
  if (!uid) {
    emit({ staff: null, loading: false });
    return;
  }
  emit({ staff: null, loading: true });
  void startWatch(uid);
}

async function startWatch(uid: string) {
  const token = ++watchToken;
  const [db, { doc, onSnapshot }] = await Promise.all([
    ensureDb(),
    import("firebase/firestore"),
  ]);
  if (token !== watchToken) return;
  if (!db) {
    emit({ staff: null, loading: false });
    return;
  }
  unsubscribe = onSnapshot(
    doc(db, "staff", uid),
    (snap) => {
      const data = snap.data() as Omit<StaffMember, "uid"> | undefined;
      const valid = data && data.active !== false && data.role in MATRIX;
      emit({
        staff: valid ? { uid, ...data, active: true } : null,
        loading: false,
      });
    },
    () => emit({ staff: null, loading: false }),
  );
}

export function useStaff(): StaffState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => server,
  );
}

export function can(
  staff: StaffMember | null,
  permission: Permission,
): boolean {
  if (!staff) return false;
  return MATRIX[staff.role].includes(permission);
}

export function usePermission(permission: Permission): boolean {
  const { staff } = useStaff();
  return can(staff, permission);
}

/**
 * Tenta publicar sempre que existe sessão: a decisão final é das regras do
 * Firestore (nunca do frontend). Enquanto a função ainda está a carregar não
 * bloqueamos a publicação — o backend recusa se o utilizador não tiver direito.
 */
export function canSyncSiteData(): boolean {
  if (can(state.staff, "catalog.write") || can(state.staff, "settings.write"))
    return true;
  if (state.loading) return Boolean(getFirebaseAuth()?.currentUser);
  return false;
}
