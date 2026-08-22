import { r as __toESM } from "../_runtime.mjs";
import { i as Route$1 } from "./router-BKH7YloI.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useCustomProducts } from "./products-store-TDcUsz9F.mjs";
import { n as products } from "./products-De10hxZJ.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useHomeConfig, t as homeConfigActions } from "./home-config-CaKXkxMI.mjs";
import { r as slideActions, s as useSlidesRaw } from "./banner-CMZuaEz9.mjs";
import { n as useCategories } from "./categories-store-C4Vdw11E.mjs";
import { $t as ArrowLeft, B as Pencil, R as Plus, Vt as Check, p as Trash2, st as Image } from "../_libs/lucide-react.mjs";
import { n as AdminInput, r as AdminModal, t as AdminField } from "./AdminModal-DXEoyymL.mjs";
import { n as uploadImageFile, t as storagePaths } from "./upload-D4601ayU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.abas._id-DRvEjQ9s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyBanner = () => ({
	img: "",
	title: "",
	subtitle: "",
	caption: "",
	cta: "Comprar agora",
	pickIds: []
});
function TabEditor() {
	const { id } = Route$1.useParams();
	const navigate = useNavigate();
	const cfg = useHomeConfig();
	const cats = useCategories();
	const slides = useSlidesRaw();
	const isNew = id === "novo";
	const existing = cfg.homeTabs.find((t) => t.id === id);
	const [label, setLabel] = (0, import_react.useState)(existing?.label ?? "");
	const [slugs, setSlugs] = (0, import_react.useState)(existing?.slugs ?? []);
	const [slideIds, setSlideIds] = (0, import_react.useState)(existing?.slideIds ?? []);
	const [banner, setBanner] = (0, import_react.useState)(null);
	const [bannerFiles, setBannerFiles] = (0, import_react.useState)({});
	const [publishing, setPublishing] = (0, import_react.useState)(false);
	const [publishProgress, setPublishProgress] = (0, import_react.useState)(0);
	const [publishedLink, setPublishedLink] = (0, import_react.useState)(null);
	const tabBanners = (0, import_react.useMemo)(() => slideIds.map((sid) => slides.find((s) => s.id === sid)).filter(Boolean), [slideIds, slides]);
	if (!isNew && !existing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-bold",
			children: "Aba não encontrada."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/justina/home",
			className: "text-xs font-bold underline",
			children: "Voltar à página inicial"
		})]
	});
	const persist = (patch) => {
		if (isNew) return;
		homeConfigActions.update({ homeTabs: cfg.homeTabs.map((t) => t.id === id ? {
			...t,
			...patch
		} : t) });
	};
	const toggleCat = (slug) => {
		const next = slugs.includes(slug) ? slugs.filter((s) => s !== slug) : [...slugs, slug];
		setSlugs(next);
		persist({ slugs: next });
	};
	const saveTab = () => {
		if (!label.trim()) {
			toast.error("Dê um nome à aba");
			return;
		}
		if (isNew) {
			const newId = `t-${Date.now()}`;
			homeConfigActions.update({ homeTabs: [...cfg.homeTabs, {
				id: newId,
				label: label.trim(),
				slugs,
				slideIds
			}] });
			toast.success("Aba criada");
			navigate({
				to: "/justina/abas/$id",
				params: { id: newId }
			});
		} else {
			persist({
				label: label.trim(),
				slugs,
				slideIds
			});
			toast.success("Aba salva");
		}
	};
	const saveBanner = async () => {
		if (!banner) return;
		if (!banner.title || !banner.img) {
			toast.error("Preencha título e imagem");
			return;
		}
		setPublishing(true);
		setPublishProgress(10);
		const bannerId = banner.id ?? `b-${Date.now()}`;
		const img = bannerFiles.image ? await uploadImageFile(bannerFiles.image, storagePaths.banner(bannerId, bannerFiles.image.name), {
			silent: true,
			onProgress: (p) => setPublishProgress(Math.round(10 + p * .55))
		}) : banner.img;
		const overlay = bannerFiles.overlay ? await uploadImageFile(bannerFiles.overlay, storagePaths.banner(`${bannerId}/overlay`, bannerFiles.overlay.name), {
			silent: true,
			onProgress: (p) => setPublishProgress(Math.round(65 + p * .2))
		}) : banner.overlay;
		if (!img) {
			setPublishing(false);
			toast.error("Não foi possível enviar a imagem do banner.");
			return;
		}
		const published = {
			...banner,
			img,
			overlay: overlay ?? void 0
		};
		if (banner.id) {
			setPublishProgress(90);
			await slideActions.update(banner.id, published);
			toast.success("Banner atualizado");
		} else {
			const { id: _omit, ...rest } = published;
			setPublishProgress(90);
			const result = slideActions.add(rest);
			await result.published;
			const newId = result.id;
			const next = [...slideIds, newId];
			setSlideIds(next);
			persist({ slideIds: next });
			toast.success("Banner criado para esta aba");
		}
		if (banner.img.startsWith("blob:")) URL.revokeObjectURL(banner.img);
		if (banner.overlay?.startsWith("blob:")) URL.revokeObjectURL(banner.overlay);
		setBannerFiles({});
		setPublishProgress(100);
		setPublishedLink(`${window.location.origin}/`);
		setPublishing(false);
		setBanner(null);
	};
	const removeBanner = (sid) => {
		if (!confirm("Excluir este banner?")) return;
		slideActions.remove(sid).catch(() => {});
		const next = slideIds.filter((x) => x !== sid);
		setSlideIds(next);
		persist({ slideIds: next });
		toast.success("Banner removido");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/justina/home",
						className: "grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-black tracking-tight",
						children: isNew ? "Nova aba principal" : label || "Aba"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Nome, categorias e banners exclusivos desta aba."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: saveTab,
					className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }),
						" ",
						isNew ? "Criar aba" : "Salvar"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold uppercase tracking-wide text-muted-foreground",
					children: "Passo 1 · Nome da aba"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: label,
					onChange: (e) => setLabel(e.target.value),
					onBlur: () => label.trim() && persist({ label: label.trim() }),
					placeholder: "Ex.: Mulher, Homem, Kids…",
					className: "mt-2 w-full max-w-md rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-bold outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-wide text-muted-foreground",
							children: "Passo 2 · Categorias desta aba"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[11px] text-muted-foreground",
							children: "Só as categorias escolhidas aparecem. Subcategorias não são exibidas nesta aba."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/justina/categorias",
							className: "rounded-full border border-border px-3 py-1.5 text-[11px] font-bold hover:bg-muted",
							children: "Gerir categorias"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-4",
						children: cats.map((c) => {
							const on = slugs.includes(c.slug);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleCat(c.slug),
								className: `flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${on ? "border-foreground bg-muted/60" : "border-border hover:border-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-base",
										children: c.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: c.image,
											alt: "",
											className: "h-full w-full object-cover"
										}) : c.emoji
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate text-xs font-bold",
										children: c.name
									}),
									on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 shrink-0" })
								]
							}, c.slug);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] text-muted-foreground",
						children: slugs.length ? `${slugs.length} categoria(s) nesta aba.` : "Sem seleção = mostra produtos de todas as categorias."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-bold uppercase tracking-wide text-muted-foreground",
						children: "Passo 3 · Banners desta aba"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-[11px] text-muted-foreground",
						children: "Crie aqui os banners que aparecem quando o cliente toca nesta aba."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setBannerFiles({});
							setBanner(emptyBanner());
						},
						className: "inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Criar banner"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
					children: [tabBanners.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-2xl border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[16/9] bg-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: s.img,
									alt: s.title,
									className: "h-full w-full object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-2 left-3 right-3 text-white drop-shadow",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider opacity-90",
										children: s.subtitle
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg font-black leading-tight",
										children: s.title
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-muted-foreground",
								children: [s.pickIds.length, " destaque(s)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setBanner({ ...s }),
									className: "grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => removeBanner(s.id),
									className: "grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})]
							})]
						})]
					}, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setBannerFiles({});
							setBanner(emptyBanner());
						},
						className: "grid min-h-[160px] place-items-center rounded-2xl border-2 border-dashed border-border text-xs font-bold text-muted-foreground transition hover:border-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-5 w-5" }), " Novo banner"]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
				open: !!banner,
				onClose: () => setBanner(null),
				title: banner?.id ? "Editar banner" : "Criar banner desta aba",
				subtitle: "Imagem, textos e produtos em destaque",
				size: "lg",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setBanner(null),
					className: "rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted",
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: publishing,
					onClick: () => void saveBanner(),
					className: "rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background shadow-lg shadow-foreground/20 disabled:opacity-60",
					children: publishing ? "A publicar…" : "Publicar"
				})] }),
				children: banner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						publishing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-brand/40 bg-brand/10 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A publicar banner no Firebase…" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [publishProgress, "%"] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-2 overflow-hidden rounded-full bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-brand-strong transition-all",
									style: { width: `${publishProgress}%` }
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Título",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: banner.title,
										onChange: (e) => setBanner({
											...banner,
											title: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Subtítulo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: banner.subtitle,
										onChange: (e) => setBanner({
											...banner,
											subtitle: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "Legenda",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: banner.caption,
										onChange: (e) => setBanner({
											...banner,
											caption: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
									label: "CTA",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInput, {
										value: banner.cta,
										onChange: (e) => setBanner({
											...banner,
											cta: e.target.value
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Imagem",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "ab-file",
										type: "file",
										accept: "image/*",
										className: "hidden",
										onChange: (e) => {
											const f = e.target.files?.[0];
											if (f) {
												const preview = URL.createObjectURL(f);
												setBannerFiles((files) => ({
													...files,
													image: f
												}));
												setBanner({
													...banner,
													img: preview
												});
											}
											e.target.value = "";
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "ab-file",
										className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4" }), " Enviar"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "url",
										value: banner.img.startsWith("data:") ? "" : banner.img,
										onChange: (e) => setBanner({
											...banner,
											img: e.target.value
										}),
										placeholder: "ou cole URL",
										className: "min-w-[220px] flex-1 rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
									}),
									banner.img && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: banner.img,
										alt: "",
										className: "h-16 w-24 rounded-lg object-cover ring-1 ring-border"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Imagem sem fundo (PNG) — sobreposta no banner mobile",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "ab-overlay",
										type: "file",
										accept: "image/png,image/webp,image/*",
										className: "hidden",
										onChange: (e) => {
											const f = e.target.files?.[0];
											if (f) {
												const preview = URL.createObjectURL(f);
												setBannerFiles((files) => ({
													...files,
													overlay: f
												}));
												setBanner({
													...banner,
													overlay: preview
												});
											}
											e.target.value = "";
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "ab-overlay",
										className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4" }), " Enviar PNG"]
									}),
									banner.overlay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: banner.overlay,
										alt: "",
										className: "h-16 w-16 rounded-lg object-contain ring-1 ring-border"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setBanner({
											...banner,
											overlay: ""
										}),
										className: "text-xs font-bold text-red-600",
										children: "Remover"
									})] })
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminField, {
							label: "Produtos em destaque (até 3)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductPicker, {
								selected: banner.pickIds,
								onChange: (ids) => setBanner({
									...banner,
									pickIds: ids
								}),
								max: 3
							})
						})
					]
				})
			}),
			publishedLink && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-x-4 bottom-5 z-[70] mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-background p-4 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-black text-emerald-700",
						children: "Banner publicado"
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
function ProductPicker({ selected, onChange, max = 3 }) {
	const all = [...useCustomProducts(), ...products];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid max-h-56 grid-cols-2 gap-2 overflow-y-auto rounded-xl border border-border p-2 md:grid-cols-4",
		children: all.map((p) => {
			const on = selected.includes(p.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(on ? selected.filter((x) => x !== p.id) : selected.length >= max ? selected : [...selected, p.id]),
				className: `flex items-center gap-2 rounded-lg border p-2 text-left transition ${on ? "border-gold bg-gold/10" : "border-border hover:border-foreground"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.image,
					alt: "",
					className: "h-10 w-10 rounded object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "line-clamp-2 text-[11px]",
					children: p.name
				})]
			}, p.id);
		})
	});
}
//#endregion
export { TabEditor as component };
