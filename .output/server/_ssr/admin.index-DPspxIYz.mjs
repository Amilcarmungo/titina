import { l as useOrders } from "./orders-store-CvCD85Gc.mjs";
import { a as useCustomProducts, t as getAnyProduct } from "./products-store-DJ_irs6P.mjs";
import { r as useShops } from "./shops-store-CX-UvhEW.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as ShoppingBag, H as Package, Nt as ClipboardList, R as Plus, Xt as ArrowUpRight, _ as Store, bt as FolderTree, f as TrendingUp, it as Layers, st as Image, u as Truck } from "../_libs/lucide-react.mjs";
import { n as useCategories } from "./categories-store-C4Vdw11E.mjs";
import { s as useSlidesRaw } from "./banner-D2tjuxqW.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { c as useCarriers, n as PLATFORM_FEE } from "./logistics-store-CyhBKYKg.mjs";
import { n as revenueSummary } from "./revenue-B6r5opPy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-DPspxIYz.js
var import_jsx_runtime = require_jsx_runtime();
function Sparkline({ values, color = "currentColor" }) {
	const max = Math.max(...values, 1);
	const min = Math.min(...values, 0);
	const range = max - min || 1;
	const pts = values.map((v, i) => `${i / (values.length - 1 || 1) * 100},${100 - (v - min) / range * 100}`).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 100 100",
		preserveAspectRatio: "none",
		className: "h-10 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			fill: "none",
			stroke: color,
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			points: pts
		})
	});
}
function Dashboard() {
	const orders = useOrders();
	const customs = useCustomProducts();
	const slides = useSlidesRaw();
	const cats = useCategories();
	const shops = useShops();
	const carriers = useCarriers();
	const rev = revenueSummary(orders);
	const pending = orders.filter((o) => o.status === "unpaid" || o.status === "processing").length;
	const trend = [
		3,
		4,
		3,
		6,
		5,
		7,
		8,
		6,
		9,
		10,
		8,
		12
	];
	const stats = [
		{
			to: "/admin/receita",
			label: "Receita total",
			value: formatKz(rev.gross),
			sub: `Bazarixy ${Math.round(PLATFORM_FEE * 100)}% · ${formatKz(rev.platform)}`,
			icon: TrendingUp,
			tint: "from-emerald-500/20 to-emerald-500/5",
			ic: "bg-emerald-500",
			trend
		},
		{
			to: "/admin/pedidos",
			label: "Pedidos",
			value: `${orders.length}`,
			sub: `${pending} pendentes`,
			icon: ShoppingBag,
			tint: "from-blue-500/20 to-blue-500/5",
			ic: "bg-blue-500",
			trend: trend.map((v) => v * .6)
		},
		{
			to: "/admin/produtos",
			label: "Produtos",
			value: `${customs.length}`,
			sub: "publicados por você",
			icon: Package,
			tint: "from-purple-500/20 to-purple-500/5",
			ic: "bg-purple-500",
			trend: trend.map((v) => v * .4)
		},
		{
			to: "/admin/categorias",
			label: "Categorias",
			value: `${cats.length}`,
			sub: "editar categorias",
			icon: FolderTree,
			tint: "from-pink-500/20 to-pink-500/5",
			ic: "bg-pink-500",
			trend: trend.map((v) => v * .3)
		},
		{
			to: "/admin/lojas",
			label: "Lojas",
			value: `${shops.length}`,
			sub: "gerir vitrines",
			icon: Store,
			tint: "from-amber-500/20 to-amber-500/5",
			ic: "bg-amber-500",
			trend: trend.map((v) => v * .5)
		}
	];
	const quick = [
		{
			to: "/admin/produtos",
			label: "Adicionar produto",
			desc: "Publique um novo item",
			icon: Plus,
			color: "bg-emerald-500"
		},
		{
			to: "/admin/home",
			label: "Novo banner",
			desc: "Destaque na home",
			icon: Image,
			color: "bg-amber-500"
		},
		{
			to: "/admin/logistica",
			label: "Fretes",
			desc: `${carriers.filter((c) => c.active).length} opções ativas`,
			icon: Truck,
			color: "bg-blue-600"
		},
		{
			to: "/admin/pedidos",
			label: "Ver pedidos",
			desc: `${pending} aguardando`,
			icon: ClipboardList,
			color: "bg-blue-500"
		}
	];
	const statusColor = {
		unpaid: "bg-red-100 text-red-700",
		processing: "bg-amber-100 text-amber-700",
		shipped: "bg-blue-100 text-blue-700",
		review: "bg-purple-100 text-purple-700",
		returns: "bg-gray-200 text-gray-700"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-black tracking-tight",
					children: "Bem-vindo(a) 👋"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Gerencie tudo da sua loja Bazarixy num só lugar."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						"Hoje ·",
						" ",
						(/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
							weekday: "long",
							day: "numeric",
							month: "long"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: s.to,
					className: `group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${s.tint} p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-foreground hover:shadow-xl`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid h-10 w-10 place-items-center rounded-xl text-white shadow-lg ${s.ic}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground transition group-hover:text-foreground" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-[11px] uppercase tracking-wide text-muted-foreground font-bold",
							children: s.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xl font-black",
							children: s.value
						}),
						s.sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: s.sub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-foreground/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, { values: s.trend })
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/receita",
				className: "block rounded-2xl bg-background p-5 shadow-[var(--shadow-card)] transition hover:shadow-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-black",
							children: "Divisão da receita"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Bazarixy retém ",
								Math.round(PLATFORM_FEE * 100),
								"% de cada venda e de cada frete."
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-muted-foreground",
							children: "Ver relatório completo ›"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex h-3 overflow-hidden rounded-full bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-gradient-to-r from-orange-500 to-pink-500",
							style: { width: `${PLATFORM_FEE * 100}%` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 bg-emerald-500" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-muted/40 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold uppercase text-muted-foreground",
									children: "Bruto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg font-black",
									children: formatKz(rev.gross)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-muted/40 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold uppercase text-muted-foreground",
									children: "Bazarixy 5%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg font-black text-sale",
									children: formatKz(rev.platform)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-muted/40 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold uppercase text-muted-foreground",
									children: "Lojas 95%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg font-black text-emerald-600",
									children: formatKz(rev.shop)
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-lg font-black",
				children: "Ações rápidas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: quick.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: q.to,
					className: "group flex items-center gap-3 rounded-2xl border border-border bg-background p-4 transition hover:border-foreground hover:shadow-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white ${q.color}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(q.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-black",
								children: q.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: q.desc
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-auto h-4 w-4 text-muted-foreground transition group-hover:text-foreground" })
					]
				}, q.to))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)] lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-black",
							children: "Pedidos recentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/pedidos",
							className: "text-xs font-bold text-muted-foreground hover:text-foreground",
							children: "Ver todos ›"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border",
						children: [orders.slice(0, 6).map((o) => {
							const first = o.items[0] ? getAnyProduct(o.items[0].productId) : void 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 py-3 text-sm",
								children: [
									first?.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: first.image,
										alt: "",
										className: "h-10 w-10 rounded-lg object-cover ring-1 ring-border"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 rounded-lg bg-muted" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-sm font-bold",
											children: ["#", o.id]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted-foreground",
											children: [
												o.createdAt,
												" · ",
												o.customer ?? "cliente"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `hidden sm:inline rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColor[o.status]}`,
										children: o.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-black text-sale",
										children: formatKz(o.total)
									})
								]
							}, o.id);
						}), orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-center text-xs text-muted-foreground",
							children: "Nenhum pedido ainda."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-display text-lg font-black",
						children: "Conteúdo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-xl bg-muted/40 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-4 w-4" }), " Banners ativos"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-black",
									children: slides.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-xl bg-muted/40 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderTree, { className: "h-4 w-4" }), " Categorias"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-black",
									children: cats.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-xl bg-muted/40 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4" }), " Lojas ativas"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-black",
									children: shops.length
								})]
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
