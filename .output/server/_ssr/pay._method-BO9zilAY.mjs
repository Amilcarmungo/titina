import { r as __toESM } from "../_runtime.mjs";
import { r as getFirebaseAuth } from "./client-C80F8PZn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as orderActions } from "./orders-store-qQk2r5Yq.mjs";
import { v as Link, x as useParams, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { At as Copy, Mt as Clock, St as FileText, ot as Info, p as Trash2, s as Upload, w as ShieldCheck } from "../_libs/lucide-react.mjs";
import { r as uploadProofFile, t as storagePaths } from "./upload-D4601ayU.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { r as usePaymentMethods, t as getPaymentMethod } from "./payments-store-estnBhgv.mjs";
import { t as Layout } from "./Layout-Cip3RijY.mjs";
import { n as getPendingPayment, t as clearPendingPayment } from "./pending-payment-DaWfZjfD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pay._method-BO9zilAY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var defaultSteps = [
	"Abra a app do método escolhido no seu telemóvel.",
	"Copie os dados ao lado (número, valor e código do pedido).",
	"Confirme o envio e guarde o comprovativo.",
	"Carregue o comprovativo aqui para concluir o pedido."
];
function PayMethodPage() {
	const { method: methodParam } = useParams({ from: "/pay/$method" });
	const navigate = useNavigate();
	const methods = usePaymentMethods();
	const [pending, setPending] = (0, import_react.useState)(null);
	const [proof, setProof] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(null);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [rulesAccepted, setRulesAccepted] = (0, import_react.useState)(false);
	const finishLock = (0, import_react.useRef)(false);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setPending(getPendingPayment());
	}, []);
	const methodId = methodParam === "express" ? "multicaixa-express" : methodParam;
	const method = (0, import_react.useMemo)(() => methods.find((m) => m.id === methodId) ?? getPaymentMethod(pending?.methodId), [
		methods,
		methodId,
		pending
	]);
	const isExpress = (method?.id ?? methodId) === "multicaixa-express";
	const message = (0, import_react.useMemo)(() => (pending?.items ?? []).map((i) => `${i.qty}x ${i.name}`).join(", ").slice(0, 140), [pending]);
	const copy = (value, label) => {
		navigator.clipboard?.writeText(value);
		toast.success(`${label} copiado`);
	};
	const pickFile = (f) => {
		if (!f) return;
		if (!(f.type.startsWith("image/") || f.type === "application/pdf")) {
			toast.error("Só é aceite imagem ou PDF.");
			return;
		}
		if (f.size > 8388608) {
			toast.error("Ficheiro muito grande (máx. 8 MB).");
			return;
		}
		setProof((prev) => {
			if (prev?.preview) URL.revokeObjectURL(prev.preview);
			return {
				file: f,
				preview: URL.createObjectURL(f),
				name: f.name,
				type: f.type
			};
		});
	};
	const clearProof = () => {
		setProof((prev) => {
			if (prev?.preview) URL.revokeObjectURL(prev.preview);
			return null;
		});
	};
	const finish = async () => {
		if (!pending || !proof || !rulesAccepted || sending || finishLock.current) return;
		const uid = getFirebaseAuth()?.currentUser?.uid;
		if (!uid) {
			toast.error("Entre na sua conta para enviar o comprovativo.");
			return;
		}
		finishLock.current = true;
		setSending(true);
		setProgress(0);
		const url = await uploadProofFile(proof.file, storagePaths.proof(uid, pending.code, proof.file.name), setProgress);
		setSending(false);
		if (!url) {
			finishLock.current = false;
			return;
		}
		const id = orderActions.add({
			id: pending.code,
			status: "processing",
			items: pending.items.map((i) => ({
				productId: i.productId,
				qty: i.qty,
				size: i.size,
				color: i.color,
				unitPrice: i.unitPrice
			})),
			subtotal: pending.subtotal,
			discount: pending.discount,
			shipping: pending.shipping,
			total: pending.total,
			customer: pending.customer,
			paymentMethod: method?.id ?? methodId,
			paymentProof: url,
			shippingAddress: pending.shippingAddress,
			notes: `Pagamento enviado por ${method?.label ?? methodId} · Comprovativo: ${proof.name}`
		});
		clearPendingPayment();
		if (proof.preview) URL.revokeObjectURL(proof.preview);
		setDone(id);
	};
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		hideHeader: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md px-6 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-amber-600",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-8 w-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-2xl font-black",
					children: "Pagamento enviado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"O seu pagamento do pedido ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: done }),
						" está a ser avaliado. Assim que o comprovativo for validado, a encomenda segue para envio — pode acompanhar o estado em «Meus pedidos»."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders",
						search: { tab: "processing" },
						className: "flex-1 rounded-full bg-foreground py-3 text-sm font-bold text-background",
						children: "Meus pedidos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex-1 rounded-full border border-border py-3 text-sm font-bold",
						children: "Continuar"
					})]
				})
			]
		})
	});
	if (!pending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		hideHeader: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md px-6 py-20 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-bold",
					children: "Nenhum pagamento pendente"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Finalize um pedido no checkout para pagar."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({ to: "/cart" }),
					className: "mt-5 rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background",
					children: "Ir para a sacola"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		hideHeader: true,
		hideBottomNav: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-3 pb-28 pt-4 md:px-0 md:pb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-2xl",
				style: { background: isExpress ? "linear-gradient(90deg,#f59e0b,#f97316)" : "linear-gradient(90deg,#111827,#374151)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 px-4 py-3 text-white",
					children: [method?.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-white/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: method.image,
							alt: method.label,
							className: "max-h-7 max-w-7 object-contain"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-7 w-7 place-items-center rounded-full bg-white/25 text-sm font-black",
						children: "✳"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-black tracking-tight",
						children: method?.label ?? "Pagamento"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 md:grid-cols-[minmax(0,380px)_1fr] md:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						isExpress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[16/10] overflow-hidden rounded-2xl p-4 text-white shadow-[var(--shadow-card)]",
							style: { background: "radial-gradient(120% 120% at 20% 0%, #2f8fe0 0%, #1565c0 45%, #0b3f8f 100%)" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-16 top-6 h-48 w-48 rounded-full border border-white/10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xl font-black tracking-tight",
										children: "BAI"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold uppercase tracking-widest opacity-80",
										children: "Débito"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-8 w-11 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 font-mono text-base tracking-[0.18em] opacity-95",
									children: "•••• •••• •••• ••••"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-end justify-between text-[10px] uppercase tracking-widest opacity-85",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Válido até",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm tracking-normal",
											children: "07/29"
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm normal-case tracking-normal opacity-90",
										children: method?.label ?? "Multicaixa Express"
									})]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[16/10] overflow-hidden rounded-2xl bg-foreground p-5 text-background shadow-[var(--shadow-card)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold uppercase tracking-widest opacity-70",
									children: "Pagamento seguro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-2xl font-black",
									children: method?.label ?? "Pagamento"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs opacity-80",
									children: method?.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-4 left-5 right-5 flex items-end justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-sm tracking-widest opacity-80",
										children: pending.code
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-lg font-black",
										children: formatKz(pending.total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-2 text-sm font-black",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 text-sale" }), " Como pagar"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-2 space-y-1.5 text-xs text-muted-foreground",
									children: (method?.instructions ? method.instructions.split("\n").filter(Boolean) : defaultSteps).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-4 w-4 shrink-0 place-items-center rounded-full bg-foreground text-[9px] font-black text-background",
											children: i + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s })]
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 flex items-center gap-1.5 text-[11px] text-emerald-600",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " O pedido só é enviado após validação do comprovativo."]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-950",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-black",
									children: "Antes de enviar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-2 list-disc space-y-1 pl-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Transfira exactamente o valor indicado neste pedido." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Envie apenas um comprovativo real, legível e desta transferência." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "É proibido enviar comprovativo falso, editado, repetido ou com valor diferente." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mt-3 flex items-start gap-2 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: rulesAccepted,
										onChange: (e) => setRulesAccepted(e.target.checked),
										className: "mt-0.5 h-4 w-4 accent-foreground"
									}), "Confirmo que o valor e o comprovativo estão correctos."]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyRow, {
							label: "Número de telemóvel / conta",
							value: method?.phone || "923 000 000",
							onCopy: copy,
							mono: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyRow, {
							label: "Valor (máximo de 250.000 Kz por transferência)",
							value: formatKz(pending.total),
							onCopy: copy,
							highlight: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyRow, {
							label: "Nome Ordenante (código do pedido)",
							value: pending.code,
							onCopy: copy,
							mono: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyRow, {
							label: "Mensagem",
							value: message || "Compra Bazarixy",
							onCopy: copy,
							multiline: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold uppercase tracking-wide text-muted-foreground",
									children: "Comprovativo *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: "image/*,application/pdf",
									className: "hidden",
									onChange: (e) => pickFile(e.target.files?.[0])
								}),
								!proof ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => fileRef.current?.click(),
									className: "mt-2 flex w-full flex-col items-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-muted/40 px-4 py-7 text-center transition hover:border-sale hover:bg-sale/5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5 text-sale" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-bold",
											children: "Carregar comprovativo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground",
											children: "Imagem (JPG, PNG) ou PDF · máx. 8 MB"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-3 rounded-2xl border border-border p-3",
									children: [
										proof.type === "application/pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-6 w-6" })
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: proof.preview,
											alt: "Comprovativo",
											className: "h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-border"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-sm font-bold",
												children: proof.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => fileRef.current?.click(),
												className: "text-[11px] font-bold text-sale",
												children: "Substituir ficheiro"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: clearProof,
											className: "grid h-9 w-9 place-items-center rounded-lg border border-border text-destructive hover:bg-destructive/10",
											"aria-label": "Remover",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-[11px] text-muted-foreground",
									children: proof ? "O comprovativo é enviado ao tocar em «Finalizar»." : "Sem comprovativo não é possível finalizar."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => void finish(),
							disabled: !proof || !rulesAccepted || sending,
							className: "hidden w-full rounded-full py-3 text-sm font-black text-white transition disabled:cursor-not-allowed disabled:opacity-50 md:block",
							style: { background: "linear-gradient(90deg,#f59e0b,#f43f7e)" },
							children: sending ? `A enviar comprovativo… ${progress}%` : `Finalizar pedido · ${formatKz(pending.total)}`
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background px-3 py-3 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => void finish(),
				disabled: !proof || !rulesAccepted || sending,
				className: "w-full rounded-full py-3 text-sm font-black text-white disabled:opacity-50",
				style: { background: "linear-gradient(90deg,#f59e0b,#f43f7e)" },
				children: sending ? `A enviar… ${progress}%` : `Finalizar · ${formatKz(pending.total)}`
			})
		})]
	});
}
function CopyRow({ label, value, onCopy, mono, highlight, multiline }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[11px] font-bold uppercase tracking-wide text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-1 flex items-start gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `min-w-0 flex-1 text-sm ${mono ? "font-mono tracking-wide" : ""} ${highlight ? "text-base font-black text-sale" : "font-semibold"} ${multiline ? "line-clamp-3" : "truncate"}`,
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => onCopy(value, label),
			className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-background hover:bg-muted",
			"aria-label": `Copiar ${label}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
		})]
	})] });
}
//#endregion
export { PayMethodPage as component };
