import { useSyncExternalStore } from "react";

import { getAnyProduct } from "@/lib/products-store";
import { getShop } from "@/lib/shops-store";
import { notificationActions } from "@/lib/notifications-store";
import type { ShippingQuote } from "@/lib/logistics-store";

export type OrderStatus =
  "unpaid" | "processing" | "shipped" | "review" | "returns";

export type OrderItem = {
  productId: string;
  qty: number;
  size?: string;
  color?: string;
  unitPrice?: number;
  /** Foto da variante comprada. */ image?: string;
  name?: string;
};

/** Etapas de um envio. Cada loja tem o seu próprio pacote e o seu próprio ritmo. */
export type PackageStage =
  | "awaiting_payment"
  | "payment_review"
  | "payment_rejected"
  | "payment_accepted"
  | "preparing"
  | "shipped"
  | "delivered"
  | "reviewed";

export const STAGE_FLOW: PackageStage[] = [
  "awaiting_payment",
  "payment_review",
  "payment_accepted",
  "preparing",
  "shipped",
  "delivered",
  "reviewed",
];

export const STAGE_LABEL: Record<PackageStage, string> = {
  awaiting_payment: "Aguardando pagamento",
  payment_review: "A analisar o comprovativo",
  payment_rejected: "Comprovativo não validado",
  payment_accepted: "Pagamento aceite",
  preparing: "A loja está a preparar o seu pedido",
  shipped: "Pedido enviado pela transportadora",
  delivered: "Entregue",
  reviewed: "Avaliado",
};

/** Frase formal mostrada ao cliente em cada etapa. */
export const STAGE_DESC: Record<PackageStage, string> = {
  awaiting_payment:
    "Estamos à espera do seu pagamento para iniciar a preparação do pedido.",
  payment_review:
    "Recebemos o seu comprovativo e a nossa equipa está a confirmar o pagamento.",
  payment_rejected:
    "O comprovativo enviado não pôde ser validado. Por favor, envie um comprovativo válido ou contacte o nosso suporte.",
  payment_accepted:
    "Pagamento confirmado com sucesso. Obrigado pela sua confiança.",
  preparing: "A loja está a embalar os seus artigos com todo o cuidado.",
  shipped:
    "O seu pacote já segue com a transportadora até ao endereço indicado.",
  delivered:
    "Pedido entregue. Confirme a receção para poder avaliar os artigos.",
  reviewed: "Obrigado pela sua avaliação — ela ajuda outros clientes.",
};

export type StageEvent = { stage: PackageStage; at: string; note?: string };

export type OrderPackage = {
  id: string;
  shopId: string;
  shopName: string;
  stage: PackageStage;
  items: OrderItem[];
  timeline: StageEvent[];
  eta?: string;
  tracking?: string;
};

export type Order = {
  id: string;
  uid?: string | null;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
  packages?: OrderPackage[];
  total: number;
  subtotal?: number;
  discount?: number;
  shipping?: ShippingQuote;
  eta?: string;
  customer?: string;
  paymentMethod?: string;
  paymentProof?: string;
  shippingAddress?: {
    name?: string;
    phone?: string;
    street?: string;
    complement?: string;
    city?: string;
    state?: string;
    cep?: string;
    country?: string;
  };
  notes?: string;
  /** Pedido de reembolso feito pelo cliente (devoluções). */
  refund?: {
    method: string;
    account: string;
    holder: string;
    note?: string;
    requestedAt: string;
    status: "requested" | "approved" | "paid" | "rejected";
  };
};

function now() {
  return new Date()
    .toLocaleString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", " ·");
}

function etaFromNow(days = 7) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `Chega até ${d.toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit" })}`;
}

/** Agrupa os itens por loja — nem todos os produtos são da mesma loja. */
export function buildPackages(order: Order): OrderPackage[] {
  const groups = new Map<string, OrderItem[]>();
  for (const it of order.items) {
    const shopId = getAnyProduct(it.productId)?.shopId ?? "main";
    groups.set(shopId, [...(groups.get(shopId) ?? []), it]);
  }
  const initial: PackageStage =
    order.status === "unpaid"
      ? "awaiting_payment"
      : order.status === "shipped"
        ? "shipped"
        : order.status === "review"
          ? "delivered"
          : order.status === "processing" && order.paymentProof
            ? "payment_review"
            : "preparing";
  return Array.from(groups.entries()).map(([shopId, items], i) => ({
    id: `${order.id}-P${i + 1}`,
    shopId,
    shopName: getShop(shopId)?.name ?? "Bazarixy Oficial",
    stage: initial,
    items,
    timeline: [{ stage: initial, at: order.createdAt }],
    ...(order.status === "shipped" ? { eta: order.eta ?? etaFromNow() } : {}),
  }));
}

