import type { ShippingQuote } from "@/lib/logistics-store";

export type PendingItem = {
  productId: string;
  name: string;
  qty: number;
  size?: string;
  color?: string;
  unitPrice: number;
};

export type PendingPayment = {
  code: string;
  methodId: string;
  total: number;
  subtotal?: number;
  discount?: number;
  shipping?: ShippingQuote;
  items: PendingItem[];
  customer?: string;
  shippingAddress?: {
    name?: string; phone?: string; street?: string; complement?: string;
    city?: string; state?: string; cep?: string; country?: string;
  };
};

const KEY = "shop_pending_payment_v1";

export function setPendingPayment(p: PendingPayment) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(p));
}

export function getPendingPayment(): PendingPayment | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PendingPayment) : null;
  } catch {
    return null;
  }
}

export function clearPendingPayment() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export function newOrderCode() {
  return `BX-${Math.floor(Math.random() * 9000000 + 1000000)}`;
}
