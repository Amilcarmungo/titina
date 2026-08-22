import { r as __toESM } from "../_runtime.mjs";
import "../_libs/firebase.mjs";
import { p as collection, r as getDocs } from "../_libs/@firebase/firestore+[...].mjs";
import { n as getDb } from "./client-C80F8PZn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useStaff } from "./roles-BxfhjeTv.mjs";
import { a as useCustomProducts } from "./products-store-TDcUsz9F.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Pt as CircleX, Wt as ChartColumn, i as Users, k as Search, y as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.pesquisas-BcctIy2B.js
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
				className: "flex flex-wrap items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-11 w-11 place-items-center rounded-2xl bg-foreground text-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-black",
						children: "Pesquisas dos clientes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-muted-foreground",
						children: "Descubra o que as pessoas procuram para decidir que produtos, categorias ou stock criar a seguir."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ml-auto flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: filter,
							onChange: (event) => setFilter(event.target.value),
							placeholder: "Filtrar termos",
							className: "min-w-0 flex-1 bg-transparent text-sm outline-none"
						})]
					})
				]
			}),
			state === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					0,
					1,
					2
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-2xl bg-muted" }, item))
			}),
			state === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground",
				children: "Não foi possível carregar as pesquisas. Verifique a ligação ao banco e as permissões da equipa."
			}),
			state === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }),
							label: "Pesquisas registadas",
							value: totalSearches
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
							label: "Termos diferentes",
							value: rows.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }),
							label: "Sem resultados",
							value: noResults.length
						})
					]
				}),
				opportunities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-brand/40 bg-brand/10 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-brand-strong" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-bold",
								children: "Oportunidades de produto"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Estes termos têm procura, mas não parecem existir no catálogo atual."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: opportunities.slice(0, 12).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-background px-3 py-1.5 text-xs font-bold",
								children: [
									row.term,
									" · ",
									row.searchCount,
									" pesquisas"
								]
							}, row.normalized))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "overflow-hidden rounded-2xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold",
							children: "Termos mais procurados"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Dados agregados, sem nomes ou emails dos clientes."
						})]
					}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-8 text-center text-sm text-muted-foreground",
						children: "Ainda não há pesquisas suficientes."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: filtered.slice(0, 100).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 px-5 py-3 sm:grid-cols-[2rem_1fr_auto_auto] sm:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-black text-muted-foreground",
									children: index + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: row.term
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [row.users, " cliente(s)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `text-xs font-bold ${row.resultCount === 0 ? "text-sale" : "text-foreground"}`,
									children: [
										row.searchCount,
										" pesquisa(s)",
										row.resultCount === 0 ? " · sem resultados" : ""
									]
								})
							]
						}, row.normalized))
					})]
				})
			] })
		]
	});
}
function Metric({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-muted-foreground",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-semibold",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-2xl font-black",
			children: value.toLocaleString("pt-BR")
		})]
	});
}
//#endregion
export { SearchesPage as component };
