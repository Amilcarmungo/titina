import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as attachSync } from "./sync-store-BZQqyU1u.mjs";
import { n as pay_multicaixa_jpg_asset_default, t as pay_express_jpg_asset_default } from "./pay-express.jpg.asset-zimTYSzM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-store-estnBhgv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var pay_unitel_png_asset_default = {
	asset_id: "7cb13ffd-084b-42cd-8c1e-0e70c41cdb4f",
	content_type: "image/png",
	created_at: "2026-07-16T03:12:06Z",
	original_filename: "pay-unitel.png",
	project_id: "67f47a30-788f-4cd0-9e2d-44f184230c53",
	r2_key: "a/v1/67f47a30-788f-4cd0-9e2d-44f184230c53/7cb13ffd-084b-42cd-8c1e-0e70c41cdb4f/pay-unitel.png",
	size: 14351,
	url: "/__l5e/assets-v1/7cb13ffd-084b-42cd-8c1e-0e70c41cdb4f/pay-unitel.png",
	version: 1
};
var pay_paypay_png_asset_default = {
	asset_id: "78009911-cf16-4659-8b02-9d24621552ce",
	content_type: "image/png",
	created_at: "2026-07-16T03:12:09Z",
	original_filename: "pay-paypay.png",
	project_id: "67f47a30-788f-4cd0-9e2d-44f184230c53",
	r2_key: "a/v1/67f47a30-788f-4cd0-9e2d-44f184230c53/78009911-cf16-4659-8b02-9d24621552ce/pay-paypay.png",
	size: 7122,
	url: "/__l5e/assets-v1/78009911-cf16-4659-8b02-9d24621552ce/pay-paypay.png",
	version: 1
};
var KEY = "shop_payment_methods_v2";
var defaults = [
	{
		id: "multicaixa-express",
		label: "Multicaixa Express",
		desc: "Pagamento instantâneo pelo app",
		image: pay_express_jpg_asset_default.url,
		active: true,
		phone: "923 000 000",
		instructions: "Abra o app Multicaixa Express, escolha Transferência Express, copie os dados abaixo e confirme o envio."
	},
	{
		id: "unitel-money",
		label: "Unitel Money",
		desc: "Débito da sua conta Unitel Money",
		image: pay_unitel_png_asset_default.url,
		active: true
	},
	{
		id: "paypay",
		label: "PayPay",
		desc: "Carteira digital PayPay",
		image: pay_paypay_png_asset_default.url,
		active: true
	},
	{
		id: "multicaixa",
		label: "Multicaixa (Referência)",
		desc: "Pague em qualquer ATM",
		image: pay_multicaixa_jpg_asset_default.url,
		active: true
	},
	{
		id: "card",
		label: "Cartão de crédito / débito",
		desc: "Visa, Mastercard, Amex",
		active: true
	}
];
function read() {
	if (typeof window === "undefined") return defaults;
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) || "");
		if (Array.isArray(raw) && raw.length) return raw;
	} catch {
		return defaults;
	}
	return defaults;
}
var list = read();
var listeners = /* @__PURE__ */ new Set();
function emit() {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
	sync.push();
	listeners.forEach((l) => l());
}
var sync = attachSync("paymentMethods", () => list, (value) => {
	if (!Array.isArray(value)) return;
	list = value;
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
	listeners.forEach((l) => l());
});
function usePaymentMethods() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => list, () => defaults);
}
function getPaymentMethod(id) {
	return id ? list.find((m) => m.id === id) : void 0;
}
var paymentActions = {
	add(m) {
		const id = m.id?.trim() || m.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `pm-${Date.now()}`;
		list = [...list, {
			...m,
			id
		}];
		emit();
		return id;
	},
	update(id, patch) {
		list = list.map((m) => m.id === id ? {
			...m,
			...patch
		} : m);
		emit();
	},
	remove(id) {
		list = list.filter((m) => m.id !== id);
		emit();
	},
	reset() {
		list = defaults;
		emit();
	}
};
//#endregion
export { paymentActions as n, usePaymentMethods as r, getPaymentMethod as t };
