import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useCategories } from "./categories-store-CFvdBuKR.mjs";
import { a as useCustomProducts } from "./products-store-DBaquvrN.mjs";
import { o as useUnreadCount } from "./notifications-store-B_Op6deg.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Bt as ChevronDown, Gt as Camera, S as ShoppingCart, q as Menu, x as SlidersHorizontal, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as SmartImage } from "./SmartImage-BH5TwHiu.mjs";
import { H as notFound, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$20, u as useStore } from "./router-CVF9r1DU.mjs";
import { n as NotificationBell, r as SearchIcon, t as Layout } from "./Layout-Cn-KOsGs.mjs";
import { t as ProductCard } from "./ProductCard-BvNzoNFn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-By5nyk9M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { slug } = Route$20.useLoaderData();
	const { sub: subParam } = Route$20.useSearch();
	const cat = useCategories().find((c) => c.slug === slug);
	const customs = useCustomProducts();
	const [sub, setSub] = (0, import_react.useState)(subParam ?? "all");
	const { cart } = useStore();
	const unread = useUnreadCount();
	const cartCount = cart.reduce((s, c) => s + c.qty, 0);
	const all = (0, import_react.useMemo)(() => [...customs].filter((p) => p.category === slug), [customs, slug]);
	const filtered = sub === "all" ? all : all.filter((p) => p.subcategory === sub);
	const subImage = (name) => all.find((p) => p.subcategory === name)?.image ?? cat?.image;
	if (!cat) throw notFound();
	const subs = cat.subcategories ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		title: cat.name,
		showBack: true,
		hideHeader: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-background md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 px-2 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => window.history.back(),
							className: "p-1.5",
							"aria-label": "Voltar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								className: "h-5 w-5",
								strokeWidth: 2.2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categories",
							className: "p-1.5",
							"aria-label": "Menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
								className: "h-5 w-5",
								strokeWidth: 2.2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/categories",
							className: "flex-1 min-w-0 flex items-center gap-1 rounded-full border-2 border-foreground bg-background pl-3 pr-1 py-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex-1 min-w-0 truncate text-[13px] text-foreground/80",
									children: [cat.name, " femininas"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "Buscar por imagem",
									className: "grid h-7 w-7 place-items-center text-foreground/70",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
										className: "h-4 w-4",
										strokeWidth: 2
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-7 w-9 place-items-center rounded-full bg-foreground text-background",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, {
										className: "h-4 w-4",
										strokeWidth: 2
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/notifications",
							className: "relative p-1.5",
							"aria-label": "Notificações",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, { count: unread })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cart",
							className: "relative p-1.5",
							"aria-label": "Carrinho",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
								className: "h-5 w-5",
								strokeWidth: 2.2
							}), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground",
								children: cartCount
							})]
						})
					]
				})
			}),
			subs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "no-scrollbar mx-auto flex max-w-5xl gap-3 overflow-x-auto px-3 py-3 md:gap-5 md:px-0 md:py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTile, {
						label: "Tudo",
						image: cat.image,
						active: sub === "all",
						onClick: () => setSub("all")
					}), subs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTile, {
						label: s,
						image: cat.subImages?.[s] ?? subImage(s),
						active: sub === s,
						onClick: () => setSub(s)
					}, s))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-5xl items-center justify-between px-3 py-3 text-xs md:px-0 md:py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "inline-flex items-center gap-1 font-bold",
					children: ["Recomendar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { children: "Mais Popular" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { children: "Preço ⇅" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex items-center gap-1",
							children: ["Filtro ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-3.5 w-3.5" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-5xl grid-cols-2 gap-3 px-3 pb-8 md:grid-cols-4 md:gap-5 md:px-0 lg:grid-cols-5",
				children: [(filtered.length ? filtered : all).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id)), filtered.length === 0 && all.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "col-span-full py-10 text-center text-sm text-muted-foreground",
					children: "Nenhum produto nesta categoria ainda."
				})]
			})
		]
	});
}
function SubTile({ label, image, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "flex w-[62px] shrink-0 flex-col items-center gap-1.5 md:w-[72px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-[58px] w-[58px] place-items-center overflow-hidden rounded-full bg-muted transition md:h-[68px] md:w-[68px] ${active ? "ring-2 ring-[hsl(22_95%_55%)] ring-offset-2 ring-offset-background" : "ring-1 ring-border"}`,
			children: image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
				src: image,
				alt: label,
				wrapperClassName: "absolute inset-0 h-full w-full",
				className: "object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-2xl",
				children: "🛍️"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `line-clamp-2 text-center text-[11px] leading-tight md:text-xs ${active ? "font-bold bg-gradient-to-r from-[hsl(22_95%_55%)] to-[hsl(330_85%_60%)] bg-clip-text text-transparent" : "text-foreground/80"}`,
			children: label
		})]
	});
}
//#endregion
export { CategoryPage as component };
