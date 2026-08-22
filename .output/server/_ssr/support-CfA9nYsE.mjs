import { r as __toESM } from "../_runtime.mjs";
import { c as WHATSAPP, r as PHONE, t as INSTAGRAM } from "./router-DQBwzykF.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { L as isRedirect, S as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { Bt as ChevronDown, K as MessageCircle, Lt as ChevronUp, O as Send, Rt as ChevronRight, U as PackageOpen, at as Instagram, j as RotateCcw, kt as CreditCard, t as Zap, u as Truck, z as Phone } from "../_libs/lucide-react.mjs";
import { t as Layout } from "./Layout-ByFmfVKk.mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./server-CnIW287y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-CfA9nYsE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var schema = objectType({ messages: arrayType(objectType({
	role: enumType(["user", "assistant"]),
	content: stringType().max(4e3)
})).max(30) });
function fallbackSupportReply(message) {
	const text = message.toLocaleLowerCase();
	if (text.includes("pag") || text.includes("comprov") || text.includes("transfer")) return "Escolha um método no checkout, copie exactamente o valor e os dados apresentados e envie o comprovativo real. Nunca envie comprovativo falso, alterado ou com valor diferente do pedido; o pedido só segue depois da validação. Se já enviou algo incorrecto, fale connosco no WhatsApp +244 934 033 532.";
	if (text.includes("entreg") || text.includes("frete") || text.includes("envio")) return "O custo e o prazo aparecem no checkout depois de informar a morada. O frete grátis depende da regra activa e do valor mínimo mostrado no resumo; acompanhe o pedido em «Meus pedidos».";
	if (text.includes("devol") || text.includes("reembols") || text.includes("danific")) return "Para devoluções ou reembolsos, mantenha o produto sem uso e contacte a equipa pelo WhatsApp +244 934 033 532 com o número do pedido.";
	return "Posso ajudar com pagamentos, entregas, pedidos, devoluções e cupons. Diga-me o que precisa ou fale directamente com a equipa no WhatsApp +244 934 033 532.";
}
var askSupport = createServerFn({ method: "POST" }).validator((data) => schema.parse(data)).handler(createSsrRpc("2fa18c9031533ccf5681f8a82f713b2cf97179e9fcc1cbf44fa8f415e55ab137"));
var bazarixy_mark_webp_asset_default = {
	asset_id: "a5b3bf32-9e02-4796-b6c3-029d9ce381ec",
	content_type: "image/webp",
	created_at: "2026-07-03T00:17:15Z",
	original_filename: "bazarixy-mark.webp",
	project_id: "67f47a30-788f-4cd0-9e2d-44f184230c53",
	r2_key: "a/v1/67f47a30-788f-4cd0-9e2d-44f184230c53/a5b3bf32-9e02-4796-b6c3-029d9ce381ec/bazarixy-mark.webp",
	size: 80666,
	url: "/__l5e/assets-v1/a5b3bf32-9e02-4796-b6c3-029d9ce381ec/bazarixy-mark.webp",
	version: 1
};
var SHORTCUTS = [
	{
		icon: Zap,
		label: "Entrega urgente",
		prompt: "Preciso de uma entrega urgente. Como funciona?"
	},
	{
		icon: Truck,
		label: "Rastrear",
		prompt: "Como acompanho o estado do meu pedido?"
	},
	{
		icon: CreditCard,
		label: "Pagamentos",
		prompt: "Que métodos de pagamento posso usar e como envio o comprovativo?"
	},
	{
		icon: RotateCcw,
		label: "Devoluções",
		prompt: "Como faço uma devolução ou reembolso?"
	},
	{
		icon: PackageOpen,
		label: "Enviar pedido",
		prompt: "Como faço para finalizar e enviar o meu pedido?"
	}
];
var FAQ_TABS = [
	"Perguntas frequentes",
	"Pré-venda",
	"Conteúdo"
];
var FAQS = {
	"Perguntas frequentes": [
		{
			q: "Quanto tempo o pedido demora para chegar?",
			a: "Em Luanda entregamos em 24-48h. Nas outras províncias entre 3 e 7 dias úteis, contados após a validação do comprovativo."
		},
		{
			q: "Por que meu pedido está atrasado?",
			a: "Normalmente é por comprovativo ainda em análise ou morada incompleta. Verifique em «Meus pedidos» — se estiver em processamento há mais de 48h, fale connosco."
		},
		{
			q: "Existe alguma taxa adicional?",
			a: "Não cobramos taxas escondidas. O frete é grátis acima de Kz 120.000 e aparece sempre no resumo antes de pagar."
		},
		{
			q: "Por que meu pagamento foi recusado?",
			a: "Confirme se o valor transferido é exactamente igual ao do pedido e se o comprovativo está legível. Pode reenviar o comprovativo pela página do pagamento."
		}
	],
	"Pré-venda": [{
		q: "Posso reservar um produto?",
		a: "Sim. Adicione à sacola e finalize — a reserva fica activa durante 24h enquanto envia o comprovativo."
	}, {
		q: "Os tamanhos são fiéis?",
		a: "Cada produto tem o guia de tamanhos na página de detalhes. Em caso de dúvida, pergunte-me o tamanho que costuma usar."
	}],
	Conteúdo: [{
		q: "Como me torno vendedor na Bazarixy?",
		a: "Envie-nos uma mensagem no WhatsApp com o nome da loja e o tipo de produtos. Criamos a sua loja no marketplace."
	}, {
		q: "Onde vejo as novidades?",
		a: "No Instagram @bazarixy publicamos lançamentos, campanhas e cupons antes de todos."
	}]
};
function SupportPage() {
	const ask = useServerFn(askSupport);
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "Bem-vindo à Bazarixy! Eu sou a Siyo, como posso ajudá-lo hoje?"
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)(FAQ_TABS[0]);
	const [openFaq, setOpenFaq] = (0, import_react.useState)(null);
	const [faqOpen, setFaqOpen] = (0, import_react.useState)(true);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "end"
		});
	}, [messages, loading]);
	const send = async (text) => {
		const content = text.trim();
		if (!content || loading) return;
		const next = [...messages, {
			role: "user",
			content
		}];
		setMessages(next);
		setInput("");
		setLoading(true);
		try {
			const res = await ask({ data: { messages: next.slice(-12) } });
			setMessages([...next, {
				role: "assistant",
				content: res.reply
			}]);
		} catch {
			setMessages([...next, {
				role: "assistant",
				content: fallbackSupportReply(content)
			}]);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		hideHeader: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col bg-muted/30",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => window.history.back(),
							"aria-label": "Voltar",
							className: "grid h-9 w-9 place-items-center rounded-full hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl leading-none",
								children: "‹"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-base font-black tracking-tight",
								children: "Suporte Bazarixy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Assistente Siyo · online"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: WHATSAPP,
							target: "_blank",
							rel: "noreferrer",
							className: "text-xs font-bold text-sale",
							children: "Humano"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-3xl flex-1 px-3 pb-40 pt-4 md:pb-44",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								messages.map((m, i) => m.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: bazarixy_mark_webp_asset_default.url,
										alt: "Siyo",
										className: "h-9 w-9 shrink-0 rounded-full bg-background object-contain ring-1 ring-border"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "max-w-[85%] whitespace-pre-line rounded-2xl rounded-tl-sm bg-background px-4 py-3 text-sm shadow-[var(--shadow-card)]",
										children: m.content
									})]
								}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "max-w-[85%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-foreground",
										children: m.content
									})
								}, i)),
								loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: bazarixy_mark_webp_asset_default.url,
										alt: "",
										className: "h-9 w-9 shrink-0 rounded-full bg-background object-contain ring-1 ring-border"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-2xl rounded-tl-sm bg-background px-4 py-3 text-sm text-muted-foreground shadow-[var(--shadow-card)]",
										children: "A escrever…"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "no-scrollbar mt-4 flex gap-2 overflow-x-auto",
							children: SHORTCUTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => send(s.prompt),
								className: "flex w-[104px] shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-background px-2 py-3 text-center shadow-[var(--shadow-card)] transition hover:-translate-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-9 w-9 place-items-center rounded-xl bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold leading-tight",
									children: s.label
								})]
							}, s.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-3 rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 border-b border-border pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "no-scrollbar flex flex-1 items-center gap-3 overflow-x-auto",
									children: FAQ_TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setTab(t);
											setOpenFaq(null);
										},
										className: `whitespace-nowrap text-xs font-bold ${tab === t ? "text-sale" : "text-muted-foreground"}`,
										children: t
									}, t))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setFaqOpen((v) => !v),
									className: "inline-flex items-center gap-1 text-xs font-bold text-sale",
									children: [
										"Mais",
										" ",
										faqOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })
									]
								})]
							}), faqOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-border",
								children: FAQS[tab].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setOpenFaq(openFaq === i ? null : i),
									className: "flex w-full items-center gap-3 py-3 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-sm font-black ${i === 0 ? "text-sale" : i === 1 ? "text-amber-500" : "text-muted-foreground"}`,
											children: i + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 flex-1 text-sm",
											children: f.q
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-4 w-4 shrink-0 text-muted-foreground transition ${openFaq === i ? "rotate-90" : ""}` })
									]
								}), openFaq === i && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pb-3 pl-7 pr-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs leading-relaxed text-muted-foreground",
										children: f.a
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => send(f.q),
										className: "mt-2 rounded-full border border-border px-3 py-1 text-[11px] font-bold hover:bg-muted",
										children: "Perguntar à Siyo"
									})]
								})] }, f.q))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-3 grid gap-2 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: WHATSAPP,
									target: "_blank",
									rel: "noreferrer",
									className: "flex items-center gap-2.5 rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs font-black",
											children: "WhatsApp"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-[11px] text-muted-foreground",
											children: PHONE
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: INSTAGRAM,
									target: "_blank",
									rel: "noreferrer",
									className: "flex items-center gap-2.5 rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-pink-500 text-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs font-black",
											children: "Instagram"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-[11px] text-muted-foreground",
											children: "@bazarixy"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "tel:+244934033532",
									className: "flex items-center gap-2.5 rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs font-black",
											children: "Telefone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-[11px] text-muted-foreground",
											children: PHONE
										})]
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background px-3 py-2.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							send(input);
						},
						className: "mx-auto flex max-w-3xl items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									send(input);
								}
							},
							rows: 1,
							placeholder: "Digite a sua mensagem aqui",
							className: "max-h-32 min-h-11 flex-1 resize-none rounded-2xl bg-muted px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-sale/40"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !input.trim() || loading,
							"aria-label": "Enviar",
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-strong text-white transition hover:opacity-90 disabled:opacity-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { SupportPage as component };
