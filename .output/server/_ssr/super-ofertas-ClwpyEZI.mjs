import { i as useAllProducts } from "./products-store-DJ_irs6P.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useHomeConfig } from "./home-config-CaKXkxMI.mjs";
import { t as Layout } from "./Layout-T8WMTjSp.mjs";
import { t as ProductCard } from "./ProductCard-Bj4bNo8h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/super-ofertas-ClwpyEZI.js
var import_jsx_runtime = require_jsx_runtime();
function SuperOffersPage() {
	const products = useAllProducts();
	const config = useHomeConfig();
	const picks = config.superPicks.length ? products.filter((product) => config.superPicks.includes(product.id)) : [...products].filter((product) => product.oldPrice && product.oldPrice > product.price).sort((a, b) => b.oldPrice - b.price - (a.oldPrice - a.price));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-6 pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 p-6 text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-[.18em]",
					children: "Seleção especial"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-black",
					children: config.superTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-white/90",
					children: "Ofertas ativas e produtos com desconto para si."
				})
			]
		}), picks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-5",
			children: picks.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product }, product.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
			children: "Ainda não há Super Ofertas publicadas."
		})]
	}) });
}
//#endregion
export { SuperOffersPage as component };