export function packagesOf(order: Order): OrderPackage[] {
  return order.packages?.length ? order.packages : buildPackages(order);
}

/** O estado do pedido é derivado dos pacotes — o mais atrasado manda. */
export function statusFromPackages(
  pkgs: OrderPackage[],
  fallback: OrderStatus,
): OrderStatus {
  if (!pkgs.length) return fallback;
  if (fallback === "returns") return "returns";
  const stages = pkgs.map((p) => p.stage);
  if (stages.some((s) => s === "awaiting_payment" || s === "payment_rejected"))
    return "unpaid";
  if (stages.every((s) => s === "reviewed")) return "review";
  if (stages.every((s) => s === "delivered" || s === "reviewed"))
    return "review";
  if (
    stages.every(
      (s) => s === "shipped" || s === "delivered" || s === "reviewed",
    )
  )
    return "shipped";
  return "processing";
}

/** A cache é sempre por conta — nenhum utilizador vê pedidos de outro. */
const keyFor = (uid: string) => `shop_orders_v2:${uid}`;

const seed: Order[] = [];

let ownerUid: string | null = null;
let staffMode = false;
/** Pedidos criados nesta sessão que ainda podem não ter chegado ao backend. */
const pending = new Set<string>();

function readFor(uid: string): Order[] {
  if (typeof window === "undefined") return seed;
  try {
    const s = JSON.parse(localStorage.getItem(keyFor(uid)) || "[]");
    if (Array.isArray(s)) return (s as Order[]).filter((o) => o.uid === uid);
  } catch {
    return seed;
  }
  return seed;
}

let orders: Order[] = seed;
const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined" && ownerUid && !staffMode) {
    localStorage.setItem(
      keyFor(ownerUid),
      JSON.stringify(orders.filter((o) => o.uid === ownerUid)),
    );
  }
  listeners.forEach((l) => l());
}

/**
 * Define de quem são os pedidos em memória. Ao trocar de conta (ou sair) a
 * lista é limpa de imediato — a cache de um utilizador nunca aparece a outro.
 */
export function setOrdersOwner(uid: string | null, staff = false) {
  if (ownerUid === uid && staffMode === staff) return;
  ownerUid = uid;
  staffMode = staff;
  pending.clear();
  orders = uid && !staff ? readFor(uid) : seed;
  listeners.forEach((l) => l());
}

/** Ponte para o Firestore (definida em firebase/orders.ts para evitar dependência circular). */
let remoteSave: ((order: Order) => void) | null = null;
let remoteRemove: ((id: string) => void) | null = null;
export function registerOrdersBridge(
  save: (o: Order) => void,
  remove: (id: string) => void,
) {
  remoteSave = save;
  remoteRemove = remove;
}
/**
 * O backend é a fonte da verdade: substituímos a lista pelo que vem do
 * Firestore (mantendo só os pedidos desta sessão que ainda não sincronizaram).
 * Assim uma mudança de estado feita pela equipa aparece de imediato.
 */
export function mergeRemoteOrders(remote: Order[]) {
  const allowed = staffMode ? remote : remote.filter((o) => o.uid === ownerUid);
  const ids = new Set(allowed.map((o) => o.id));
  const stillPending = orders.filter(
    (o) =>
      pending.has(o.id) && !ids.has(o.id) && (staffMode || o.uid === ownerUid),
  );
  allowed.forEach((o) => pending.delete(o.id));
  orders = [...stillPending, ...allowed];
  emit();
}

function put(next: Order) {
  orders = orders.map((o) => (o.id === next.id ? next : o));
  emit();
  remoteSave?.(next);
}

/** Avisa o DONO do pedido (notificação na conta dele + e-mail). */
function notifyCustomer(order: Order, pkg: OrderPackage, note?: string) {
  const body = note?.trim()
    ? note.trim()
    : `${pkg.shopName}: ${STAGE_LABEL[pkg.stage]}${pkg.eta ? ` · ${pkg.eta}` : ""}`;
  const title = `Pedido #${order.id} — ${STAGE_LABEL[pkg.stage]}`;
  const kind =
    pkg.stage === "shipped" || pkg.stage === "delivered" ? "delivery" : "order";

  if (order.uid) {
    void import("@/lib/firebase/notifications").then(({ pushNotificationTo }) =>
      pushNotificationTo(order.uid as string, {
        kind,
        title,
        body,
        href: "/orders",
      }),
    );
  } else {
    notificationActions.add({ kind, title, body, href: "/orders" });
  }

  const to = order.customer;
  if (to && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    void import("@/lib/email/send").then(({ sendAppEmail }) =>
      sendAppEmail("notification", to, {
        title,
        message: `${body}\n\n${STAGE_DESC[pkg.stage]}`,
        ctaLabel: "Ver o meu pedido",
        ctaPath: "/orders",
      }),
    );
  }
}

