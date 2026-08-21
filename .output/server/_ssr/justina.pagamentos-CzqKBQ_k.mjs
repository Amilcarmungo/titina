import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Pencil, R as Plus, kt as CreditCard, p as Trash2, st as Image } from "../_libs/lucide-react.mjs";
import { n as paymentActions, r as usePaymentMethods } from "./payments-store-estnBhgv.mjs";
import { r as AdminModal } from "./AdminModal-DXEoyymL.mjs";
import { n as uploadImageFile, t as storagePaths } from "./upload-D4601ayU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.pagamentos-CzqKBQ_k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	label: "",
	desc: "",
	image: "",
	active: true,
	instructions: ""
};
function PaymentsAdmin() {
	const methods = usePaymentMethods();
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const openNew = () => {
		setEditingId(null);
		setDraft({ ...empty });
	};
	const openEdit = (m) => {
		setEditingId(m.id);
		setDraft({ ...m });
	};
	const save = () => {
		if (!draft) return;
		if (!draft.label.trim()) {
			toast.error("Dá um nome ao método.");
			return;
		}
		if (editingId) {
			paymentActions.update(editingId, draft);
			toast.success("Método atualizado");
		} else {
			paymentActions.add(draft);
			toast.success("Método adicionado");
		}
		setDraft(null);
		setEditingId(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-black tracking-tight",
					children: "Métodos de pagamento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [methods.length, " método(s) · aparecem no checkout"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openNew,
					className: "inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Novo método"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [methods.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-12 w-12 flex-none place-items-center overflow-hidden rounded-xl bg-muted ring-1 ring-border",
							children: m.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: m.image,
								alt: m.label,
								className: "max-h-10 max-w-10 object-contain",
								onError: (e) => {
									e.currentTarget.style.display = "none";
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-black",
									children: m.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[11px] text-muted-foreground",
									children: m.desc || m.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${m.active ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`,
									children: m.active ? "Ativo" : "Inativo"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-none gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => openEdit(m),
								className: "grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted",
								"aria-label": "Editar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									if (confirm(`Remover ${m.label}?`)) {
										paymentActions.remove(m.id);
										toast.success("Removido");
									}
								},
								className: "grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-600 hover:bg-red-50",
								"aria-label": "Remover",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})]
						})
					]
				}, m.id)), methods.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "Nenhum método."
				})]
			}),
			draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
				open: true,
				onClose: () => {
					setDraft(null);
					setEditingId(null);
				},
				title: editingId ? "Editar método" : "Novo método",
				subtitle: "Aparece na etapa de pagamento do checkout",
				size: "md",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setDraft(null);
						setEditingId(null);
					},
					className: "rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted",
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					className: "rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background",
					children: "Guardar"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold",
								children: "Nome"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: draft.label,
								onChange: (e) => setDraft({
									...draft,
									label: e.target.value
								}),
								className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm",
								placeholder: "Ex.: Multicaixa Express"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold",
								children: "Descrição"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: draft.desc,
								onChange: (e) => setDraft({
									...draft,
									desc: e.target.value
								}),
								className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm",
								placeholder: "Pagamento instantâneo pelo app"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold",
								children: "Número para transferência (aparece na página de pagamento)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: draft.phone ?? "",
								onChange: (e) => setDraft({
									...draft,
									phone: e.target.value
								}),
								className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm",
								placeholder: "923 000 000"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold",
								children: "Instruções para o cliente (opcional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: draft.instructions ?? "",
								onChange: (e) => setDraft({
									...draft,
									instructions: e.target.value
								}),
								rows: 3,
								className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm",
								placeholder: "Número da conta / IBAN / passos"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-16 w-16 flex-none place-items-center overflow-hidden rounded-xl bg-muted ring-1 ring-border",
								children: draft.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: draft.image,
									alt: "",
									className: "max-h-14 max-w-14 object-contain"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-5 w-5 text-muted-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "pm-img",
									type: "file",
									accept: "image/*",
									className: "hidden",
									onChange: (e) => {
										const f = e.target.files?.[0];
										if (f) uploadImageFile(f, storagePaths.payment(draft.id || "novo", f.name)).then((url) => {
											if (url) setDraft({
												...draft,
												image: url
											});
										});
										e.target.value = "";
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "pm-img",
									className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted",
									children: draft.image ? "Substituir logo" : "Carregar logo"
								}),
								draft.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setDraft({
										...draft,
										image: ""
									}),
									className: "ml-2 text-xs font-bold text-red-600",
									children: "Remover"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: draft.active,
								onChange: (e) => setDraft({
									...draft,
									active: e.target.checked
								})
							}), "Ativo no checkout"]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { PaymentsAdmin as component };
