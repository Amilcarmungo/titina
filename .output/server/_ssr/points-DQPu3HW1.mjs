import { r as __toESM } from "../_runtime.mjs";
import { L as referralLink, N as usePointsState, P as useStore } from "./router-CkCI9Rkw.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { At as Copy, E as Share2, i as Users, jt as Coins, o as UserPlus, v as Star, vt as Gift } from "../_libs/lucide-react.mjs";
import { c as requireAuth, t as Layout } from "./Layout-DqEbkgCf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/points-DQPu3HW1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PointsPage() {
	const { user } = useStore();
	const { earned, referrals, total } = usePointsState();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const link = user?.uid ? referralLink(user.uid) : "";
	async function copy() {
		if (!requireAuth(user)) return;
		try {
			await navigator.clipboard.writeText(link);
			setCopied(true);
			toast.success("Link copiado");
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			toast.error("Não foi possível copiar");
		}
	}
	async function share() {
		if (!requireAuth(user)) return;
		const data = {
			title: "Bazarixy",
			text: "Compra na Bazarixy com o meu convite:",
			url: link
		};
		if (typeof navigator !== "undefined" && "share" in navigator) try {
			await navigator.share(data);
			return;
		} catch {}
		copy();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		simpleHeader: true,
		showBack: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-3 pb-16 pt-3 md:pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-gold to-amber-300 p-5 text-white shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "h-4 w-4" }), " Meus pontos"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-5xl font-black leading-none",
							children: total
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs opacity-90",
							children: [
								50,
								" pontos por avaliação · ",
								5,
								" ",
								"pontos por amigo convidado"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-white/20 px-3 py-2 backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] opacity-90",
									children: "Avaliações"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-black",
									children: earned
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-white/20 px-3 py-2 backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] opacity-90",
									children: "Amigos convidados"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-black",
									children: referrals
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-3 rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-brand/15 text-brand-strong",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4.5 w-4.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-base font-black",
								children: "Convidar amigo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Cada amigo que criar conta pelo seu link vale",
									" ",
									5,
									" pontos."
								]
							})]
						})]
					}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "min-w-0 flex-1 truncate text-xs text-muted-foreground",
							children: link
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: copy,
							className: "shrink-0 rounded-lg bg-foreground px-3 py-1.5 text-xs font-bold text-background",
							children: copied ? "Copiado" : "Copiar"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: share,
							className: "inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-bold text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), " Partilhar"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: copy,
							className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), " Copiar link"]
						})]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => requireAuth(user),
						className: "mt-4 w-full rounded-xl bg-foreground px-4 py-3 text-sm font-bold text-background",
						children: "Entrar para receber o meu link"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-3 rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-black",
						children: "Como ganhar pontos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-3",
						children: [
							{
								icon: Star,
								title: `Avalie os seus pedidos`,
								body: `Ganha 50 pontos por cada avaliação de um pedido entregue.`,
								to: "/orders"
							},
							{
								icon: Users,
								title: "Convide amigos",
								body: `5 pontos por cada amigo que criar conta com o seu link.`
							},
							{
								icon: Gift,
								title: "Use em cupões",
								body: "Troque os pontos por descontos disponíveis na página de cupões.",
								to: "/coupons"
							}
						].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold",
										children: r.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: r.body
									}),
									r.to && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: r.to,
										className: "mt-1 inline-block text-xs font-bold text-brand-strong",
										children: "Ver mais"
									})
								]
							})]
						}, r.title))
					})]
				})
			]
		})
	});
}
//#endregion
export { PointsPage as component };
