import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useAllProducts } from "./products-store-Hd0VqZmZ.mjs";
import { r as useShops, t as getShop } from "./shops-store-BUK4rBQe.mjs";
import { A as useFollowedShops, N as useStore, O as toggleFollow, R as shopUrl, a as Route$2 } from "./router-DRadbe1d.mjs";
import { H as notFound, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Share2, Gt as BadgeCheck, _ as Store, v as Star, xt as Flame } from "../_libs/lucide-react.mjs";
import { a as SmartImage, c as requireAuth, t as Layout } from "./Layout-28T_vqtX.mjs";
import { t as ProductCard } from "./ProductCard-CbaR7tDb.mjs";
import { n as nativeShare, t as ShareSheet } from "./ShareSheet-CZf1Vi6y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop._id-CdG7-DvT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const { id } = Route$2.useLoaderData();
	useShops();
	const shop = getShop(id);
	const { user } = useStore();
	const followed = useFollowedShops();
	const [shareOpen, setShareOpen] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const following = followed.includes(id);
	const all = useAllProducts();
	const shopProducts = (0, import_react.useMemo)(() => all.filter((p) => (p.shopId ?? "main") === id), [all, id]);
	if (!shop) throw notFound();
	const initials = shop.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		title: shop.name,
		showBack: true,
		hideBottomNav: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareSheet, {
				open: shareOpen,
				onClose: () => setShareOpen(false),
				target: {
					url: shopUrl(id),
					title: shop.name,
					text: `Veja a loja ${shop.name} na Bazarixy`,
					image: shop.logo || shop.cover
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden md:rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-28 md:h-44 bg-muted",
					children: shop.cover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
						src: shop.cover,
						alt: shop.name,
						wrapperClassName: "absolute inset-0 h-full w-full",
						className: "object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative -mt-10 px-4 pb-5 md:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-end md:gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end gap-3 md:gap-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-20 w-20 md:h-28 md:w-28 shrink-0 place-items-center rounded-2xl bg-background text-foreground font-display text-2xl md:text-3xl font-black shadow-xl ring-4 ring-background overflow-hidden",
									children: shop.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
										src: shop.logo,
										alt: shop.name,
										wrapperClassName: "absolute inset-0 h-full w-full",
										className: "object-cover"
									}) : initials || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-8 w-8" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 pb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "truncate font-display text-lg md:text-2xl font-black text-foreground",
											children: shop.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 md:h-5 md:w-5 text-gold shrink-0" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-gold px-1.5 py-0.5 font-bold text-foreground",
												children: "Choices"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-gold text-gold" }), " 4.87"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"· ",
												shopProducts.length,
												" produto(s)"
											] })
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 self-start md:ml-auto md:self-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										if (!requireAuth(user) || saving) return;
										setSaving(true);
										toggleFollow(id, shop.name).then((now) => toast.success(now ? "A seguir esta loja" : "Deixou de seguir")).catch((e) => toast.error(e.message)).finally(() => setSaving(false));
									},
									disabled: saving,
									className: `rounded-full px-5 py-2 text-xs font-bold transition disabled:opacity-60 ${following ? "border border-border bg-background text-foreground" : "bg-foreground text-background"}`,
									children: following ? "Seguindo" : "+ Seguir loja"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										(async () => {
											const target = {
												url: shopUrl(id),
												title: shop.name,
												text: `Veja a loja ${shop.name} na Bazarixy`,
												image: shop.logo || shop.cover
											};
											if (!await nativeShare(target)) setShareOpen(true);
										})();
									},
									"aria-label": "Partilhar loja",
									className: "grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto mt-4 flex max-w-5xl gap-2 overflow-x-auto no-scrollbar md:flex-wrap md:overflow-visible",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "whitespace-nowrap rounded-full bg-muted px-3 py-1 text-[11px] font-medium",
									children: ["🗓 ", shop.createdAt]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "whitespace-nowrap rounded-full bg-muted px-3 py-1 text-[11px] flex items-center gap-1 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3 w-3 text-sale" }), " Alta taxa de recompra"]
								}),
								shop.ownerName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "whitespace-nowrap rounded-full bg-muted px-3 py-1 text-[11px] font-medium",
									children: ["👤 ", shop.ownerName]
								})
							]
						}),
						shop.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-5xl text-sm text-muted-foreground",
							children: shop.description
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-10 border-b border-border bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-5xl gap-6 px-4",
					children: [
						"Artigos",
						"✨ Novo",
						"Promoção",
						"Comentários"
					].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `relative py-3 text-sm ${i === 0 ? "font-bold text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground" : "text-muted-foreground"}`,
						children: t
					}, t))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-5xl grid-cols-2 gap-3 px-3 py-4 md:grid-cols-4 md:gap-4 md:px-0 lg:grid-cols-5",
				children: shopProducts.length ? shopProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "col-span-full py-10 text-center text-sm text-muted-foreground",
					children: "Esta loja ainda não tem produtos."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 mb-6 rounded-lg bg-gradient-to-r from-sale/10 to-gold/10 p-3 text-xs md:mx-auto md:max-w-5xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-sale",
						children: "SuperDeals"
					}),
					" Poupe até",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: "15%"
					}),
					" nesta loja",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "ml-1 font-bold underline",
						children: "›"
					})
				]
			})
		]
	});
}
//#endregion
export { ShopPage as component };
