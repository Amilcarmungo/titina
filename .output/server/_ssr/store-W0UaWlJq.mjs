import { i as useAllProducts } from "./products-store-DBaquvrN.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Jt as BadgeCheck, v as Star, xt as Flame } from "../_libs/lucide-react.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Layout } from "./Layout-Cn-KOsGs.mjs";
import { t as ProductCard } from "./ProductCard-BvNzoNFn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-W0UaWlJq.js
var import_jsx_runtime = require_jsx_runtime();
function StorePage() {
	const products = useAllProducts();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		simpleHeader: true,
		hideBottomNav: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-3 mt-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)] md:mx-0 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/30 font-display text-lg font-black text-brand-foreground md:h-20 md:w-20 md:text-2xl",
							children: "MK"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate font-display text-lg font-black md:text-2xl",
									children: "MonkeyK Beauty Tool"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 shrink-0 text-gold md:h-5 md:w-5" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground md:text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 font-bold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" }), " 4.87"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "5.5K seguidores" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5 text-sale" }), " 99K+ vendidos"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background md:px-6",
							children: "Seguir"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "no-scrollbar mt-4 flex gap-2 overflow-x-auto",
					children: [
						"Artigo",
						"✨ Novo",
						"Promoção",
						"Comentários"
					].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition ${i === 0 ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
						children: t
					}, t))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "font-bold",
					children: "Recomendar ▾"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { children: "Mais Popular" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { children: "Preço ⇅" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { children: "Filtro ▾" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 px-3 md:px-0 pb-6",
				children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 mb-6 rounded-lg bg-gradient-to-r from-sale/10 to-gold/10 p-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-sale",
						children: "SuperDeals"
					}),
					" Poupe até",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: "15%"
					}),
					". Descubra mais ofertas imperdíveis",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "ml-1 font-bold underline",
						children: "›"
					})
				]
			})
		]
	});
}
//#endregion
export { StorePage as component };
