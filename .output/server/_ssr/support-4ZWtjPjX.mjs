import { r as __toESM } from "../_runtime.mjs";
import { o as getFirebaseAuth } from "./client-ColUhoxC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Bt as ChevronDown, K as MessageCircle, Lt as ChevronUp, O as Send, Rt as ChevronRight, U as PackageOpen, at as Instagram, j as RotateCcw, kt as CreditCard, t as Zap, u as Truck, y as Sparkles, z as Phone, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { L as isRedirect, S as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { n as PHONE, s as WHATSAPP, t as INSTAGRAM } from "./router-Dtl-Myoz.mjs";
import { t as Layout } from "./Layout-CibOMXZA.mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./server-DShEhLUQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-4ZWtjPjX.js
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
var schema = objectType({
	messages: arrayType(objectType({
		role: enumType(["user", "assistant"]),
		content: stringType().max(4e3)
	})).max(30),
	authToken: stringType().max(5e3).optional()
});
function fallbackSupportReply(message) {
	const text = message.toLocaleLowerCase();
	if (text.includes("pag") || text.includes("comprov") || text.includes("transfer")) return "Escolha um método no checkout, copie exactamente o valor e os dados apresentados e envie o comprovativo real. Nunca envie comprovativo falso, alterado ou com valor diferente do pedido; o pedido só segue depois da validação. Se já enviou algo incorrecto, fale connosco no WhatsApp +244 934 033 532.";
	if (text.includes("entreg") || text.includes("frete") || text.includes("envio")) return "O custo e o prazo aparecem no checkout depois de informar a morada. O frete grátis depende da regra activa e do valor mínimo mostrado no resumo; acompanhe o pedido em «Meus pedidos».";
	if (text.includes("devol") || text.includes("reembols") || text.includes("danific")) return "Para devoluções ou reembolsos, mantenha o produto sem uso e contacte a equipa pelo WhatsApp +244 934 033 532 com o número do pedido.";
	return "Posso ajudar com pagamentos, entregas, pedidos, devoluções e cupons. Diga-me o que precisa ou fale directamente com a equipa no WhatsApp +244 934 033 532.";
}
var askSupport = createServerFn({ method: "POST" }).validator((data) => schema.parse(data)).handler(createSsrRpc("2fa18c9031533ccf5681f8a82f713b2cf97179e9fcc1cbf44fa8f415e55ab137"));
var suportlogo_default = "/assets/suportlogo-BBF_wn1G.png";
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
		content: "Bem-vindo à Bazarixy! Eu sou a Jilda IA, como posso ajudá-lo hoje?"
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
			const authToken = await getFirebaseAuth()?.currentUser?.getIdToken();
			const res = await ask({ data: {
				messages: next.slice(-12),
				authToken
			} });
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
			className: "min-h-screen bg-background text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-30 border-b border-border bg-background",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex w-full max-w-5xl items-center gap-3 px-3 py-3 md:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => window.history.back(),
								"aria-label": "Voltar",
								className: "grid h-9 w-9 place-items-center border border-border bg-transparent text-muted-foreground transition hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: suportlogo_default,
									alt: "Jilda IA",
									className: "h-10 w-10 border border-border bg-background object-contain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 border-2 border-background bg-emerald-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-[15px] font-black leading-tight tracking-tight",
									children: "Jilda IA"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Assistente Bazarixy"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: WHATSAPP,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-1.5 border border-emerald-500 bg-emerald-500 px-3 py-2 text-[11px] font-black text-white transition hover:opacity-90 md:px-4 md:text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5" }), "Falar com humano"]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-5xl gap-5 px-3 pb-40 pt-5 md:grid-cols-[minmax(0,1fr)_320px] md:px-6 md:pb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex min-h-[70vh] flex-col border border-border bg-background md:h-[calc(100vh-9rem)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden items-center gap-2 border-b border-border px-5 py-3 md:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-sale" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-black uppercase tracking-wide text-muted-foreground",
									children: "Conversa"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-4 overflow-y-auto px-3 py-4 md:px-5",
								children: [
									messages.map((m, i) => m.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-end gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: suportlogo_default,
											alt: "Jilda IA",
											className: "h-8 w-8 shrink-0 border border-border bg-background object-contain"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "max-w-[85%] whitespace-pre-line border border-border bg-background px-4 py-3 text-sm leading-relaxed",
											children: m.content
										})]
									}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "max-w-[85%] whitespace-pre-line bg-foreground px-4 py-3 text-sm leading-relaxed text-background",
											children: m.content
										})
									}, i)),
									loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-end gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/assets/suportlogo-BBF_wn1G.png",
											alt: "",
											className: "h-8 w-8 shrink-0 border border-border bg-background object-contain"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 border border-border bg-background px-4 py-3.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.2s]" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.1s]" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "no-scrollbar flex gap-2 overflow-x-auto border-t border-border px-3 py-3 md:px-5",
								children: SHORTCUTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => send(s.prompt),
									className: "group inline-flex shrink-0 items-center gap-2 border border-border bg-transparent px-3 py-2 text-[11px] font-bold transition hover:border-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-6 w-6 place-items-center border border-border bg-transparent text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-3.5 w-3.5" })
									}), s.label]
								}, s.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: (e) => {
									e.preventDefault();
									send(input);
								},
								className: "hidden items-end gap-2 border-t border-border px-5 py-3 md:flex",
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
									placeholder: "Escreva a sua mensagem…",
									className: "max-h-32 min-h-11 flex-1 resize-none border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: !input.trim() || loading,
									"aria-label": "Enviar",
									className: "grid h-11 w-11 shrink-0 place-items-center bg-foreground text-background transition hover:opacity-90 disabled:opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "space-y-4 md:h-[calc(100vh-9rem)] md:overflow-y-auto md:pr-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border border-border bg-background p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-xs font-black uppercase tracking-wide text-muted-foreground",
								children: "Fale connosco"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2 sm:grid-cols-3 md:grid-cols-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: WHATSAPP,
										target: "_blank",
										rel: "noreferrer",
										className: "flex items-center gap-3 border border-border p-3 transition hover:border-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-10 w-10 place-items-center bg-emerald-500 text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4.5 w-4.5" })
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
										className: "flex items-center gap-3 border border-border p-3 transition hover:border-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-10 w-10 place-items-center bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4.5 w-4.5" })
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
										className: "flex items-center gap-3 border border-border p-3 transition hover:border-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-10 w-10 place-items-center bg-foreground text-background",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4.5 w-4.5" })
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
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border border-border bg-background p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 border-b border-border pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "no-scrollbar flex flex-1 items-center gap-3 overflow-x-auto",
									children: FAQ_TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setTab(t);
											setOpenFaq(null);
										},
										className: `whitespace-nowrap px-2.5 py-1 text-xs font-bold transition ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`,
										children: t
									}, t))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFaqOpen((v) => !v),
									"aria-label": "Mostrar perguntas",
									className: "grid h-7 w-7 place-items-center text-muted-foreground hover:text-foreground",
									children: faqOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
								})]
							}), faqOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-border",
								children: FAQS[tab].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setOpenFaq(openFaq === i ? null : i),
									className: "flex w-full items-center gap-3 py-3 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-6 w-6 shrink-0 place-items-center border border-border text-[11px] font-black text-muted-foreground",
											children: i + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 flex-1 text-sm",
											children: f.q
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-4 w-4 shrink-0 text-muted-foreground transition ${openFaq === i ? "rotate-90 text-foreground" : ""}` })
									]
								}), openFaq === i && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pb-3 pl-9 pr-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs leading-relaxed text-muted-foreground",
										children: f.a
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => send(f.q),
										className: "mt-2 inline-flex items-center gap-1.5 border border-foreground px-3 py-1.5 text-[11px] font-bold text-foreground transition hover:bg-foreground hover:text-background",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), "Perguntar à Jilda IA"]
									})]
								})] }, f.q))
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background px-3 py-2.5 md:hidden",
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
							placeholder: "Escreva a sua mensagem…",
							className: "max-h-32 min-h-11 flex-1 resize-none border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !input.trim() || loading,
							"aria-label": "Enviar",
							className: "grid h-11 w-11 shrink-0 place-items-center bg-foreground text-background transition hover:opacity-90 disabled:opacity-40",
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
