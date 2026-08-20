import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as attachSync } from "./sync-store-s4DuzJ9B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logistics-store-DQgGs8RN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var PLATFORM_FEE = .05;
var KEY = "shop_logistics_v1";
var defaults = [
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
			{
				id: "z1",
				name: "Luanda (centro)",
				fee: 3500,
				etaText: "24h"
			},
			{
				id: "z2",
				name: "Luanda (periferia)",
				fee: 5e3,
				etaText: "48h"
			},
			{
				id: "z3",
				name: "Outras províncias",
				fee: 12e3,
				etaText: "3 a 5 dias"
			}
		],
		createdAt: "01/01/2026"
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
			{
				id: "z1",
				name: "Até 5 km",
				fee: 1500,
				etaText: "60 min"
			},
			{
				id: "z2",
				name: "5 a 15 km",
				fee: 2800,
				etaText: "2h"
			},
			{
				id: "z3",
				name: "15 a 30 km",
				fee: 4500,
				etaText: "4h"
			}
		],
		createdAt: "01/01/2026"
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
		createdAt: "01/01/2026"
	}
];
function read() {
	if (typeof window === "undefined") return defaults;
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) || "");
		if (Array.isArray(raw) && raw.length) return raw;
	} catch {}
	return defaults;
}
var list = read();
var listeners = /* @__PURE__ */ new Set();
function emit() {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
	sync.push();
	listeners.forEach((l) => l());
}
var sync = attachSync("carriers", () => list, (value) => {
	if (!Array.isArray(value)) return;
	list = value;
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
	listeners.forEach((l) => l());
});
function useCarriers() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => list, () => defaults);
}
var carrierActions = {
	add(c) {
		const id = `lg-${Date.now()}`;
		list = [...list, {
			...c,
			id,
			createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR")
		}];
		emit();
		return id;
	},
	update(id, patch) {
		list = list.map((c) => c.id === id ? {
			...c,
			...patch
		} : c);
		emit();
	},
	remove(id) {
		list = list.filter((c) => c.id !== id);
		emit();
	},
	reset() {
		list = defaults;
		emit();
	}
};
var CARRIER_LABEL = {
	transportadora: "Transportadora",
	moto: "Moto-boy",
	retirada: "Retirada"
};
/** Frete: Bazarixy fica com 5%, transportadora recebe 95%. */
function splitFreight(amount) {
	const platform = amount * PLATFORM_FEE;
	return {
		total: amount,
		platform,
		carrier: amount - platform
	};
}
//#endregion
export { useCarriers as a, splitFreight as i, PLATFORM_FEE as n, carrierActions as r, CARRIER_LABEL as t };
