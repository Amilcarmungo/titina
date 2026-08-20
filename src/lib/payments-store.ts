import { useSyncExternalStore } from "react";
import { attachSync } from "@/lib/firebase/sync-store";
import payUnitel from "@/assets/pay-unitel.png.asset.json";
import payPaypay from "@/assets/pay-paypay.png.asset.json";
import payMulticaixa from "@/assets/pay-multicaixa.jpg.asset.json";
import payExpress from "@/assets/pay-express.jpg.asset.json";

export type PaymentMethod = {
  id: string;
  label: string;
  desc: string;
  image?: string;
  active: boolean;
  instructions?: string;
  /** Número de telemóvel / conta que o cliente deve usar para transferir */
  phone?: string;
};

const KEY = "shop_payment_methods_v2";

const defaults: PaymentMethod[] = [
  {
    id: "multicaixa-express",
    label: "Multicaixa Express",
    desc: "Pagamento instantâneo pelo app",
    image: payExpress.url,
    active: true,
    phone: "923 000 000",
    instructions: "Abra o app Multicaixa Express, escolha Transferência Express, copie os dados abaixo e confirme o envio.",
  },
  { id: "unitel-money", label: "Unitel Money", desc: "Débito da sua conta Unitel Money", image: payUnitel.url, active: true },
  { id: "paypay", label: "PayPay", desc: "Carteira digital PayPay", image: payPaypay.url, active: true },
  { id: "multicaixa", label: "Multicaixa (Referência)", desc: "Pague em qualquer ATM", image: payMulticaixa.url, active: true },
  { id: "card", label: "Cartão de crédito / débito", desc: "Visa, Mastercard, Amex", active: true },
];

function read(): PaymentMethod[] {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "");
    if (Array.isArray(raw) && raw.length) return raw;
  } catch {}
  return defaults;
}

let list: PaymentMethod[] = read();
const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
  sync.push();
  listeners.forEach((l) => l());
}

const sync = attachSync<PaymentMethod[]>("paymentMethods", () => list, (value) => {
  if (!Array.isArray(value)) return;
  list = value;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l());
});

export function usePaymentMethods(): PaymentMethod[] {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => list,
    () => defaults,
  );
}

export function getPaymentMethod(id?: string) {
  return id ? list.find((m) => m.id === id) : undefined;
}

export const paymentActions = {
  add(m: Omit<PaymentMethod, "id"> & { id?: string }) {
    const id = m.id?.trim() || m.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `pm-${Date.now()}`;
    list = [...list, { ...m, id }];
    emit();
    return id;
  },
  update(id: string, patch: Partial<PaymentMethod>) {
    list = list.map((m) => (m.id === id ? { ...m, ...patch } : m));
    emit();
  },
  remove(id: string) {
    list = list.filter((m) => m.id !== id);
    emit();
  },
  reset() { list = defaults; emit(); },
};
