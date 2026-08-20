import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useAllProducts, n as productActions } from "./products-store-Hd0VqZmZ.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Pencil, Ct as Eye, R as Plus, Yt as ArrowRightLeft, it as Layers, n as X, nt as LayoutList, ot as Info, p as Trash2, st as Image } from "../_libs/lucide-react.mjs";
import { n as useCategories, t as categoryActions } from "./categories-store-DOmO1cei.mjs";
import { n as AdminInput, r as AdminModal, t as AdminField } from "./AdminModal-DXEoyymL.mjs";
import { n as uploadImageFile, t as storagePaths } from "./upload-DwfJK3EA.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { t as AdminTabs } from "./AdminTabs-4tAQj8U4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.categorias-BFCnMOFC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoriesPage() {
	const cats = useCategories();
	const products = useAllProducts();
	const [edit, setEdit] = (0, import_react.useState)(null);
	const [drawer, setDrawer] = (0, import_react.useState)(null);
	const openNew = () => setEdit({
		slug: null,
		name: "",
		image: "",
		title: "",
		subtitle: "Coleção exclusiva"
	});
	const save = () => {
		if (!edit) return;
		if (!edit.name.trim()) {
			toast.error("Nome obrigatório");
			return;
		}
		if (edit.slug) {
			categoryActions.update(edit.slug, {
				name: edit.name,
				image: edit.image || void 0,
				title: edit.title,
				subtitle: edit.subtitle
			});
			toast.success("Categoria atualizada");
		} else {
			const slug = edit.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
			categoryActions.add({
				slug,
				name: edit.name,
				image: edit.image || void 0,
				title: edit.title,
				subtitle: edit.subtitle,
				subcategories: []
			});
			toast.success("Categoria criada");
		}
		setEdit(null);
	};
	const readFile = (f) => {
		uploadImageFile(f, storagePaths.category(edit?.slug ?? "novas", f.name)).then((url) => {
			if (url) setEdit((m) => m ? {
				...m,
				image: url
			} : m);
		});
	};
	const counts = (0, import_react.useMemo)(() => {
		const m = {};
		products.forEach((p) => {
			m[p.category] = (m[p.category] ?? 0) + 1;
		});
		return m;
	}, [products]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-black tracking-tight",
					children: "Categorias"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [cats.length, " categoria(s). Clique numa categoria para gerir produtos e subcategorias."]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openNew,
					className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Nova categoria"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setDrawer(c.slug),
					className: "group rounded-2xl bg-background text-left shadow-[var(--shadow-card)] overflow-hidden transition hover:-translate-y-0.5 hover:shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[16/9] bg-muted",
						children: [
							c.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.image,
								alt: c.name,
								className: "h-full w-full object-cover transition group-hover:scale-105"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full items-center justify-center text-4xl",
								children: c.emoji ?? "🏷️"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute bottom-3 left-4 font-display text-xl font-black text-white drop-shadow-lg",
								children: c.title ?? c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "absolute top-3 right-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-black",
								children: [counts[c.slug] ?? 0, " produtos"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Slug: ", c.slug]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-[11px] text-muted-foreground",
								children: [c.subcategories.length, " subcategoria(s)"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3" }), " Abrir"]
						})]
					})]
				}, c.slug))
			}),
			drawer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryDrawer, {
				slug: drawer,
				onClose: () => setDrawer(null),
				onEdit: () => {
					const c = cats.find((x) => x.slug === drawer);
					if (c) setEdit({
						slug: c.slug,
						name: c.name,
						image: c.image ?? "",
						title: c.title ?? c.name,
						subtitle: c.subtitle ?? ""
					});
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
				open: !!edit,
				onClose: () => setEdit(null),
				title: edit?.slug ? "Editar categoria" : "Nova categoria",
				subtitle: "Nome, imagem de capa e texto do banner",
				size: "md",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setEdit(null),
					className: "rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted",
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					className: "rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background shadow-lg shadow-foreground/20",
					children: "Salvar"
				})] }),
				children: edit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Nome",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
								value: edit.name,
								onChange: (e) => setEdit({
									...edit,
									name: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Título no banner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
								value: edit.title,
								onChange: (e) => setEdit({
									...edit,
									title: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Subtítulo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
								value: edit.subtitle,
								onChange: (e) => setEdit({
									...edit,
									subtitle: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Imagem de capa",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "cat-file",
										type: "file",
										accept: "image/*",
										className: "hidden",
										onChange: (e) => {
											const f = e.target.files?.[0];
											if (f) readFile(f);
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "cat-file",
										className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4" }), " Enviar"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "url",
										value: edit.image.startsWith("data:") ? "" : edit.image,
										onChange: (e) => setEdit({
											...edit,
											image: e.target.value
										}),
										placeholder: "ou cole URL",
										className: "min-w-[200px] flex-1 rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
									}),
									edit.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: edit.image,
										alt: "",
										className: "h-16 w-24 rounded-lg object-cover ring-1 ring-border"
									})
								]
							})
						})
					]
				})
			})
		]
	});
}
function CategoryDrawer({ slug, onClose, onEdit }) {
	const cats = useCategories();
	const products = useAllProducts();
	const cat = cats.find((c) => c.slug === slug);
	const [tab, setTab] = (0, import_react.useState)("products");
	const [subInput, setSubInput] = (0, import_react.useState)("");
	const inCat = (0, import_react.useMemo)(() => products.filter((p) => p.category === slug), [products, slug]);
	if (!cat) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		open: true,
		onClose,
		title: cat.title ?? cat.name,
		subtitle: `${inCat.length} produto(s) · ${cat.subcategories.length} subcategoria(s)`,
		size: "xl",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					if (confirm("Excluir categoria?")) {
						categoryActions.remove(slug);
						toast.success("Removida");
						onClose();
					}
				},
				className: "mr-auto rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Excluir categoria"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onEdit,
				className: "rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Editar detalhes"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background",
				children: "Fechar"
			})
		] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center gap-4 rounded-2xl bg-gradient-to-br from-muted/60 to-muted/20 p-4",
				children: [cat.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: cat.image,
					alt: "",
					className: "h-16 w-24 rounded-xl object-cover ring-1 ring-border"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-16 w-24 place-items-center rounded-xl bg-muted text-2xl",
					children: "🏷️"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-black",
							children: cat.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: cat.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[10px] uppercase tracking-wider text-muted-foreground",
							children: ["slug: ", cat.slug]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTabs, {
				active: tab,
				onChange: setTab,
				tabs: [
					{
						id: "products",
						label: "Produtos",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutList, { className: "h-3.5 w-3.5" }),
						badge: inCat.length
					},
					{
						id: "subs",
						label: "Subcategorias",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3.5 w-3.5" }),
						badge: cat.subcategories.length
					},
					{
						id: "info",
						label: "Info",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5" })
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					tab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [inCat.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-8 text-center text-sm text-muted-foreground",
							children: "Nenhum produto nesta categoria."
						}), inCat.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3 rounded-xl border border-border p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.image,
									alt: "",
									className: "h-12 w-12 rounded-lg object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "line-clamp-1 text-sm font-bold",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-sale",
										children: formatKz(p.price)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										defaultValue: "",
										onChange: (e) => {
											const target = e.target.value;
											if (!target) return;
											productActions.moveCategory(p.id, target);
											toast.success(`Movido para "${cats.find((c) => c.slug === target)?.name}"`);
											e.target.value = "";
										},
										className: "rounded-lg border border-border bg-background px-2 py-1.5 text-xs font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Mover para…"
										}), cats.filter((c) => c.slug !== slug).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c.slug,
											children: c.name
										}, c.slug))]
									})]
								})
							]
						}, p.id))]
					}),
					tab === "subs" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: subInput,
								onChange: (e) => setSubInput(e.target.value),
								placeholder: "Nova subcategoria",
								className: "flex-1 rounded-xl border border-border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									if (subInput.trim()) {
										categoryActions.addSub(slug, subInput.trim());
										setSubInput("");
									}
								},
								className: "rounded-full bg-foreground px-5 py-2 text-sm font-bold text-background inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Adicionar"]
							})]
						}),
						cat.subcategories.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nenhuma subcategoria."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: cat.subcategories.map((s) => {
								const img = cat.subImages?.[s];
								const onFile = (f) => {
									uploadImageFile(f, storagePaths.category(`${slug}/${s}`, f.name)).then((url) => {
										if (url) categoryActions.setSubImage(slug, s, url);
									});
								};
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-xl border border-border p-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "relative grid h-14 w-14 cursor-pointer place-items-center overflow-hidden rounded-full bg-muted ring-1 ring-border",
											children: [img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: img,
												alt: s,
												className: "h-full w-full object-cover"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
												className: "hidden",
												onChange: (e) => {
													const f = e.target.files?.[0];
													if (f) onFile(f);
												}
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1 truncate text-sm font-bold",
											children: s
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => categoryActions.removeSub(slug, s),
											className: "grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
										})
									]
								}, s);
							})
						})
					] }),
					tab === "info" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Nome:"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: cat.name
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Título:"
								}),
								" ",
								cat.title ?? "—"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Subtítulo:"
								}),
								" ",
								cat.subtitle ?? "—"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Slug:"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "rounded bg-muted px-1.5 py-0.5 text-xs",
									children: cat.slug
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Produtos:"
								}),
								" ",
								inCat.length
							] })
						]
					})
				]
			})
		]
	});
}
//#endregion
export { CategoriesPage as component };
