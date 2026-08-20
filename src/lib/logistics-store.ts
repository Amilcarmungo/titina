import { useSyncExternalStore } from "react";
import { attachSync } from "@/lib/firebase/sync-store";

export const PLATFORM_FEE = 0.05; // Bazarixy fica com 5%

export type CarrierType = "transportadora" | "moto" | "retirada";

export type Zone = { id: string; name: string; fee: number; etaText: string };

export type Carrier = {
  id: string;
  name: string;
  type: CarrierType;
  phone?: string;
  active: boolean;
  baseFee: number;
  perKm: number;
  maxWeightKg?: number;
  etaText?: string;
  coverage?: string;
  zones: Zone[];
  createdAt: string;
};

export type ShippingSettings = {
  freeShippingEnabled: boolean;
  freeShippingThreshold: number;
};

export type ShippingQuote = {
  carrierId: string;
  carrierName: string;
  carrierType: CarrierType;
  fee: number;
  chargedFee: number;
  isFree: boolean;
  etaText: string;
  zoneName?: string;
};

const KEY = "shop_logistics_v1";
const SETTINGS_KEY = "shop_shipping_settings_v1";

const defaultSettings: ShippingSettings = {
  freeShippingEnabled: true,
  freeShippingThreshold: 120000,
};

const defaults: Carrier[] = [
  {
    id: "lg-transportadora",
    name: "Bazarixy Express (Transportadora)",
    type: "transportadora",
    phone: "+244 923 000 111",
    active: true,
    baseFee: 3500,
    perKm: 120,
    maxWeightKg: 30,
    etaText: "2 a 4 dias úteis",
    coverage: "Todo o país",
    zones: [
      { id: "z1", name: "Luanda (centro)", fee: 3500, etaText: "24h" },
      { id: "z2", name: "Luanda (periferia)", fee: 5000, etaText: "48h" },
      { id: "z3", name: "Outras províncias", fee: 12000, etaText: "3 a 5 dias" },
    ],
    createdAt: "01/01/2026",
  },
  {
    id: "lg-moto",
    name: "Moto-boys Bazarixy",
    type: "moto",
    phone: "+244 923 000 222",
    active: true,
    baseFee: 1500,
    perKm: 200,
    maxWeightKg: 8,
    etaText: "Mesmo dia",
    coverage: "Luanda",
    zones: [
      { id: "z1", name: "Até 5 km", fee: 1500, etaText: "60 min" },
      { id: "z2", name: "5 a 15 km", fee: 2800, etaText: "2h" },
      { id: "z3", name: "15 a 30 km", fee: 4500, etaText: "4h" },
    ],
    createdAt: "01/01/2026",
  },
  {
    id: "lg-retirada",
    name: "Retirada na loja",
    type: "retirada",
    active: true,
    baseFee: 0,
    perKm: 0,
    etaText: "Assim que o pedido estiver pronto",
    coverage: "Balcão Bazarixy — Luanda",
    zones: [],
    createdAt: "01/01/2026",
  },
];

function read(): Carrier[] {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "");
    if (Array.isArray(raw) && raw.length) return raw;
  } catch {}
  return defaults;
}

let list: Carrier[] = read();
let settings: ShippingSettings = (() => {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "");
    return { ...defaultSettings, ...(raw && typeof raw === "object" ? raw : {}) };
  } catch { return defaultSettings; }
})();
const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
  sync.push();
  listeners.forEach((l) => l());
}

const sync = attachSync<Carrier[]>("carriers", () => list, (value) => {
  if (!Array.isArray(value)) return;
  list = value;
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l());
});

export function useCarriers(): Carrier[] {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => list,
    () => defaults,
  );
}

export function useShippingSettings(): ShippingSettings {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => settings,
    () => defaultSettings,
  );
}

export const carrierActions = {
  add(c: Omit<Carrier, "id" | "createdAt">) {
    const id = `lg-${Date.now()}`;
    list = [...list, { ...c, id, createdAt: new Date().toLocaleDateString("pt-BR") }];
    emit();
    return id;
  },
  update(id: string, patch: Partial<Carrier>) {
    list = list.map((c) => (c.id === id ? { ...c, ...patch } : c));
    emit();
  },
  remove(id: string) {
    list = list.filter((c) => c.id !== id);
    emit();
  },
  reset() { list = defaults; emit(); },
};

export const shippingActions = {
  update(patch: Partial<ShippingSettings>) {
    settings = { ...settings, ...patch, freeShippingThreshold: Math.max(0, Number(patch.freeShippingThreshold ?? settings.freeShippingThreshold)) };
    if (typeof window !== "undefined") localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    listeners.forEach((l) => l());
  },
  reset() {
    settings = defaultSettings;
    if (typeof window !== "undefined") localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    listeners.forEach((l) => l());
  },
};

export function shippingOptions(subtotal: number, address?: { city?: string; state?: string }): ShippingQuote[] {
  const query = `${address?.city ?? ""} ${address?.state ?? ""}`.toLocaleLowerCase();
  return list.filter((carrier) => carrier.active).map((carrier) => {
    const zone = carrier.zones.find((item) => query.includes(item.name.toLocaleLowerCase()));
    const fee = zone?.fee ?? carrier.baseFee;
    const isFree = carrier.type === "retirada" || (settings.freeShippingEnabled && subtotal >= settings.freeShippingThreshold);
    return {
      carrierId: carrier.id,
      carrierName: carrier.name,
      carrierType: carrier.type,
      fee,
      chargedFee: isFree ? 0 : fee,
      isFree,
      etaText: zone?.etaText ?? carrier.etaText ?? "A combinar",
      ...(zone ? { zoneName: zone.name } : {}),
    };
  });
}

export function quoteShipping(subtotal: number, carrierId?: string, address?: { city?: string; state?: string }): ShippingQuote | null {
  const options = shippingOptions(subtotal, address);
  return options.find((option) => option.carrierId === carrierId) ?? options[0] ?? null;
}

export const CARRIER_LABEL: Record<CarrierType, string> = {
  transportadora: "Transportadora",
  moto: "Moto-boy",
  retirada: "Retirada",
};

/** Frete: Bazarixy fica com 5%, transportadora recebe 95%. */
export function splitFreight(amount: number) {
  const platform = amount * PLATFORM_FEE;
  return { total: amount, platform, carrier: amount - platform };
}
