import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { At as Copy, Ct as FileCheckCorner, Ft as CircleCheck, T as ShieldAlert, d as TriangleAlert, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as Layout } from "./Layout-COZ4pjzI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/como-pagar-O0bWIte3.js
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	{
		icon: Copy,
		title: "Escolha o método",
		text: "No checkout, seleccione Multicaixa Express, Unitel Money, PayPay ou transferência."
	},
	{
		icon: Copy,
		title: "Copie os dados",
		text: "Use o número, o código do pedido e o valor exacto apresentados na página de pagamento."
	},
	{
		icon: FileCheckCorner,
		title: "Faça a transferência",
		text: "Transfira exactamente o valor do pedido. Guarde o comprovativo original da operação."
	},
	{
		icon: CircleCheck,
		title: "Envie e aguarde",
		text: "Carregue uma imagem ou PDF legível. A equipa valida o pagamento antes de preparar o envio."
	}
];
function HowToPayPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		title: "Como pagar",
		showBack: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-2xl space-y-4 px-3 py-5 md:px-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl bg-foreground p-5 text-background shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-[0.16em] text-background/60",
							children: "Pagamento seguro"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-2xl font-black",
							children: "Pague com o valor certo, sem complicações."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-background/75",
							children: "O pedido só entra em preparação depois de a nossa equipa confirmar o pagamento e o comprovativo."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-black",
						children: "Passo a passo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-3",
						children: steps.map((step, index) => {
							const Icon = step.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 rounded-xl border border-border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-black",
									children: [
										index + 1,
										". ",
										step.title
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs leading-relaxed text-muted-foreground",
									children: step.text
								})] })]
							}, step.title);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-red-200 bg-red-50 p-4 text-red-950",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-base font-black",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5" }), " Nunca faça isto"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }), " Não envie comprovativo falso, editado, reutilizado ou de outra pessoa."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }), " Não transfira um valor diferente do total mostrado no pedido."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }), " Não envie o mesmo comprovativo para pedidos diferentes."]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs font-semibold",
							children: "Tentativas de fraude podem levar ao cancelamento do pedido e à suspensão da conta."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex items-center justify-between gap-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-black",
						children: "Precisa de ajuda?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: "A equipa pode confirmar o estado do seu pagamento."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/support",
						className: "shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background",
						children: "Falar com suporte"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cart",
					className: "flex items-center justify-center gap-1 py-2 text-sm font-bold text-brand-strong",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Voltar à sacola"]
				})
			]
		})
	});
}
//#endregion
export { HowToPayPage as component };