export function useOrders(): Order[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => orders,
    () => seed,
  );
}

export const orderActions = {
  add(o: Omit<Order, "id" | "createdAt"> & { id?: string }) {
    const id = o.id || `BX-${Math.floor(Math.random() * 9000000 + 1000000)}`;
    const createdAt = now();
    const base: Order = { ...o, id, createdAt };
    const order: Order = { ...base, packages: buildPackages(base) };
    pending.add(id);
    orders = [order, ...orders];
    emit();
    remoteSave?.(order);
    return id;
  },
  updateStatus(id: string, status: OrderStatus) {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    const stage: PackageStage =
      status === "unpaid"
        ? "awaiting_payment"
        : status === "processing"
          ? order.paymentProof
            ? "payment_review"
            : "preparing"
          : status === "shipped"
            ? "shipped"
            : status === "review"
              ? "delivered"
              : (packagesOf(order)[0]?.stage ?? "preparing");
    const packages = packagesOf(order).map((p) => ({
      ...p,
      stage,
      timeline: [...p.timeline, { stage, at: now() }],
      ...(stage === "shipped" ? { eta: p.eta ?? etaFromNow() } : {}),
    }));
    put({ ...order, status, packages, eta: packages[0]?.eta ?? order.eta });
  },

  /** Avança um pacote (loja) e, se pedido, notifica o cliente. */
  setPackageStage(
    orderId: string,
    packageId: string,
    stage: PackageStage,
    opts?: { note?: string; eta?: string; tracking?: string; notify?: boolean },
  ) {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    let updated: OrderPackage | null = null;
    const packages = packagesOf(order).map((p) => {
      if (p.id !== packageId) return p;
      const eta =
        opts?.eta ?? (stage === "shipped" ? (p.eta ?? etaFromNow()) : p.eta);
      updated = {
        ...p,
        stage,
        ...(eta ? { eta } : {}),
        ...(opts?.tracking ? { tracking: opts.tracking } : {}),
        timeline: [
          ...p.timeline,
          { stage, at: now(), ...(opts?.note ? { note: opts.note } : {}) },
        ],
      };
      return updated;
    });
    const status = statusFromPackages(packages, order.status);
    const next: Order = {
      ...order,
      packages,
      status,
      eta: packages.find((p) => p.eta)?.eta ?? order.eta,
    };
    put(next);
    if (opts?.notify !== false && updated)
      notifyCustomer(next, updated, opts?.note);
  },

  /** Cliente confirmou a receção → passa para «Avaliar». */
  markReceived(orderId: string, packageId?: string) {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    const packages = packagesOf(order).map((p) =>
      (!packageId || p.id === packageId) && p.stage !== "reviewed"
        ? {
            ...p,
            stage: "delivered" as PackageStage,
            timeline: [
              ...p.timeline,
              { stage: "delivered" as PackageStage, at: now() },
            ],
          }
        : p,
    );
    put({
      ...order,
      packages,
      status: statusFromPackages(packages, order.status),
    });
  },

  markReviewed(orderId: string) {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    const packages = packagesOf(order).map((p) => ({
      ...p,
      stage: "reviewed" as PackageStage,
      timeline: [
        ...p.timeline,
        { stage: "reviewed" as PackageStage, at: now() },
      ],
    }));
    put({ ...order, packages, status: "review" });
  },
  update(id: string, patch: Partial<Order>) {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    put({ ...order, ...patch });
  },
  /** Cliente pede o reembolso e indica onde quer receber. */
  requestRefund(
    id: string,
    data: { method: string; account: string; holder: string; note?: string },
  ) {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    put({
      ...order,
      refund: { ...data, requestedAt: now(), status: "requested" },
    });
    notificationActions.add({
      kind: "order",
      title: `Pedido #${order.id} — reembolso solicitado`,
      body: `Vamos transferir para ${data.method} · ${data.account} depois de confirmarmos a devolução.`,
      href: "/orders",
    });
  },
  remove(id: string) {
    orders = orders.filter((o) => o.id !== id);
    emit();
    remoteRemove?.(id);
  },
};
