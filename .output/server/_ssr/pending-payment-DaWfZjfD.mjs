//#region node_modules/.nitro/vite/services/ssr/assets/pending-payment-DaWfZjfD.js
var KEY = "shop_pending_payment_v1";
function setPendingPayment(p) {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(p));
}
function getPendingPayment() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function clearPendingPayment() {
	if (typeof window !== "undefined") localStorage.removeItem(KEY);
}
function newOrderCode() {
	return `BX-${Math.floor(Math.random() * 9e6 + 1e6)}`;
}
//#endregion
export { setPendingPayment as i, getPendingPayment as n, newOrderCode as r, clearPendingPayment as t };
