import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Settings, G as MessageSquare, H as Package, It as CircleAlert, M as Repeat2, Rt as ChevronRight, _ as Store, c as Undo2, ft as Heart, jt as Coins, kt as CreditCard, m as Ticket, mt as Headphones, r as Wallet, u as Truck, vt as Gift, w as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as SmartImage } from "./SmartImage-BH5TwHiu.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as actions, u as useStore } from "./router-DF0D9Ky_.mjs";
import { t as Layout } from "./Layout-DX1qpNC8.mjs";
import { useOrders } from "./orders-store-DPNmKvMS.mjs";
import { n as useCoupons } from "./coupons-store-K_R4Qx57.mjs";
import { usePoints } from "./points-XcHjegxc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/me-Bs4zAlyR.js
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
			className: "md:max-w-3xl md:mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-gradient-to-b from-pink-50 via-pink-50/60 to-background px-4 pt-5 pb-4 md:rounded-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 items-center gap-2",
							children: [user.photoURL ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
								src: user.photoURL,
								alt: displayName,
								rounded: "rounded-full",
								wrapperClassName: "h-10 w-10 shrink-0 ring-2 ring-brand/60",
								className: "object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground text-background font-bold",
								children: initial
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-base sm:text-lg md:text-xl font-black truncate min-w-0",
								children: displayName
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/auth",
							onClick: onSignInClick,
							className: "flex min-w-0 flex-1 items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl sm:text-2xl md:text-3xl font-black truncate",
								children: "Sign In / Register"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-6 w-6 shrink-0" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/settings",
							className: "p-2 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-white p-3 shadow-[var(--shadow-card)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-black text-white",
										children: "B"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-sm font-black tracking-wider text-gold",
										children: "BAZARIXY CLUB"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: "Benefícios exclusivos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border py-3 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "mx-auto h-5 w-5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[11px]",
											children: "Brindes"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border py-3 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "mx-auto h-5 w-5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[11px]",
											children: "Crédito"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "mt-2 w-full rounded-md bg-orange-50 py-2 text-sm font-bold text-amber-700",
									children: "Aderir agora"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-white p-3 shadow-[var(--shadow-card)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-sm font-black tracking-wider text-sale",
										children: "BAZARIXY"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-sm font-black italic text-sale",
										children: "Saver"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: "Cupons para você!"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 grid grid-cols-2 gap-2",
									children: [coupons.slice(0, 2).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border py-2 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-black text-sale",
											children: c.type === "percent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [c.value, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px]",
												children: "% OFF"
											})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												"Kz ",
												c.value.toLocaleString("pt-AO"),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px]",
													children: " OFF"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: c.minOrder ? `Pedidos Kz ${c.minOrder.toLocaleString("pt-AO")}+` : "Sem mínimo"
										})]
									}, c.code)), coupons.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "col-span-2 text-[11px] text-muted-foreground",
										children: "Sem cupons disponíveis agora."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/coupons",
									className: "mt-2 block w-full rounded-md bg-pink-50 py-2 text-center text-sm font-bold text-sale",
									children: "Ver cupons"
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-3 md:mx-0 mt-3 rounded-xl bg-white shadow-[var(--shadow-card)] p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-2",
						children: [
							{
								icon: Ticket,
								label: "Cupons",
								to: "/coupons",
								badge: coupons.length
							},
							{
								icon: Coins,
								label: "Pontos",
								to: "/points",
								badge: points
							},
							{
								icon: Wallet,
								label: "Carteira",
								to: "/wallet",
								badge: 0
							},
							{
								icon: Gift,
								label: "Convidar",
								to: "/points",
								badge: 0
							}
						].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: q.to,
							className: "flex flex-col items-center gap-1 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(q.icon, {
									className: "h-6 w-6",
									strokeWidth: 1.6
								}), q.badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-white",
									children: q.badge > 99 ? "99+" : q.badge
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px]",
								children: q.label
							})]
						}, q.label))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-3 md:mx-0 mt-3 rounded-xl bg-white shadow-[var(--shadow-card)] p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-bold",
							children: "Meus Pedidos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/orders",
							search: { tab: "unpaid" },
							className: "flex items-center text-xs text-muted-foreground",
							children: ["Ver todos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-5 gap-2",
						children: [
							{
								icon: CreditCard,
								label: "A pagar",
								tab: "unpaid"
							},
							{
								icon: Package,
								label: "Processando",
								tab: "processing"
							},
							{
								icon: Truck,
								label: "Enviado",
								tab: "shipped"
							},
							{
								icon: MessageSquare,
								label: "Avaliar",
								tab: "review"
							},
							{
								icon: Undo2,
								label: "Devoluções",
								tab: "returns"
							}
						].map((o) => {
							const badge = countOf(o.tab);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/orders",
								search: { tab: o.tab },
								className: "relative flex flex-col items-center gap-1 py-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o.icon, {
										className: "h-6 w-6",
										strokeWidth: 1.6
									}), badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-white",
										children: badge > 99 ? "99+" : badge
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] leading-tight",
									children: o.label
								})]
							}, o.label);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-3 md:mx-0 mt-3 rounded-xl bg-white shadow-[var(--shadow-card)] p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-bold",
						children: "Mais Serviços"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-5 gap-2",
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
								label: "Seguindo",
								to: "/store"
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
							className: "flex flex-col items-center gap-1 py-2 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
								className: "h-6 w-6",
								strokeWidth: 1.6
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] leading-tight",
								children: s.label
							})]
						}, s.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-3 md:mx-0 mt-3 rounded-xl bg-white shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-6 border-b border-border px-4 pt-3",
						children: ["wishlist", "recent"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setTab(t),
							className: `relative pb-3 text-sm ${tab === t ? "font-bold text-foreground after:absolute after:-bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-foreground" : "text-muted-foreground"}`,
							children: t === "wishlist" ? "Favoritos" : "Vistos recentemente"
						}, t))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center px-6 py-10 text-center",
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
								className: "mt-4 rounded-full bg-foreground px-6 py-2 text-xs font-bold text-background",
								children: "Explorar produtos"
							})
						]
					})]
				})
			]
		})
	});
}
//#endregion
export { MePage as component };
