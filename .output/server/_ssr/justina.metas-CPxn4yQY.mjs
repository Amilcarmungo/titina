import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as attachSync } from "./sync-store-BDWU_rBs.mjs";
import { i as useAllProducts } from "./products-store-DBaquvrN.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { R as Plus, h as Target, n as X, p as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { useOrders } from "./orders-store-DPNmKvMS.mjs";
import { n as revenueSummary } from "./revenue-20Z1bVAT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.metas-CPxn4yQY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Metas do negócio (admin) — guardadas em `siteData/goals` e sincronizadas
* entre a equipa. Cada meta tem um alvo e é medida contra os pedidos reais.
*/
var METRIC_LABEL = {
	revenue: "Receita (Kz)",
	orders: "Pedidos",
	products: "Produtos publicados",
	customers: "Clientes"
};
var KEY = "shop_goals_v1";
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) || "");
		return Array.isArray(raw) ? raw : [];
	} catch {
		return [];
	}
}
var list = read();
var empty = [];
var listeners = /* @__PURE__ */ new Set();
function cache() {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(list));
}
function emit() {
	cache();
	listeners.forEach((l) => l());
	sync.push();
}
var sync = attachSync("goals", () => list, (value) => {
	if (!Array.isArray(value)) return;
	list = value;
	cache();
	listeners.forEach((l) => l());
});
function useGoals() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => list, () => empty);
}
var goalActions = {
	add(g) {
		const goal = {
			...g,
			id: `goal-${Date.now()}`,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		list = [goal, ...list];
		emit();
		return goal.id;
	},
	update(id, patch) {
		list = list.map((g) => g.id === id ? {
			...g,
			...patch
		} : g);
		emit();
	},
	remove(id) {
		list = list.filter((g) => g.id !== id);
		emit();
	}
};
function currentPeriod() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function GoalsPage() {
	const goals = useGoals();
	const orders = useOrders();
	const products = useAllProducts();
	const [open, setOpen] = (0, import_react.useState)(false);
	const progress = (0, import_react.useMemo)(() => {
		const rev = revenueSummary(orders);
		const customers = new Set(orders.map((o) => o.uid ?? o.id)).size;
		return (g) => {
			const value = g.metric === "revenue" ? rev.gross : g.metric === "orders" ? orders.length : g.metric === "products" ? products.length : customers;
			return {
				value,
				pct: g.target > 0 ? Math.min(100, Math.round(value / g.target * 100)) : 0
			};
		};
	}, [orders, products]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-11 w-11 place-items-center rounded-2xl bg-foreground text-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-black",
							children: "Metas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Defina objectivos de receita, pedidos, produtos e clientes."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen(true),
						className: "ml-auto inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-bold text-background",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Nova meta"]
					})
				]
			}),
			goals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed border-border p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
						className: "mx-auto h-12 w-12 text-muted-foreground",
						strokeWidth: 1.2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-lg font-black",
						children: "Nenhuma meta definida"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Crie a primeira meta para acompanhar o crescimento da Bazarixy."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: goals.map((g) => {
					const { value, pct } = progress(g);
					const fmt = (n) => g.metric === "revenue" ? formatKz(n) : n.toLocaleString("pt-BR");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-base font-black",
										children: g.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground",
										children: [
											METRIC_LABEL[g.metric],
											" · ",
											g.period
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										goalActions.remove(g.id);
										toast.success("Meta removida");
									},
									"aria-label": "Remover meta",
									className: "rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-end justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl font-black",
									children: fmt(value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: ["de ", fmt(g.target)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-2.5 overflow-hidden rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-full rounded-full ${pct >= 100 ? "bg-emerald-500" : "bg-gold"}`,
									style: { width: `${pct}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1.5 text-[11px] font-bold text-muted-foreground",
								children: [pct, "% concluído"]
							}),
							g.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: g.note
							})
						]
					}, g.id);
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalModal, { onClose: () => setOpen(false) })
		]
	});
}
function GoalModal({ onClose }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [metric, setMetric] = (0, import_react.useState)("revenue");
	const [target, setTarget] = (0, import_react.useState)("");
	const [period, setPeriod] = (0, import_react.useState)(currentPeriod());
	const [note, setNote] = (0, import_react.useState)("");
	const save = () => {
		const value = Number(target.replace(/\D/g, ""));
		if (!title.trim()) {
			toast.error("Dê um nome à meta");
			return;
		}
		if (!value) {
			toast.error("Defina o valor alvo");
			return;
		}
		goalActions.add({
			title: title.trim(),
			metric,
			target: value,
			period,
			note: note.trim() || void 0
		});
		toast.success("Meta criada");
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-[2px] md:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-t-3xl bg-background p-5 pb-7 shadow-2xl md:rounded-3xl md:pb-5",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-black",
						children: "Nova meta"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						"aria-label": "Fechar",
						className: "rounded-full p-1.5 hover:bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-xs font-semibold text-muted-foreground",
					children: "Nome"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "Ex.: Receita de Agosto",
					className: "mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-gold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-xs font-semibold text-muted-foreground",
					children: "Indicador"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: metric,
					onChange: (e) => setMetric(e.target.value),
					className: "mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-gold",
					children: Object.entries(METRIC_LABEL).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: k,
						children: v
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-semibold text-muted-foreground",
						children: "Valor alvo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: target,
						onChange: (e) => setTarget(e.target.value.replace(/\D/g, "")),
						inputMode: "numeric",
						className: "mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-gold"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-semibold text-muted-foreground",
						children: "Período"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: period,
						onChange: (e) => setPeriod(e.target.value),
						placeholder: "2026-08",
						className: "mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-gold"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-xs font-semibold text-muted-foreground",
					children: "Nota (opcional)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note,
					onChange: (e) => setNote(e.target.value),
					rows: 2,
					className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					className: "mt-4 h-12 w-full rounded-xl bg-foreground text-sm font-black text-background",
					children: "Guardar meta"
				})
			]
		})
	});
}
//#endregion
export { GoalsPage as component };
