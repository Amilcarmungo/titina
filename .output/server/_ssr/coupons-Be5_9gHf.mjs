import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { Bt as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as Layout } from "./Layout-COZ4pjzI.mjs";
import { n as useCoupons } from "./coupons-store-0vi0k8j5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coupons-Be5_9gHf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"não utilizado",
	"Usados",
	"Expirado"
];
var FILTERS = [
	"Todos",
	"Expirando em breve",
	"Novo",
	"Envio"
];
function parseExpiry(s) {
	if (!s) return null;
	const [d, m, y] = s.split("/").map(Number);
	if (!d || !m || !y) return null;
	return new Date(y, m - 1, d, 23, 59, 59);
}
function CouponCard({ c, dim }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const exp = parseExpiry(c.expires);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `relative flex flex-col overflow-hidden bg-[#fdf1ec] sm:flex-row ${dim ? "opacity-60 grayscale" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-0 top-0 z-10 bg-brand px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-brand-foreground",
				children: "Novo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-background sm:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-background sm:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 flex-col items-center justify-center border-b border-dashed border-sale/40 px-3 pb-4 pt-7 sm:w-36 sm:border-b-0 sm:border-r sm:py-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-3xl font-black leading-none text-sale sm:text-4xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "break-all",
						children: c.type === "percent" ? c.value : formatKz(c.value)
					}), c.type === "percent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "align-super text-base",
						children: "%OFF"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-center text-[11px] text-muted-foreground",
					children: c.minOrder > 0 ? `Pedidos ${formatKz(c.minOrder)}+` : "Sem mínimo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-base font-black leading-tight sm:text-lg",
									children: "Cupão para todo o site"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Código "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "break-all font-mono font-black text-sale",
										children: c.code
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 line-clamp-2 text-xs text-muted-foreground",
									children: c.description || "Para produtos seleccionados"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								navigator.clipboard?.writeText(c.code);
								toast.success("Código copiado");
							},
							className: "shrink-0 bg-brand px-4 py-2 text-xs font-black text-brand-foreground sm:px-5",
							children: "Compre"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen((v) => !v),
						className: "mt-3 flex items-center gap-1 text-left text-[11px] text-muted-foreground",
						children: [exp ? `Expira em ${c.expires}` : "Sem data de expiração", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-3.5 w-3.5 shrink-0 transition ${open ? "rotate-180" : ""}` })]
					}),
					open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 space-y-1 text-[11px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Aplicável no checkout em «Cupom de desconto»." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"·",
								" ",
								c.type === "percent" ? `Desconto de ${c.value}% sobre o subtotal.` : `Desconto de ${formatKz(c.value)} sobre o subtotal.`
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"·",
								" ",
								c.minOrder > 0 ? `Válido em pedidos a partir de ${formatKz(c.minOrder)}.` : "Sem valor mínimo de pedido."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Não acumulável com outros cupões." })
						]
					})
				]
			})
		]
	});
}
function CouponsPage() {
	const all = useCoupons();
	const [tab, setTab] = (0, import_react.useState)(TABS[0]);
	const [filter, setFilter] = (0, import_react.useState)(FILTERS[0]);
	const now = Date.now();
	const { available, expired } = (0, import_react.useMemo)(() => {
		const av = [];
		const ex = [];
		all.forEach((c) => {
			const d = parseExpiry(c.expires);
			if (!c.active || d && d.getTime() < now) ex.push(c);
			else av.push(c);
		});
		return {
			available: av,
			expired: ex
		};
	}, [all, now]);
	const list = (tab === "Expirado" ? expired : tab === "Usados" ? [] : available).filter((c) => {
		if (filter === "Expirando em breve") {
			const d = parseExpiry(c.expires);
			return !!d && d.getTime() - now < 6048e5;
		}
		if (filter === "Envio") return c.type === "fixed";
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		hideHeader: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-3xl items-center gap-2 px-2 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => window.history.back(),
						"aria-label": "Voltar",
						className: "grid h-9 w-9 place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl leading-none",
							children: "‹"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 items-center justify-center gap-7",
						children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setTab(t),
							className: `relative pb-1 text-sm font-bold ${tab === t ? "text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-foreground" : "text-muted-foreground"}`,
							children: t
						}, t))
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-3 pb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-scrollbar flex gap-2 overflow-x-auto py-3",
						children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilter(f),
							className: `whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-bold transition ${filter === f ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:bg-muted"}`,
							children: f
						}, f))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-black",
						children: "Meus Cupões"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 lg:grid-cols-2",
						children: [list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponCard, {
							c,
							dim: tab === "Expirado"
						}, c.code)), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-dashed border-border py-16 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: "Nenhum cupão aqui"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: tab === "Usados" ? "Os cupões que usar aparecem nesta lista." : "Volte em breve para novas promoções."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mt-6 inline-block bg-brand px-6 py-2.5 text-sm font-bold text-brand-foreground",
						children: "Continuar a comprar"
					})
				]
			})]
		})
	});
}
//#endregion
export { CouponsPage as component };
