import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { B as Pencil, J as MapPin, Kt as Bike, L as Power, R as Plus, _ as Store, j as RotateCcw, p as Trash2, u as Truck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as shippingActions, c as useCarriers, l as useShippingSettings, n as PLATFORM_FEE, r as carrierActions, s as splitFreight, t as CARRIER_LABEL } from "./logistics-store-DuC-stwY.mjs";
import { n as AdminInput, r as AdminModal, t as AdminField } from "./AdminModal-DXEoyymL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.logistica-E5DGgy7v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = () => ({
	name: "",
	type: "moto",
	phone: "",
	active: true,
	baseFee: 1500,
	perKm: 150,
	maxWeightKg: 10,
	etaText: "Mesmo dia",
	coverage: "Luanda",
	zones: []
});
var ICON = {
	transportadora: Truck,
	moto: Bike,
	retirada: Store
};
function LogisticsPage() {
	const carriers = useCarriers();
	const shippingSettings = useShippingSettings();
	const [modal, setModal] = (0, import_react.useState)(null);
	const [simKm, setSimKm] = (0, import_react.useState)(8);
	const active = carriers.filter((c) => c.active);
	const cheapest = (0, import_react.useMemo)(() => {
		const fees = active.filter((c) => c.type !== "retirada").map((c) => c.baseFee);
		return fees.length ? Math.min(...fees) : 0;
	}, [active]);
	const save = () => {
		if (!modal) return;
		if (!modal.name.trim()) {
			toast.error("Dê um nome à transportadora");
			return;
		}
		const { id, ...rest } = modal;
		if (id) {
			carrierActions.update(id, rest);
			toast.success("Frete atualizado");
		} else {
			carrierActions.add(rest);
			toast.success("Transportadora criada");
		}
		setModal(null);
	};
	const setZone = (zid, patch) => setModal((m) => m ? {
		...m,
		zones: m.zones.map((z) => z.id === zid ? {
			...z,
			...patch
		} : z)
	} : m);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-black tracking-tight",
					children: "Logística & fretes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Transportadoras, moto-boys e zonas de entrega · Bazarixy retém",
						" ",
						Math.round(PLATFORM_FEE * 100),
						"% do valor do frete"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							carrierActions.reset();
							shippingActions.reset();
							toast.success("Restaurado");
						},
						className: "inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), " Restaurar padrão"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setModal(empty()),
						className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Nova opção de entrega"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-gradient-to-br from-blue-500/10 to-transparent p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase text-muted-foreground",
							children: "Opções ativas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-black",
							children: active.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-gradient-to-br from-emerald-500/10 to-transparent p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase text-muted-foreground",
							children: "Frete mínimo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-black",
							children: formatKz(cheapest)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-gradient-to-br from-orange-500/10 to-pink-500/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase text-muted-foreground",
							children: "Comissão no frete"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-2xl font-black",
							children: [Math.round(PLATFORM_FEE * 100), "%"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-black",
						children: "Política de frete grátis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: "A regra é aplicada automaticamente no carrinho e no checkout."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-xs font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: shippingSettings.freeShippingEnabled,
							onChange: (e) => shippingActions.update({ freeShippingEnabled: e.target.checked }),
							className: "h-4 w-4 accent-foreground"
						}), "Ativar frete grátis"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
						label: "Compra mínima (Kz)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
							type: "number",
							min: 0,
							value: shippingSettings.freeShippingThreshold,
							onChange: (e) => shippingActions.update({ freeShippingThreshold: Number(e.target.value) })
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: carriers.map((c) => {
					const Icon = ICON[c.type];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white ${c.type === "moto" ? "bg-orange-500" : c.type === "transportadora" ? "bg-blue-600" : "bg-neutral-700"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-black",
													children: c.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold",
													children: CARRIER_LABEL[c.type]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded-full px-2 py-0.5 text-[10px] font-bold ${c.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}`,
													children: c.active ? "Ativo" : "Pausado"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-0.5 text-[11px] text-muted-foreground",
											children: [
												c.coverage,
												" · ",
												c.etaText,
												c.maxWeightKg ? ` · até ${c.maxWeightKg} kg` : "",
												c.phone ? ` · ${c.phone}` : ""
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs",
											children: [
												"Base",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold",
													children: formatKz(c.baseFee)
												}),
												c.perKm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
													" ",
													"· por km",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold",
														children: formatKz(c.perKm)
													})
												] }) : null
											]
										}),
										c.zones.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 flex flex-wrap gap-1.5",
											children: c.zones.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
													" ",
													z.name,
													" ·",
													" ",
													formatKz(z.fee),
													" · ",
													z.etaText
												]
											}, z.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 rounded-lg bg-muted/50 p-2 text-[11px]",
											children: [
												"Simulação ",
												simKm,
												" km:",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: formatKz(c.baseFee + c.perKm * simKm) }),
												" · Bazarixy",
												" ",
												formatKz(splitFreight(c.baseFee + c.perKm * simKm).platform),
												" ",
												"· transportadora",
												" ",
												formatKz(splitFreight(c.baseFee + c.perKm * simKm).carrier)
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => carrierActions.update(c.id, { active: !c.active }),
											title: "Ativar/pausar",
											className: "grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "h-3.5 w-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setModal({ ...c }),
											className: "grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												if (confirm("Remover opção de entrega?")) {
													carrierActions.remove(c.id);
													toast.success("Removido");
												}
											},
											className: "grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})
									]
								})
							]
						})
					}, c.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-black",
						children: "Simulador de distância"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Ajuste os km para comparar o custo de cada opção."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 1,
						max: 60,
						value: simKm,
						onChange: (e) => setSimKm(Number(e.target.value)),
						className: "mt-3 w-full accent-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs font-bold",
						children: [simKm, " km"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
				open: !!modal,
				onClose: () => setModal(null),
				title: modal?.id ? "Editar entrega" : "Nova opção de entrega",
				subtitle: "Taxas, cobertura e zonas",
				size: "lg",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setModal(null),
					className: "rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted",
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					className: "rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background",
					children: "Salvar"
				})] }),
				children: modal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Nome",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: modal.name,
										onChange: (e) => setModal({
											...modal,
											name: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Tipo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: modal.type,
										onChange: (e) => setModal({
											...modal,
											type: e.target.value
										}),
										className: "w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "transportadora",
												children: "Transportadora"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "moto",
												children: "Moto-boy"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "retirada",
												children: "Retirada na loja"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Telefone",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: modal.phone ?? "",
										onChange: (e) => setModal({
											...modal,
											phone: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Cobertura",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: modal.coverage ?? "",
										onChange: (e) => setModal({
											...modal,
											coverage: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Taxa base (Kz)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										type: "number",
										value: modal.baseFee,
										onChange: (e) => setModal({
											...modal,
											baseFee: Number(e.target.value)
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Preço por km (Kz)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										type: "number",
										value: modal.perKm,
										onChange: (e) => setModal({
											...modal,
											perKm: Number(e.target.value)
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Peso máximo (kg)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										type: "number",
										value: modal.maxWeightKg ?? 0,
										onChange: (e) => setModal({
											...modal,
											maxWeightKg: Number(e.target.value)
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Prazo estimado",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: modal.etaText ?? "",
										onChange: (e) => setModal({
											...modal,
											etaText: e.target.value
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: modal.active,
								onChange: (e) => setModal({
									...modal,
									active: e.target.checked
								}),
								className: "h-4 w-4 accent-foreground"
							}), "Disponível no checkout"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-black",
									children: "Zonas de entrega"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setModal({
										...modal,
										zones: [...modal.zones, {
											id: `z-${Date.now()}`,
											name: "Nova zona",
											fee: modal.baseFee,
											etaText: "24h"
										}]
									}),
									className: "inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Zona"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-2",
								children: [modal.zones.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 sm:grid-cols-[1fr_120px_120px_40px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
											value: z.name,
											onChange: (e) => setZone(z.id, { name: e.target.value }),
											placeholder: "Zona"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
											type: "number",
											value: z.fee,
											onChange: (e) => setZone(z.id, { fee: Number(e.target.value) }),
											placeholder: "Kz"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
											value: z.etaText,
											onChange: (e) => setZone(z.id, { etaText: e.target.value }),
											placeholder: "Prazo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setModal({
												...modal,
												zones: modal.zones.filter((x) => x.id !== z.id)
											}),
											className: "grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})
									]
								}, z.id)), modal.zones.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Sem zonas — será usada a taxa base + km."
								})]
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { LogisticsPage as component };
