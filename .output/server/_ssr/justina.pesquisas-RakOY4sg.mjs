import { r as __toESM } from "../_runtime.mjs";
import { a as getDb } from "./client-ColUhoxC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { o as useStaff } from "./roles-DIBzW3mP.mjs";
import { L as getDocs, Lt as collection } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { a as useCustomProducts } from "./products-store-DBaquvrN.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Search, It as CircleX, Kt as ChartColumn, b as Sparkles, i as Users } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.pesquisas-RakOY4sg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchesPage() {
	const { staff } = useStaff();
	const products = useCustomProducts();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [state, setState] = (0, import_react.useState)("loading");
	const [filter, setFilter] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let active = true;
		const load = async () => {
			const db = getDb();
			if (!db || !staff) {
				setState("error");
				return;
			}
			try {
				const users = await getDocs(collection(db, "users"));
				const perTerm = /* @__PURE__ */ new Map();
				await Promise.all(users.docs.map(async (user) => {
					(await getDocs(collection(db, "users", user.id, "searches"))).docs.forEach((entry) => {
						const data = entry.data();
						const normalized = (data.normalized ?? data.term ?? entry.id).trim().toLowerCase();
						if (!normalized) return;
						const current = perTerm.get(normalized);
						const count = Math.max(1, data.searchCount ?? 1);
						if (current) {
							current.searchCount += count;
							current.users += 1;
							if ((data.resultCount ?? 0) < (current.resultCount ?? 0)) current.resultCount = data.resultCount ?? null;
						} else perTerm.set(normalized, {
							term: data.term ?? normalized,
							normalized,
							searchCount: count,
							users: 1,
							resultCount: data.resultCount ?? null,
							lastSearchedAt: data.lastSearchedAt
						});
					});
				}));
				if (!active) return;
				setRows([...perTerm.values()].sort((a, b) => b.searchCount - a.searchCount));
				setState("ready");
			} catch {
				if (active) setState("error");
			}
		};
		load();
		return () => {
			active = false;
		};
	}, [staff]);
	const filtered = (0, import_react.useMemo)(() => {
		const term = filter.trim().toLowerCase();
		return term ? rows.filter((row) => row.term.toLowerCase().includes(term)) : rows;
	}, [filter, rows]);
	const noResults = filtered.filter((row) => row.resultCount === 0);
	const totalSearches = rows.reduce((sum, row) => sum + row.searchCount, 0);
	const productsText = products.map((product) => `${product.name} ${product.category}`.toLowerCase()).join(" ");
	const opportunities = noResults.filter((row) => !productsText.includes(row.normalized));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-12 w-12 place-items-center rounded-2xl bg-brand-strong text-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-black",
						children: "Pesquisas dos clientes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-muted-foreground",
						children: "Descubra o que as pessoas procuram para decidir que produtos, categorias ou stock criar a seguir."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "w-full sm:w-72 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: filter,
						onChange: (event) => setFilter(event.target.value),
						placeholder: "Filtrar termos",
						className: "min-w-0 flex-1 bg-transparent text-sm outline-none"
					})]
				})]
			}),
			state === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					0,
					1,
					2
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-2xl bg-muted" }, item))
			}),
			state === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground",
				children: "Não foi possível carregar as pesquisas. Verifique a ligação ao banco e as permissões da equipa."
			}),
			state === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" }),
							label: "Pesquisas registadas",
							value: totalSearches,
							color: "brand"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
							label: "Termos diferentes",
							value: rows.length,
							color: "purple"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }),
							label: "Sem resultados",
							value: noResults.length,
							color: "sale"
						})
					]
				}),
				opportunities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-brand/40 bg-brand/10 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-brand-strong" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-bold text-lg",
								children: "Oportunidades de produto"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Estes termos têm procura, mas não parecem existir no catálogo atual. Considere adicionar estes produtos."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: opportunities.slice(0, 15).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-background px-3.5 py-2 text-sm font-semibold text-foreground border border-brand/20 hover:border-brand-strong transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5" }),
									row.term,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											"(",
											row.searchCount,
											")"
										]
									})
								]
							}, row.normalized))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "overflow-hidden rounded-2xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border px-6 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-lg",
							children: "Termos mais procurados"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"Dados agregados sobre as pesquisas realizadas. ",
								filtered.length,
								" termo(s) encontrado(s)."
							]
						})]
					}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-8 text-center text-sm text-muted-foreground",
						children: "Ainda não há pesquisas suficientes."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: filtered.slice(0, 100).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 px-6 py-4 sm:grid-cols-[3rem_1fr_auto_auto] sm:items-center hover:bg-muted/50 transition",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-black text-muted-foreground bg-muted/50 rounded-lg py-2 px-3 text-center w-fit",
									children: ["#", index + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: row.term
								}), row.resultCount === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 inline-flex items-center gap-1 rounded-full bg-sale/15 px-2 py-0.5 text-xs font-bold text-sale",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }), " Sem resultados"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [row.users, " cliente(s)"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-bold text-foreground",
										children: [row.searchCount, " busca(s)"]
									})
								})
							]
						}, row.normalized))
					})]
				})
			] })
		]
	});
}
function Metric({ icon, label, value, color = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-2xl border p-5 ${{
			default: "border-border bg-card text-foreground",
			brand: "border-brand/40 bg-brand/10 text-brand-strong",
			purple: "border-purple-40 bg-purple/10 text-purple-600",
			sale: "border-sale/40 bg-sale/10 text-sale"
		}[color]}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: color === "default" ? "text-muted-foreground" : "",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-semibold",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-3xl font-black",
			children: value.toLocaleString("pt-BR")
		})]
	});
}
//#endregion
export { SearchesPage as component };
