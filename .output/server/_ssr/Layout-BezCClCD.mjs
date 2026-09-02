import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useHomeConfig, n as setActiveHomeTab, r as useActiveHomeTab } from "./home-config-DXJgCGsf.mjs";
import { o as useUnreadCount } from "./notifications-store-B_Op6deg.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as ShoppingCart, J as Menu, Vt as ChevronLeft, at as LayoutGrid, mt as Heart, o as User, pt as House } from "../_libs/lucide-react.mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as actions, u as useStore } from "./router-HhRHfmJx.mjs";
import { i as useBannerIndex, o as useSlides } from "./banner-Zgl4ECrY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Layout-BezCClCD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Elegant precision magnifier — Shein/Zara style. */
function SearchIcon({ className, strokeWidth = 1.75, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		"aria-hidden": "true",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "10.75",
			cy: "10.75",
			r: "6.5",
			stroke: "currentColor",
			strokeWidth,
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 20l-4.65-4.65",
			stroke: "currentColor",
			strokeWidth,
			strokeLinecap: "round"
		})]
	});
}
var OverlaysBundle = (0, import_react.lazy)(() => import("./OverlaysBundle-YRyXoOUv.mjs"));
/**
* Carrega os painéis (menu, login, carrinho, favoritos, perfil, avisos) assim
* que o navegador fica livre — ou imediatamente se o utilizador abrir um deles
* antes disso. Mantém exactamente o mesmo comportamento, sem pesar no arranque.
*/
function DeferredOverlays({ menuOpen, onMenuOpenChange }) {
	const { loginOpen, cartDrawerOpen, favDrawerOpen, profileDrawerOpen, notifDrawerOpen } = useStore();
	const wanted = menuOpen || loginOpen || cartDrawerOpen || favDrawerOpen || profileDrawerOpen || notifDrawerOpen;
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (ready) return;
		const idle = window.requestIdleCallback;
		if (idle) {
			const id = idle(() => setReady(true), { timeout: 2500 });
			return () => window.cancelIdleCallback?.(id);
		}
		const t = setTimeout(() => setReady(true), 1200);
		return () => clearTimeout(t);
	}, [ready]);
	if (!ready && !wanted) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlaysBundle, {
			menuOpen,
			onMenuOpenChange
		})
	});
}
/** Returns true if user is authenticated. Otherwise triggers login flow.
*  On desktop → opens login modal. On mobile → navigates to /auth. */
function requireAuth(user) {
	if (user) return true;
	if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) actions.openLogin();
	else if (typeof window !== "undefined") window.location.assign("/auth");
	return false;
}
/** Coração das notificações: só fica dourado (e a piscar) quando há avisos novos. */
function NotificationBell({ count, className = "" }) {
	const has = count > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `relative inline-grid place-items-center ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
			className: has ? "h-5 w-5 fill-gold text-gold animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.65)]" : "h-5 w-5 fill-none text-current opacity-80",
			strokeWidth: 2.2
		}), has && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-pulse rounded-full bg-brand-strong ring-2 ring-background" })]
	});
}
function Layout({ children, title, showBack, transparentHeader = false, hideBottomNav = false, hideHeader = false, hideTopNav = false, simpleHeader = false }) {
	const { cart, user, menuOpen } = useStore();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const cartCount = cart.reduce((s, c) => s + c.qty, 0);
	const unread = useUnreadCount();
	const idx = useBannerIndex();
	const slides = useSlides();
	const cfg = useHomeConfig();
	const activeTab = useActiveHomeTab();
	const slide = slides[idx] ?? slides[0];
	/** Exactamente as mesmas abas do banner da home — e sincronizadas com ele. */
	const navTabs = cfg.homeTabs.length ? cfg.homeTabs : [{
		id: "t-all",
		label: "Tudo",
		slugs: []
	}];
	const selectTab = (index) => {
		setActiveHomeTab(index);
		if (pathname !== "/") window.location.assign("/");
		else window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	/** O carrinho abre sempre a página normal (sem gaveta lateral). */
	const openCart = (e) => {
		if (!requireAuth(user)) {
			e.preventDefault();
			return;
		}
	};
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const setMenuOpen = (v) => actions.setMenu(v);
	/** Notifications: right-side drawer on desktop, full page on mobile. */
	const openNotifications = (e) => {
		if (window.matchMedia("(min-width: 768px)").matches) {
			e.preventDefault();
			actions.openNotifDrawer();
		}
	};
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 280);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `min-h-screen bg-background ${hideBottomNav ? "" : "pb-16 md:pb-0"}`,
		children: [
			!hideTopNav && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden md:block sticky top-0 z-50 bg-background/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center gap-6 px-6 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMenuOpen(true),
							"aria-label": "Menu",
							className: "grid h-9 w-9 place-items-center rounded-md hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-10" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex flex-1 items-center justify-end gap-3",
							children: [
								pathname !== "/categories" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/categories",
									className: "hidden lg:flex flex-1 max-w-md items-center gap-2 rounded-full border border-brand-strong/50 bg-brand/25 px-4 py-2 text-sm text-brand-foreground transition hover:bg-brand/40",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, { className: "h-4 w-4 text-brand-strong" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1 truncate",
											children: "Buscar em Bazarixy…"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-6 w-8 place-items-center rounded-full bg-brand-strong text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, { className: "h-3.5 w-3.5" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/notifications",
									onClick: openNotifications,
									"aria-label": "Notificações",
									className: "relative p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, { count: unread })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/cart",
									onClick: openCart,
									className: "relative p-2",
									"aria-label": "Carrinho",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground",
										children: cartCount
									})]
								}),
								user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/me",
									onClick: (e) => {
										if (window.matchMedia("(min-width: 768px)").matches) {
											e.preventDefault();
											actions.openProfileDrawer();
										}
									},
									className: "p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" })
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => actions.openLogin(),
									className: "p-2",
									"aria-label": "Entrar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" })
								})
							]
						})
					]
				})
			}),
			!hideHeader && simpleHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 left-0 right-0 z-40 border-b border-border bg-background/95 backdrop-blur md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid h-14 grid-cols-[1fr_auto_1fr] items-center px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => window.history.back(),
							className: "-ml-1 justify-self-start p-1.5",
							"aria-label": "Voltar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "justify-self-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": true })
					]
				})
			}),
			!hideHeader && !simpleHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: `${transparentHeader ? "absolute" : "sticky"} top-0 left-0 right-0 z-40 md:hidden`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						!transparentHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: slide.img,
							alt: "",
							"aria-hidden": true,
							className: "absolute inset-0 h-full w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 justify-self-start",
									children: [showBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => window.history.back(),
										className: "-ml-1 p-1.5",
										"aria-label": "Voltar",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setMenuOpen(true),
										"aria-label": "Menu",
										className: "p-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/notifications",
										"aria-label": "Notificações",
										className: "relative p-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, { count: unread })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "justify-self-center",
									children: title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "truncate text-base font-semibold drop-shadow",
										children: title
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										className: "flex items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-9 drop-shadow-lg" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 justify-self-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/categories",
										"aria-label": "Buscar",
										className: "p-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/cart",
										onClick: openCart,
										className: "relative p-1.5",
										"aria-label": "Carrinho",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground",
											children: cartCount
										})]
									})]
								})
							]
						}),
						!transparentHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "no-scrollbar relative overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-5 px-3 pb-2",
								children: navTabs.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => selectTab(i),
									className: `relative whitespace-nowrap text-sm font-bold drop-shadow ${i === activeTab ? "text-white after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-white" : "text-white/80"}`,
									children: t.label
								}, t.id))
							})
						})
					]
				})
			}),
			transparentHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `fixed top-0 left-0 right-0 z-50 bg-background border-b border-border md:hidden transition-all duration-300 ${scrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-3 pt-2 pb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMenuOpen(true),
							"aria-label": "Menu",
							className: "p-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
								className: "h-5 w-5",
								strokeWidth: 2.2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/notifications",
							"aria-label": "Notificações",
							className: "relative p-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, { count: unread })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/categories",
							className: "flex-1 flex items-center gap-2 rounded-full border border-foreground/80 pl-3 pr-1 py-1 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 truncate text-foreground/70",
								children: "acessórios de cabelo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-7 w-9 place-items-center rounded-full bg-brand text-brand-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, {
									className: "h-4 w-4",
									strokeWidth: 2
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cart",
							className: "relative p-1.5",
							"aria-label": "Carrinho",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
								className: "h-5 w-5",
								strokeWidth: 2.2
							}), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground",
								children: cartCount
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "no-scrollbar overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-5 px-3 pb-2",
						children: navTabs.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => selectTab(i),
							className: `relative whitespace-nowrap text-sm font-bold ${i === activeTab ? "text-foreground after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-brand-strong" : "text-foreground/85"}`,
							children: t.label
						}, t.id))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: hideTopNav && hideHeader ? "mx-auto w-full max-w-[980px] px-0 py-0 md:px-0 md:py-0" : "mx-auto md:max-w-7xl md:px-6 md:py-6",
				children
			}),
			!hideBottomNav && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4",
					children: [
						{
							to: "/",
							icon: House,
							label: "Loja"
						},
						{
							to: "/categories",
							icon: LayoutGrid,
							label: "Categorias"
						},
						{
							to: "/cart",
							icon: ShoppingCart,
							label: "Carrinho"
						},
						{
							to: "/me",
							icon: User,
							label: "Eu"
						}
					].map((it) => {
						const active = pathname === it.to;
						const Icon = it.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: it.to,
							className: `relative flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] ${active ? "text-brand-strong" : "text-muted-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-5 w-5",
									strokeWidth: active ? 2.5 : 1.8
								}), it.to === "/cart" && cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground",
									children: cartCount
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: active ? "font-semibold" : "",
								children: it.label
							})]
						}, it.to);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeferredOverlays, {
				menuOpen,
				onMenuOpenChange: setMenuOpen
			})
		]
	});
}
/** Mantém a marca visível mesmo se um asset legado do Lovable não estiver disponível. */
function BrandLogo({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `relative inline-flex items-center ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/logotipo.webp",
			alt: "Bazarixy",
			className: "h-full w-auto",
			onError: (event) => {
				event.currentTarget.style.display = "none";
				event.currentTarget.nextElementSibling?.classList.remove("hidden");
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden font-display text-xl font-black tracking-tight text-brand-strong",
			children: "Bazarixy"
		})]
	});
}
//#endregion
export { requireAuth as i, NotificationBell as n, SearchIcon as r, Layout as t };
