import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useCustomProducts } from "./products-store-DJ_irs6P.mjs";
import { A as trackSearch, P as useStore } from "./router-DwDo_gV9.mjs";
import { S as useRouter, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Gt as Camera, Mt as Clock, k as Search, l as Trophy, n as X, x as SlidersHorizontal, xt as Flame, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as useCategories } from "./categories-store-C4Vdw11E.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { a as SmartImage, t as Layout } from "./Layout-C99PxP4o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-xuUx2HDy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var discovery = [
	"acessórios",
	"vestidos de verão",
	"vestidos para mulheres",
	"biquíni",
	"trajes de banho",
	"sapatos",
	"roupa esportiva feminina",
	"moletons"
];
var RECENT_KEY = "search_recent_v1";
function SearchPage() {
	const router = useRouter();
	const customs = useCustomProducts();
	const cats = useCategories();
	const { user } = useStore();
	const all = (0, import_react.useMemo)(() => [...customs], [customs]);
	const [q, setQ] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("relevance");
	const [cat, setCat] = (0, import_react.useState)(null);
	const [recent, setRecent] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		try {
			setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"));
		} catch {}
	}, []);
	const remember = (term) => {
		const t = term.trim();
		if (!t) return;
		const next = [t, ...recent.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, 8);
		setRecent(next);
		try {
			localStorage.setItem(RECENT_KEY, JSON.stringify(next));
		} catch {}
		trackSearch(user?.uid ?? null, t, results.length);
	};
	const results = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		if (!term && !cat) return [];
		let list = all.filter((p) => (!term || p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)) && (!cat || p.category === cat));
		if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
		if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
		if (sort === "sold") list = [...list].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0));
		return list;
	}, [
		q,
		cat,
		sort,
		all
	]);
	const searching = !!q.trim() || !!cat;
	const hotList = (0, import_react.useMemo)(() => [...all].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0)).slice(0, 12), [all]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		hideHeader: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto md:max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-2 py-2 md:px-0 md:py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => router.history.back(),
						className: "shrink-0 p-2 md:hidden",
						"aria-label": "Voltar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							remember(q);
						},
						className: "flex min-w-0 flex-1 items-center gap-1 rounded-none border border-brand-strong/40 bg-brand/20 pl-4 pr-1 py-1 transition focus-within:border-brand-strong focus-within:bg-background md:py-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground md:hidden" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Pesquisar produtos, marcas e categorias",
								className: "min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground md:text-base"
							}),
							q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setQ(""),
								className: "shrink-0 p-1.5 text-muted-foreground",
								"aria-label": "Limpar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "shrink-0 p-1.5 text-muted-foreground",
								"aria-label": "Buscar por foto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "grid h-9 w-12 shrink-0 place-items-center rounded-none bg-brand-strong text-white",
								"aria-label": "Buscar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "no-scrollbar overflow-x-auto pb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 px-3 md:px-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: !cat,
							onClick: () => setCat(null),
							children: "Tudo"
						}), cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: cat === c.slug,
							onClick: () => setCat(cat === c.slug ? null : c.slug),
							children: c.name
						}, c.slug))]
					})
				})]
			}), searching ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-3 py-3 md:px-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-foreground",
									children: results.length
								}),
								" resultado(s)",
								q ? ` para “${q}”` : ""
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-1.5 rounded-none border border-border px-3 py-1.5 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sort,
								onChange: (e) => setSort(e.target.value),
								className: "bg-transparent outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "relevance",
										children: "Relevância"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "sold",
										children: "Mais vendidos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "price-asc",
										children: "Menor preço"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "price-desc",
										children: "Maior preço"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5",
						children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/product/$id",
							params: { id: p.id },
							className: "group overflow-hidden rounded-none bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-square overflow-hidden bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
									src: p.image,
									alt: p.name,
									wrapperClassName: "absolute inset-0 h-full w-full",
									className: "object-cover transition duration-500 group-hover:scale-105"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "line-clamp-2 text-xs leading-tight",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm font-black text-sale",
									children: formatKz(p.price)
								})]
							})]
						}, p.id))
					}),
					results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: "Nenhum produto encontrado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Tente outra palavra ou explore as categorias abaixo."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap justify-center gap-2",
								children: discovery.slice(0, 5).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setQ(t);
										setCat(null);
									},
									className: "rounded-none border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted",
									children: t
								}, t))
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 px-4 py-4 md:grid-cols-[1fr_320px] md:px-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8",
					children: [
						recent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-1.5 text-lg font-black",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-muted-foreground" }), " Buscas recentes"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setRecent([]);
									localStorage.removeItem(RECENT_KEY);
								},
								className: "text-xs font-bold text-muted-foreground hover:text-foreground",
								children: "Limpar"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: recent.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQ(t),
								className: "rounded-none bg-muted px-3.5 py-2 text-sm hover:bg-muted/70",
								children: t
							}, t))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-1.5 text-lg font-black",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4 text-sale" }), " Descobrir buscas"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: discovery.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setQ(t);
									remember(t);
								},
								className: "rounded-none border border-border px-3.5 py-2 text-sm transition hover:border-transparent hover:bg-foreground hover:text-background",
								children: t
							}, t))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-black",
								children: "Bazarixy Hot List"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-3 gap-2.5 md:grid-cols-6",
							children: hotList.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/product/$id",
								params: { id: p.id },
								className: "group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-square overflow-hidden rounded-none bg-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
										src: p.image,
										alt: p.name,
										wrapperClassName: "absolute inset-0 h-full w-full",
										className: "object-cover transition duration-500 group-hover:scale-105"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-none px-2 py-0.5 text-[10px] font-black text-white",
										style: { background: "#111111" },
										children: ["TOP ", i + 1]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 line-clamp-2 text-[11px] leading-tight",
									children: p.name
								})]
							}, p.id))
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-black",
						children: "Todas as categorias"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-3 md:grid-cols-2",
						children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/category/$slug",
							params: { slug: c.slug },
							className: "group overflow-hidden rounded-none bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex aspect-square items-center justify-center bg-muted",
								children: c.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
									src: c.image,
									alt: c.name,
									wrapperClassName: "absolute inset-0 h-full w-full",
									className: "object-cover transition duration-500 group-hover:scale-105"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-4xl",
									children: c.emoji
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 text-center text-xs font-semibold",
								children: c.name
							})]
						}, c.slug))
					})]
				})]
			})]
		})
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: `whitespace-nowrap rounded-none px-3.5 py-1.5 text-xs font-bold transition ${active ? "text-white" : "border border-border text-foreground hover:bg-muted"}`,
		style: active ? { background: "#111111" } : void 0,
		children
	});
}
//#endregion
export { SearchPage as component };
