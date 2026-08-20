import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { l as useOrders } from "./orders-store-DKOT02yr.mjs";
import { t as getAnyProduct } from "./products-store-DJ_irs6P.mjs";
import { r as useShops } from "./shops-store-CX-UvhEW.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Dt as Download, Ht as ChartPie, P as Receipt, Zt as ArrowLeft, _ as Store, f as TrendingUp, r as Wallet } from "../_libs/lucide-react.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { n as PLATFORM_FEE } from "./logistics-store-CyhBKYKg.mjs";
import { n as revenueSummary, r as splitSale, t as revenueByMonth } from "./revenue-B6r5opPy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.receita-BPN-uoFh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Bar({ value, max }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 w-full overflow-hidden rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500",
			style: { width: `${max ? value / max * 100 : 0}%` }
		})
	});
}
function RevenuePage() {
	const orders = useOrders();
	const shops = useShops();
	const sum = (0, import_react.useMemo)(() => revenueSummary(orders), [orders]);
	const months = (0, import_react.useMemo)(() => revenueByMonth(orders), [orders]);
	const maxMonth = Math.max(...months.map((m) => m.value), 1);
	const byShop = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const o of orders) for (const it of o.items) {
			const p = getAnyProduct(it.productId);
			const sid = p?.shopId ?? "main";
			map.set(sid, (map.get(sid) ?? 0) + (it.unitPrice ?? p?.price ?? 0) * it.qty);
		}
		return Array.from(map, ([id, gross]) => ({
			id,
			name: shops.find((s) => s.id === id)?.name ?? "Bazarixy Oficial",
			...splitSale(gross)
		})).sort((a, b) => b.gross - a.gross);
	}, [orders, shops]);
	const exportCsv = () => {
		const csv = [[
			"Pedido",
			"Data",
			"Estado",
			"Total",
			"Bazarixy 5%",
			"Loja 95%"
		], ...orders.map((o) => {
			const s = splitSale(o.total);
			return [
				o.id,
				o.createdAt,
				o.status,
				o.total.toFixed(2),
				s.platform.toFixed(2),
				s.shop.toFixed(2)
			];
		})].map((r) => r.join(";")).join("\n");
		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = "receita-bazarixy.csv";
		a.click();
		URL.revokeObjectURL(url);
	};
	const cards = [
		{
			label: "Receita bruta",
			value: formatKz(sum.gross),
			sub: `${sum.orders} pedido(s) pagos`,
			icon: TrendingUp,
			tint: "from-emerald-500/15 to-emerald-500/0",
			ic: "bg-emerald-500"
		},
		{
			label: `Bazarixy (${Math.round(PLATFORM_FEE * 100)}%)`,
			value: formatKz(sum.platform),
			sub: "comissão da plataforma",
			icon: ChartPie,
			tint: "from-orange-500/15 to-pink-500/0",
			ic: "bg-gradient-to-br from-orange-500 to-pink-500"
		},
		{
			label: "Repasse às lojas",
			value: formatKz(sum.shop),
			sub: "95% das vendas",
			icon: Store,
			tint: "from-blue-500/15 to-blue-500/0",
			ic: "bg-blue-500"
		},
		{
			label: "A receber",
			value: formatKz(sum.pending),
			sub: "pedidos ainda não pagos",
			icon: Wallet,
			tint: "from-amber-500/15 to-amber-500/0",
			ic: "bg-amber-500"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						className: "mb-1 inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Dashboard"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-black tracking-tight",
						children: "Receita total"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"A Bazarixy retém ",
							Math.round(PLATFORM_FEE * 100),
							"% de cada venda e de cada frete — o restante é repassado à loja."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: exportCsv,
					className: "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Exportar CSV"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-2xl border border-border bg-gradient-to-br ${c.tint} p-4 shadow-[var(--shadow-card)]`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-10 w-10 place-items-center rounded-xl text-white shadow-lg ${c.ic}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-[11px] font-bold uppercase tracking-wide text-muted-foreground",
							children: c.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xl font-black",
							children: c.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: c.sub
						})
					]
				}, c.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)] lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-black",
							children: "Evolução mensal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [months.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: m.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											formatKz(m.value),
											" · Bazarixy",
											" ",
											formatKz(m.value * PLATFORM_FEE)
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									value: m.value,
									max: maxMonth
								})]
							}, m.label)), months.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-6 text-center text-xs text-muted-foreground",
								children: "Sem receita registrada."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-xl bg-muted/40 p-4 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-black",
								children: "Como é calculado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-1.5 space-y-1 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Receita bruta = soma dos pedidos pagos (processando, enviado, avaliar)." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"Comissão Bazarixy = receita bruta ×",
										" ",
										Math.round(PLATFORM_FEE * 100),
										"%."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Repasse à loja = receita bruta − comissão." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"Devoluções (",
										formatKz(sum.refunded),
										") não entram no cálculo."
									] })
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-black",
							children: "Por loja"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-3",
							children: [byShop.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold",
										children: s.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex justify-between text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bruto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: formatKz(s.gross)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bazarixy 5%" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatKz(s.platform) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Repasse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-sale",
											children: formatKz(s.shop)
										})]
									})
								]
							}, s.id)), byShop.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Sem dados."
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-3 font-display text-lg font-black",
								children: "Indicadores"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-xl bg-muted/40 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }), " Ticket médio"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black",
											children: formatKz(sum.avgTicket)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-xl bg-muted/40 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pedidos pagos" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black",
											children: sum.orders
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-xl bg-muted/40 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Devoluções" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black",
											children: formatKz(sum.refunded)
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/logistica",
								className: "mt-3 block rounded-xl border border-border p-3 text-center text-xs font-bold hover:bg-muted",
								children: "Gerir fretes e transportadoras ›"
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { RevenuePage as component };
