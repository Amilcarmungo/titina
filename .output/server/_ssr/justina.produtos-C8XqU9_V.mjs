import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as useShops } from "./shops-store-CX-UvhEW.mjs";
import { i as useAllProducts, n as productActions } from "./products-store-TDcUsz9F.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useCategories } from "./categories-store-C4Vdw11E.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { $t as ArrowLeft, B as Pencil, H as Package, R as Plus, Rt as ChevronRight, V as Palette, Vt as Check, Zt as ArrowRight, b as Sparkle, et as ListChecks, g as Tag, k as Search, lt as ImagePlus, n as X, ot as Info, p as Trash2, st as Image, v as Star, yt as Funnel, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { a as AdminTextarea, i as AdminSelect, n as AdminInput, r as AdminModal, t as AdminField } from "./AdminModal-DXEoyymL.mjs";
import { n as uploadImageFile, t as storagePaths } from "./upload-D4601ayU.mjs";
import { n as colorName, t as COLOR_PALETTE } from "./colors-IpFQMiOM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.produtos-C8XqU9_V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImageGallery({ images, onChange, onFilesAdded, max = 5 }) {
	const inputRef = (0, import_react.useRef)(null);
	const urlRef = (0, import_react.useRef)(null);
	const addFiles = async (files) => {
		if (!files) return;
		const remaining = max - images.length;
		if (remaining <= 0) return;
		const arr = Array.from(files).slice(0, remaining);
		const staged = {};
		const previews = arr.map((file) => {
			const preview = URL.createObjectURL(file);
			staged[preview] = file;
			return preview;
		});
		if (previews.length) {
			onFilesAdded?.(staged);
			onChange([...images, ...previews]);
		}
	};
	const addUrl = () => {
		const v = urlRef.current?.value.trim();
		if (!v || images.length >= max) return;
		onChange([...images, v]);
		if (urlRef.current) urlRef.current.value = "";
	};
	const remove = (i) => onChange(images.filter((_, x) => x !== i));
	const move = (i, dir) => {
		const j = i + dir;
		if (j < 0 || j >= images.length) return;
		const next = [...images];
		[next[i], next[j]] = [next[j], next[i]];
		onChange(next);
	};
	const makeCover = (i) => {
		if (i === 0) return;
		onChange([images[i], ...images.filter((_, x) => x !== i)]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2 sm:grid-cols-5",
				children: [images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `group relative aspect-square overflow-hidden rounded-xl border-2 ${i === 0 ? "border-foreground" : "border-border"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: "",
							className: "h-full w-full object-cover"
						}),
						i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-1 top-1 rounded-full bg-foreground px-1.5 py-0.5 text-[9px] font-bold text-background",
							children: "CAPA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 flex flex-col justify-between bg-black/0 p-1 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => remove(i),
									className: "grid h-6 w-6 place-items-center rounded-full bg-white text-red-600 shadow",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => move(i, -1),
										className: "grid h-6 w-6 place-items-center rounded-full bg-white text-foreground shadow disabled:opacity-40",
										disabled: i === 0,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" })
									}),
									i !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => makeCover(i),
										className: "grid h-6 w-6 place-items-center rounded-full bg-white text-amber-600 shadow",
										title: "Definir como capa",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => move(i, 1),
										className: "grid h-6 w-6 place-items-center rounded-full bg-white text-foreground shadow disabled:opacity-40",
										disabled: i === images.length - 1,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })
									})
								]
							})]
						})
					]
				}, i)), images.length < max && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => inputRef.current?.click(),
					className: "grid aspect-square place-items-center rounded-xl border-2 border-dashed border-border text-muted-foreground transition hover:border-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold",
							children: "Adicionar"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/*",
				multiple: true,
				className: "hidden",
				onChange: (e) => {
					addFiles(e.target.files);
					e.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-muted-foreground",
					children: [
						images.length,
						"/",
						max,
						" foto(s). A primeira imagem é a capa."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex flex-1 items-center gap-2 min-w-[220px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: urlRef,
						type: "url",
						placeholder: "ou cole URL da imagem",
						className: "flex-1 rounded-lg border border-border bg-transparent px-3 py-2 text-xs outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: addUrl,
						disabled: images.length >= max,
						className: "rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background disabled:opacity-40",
						children: "Adicionar URL"
					})]
				})]
			})
		]
	});
}
var empty = (cat, shop) => ({
	name: "",
	price: "",
	oldPrice: "",
	category: cat,
	subcategory: "",
	shopId: shop,
	images: [],
	description: "",
	sizes: [],
	colors: [],
	variants: [],
	attributes: [],
	brand: "",
	sku: "",
	stock: ""
});
var STEPS = [
	{
		id: "basic",
		label: "Básico",
		icon: Info
	},
	{
		id: "attrs",
		label: "Atributos",
		icon: ListChecks
	},
	{
		id: "price",
		label: "Preço & stock",
		icon: Tag
	},
	{
		id: "media",
		label: "Mídia",
		icon: Image
	},
	{
		id: "variants",
		label: "Variantes",
		icon: Palette
	},
	{
		id: "review",
		label: "Rever",
		icon: Check
	}
];
/** Sugestões de atributos por tipo de produto — funciona para roupa, eletrónica, casa, etc. */
var ATTR_PRESETS = [
	{
		label: "Roupa & calçado",
		attrs: [{
			name: "Tamanho",
			values: [
				"P",
				"M",
				"G",
				"GG"
			]
		}, {
			name: "Material",
			values: []
		}]
	},
	{
		label: "Telemóveis & PC",
		attrs: [
			{
				name: "Armazenamento",
				values: [
					"64GB",
					"128GB",
					"256GB"
				]
			},
			{
				name: "Memória RAM",
				values: ["4GB", "8GB"]
			},
			{
				name: "Marca",
				values: []
			}
		]
	},
	{
		label: "Eletrodomésticos",
		attrs: [{
			name: "Voltagem",
			values: ["110V", "220V"]
		}, {
			name: "Potência",
			values: []
		}]
	},
	{
		label: "Beleza",
		attrs: [{
			name: "Volume",
			values: [
				"30ml",
				"50ml",
				"100ml"
			]
		}, {
			name: "Tipo de pele",
			values: []
		}]
	},
	{
		label: "Casa & decoração",
		attrs: [{
			name: "Dimensões",
			values: []
		}, {
			name: "Material",
			values: []
		}]
	}
];
function ProductsPage() {
	const products = useAllProducts();
	const cats = useCategories();
	const shops = useShops();
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [modal, setModal] = (0, import_react.useState)(null);
	const [step, setStep] = (0, import_react.useState)(0);
	const [pendingFiles, setPendingFiles] = (0, import_react.useState)({});
	const [publishing, setPublishing] = (0, import_react.useState)(false);
	const [publishProgress, setPublishProgress] = (0, import_react.useState)(0);
	const [publishedLink, setPublishedLink] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		let list = products;
		if (filter !== "all") list = list.filter((p) => p.category === filter);
		const term = q.trim().toLowerCase();
		if (term) list = list.filter((p) => p.name.toLowerCase().includes(term));
		return list;
	}, [
		products,
		q,
		filter
	]);
	const countByCat = (0, import_react.useMemo)(() => {
		const m = {};
		products.forEach((p) => {
			m[p.category] = (m[p.category] ?? 0) + 1;
		});
		return m;
	}, [products]);
	const openNew = () => {
		setStep(0);
		setPendingFiles({});
		setModal({
			editingId: null,
			draft: empty(cats[0]?.slug ?? "outros", shops[0]?.id ?? "main")
		});
	};
	const openEdit = (p) => {
		setStep(0);
		setPendingFiles({});
		setModal({
			editingId: p.id,
			draft: {
				name: p.name,
				price: String(p.price),
				oldPrice: p.oldPrice ? String(p.oldPrice) : "",
				category: p.category,
				subcategory: p.subcategory ?? "",
				shopId: p.shopId ?? shops[0]?.id ?? "main",
				images: p.images && p.images.length ? p.images : [p.image],
				description: p.description,
				sizes: p.sizes,
				colors: p.colors,
				variants: p.variants ?? [],
				attributes: p.attributes ?? [],
				brand: p.brand ?? "",
				sku: p.sku ?? "",
				stock: p.stock != null ? String(p.stock) : ""
			}
		});
	};
	const save = async () => {
		if (!modal) return;
		const d = modal.draft;
		const price = parseFloat(d.price);
		const oldPrice = d.oldPrice ? parseFloat(d.oldPrice) : void 0;
		if (d.name.trim().length < 3) {
			toast.error("Escreva um nome com pelo menos 3 letras");
			setStep(0);
			return;
		}
		if (!d.category) {
			toast.error("Escolha a categoria");
			setStep(0);
			return;
		}
		if (!Number.isFinite(price) || price <= 0) {
			toast.error("Escreva um preço válido em Kz");
			setStep(2);
			return;
		}
		if (oldPrice != null && oldPrice <= price) {
			toast.error("O preço antigo tem de ser maior que o preço actual");
			setStep(2);
			return;
		}
		if (!d.images.length) {
			toast.error("Adicione pelo menos 1 imagem do produto");
			setStep(3);
			return;
		}
		setPublishing(true);
		setPublishProgress(3);
		const totalUploads = Object.keys(pendingFiles).length || 1;
		let completedUploads = 0;
		const upload = async (value, folder) => {
			const file = pendingFiles[value];
			if (!file) return value;
			const url = await uploadImageFile(file, storagePaths.product(`${modal.editingId ?? "new"}-${Date.now()}${folder}`, file.name), {
				silent: true,
				onProgress: (percent) => setPublishProgress(Math.min(88, Math.round((completedUploads + percent / 100) / totalUploads * 88)))
			});
			completedUploads += 1;
			setPublishProgress(Math.min(88, Math.round(completedUploads / totalUploads * 88)));
			return url ?? "";
		};
		const images = [];
		for (const [index, image] of d.images.entries()) {
			const uploaded = await upload(image, `/image-${index}`);
			if (uploaded) images.push(uploaded);
		}
		if (!images.length) {
			setPublishing(false);
			toast.error("Não foi possível enviar as imagens. Tente novamente.");
			return;
		}
		const variants = d.variants.length ? [] : void 0;
		if (variants) for (const [i, v] of d.variants.entries()) {
			const extra = [];
			for (const [j, image] of (v.images ?? []).entries()) {
				const uploaded = await upload(image, `/variant-${i}-${j}`);
				if (uploaded) extra.push(uploaded);
			}
			variants.push({
				...v,
				image: await upload(v.image || d.images[i] || d.images[0] || "", `/variant-${i}`),
				images: extra
			});
		}
		const payload = {
			name: d.name,
			price,
			oldPrice,
			category: d.category,
			subcategory: d.subcategory || void 0,
			shopId: d.shopId || void 0,
			image: images[0],
			images,
			variants: variants ? variants.map((v, i) => ({
				...v,
				label: v.label.trim() || colorName(v.color) || v.color?.trim() || `Opção ${i + 1}`,
				image: v.image || images[i] || images[0] || ""
			})) : void 0,
			description: d.description,
			sizes: d.sizes,
			colors: d.colors,
			attributes: d.attributes.filter((a) => a.name.trim()).length ? d.attributes.filter((a) => a.name.trim()) : void 0,
			brand: d.brand || void 0,
			sku: d.sku || void 0,
			stock: d.stock ? parseInt(d.stock, 10) : void 0,
			rating: 5,
			reviews: 0,
			sold: 0
		};
		setPublishProgress(92);
		let productId;
		try {
			if (modal.editingId) {
				productId = modal.editingId;
				await productActions.update(productId, payload);
			} else {
				const result = productActions.add(payload);
				productId = result.id;
				await result.published;
			}
		} catch (err) {
			setPublishing(false);
			setPublishProgress(0);
			toast.error(err?.message || "Não foi possível guardar no banco de dados. Tente novamente.");
			return;
		}
		setPublishProgress(100);
		const link = `${window.location.origin}/product/${productId}`;
		setPublishedLink(link);
		toast.success(modal.editingId ? "Produto atualizado no banco de dados" : "Produto publicado no banco de dados");
		setPublishing(false);
		Object.keys(pendingFiles).forEach((url) => URL.revokeObjectURL(url));
		setPendingFiles({});
		setModal(null);
	};
	const updateDraft = (patch) => modal && setModal({
		...modal,
		draft: {
			...modal.draft,
			...patch
		}
	});
	const currentCat = modal ? cats.find((c) => c.slug === modal.draft.category) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-black tracking-tight",
					children: "Produtos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [products.length, " produto(s) no catálogo"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: openNew,
					className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/20 hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Adicionar produto"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 min-w-[200px] items-center gap-2 rounded-xl border border-border px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Pesquisar por nome…",
							className: "w-full bg-transparent text-sm outline-none"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3.5 w-3.5 text-muted-foreground mx-1" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setFilter("all"),
								className: `whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${filter === "all" ? "bg-foreground text-background" : "bg-muted"}`,
								children: [
									"Todas (",
									products.length,
									")"
								]
							}),
							cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setFilter(c.slug),
								className: `whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${filter === c.slug ? "bg-foreground text-background" : "bg-muted"}`,
								children: [
									c.name,
									" (",
									countByCat[c.slug] ?? 0,
									")"
								]
							}, c.slug))
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-background shadow-[var(--shadow-card)] overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/50 text-left text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Produto"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Categoria"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Preço"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: "Variantes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 w-32",
									children: "Ações"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-border",
							children: [filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: p.image,
													alt: "",
													className: "h-12 w-12 rounded-lg object-cover"
												}), p.images && p.images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "absolute -bottom-1 -right-1 rounded-full bg-foreground px-1.5 py-0.5 text-[9px] font-bold text-background",
													children: ["+", p.images.length - 1]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "line-clamp-1 font-bold",
													children: p.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "line-clamp-1 text-[11px] text-muted-foreground",
													children: p.description || "—"
												})]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3 text-xs",
										children: [cats.find((c) => c.slug === p.category)?.name ?? p.category, p.subcategory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-1 text-muted-foreground",
											children: ["· ", p.subcategory]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 font-bold text-sale whitespace-nowrap",
										children: formatKz(p.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-xs text-muted-foreground",
										children: p.variants?.length ?? 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => openEdit(p),
												className: "grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													if (confirm("Remover produto?")) productActions.remove(p.id).then(() => toast.success("Removido do banco de dados")).catch((err) => toast.error(err?.message ?? "Não foi possível remover"));
												},
												className: "grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})]
										})
									})
								]
							}, p.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 5,
								className: "p-10 text-center text-sm text-muted-foreground",
								children: "Nenhum produto."
							}) })]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:hidden divide-y divide-border",
					children: [filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.image,
								alt: "",
								className: "h-14 w-14 rounded-lg object-cover"
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => openEdit(p),
								className: "grid h-8 w-8 place-items-center rounded-lg border border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									if (confirm("Remover?")) productActions.remove(p.id).then(() => toast.success("Removido do banco de dados")).catch((err) => toast.error(err?.message ?? "Não foi possível remover"));
								},
								className: "grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						]
					}, p.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-8 text-center text-sm text-muted-foreground",
						children: "Nenhum produto."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
				id: "bx-colors",
				children: COLOR_PALETTE.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: c.name }, c.hex))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
				open: !!modal,
				onClose: () => setModal(null),
				title: modal?.editingId ? "Editar produto" : "Novo produto",
				subtitle: "Publique um item completo — imagens, categoria e variantes.",
				size: "xl",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => step === 0 ? setModal(null) : setStep(step - 1),
					className: "inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted",
					children: step === 0 ? "Cancelar" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Anterior"] })
				}), step < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setStep(step + 1),
					className: "inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background shadow-lg shadow-foreground/20 hover:opacity-90",
					children: ["Seguinte ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					disabled: publishing,
					onClick: () => void save(),
					className: "inline-flex items-center gap-1.5 rounded-full px-6 py-2 text-sm font-black text-white shadow-lg disabled:opacity-60",
					style: { background: "linear-gradient(90deg,#f59e0b,#f43f7e)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }),
						" ",
						publishing ? "A publicar…" : modal?.editingId ? "Salvar alterações" : "Publicar produto"
					]
				})] }),
				children: modal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
							step,
							onStep: setStep
						}),
						publishing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-brand/40 bg-brand/10 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A publicar produto no Firebase…" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [publishProgress, "%"] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-2 overflow-hidden rounded-full bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-brand-strong transition-all",
									style: { width: `${publishProgress}%` }
								})
							})]
						}),
						STEPS[step].id === "basic" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
										label: "Nome do produto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
											value: modal.draft.name,
											onChange: (e) => updateDraft({ name: e.target.value }),
											placeholder: "Ex.: Vestido Midi Elegante / iPhone 13 128GB"
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Categoria",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSelect, {
										value: modal.draft.category,
										onChange: (e) => updateDraft({
											category: e.target.value,
											subcategory: ""
										}),
										children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c.slug,
											children: c.name
										}, c.slug))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Subcategoria",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminSelect, {
										value: modal.draft.subcategory,
										onChange: (e) => updateDraft({ subcategory: e.target.value }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "— nenhuma —"
										}), currentCat?.subcategories.map((sc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: sc,
											children: sc
										}, sc))]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Loja",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSelect, {
										value: modal.draft.shopId,
										onChange: (e) => updateDraft({ shopId: e.target.value }),
										children: shops.map((sh) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: sh.id,
											children: sh.name
										}, sh.id))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Marca (opcional)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: modal.draft.brand,
										onChange: (e) => updateDraft({ brand: e.target.value }),
										placeholder: "Samsung, Zara…"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
										label: "Descrição",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTextarea, {
											rows: 4,
											value: modal.draft.description,
											onChange: (e) => updateDraft({ description: e.target.value }),
											placeholder: "Detalhes, materiais, especificações…"
										})
									})
								})
							]
						}),
						STEPS[step].id === "attrs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttributesEditor, {
							attributes: modal.draft.attributes,
							onChange: (a) => updateDraft({ attributes: a }),
							sizes: modal.draft.sizes,
							onSizes: (sz) => updateDraft({ sizes: sz }),
							colors: modal.draft.colors,
							onColors: (c) => updateDraft({ colors: c })
						}),
						STEPS[step].id === "price" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Preço (Kz)",
									hint: "Valor exacto que o cliente vê, sem conversão",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: modal.draft.price,
										onChange: (e) => updateDraft({ price: e.target.value.replace(",", ".").replace(/[^0-9.]/g, "") }),
										placeholder: "Ex.: 12500"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Preço antigo (opcional)",
									hint: "Aparece riscado como oferta",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: modal.draft.oldPrice,
										onChange: (e) => updateDraft({ oldPrice: e.target.value.replace(",", ".").replace(/[^0-9.]/g, "") }),
										placeholder: "Ex.: 19900"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Stock (opcional)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: modal.draft.stock,
										onChange: (e) => updateDraft({ stock: e.target.value.replace(/[^0-9]/g, "") }),
										placeholder: "25"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "SKU (opcional)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: modal.draft.sku,
										onChange: (e) => updateDraft({ sku: e.target.value }),
										placeholder: "BX-0001"
									})
								})
							]
						}),
						STEPS[step].id === "media" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageGallery, {
							images: modal.draft.images,
							onChange: (imgs) => updateDraft({ images: imgs }),
							onFilesAdded: (files) => setPendingFiles((current) => ({
								...current,
								...files
							})),
							max: 5
						}),
						STEPS[step].id === "variants" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariantsEditor, {
							variants: modal.draft.variants,
							onChange: (v) => updateDraft({ variants: v }),
							basePrice: parseFloat(modal.draft.price) || 0,
							images: modal.draft.images,
							onFilesAdded: (files) => setPendingFiles((current) => ({
								...current,
								...files
							}))
						}),
						STEPS[step].id === "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-[200px_1fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [modal.draft.images[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: modal.draft.images[0],
									alt: "",
									className: "aspect-square w-full rounded-2xl object-cover ring-1 ring-border"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid aspect-square w-full place-items-center rounded-2xl border border-dashed border-border text-xs text-muted-foreground",
									children: "Sem imagem"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1.5",
									children: modal.draft.images.slice(1).map((im, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: im,
										alt: "",
										className: "h-11 w-11 rounded-lg object-cover ring-1 ring-border"
									}, i))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl font-black",
										children: modal.draft.name || "Sem nome"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-black text-sale",
										children: formatKz(parseFloat(modal.draft.price) || 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "space-y-1 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												"Categoria:",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
													className: "text-foreground",
													children: currentCat?.name ?? modal.draft.category
												}),
												modal.draft.subcategory ? ` · ${modal.draft.subcategory}` : ""
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												"Loja:",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
													className: "text-foreground",
													children: shops.find((sh) => sh.id === modal.draft.shopId)?.name ?? "—"
												})
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												"Imagens:",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
													className: "text-foreground",
													children: modal.draft.images.length
												}),
												" ",
												"· Variantes:",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
													className: "text-foreground",
													children: modal.draft.variants.length
												})
											] }),
											modal.draft.sizes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												"Tamanhos:",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
													className: "text-foreground",
													children: modal.draft.sizes.join(", ")
												})
											] }),
											modal.draft.colors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												"Cores:",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
													className: "text-foreground",
													children: modal.draft.colors.map(colorName).join(", ")
												})
											] }),
											modal.draft.attributes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												a.name,
												":",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
													className: "text-foreground",
													children: a.values.join(", ") || "—"
												})
											] }, a.name))
										]
									}),
									(!modal.draft.name || !modal.draft.price || modal.draft.images.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "rounded-xl bg-destructive/10 p-3 text-xs font-bold text-destructive",
										children: "Faltam dados obrigatórios: nome, preço e pelo menos 1 imagem."
									})
								]
							})]
						})
					]
				})
			}),
			publishedLink && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-x-4 bottom-5 z-[70] mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-background p-4 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-black text-emerald-700",
						children: "Produto publicado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate text-xs text-muted-foreground",
						children: publishedLink
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigator.clipboard?.writeText(publishedLink).then(() => toast.success("Link copiado")),
							className: "rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background",
							children: "Copiar link"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPublishedLink(null),
							className: "rounded-full border border-border px-4 py-2 text-xs font-bold",
							children: "Fechar"
						})]
					})
				]
			})
		]
	});
}
function VariantsEditor({ variants, onChange, basePrice, images, onFilesAdded }) {
	const add = () => onChange([...variants, {
		id: `v-${Date.now()}`,
		label: "",
		color: "",
		price: basePrice,
		image: images[variants.length] ?? images[0] ?? ""
	}]);
	const upd = (i, patch) => onChange(variants.map((v, x) => x === i ? {
		...v,
		...patch
	} : v));
	const rm = (i) => onChange(variants.filter((_, x) => x !== i));
	const readFile = (f, cb) => {
		const preview = URL.createObjectURL(f);
		onFilesAdded({ [preview]: f });
		cb(preview);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-dashed border-border bg-muted/30 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4 mt-0.5 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-foreground",
								children: "Variantes de produto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cada variante é uma versão da mesma família: carregue a foto de capa, escreva a cor/detalhe, defina o preço e junte até 3 fotos extra dessa cor. Se deixar o nome vazio, usamos a cor escrita." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: add,
							className: "rounded-full bg-foreground px-4 py-1.5 text-xs font-bold text-background whitespace-nowrap inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Adicionar variante"]
						})
					]
				})
			}),
			variants.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-sm text-muted-foreground",
				children: "Nenhuma variante ainda."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: variants.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-background p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-muted px-2.5 py-1 text-[11px] font-black",
							children: ["Variante ", i + 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-xs font-bold text-muted-foreground",
							children: v.label.trim() || colorName(v.color) || v.color?.trim() || "sem nome — usaremos a cor"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-20 w-20 place-items-center overflow-hidden rounded-xl border border-border bg-muted",
									children: v.image || images[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: v.image || images[0],
										alt: "",
										className: "h-full w-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-6 w-6 text-muted-foreground" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "absolute -bottom-1 -right-1 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-foreground text-background",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
										className: "hidden",
										onChange: (e) => {
											const f = e.target.files?.[0];
											if (f) readFile(f, (u) => upd(i, { image: u }));
											e.target.value = "";
										}
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid flex-1 gap-2 min-w-[200px] md:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
										label: "Nome da variante (opcional)",
										hint: "Vazio = usa a cor escrita",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
											value: v.label,
											onChange: (e) => upd(i, { label: e.target.value }),
											placeholder: "Ex.: Preto fosco"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
										label: "Cor",
										hint: "Escreva a cor como quer que o cliente veja",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
											list: "bx-colors",
											value: v.color ?? "",
											onChange: (e) => upd(i, { color: e.target.value }),
											placeholder: "Ex.: Vermelho, Azul-marinho…"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
										label: "Preço",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
											value: String(v.price),
											onChange: (e) => upd(i, { price: parseFloat(e.target.value) || 0 })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
										label: "Preço antigo",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
											value: v.oldPrice ? String(v.oldPrice) : "",
											onChange: (e) => upd(i, { oldPrice: e.target.value ? parseFloat(e.target.value) : void 0 })
										})
									}),
									images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "md:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
											label: "Usar uma imagem já carregada",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-1.5",
												children: images.map((im, x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => upd(i, { image: im }),
													className: `h-12 w-12 overflow-hidden rounded-lg ring-2 ${v.image === im ? "ring-foreground" : "ring-border"}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: im,
														alt: "",
														className: "h-full w-full object-cover"
													})
												}, x))
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "md:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
											label: "Mais fotos desta cor/detalhe",
											hint: "Até 3 fotos extra — o cliente vê-as ao tocar nesta cor",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [(v.images ?? []).map((im, x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: im,
														alt: "",
														className: "h-14 w-14 rounded-lg object-cover ring-1 ring-border"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => upd(i, { images: (v.images ?? []).filter((_, y) => y !== x) }),
														className: "absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-background text-destructive shadow ring-1 ring-border",
														"aria-label": "Remover foto",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
													})]
												}, x)), (v.images?.length ?? 0) < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "grid h-14 w-14 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "file",
														accept: "image/*",
														className: "hidden",
														onChange: (e) => {
															const f = e.target.files?.[0];
															if (f) readFile(f, (u) => upd(i, { images: [...v.images ?? [], u] }));
															e.target.value = "";
														}
													})]
												})]
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "md:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
											label: "Tamanhos desta variante (opcional)",
											hint: "Deixe vazio para usar os tamanhos gerais do produto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenInput, {
												values: v.sizes ?? [],
												onChange: (sz) => upd(i, { sizes: sz }),
												placeholder: "Adicionar tamanho…"
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "md:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
											label: "SKU (opcional)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
												value: v.sku ?? "",
												onChange: (e) => upd(i, { sku: e.target.value }),
												placeholder: "BX-VST-001"
											})
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => rm(i),
								className: "grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						]
					})]
				}, v.id))
			})
		]
	});
}
function Stepper({ step, onStep }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-1 overflow-x-auto no-scrollbar pb-1",
		children: STEPS.map((st, i) => {
			const active = i === step;
			const done = i < step;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onStep(i),
				className: "flex shrink-0 items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${active ? "bg-foreground text-background" : done ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(st.icon, { className: "h-3.5 w-3.5" }), st.label]
				}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-px w-4 ${done ? "bg-foreground" : "bg-border"}` })]
			}, st.id);
		})
	});
}
function TokenInput({ values, onChange, placeholder, list }) {
	const [text, setText] = (0, import_react.useState)("");
	const add = () => {
		const v = text.trim();
		if (!v) return;
		if (!values.includes(v)) onChange([...values, v]);
		setText("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
			list,
			value: text,
			onChange: (e) => setText(e.target.value),
			onKeyDown: (e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					add();
				}
			},
			placeholder
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: add,
			className: "shrink-0 rounded-xl border border-border px-3 text-xs font-bold hover:bg-muted",
			children: "Adicionar"
		})]
	}), values.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-wrap gap-1.5",
		children: values.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold",
			children: [v, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onChange(values.filter((x) => x !== v)),
				"aria-label": `Remover ${v}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3 text-destructive" })
			})]
		}, v))
	})] });
}
function AttributesEditor({ attributes, onChange, sizes, onSizes, colors, onColors }) {
	const upd = (i, patch) => onChange(attributes.map((a, x) => x === i ? {
		...a,
		...patch
	} : a));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed border-border bg-muted/30 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1.5 text-xs font-black",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, { className: "h-3.5 w-3.5" }), " Modelos rápidos"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: "Escolha um modelo conforme o tipo de produto — pode editar tudo depois."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: ATTR_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onChange([...attributes, ...p.attrs.map((a) => ({
								...a,
								values: [...a.values]
							}))]),
							className: "rounded-full bg-background px-3 py-1.5 text-[11px] font-bold ring-1 ring-border hover:bg-muted",
							children: p.label
						}, p.label))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
				label: "Cores disponíveis",
				hint: "Escreva a cor e pressione Enter — o cliente vê exactamente este nome",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenInput, {
					values: colors,
					onChange: onColors,
					placeholder: "Escrever cor (ex.: Preto fosco)…",
					list: "bx-colors"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
				label: "Tamanhos",
				hint: "Ex.: P, M, G ou 38, 40 — pressione Enter",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenInput, {
					values: sizes,
					onChange: onSizes,
					placeholder: "Adicionar tamanho…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: attributes.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
							value: a.name,
							onChange: (e) => upd(i, { name: e.target.value }),
							placeholder: "Nome do atributo (Armazenamento, Voltagem…)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onChange(attributes.filter((_, x) => x !== i)),
							className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-destructive hover:bg-destructive/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenInput, {
							values: a.values,
							onChange: (v) => upd(i, { values: v }),
							placeholder: "Adicionar valor (128GB, 220V…)"
						})
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onChange([...attributes, {
					name: "",
					values: []
				}]),
				className: "inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Novo atributo"]
			})
		]
	});
}
//#endregion
export { ProductsPage as component };
