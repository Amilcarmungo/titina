import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { l as useOrders } from "./orders-store-qQk2r5Yq.mjs";
import { i as useAllProducts } from "./products-store-DJ_irs6P.mjs";
import { t as getShop } from "./shops-store-CX-UvhEW.mjs";
import { v as Link, x as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { $t as ArrowLeft, C as ShoppingBag, G as MessageSquare, H as Package, _ as Store, v as Star } from "../_libs/lucide-react.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { t as AdminTabs } from "./AdminTabs-4tAQj8U4.mjs";
import { i as useReviews } from "./reviews-BJEn2EFm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.lojas._id-v1Qk2fjr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopDetail() {
	const { id } = useParams({ from: "/admin/lojas/$id" });
	const shop = getShop(id);
	const products = useAllProducts();
	const orders = useOrders();
	const reviews = useReviews();
	const [tab, setTab] = (0, import_react.useState)("products");
	const shopProducts = (0, import_react.useMemo)(() => products.filter((p) => (p.shopId ?? "main") === id), [products, id]);
	const productIds = new Set(shopProducts.map((p) => p.id));
	const shopOrders = (0, import_react.useMemo)(() => orders.filter((o) => o.items.some((i) => productIds.has(i.productId))), [orders, productIds]);
	const shopReviews = (0, import_react.useMemo)(() => reviews.filter((r) => productIds.has(r.productId)), [reviews, productIds]);
	const revenue = shopOrders.reduce((s, o) => s + o.total, 0);
	const avgRating = shopReviews.length ? shopReviews.reduce((s, r) => s + r.rating, 0) / shopReviews.length : 0;
	if (!shop) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-background p-10 text-center shadow-[var(--shadow-card)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loja não encontrada."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/lojas",
			className: "mt-3 inline-flex text-xs font-bold text-foreground underline",
			children: "Voltar"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/lojas",
				className: "inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Todas as lojas"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-2xl bg-background shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[16/5] bg-gradient-to-br from-muted to-muted/50",
					children: shop.cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: shop.cover,
						alt: "",
						className: "h-full w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-full place-items-center text-6xl opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative px-6 pb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "-mt-10 flex flex-wrap items-end gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-background ring-4 ring-background shadow-xl",
							children: shop.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: shop.logo,
								alt: "",
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-8 w-8 text-muted-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-2xl font-black",
									children: shop.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"/",
										shop.slug,
										" · Responsável: ",
										shop.ownerName || "—",
										" · Desde",
										" ",
										shop.createdAt
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: shop.description
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Produtos",
								value: String(shopProducts.length),
								icon: Package
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Pedidos",
								value: String(shopOrders.length),
								icon: ShoppingBag
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Receita",
								value: formatKz(revenue),
								icon: Store
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Avaliação",
								value: avgRating ? avgRating.toFixed(1) : "—",
								icon: Star
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTabs, {
				active: tab,
				onChange: setTab,
				tabs: [
					{
						id: "products",
						label: "Produtos",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3.5 w-3.5" }),
						badge: shopProducts.length
					},
					{
						id: "orders",
						label: "Pedidos",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5" }),
						badge: shopOrders.length
					},
					{
						id: "reviews",
						label: "Avaliações",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3.5 w-3.5" }),
						badge: shopReviews.length
					}
				]
			}),
			tab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: [shopProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.image,
							alt: "",
							className: "h-14 w-14 rounded-lg object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "line-clamp-1 text-sm font-bold",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-sale",
								children: formatKz(p.price)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/produtos",
							className: "text-[11px] font-bold text-muted-foreground hover:text-foreground",
							children: "Editar"
						})
					]
				}, p.id)), shopProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-full rounded-2xl bg-background p-10 text-center shadow-[var(--shadow-card)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Nenhum produto nesta loja.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/produtos",
								className: "font-bold text-foreground underline",
								children: "Adicionar produto"
							})
						]
					})
				})]
			}),
			tab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [shopOrders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-black",
						children: ["#", o.id]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground",
						children: [
							o.createdAt,
							" · ",
							o.customer
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase text-muted-foreground",
							children: o.status
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-black text-sale",
							children: formatKz(o.total)
						})]
					})]
				}, o.id)), shopOrders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "Nenhum pedido nesta loja."
				})]
			}),
			tab === "reviews" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [shopReviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "inline-flex items-center gap-0.5 text-xs font-bold text-amber-600",
								children: Array.from({ length: r.rating }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-current" }, i))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: r.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[10px] text-muted-foreground",
							children: r.createdAt
						})
					]
				}, r.id)), shopReviews.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "Nenhuma avaliação ainda."
				})]
			})
		]
	});
}
function Stat({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] font-black uppercase tracking-wider",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-lg font-black",
			children: value
		})]
	});
}
//#endregion
export { ShopDetail as component };
