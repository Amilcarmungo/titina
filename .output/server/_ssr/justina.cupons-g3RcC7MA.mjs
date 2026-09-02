import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { V as Pencil, h as Ticket, m as Trash2, z as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useCoupons, t as couponActions } from "./coupons-store-K_R4Qx57.mjs";
import { i as AdminSelect, n as AdminInput, r as AdminModal, t as AdminField } from "./AdminModal-DXEoyymL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.cupons-g3RcC7MA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	code: "",
	type: "percent",
	value: 10,
	minOrder: 0,
	description: "",
	expires: "",
	active: true
};
function CouponsAdmin() {
	const coupons = useCoupons();
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const save = () => {
		if (!draft) return;
		if (!draft.code.trim()) {
			toast.error("Define o código do cupom.");
			return;
		}
		if (draft.value <= 0) {
			toast.error("O valor deve ser maior que zero.");
			return;
		}
		if (editing) couponActions.update(editing, {
			...draft,
			code: draft.code.trim().toUpperCase()
		});
		else couponActions.add(draft);
		toast.success(editing ? "Cupom atualizado" : "Cupom criado");
		setDraft(null);
		setEditing(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-black tracking-tight",
					children: "Cupons"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [coupons.length, " cupom(ns) · usados no checkout"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setEditing(null);
						setDraft({ ...empty });
					},
					className: "inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Novo cupom"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: coupons.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-11 w-11 flex-none place-items-center rounded-xl bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-mono text-sm font-black tracking-wider",
									children: c.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground",
									children: [c.type === "percent" ? `${c.value}% OFF` : `${formatKz(c.value)} OFF`, c.minOrder > 0 ? ` · mín. ${formatKz(c.minOrder)}` : ""]
								}),
								c.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-[11px] text-muted-foreground",
									children: c.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-2 py-0.5 text-[10px] font-bold ${c.active ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`,
										children: c.active ? "Ativo" : "Inativo"
									}), c.expires && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-muted-foreground",
										children: ["expira ", c.expires]
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setEditing(c.code);
									setDraft({ ...c });
								},
								className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border py-1.5 text-xs font-bold hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Editar"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => couponActions.update(c.code, { active: !c.active }),
								className: "rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted",
								children: c.active ? "Desativar" : "Ativar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									couponActions.remove(c.code);
									toast.success("Cupom removido");
								},
								className: "grid h-8 w-8 place-items-center rounded-full border border-border text-destructive hover:bg-destructive/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						]
					})]
				}, c.code))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
				open: !!draft,
				onClose: () => {
					setDraft(null);
					setEditing(null);
				},
				title: editing ? "Editar cupom" : "Novo cupom",
				subtitle: "Os cupons ativos podem ser aplicados na página de finalizar compra.",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setDraft(null);
						setEditing(null);
					},
					className: "rounded-full border border-border px-4 py-2 text-sm font-bold",
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					className: "rounded-full bg-foreground px-5 py-2 text-sm font-bold text-background",
					children: "Guardar"
				})] }),
				children: draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Código",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
								value: draft.code,
								onChange: (e) => setDraft({
									...draft,
									code: e.target.value.toUpperCase()
								}),
								placeholder: "BAZARIXY10"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Tipo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSelect, {
								value: draft.type,
								onChange: (e) => setDraft({
									...draft,
									type: e.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "percent",
									children: "Percentagem (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "fixed",
									children: "Valor fixo (Kz)"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: draft.type === "percent" ? "Desconto (%)" : "Desconto (Kz)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
								type: "number",
								value: draft.value,
								onChange: (e) => setDraft({
									...draft,
									value: Number(e.target.value)
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Pedido mínimo (Kz)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
								type: "number",
								value: draft.minOrder,
								onChange: (e) => setDraft({
									...draft,
									minOrder: Number(e.target.value)
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Validade (dd/mm/aaaa)",
							hint: "Deixe vazio para não expirar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
								value: draft.expires ?? "",
								onChange: (e) => setDraft({
									...draft,
									expires: e.target.value
								}),
								placeholder: "31/12/2026"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Estado",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSelect, {
								value: draft.active ? "1" : "0",
								onChange: (e) => setDraft({
									...draft,
									active: e.target.value === "1"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "1",
									children: "Ativo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "0",
									children: "Inativo"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
								label: "Descrição",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
									value: draft.description ?? "",
									onChange: (e) => setDraft({
										...draft,
										description: e.target.value
									}),
									placeholder: "10% off na primeira compra"
								})
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { CouponsAdmin as component };
