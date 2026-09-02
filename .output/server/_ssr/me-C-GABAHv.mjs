import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Bt as ChevronRight, K as MessageSquare, N as Repeat2, O as Settings, Rt as CircleAlert, T as ShieldCheck, U as Package, bt as Gift, d as Truck, gt as Headphones, h as Ticket, jt as CreditCard, l as Undo2, mt as Heart, v as Store, w as ShoppingBag } from "../_libs/lucide-react.mjs";
import { n as SmartImage } from "./SmartImage-BH5TwHiu.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as actions, u as useStore } from "./router-C1fI1gmX.mjs";
import { t as Layout } from "./Layout-BFx64orT.mjs";
import { useOrders } from "./orders-store-DPNmKvMS.mjs";
import { n as useCoupons } from "./coupons-store-K_R4Qx57.mjs";
import { usePoints } from "./points-XcHjegxc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/me-C-GABAHv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MePage() {
	const [tab, setTab] = (0, import_react.useState)("wishlist");
	const { user } = useStore();
	const coupons = useCoupons().filter((c) => c.active);
	const orders = useOrders();
	const points = usePoints();
	const countOf = (status) => orders.filter((o) => o.status === status).length;
	/** Nome quando existe; senão o email sem o domínio. Foto quando existe; senão a inicial. */
	const displayName = user?.name?.trim() || (user?.email?.split("@")[0] ?? "");
	const initial = (displayName || user?.email || "?")[0]?.toUpperCase() ?? "?";
	const onSignInClick = (e) => {
		if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
			e.preventDefault();
			actions.openLogin();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		title: "Minha Conta",
		hideHeader: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:max-w-4xl md:mx-auto space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-gradient-to-br from-brand/20 via-brand/10 to-background rounded-2xl border border-brand/20 px-6 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [user ? user.photoURL ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src: user.photoURL,
							alt: displayName,
							rounded: "rounded-xl",
							wrapperClassName: "h-16 w-16 shrink-0 ring-2 ring-brand/60",
							className: "object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-brand-strong text-2xl font-black text-background",
							children: initial
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0",
							children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-3xl font-black",
									children: [
										"Bem-vindo, ",
										displayName,
										"!"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground mt-1",
									children: user.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex gap-2 flex-wrap",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-sm font-bold text-gold",
										children: [
											"⭐ ",
											points,
											" pontos"
										]
									})
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-3xl font-black",
									children: "Crie sua conta Bazarixy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground mt-1",
									children: "Aproveite benefícios exclusivos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/auth",
									onClick: onSignInClick,
									className: "mt-4 inline-flex items-center gap-2 rounded-full bg-brand-strong text-background font-bold px-6 py-2 hover:opacity-90 transition",
									children: ["Entrar ou Cadastrar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
								})
							] })
						})]
					}), user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/settings",
						className: "p-3 rounded-lg hover:bg-background/50 transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-6 w-6" })
					})]
				})
			}), user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground font-semibold",
								children: "Pedidos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black",
								children: orders.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground font-semibold",
								children: "Cupons"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black",
								children: coupons.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground font-semibold",
								children: "Pontos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-2xl font-black",
								children: points
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
					children: [
						{
							icon: ShoppingBag,
							label: "Meus Pedidos",
							to: "/orders"
						},
						{
							icon: Ticket,
							label: "Cupons",
							to: "/coupons",
							badge: coupons.length
						},
						{
							icon: Heart,
							label: "Favoritos",
							to: "/favorites"
						},
						{
							icon: Gift,
							label: "Convidar",
							to: "/points"
						}
					].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: q.to,
						className: "relative group rounded-xl border border-border bg-card p-4 hover:border-brand-strong hover:bg-brand/5 transition flex flex-col items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-10 w-10 place-items-center rounded-lg bg-muted group-hover:bg-brand/20 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(q.icon, {
									className: "h-5 w-5",
									strokeWidth: 1.5
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-center",
								children: q.label
							}),
							q.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-sale text-[10px] font-bold text-white",
								children: q.badge > 9 ? "9+" : q.badge
							}) : null
						]
					}, q.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-lg mb-4",
						children: "Status dos Pedidos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-5 gap-3",
						children: [
							{
								icon: CreditCard,
								label: "A pagar",
								status: "unpaid"
							},
							{
								icon: Package,
								label: "Processando",
								status: "processing"
							},
							{
								icon: Truck,
								label: "Enviado",
								status: "shipped"
							},
							{
								icon: MessageSquare,
								label: "Avaliar",
								status: "review"
							},
							{
								icon: Undo2,
								label: "Devoluções",
								status: "returns"
							}
						].map((s) => {
							const count = countOf(s.status);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/orders",
								search: { tab: s.status },
								className: "relative flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
										className: "h-6 w-6 text-muted-foreground",
										strokeWidth: 1.5
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-center",
										children: s.label
									}),
									count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-sale text-[10px] font-bold text-white",
										children: count > 9 ? "9+" : count
									})
								]
							}, s.status);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-lg mb-4",
						children: "Mais Serviços"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-5 gap-3",
						children: [
							{
								icon: Headphones,
								label: "Suporte",
								to: "/support"
							},
							{
								icon: Repeat2,
								label: "Trocas",
								to: "/orders",
								search: { tab: "returns" }
							},
							{
								icon: Store,
								label: "Lojas",
								to: "/"
							},
							{
								icon: ShieldCheck,
								label: "Política",
								to: "/termos"
							},
							{
								icon: CircleAlert,
								label: "Avisos",
								to: "/notifications"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: s.to,
							...s.search ? { search: s.search } : {},
							className: "flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
								className: "h-6 w-6 text-muted-foreground",
								strokeWidth: 1.5
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-center",
								children: s.label
							})]
						}, s.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border px-6 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-lg",
							children: "Seus Favoritos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/favorites",
							className: "text-xs text-brand-strong hover:underline",
							children: "Ver tudo →"
						})]
					}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center px-6 py-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
								className: "h-12 w-12 text-muted-foreground",
								strokeWidth: 1.2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: "Você ainda não salvou nada por aqui."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "mt-4 rounded-full bg-brand-strong text-background px-6 py-2 text-xs font-bold hover:opacity-90 transition",
								children: "Explorar produtos"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "px-6 py-4 text-sm text-muted-foreground",
						children: [
							"Você tem ",
							orders.length,
							" favorito(s) salvos"
						]
					})]
				})
			] })]
		})
	});
}
//#endregion
export { MePage as component };
