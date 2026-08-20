import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as attachSync } from "./sync-store-s4DuzJ9B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coupons-store-Di8Im-Yr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "shop_coupons_v1";
var defaults = [{
	code: "BAZARIXY10",
	type: "percent",
	value: 10,
	minOrder: 0,
	description: "10% off na primeira compra",
	active: true
}, {
	code: "FRETE3000",
	type: "fixed",
	value: 3e3,
	minOrder: 2e4,
	description: "Kz 3.000 OFF em pedidos acima de Kz 20.000",
	active: true
}];
function read() {
	if (typeof window === "undefined") return defaults;
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) || "");
		if (Array.isArray(raw)) return raw;
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
var sync = attachSync("coupons", () => list, (value) => {
	if (!Array.isArray(value)) return;
	list = value;
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
	listeners.forEach((l) => l());
});
function useCoupons() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => list, () => defaults);
}
function isExpired(c) {
	if (!c.expires) return false;
	const m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(c.expires);
	if (!m) return false;
	return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), 23, 59, 59).getTime() < Date.now();
}
function validateCoupon(code, subtotal) {
	const c = list.find((x) => x.code.toLowerCase() === code.trim().toLowerCase());
	if (!c) return {
		ok: false,
		error: "Cupom inválido."
	};
	if (!c.active) return {
		ok: false,
		error: "Este cupom não está ativo."
	};
	if (isExpired(c)) return {
		ok: false,
		error: "Este cupom expirou."
	};
	if (subtotal < c.minOrder) return {
		ok: false,
		error: `Pedido mínimo de Kz ${c.minOrder.toLocaleString("pt-AO")}.`
	};
	const raw = c.type === "percent" ? subtotal * c.value / 100 : c.value;
	return {
		ok: true,
		coupon: c,
		discount: Math.min(raw, subtotal)
	};
}
var couponActions = {
	add(c) {
		const code = c.code.trim().toUpperCase();
		list = [{
			...c,
			code
		}, ...list.filter((x) => x.code.toUpperCase() !== code)];
		emit();
	},
	update(code, patch) {
		list = list.map((c) => c.code === code ? {
			...c,
			...patch
		} : c);
		emit();
	},
	remove(code) {
		list = list.filter((c) => c.code !== code);
		emit();
	},
	reset() {
		list = defaults;
		emit();
	}
};
//#endregion
export { useCoupons as n, validateCoupon as r, couponActions as t };
