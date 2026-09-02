import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useAllProducts } from "./products-store-DBaquvrN.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { B as Pencil, H as Package, R as Plus, Xt as ArrowUpRight, _ as Store, p as Trash2, st as Image } from "../_libs/lucide-react.mjs";
import { n as shopActions, r as useShops } from "./shops-store-Dm5LimXI.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as AdminTextarea, n as AdminInput, r as AdminModal, t as AdminField } from "./AdminModal-DXEoyymL.mjs";
import { n as uploadImageFile, t as storagePaths } from "./upload-B3FhhBx-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.lojas-Dtmcpsbn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = () => ({
	id: null,
	name: "",
	slug: "",
	logo: "",
	cover: "",
	description: "",
	ownerName: ""
});
function ShopsPage() {
	const shops = useShops();
	const products = useAllProducts();
	const [modal, setModal] = (0, import_react.useState)(null);
	const counts = (0, import_react.useMemo)(() => {
		const m = {};
		products.forEach((p) => {
			const s = p.shopId ?? "main";
			m[s] = (m[s] ?? 0) + 1;
		});
		return m;
	}, [products]);
	const openNew = () => setModal(empty());
	const openEdit = (s) => setModal({
		id: s.id,
		name: s.name,
		slug: s.slug,
		logo: s.logo ?? "",
		cover: s.cover ?? "",
		description: s.description ?? "",
		ownerName: s.ownerName ?? ""
	});
	const save = () => {
		if (!modal) return;
		if (!modal.name.trim()) {
			toast.error("Nome obrigatório");
			return;
		}
		const slug = modal.slug || modal.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
		if (modal.id) {
			shopActions.update(modal.id, {
				name: modal.name,
				slug,
				logo: modal.logo || void 0,
				cover: modal.cover || void 0,
				description: modal.description,
				ownerName: modal.ownerName
			});
			toast.success("Loja atualizada");
		} else {
			shopActions.add({
				name: modal.name,
				slug,
				logo: modal.logo || void 0,
				cover: modal.cover || void 0,
				description: modal.description,
				ownerName: modal.ownerName
			});
			toast.success("Loja criada");
		}
		setModal(null);
	};
	const readFile = async (key, f) => {
		const url = await uploadImageFile(f, storagePaths.shop(modal?.id ?? "novas", f.name));
		if (url) setModal((m) => m ? {
			...m,
			[key]: url
		} : m);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-black tracking-tight",
					children: "Lojas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [shops.length, " loja(s) · Cada loja tem seus produtos, pedidos e avaliações"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openNew,
					className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Nova loja"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: shops.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group overflow-hidden rounded-2xl bg-background shadow-[var(--shadow-card)] transition hover:shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[16/8] bg-gradient-to-br from-muted to-muted/60",
						children: [s.cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: s.cover,
							alt: "",
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-full place-items-center text-4xl opacity-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative px-4 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "-mt-8 flex items-end justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-background ring-4 ring-background shadow-lg",
									children: s.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: s.logo,
										alt: "",
										className: "h-full w-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-6 w-6 text-muted-foreground" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => openEdit(s),
										className: "grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
									}), s.id !== "main" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (confirm("Excluir loja?")) {
												shopActions.remove(s.id);
												toast.success("Removida");
											}
										},
										className: "grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg font-black",
										children: s.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground",
										children: [
											"/",
											s.slug,
											" · ",
											s.ownerName || "Sem responsável"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
										children: s.description || "—"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3.5 w-3.5" }),
										" ",
										counts[s.id] ?? 0,
										" ",
										"produto(s)"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/justina/lojas/$id",
									params: { id: s.id },
									className: "inline-flex items-center gap-1 font-bold text-foreground",
									children: ["Abrir loja ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" })]
								})]
							})
						]
					})]
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
				open: !!modal,
				onClose: () => setModal(null),
				title: modal?.id ? "Editar loja" : "Nova loja",
				subtitle: "Nome, marca e responsável",
				size: "lg",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setModal(null),
					className: "rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted",
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					className: "rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background shadow-lg shadow-foreground/20",
					children: "Salvar"
				})] }),
				children: modal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Nome da loja",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
								value: modal.name,
								onChange: (e) => setModal({
									...modal,
									name: e.target.value
								}),
								placeholder: "Ex.: Bazarixy Beleza"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Slug (URL)",
							hint: "Deixe vazio para gerar automaticamente",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
								value: modal.slug,
								onChange: (e) => setModal({
									...modal,
									slug: e.target.value
								}),
								placeholder: "bazarixy-beleza"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Responsável",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
								value: modal.ownerName,
								onChange: (e) => setModal({
									...modal,
									ownerName: e.target.value
								}),
								placeholder: "Nome do responsável"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Logo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "s-logo",
										type: "file",
										accept: "image/*",
										className: "hidden",
										onChange: (e) => {
											const f = e.target.files?.[0];
											if (f) readFile("logo", f);
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "s-logo",
										className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-bold hover:bg-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-3.5 w-3.5" }), " Enviar"]
									}),
									modal.logo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: modal.logo,
										alt: "",
										className: "h-12 w-12 rounded-lg object-cover ring-1 ring-border"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
								label: "Capa (cover)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "s-cover",
											type: "file",
											accept: "image/*",
											className: "hidden",
											onChange: (e) => {
												const f = e.target.files?.[0];
												if (f) readFile("cover", f);
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											htmlFor: "s-cover",
											className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-bold hover:bg-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-3.5 w-3.5" }), " Enviar"]
										}),
										modal.cover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: modal.cover,
											alt: "",
											className: "h-12 w-24 rounded-lg object-cover ring-1 ring-border"
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
								label: "Descrição",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTextarea, {
									rows: 3,
									value: modal.description,
									onChange: (e) => setModal({
										...modal,
										description: e.target.value
									}),
									placeholder: "Sobre esta loja…"
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
export { ShopsPage as component };
