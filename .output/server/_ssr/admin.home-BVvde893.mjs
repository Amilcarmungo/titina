import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useCustomProducts } from "./products-store-DJ_irs6P.mjs";
import { n as products } from "./products-De10hxZJ.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as Rows3, B as Pencil, Et as ExternalLink, R as Plus, ct as Images, gt as GripVertical, p as Trash2, rt as LayoutGrid, st as Image, wt as Eye, xt as Flame, y as Sparkles } from "../_libs/lucide-react.mjs";
import { i as useHomeConfig, t as homeConfigActions } from "./home-config-CaKXkxMI.mjs";
import { n as useCategories } from "./categories-store-C4Vdw11E.mjs";
import { s as useSlidesRaw } from "./banner-D2tjuxqW.mjs";
import { n as uploadImageFile, t as storagePaths } from "./upload-D4601ayU.mjs";
import { t as AdminTabs } from "./AdminTabs-4tAQj8U4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.home-BVvde893.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Card({ title, desc, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-black",
				children: title
			}), desc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: desc
			})] }), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children
		})]
	});
}
function HomePage() {
	const cfg = useHomeConfig();
	const customs = useCustomProducts();
	const cats = useCategories();
	const slides = useSlidesRaw();
	const all = [...customs, ...products];
	const [tab, setTab] = (0, import_react.useState)("abas");
	const update = (patch) => {
		homeConfigActions.update(patch);
	};
	const toggle = (id, field, max) => {
		const current = cfg[field];
		const next = current.includes(id) ? current.filter((x) => x !== id) : current.length >= max ? current : [...current, id];
		update({ [field]: next });
		toast.success("Salvo");
	};
	const sections = [
		{
			key: "showQuickStrip",
			label: "Strip de categorias rápidas",
			desc: "Kz 600 + Diário, Férias, Trabalho…"
		},
		{
			key: "showCategories",
			label: "Grade de categorias",
			desc: "Círculos coloridos com imagens"
		},
		{
			key: "showSuperOfertas",
			label: "Super Ofertas",
			desc: "Bloco laranja/rosa"
		},
		{
			key: "showViral",
			label: "Viral do Bazarixy",
			desc: "Bloco lilás"
		}
	];
	const updateStripItem = (id, patch) => update({ quickStripItems: cfg.quickStripItems.map((it) => it.id === id ? {
		...it,
		...patch
	} : it) });
	const removeStripItem = (id) => update({ quickStripItems: cfg.quickStripItems.filter((it) => it.id !== id) });
	const addStripItem = () => update({ quickStripItems: [...cfg.quickStripItems, {
		id: `q-${Date.now()}`,
		label: "Novo"
	}] });
	const readFile = (f, cb) => {
		uploadImageFile(f, storagePaths.banner("home", f.name)).then((url) => {
			if (url) cb(url);
		});
	};
	const orderedCats = cfg.categoriesOrder.length ? [...cfg.categoriesOrder.map((s) => cats.find((c) => c.slug === s)).filter(Boolean), ...cats.filter((c) => !cfg.categoriesOrder.includes(c.slug))] : cats;
	const moveCat = (slug, dir) => {
		const order = orderedCats.map((c) => c.slug);
		const i = order.indexOf(slug);
		const j = i + dir;
		if (i < 0 || j < 0 || j >= order.length) return;
		[order[i], order[j]] = [order[j], order[i]];
		update({ categoriesOrder: order });
	};
	const tabs = [
		{
			id: "abas",
			label: "Categorias principais",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "h-4 w-4" }),
			badge: cfg.homeTabs.length
		},
		{
			id: "strip",
			label: "Strip rápido",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rows3, { className: "h-4 w-4" }),
			badge: cfg.quickStripItems.length
		},
		{
			id: "grade",
			label: "Grade de categorias",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }),
			badge: orderedCats.length
		},
		{
			id: "hero",
			label: "Banners laterais",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "h-4 w-4" }),
			badge: cfg.heroLeftTiles.length + cfg.heroRightTiles.length
		},
		{
			id: "destaques",
			label: "Destaques",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4" }),
			badge: cfg.superPicks.length + cfg.viralPicks.length
		},
		{
			id: "visibilidade",
			label: "Visibilidade",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-black",
					children: "Página inicial"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Cada bloco da home tem a sua aba — edite sem misturar conteúdos."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/categorias",
						className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }), " Categorias"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTabs, {
				tabs,
				active: tab,
				onChange: setTab
			}),
			tab === "visibilidade" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Blocos visíveis",
				desc: "Ligue ou desligue cada secção da home.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: cfg[s.key],
							onChange: (e) => update({ [s.key]: e.target.checked }),
							className: "h-4 w-4 accent-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold",
								children: s.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: s.desc
							})]
						})]
					}, s.key))
				})
			}),
			tab === "abas" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Categorias principais (abas da home)",
				desc: "Cada aba tem as suas categorias e os seus próprios banners. Ao tocar na aba, a home troca banners e produtos.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/abas/$id",
					params: { id: "novo" },
					className: "inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background shadow-lg shadow-foreground/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Adicionar aba"]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
					children: [cfg.homeTabs.map((t, idx) => {
						const moveTab = (dir) => {
							const arr = [...cfg.homeTabs];
							const j = idx + dir;
							if (j < 0 || j >= arr.length) return;
							[arr[idx], arr[j]] = [arr[j], arr[idx]];
							update({ homeTabs: arr });
						};
						const tabSlides = (t.slideIds ?? []).map((id) => slides.find((s) => s.id === id)).filter(Boolean);
						const catNames = t.slugs.map((s) => cats.find((c) => c.slug === s)?.name ?? s);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group overflow-hidden rounded-2xl border border-border bg-background transition hover:shadow-[var(--shadow-card)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[16/7] bg-muted",
								children: [tabSlides.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-full",
									children: tabSlides.slice(0, 3).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: s.img,
										alt: "",
										className: "h-full flex-1 object-cover"
									}, s.id))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-full place-items-center text-[11px] font-semibold text-muted-foreground",
									children: "Sem banner próprio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-lg bg-background/90 text-[11px] font-black",
									children: idx + 1
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-sm font-black",
												children: t.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-0.5 text-[11px] text-muted-foreground",
												children: [
													catNames.length ? `${catNames.length} categoria(s)` : "Todas as categorias",
													" ",
													"· ",
													tabSlides.length,
													" banner(s)"
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex shrink-0 gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => moveTab(-1),
												className: "grid h-7 w-7 place-items-center rounded-lg border border-border text-xs hover:bg-muted",
												children: "↑"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => moveTab(1),
												className: "grid h-7 w-7 place-items-center rounded-lg border border-border text-xs hover:bg-muted",
												children: "↓"
											})]
										})]
									}),
									catNames.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap gap-1",
										children: [catNames.slice(0, 5).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold",
											children: n
										}, n)), catNames.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] text-muted-foreground",
											children: ["+", catNames.length - 5]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin/abas/$id",
											params: { id: t.id },
											className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" }), " Gerir aba"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												if (confirm("Excluir esta aba?")) {
													update({ homeTabs: cfg.homeTabs.filter((x) => x.id !== t.id) });
													toast.success("Aba removida");
												}
											},
											className: "grid h-8 w-8 place-items-center rounded-full border border-red-200 text-red-600 hover:bg-red-50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})]
									})
								]
							})]
						}, t.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/abas/$id",
						params: { id: "novo" },
						className: "grid min-h-[180px] place-items-center rounded-2xl border-2 border-dashed border-border text-xs font-bold text-muted-foreground transition hover:border-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" }), " Nova aba"]
						})
					})]
				})
			}),
			tab === "strip" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				title: "Strip de categorias rápidas",
				desc: "Bloco horizontal no topo, começando pelo cartão de destaque.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: addStripItem,
					className: "inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Adicionar"]
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "rounded-xl border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold uppercase text-muted-foreground",
							children: "Destaque · legenda"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: cfg.quickStripSaverLabel,
							onChange: (e) => update({ quickStripSaverLabel: e.target.value }),
							className: "mt-1 w-full bg-transparent text-sm outline-none"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "rounded-xl border border-border p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold uppercase text-muted-foreground",
							children: "Destaque · preço"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: cfg.quickStripSaverPrice,
							onChange: (e) => update({ quickStripSaverPrice: e.target.value }),
							className: "mt-1 w-full bg-transparent text-sm outline-none"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: cfg.quickStripItems.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-xl border border-border p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "relative grid h-12 w-12 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-lg bg-muted",
								children: [it.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: it.image,
									alt: "",
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*",
									className: "hidden",
									onChange: (e) => {
										const f = e.target.files?.[0];
										if (f) readFile(f, (u) => updateStripItem(it.id, { image: u }));
									}
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: it.label,
								onChange: (e) => updateStripItem(it.id, { label: e.target.value }),
								className: "flex-1 min-w-0 rounded-lg border border-border bg-transparent px-2.5 py-1.5 text-sm outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeStripItem(it.id),
								className: "grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						]
					}, it.id))
				})]
			}),
			tab === "grade" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				title: "Grade de categorias",
				desc: "Reordene as categorias exibidas na home. Edite nomes/imagens em Categorias.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold",
						children: "Título (opcional, mostrado na home)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: cfg.categoriesTitle,
						onChange: (e) => update({ categoriesTitle: e.target.value }),
						className: "mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-1.5",
					children: orderedCats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-xl border border-border p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-muted",
								children: c.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.image,
									alt: "",
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.emoji })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-bold",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-[10px] text-muted-foreground",
									children: [c.subcategories.length, " subcategorias"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => moveCat(c.slug, -1),
								className: "rounded border border-border px-2 py-1 text-xs",
								children: "↑"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => moveCat(c.slug, 1),
								className: "rounded border border-border px-2 py-1 text-xs",
								children: "↓"
							})
						]
					}, c.slug))
				})]
			}),
			tab === "hero" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Banners laterais (desktop)",
				desc: "Os blocos à esquerda e à direita do banner principal.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileEditor, {
						title: "Coluna esquerda",
						tiles: cfg.heroLeftTiles,
						cats,
						onChange: (tiles) => update({ heroLeftTiles: tiles }),
						readFile
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileEditor, {
						title: "Coluna direita",
						tiles: cfg.heroRightTiles,
						cats,
						onChange: (tiles) => update({ heroRightTiles: tiles }),
						readFile,
						withBadge: true
					})]
				})
			}),
			tab === "destaques" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					title: "Super Ofertas",
					desc: "Produtos em destaque (até 8, deixe vazio para automático).",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold",
							children: "Título"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: cfg.superTitle,
							onChange: (e) => update({ superTitle: e.target.value }),
							className: "mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, {
						all,
						selected: cfg.superPicks,
						onToggle: (id) => toggle(id, "superPicks", 8)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					title: "Viral do Bazarixy",
					desc: "Produtos virais (até 8).",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold",
							children: "Título"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: cfg.viralTitle,
							onChange: (e) => update({ viralTitle: e.target.value }),
							className: "mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, {
						all,
						selected: cfg.viralPicks,
						onToggle: (id) => toggle(id, "viralPicks", 8)
					})]
				})]
			})
		]
	});
}
function ProductGrid({ all, selected, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 grid max-h-72 grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-border p-2 sm:grid-cols-3 lg:grid-cols-4",
		children: all.map((p) => {
			const on = selected.includes(p.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onToggle(p.id),
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
function TileEditor({ title, tiles, cats, onChange, readFile, withBadge }) {
	const patch = (id, p) => onChange(tiles.map((t) => t.id === id ? {
		...t,
		...p
	} : t));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xs font-black uppercase tracking-wide text-muted-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onChange([...tiles, {
					id: `h-${Date.now()}`,
					label: "Novo bloco"
				}]),
				className: "inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-bold hover:bg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Adicionar"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 space-y-2",
			children: tiles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 rounded-xl border border-border p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative grid h-14 w-14 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-lg bg-muted",
						children: [t.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: t.image,
							alt: "",
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (e) => {
								const f = e.target.files?.[0];
								if (f) readFile(f, (u) => patch(t.id, { image: u }));
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1 space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: t.label,
							onChange: (e) => patch(t.id, { label: e.target.value }),
							placeholder: "Título",
							className: "w-full rounded-lg border border-border bg-transparent px-2.5 py-1.5 text-sm font-bold outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: t.slug ?? "",
								onChange: (e) => patch(t.id, { slug: e.target.value || void 0 }),
								className: "min-w-0 flex-1 rounded-lg border border-border bg-transparent px-2 py-1.5 text-xs outline-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Todas as categorias"
								}), cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.slug,
									children: c.name
								}, c.slug))]
							}), withBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: t.badge ?? "",
								onChange: (e) => patch(t.id, { badge: e.target.value }),
								placeholder: "Selo",
								className: "w-20 rounded-lg border border-border bg-transparent px-2 py-1.5 text-xs outline-none"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onChange(tiles.filter((x) => x.id !== t.id)),
						className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
					})
				]
			}, t.id))
		})]
	});
}
//#endregion
export { HomePage as component };
