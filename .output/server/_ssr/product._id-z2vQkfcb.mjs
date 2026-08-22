import { r as __toESM } from "../_runtime.mjs";
import { B as productUrl, F as useStore, V as shareText, l as actions, s as Route$3 } from "./router-C57BLtN5.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as useShops } from "./shops-store-CX-UvhEW.mjs";
import { t as getAnyProduct } from "./products-store-TDcUsz9F.mjs";
import { n as products } from "./products-De10hxZJ.mjs";
import { S as useRouter, b as useSearch, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { E as Share2, R as Plus, S as ShoppingCart, Vt as Check, W as Minus, j as RotateCcw, n as X, q as Menu, u as Truck, v as Star, w as ShieldCheck, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { a as SmartImage, r as SearchIcon, t as Layout } from "./Layout-B5heLo4o.mjs";
import { n as recommendProducts, r as recordProductView } from "./recommendations-KUKDzl1l.mjs";
import { t as ProductCard } from "./ProductCard-Bwd2hjW0.mjs";
import { i as useReviews } from "./reviews-BJEn2EFm.mjs";
import { n as colorName } from "./colors-IpFQMiOM.mjs";
import { n as nativeShare, t as ShareSheet } from "./ShareSheet-CZf1Vi6y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-z2vQkfcb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Bottom sheet used on the product page to pick colour / size / quantity before adding to the cart. */
function ProductOptionsSheet({ open, onClose, product, mode, onConfirm }) {
	const variants = product.variants ?? [];
	const [variantId, setVariantId] = (0, import_react.useState)(variants[0]?.id);
	const [color, setColor] = (0, import_react.useState)(product.colors[0] ?? "");
	const [size, setSize] = (0, import_react.useState)(product.sizes[0] ?? "");
	const [qty, setQty] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setVariantId(variants[0]?.id);
		setColor(product.colors[0] ?? "");
		setSize((variants[0]?.sizes?.length ? variants[0].sizes[0] : product.sizes[0]) ?? "");
		setQty(1);
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open, product.id]);
	const variant = (0, import_react.useMemo)(() => variants.find((v) => v.id === variantId), [variants, variantId]);
	const unitPrice = variant?.price ?? product.price;
	const oldPrice = variant?.oldPrice ?? product.oldPrice;
	const image = variant?.image || product.image;
	const activeColor = variant?.color ?? color;
	const sizeList = variant?.sizes?.length ? variant.sizes : product.sizes;
	const extraPhotos = variant?.images ?? [];
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[60] flex items-end justify-center md:items-center",
		role: "dialog",
		"aria-modal": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/60 backdrop-blur-[2px]",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex max-h-[88vh] w-full max-w-lg flex-col rounded-t-3xl bg-background shadow-2xl duration-300 animate-in slide-in-from-bottom md:rounded-3xl md:zoom-in-95",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					"aria-label": "Fechar",
					className: "absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-muted/80 backdrop-blur",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 border-b border-border p-4 pr-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
						src: image,
						alt: product.name,
						rounded: "rounded-xl",
						wrapperClassName: "h-24 w-24 shrink-0 ring-1 ring-border",
						className: "object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-2xl font-black text-sale",
									children: formatKz(unitPrice)
								}), oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground line-through",
									children: formatKz(oldPrice)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
								children: product.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: [variant?.label || colorName(activeColor), size ? ` · ${size}` : ""]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 space-y-5 overflow-y-auto p-4",
					children: [
						variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Opção:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: variant?.label || colorName(variant?.color) || "Padrão"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: variants.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setVariantId(v.id),
									className: `flex items-center gap-2 rounded-xl border-2 p-1 pr-3 text-xs font-bold transition ${variantId === v.id ? "border-brand-strong bg-brand/15" : "border-border hover:border-foreground/40"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
										src: v.image || product.image,
										alt: v.label || colorName(v.color),
										rounded: "rounded-lg",
										wrapperClassName: "h-10 w-10",
										className: "object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "max-w-[110px] truncate",
										children: v.label || colorName(v.color) || "Padrão"
									})]
								}, v.id))
							}),
							extraPhotos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "no-scrollbar mt-2 flex gap-2 overflow-x-auto",
								children: [variant?.image, ...extraPhotos].filter(Boolean).map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
									src,
									alt: product.name,
									rounded: "rounded-lg",
									wrapperClassName: "h-14 w-14 shrink-0 ring-1 ring-border",
									className: "object-cover"
								}, i))
							})
						] }),
						variants.length === 0 && product.colors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Cor:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground",
									children: colorName(color)
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: product.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setColor(c),
								"aria-label": colorName(c),
								className: `flex items-center gap-2 rounded-full border-2 py-1 pl-1 pr-3 text-xs font-semibold transition ${color === c ? "border-brand-strong bg-brand/15" : "border-border hover:border-foreground/40"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
									src: product.images?.[product.colors.indexOf(c)] || product.image,
									alt: colorName(c),
									rounded: "rounded-lg",
									wrapperClassName: "h-7 w-7 shrink-0 ring-1 ring-border",
									className: "object-cover"
								}), colorName(c)]
							}, c))
						})] }),
						sizeList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Tamanho:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: size
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground",
								children: "Guia de tamanhos"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: sizeList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSize(s),
								className: `min-w-14 rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${size === s ? "border-brand-strong bg-brand text-brand-foreground" : "border-border hover:border-foreground/40"}`,
								children: s
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Quantidade"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center rounded-full border border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty((q) => Math.max(1, q - 1)),
										"aria-label": "Diminuir",
										className: "grid h-9 w-9 place-items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-8 text-center text-sm font-bold",
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty((q) => Math.min(99, q + 1)),
										"aria-label": "Aumentar",
										className: "grid h-9 w-9 place-items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onConfirm({
							size,
							color: activeColor,
							qty,
							variantId: variant?.id,
							variantLabel: variant?.label,
							unitPrice,
							image
						}),
						className: "flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-black text-brand-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }),
							mode === "buy" ? "Comprar agora" : "Adicionar ao carrinho",
							" ·",
							" ",
							formatKz(unitPrice * qty)
						]
					})
				})
			]
		})]
	});
}
/** Alerta compacto e elegante ao adicionar no carrinho — centrado e responsivo. */
function toastAdded(label = "Adicionado") {
	toast.custom(() => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-fit max-w-[80vw] flex-col items-center gap-1.5 rounded-2xl bg-white/95 px-5 py-3 text-center shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-10 w-10 place-items-center rounded-full bg-emerald-500 shadow-[0_6px_18px_-6px_rgba(16,185,129,0.8)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "h-5 w-5 text-white",
				strokeWidth: 3
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "whitespace-nowrap text-[13px] font-bold text-neutral-900",
			children: label
		})]
	}), { duration: 1600 });
}
function ProductPage() {
	const { id } = Route$3.useParams();
	const { variant: variantParam } = useSearch({ from: "/product/$id" });
	const product = Route$3.useLoaderData() ?? getAnyProduct(id);
	const router = useRouter();
	const { cart } = useStore();
	const shops = useShops();
	const cartCount = cart.reduce((s, c) => s + c.qty, 0);
	const userReviews = useReviews(id);
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const variants = product?.variants ?? [];
	const [variantId, setVariantId] = (0, import_react.useState)(variants[0]?.id);
	const [size, setSize] = (0, import_react.useState)(product?.sizes[0] ?? "");
	const [color, setColor] = (0, import_react.useState)(product?.colors[0] ?? "");
	const [imgIdx, setImgIdx] = (0, import_react.useState)(0);
	const [shareOpen, setShareOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!variantParam) return;
		const selected = variants.find((item) => item.id === variantParam);
		if (selected) {
			setVariantId(selected.id);
			setImgIdx(0);
		}
	}, [variantParam, variants]);
	(0, import_react.useEffect)(() => {
		if (product) recordProductView(product);
	}, [product]);
	const relatedProducts = (0, import_react.useMemo)(() => product ? recommendProducts(products, {
		excludeIds: /* @__PURE__ */ new Set([product.id]),
		limit: 4
	}).map((item) => item.product) : [], [product]);
	const variant = (0, import_react.useMemo)(() => variants.find((v) => v.id === variantId), [variants, variantId]);
	/** Photos shown for the current selection: variant photos when a variant is picked. */
	const gallery = (0, import_react.useMemo)(() => {
		if (variant) {
			const list = [variant.image, ...variant.images ?? []].filter(Boolean);
			if (list.length) return list.slice(0, 4);
		}
		if (!product) return [];
		return product.images?.length ? product.images : [product.image];
	}, [variant, product]);
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		title: "Não encontrado",
		showBack: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-6 text-center",
			children: "Produto não encontrado."
		})
	});
	const price = variant?.price ?? product.price;
	const shop = shops.find((item) => item.id === (product.shopId ?? "main"));
	const oldPrice = variant?.oldPrice ?? product.oldPrice;
	const mainImage = gallery[Math.min(imgIdx, gallery.length - 1)] ?? product.image;
	const sizeList = variant?.sizes?.length ? variant.sizes : product.sizes;
	const pickVariant = (vid) => {
		setVariantId(vid);
		setImgIdx(0);
	};
	const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;
	const reviewCount = userReviews.length;
	const avgRating = reviewCount ? userReviews.reduce((s, r) => s + r.rating, 0) / reviewCount : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		hideHeader: true,
		hideBottomNav: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden md:block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mb-4 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-foreground",
								children: "Início"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-1.5",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/categories",
								className: "hover:text-foreground",
								children: "Categorias"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-1.5",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: product.name
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-1 flex flex-col gap-2",
								children: gallery.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setImgIdx(i),
									className: `overflow-hidden rounded-md border-2 ${i === imgIdx ? "border-brand-strong" : "border-transparent"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
										src,
										alt: `${product.name} ${i + 1}`,
										wrapperClassName: "aspect-square w-full",
										className: "object-cover"
									})
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "col-span-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-hidden rounded-lg bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
										src: mainImage,
										alt: product.name,
										eager: true,
										wrapperClassName: "aspect-[4/5] w-full",
										className: "object-cover"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-5 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-xl font-medium leading-snug",
										children: product.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center gap-3 text-xs text-muted-foreground",
										children: [reviewCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: avgRating.toFixed(1)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"(",
													reviewCount,
													" ",
													reviewCount === 1 ? "avaliação" : "avaliações",
													")"
												] })
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sem avaliações ainda" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [product.sold.toLocaleString("pt-BR"), " vendidos"] })]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/50 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: "A partir de"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-display text-4xl font-black text-sale",
													children: formatKz(price)
												}),
												oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm text-muted-foreground line-through",
													children: formatKz(oldPrice)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "rounded bg-sale px-2 py-0.5 text-xs font-bold text-sale-foreground",
													children: [
														"-",
														discount,
														"%"
													]
												})] })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-xs text-muted-foreground",
											children: [
												"ou 3x de ",
												formatKz(price / 3),
												" sem juros"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariantPicker, {
										product,
										variants,
										variantId,
										onVariant: pickVariant,
										color,
										onColor: setColor,
										size: "lg"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Tamanho: "
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: size
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "text-xs text-muted-foreground underline",
											children: "Guia de tamanhos"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex flex-wrap gap-2",
										children: sizeList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSize(s),
											className: `min-w-16 rounded-full border px-4 py-2 text-sm transition ${size === s ? "border-brand-strong bg-brand text-brand-foreground" : "border-border hover:border-foreground"}`,
											children: s
										}, s))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 rounded-lg border border-border p-3 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Envio Nacional · Frete grátis acima de Kz 120.000" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Devolução gratuita em 30 dias" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pagamento 100% seguro" })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSheet("cart"),
											className: "flex-1 rounded-full bg-brand py-3.5 text-sm font-bold uppercase tracking-wider text-brand-foreground transition hover:opacity-90",
											children: "Adicionar ao carrinho"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSheet("buy"),
											className: "flex-1 rounded-full border-2 border-brand-strong py-3.5 text-sm font-bold uppercase tracking-wider transition hover:bg-brand/20",
											children: "Comprar agora"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-border pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-base font-bold",
											children: "Descrição"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-muted-foreground",
											children: product.description
										})]
									}),
									shop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopCard, { shop })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewsSection, {
						reviews: userReviews,
						average: avgRating,
						count: reviewCount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-bold",
							children: "Você também pode gostar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-5 gap-4",
							children: products.filter((p) => p.id !== product.id).slice(0, 5).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur shadow-[0_1px_10px_rgba(0,0,0,0.05)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-12 items-center gap-0.5 px-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => window.history.back(),
									"aria-label": "Voltar",
									className: "grid h-9 w-9 place-items-center rounded-full active:bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => actions.openMenu(),
									"aria-label": "Menu",
									className: "grid h-9 w-9 place-items-center rounded-full active:bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "mx-auto flex min-w-0 items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/logotipo.webp",
										alt: "Bazarixy",
										className: "h-7 w-auto"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/categories",
									"aria-label": "Buscar",
									className: "grid h-9 w-9 place-items-center rounded-full active:bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "Partilhar",
									onClick: () => {
										(async () => {
											const target = {
												url: productUrl(product.id),
												title: product.name,
												text: shareText(product.name, product.description),
												image: mainImage
											};
											if (!await nativeShare(target)) setShareOpen(true);
										})();
									},
									className: "grid h-9 w-9 place-items-center rounded-full active:bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/cart",
									"aria-label": "Carrinho",
									className: "relative grid h-9 w-9 place-items-center rounded-full active:bg-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground",
										children: cartCount
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border/60 px-3 py-1.5",
							"aria-hidden": "true"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src: mainImage,
							alt: product.name,
							eager: true,
							wrapperClassName: "aspect-[3/4] w-full",
							className: "object-cover"
						}), gallery.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-x-0 bottom-2 flex justify-center gap-1.5",
							children: gallery.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setImgIdx(i),
								"aria-label": `Foto ${i + 1}`,
								className: `h-1.5 rounded-full transition-all ${i === imgIdx ? "w-5 bg-brand" : "w-1.5 bg-white/70"}`
							}, i))
						})]
					}),
					gallery.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-scrollbar flex gap-2 overflow-x-auto bg-card px-4 py-2.5",
						children: gallery.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setImgIdx(i),
							className: `h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 ${i === imgIdx ? "border-brand-strong" : "border-border"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: "",
								className: "h-full w-full object-cover"
							})
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 bg-card px-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-3xl font-black text-sale",
									children: formatKz(price)
								}), oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground line-through",
									children: formatKz(oldPrice)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-sale/10 px-1.5 py-0.5 text-xs font-bold text-sale",
									children: [
										"-",
										discount,
										"%"
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: [
									"ou 3x de ",
									formatKz(price / 3),
									" sem juros"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-base font-medium leading-snug",
								children: product.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-xs",
								children: [reviewCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-gold text-gold" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: avgRating.toFixed(1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: [
												"(",
												reviewCount,
												")"
											]
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Sem avaliações ainda"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [product.sold.toLocaleString("pt-BR"), " vendidos"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 space-y-2 bg-card px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariantPicker, {
							product,
							variants,
							variantId,
							onVariant: pickVariant,
							color,
							onColor: setColor
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Tamanho:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: size
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: sizeList.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSize(s),
									className: `min-w-12 rounded-md border px-3 py-2 text-sm ${size === s ? "border-brand-strong bg-brand text-brand-foreground" : "border-border"}`,
									children: s
								}, s))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 space-y-3 bg-card px-4 py-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Frete grátis acima de Kz 120.000" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Devolução gratuita em 30 dias" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pagamento 100% seguro" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 bg-card px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold",
							children: "Descrição"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: product.description
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewsSection, {
						reviews: userReviews,
						average: avgRating,
						count: reviewCount,
						className: "mt-2"
					}),
					shop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopCard, {
						shop,
						mobile: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 bg-card px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold",
							children: "Você também pode gostar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-2 gap-3",
							children: relatedProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background px-3 py-2 md:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/cart",
									"aria-label": "Carrinho",
									className: "relative grid h-11 w-11 place-items-center rounded-full border border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground",
										children: cartCount
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSheet("cart"),
									className: "flex-1 rounded-full border-2 border-brand-strong py-2.5 text-sm font-bold",
									children: "Adicionar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSheet("buy"),
									className: "flex-1 rounded-full bg-brand py-2.5 text-sm font-bold text-brand-foreground",
									children: "Comprar agora"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareSheet, {
				open: shareOpen,
				onClose: () => setShareOpen(false),
				target: {
					url: productUrl(product.id),
					title: product.name,
					text: shareText(product.name, product.description),
					image: mainImage
				}
			}),
			sheet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductOptionsSheet, {
				open: true,
				mode: sheet,
				product,
				onClose: () => setSheet(null),
				onConfirm: (o) => {
					actions.addToCart({
						id: product.id,
						qty: o.qty,
						size: o.size,
						color: o.color,
						variantId: o.variantId,
						variantLabel: o.variantLabel,
						unitPrice: o.unitPrice,
						image: o.image ?? mainImage
					});
					const go = sheet === "buy";
					setSheet(null);
					if (go) router.navigate({ to: "/cart" });
					else toastAdded();
				}
			})
		]
	});
}
/** Dados reais da loja associada ao produto; o toque leva ao respetivo perfil. */
function ReviewsSection({ reviews, average, count, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-lg border border-border bg-card p-5 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-lg font-bold",
			children: "Avaliações"
		}), count === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted-foreground",
			children: "Este produto ainda não tem avaliações. Só mostramos avaliações de compras verificadas."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-3xl font-black",
				children: average.toFixed(1)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-0.5",
				children: [Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-4 w-4 ${i < Math.round(average) ? "fill-gold text-gold" : "text-muted-foreground/40"}` }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-1 text-xs text-muted-foreground",
					children: [
						"(",
						count,
						")"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] text-muted-foreground",
				children: "Baseado em compras verificadas"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 divide-y divide-border",
			children: reviews.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-3 first:pt-0 last:pb-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [
								review.photoURL ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: review.photoURL,
									alt: review.name,
									loading: "lazy",
									decoding: "async",
									referrerPolicy: "no-referrer",
									className: "h-7 w-7 shrink-0 rounded-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/20 text-[11px] font-bold text-gold",
									children: review.name[0]?.toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-xs font-semibold",
									children: review.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex shrink-0 items-center gap-0.5",
									children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-3 w-3 ${j < review.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}` }, j))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-[10px] text-muted-foreground",
							children: review.size ? `Tam: ${review.size}` : review.createdAt
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs leading-relaxed text-foreground/90",
						children: review.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1.5 block text-[11px] text-muted-foreground",
						children: "Compra verificada"
					})
				]
			}, review.id))
		})] })]
	});
}
function ShopCard({ shop, mobile = false }) {
	const initials = shop.name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/shop/$id",
		params: { id: shop.id },
		className: `${mobile ? "mt-2 block bg-card px-4 py-4 active:bg-muted/50" : "block rounded-xl border border-border p-4 hover:bg-muted/40"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-foreground font-display text-sm font-black text-background",
					children: shop.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: shop.logo,
						alt: "",
						className: "h-full w-full object-cover",
						onError: (e) => {
							e.currentTarget.style.display = "none";
						}
					}) : initials
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-bold",
							children: shop.name
						}),
						shop.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 line-clamp-1 text-[11px] text-muted-foreground",
							children: shop.description
						}),
						shop.ownerName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: ["Responsável: ", shop.ownerName]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "›"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-3 block rounded-full border border-border py-2 text-center text-xs font-bold",
			children: "Ver perfil da loja"
		})]
	});
}
/** Colour / detail selector — shows each variant's cover photo and swaps the gallery. */
function VariantPicker({ product, variants, variantId, onVariant, color, onColor, size = "sm" }) {
	const box = size === "lg" ? "h-16 w-16" : "h-14 w-14";
	/** A foto mostrada no lugar da cor — nunca fica vazio, seja variante ou não. */
	const photoFor = (i, own) => own || product.images?.[i] || product.image;
	if (variants.length > 0) {
		const active = variants.find((v) => v.id === variantId);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted-foreground",
			children: [
				"Cor / detalhe:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-foreground",
					children: active?.label || colorName(active?.color) || "Padrão"
				}),
				active?.images?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-1",
					children: [
						"· ",
						active.images.length + 1,
						" fotos"
					]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1",
			children: variants.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onVariant(v.id),
				title: v.label || colorName(v.color),
				className: `relative shrink-0 overflow-hidden rounded-lg border-2 transition ${variantId === v.id ? "border-brand-strong" : "border-border"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: photoFor(i, v.image),
					alt: v.label || colorName(v.color),
					className: `${box} object-cover`
				}), (v.images?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute bottom-0.5 right-0.5 rounded bg-black/60 px-1 text-[9px] font-bold text-white",
					children: ["+", v.images.length]
				})]
			}, v.id))
		})] });
	}
	if (product.colors.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-xs text-muted-foreground",
		children: [
			"Cor:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold text-foreground",
				children: colorName(color)
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-wrap gap-2",
		children: product.colors.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => onColor(c),
			"aria-label": colorName(c),
			className: `overflow-hidden rounded-lg border-2 ${color === c ? "border-brand-strong" : "border-border"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photoFor(i),
				alt: colorName(c),
				className: `${box} object-cover`
			})
		}, c))
	})] });
}
//#endregion
export { ProductPage as component };
