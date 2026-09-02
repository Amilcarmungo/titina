import { n as PLATFORM_FEE } from "./logistics-store-DuC-stwY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/revenue-20Z1bVAT.js
/** Bazarixy fica com 5% de cada venda; o restante é da loja. */
function splitSale(amount) {
	const platform = amount * PLATFORM_FEE;
	return {
		gross: amount,
		platform,
		shop: amount - platform
	};
}
var PAID_STATUSES = [
	"processing",
	"shipped",
	"review"
];
function isPaid(o) {
	return PAID_STATUSES.includes(o.status);
}
function revenueSummary(orders) {
	const paid = orders.filter(isPaid);
	const gross = paid.reduce((s, o) => s + o.total, 0);
	const pending = orders.filter((o) => o.status === "unpaid").reduce((s, o) => s + o.total, 0);
	const refunded = orders.filter((o) => o.status === "returns").reduce((s, o) => s + o.total, 0);
	const { platform, shop } = splitSale(gross);
	return {
		orders: paid.length,
		gross,
		platform,
		shop,
		pending,
		refunded,
		avgTicket: paid.length ? gross / paid.length : 0
	};
}
/** Agrupa receita por mês (rótulo curto) usando createdAt "dd/mm/aaaa · hh:mm". */
function revenueByMonth(orders) {
	const map = /* @__PURE__ */ new Map();
	for (const o of orders.filter(isPaid)) {
		const m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(o.createdAt);
		const key = m ? `${m[2]}/${m[3]}` : "—";
		map.set(key, (map.get(key) ?? 0) + o.total);
	}
	return Array.from(map, ([label, value]) => ({
		label,
		value
	})).reverse();
}
//#endregion
export { revenueSummary as n, splitSale as r, revenueByMonth as t };
