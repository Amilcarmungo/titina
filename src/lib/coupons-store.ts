import { useSyncExternalStore } from "react";
import { attachSync } from "@/lib/firebase/sync-store";

export type Coupon = {
  code: string;
  /** percent = % do subtotal · fixed = valor fixo em Kz */
  type: "percent" | "fixed";
  value: number;
  /** valor mínimo do pedido para o cupom valer */
  minOrder: number;
  description?: string;
  /** dd/mm/aaaa */
  expires?: string;
  active: boolean;
};

const KEY = "shop_coupons_v1";

const defaults: Coupon[] = [
  { code: "BAZARIXY10", type: "percent", value: 10, minOrder: 0, description: "10% off na primeira compra", active: true },
  { code: "FRETE3000", type: "fixed", value: 3000, minOrder: 20000, description: "Kz 3.000 OFF em pedidos acima de Kz 20.000", active: true },
];

function read(): Coupon[] {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "");
    if (Array.isArray(raw)) return raw;
  } catch { /* ignore */ }
  return defaults;
}

let list: Coupon[] = read();
const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
  sync.push();
  listeners.forEach((l) => l());
}

const sync = attachSync<Coupon[]>("coupons", () => list, (value) => {
  if (!Array.isArray(value)) return;
  list = value;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l());
});

export function useCoupons(): Coupon[] {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => list,
    () => defaults,
  );
}

export function getCoupons() { return list; }

function isExpired(c: Coupon) {
  if (!c.expires) return false;
  const m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(c.expires);
  if (!m) return false;
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), 23, 59, 59);
  return d.getTime() < Date.now();
}

export type CouponResult =
  | { ok: true; coupon: Coupon; discount: number }
  | { ok: false; error: string };

export function validateCoupon(code: string, subtotal: number): CouponResult {
  const c = list.find((x) => x.code.toLowerCase() === code.trim().toLowerCase());
  if (!c) return { ok: false, error: "Cupom inválido." };
  if (!c.active) return { ok: false, error: "Este cupom não está ativo." };
  if (isExpired(c)) return { ok: false, error: "Este cupom expirou." };
  if (subtotal < c.minOrder) return { ok: false, error: `Pedido mínimo de Kz ${c.minOrder.toLocaleString("pt-AO")}.` };
  const raw = c.type === "percent" ? (subtotal * c.value) / 100 : c.value;
  return { ok: true, coupon: c, discount: Math.min(raw, subtotal) };
}

export const couponActions = {
  add(c: Coupon) {
    const code = c.code.trim().toUpperCase();
    list = [{ ...c, code }, ...list.filter((x) => x.code.toUpperCase() !== code)];
    emit();
  },
  update(code: string, patch: Partial<Coupon>) {
    list = list.map((c) => (c.code === code ? { ...c, ...patch } : c));
    emit();
  },
  remove(code: string) {
    list = list.filter((c) => c.code !== code);
    emit();
  },
  reset() { list = defaults; emit(); },
};
