import { i as useAllProducts, t as getAnyProduct } from "./products-store-DJ_irs6P.mjs";
import { r as useShops } from "./shops-store-CX-UvhEW.mjs";
import { P as useStore, l as actions } from "./router-Dnmmw1SS.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Bt as Check, R as Plus, S as ShoppingCart, W as Minus, _ as Store, p as Trash2, y as Sparkles } from "../_libs/lucide-react.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { i as quoteShipping } from "./logistics-store-CyhBKYKg.mjs";
import { a as SmartImage, t as Layout } from "./Layout-T8WMTjSp.mjs";
import { t as ProductCard } from "./ProductCard-Bj4bNo8h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-Dm-bY3RJ.js
var import_jsx_runtime = require_jsx_runtime();
function Checkbox({ checked, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: onChange,
		role: "checkbox",
		"aria-checked": checked,
		"aria-label": label,
		className: `grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition ${checked ? "border-sale bg-sale text-white" : "border-muted-foreground/40 bg-background"}`,
		children: checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			className: "h-3 w-3",
			strokeWidth: 3.5
		})
	});
}
/**
* «Talvez goste também» — recomendações a partir das categorias dos itens da
* sacola (ou os mais recentes, quando a sacola está vazia).
*/
function Recommendations({ excludeIds, categories }) {
	const all = useAllProducts();
	if (!all.length) return null;
	const pool = all.filter((p) => !excludeIds.includes(p.id));
	const sameCat = pool.filter((p) => categories.some((c) => (p.category ?? "").toLowerCase() === c.toLowerCase()));
	const list = [...sameCat, ...pool.filter((p) => !sameCat.includes(p))].slice(0, 8);
	if (!list.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 px-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "flex items-center gap-2 text-base font-black",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-brand-strong" }), " Talvez goste também"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
			children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
		})]
	});
}
function CartPage() {
	const { cart } = useStore();
	const shops = useShops();
	const items = cart.map((c, idx) => ({
		...c,
		idx,
		selected: c.selected !== false,
		product: getAnyProduct(c.id)
	})).filter((i) => i.product);
	const groups = shops.map((s) => ({
		shop: s,
		list: items.filter((i) => (i.product.shopId ?? "main") === s.id)
	})).filter((g) => g.list.length > 0);
	const ungrouped = items.filter((i) => !shops.some((s) => s.id === (i.product.shopId ?? "main")));
	if (ungrouped.length) groups.push({
		shop: {
			id: "outros",
			name: "Outras lojas",
			slug: "outros",
			createdAt: ""
		},
		list: ungrouped
	});
	const selected = items.filter((i) => i.selected);
	const subtotal = selected.reduce((s, i) => s + (i.unitPrice ?? i.product.price) * i.qty, 0);
	const shipping = quoteShipping(subtotal);
	const estimatedTotal = subtotal + (shipping?.chargedFee ?? 0);
	const allSelected = items.length > 0 && selected.length === items.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		simpleHeader: true,
		hideBottomNav: true,
		children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
						className: "h-16 w-16 text-muted-foreground",
						strokeWidth: 1.2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-xl font-bold",
						children: "Sua sacola está vazia"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Adicione produtos para continuar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mt-6 rounded-full bg-brand px-8 py-2.5 text-sm font-bold text-brand-foreground",
						children: "Explorar produtos"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recommendations, {
				excludeIds: [],
				categories: []
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl pb-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: allSelected,
							onChange: () => actions.setAllSelected(!allSelected),
							label: "Seleccionar tudo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-bold",
							children: [
								"Seleccionar tudo (",
								items.length,
								")"
							]
						}),
						selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								if (confirm(`Remover ${selected.length} item(ns)?`)) actions.removeSelected();
							},
							className: "ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remover"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2 px-3",
					children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 border-b border-border px-3 py-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: g.list.every((i) => i.selected),
									onChange: () => {
										const next = !g.list.every((i) => i.selected);
										g.list.forEach((i) => {
											if (i.selected !== next) actions.toggleSelected(i.idx);
										});
									},
									label: `Seleccionar ${g.shop.name}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm font-black",
									children: g.shop.name
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border",
							children: g.list.map((item) => {
								const price = item.unitPrice ?? item.product.price;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3 px-3 py-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: item.selected,
												onChange: () => actions.toggleSelected(item.idx),
												label: item.product.name
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
											src: item.image ?? item.product.image,
											alt: item.product.name,
											rounded: "rounded-lg",
											wrapperClassName: "h-24 w-20 shrink-0",
											className: "object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex min-w-0 flex-1 flex-col",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "line-clamp-2 text-sm",
													children: item.product.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-1 inline-flex items-center gap-1.5 self-start rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground",
													children: [item.variantLabel ?? item.size, item.color && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "inline-block h-2.5 w-2.5 rounded-full border border-border",
														style: { background: item.color }
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-auto flex items-center justify-between gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block font-black text-sale",
															children: formatKz(price)
														}), item.product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block text-[11px] text-muted-foreground line-through",
															children: formatKz(item.product.oldPrice)
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex shrink-0 items-center rounded-full border border-border",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => actions.updateQty(item.idx, item.qty - 1),
																"aria-label": "Diminuir",
																className: "grid h-7 w-7 place-items-center",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "w-6 text-center text-sm",
																children: item.qty
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => actions.updateQty(item.idx, item.qty + 1),
																"aria-label": "Aumentar",
																className: "grid h-7 w-7 place-items-center",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
															})
														]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => actions.removeFromCart(item.idx),
											"aria-label": "Remover",
											className: "self-start p-1 text-muted-foreground hover:text-destructive",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})
									]
								}, item.idx);
							})
						})]
					}, g.shop.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-3 mt-2 space-y-2 rounded-2xl bg-card p-4 text-sm shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Itens seleccionados"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selected.length })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Frete estimado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: shipping?.isFree ? "font-bold text-emerald-700" : "",
								children: shipping?.isFree ? "Grátis" : formatKz(shipping?.chargedFee ?? 0)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "O valor final é confirmado depois de escolher a entrega e informar o endereço."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-t border-border pt-2 text-base font-black",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total estimado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sale",
								children: formatKz(estimatedTotal)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recommendations, {
					excludeIds: items.map((i) => i.id),
					categories: items.map((i) => i.product.category ?? "").filter(Boolean)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background px-3 py-2.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-3xl items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: allSelected,
								onChange: () => actions.setAllSelected(!allSelected),
								label: "Seleccionar tudo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-black text-sale",
									children: formatKz(estimatedTotal)
								})]
							}),
							selected.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto rounded-full bg-muted px-8 py-3 text-center text-sm font-bold text-muted-foreground",
								children: "Continuar (0)"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/checkout",
								className: "ml-auto rounded-full bg-brand px-8 py-3 text-center text-sm font-black text-brand-foreground",
								children: [
									"Continuar (",
									selected.length,
									")"
								]
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { CartPage as component };
