import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useNotifications, n as notificationActions } from "./notifications-store-B_Op6deg.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { H as Package, Ht as CheckCheck, m as Ticket, ot as Info, p as Trash2, qt as BellOff, u as Truck, y as Sparkles } from "../_libs/lucide-react.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Layout } from "./Layout-CibOMXZA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-Kl9cFhME.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var META = {
	order: {
		icon: Package,
		tint: "bg-blue-500/12 text-blue-600",
		label: "Pedido"
	},
	delivery: {
		icon: Truck,
		tint: "bg-emerald-500/12 text-emerald-600",
		label: "Entrega"
	},
	coupon: {
		icon: Ticket,
		tint: "bg-pink-500/12 text-pink-600",
		label: "Cupão"
	},
	product: {
		icon: Sparkles,
		tint: "bg-gold/15 text-gold",
		label: "Novidade"
	},
	system: {
		icon: Info,
		tint: "bg-muted text-muted-foreground",
		label: "Sistema"
	}
};
function Card({ n }) {
	const meta = META[n.kind] ?? META.system;
	const Icon = meta.icon;
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `group relative flex gap-3 rounded-2xl border p-3.5 transition-shadow ${n.read ? "border-border bg-card" : "border-gold/40 bg-gold/[0.06] shadow-[var(--shadow-card)]"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `grid h-11 w-11 shrink-0 place-items-center rounded-xl ${meta.tint}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground",
								children: meta.label
							}),
							!n.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto shrink-0 text-[10px] text-muted-foreground",
								children: n.createdAt
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 line-clamp-2 text-sm font-bold leading-snug",
						children: n.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground",
						children: n.body
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: (e) => {
					e.preventDefault();
					e.stopPropagation();
					notificationActions.remove(n.id);
				},
				"aria-label": "Remover notificação",
				className: "absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full text-muted-foreground opacity-60 hover:bg-destructive/10 hover:text-destructive hover:opacity-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
			})
		]
	});
	if (!n.href) return body;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: n.href,
		onClick: () => notificationActions.markRead(n.id),
		className: "block",
		children: body
	});
}
function NotificationsPage() {
	const items = useNotifications();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const unread = items.filter((n) => !n.read).length;
	const filters = (0, import_react.useMemo)(() => {
		const kinds = Array.from(new Set(items.map((n) => n.kind)));
		return [
			{
				key: "all",
				label: `Todas${items.length ? ` (${items.length})` : ""}`
			},
			{
				key: "unread",
				label: `Não lidas${unread ? ` (${unread})` : ""}`
			},
			...kinds.map((k) => ({
				key: k,
				label: META[k]?.label ?? k
			}))
		];
	}, [items, unread]);
	const list = items.filter((n) => filter === "all" ? true : filter === "unread" ? !n.read : n.kind === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		simpleHeader: true,
		showBack: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-3 pb-16 pt-3 md:pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-black",
						children: unread > 0 ? `${unread} nova${unread > 1 ? "s" : ""} notificação${unread > 1 ? "ões" : ""}` : "Tudo em dia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex flex-wrap gap-2",
						children: [items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => notificationActions.markAllRead(),
							className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-3.5 w-3.5" }), " Marcar tudo como lido"]
						}), items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => notificationActions.clear(),
							className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Limpar"]
						})]
					})]
				}),
				items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-3 mt-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: filters.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(f.key),
						className: `shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${filter === f.key ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground"}`,
						children: f.label
					}, f.key))
				}),
				list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellOff, {
							className: "h-14 w-14 text-muted-foreground",
							strokeWidth: 1.2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-display text-lg font-black",
							children: "Sem notificações"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-xs text-sm text-muted-foreground",
							children: "Avisamos aqui sobre pedidos, entregas, cupões e novidades das lojas."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "mt-6 rounded-full bg-foreground px-8 py-2.5 text-sm font-bold text-background",
							children: "Explorar produtos"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2.5",
					children: list.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { n }, n.id))
				})
			]
		})
	});
}
//#endregion
export { NotificationsPage as component };
