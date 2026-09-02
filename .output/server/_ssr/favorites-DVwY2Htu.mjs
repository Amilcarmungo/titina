import { i as useAllProducts } from "./products-store-DBaquvrN.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { ft as Heart } from "../_libs/lucide-react.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as useStore } from "./router-CY1rd_zI.mjs";
import { t as Layout } from "./Layout-DsiRGIi5.mjs";
import { t as ProductCard } from "./ProductCard-BvNzoNFn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-DVwY2Htu.js
var import_jsx_runtime = require_jsx_runtime();
function FavoritesPage() {
	const { favorites } = useStore();
	const products = useAllProducts();
	const items = products.filter((p) => favorites.includes(p.id));
	if (items.length > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		title: "Favoritos",
		showBack: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 p-3",
			children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
		})
	});
	const suggestions = products.slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		title: "Favoritos",
		showBack: true,
		hideBottomNav: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center px-6 pt-10 pb-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
								className: "h-20 w-20 text-foreground/70",
								strokeWidth: 1.2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-1 -left-2 text-foreground/40",
								children: "✦"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-2 -right-3 text-foreground/40",
								children: "✧"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -bottom-1 -left-3 text-foreground/40",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute bottom-2 -right-2 text-foreground/40",
								children: "○"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-foreground/80",
						children: "Está vazio aqui."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex w-full max-w-md gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/me",
							className: "flex-1 rounded-sm bg-foreground py-3 text-center text-sm font-bold text-background",
							children: "Entrar / Cadastrar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "flex-1 rounded-sm border border-foreground py-3 text-center text-sm font-bold",
							children: "Comprar agora"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 bg-muted/50 px-4 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Curta."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Guarde tudo o que ama numa só página."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pense bem antes de comprar." })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Receba notificações quando esgotar." })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "◆"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-bold",
							children: "Você também pode gostar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "◆"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: suggestions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})]
			})
		]
	});
}
//#endregion
export { FavoritesPage as component };
