import { n as __exportAll, r as __toESM } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { i as firebaseEnabled } from "./client-ColUhoxC.mjs";
import { t as getProduct } from "./products-De10hxZJ.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as getShop } from "./shops-store-Dm5LimXI.mjs";
import { a as SITE_URL, c as paths, f as shopUrl, i as SITE_NAME, l as productUrl, n as HOME_TITLE, o as absoluteUrl, r as SHARE_IMAGE, t as HOME_DESCRIPTION, u as seoDescription } from "./site-BzUm8isV.mjs";
import { S as useRouter, _ as createRootRouteWithContext, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as enumType, r as objectType } from "../_libs/zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CY1rd_zI.js
var router_CY1rd_zI_exports = /* @__PURE__ */ __exportAll({
	a: () => Route$20,
	c: () => WHATSAPP,
	getRouter: () => getRouter,
	i: () => Route$3,
	l: () => actions,
	n: () => Route$1,
	o: () => INSTAGRAM,
	r: () => Route$2,
	s: () => PHONE,
	t: () => router_exports,
	u: () => useStore
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "shop_state_v1";
var initial = {
	cart: [],
	favorites: [],
	user: null,
	loginOpen: false,
	cartDrawerOpen: false,
	favDrawerOpen: false,
	profileDrawerOpen: false,
	menuOpen: false,
	notifDrawerOpen: false
};
var state = (() => {
	if (typeof window === "undefined") return initial;
	try {
		const saved = JSON.parse(localStorage.getItem(KEY) || "");
		return {
			...initial,
			...saved,
			loginOpen: false,
			cartDrawerOpen: false,
			favDrawerOpen: false,
			profileDrawerOpen: false,
			menuOpen: false,
			notifDrawerOpen: false
		};
	} catch {
		return initial;
	}
})();
var listeners = /* @__PURE__ */ new Set();
function emit() {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
	listeners.forEach((l) => l());
}
function subscribe(l) {
	listeners.add(l);
	return () => listeners.delete(l);
}
function useStore() {
	return (0, import_react.useSyncExternalStore)(subscribe, () => state, () => initial);
}
var actions = {
	addToCart(item) {
		const next = {
			selected: true,
			...item
		};
		const existing = state.cart.find((c) => c.id === item.id && c.size === item.size && c.color === item.color && c.variantId === item.variantId);
		if (existing) state = {
			...state,
			cart: state.cart.map((c) => c === existing ? {
				...c,
				qty: c.qty + item.qty,
				selected: true
			} : c)
		};
		else state = {
			...state,
			cart: [...state.cart, next]
		};
		if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([
			15,
			40,
			15
		]);
		emit();
	},
	removeFromCart(idx) {
		state = {
			...state,
			cart: state.cart.filter((_, i) => i !== idx)
		};
		emit();
	},
	clearCart() {
		state = {
			...state,
			cart: []
		};
		emit();
	},
	removeSelected() {
		state = {
			...state,
			cart: state.cart.filter((c) => c.selected === false)
		};
		emit();
	},
	toggleSelected(idx) {
		state = {
			...state,
			cart: state.cart.map((c, i) => i === idx ? {
				...c,
				selected: c.selected === false
			} : c)
		};
		emit();
	},
	setAllSelected(value) {
		state = {
			...state,
			cart: state.cart.map((c) => ({
				...c,
				selected: value
			}))
		};
		emit();
	},
	updateQty(idx, qty) {
		if (qty < 1) return;
		state = {
			...state,
			cart: state.cart.map((c, i) => i === idx ? {
				...c,
				qty
			} : c)
		};
		emit();
	},
	toggleFavorite(id) {
		state = {
			...state,
			favorites: state.favorites.includes(id) ? state.favorites.filter((f) => f !== id) : [...state.favorites, id]
		};
		if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(20);
		emit();
	},
	signIn(email) {
		state = {
			...state,
			user: {
				...state.user ?? {},
				email
			},
			loginOpen: false
		};
		emit();
	},
	/** Sincroniza o usuário autenticado (Firebase Auth). */
	setUser(user) {
		state = {
			...state,
			user,
			loginOpen: user ? false : state.loginOpen
		};
		emit();
	},
	signOut() {
		state = {
			...state,
			user: null
		};
		emit();
	},
	openLogin() {
		state = {
			...state,
			loginOpen: true
		};
		emit();
	},
	closeLogin() {
		state = {
			...state,
			loginOpen: false
		};
		emit();
	},
	openCartDrawer() {
		state = {
			...state,
			cartDrawerOpen: true
		};
		emit();
	},
	closeCartDrawer() {
		state = {
			...state,
			cartDrawerOpen: false
		};
		emit();
	},
	openFavDrawer() {
		state = {
			...state,
			favDrawerOpen: true
		};
		emit();
	},
	closeFavDrawer() {
		state = {
			...state,
			favDrawerOpen: false
		};
		emit();
	},
	openProfileDrawer() {
		state = {
			...state,
			profileDrawerOpen: true
		};
		emit();
	},
	closeProfileDrawer() {
		state = {
			...state,
			profileDrawerOpen: false
		};
		emit();
	},
	openMenu() {
		state = {
			...state,
			menuOpen: true
		};
		emit();
	},
	closeMenu() {
		state = {
			...state,
			menuOpen: false
		};
		emit();
	},
	setMenu(v) {
		state = {
			...state,
			menuOpen: v
		};
		emit();
	},
	openNotifDrawer() {
		state = {
			...state,
			notifDrawerOpen: true
		};
		emit();
	},
	closeNotifDrawer() {
		state = {
			...state,
			notifDrawerOpen: false
		};
		emit();
	}
};
var styles_default = "/assets/styles-Ddqch_it.css";
/**
* Mantém o estado local em sincronia com o Firebase Auth. Não renderiza nada.
* Todo o SDK do Firebase é carregado depois da hidratação (import dinâmico),
* para não pesar no JavaScript inicial da página.
*/
function FirebaseAuthSync() {
	const stopOrders = (0, import_react.useRef)(null);
	const lastUid = (0, import_react.useRef)(null);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		if (!firebaseEnabled) return;
		let disposed = false;
		let stopAuth = null;
		(async () => {
			const [{ initAnalytics }, { subscribeToUser }, { upsertUserProfile }, { watchStaff }, { initOrdersBridge, watchOrders }, { rememberEmail }, { captureReferralFromUrl, recordReferralOnce }, { bindFollows }, { bindNotifications }, { setOrdersOwner }, { setNotificationsOwner }, { bindPoints }] = await Promise.all([
				import("./client-ColUhoxC.mjs").then((n) => n.t).then((n) => n.t),
				import("./auth-BC3TJ8Gs.mjs").then((n) => n.i),
				import("./user-data-DXEcUX7Y.mjs"),
				import("./roles-DIBzW3mP.mjs").then((n) => n.i).then((n) => n.i),
				import("./orders-Chh9kBqq.mjs"),
				import("./email-index-7olE61cG.mjs").then((n) => n.n).then((n) => n.n),
				import("./referrals-DGkFyR9U.mjs").then((n) => n.i).then((n) => n.i),
				import("./follows-Btp9dQJp.mjs"),
				import("./notifications-Df9V44Mn.mjs"),
				import("./orders-store-DPNmKvMS.mjs"),
				import("./notifications-store-B_Op6deg.mjs").then((n) => n.r).then((n) => n.r),
				import("./points-XcHjegxc.mjs")
			]);
			if (disposed) return;
			captureReferralFromUrl();
			initAnalytics();
			initOrdersBridge();
			stopAuth = subscribeToUser((user) => {
				stopOrders.current?.();
				stopOrders.current = null;
				if (!user) {
					const wasSignedIn = lastUid.current !== null;
					lastUid.current = null;
					actions.setUser(null);
					watchStaff(null);
					bindPoints(null);
					bindFollows(null);
					bindNotifications(null);
					setNotificationsOwner(null);
					setOrdersOwner(null);
					if (wasSignedIn) router.invalidate();
					return;
				}
				const isNewSession = lastUid.current !== user.uid;
				lastUid.current = user.uid;
				setOrdersOwner(user.uid);
				setNotificationsOwner(user.uid);
				bindNotifications(user.uid);
				actions.setUser({
					email: user.email,
					uid: user.uid,
					name: user.name,
					photoURL: user.photoURL
				});
				if (isNewSession) {
					actions.closeLogin();
					router.invalidate();
				}
				upsertUserProfile(user);
				recordReferralOnce(user.uid);
				bindPoints(user.uid);
				bindFollows(user.uid);
				if (user.email) rememberEmail(user.email);
				watchStaff(user.uid);
				stopOrders.current = watchOrders(user.uid, false);
			});
			if (disposed) {
				stopAuth?.();
				stopAuth = null;
			}
		})();
		return () => {
			disposed = true;
			stopAuth?.();
			stopOrders.current?.();
			stopOrders.current = null;
		};
	}, [router]);
	return null;
}
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$44 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
			},
			{ title: HOME_TITLE },
			{
				name: "description",
				content: HOME_DESCRIPTION
			},
			{
				name: "author",
				content: SITE_NAME
			},
			{
				property: "og:site_name",
				content: SITE_NAME
			},
			{
				property: "og:locale",
				content: "pt_PT"
			},
			{
				property: "og:title",
				content: HOME_TITLE
			},
			{
				property: "og:description",
				content: HOME_DESCRIPTION
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: SITE_URL
			},
			{
				property: "og:image",
				content: SHARE_IMAGE
			},
			{
				property: "og:image:alt",
				content: "Bazarixy"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: HOME_TITLE
			},
			{
				name: "twitter:description",
				content: HOME_DESCRIPTION
			},
			{
				name: "twitter:image",
				content: SHARE_IMAGE
			},
			{
				name: "twitter:image:alt",
				content: "Bazarixy"
			}
		],
		links: [
			{
				rel: "canonical",
				href: SITE_URL
			},
			{
				rel: "sitemap",
				href: "/sitemap.xml",
				type: "application/xml"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "shortcut icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.ico"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;900&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$44.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirebaseAuthSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				offset: 0,
				gap: 10,
				expand: false,
				visibleToasts: 3,
				icons: {
					success: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white",
						children: "✓"
					}),
					error: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-500 text-white",
						children: "!"
					}),
					warning: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500 text-white",
						children: "!"
					}),
					info: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground text-background",
						children: "i"
					})
				},
				className: "!fixed !inset-x-0 !left-0 !top-1/2 !mx-auto !flex !w-[calc(100vw-24px)] !max-w-[420px] !-translate-y-1/2 !transform !flex-col !items-center",
				toastOptions: {
					unstyled: true,
					duration: 2600,
					classNames: {
						toast: "pointer-events-auto mx-auto flex w-full min-w-0 items-center justify-center gap-2.5 rounded-2xl border border-black/5 bg-white/95 px-3.5 py-3 text-center text-foreground shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-4",
						content: "flex min-w-0 flex-1 flex-col items-center gap-0.5",
						title: "w-full break-words text-[13px] font-bold leading-snug text-neutral-900 sm:text-[13.5px]",
						description: "w-full break-words text-[11.5px] font-medium leading-[1.35] text-neutral-500 sm:text-[12px]",
						actionButton: "shrink-0 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-bold text-background",
						cancelButton: "shrink-0 rounded-full border border-border px-3 py-1.5 text-[11px] font-bold",
						icon: "shrink-0"
					}
				}
			})
		]
	});
}
var $$splitComponentImporter$41 = () => import("./routes-dsesln1l.mjs");
var Route$43 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: HOME_TITLE },
		{
			name: "description",
			content: HOME_DESCRIPTION
		},
		{
			property: "og:title",
			content: HOME_TITLE
		},
		{
			property: "og:description",
			content: HOME_DESCRIPTION
		},
		{
			property: "og:url",
			content: SITE_URL
		},
		{
			property: "og:image",
			content: SHARE_IMAGE
		},
		{
			property: "og:image:alt",
			content: "Bazarixy - Compras online em Angola"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: HOME_TITLE
		},
		{
			name: "twitter:description",
			content: HOME_DESCRIPTION
		},
		{
			name: "twitter:image",
			content: SHARE_IMAGE
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./auth-BytrnO_f.mjs");
var Route$42 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Entrar / Cadastrar — Bazarixy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitComponentImporter$39 = () => import("./cart-BA8acM8t.mjs");
var Route$41 = createFileRoute("/cart")({
	head: () => ({ meta: [
		{ title: "Sacola — Bazarixy" },
		{
			name: "description",
			content: "Reveja os produtos da sua sacola, escolha o que quer pagar agora e finalize a compra na Bazarixy."
		},
		{
			property: "og:title",
			content: "Sacola — Bazarixy"
		},
		{
			property: "og:description",
			content: "Seleccione os itens que quer pagar e finalize a compra."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
/**
* «Talvez goste também» — recomendações a partir das categorias dos itens da
* sacola (ou os mais recentes, quando a sacola está vazia).
*/
var $$splitComponentImporter$38 = () => import("./categories-DoPwl9mC.mjs");
var Route$40 = createFileRoute("/categories")({
	head: () => ({ meta: [
		{ title: "Buscar produtos — Bazarixy" },
		{
			name: "description",
			content: "Pesquise produtos, explore categorias e descubra as tendências mais vendidas na Bazarixy."
		},
		{
			property: "og:title",
			content: "Buscar produtos — Bazarixy"
		},
		{
			property: "og:description",
			content: "Pesquise produtos e explore todas as categorias da Bazarixy."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./checkout-ChmKVeg7.mjs");
var Route$39 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Finalizar Compra — Bazarixy" }, {
		name: "description",
		content: "Complete seu pedido em 3 etapas: endereço, confirmação e pagamento."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./como-pagar-CETMDdzy.mjs");
var Route$38 = createFileRoute("/como-pagar")({
	head: () => ({ meta: [{ title: "Como pagar — Bazarixy" }, {
		name: "description",
		content: "Aprenda a pagar na Bazarixy e a enviar um comprovativo válido."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./coupons-D7jXHoVi.mjs");
var Route$37 = createFileRoute("/coupons")({
	head: () => ({ meta: [
		{ title: "Meus cupões — Bazarixy" },
		{
			name: "description",
			content: "Veja os cupões de desconto disponíveis, os já usados e os expirados, e aplique-os ao finalizar a compra na Bazarixy."
		},
		{
			property: "og:title",
			content: "Meus cupões — Bazarixy"
		},
		{
			property: "og:description",
			content: "Cupões de desconto disponíveis para usar no checkout."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./favorites-DVwY2Htu.mjs");
var Route$36 = createFileRoute("/favorites")({
	head: () => ({ meta: [{ title: "Favoritos — Bazarixy" }, {
		name: "description",
		content: "Seus produtos favoritos."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./justina-BJtCKbRJ.mjs");
var Route$35 = createFileRoute("/justina")({
	head: () => ({ meta: [
		{ title: "Admin — Bazarixy" },
		{
			name: "description",
			content: "Painel de administração — banners, produtos, categorias, pedidos, lojas."
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./me-Dqpsomge.mjs");
var Route$34 = createFileRoute("/me")({
	head: () => ({ meta: [{ title: "Minha conta — Bazarixy" }, {
		name: "description",
		content: "Sua conta Bazarixy."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./notifications-xdyhzUo3.mjs");
var Route$33 = createFileRoute("/notifications")({
	head: () => ({ meta: [
		{ title: "Notificações — Bazarixy" },
		{
			name: "description",
			content: "Acompanhe pedidos, entregas, cupões e novidades das lojas da Bazarixy num só lugar."
		},
		{
			property: "og:title",
			content: "Notificações — Bazarixy"
		},
		{
			property: "og:description",
			content: "Pedidos, entregas, cupões e novidades."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./orders-CAG60Xeu.mjs");
var searchSchema = objectType({ tab: enumType([
	"unpaid",
	"processing",
	"shipped",
	"review",
	"returns"
]).optional() });
var Route$32 = createFileRoute("/orders")({
	head: () => ({ meta: [{ title: "Meus pedidos — Bazarixy" }] }),
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
/** Resumo da devolução e do reembolso — sem etapas antigas, só o que falta fazer. */
/** Etapa a partir da qual cada separador começa a contar (não repetimos o passado). */
/** Etapas visíveis: começam no separador atual e param na etapa em curso. */
/** Estado por loja: cada pacote pode andar num ritmo diferente. */
var $$splitComponentImporter$29 = () => import("./points-C3JrjmTL.mjs");
var Route$31 = createFileRoute("/points")({
	head: () => ({ meta: [
		{ title: "Meus pontos e convites — Bazarixy" },
		{
			name: "description",
			content: "Veja os seus pontos Bazarixy, convide amigos com o seu link único e ganhe pontos por cada avaliação."
		},
		{
			property: "og:title",
			content: "Meus pontos e convites — Bazarixy"
		},
		{
			property: "og:description",
			content: "Ganhe pontos por avaliações e por cada amigo convidado."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./privacidade-CB4FplS3.mjs");
var Route$30 = createFileRoute("/privacidade")({
	head: () => ({ meta: [
		{ title: "Política de Privacidade — Bazarixy" },
		{
			name: "description",
			content: "Política de privacidade da plataforma Bazarixy, incluindo recolha, utilização, proteção e partilha de dados pessoais."
		},
		{
			property: "og:title",
			content: "Política de Privacidade — Bazarixy"
		},
		{
			property: "og:description",
			content: "Como o Bazarixy recolhe, utiliza, protege e partilha os dados dos utilizadores."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./settings-URlVM2YD.mjs");
var Route$29 = createFileRoute("/settings")({
	head: () => ({ meta: [{ title: "Configurações — Bazarixy" }, {
		name: "description",
		content: "Configurações da sua conta Bazarixy."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./store-CKB75x4d.mjs");
var Route$28 = createFileRoute("/store")({
	head: () => ({ meta: [{ title: "MonkeyK Beauty Tool — Loja oficial | Bazarixy" }, {
		name: "description",
		content: "Descubra a loja oficial MonkeyK Beauty Tool na Bazarixy. Produtos de beleza com alta taxa de recompra."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./super-ofertas-QTgmOPdl.mjs");
var Route$27 = createFileRoute("/super-ofertas")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./support-9W9oYd2d.mjs");
var WHATSAPP = "https://wa.me/244934033532";
var INSTAGRAM = "https://www.instagram.com/bazarixy/";
var PHONE = "+244 934 033 532";
var Route$26 = createFileRoute("/support")({
	head: () => ({ meta: [
		{ title: "Suporte Bazarixy — Assistente e contactos" },
		{
			name: "description",
			content: "Fale com a Jilda IA, a assistente virtual da Bazarixy, ou contacte a equipa por WhatsApp, Instagram e telefone."
		},
		{
			property: "og:title",
			content: "Suporte Bazarixy — Assistente e contactos"
		},
		{
			property: "og:description",
			content: "Assistente virtual, WhatsApp, Instagram e telefone da Bazarixy."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./termos-ClJ9xsW5.mjs");
var Route$25 = createFileRoute("/termos")({
	head: () => ({ meta: [
		{ title: "Termos e Condições — Bazarixy" },
		{
			name: "description",
			content: "Termos e condições de utilização da plataforma Bazarixy, incluindo compras, pagamentos, entregas e responsabilidades da marketplace em Angola."
		},
		{
			property: "og:title",
			content: "Termos e Condições — Bazarixy"
		},
		{
			property: "og:description",
			content: "Regras de utilização, responsabilidades, pagamentos e protecção de dados da plataforma Bazarixy."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./trocas-devolucoes-cRIq7WMT.mjs");
var Route$24 = createFileRoute("/trocas-devolucoes")({
	head: () => ({ meta: [
		{ title: "Política de Trocas e Devoluções — Bazarixy" },
		{
			name: "description",
			content: "Política de trocas e devoluções da Bazarixy, incluindo prazos, defeitos, reembolsos e condições aplicáveis à compra."
		},
		{
			property: "og:title",
			content: "Política de Trocas e Devoluções — Bazarixy"
		},
		{
			property: "og:description",
			content: "Regras para devolução, troca e reembolso de produtos comprados na Bazarixy."
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./wallet-CzWa-xr7.mjs");
var Route$23 = createFileRoute("/wallet")({
	head: () => ({ meta: [{ title: "Carteira — Bazarixy" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var bazarixy_email_logo_png_asset_default = {
	version: 1,
	asset_id: "280b520d-08c0-49e3-88d0-73a300b0faef",
	project_id: "7889ba98-2752-466f-97ed-cedfc9b866ba",
	url: "/__l5e/assets-v1/280b520d-08c0-49e3-88d0-73a300b0faef/bazarixy-email-logo.png",
	r2_key: "a/v1/7889ba98-2752-466f-97ed-cedfc9b866ba/280b520d-08c0-49e3-88d0-73a300b0faef/bazarixy-email-logo.png",
	original_filename: "bazarixy-email-logo.png",
	size: 652278,
	content_type: "image/png",
	created_at: "2026-09-02T00:20:34Z"
};
/**
* Componentes reutilizáveis para os e-mails da Bazarixy.
*
* São funções puras que devolvem HTML responsivo (tabelas + estilos inline),
* o formato que funciona em Gmail, Outlook, Apple Mail e webmails africanos.
* Nenhum destes ficheiros toca no Firebase — só constrói HTML.
*/
var BRAND = "#e83e8c";
var BRAND_DARK = "#c52d73";
var BRAND_PALE = "#fff0f6";
var TEXT = "#24202a";
var MUTED = "#766d78";
var BORDER = "#f1e5ec";
var LOGO_URL = absoluteUrl(bazarixy_email_logo_png_asset_default.url);
var SOCIALS = [
	{
		label: "WhatsApp",
		href: "https://whatsapp.com/channel/0029VbCwfxIGzzKOSgeKqH3z"
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/bazarixy/"
	},
	{
		label: "Facebook",
		href: "https://web.facebook.com/profile.php?id=61576475860905"
	},
	{
		label: "TikTok",
		href: "https://www.tiktok.com/@bazarixy"
	}
];
/** Escapa texto vindo de dados do utilizador (nunca injectar HTML cru). */
function esc(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function heading(text) {
	return `<h1 style="margin:0 0 12px;font:700 24px/1.25 Arial,Helvetica,sans-serif;letter-spacing:-.2px;color:${TEXT}">${esc(text)}</h1>`;
}
function paragraph(text) {
	return `<p style="margin:0 0 16px;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:${TEXT}">${text}</p>`;
}
function muted(text) {
	return `<p style="margin:0 0 10px;font:400 13px/1.6 Arial,Helvetica,sans-serif;color:${MUTED}">${text}</p>`;
}
function noticeLabel(label) {
	return `<div style="display:inline-block;margin:0 0 16px;padding:7px 11px;border-radius:999px;background:${BRAND_PALE};font:700 11px Arial,Helvetica,sans-serif;letter-spacing:.4px;text-transform:uppercase;color:${BRAND_DARK}">${esc(label)}</div>`;
}
function messageBlock(text) {
	return `<div style="margin:18px 0;padding:16px 18px;border-left:4px solid ${BRAND};border-radius:0 10px 10px 0;background:#fff7fa;font:400 14px/1.65 Arial,Helvetica,sans-serif;color:${TEXT}">${esc(text).replace(/\r?\n/g, "<br />")}</div>`;
}
function button(label, href) {
	return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0">
    <tr><td style="background:${BRAND};border-radius:10px;box-shadow:0 5px 14px rgba(232,62,140,.2)">
      <a href="${esc(href)}" style="display:inline-block;padding:14px 26px;font:700 14px Arial,Helvetica,sans-serif;color:#fff;text-decoration:none">${esc(label)}</a>
    </td></tr>
  </table>`;
}
function codeBox(code) {
	return `<div style="margin:22px 0;padding:20px;border:1px solid #f6c4db;border-radius:14px;text-align:center;background:${BRAND_PALE}">
    <div style="font:700 34px/1 Arial,Helvetica,sans-serif;letter-spacing:9px;color:${BRAND_DARK}">${esc(code)}</div>
    <div style="margin-top:8px;font:400 12px Arial,Helvetica,sans-serif;color:${MUTED}">Código de verificação</div>
  </div>`;
}
function itemsTable(items) {
	return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER};border-bottom:1px solid ${BORDER};margin:18px 0">${items.map((i) => `<tr>
        <td style="padding:12px 0;width:62px;vertical-align:top">${i.image ? `<img src="${esc(i.image)}" width="56" height="56" alt="${esc(i.name)}" style="border-radius:10px;object-fit:cover;display:block;border:1px solid ${BORDER}" />` : ""}</td>
        <td style="padding:10px 8px;font:400 14px/1.4 Arial,Helvetica,sans-serif;color:${TEXT}">${esc(i.name)}<br /><span style="color:${MUTED};font-size:12px">Qtd: ${esc(i.qty)}</span></td>
        <td style="padding:10px 0;text-align:right;font:700 14px Arial,Helvetica,sans-serif;color:${TEXT};white-space:nowrap">${esc(i.price)}</td>
      </tr>`).join("")}</table>`;
}
function summaryRow(label, value, strong = false) {
	const weight = strong ? 700 : 400;
	return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="font:${weight} 14px Arial,Helvetica,sans-serif;color:${TEXT};padding:4px 0">${esc(label)}</td>
    <td style="font:${weight} 14px Arial,Helvetica,sans-serif;color:${strong ? BRAND_DARK : TEXT};padding:4px 0;text-align:right">${esc(value)}</td>
  </tr></table>`;
}
/** Envelope comum: cabeçalho, corpo centrado (máx. 600px) e rodapé. */
function shell(bodyHtml, preheader = "") {
	return `<!doctype html>
<html lang="pt"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${SITE_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#fff7fa">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff7fa;padding:30px 12px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${BORDER};border-radius:18px;overflow:hidden">
      <tr><td align="center" style="padding:26px 28px 18px;border-bottom:1px solid ${BORDER};background:#fff">
        <a href="${SITE_URL}" style="display:inline-block;text-decoration:none"><img src="${LOGO_URL}" width="64" height="64" alt="${SITE_NAME}" style="display:block;width:64px;height:64px;border-radius:16px;object-fit:cover" /></a>
        <div style="margin-top:10px;font:800 18px Arial,Helvetica,sans-serif;letter-spacing:-.3px;color:${TEXT}">${SITE_NAME}</div>
      </td></tr>
      <tr><td style="padding:28px 30px">${bodyHtml}</td></tr>
      <tr><td align="center" style="padding:26px 28px;background:${BRAND_PALE};font:400 12px/1.7 Arial,Helvetica,sans-serif;color:${MUTED};text-align:center">
        <div style="margin-bottom:14px;font:700 12px Arial,Helvetica,sans-serif;color:${TEXT}">Siga a Bazarixy</div>
        <div style="margin-bottom:16px">
          ${SOCIALS.map((s) => `<a href="${s.href}" style="display:inline-block;margin:0 4px 6px;padding:8px 14px;border-radius:999px;background:#ffffff;border:1px solid ${BORDER};font:700 11px Arial,Helvetica,sans-serif;color:${BRAND_DARK};text-decoration:none">${s.label}</a>`).join("")}
        </div>
        <strong style="color:${TEXT}">Bazarixy</strong> · Compras online em Angola<br />
        <a href="${SITE_URL}" style="color:${BRAND_DARK};font-weight:700;text-decoration:none">${SITE_URL.replace("https://", "")}</a> · <a href="${absoluteUrl("/support")}" style="color:${BRAND_DARK};font-weight:700;text-decoration:none">Suporte</a> · <a href="tel:+244934033532" style="color:${BRAND_DARK};font-weight:700;text-decoration:none">+244 934 033 532</a><br />
        <span style="color:#9b8d97">E-mail automático — por favor, não responda directamente.</span>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
/**
* Registo central dos e-mails da Bazarixy.
*
* Para acrescentar um novo tipo de e-mail no futuro basta adicionar uma entrada
* em `EMAIL_TEMPLATES`: assunto + HTML. Nada mais precisa de mudar (a API e o
* helper do frontend passam a aceitar o novo nome automaticamente).
*/
var url = (path) => path ? path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}` : SITE_URL;
var hello = (name) => paragraph(name ? `Olá <strong>${esc(name)}</strong>,` : "Olá,");
var EMAIL_TEMPLATES = {
	"verify-email": (d) => ({
		subject: `${d.code} é o seu código de verificação — Bazarixy`,
		html: shell(noticeLabel("Segurança da conta") + heading("Confirme o seu e-mail") + hello(d.name) + paragraph("Use o código abaixo para confirmar a sua conta na Bazarixy.") + codeBox(d.code) + muted(`O código expira em ${esc(d.minutes ?? 15)} minutos. Se não foi você, ignore este e-mail.`), "Código de verificação da sua conta")
	}),
	"password-reset": (d) => ({
		subject: "Recuperar a sua palavra-passe — Bazarixy",
		html: shell(heading("Recuperar palavra-passe") + hello(d.name) + paragraph("Recebemos um pedido para redefinir a sua palavra-passe. Toque no botão abaixo para criar uma nova.") + button("Criar nova palavra-passe", d.resetLink) + muted("O link é válido por tempo limitado e só pode ser usado uma vez. Se não pediu isto, pode ignorar este e-mail em segurança."), "Redefina a sua palavra-passe")
	}),
	"order-confirmation": (d) => ({
		subject: `Pedido ${d.orderCode} confirmado — Bazarixy`,
		html: shell(noticeLabel("Compra recebida") + heading("Pedido confirmado!") + hello(d.name) + paragraph(`Obrigado pela sua compra. O seu pedido <strong>${esc(d.orderCode)}</strong> foi registado e já está a ser tratado.`) + itemsTable(d.items) + summaryRow("Subtotal", d.subtotal) + (d.discount ? summaryRow("Desconto", `-${d.discount}`) : "") + summaryRow("Frete", "Grátis") + summaryRow("Total", d.total, true) + (d.paymentMethod ? muted(`Pagamento: ${esc(d.paymentMethod)}`) : "") + (d.address ? muted(`Entrega: ${esc(d.address)}`) : "") + button("Ver os meus pedidos", url("/orders")), `Pedido ${d.orderCode} confirmado`)
	}),
	notification: (d) => ({
		subject: `${d.title} — Bazarixy`,
		html: shell(noticeLabel("Actualização da encomenda") + heading(d.title) + hello(d.name) + messageBlock(d.message) + muted("Consulte os detalhes e acompanhe o progresso da sua encomenda a qualquer momento.") + (d.ctaLabel ? button(d.ctaLabel, url(d.ctaPath)) : ""), `Actualização da encomenda: ${d.title}`)
	}),
	promo: (d) => ({
		subject: d.headline,
		html: shell((d.imageUrl ? `<img src="${esc(d.imageUrl)}" alt="" width="544" style="display:block;width:100%;border-radius:12px;margin-bottom:18px" />` : "") + heading(d.headline) + hello(d.name) + paragraph(esc(d.message)) + button(d.ctaLabel ?? "Ver ofertas", url(d.ctaPath ?? "/super-ofertas")), d.headline)
	})
};
function isEmailTemplate(value) {
	return typeof value === "string" && value in EMAIL_TEMPLATES;
}
function buildEmail(template, data) {
	const build = EMAIL_TEMPLATES[template];
	return build(data ?? {});
}
/**
* API serverless de e-mails (Resend).
* POST /api/email  { template, to, data }
*
* Segurança:
*  - a chave do Resend vive só nas Environment Variables do servidor;
*  - é obrigatório um ID token válido do Firebase (Authorization: Bearer …);
*  - o destinatário tem de ser o e-mail do próprio utilizador autenticado
*    (excepto para membros com token de serviço interno em campanhas).
*/
var Route$22 = createFileRoute("/api/email")({ server: { handlers: { POST: async ({ request }) => {
	const { sendWithResend, verifyFirebaseIdToken, isActiveStaff } = await import("./resend.server-B5phQiG-.mjs");
	let payload;
	try {
		payload = await request.json();
	} catch {
		return Response.json({ error: "JSON inválido." }, { status: 400 });
	}
	const { template, to, data } = payload;
	if (!isEmailTemplate(template)) return Response.json({ error: "Template desconhecido." }, { status: 400 });
	if (typeof to !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return Response.json({ error: "Destinatário inválido." }, { status: 400 });
	const auth = request.headers.get("authorization") ?? "";
	const idToken = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "";
	const account = await verifyFirebaseIdToken(idToken);
	if (!account) return Response.json({ error: "Não autorizado." }, { status: 401 });
	if (account.email && account.email !== to.toLowerCase()) {
		if (!await isActiveStaff(idToken, account.uid)) return Response.json({ error: "Só é possível enviar para o seu próprio e-mail." }, { status: 403 });
	}
	try {
		const { subject, html } = buildEmail(template, data);
		const result = await sendWithResend({
			to,
			subject,
			html
		});
		return Response.json({
			ok: true,
			id: result.id
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Falha no envio.";
		console.error("[/api/email]", message);
		return Response.json({
			ok: false,
			error: message
		}, { status: 502 });
	}
} } } });
var MAX_AGE_SECONDS = 900;
var COOKIE = "bazarixy_signup_verification";
function secret() {
	return processModule.env["EMAIL_VERIFICATION_SECRET"] || processModule.env["RESEND_API_KEY"] || "development-only-verification-secret";
}
function base64Url(value) {
	const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);
	let binary = "";
	bytes.forEach((byte) => binary += String.fromCharCode(byte));
	return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function fromBase64Url(value) {
	const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
	return atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="));
}
async function digest(value) {
	const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
	return Array.from(new Uint8Array(bytes)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function signature(value) {
	const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret()), {
		name: "HMAC",
		hash: "SHA-256"
	}, false, ["sign"]);
	return base64Url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
}
async function seal(challenge) {
	const payload = base64Url(JSON.stringify(challenge));
	return `${payload}.${await signature(payload)}`;
}
async function unseal(value) {
	if (!value) return null;
	const [payload, provided] = value.split(".");
	if (!payload || !provided || await signature(payload) !== provided) return null;
	try {
		const data = JSON.parse(fromBase64Url(payload));
		if (typeof data.email !== "string" || typeof data.codeHash !== "string" || typeof data.expiresAt !== "number" || Date.now() > data.expiresAt) return null;
		return data;
	} catch {
		return null;
	}
}
function cookie(value, maxAge, secure) {
	return `${COOKIE}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`;
}
function getCookie(request) {
	return request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(29) ?? null;
}
var Route$21 = createFileRoute("/api/signup-verification")({ server: { handlers: { POST: async ({ request }) => {
	const secure = new URL(request.url).protocol === "https:";
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "JSON inválido." }, { status: 400 });
	}
	if (body.action === "request") {
		const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
		const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : void 0;
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Email inválido." }, { status: 400 });
		const code = String(Math.floor(Math.random() * 1e6)).padStart(6, "0");
		const challenge = {
			email,
			codeHash: await digest(`${email}:${code}`),
			expiresAt: Date.now() + MAX_AGE_SECONDS * 1e3
		};
		try {
			const { subject, html } = buildEmail("verify-email", {
				code,
				name,
				minutes: 15
			});
			const { sendWithResend } = await import("./resend.server-B5phQiG-.mjs");
			await sendWithResend({
				to: email,
				subject,
				html
			});
			return new Response(JSON.stringify({ ok: true }), { headers: {
				"content-type": "application/json",
				"set-cookie": await seal(challenge).then((value) => cookie(value, MAX_AGE_SECONDS, secure))
			} });
		} catch (error) {
			console.error("[/api/signup-verification]", error);
			return Response.json({ error: "Não foi possível enviar o código agora." }, { status: 502 });
		}
	}
	if (body.action === "verify") {
		const code = typeof body.code === "string" ? body.code.trim() : "";
		const challenge = await unseal(getCookie(request));
		if (!challenge || !/^\d{6}$/.test(code)) return Response.json({
			ok: false,
			error: "Código inválido ou expirado."
		}, { status: 400 });
		if (!(await digest(`${challenge.email}:${code}`) === challenge.codeHash)) return Response.json({
			ok: false,
			error: "Código incorrecto."
		}, { status: 400 });
		return new Response(JSON.stringify({
			ok: true,
			email: challenge.email
		}), { headers: {
			"content-type": "application/json",
			"set-cookie": cookie("", 0, secure)
		} });
	}
	return Response.json({ error: "Acção inválida." }, { status: 400 });
} } } });
var $$splitErrorComponentImporter$1 = () => import("./category._slug-BzK1-dDl.mjs");
var $$splitNotFoundComponentImporter$2 = () => import("./category._slug-CBHKUNFI.mjs");
var $$splitComponentImporter$20 = () => import("./category._slug-BbqsfmAu.mjs");
var Route$20 = createFileRoute("/category/$slug")({
	validateSearch: (search) => ({ sub: typeof search.sub === "string" ? search.sub : void 0 }),
	loader: ({ params }) => ({ slug: params.slug }),
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `Categoria — Bazarixy` }, {
		name: "description",
		content: `Compre produtos com preços incríveis.`
	}] : [] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent")
});
var $$splitComponentImporter$19 = () => import("./justina.index-CW0655kV.mjs");
var Route$19 = createFileRoute("/justina/")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./justina.categorias-9cPYqUvA.mjs");
var Route$18 = createFileRoute("/justina/categorias")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./justina.config-Ds6aZIK5.mjs");
var Route$17 = createFileRoute("/justina/config")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./justina.cupons-g3RcC7MA.mjs");
var Route$16 = createFileRoute("/justina/cupons")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./justina.equipa-DdusQxL6.mjs");
var Route$15 = createFileRoute("/justina/equipa")({
	head: () => ({ meta: [
		{ title: "Equipa — Admin Bazarixy" },
		{
			name: "description",
			content: "Adicione membros da equipa e defina o sector de cada um."
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./justina.home-tPhyKkvs.mjs");
var Route$14 = createFileRoute("/justina/home")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./justina.logistica-E5DGgy7v.mjs");
var Route$13 = createFileRoute("/justina/logistica")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./justina.lojas-Dtmcpsbn.mjs");
var Route$12 = createFileRoute("/justina/lojas")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./justina.metas-CPxn4yQY.mjs");
var Route$11 = createFileRoute("/justina/metas")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./justina.pagamentos-CUUxF-lS.mjs");
var Route$10 = createFileRoute("/justina/pagamentos")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./justina.pedidos-DKpVQZrj.mjs");
/** Renders one quarter-A4 invoice card. Four of these fit on a single A4 sheet. */
/** Prints every «Processando» order — 4 invoices per A4 sheet. */
var Route$9 = createFileRoute("/justina/pedidos")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./justina.pesquisas-DoYu-WiA.mjs");
var Route$8 = createFileRoute("/justina/pesquisas")({
	head: () => ({ meta: [
		{ title: "Pesquisas dos clientes — Bazarixy Admin" },
		{
			name: "description",
			content: "Veja o que os clientes procuram e encontre oportunidades para a loja."
		},
		{
			name: "robots",
			content: "noindex,nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./justina.produtos-D_u2kgl7.mjs");
var Route$7 = createFileRoute("/justina/produtos")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
/** Sugestões de atributos por tipo de produto — funciona para roupa, eletrónica, casa, etc. */
var $$splitComponentImporter$6 = () => import("./justina.receita-CJ3C-BNN.mjs");
var Route$6 = createFileRoute("/justina/receita")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./justina.usuarios-BByyvJts.mjs");
var Route$5 = createFileRoute("/justina/usuarios")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./pay._method-CbpvgwvR.mjs");
var Route$4 = createFileRoute("/pay/$method")({
	head: () => ({ meta: [
		{ title: "Pagamento — Bazarixy" },
		{
			name: "description",
			content: "Conclua o pagamento do seu pedido e envie o comprovativo para validação."
		},
		{
			property: "og:title",
			content: "Pagamento — Bazarixy"
		},
		{
			property: "og:description",
			content: "Instruções de pagamento e envio de comprovativo."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitErrorComponentImporter = () => import("./product._id-B0Cyo6qi.mjs");
var $$splitNotFoundComponentImporter$1 = () => import("./product._id-B1oLk-O-.mjs");
var $$splitComponentImporter$3 = () => import("./product._id-GSVP6wY7.mjs");
var Route$3 = createFileRoute("/product/$id")({
	validateSearch: (search) => ({ variant: typeof search.variant === "string" ? search.variant : void 0 }),
	loader: ({ params }) => getProduct(params.id) ?? null,
	head: ({ params, loaderData }) => {
		const path = paths.product(params.id);
		if (!loaderData) return {
			meta: [{ title: `Produto — ${SITE_NAME}` }],
			links: [{
				rel: "canonical",
				href: absoluteUrl(path)
			}]
		};
		const url = productUrl(params.id);
		const image = absoluteUrl(loaderData.image);
		const shareImage = loaderData.image ? image : SHARE_IMAGE;
		const price = loaderData.price;
		const desc = seoDescription(loaderData.description, `${loaderData.name} na ${SITE_NAME}.`);
		return {
			meta: [
				{ title: `${loaderData.name} — ${SITE_NAME}` },
				{
					name: "description",
					content: desc
				},
				{
					property: "og:site_name",
					content: SITE_NAME
				},
				{
					property: "og:locale",
					content: "pt_PT"
				},
				{
					property: "og:type",
					content: "product"
				},
				{
					property: "og:title",
					content: loaderData.name
				},
				{
					property: "og:description",
					content: desc
				},
				{
					property: "og:url",
					content: url
				},
				{
					property: "og:image",
					content: shareImage
				},
				{
					property: "og:image:secure_url",
					content: shareImage
				},
				{
					property: "og:image:width",
					content: "1200"
				},
				{
					property: "og:image:height",
					content: "630"
				},
				{
					property: "og:image:alt",
					content: loaderData.name
				},
				{
					property: "product:price:amount",
					content: String(price)
				},
				{
					property: "product:price:currency",
					content: "AOA"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:title",
					content: loaderData.name
				},
				{
					name: "twitter:description",
					content: desc
				},
				{
					name: "twitter:image",
					content: shareImage
				},
				{
					name: "twitter:image:alt",
					content: loaderData.name
				}
			],
			links: [{
				rel: "canonical",
				href: url
			}],
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Product",
					name: loaderData.name,
					description: desc,
					image: [image],
					url,
					brand: {
						"@type": "Brand",
						name: SITE_NAME
					},
					offers: {
						"@type": "Offer",
						price,
						priceCurrency: "AOA",
						availability: "https://schema.org/InStock",
						url
					}
				})
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
/** Dados reais da loja associada ao produto; o toque leva ao respetivo perfil. */
/** Colour / detail selector — shows each variant's cover photo and swaps the gallery. */
var $$splitNotFoundComponentImporter = () => import("./shop._id-4lftEIIF.mjs");
var $$splitComponentImporter$2 = () => import("./shop._id-DHkTw0F1.mjs");
var Route$2 = createFileRoute("/shop/$id")({
	loader: ({ params }) => ({
		id: params.id,
		shop: getShop(params.id)
	}),
	head: ({ params, loaderData }) => {
		const shop = loaderData?.shop;
		const name = shop?.name ?? "Loja";
		const desc = seoDescription(shop?.description, `Descubra a loja ${name} na ${SITE_NAME}.`);
		const image = absoluteUrl(shop?.cover || shop?.logo || "/favicon.ico");
		return {
			meta: [
				{ title: `${name} — Loja oficial | ${SITE_NAME}` },
				{
					name: "description",
					content: desc
				},
				{
					property: "og:site_name",
					content: SITE_NAME
				},
				{
					property: "og:title",
					content: `${name} — ${SITE_NAME}`
				},
				{
					property: "og:description",
					content: desc
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:locale",
					content: "pt_PT"
				},
				{
					property: "og:url",
					content: shopUrl(params.id)
				},
				{
					property: "og:image",
					content: SHARE_IMAGE
				},
				{
					property: "og:image:alt",
					content: name
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:title",
					content: `${name} — ${SITE_NAME}`
				},
				{
					name: "twitter:description",
					content: desc
				},
				{
					name: "twitter:image",
					content: SHARE_IMAGE
				},
				{
					name: "twitter:image:alt",
					content: name
				}
			],
			links: [{
				rel: "canonical",
				href: shopUrl(params.id)
			}],
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Store",
					name,
					description: desc,
					image,
					url: shopUrl(params.id),
					brand: {
						"@type": "Brand",
						name: SITE_NAME
					}
				})
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var $$splitComponentImporter$1 = () => import("./justina.abas._id-V7d9NNCn.mjs");
var Route$1 = createFileRoute("/justina/abas/$id")({
	head: () => ({ meta: [
		{ title: "Gerir aba da home — Bazarixy Admin" },
		{
			name: "description",
			content: "Crie e edite abas principais da página inicial: nome, categorias e banners exclusivos."
		},
		{
			property: "og:title",
			content: "Gerir aba da home — Bazarixy Admin"
		},
		{
			property: "og:description",
			content: "Crie e edite abas principais da página inicial: nome, categorias e banners exclusivos."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./justina.lojas._id-BTnsWCKg.mjs");
var Route = createFileRoute("/justina/lojas/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$43.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$44
});
var AuthRoute = Route$42.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$44
});
var CartRoute = Route$41.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$44
});
var CategoriesRoute = Route$40.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => Route$44
});
var CheckoutRoute = Route$39.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$44
});
var ComoPagarRoute = Route$38.update({
	id: "/como-pagar",
	path: "/como-pagar",
	getParentRoute: () => Route$44
});
var CouponsRoute = Route$37.update({
	id: "/coupons",
	path: "/coupons",
	getParentRoute: () => Route$44
});
var FavoritesRoute = Route$36.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => Route$44
});
var JustinaRoute = Route$35.update({
	id: "/justina",
	path: "/justina",
	getParentRoute: () => Route$44
});
var MeRoute = Route$34.update({
	id: "/me",
	path: "/me",
	getParentRoute: () => Route$44
});
var NotificationsRoute = Route$33.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => Route$44
});
var OrdersRoute = Route$32.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => Route$44
});
var PointsRoute = Route$31.update({
	id: "/points",
	path: "/points",
	getParentRoute: () => Route$44
});
var PrivacidadeRoute = Route$30.update({
	id: "/privacidade",
	path: "/privacidade",
	getParentRoute: () => Route$44
});
var SettingsRoute = Route$29.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$44
});
var StoreRoute = Route$28.update({
	id: "/store",
	path: "/store",
	getParentRoute: () => Route$44
});
var SuperOfertasRoute = Route$27.update({
	id: "/super-ofertas",
	path: "/super-ofertas",
	getParentRoute: () => Route$44
});
var SupportRoute = Route$26.update({
	id: "/support",
	path: "/support",
	getParentRoute: () => Route$44
});
var TermosRoute = Route$25.update({
	id: "/termos",
	path: "/termos",
	getParentRoute: () => Route$44
});
var TrocasDevolucoesRoute = Route$24.update({
	id: "/trocas-devolucoes",
	path: "/trocas-devolucoes",
	getParentRoute: () => Route$44
});
var WalletRoute = Route$23.update({
	id: "/wallet",
	path: "/wallet",
	getParentRoute: () => Route$44
});
var ApiEmailRoute = Route$22.update({
	id: "/api/email",
	path: "/api/email",
	getParentRoute: () => Route$44
});
var ApiSignupVerificationRoute = Route$21.update({
	id: "/api/signup-verification",
	path: "/api/signup-verification",
	getParentRoute: () => Route$44
});
var CategorySlugRoute = Route$20.update({
	id: "/category/$slug",
	path: "/category/$slug",
	getParentRoute: () => Route$44
});
var JustinaIndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => JustinaRoute
});
var JustinaCategoriasRoute = Route$18.update({
	id: "/categorias",
	path: "/categorias",
	getParentRoute: () => JustinaRoute
});
var JustinaConfigRoute = Route$17.update({
	id: "/config",
	path: "/config",
	getParentRoute: () => JustinaRoute
});
var JustinaCuponsRoute = Route$16.update({
	id: "/cupons",
	path: "/cupons",
	getParentRoute: () => JustinaRoute
});
var JustinaEquipaRoute = Route$15.update({
	id: "/equipa",
	path: "/equipa",
	getParentRoute: () => JustinaRoute
});
var JustinaHomeRoute = Route$14.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => JustinaRoute
});
var JustinaLogisticaRoute = Route$13.update({
	id: "/logistica",
	path: "/logistica",
	getParentRoute: () => JustinaRoute
});
var JustinaLojasRoute = Route$12.update({
	id: "/lojas",
	path: "/lojas",
	getParentRoute: () => JustinaRoute
});
var JustinaMetasRoute = Route$11.update({
	id: "/metas",
	path: "/metas",
	getParentRoute: () => JustinaRoute
});
var JustinaPagamentosRoute = Route$10.update({
	id: "/pagamentos",
	path: "/pagamentos",
	getParentRoute: () => JustinaRoute
});
var JustinaPedidosRoute = Route$9.update({
	id: "/pedidos",
	path: "/pedidos",
	getParentRoute: () => JustinaRoute
});
var JustinaPesquisasRoute = Route$8.update({
	id: "/pesquisas",
	path: "/pesquisas",
	getParentRoute: () => JustinaRoute
});
var JustinaProdutosRoute = Route$7.update({
	id: "/produtos",
	path: "/produtos",
	getParentRoute: () => JustinaRoute
});
var JustinaReceitaRoute = Route$6.update({
	id: "/receita",
	path: "/receita",
	getParentRoute: () => JustinaRoute
});
var JustinaUsuariosRoute = Route$5.update({
	id: "/usuarios",
	path: "/usuarios",
	getParentRoute: () => JustinaRoute
});
var PayMethodRoute = Route$4.update({
	id: "/pay/$method",
	path: "/pay/$method",
	getParentRoute: () => Route$44
});
var ProductIdRoute = Route$3.update({
	id: "/product/$id",
	path: "/product/$id",
	getParentRoute: () => Route$44
});
var ShopIdRoute = Route$2.update({
	id: "/shop/$id",
	path: "/shop/$id",
	getParentRoute: () => Route$44
});
var JustinaAbasIdRoute = Route$1.update({
	id: "/abas/$id",
	path: "/abas/$id",
	getParentRoute: () => JustinaRoute
});
var JustinaLojasRouteChildren = { JustinaLojasIdRoute: Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => JustinaLojasRoute
}) };
var JustinaRouteChildren = {
	JustinaCategoriasRoute,
	JustinaConfigRoute,
	JustinaCuponsRoute,
	JustinaEquipaRoute,
	JustinaHomeRoute,
	JustinaLogisticaRoute,
	JustinaLojasRoute: JustinaLojasRoute._addFileChildren(JustinaLojasRouteChildren),
	JustinaMetasRoute,
	JustinaPagamentosRoute,
	JustinaPedidosRoute,
	JustinaPesquisasRoute,
	JustinaProdutosRoute,
	JustinaReceitaRoute,
	JustinaUsuariosRoute,
	JustinaIndexRoute,
	JustinaAbasIdRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthRoute,
	CartRoute,
	CategoriesRoute,
	CheckoutRoute,
	ComoPagarRoute,
	CouponsRoute,
	FavoritesRoute,
	JustinaRoute: JustinaRoute._addFileChildren(JustinaRouteChildren),
	MeRoute,
	NotificationsRoute,
	OrdersRoute,
	PointsRoute,
	PrivacidadeRoute,
	SettingsRoute,
	StoreRoute,
	SuperOfertasRoute,
	SupportRoute,
	TermosRoute,
	TrocasDevolucoesRoute,
	WalletRoute,
	ApiEmailRoute,
	ApiSignupVerificationRoute,
	CategorySlugRoute,
	PayMethodRoute,
	ProductIdRoute,
	ShopIdRoute
};
var routeTree = Route$44._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll$1({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route$20 as a, actions as c, Route$2 as i, router_CY1rd_zI_exports as l, PHONE as n, Route$3 as o, Route$1 as r, WHATSAPP as s, INSTAGRAM as t, useStore as u };
