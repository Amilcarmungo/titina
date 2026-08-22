import { r as __toESM } from "../_runtime.mjs";
import { F as useStore } from "./router-CpH00U3h.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { l as useOrders } from "./orders-store-B0X431Ym.mjs";
import { i as useAllProducts, o as useProductsStatus, r as retryProducts } from "./products-store-TDcUsz9F.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useHomeConfig, n as setActiveHomeTab, r as useActiveHomeTab } from "./home-config-CaKXkxMI.mjs";
import { a as useBannersStatus, n as setBannerIndex, o as useSlides, t as retryBanners } from "./banner-CMZuaEz9.mjs";
import { n as useCategories, r as useCategoriesStatus } from "./categories-store-C4Vdw11E.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { Rt as ChevronRight, t as Zap, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { a as SmartImage, i as Skeleton, t as Layout } from "./Layout-COZ4pjzI.mjs";
import { a as useRecommendationSignals, t as rankFeedProducts } from "./recommendations-KUKDzl1l.mjs";
import { t as ProductCard } from "./ProductCard-Bkc5yghF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D4uQeF1q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var promos = [
	"/assets/promo-1-D9QBnF1Y.png",
	"/assets/promo-2-djOW7yEW.png",
	"/assets/promo-3-Ddu1tsCS.png"
];
var FEED_PAGE_SIZE = 8;
function Home() {
	const allSlides = useSlides();
	const cfg = useHomeConfig();
	const categories = useCategories();
	const catStatus = useCategoriesStatus();
	const products = useAllProducts();
	const orders = useOrders();
	const { favorites } = useStore();
	const signals = useRecommendationSignals();
	const prodStatus = useProductsStatus();
	const bannerStatus = useBannersStatus();
	const orderedCats = (0, import_react.useMemo)(() => {
		if (!cfg.categoriesOrder.length) return categories;
		const map = new Map(categories.map((c) => [c.slug, c]));
		const head = cfg.categoriesOrder.map((s) => map.get(s)).filter(Boolean);
		const tail = categories.filter((c) => !cfg.categoriesOrder.includes(c.slug));
		return [...head, ...tail];
	}, [categories, cfg.categoriesOrder]);
	const [i, setI] = (0, import_react.useState)(0);
	const tab = useActiveHomeTab();
	const setTab = setActiveHomeTab;
	const tabs = cfg.homeTabs.length ? cfg.homeTabs : [{
		id: "t-all",
		label: "Tudo",
		slugs: []
	}];
	const active = tabs[Math.min(tab, tabs.length - 1)];
	const slides = (0, import_react.useMemo)(() => {
		const ids = active.slideIds ?? [];
		if (!ids.length) return allSlides;
		const picked = allSlides.filter((s) => ids.includes(s.id));
		return picked.length ? picked : allSlides;
	}, [allSlides, active.slideIds]);
	(0, import_react.useEffect)(() => {
		setI(0);
		setBannerIndex(0);
	}, [tab]);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => {
			setI((v) => {
				const next = (v + 1) % (slides.length || 1);
				setBannerIndex(next);
				return next;
			});
		}, 6e3);
		return () => clearInterval(id);
	}, [slides.length]);
	const goTo = (idx) => {
		setI(idx);
		setBannerIndex(idx);
	};
	const touch = {
		x: 0,
		active: false
	};
	const onTouchStart = (e) => {
		touch.x = e.touches[0].clientX;
		touch.active = true;
	};
	const onTouchEnd = (e) => {
		if (!touch.active) return;
		const dx = e.changedTouches[0].clientX - touch.x;
		touch.active = false;
		if (Math.abs(dx) > 40) goTo(dx < 0 ? (i + 1) % slides.length : (i - 1 + slides.length) % slides.length);
	};
	const filtered = (0, import_react.useMemo)(() => !active.slugs.length ? products : products.filter((p) => active.slugs.includes(p.category)), [products, active.slugs]);
	const tabCats = (0, import_react.useMemo)(() => !active.slugs.length ? orderedCats : orderedCats.filter((c) => active.slugs.includes(c.slug)), [orderedCats, active.slugs]);
	const slide = slides[Math.min(i, slides.length - 1)] ?? slides[0];
	const [feedSeed] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return 1;
		const key = "bazarixy_feed_seed_v1";
		const saved = Number(sessionStorage.getItem(key));
		if (Number.isFinite(saved) && saved > 0) return saved;
		const next = Date.now() + Math.floor(Math.random() * 1e5);
		sessionStorage.setItem(key, String(next));
		return next;
	});
	const feedOrderKey = `bazarixy_feed_order_v1_${active.id}`;
	const feedVisibleKey = `bazarixy_feed_visible_v1_${active.id}`;
	const [visibleCount, setVisibleCount] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return FEED_PAGE_SIZE;
		const saved = Number(sessionStorage.getItem(feedVisibleKey));
		return Number.isFinite(saved) && saved >= FEED_PAGE_SIZE ? saved : FEED_PAGE_SIZE;
	});
	const feedEndRef = (0, import_react.useRef)(null);
	const feedProducts = (0, import_react.useMemo)(() => {
		const category = tab === 0 ? null : active.slugs;
		const source = category?.length ? products.filter((product) => category.includes(product.category)) : products;
		const productMap = new Map(source.map((product) => [product.id, product]));
		if (typeof window !== "undefined") try {
			const saved = JSON.parse(sessionStorage.getItem(feedOrderKey) || "[]");
			if (Array.isArray(saved)) {
				const savedProducts = saved.filter((id) => typeof id === "string").map((id) => productMap.get(id)).filter((product) => Boolean(product));
				if (savedProducts.length) {
					const savedIds = new Set(savedProducts.map((product) => product.id));
					return [...savedProducts, ...source.filter((product) => !savedIds.has(product.id))];
				}
			}
		} catch {}
		const ranked = rankFeedProducts(products, {
			favorites,
			orders,
			category,
			seed: feedSeed
		});
		if (typeof window !== "undefined") sessionStorage.setItem(feedOrderKey, JSON.stringify(ranked.map((product) => product.id)));
		return ranked;
	}, [
		active.slugs,
		feedOrderKey,
		feedSeed,
		favorites,
		orders,
		products,
		tab
	]);
	const visibleFeedProducts = feedProducts.slice(0, visibleCount);
	(0, import_react.useEffect)(() => {
		const saved = Number(sessionStorage.getItem(feedVisibleKey));
		setVisibleCount(Number.isFinite(saved) && saved >= FEED_PAGE_SIZE ? saved : FEED_PAGE_SIZE);
	}, [active.id, feedVisibleKey]);
	(0, import_react.useEffect)(() => {
		sessionStorage.setItem(feedVisibleKey, String(visibleCount));
	}, [feedVisibleKey, visibleCount]);
	(0, import_react.useEffect)(() => {
		const node = feedEndRef.current;
		if (!node || visibleCount >= feedProducts.length) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) setVisibleCount((count) => count + FEED_PAGE_SIZE);
		}, { rootMargin: "500px 0px" });
		observer.observe(node);
		return () => observer.disconnect();
	}, [feedProducts.length, visibleCount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		transparentHeader: true,
		children: [
			!slide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden",
				children: bannerStatus === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					onRetry: retryBanners,
					className: "aspect-[4/4.2]"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-[4/4.2] w-full rounded-none" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden select-none md:hidden",
				onTouchStart,
				onTouchEnd,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex transition-transform duration-700 ease-out",
						style: { transform: `translateX(-${i * 100}%)` },
						children: slides.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src: s.img,
							alt: s.title,
							eager: idx === 0,
							draggable: false,
							wrapperClassName: "aspect-[4/4.2] w-full shrink-0",
							className: "object-cover"
						}, idx))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/85" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-0 right-0 top-14 z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "no-scrollbar overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-5 px-3 pt-1 pb-2.5",
								children: tabs.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setTab(idx),
									className: `relative whitespace-nowrap text-sm font-bold drop-shadow ${idx === tab ? "text-white after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-white" : "text-white/80"}`,
									children: t.label
								}, t.label))
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 px-4 pb-3 text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: slide.overlay || promos[i % promos.length],
									alt: slide.subtitle,
									className: "h-32 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-end gap-2",
								children: slide.picks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/product/$id",
									params: { id: p.id },
									className: "block w-[96px] shrink-0 text-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
										src: p.image,
										alt: p.name,
										rounded: "rounded-lg",
										wrapperClassName: "aspect-square w-full",
										className: "object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] font-bold drop-shadow",
										children: formatKz(p.price)
									})]
								}, p.id))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2.5 flex justify-center gap-1",
							children: slides.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => goTo(idx),
								className: `h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-white" : "w-1.5 bg-white/50"}`,
								"aria-label": `Slide ${idx + 1}`
							}, idx))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden md:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mt-1 mb-3 flex items-center gap-6",
					children: tabs.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTab(idx),
						className: `relative py-1.5 text-sm ${idx === tab ? "font-bold text-foreground after:absolute after:-bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-foreground" : "text-muted-foreground hover:text-foreground"}`,
						children: t.label
					}, t.label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-12 grid-rows-1 gap-3 h-[340px] lg:h-[380px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-3 flex min-h-0 flex-col gap-3",
							children: cfg.heroLeftTiles.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: it.slug ? "/category/$slug" : "/categories",
								params: it.slug ? { slug: it.slug } : void 0,
								className: "group relative min-h-0 flex-1 overflow-hidden rounded-xl bg-neutral-900 text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-0 flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-1 items-center px-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold leading-none text-neutral-900 whitespace-nowrap",
											children: it.label
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
										src: it.image || products[idx * 3 % (products.length || 1)]?.image,
										alt: it.label,
										wrapperClassName: "h-full w-2/5",
										className: "object-cover transition-transform duration-500 group-hover:scale-105"
									})]
								})
							}, it.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-6 h-full min-h-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-full w-full overflow-hidden rounded-xl bg-muted",
								children: [
									!slide && (bannerStatus === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
										onRetry: retryBanners,
										className: "h-full"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "absolute inset-0 h-full w-full" })),
									slides.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
										src: s.img,
										alt: s.title,
										eager: idx === 0,
										wrapperClassName: `absolute inset-0 h-full w-full transition-opacity duration-700 ease-out ${idx === i ? "opacity-100" : "opacity-0"}`,
										className: "object-cover"
									}, idx)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/75" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => goTo((i - 1 + slides.length) % slides.length),
										"aria-label": "Anterior",
										className: "absolute left-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-foreground shadow transition hover:bg-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => goTo((i + 1) % slides.length),
										"aria-label": "Próximo",
										className: "absolute right-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-foreground shadow transition hover:bg-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
									}),
									slide && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute inset-x-0 bottom-0 p-5 text-white",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] uppercase tracking-[0.3em] opacity-80",
												children: slide.subtitle
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1.5 font-display text-2xl lg:text-3xl font-black leading-tight drop-shadow line-clamp-1",
												children: slide.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 max-w-md text-xs opacity-90 line-clamp-1",
												children: slide.caption
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2.5 flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "rounded-full bg-white px-4 py-1.5 text-[11px] font-bold text-foreground transition hover:bg-white/90",
													children: slide.cta
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex gap-1.5",
													children: slides.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => goTo(idx),
														className: `h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-white" : "w-1.5 bg-white/50"}`,
														"aria-label": `Slide ${idx + 1}`
													}, idx))
												})]
											})
										]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-3 flex min-h-0 flex-col gap-3",
							children: cfg.heroRightTiles.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: it.slug ? "/category/$slug" : "/categories",
								params: it.slug ? { slug: it.slug } : void 0,
								className: "group relative min-h-0 flex-1 overflow-hidden rounded-xl bg-neutral-800",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
										src: it.image || products[(idx * 4 + 1) % (products.length || 1)]?.image,
										alt: it.label,
										wrapperClassName: "absolute inset-0 h-full w-full",
										className: "object-cover transition-transform duration-500 group-hover:scale-105"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-3 top-1/2 -translate-y-1/2 rounded-sm bg-white/95 px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-neutral-900",
										children: it.label
									}),
									it.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute bottom-2 right-3 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-white",
										children: it.badge
									})
								]
							}, it.id))
						})
					]
				})]
			}),
			cfg.showQuickStrip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar mt-3 flex gap-2 overflow-x-auto px-3 md:px-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative shrink-0 overflow-hidden rounded-xl",
					style: {
						width: 110,
						height: 140,
						background: "var(--gradient-sale)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col items-center justify-center px-2 text-center text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wide opacity-80",
								children: "A partir de"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl font-black drop-shadow",
								children: cfg.quickStripSaverPrice
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-[10px] font-semibold",
								children: cfg.quickStripSaverLabel
							})
						]
					})
				}), cfg.quickStripItems.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative shrink-0 overflow-hidden rounded-xl bg-muted",
					style: {
						width: 110,
						height: 140
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
						src: item.image ?? products[(idx + 1) % (products.length || 1)]?.image,
						alt: item.label,
						wrapperClassName: "h-full w-full",
						className: "object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-0 bottom-0 bg-black/70 py-1 text-center text-[11px] font-medium text-white",
						children: item.label
					})]
				}, item.id))]
			}),
			cfg.showCategories && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 px-3 md:px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card p-3 shadow-[var(--shadow-card)]",
					children: [cfg.categoriesTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 px-1 font-display text-sm font-black",
						children: cfg.categoriesTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3",
						children: [catStatus === "loading" && !tabCats.length && Array.from({ length: 8 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-16 md:h-20 md:w-20 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-2.5 w-12" })]
						}, `cs-${k}`)), tabCats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/category/$slug",
							params: { slug: c.slug },
							className: "flex flex-col items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-full bg-gradient-to-br from-muted to-accent",
								children: c.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
									src: c.image,
									alt: c.name,
									rounded: "rounded-full",
									wrapperClassName: "h-full w-full",
									className: "object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute inset-0 flex items-center justify-center text-2xl",
									children: c.emoji
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-[10px] md:text-xs leading-tight",
								children: c.name
							})]
						}, c.slug))]
					})]
				})
			}),
			cfg.showSuperOfertas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 px-3 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuperOfertasBlock, { items: filtered })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 hidden md:grid grid-cols-2 gap-4",
				children: [cfg.showSuperOfertas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuperOfertasBlock, { items: filtered }), cfg.showViral && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViralBlock, { items: filtered })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-5 px-3 md:px-0",
				"data-profile-views": signals.viewed.length,
				children: prodStatus === "loading" && !filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4",
					children: Array.from({ length: FEED_PAGE_SIZE }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-[3/4] w-full rounded-lg" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-2 h-3 w-4/5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-1.5 h-3 w-1/3" })
					] }, `ps-${k}`))
				}) : prodStatus === "error" && !filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					onRetry: retryProducts,
					className: "py-12"
				}) : visibleFeedProducts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4",
					children: [visibleFeedProducts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product: p,
						aspect: i % 3 === 1 ? "aspect-[3/4.6]" : i % 3 === 2 ? "aspect-[3/3.4]" : "aspect-[3/4]"
					}) }, p.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: feedEndRef,
						className: "h-8 w-full",
						"aria-hidden": "true"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: [
						"Nenhum produto publicado em",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: active.label
						}),
						" por enquanto."
					]
				})
			})
		]
	});
}
function SuperOfertasBlock({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-orange-50 to-pink-50 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg font-black text-sale",
					children: "Super"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 fill-sale text-sale" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg font-black",
					children: "Ofertas"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/categories",
			className: "text-xs text-muted-foreground",
			children: "Ver tudo ›"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-scrollbar -mt-px flex gap-2 overflow-x-auto rounded-b-2xl bg-gradient-to-b from-pink-50 to-background p-3",
		children: items.slice(0, 6).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/product/$id",
			params: { id: p.id },
			className: "shrink-0",
			style: { width: 120 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden rounded-lg bg-muted aspect-square",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
						src: p.image,
						alt: p.name,
						wrapperClassName: "h-full w-full",
						className: "object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs font-bold text-sale",
					children: formatKz(p.price)
				}),
				p.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-0.5 inline-block rounded-sm bg-sale/10 px-1 py-0.5 text-[9px] font-bold text-sale",
					children: [
						"-",
						Math.round((1 - p.price / p.oldPrice) * 100),
						"%"
					]
				})
			]
		}, p.id))
	})] });
}
function ViralBlock({ items }) {
	const viral = [...items].sort((a, b) => b.sold - a.sold).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-purple-100 to-fuchsia-100 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 fill-purple-600 text-purple-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-display text-lg font-black text-purple-700",
				children: [
					"Viral do",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 bg-clip-text text-transparent",
						children: "Bazarixy"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/categories",
			className: "text-xs text-muted-foreground",
			children: "Ver tudo ›"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-scrollbar -mt-px flex gap-2 overflow-x-auto rounded-b-2xl bg-gradient-to-b from-purple-50 to-background p-3",
		children: viral.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/product/$id",
			params: { id: p.id },
			className: "shrink-0",
			style: { width: 120 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-lg bg-muted aspect-square",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
					src: p.image,
					alt: p.name,
					wrapperClassName: "absolute inset-0 h-full w-full",
					className: "object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-1 top-1 rounded-full bg-purple-600 px-1.5 py-0.5 text-[9px] font-black text-white",
					children: "VIRAL"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs font-bold text-purple-700",
				children: formatKz(p.price)
			})]
		}, p.id))
	})] });
}
function ErrorState({ onRetry, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex flex-col items-center justify-center gap-2 rounded-xl bg-muted/50 text-center ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: "Não foi possível carregar os dados."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onRetry,
			className: "rounded-full bg-foreground px-4 py-1.5 text-[11px] font-bold text-background",
			children: "Tentar novamente"
		})]
	});
}
//#endregion
export { Home as component };
