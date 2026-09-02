import { r as __toESM } from "../_runtime.mjs";
import { i as firebaseEnabled } from "./client-ColUhoxC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as getAnyProduct } from "./products-store-DBaquvrN.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Ft as CircleCheck, G as MessageSquare, H as Package, J as MapPin, Mt as Clock, Rt as ChevronRight, c as Undo2, d as TriangleAlert, en as ArrowDown, j as RotateCcw, kt as CreditCard, n as X, u as Truck, v as Star, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as SmartImage } from "./SmartImage-BH5TwHiu.mjs";
import { b as useSearch, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as actions, u as useStore } from "./router-CVF9r1DU.mjs";
import { t as Layout } from "./Layout-Cn-KOsGs.mjs";
import { STAGE_DESC, STAGE_FLOW, STAGE_LABEL, orderActions, packagesOf, useOrders } from "./orders-store-DPNmKvMS.mjs";
import { i as setPendingPayment } from "./pending-payment-DaWfZjfD.mjs";
import { n as markOrderReviewed, r as reviewActions, t as isOrderReviewed } from "./reviews-CptW1Sl6.mjs";
import { addPoints } from "./points-XcHjegxc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-C4WNhJiq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Protege rotas privadas (pedidos, checkout, carteira, seguir loja…).
* Sem sessão: no desktop abre o modal de login, no mobile vai para /auth.
*/
function RequireAuth({ children, title = "Entre para continuar" }) {
	const { user } = useStore();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (user || !firebaseEnabled) return;
		if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) actions.openLogin();
		else navigate({ to: "/auth" });
	}, [user, navigate]);
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Precisa de uma conta Bazarixy para acessar esta página com segurança."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						if (window.matchMedia("(min-width: 768px)").matches) actions.openLogin();
						else navigate({ to: "/auth" });
					},
					className: "mt-6 h-12 w-full rounded-full bg-brand-strong text-base font-bold text-white transition hover:opacity-90",
					children: "Entrar ou criar conta"
				})
			]
		})
	});
}
var TABS = [
	{
		key: "unpaid",
		label: "A pagar",
		icon: CreditCard
	},
	{
		key: "processing",
		label: "Processando",
		icon: Package
	},
	{
		key: "shipped",
		label: "Enviado",
		icon: Truck
	},
	{
		key: "review",
		label: "Avaliar",
		icon: MessageSquare
	},
	{
		key: "returns",
		label: "Devoluções",
		icon: Undo2
	}
];
var statusMeta = {
	unpaid: {
		color: "text-sale",
		label: "Aguardando pagamento",
		icon: Clock,
		phrase: "O pagamento deste pedido ainda não foi concluído. Finalize-o para garantir os seus artigos."
	},
	processing: {
		color: "text-amber-600",
		label: "Em processamento",
		icon: Package,
		phrase: "O seu pedido está a ser tratado pela nossa equipa e pelas lojas envolvidas."
	},
	shipped: {
		color: "text-emerald-600",
		label: "A caminho",
		icon: Truck,
		phrase: "O pedido já saiu para entrega. Acompanhe abaixo cada etapa do envio."
	},
	review: {
		color: "text-brand-strong",
		label: "Pronto para avaliar",
		icon: Star,
		phrase: "Pedido concluído. A sua opinião é muito importante para nós."
	},
	returns: {
		color: "text-muted-foreground",
		label: "Em devolução",
		icon: RotateCcw,
		phrase: "O processo de devolução está em curso. Informamos assim que o reembolso for emitido."
	}
};
function OrdersPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		title: "Entre para ver os seus pedidos",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersContent, {})
	});
}
function OrdersContent() {
	const { tab } = useSearch({ from: "/orders" });
	const active = tab ?? "unpaid";
	const orders = useOrders();
	const list = orders.filter((o) => o.status === active);
	const [reviewFor, setReviewFor] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		hideHeader: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 md:top-16 z-30 bg-background border-b border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 px-2 pt-2 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => window.history.back(),
						className: "-ml-1 p-1.5",
						"aria-label": "Voltar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-base font-bold",
						children: "Meus Pedidos"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "no-scrollbar overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-w-full gap-1 px-2",
						children: TABS.map((t) => {
							const isActive = t.key === active;
							const count = orders.filter((o) => o.status === t.key).length;
							const Icon = t.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/orders",
								search: { tab: t.key },
								className: `relative flex flex-col items-center gap-1 px-3 py-2.5 min-w-[72px] text-[11px] ${isActive ? "font-bold text-foreground" : "text-muted-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											className: "h-5 w-5",
											strokeWidth: isActive ? 2.4 : 1.7
										}), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-strong px-1 text-[9px] font-bold text-white",
											children: count
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "leading-none",
										children: t.label
									}),
									isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-brand-strong" })
								]
							}, t.key);
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-3 px-3 md:px-0 pb-8",
				children: list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { status: active }) : list.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
					order: o,
					onReview: () => setReviewFor(o)
				}, o.id))
			}),
			reviewFor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewModal, {
				order: reviewFor,
				onClose: () => setReviewFor(null)
			})
		]
	});
}
function OrderCard({ order, onReview }) {
	const meta = statusMeta[order.status];
	const Icon = meta.icon;
	const first = getAnyProduct(order.items[0].productId);
	const totalItems = order.items.reduce((s, i) => s + i.qty, 0);
	const [reviewed, setReviewed] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const pkgs = packagesOf(order);
	const [openTimeline, setOpenTimeline] = (0, import_react.useState)(false);
	const [refundOpen, setRefundOpen] = (0, import_react.useState)(false);
	const { user } = useStore();
	(0, import_react.useEffect)(() => {
		(async () => {
			const isReviewed = await isOrderReviewed(order.id, user?.uid);
			setReviewed(isReviewed);
		})();
	}, [order.id, user?.uid]);
	const pay = () => {
		orderActions.reopenPayment(order.id, order.paymentMethod || "multicaixa-express");
		setPendingPayment({
			orderId: order.id,
			code: order.id,
			methodId: order.paymentMethod || "multicaixa-express",
			total: order.total,
			subtotal: order.subtotal,
			discount: order.discount,
			shipping: order.shipping,
			items: order.items.map((item) => {
				const product = getAnyProduct(item.productId);
				return {
					productId: item.productId,
					name: item.name ?? product?.name ?? "Produto",
					qty: item.qty,
					size: item.size,
					color: item.color,
					unitPrice: item.unitPrice ?? product?.price ?? 0,
					image: item.image ?? product?.image
				};
			}),
			customer: order.customer,
			shippingAddress: order.shippingAddress
		});
		navigate({
			to: "/pay/$method",
			params: { method: order.paymentMethod || "multicaixa-express" }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-white shadow-[var(--shadow-card)] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-2.5 border-b border-border/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: `h-4 w-4 shrink-0 ${meta.color}`,
						strokeWidth: 2.2
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-xs font-bold truncate ${meta.color}`,
						children: order.paymentProof && order.status === "processing" ? "Pagamento em análise" : meta.label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[11px] text-muted-foreground shrink-0",
					children: ["#", order.id]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-b border-border/60 bg-muted/30 px-4 py-2 text-[11px] leading-relaxed text-muted-foreground",
				children: meta.phrase
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [order.items.slice(0, 3).map((it) => {
							const p = getAnyProduct(it.productId);
							if (!p) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
									src: it.image ?? p.image,
									alt: p.name,
									wrapperClassName: "absolute inset-0 h-full w-full",
									className: "object-cover"
								}), it.qty > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute right-1 bottom-1 rounded bg-black/70 px-1 text-[9px] font-bold text-white",
									children: ["x", it.qty]
								})]
							}, it.productId);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto text-right",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground",
									children: [
										totalItems,
										" ",
										totalItems === 1 ? "item" : "itens"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-sm font-black",
									children: formatKz(order.total)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `mt-0.5 text-[11px] font-semibold ${order.shipping?.isFree ? "text-emerald-700" : "text-muted-foreground"}`,
									children: order.shipping?.isFree ? "Frete grátis" : `Frete ${formatKz(order.shipping?.chargedFee ?? 0)}`
								})
							]
						})]
					}),
					first && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground line-clamp-1",
						children: first.name
					}),
					order.status === "review" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-xl bg-brand/15 px-3 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[12px] font-bold text-brand-strong",
							children: [
								"Avalie e ganhe ",
								25,
								" pontos"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[11px] leading-relaxed text-muted-foreground",
							children: "Conte como foi a sua experiência. Os pontos entram na sua conta assim que publicar a avaliação."
						})]
					}) : order.status === "returns" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefundBlock, {
						order,
						onRequest: () => setRefundOpen(true)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2.5 space-y-1.5",
						children: [pkgs.map((pkg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageBlock, {
							pkg,
							index: i,
							total: pkgs.length,
							status: order.status,
							expanded: openTimeline,
							onReceived: () => {
								orderActions.markReceived(order.id, pkg.id);
								toast.success("Receção confirmada — já pode avaliar.");
							}
						}, pkg.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOpenTimeline((v) => !v),
							className: "text-[11px] font-semibold text-brand-strong",
							children: openTimeline ? "Ocultar detalhes" : "Ver detalhes do envio"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted-foreground",
							children: order.createdAt
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								order.status === "unpaid" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										orderActions.remove(order.id);
										toast.success("Pedido cancelado.");
									},
									className: "rounded-full border border-border px-3 py-1.5 text-xs",
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: pay,
									className: "rounded-full bg-brand-strong px-3 py-1.5 text-xs font-bold text-white hover:opacity-90",
									children: "Pagar agora"
								})] }),
								order.status === "processing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setOpenTimeline(true),
									className: "rounded-full border border-brand-strong/60 px-3 py-1.5 text-xs font-semibold text-brand-strong",
									children: "Ver estado"
								}),
								order.status === "shipped" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setOpenTimeline(true),
									className: "flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), " Rastrear"]
								}), (() => {
									const canConfirm = pkgs.some((p) => p.stage === "delivered");
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										disabled: !canConfirm,
										title: canConfirm ? "Confirmar receção" : "Disponível quando a entrega for confirmada pela loja",
										onClick: () => {
											orderActions.markReceived(order.id);
											toast.success("Obrigado! Já pode avaliar.");
										},
										className: `flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition ${canConfirm ? "bg-brand-strong text-white hover:opacity-90" : "cursor-not-allowed bg-muted text-muted-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Recebido"]
									});
								})()] }),
								order.status === "review" && (reviewed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Avaliado"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: onReview,
									className: "flex items-center gap-1 rounded-full bg-brand-strong px-3 py-1.5 text-xs font-bold text-white hover:opacity-90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-white" }), " Avaliar produto"]
								})),
								order.status === "returns" && !order.refund && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setRefundOpen(true),
									className: "rounded-full bg-brand-strong px-3 py-1.5 text-xs font-bold text-white hover:opacity-90",
									children: "Pedir reembolso"
								})
							]
						})]
					})
				]
			}),
			refundOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefundModal, {
				order,
				onClose: () => setRefundOpen(false)
			})
		]
	});
}
/** Resumo da devolução e do reembolso — sem etapas antigas, só o que falta fazer. */
function RefundBlock({ order, onRequest }) {
	const r = order.refund;
	if (!r) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 rounded-xl border border-border/70 px-3 py-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-bold",
				children: "Devolução aceite"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-[11px] leading-relaxed text-muted-foreground",
				children: "Está tudo pronto. Indique onde quer receber o dinheiro e confirme as condições — assim que a encomenda chegar ao nosso armazém, emitimos o reembolso."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onRequest,
				className: "mt-2 rounded-full bg-brand-strong px-3 py-1.5 text-[11px] font-bold text-white hover:opacity-90",
				children: "Pedir reembolso"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 rounded-xl bg-brand/15 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "animate-pulse text-[11px] font-bold text-brand-strong",
			children: "Reembolso em processamento"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-0.5 text-[11px] leading-relaxed text-muted-foreground",
			children: [
				"Vamos transferir ",
				formatKz(order.total),
				" para ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: r.method }),
				" ·",
				" ",
				r.account,
				" (",
				r.holder,
				"). Pedido em ",
				r.requestedAt,
				"."
			]
		})]
	});
}
var REFUND_METHODS = [
	"Multicaixa Express",
	"Unitel Money",
	"PayPay",
	"Transferência bancária (IBAN)"
];
function RefundModal({ order, onClose }) {
	const [method, setMethod] = (0, import_react.useState)(REFUND_METHODS[0]);
	const [account, setAccount] = (0, import_react.useState)("");
	const [holder, setHolder] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [agree, setAgree] = (0, import_react.useState)(false);
	const submit = () => {
		if (account.trim().length < 6) {
			toast.error("Indique o número ou IBAN onde quer receber.");
			return;
		}
		if (holder.trim().length < 3) {
			toast.error("Indique o nome do titular da conta.");
			return;
		}
		if (!agree) {
			toast.error("Confirme as condições da devolução.");
			return;
		}
		orderActions.requestRefund(order.id, {
			method,
			account: account.trim(),
			holder: holder.trim(),
			note: note.trim()
		});
		toast.success("Pedido de reembolso registado.");
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px] animate-fade-in",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[88vh] w-full max-w-sm overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl animate-slide-in-bottom",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-black",
						children: "Pedir reembolso"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground",
						children: [
							"Pedido #",
							order.id,
							" · ",
							formatKz(order.total)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-full p-1.5 hover:bg-muted",
						"aria-label": "Fechar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-[11px] font-bold text-muted-foreground",
					children: "Onde quer receber?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: method,
					onChange: (e) => setMethod(e.target.value),
					className: "mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-strong",
					children: REFUND_METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: m,
						children: m
					}, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-[11px] font-bold text-muted-foreground",
					children: "Número / IBAN"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: account,
					onChange: (e) => setAccount(e.target.value),
					placeholder: "Ex.: 923 000 000 ou AO06 0000 0000 0000",
					className: "mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-strong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-[11px] font-bold text-muted-foreground",
					children: "Nome do titular"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: holder,
					onChange: (e) => setHolder(e.target.value),
					className: "mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-strong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-[11px] font-bold text-muted-foreground",
					children: "Observações (opcional)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note,
					onChange: (e) => setNote(e.target.value),
					rows: 2,
					className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-strong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 flex items-start gap-2 text-[11px] leading-relaxed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: agree,
						onChange: (e) => setAgree(e.target.checked),
						className: "mt-0.5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirmo que o artigo está sem uso, com a embalagem original, e que devolvo a encomenda completa. O reembolso é emitido após a verificação no armazém." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: submit,
					className: "mt-4 h-11 w-full rounded-full bg-brand-strong text-sm font-bold text-white hover:opacity-90",
					children: "Confirmar pedido de reembolso"
				})
			]
		})
	});
}
/** Etapa a partir da qual cada separador começa a contar (não repetimos o passado). */
var ENTRY_STAGE = {
	unpaid: "awaiting_payment",
	processing: "payment_review",
	shipped: "shipped",
	review: "delivered",
	returns: "delivered"
};
/** Etapas visíveis: começam no separador atual e param na etapa em curso. */
function visibleStages(stage, status) {
	if (stage === "payment_rejected") return ["payment_rejected"];
	const from = STAGE_FLOW.indexOf(ENTRY_STAGE[status]);
	const idx = STAGE_FLOW.indexOf(stage);
	const list = STAGE_FLOW.filter((s) => s !== "payment_rejected").filter((s) => {
		const i = STAGE_FLOW.indexOf(s);
		return i >= from && i <= idx;
	});
	return list.length ? list : [stage];
}
/** Estado por loja: cada pacote pode andar num ritmo diferente. */
function PackageBlock({ pkg, index, total, status, expanded, onReceived }) {
	const all = visibleStages(pkg.stage, status);
	const stages = expanded ? all : [pkg.stage];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border/70 px-3 py-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate text-[10px] font-bold text-muted-foreground",
					children: [total > 1 ? `Envio ${index + 1}/${total} · ` : "", pkg.shopName]
				}), pkg.eta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex shrink-0 items-center gap-1 text-[10px] font-semibold text-emerald-700",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
							className: "h-3 w-3",
							strokeWidth: 2.2
						}),
						" ",
						pkg.eta
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-1.5 space-y-0",
				children: stages.map((st, i) => {
					const isCurrent = st === pkg.stage;
					const rejected = st === "payment_rejected";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full ${rejected ? "bg-destructive/15 text-destructive" : isCurrent ? "animate-pulse bg-brand/40 text-brand-strong" : "bg-brand-strong/15 text-brand-strong"}`,
							children: rejected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-2 w-2" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-2.5 w-2.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-[11px] font-bold leading-snug ${rejected ? "text-destructive" : isCurrent ? "animate-pulse text-foreground" : "text-brand-strong"}`,
								children: STAGE_LABEL[st]
							}), isCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[10px] leading-relaxed text-muted-foreground",
								children: STAGE_DESC[st]
							})]
						})]
					}), i < stages.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-[6px] flex h-3.5 items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
							className: "h-3 w-3 text-brand-strong/50",
							strokeWidth: 2.4
						})
					})] }, st);
				})
			}),
			expanded && pkg.timeline.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1 border-t border-border/60 pt-2",
				children: [...pkg.timeline].reverse().map((ev, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2 text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mt-1 h-1 w-1 shrink-0 rounded-full ${i === 0 ? "bg-brand-strong" : "bg-muted-foreground/40"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: STAGE_LABEL[ev.stage]
						}),
						ev.note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [" — ", ev.note]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-muted-foreground",
							children: ev.at
						})
					] })]
				}, `${ev.stage}-${i}`))
			}),
			pkg.stage === "delivered" && total > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onReceived,
				className: "mt-2 w-full rounded-full bg-brand-strong py-1.5 text-[11px] font-bold text-white hover:opacity-90",
				children: "Recebi este envio"
			})
		]
	});
}
function ReviewModal({ order, onClose }) {
	const { user } = useStore();
	const [rating, setRating] = (0, import_react.useState)(5);
	const [text, setText] = (0, import_react.useState)("");
	const [itemIdx, setItemIdx] = (0, import_react.useState)(0);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const item = order.items[itemIdx];
	const product = item ? getAnyProduct(item.productId) : void 0;
	const submit = async () => {
		if (!product) return;
		if (text.trim().length < 5) {
			toast.error("Escreva um comentário com pelo menos 5 caracteres");
			return;
		}
		setIsSubmitting(true);
		try {
			await reviewActions.add({
				productId: product.id,
				orderId: order.id,
				name: user?.name || user?.email?.split("@")[0] || "Cliente",
				photoURL: user?.photoURL ?? null,
				rating,
				size: item.size,
				color: item.color,
				text: text.trim()
			});
			await markOrderReviewed(order.id);
			addPoints(25);
			toast.success(`Avaliação publicada! +25 pontos`);
			onClose();
		} catch (error) {
			console.error("Erro ao publicar avaliação:", error);
			toast.error("Não conseguimos validar sua compra. Verifique se o pedido foi entregue corretamente.");
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-[2px] animate-fade-in md:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-2xl animate-slide-in-bottom md:rounded-3xl md:pb-5",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-3 h-1.5 w-12 rounded-full bg-border md:hidden" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-black",
						children: "Avaliar produto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Conte a sua experiência — ajuda outros clientes a decidir."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-full p-1.5 hover:bg-muted",
						"aria-label": "Fechar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				order.items.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-2 overflow-x-auto",
					children: order.items.map((it, idx) => {
						const p = getAnyProduct(it.productId);
						if (!p) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setItemIdx(idx),
							className: `shrink-0 rounded-lg border-2 p-1 ${idx === itemIdx ? "border-foreground" : "border-border"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
								src: it.image ?? p.image,
								alt: p.name,
								rounded: "rounded",
								wrapperClassName: "h-14 w-14",
								className: "object-cover"
							})
						}, idx);
					})
				}),
				product && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
						src: product.image,
						alt: product.name,
						rounded: "rounded-lg",
						wrapperClassName: "h-14 w-14 shrink-0",
						className: "object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-2 text-sm font-semibold",
						children: product.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-muted-foreground",
						children: "Sua nota"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 flex gap-1",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setRating(n),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-8 w-8 transition ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground/30"}` })
						}, n))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-muted-foreground",
						children: "Comentário"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: text,
						onChange: (e) => setText(e.target.value),
						rows: 4,
						placeholder: "Conte como foi sua experiência com o produto…",
						className: "mt-1 w-full resize-none rounded-lg border border-border bg-transparent p-3 text-sm outline-none focus:border-foreground"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						disabled: isSubmitting,
						className: "flex-1 rounded-full border border-border py-3 text-sm font-bold disabled:opacity-50",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: submit,
						disabled: isSubmitting,
						className: "flex-1 rounded-full bg-brand-strong py-3 text-sm font-black text-white hover:opacity-90 disabled:opacity-50",
						children: isSubmitting ? "Publicando..." : "Publicar avaliação"
					})]
				})
			]
		})
	});
}
function EmptyState({ status }) {
	const meta = statusMeta[status];
	const Icon = meta.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-16 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-20 w-20 place-items-center rounded-full bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "h-9 w-9 text-muted-foreground",
					strokeWidth: 1.4
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm font-semibold",
				children: ["Nenhum pedido ", meta.label.toLowerCase()]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Quando tiveres um pedido, aparece aqui."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mt-4 rounded-full bg-foreground px-6 py-2 text-xs font-bold text-background inline-flex items-center gap-1",
				children: ["Continuar comprando ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
			})
		]
	});
}
//#endregion
export { OrdersPage as component };
