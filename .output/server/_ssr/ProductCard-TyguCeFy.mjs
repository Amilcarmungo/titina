import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { v as Star } from "../_libs/lucide-react.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { a as SmartImage } from "./Layout-TvK182qQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-TyguCeFy.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product, aspect = "aspect-[3/4]" }) {
	const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/product/$id",
			params: { id: product.id },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
				src: product.image,
				alt: product.name,
				rounded: "rounded-lg",
				wrapperClassName: aspect,
				className: "object-cover transition-transform duration-500 group-hover:scale-105"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 px-0.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$id",
					params: { id: product.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "line-clamp-2 text-xs leading-snug text-foreground",
						children: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-baseline gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold text-sale",
						children: formatKz(product.price)
					}), product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted-foreground line-through",
						children: formatKz(product.oldPrice)
					})]
				}),
				discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 inline-block rounded-sm bg-sale/10 px-1.5 py-0.5 text-[10px] font-bold text-sale",
					children: [
						"-",
						discount,
						"%"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center gap-1 text-[10px] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-gold text-gold" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: product.rating }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"·",
							" ",
							product.sold > 1e3 ? `${(product.sold / 1e3).toFixed(1)}k` : product.sold,
							" ",
							"vendidos"
						] })
					]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
