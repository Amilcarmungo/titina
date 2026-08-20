import { P as useStore } from "./router-CPhoc9PM.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Rt as ChevronRight, Z as Lock, _t as Globe, m as Ticket, n as X, q as Menu, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as pay_multicaixa_jpg_asset_default, t as pay_express_jpg_asset_default } from "./pay-express.jpg.asset-zimTYSzM.mjs";
import { t as Layout } from "./Layout-Cip3RijY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-BlvFTb5x.js
var import_jsx_runtime = require_jsx_runtime();
function WalletPage() {
	const { user } = useStore();
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		hideHeader: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-[80vh] flex flex-col items-center justify-center px-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-16 w-16 place-items-center rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-7 w-7" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-2xl font-black",
					children: "Acesso restrito"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Entre na sua conta Bazarixy para acessar a Carteira, saldos e vales-presente."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					className: "mt-6 rounded-full bg-foreground px-8 py-3 text-sm font-bold text-background",
					children: "Entrar / Cadastrar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/me",
					className: "mt-3 text-xs text-muted-foreground underline",
					children: "Voltar para Minha Conta"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletContent, {});
}
function WalletContent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		hideHeader: true,
		hideBottomNav: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0d1638] text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center px-3 pt-3 pb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => window.history.back(),
							className: "p-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "flex-1 text-center text-base font-semibold",
							children: "Carteira"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "p-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-3 mb-3 rounded-t-2xl bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] p-4 pb-5 text-foreground relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute -right-6 -bottom-10 text-[180px] font-black text-white/50 leading-none select-none",
						children: "B"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-4xl font-black tracking-tight",
									children: "0,00"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-5 w-5 place-items-center rounded-full border border-foreground/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3 w-3" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: true,
								className: "mt-3 rounded bg-foreground/30 px-8 py-2.5 text-sm font-medium text-white/90",
								children: "Sacar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid grid-cols-3 border-t border-foreground/10 pt-3 text-sm",
								children: [
									{
										k: "Pagamento",
										v: "0"
									},
									{
										k: "Vale-presente",
										v: "-"
									},
									{
										k: "Histórico",
										v: "-"
									}
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex flex-col items-start gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-foreground/80",
										children: [c.k, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: c.v
									})]
								}, c.k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-2 rounded bg-white/60 px-2.5 py-2 text-[12px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-3.5 w-3.5 text-sale" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: "Receba seu vale-presente: fácil de usar, compre e use já!"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3 text-foreground/60" })
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background px-4 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-bold",
					children: "Serviço de Pagamento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[5/4] overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold uppercase text-sale",
								children: "Extra"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "-mt-1 text-3xl font-black text-sale leading-none",
								children: ["Kz 5.000", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-base",
									children: "OFF"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10px] text-foreground/80",
								children: "Pedidos Kz 48.000+ ao pagar com"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: pay_express_jpg_asset_default.url,
									alt: "Multicaixa Express",
									className: "h-6 w-6 rounded object-contain bg-white p-0.5 ring-1 ring-black/5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-orange-600",
									children: "Multicaixa Express"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-sky-50 p-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-sky-700",
								children: "Vincular Cartão"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-black text-sky-800",
								children: "Checkout Rápido"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 mx-auto grid h-16 w-24 place-items-center rounded-md bg-white shadow-md ring-1 ring-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: pay_multicaixa_jpg_asset_default.url,
									alt: "Multicaixa",
									className: "max-h-14 max-w-20 object-contain"
								})
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 mx-3 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-card)]",
				children: [
					"Métodos de pagamento",
					"Vale-presente",
					"Histórico de transações",
					"Solicitar reembolso"
				].map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex w-full items-center justify-between px-4 py-3.5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
				}, it))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-4 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/me",
					className: "text-xs text-muted-foreground underline",
					children: "Voltar para Minha Conta"
				})
			})
		]
	});
}
//#endregion
export { WalletPage as component };
