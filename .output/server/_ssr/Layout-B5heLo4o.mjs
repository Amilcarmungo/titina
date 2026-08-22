import { r as __toESM } from "../_runtime.mjs";
import "../_libs/firebase.mjs";
import { t as firebaseEnabled } from "./client-C80F8PZn.mjs";
import { D as signInWithGoogle, E as signInWithFacebook, F as useStore, T as signInWithEmail, f as authErrorMessage, h as emailHasAccount, k as signUpWithEmail, l as actions, n as NeedsPasswordLinkError, v as linkGoogleToPasswordAccount, x as resetPassword } from "./router-C57BLtN5.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as notificationActions, h as useUnreadCount, m as useNotifications } from "./orders-store-fkxM3akK.mjs";
import { t as getAnyProduct } from "./products-store-TDcUsz9F.mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as useHomeConfig, n as setActiveHomeTab, r as useActiveHomeTab } from "./home-config-CaKXkxMI.mjs";
import { i as useBannerIndex, o as useSlides } from "./banner-CMZuaEz9.mjs";
import { n as useCategories } from "./categories-store-C4Vdw11E.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { Bt as ChevronDown, D as Settings, H as Package, Ht as CheckCheck, Ot as DollarSign, R as Plus, Rt as ChevronRight, S as ShoppingCart, Tt as EyeOff, U as PackageOpen, W as Minus, X as LogOut, _t as Globe, a as User, dt as House, ft as Heart, m as Ticket, n as X, ot as Info, p as Trash2, pt as Headset, q as Menu, r as Wallet, rt as LayoutGrid, u as Truck, ut as ImageOff, vt as Gift, w as ShieldCheck, wt as Eye, y as Sparkles, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Layout-B5heLo4o.js
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
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var infoLinks = [
	{
		label: "Suporte",
		to: "/support"
	},
	{ label: "Info de Envio" },
	{ label: "Política de Devolução" },
	{ label: "Reembolso" },
	{
		label: "Como Pagar",
		to: "/como-pagar"
	},
	{ label: "Centro de Privacidade" },
	{ label: "Cookies" }
];
function MobileMenu({ open, onOpenChange }) {
	const categories = useCategories();
	const cfg = useHomeConfig();
	const [tab, setTab] = (0, import_react.useState)(0);
	const [infoOpen, setInfoOpen] = (0, import_react.useState)(true);
	/** Same category tabs used no cabeçalho / banner. */
	const topTabs = cfg.homeTabs.length ? cfg.homeTabs : [{
		id: "t-all",
		label: "Tudo",
		slugs: []
	}];
	const activeTab = topTabs[Math.min(tab, topTabs.length - 1)];
	const visibleCats = activeTab.slugs.length ? categories.filter((c) => activeTab.slugs.includes(c.slug)) : categories;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "left",
			className: "w-[85vw] max-w-sm p-0 flex flex-col gap-0 pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "sr-only",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Menu" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border pl-2 pr-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-scrollbar flex flex-1 gap-5 overflow-x-auto px-2 py-3",
						children: topTabs.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setTab(i),
							className: `relative whitespace-nowrap text-sm font-bold ${i === tab ? "text-foreground after:absolute after:-bottom-2.5 after:left-0 after:right-0 after:h-0.5 after:bg-foreground" : "text-muted-foreground"}`,
							children: t.label
						}, t.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onOpenChange(false),
						className: "grid h-9 w-9 place-items-center rounded bg-foreground text-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "py-1",
							children: [visibleCats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/category/$slug",
								params: { slug: c.slug },
								onClick: () => onOpenChange(false),
								className: "flex items-center gap-3 px-4 py-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-muted",
										children: c.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: c.image,
											alt: c.name,
											className: "h-full w-full object-cover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xl",
											children: c.emoji
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 text-[15px] font-medium",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
								]
							}) }, c.slug)), visibleCats.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "px-4 py-6 text-center text-sm text-muted-foreground",
								children: "Sem categorias nesta aba."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 bg-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "divide-y divide-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 text-sm",
										children: "Alterar Moeda"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "AOA"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 text-sm",
										children: "Alterar Idioma"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Português"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 bg-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setInfoOpen((v) => !v),
							className: "flex w-full items-center justify-between px-4 py-3 text-sm font-bold",
							children: ["BAZARIXY Info", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform ${infoOpen ? "" : "-rotate-90"}` })]
						}),
						infoOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "pb-4",
							children: infoLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-[15px]",
								children: l.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: l.to,
									onClick: () => onOpenChange(false),
									className: "block px-4 py-2.5",
									children: l.label
								}) : l.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: l.href,
									target: "_blank",
									rel: "noreferrer",
									className: "block px-4 py-2.5",
									children: l.label
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block px-4 py-2.5",
									children: l.label
								})
							}, l.label))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "absolute inset-x-0 bottom-0 grid grid-cols-4 border-t border-border bg-background",
					children: [
						{
							to: "/",
							icon: House,
							label: "Loja"
						},
						{
							to: "/notifications",
							icon: Heart,
							label: "Notificações"
						},
						{
							to: "/support",
							icon: Headset,
							label: "Suporte"
						},
						{
							to: "/me",
							icon: User,
							label: "Mim"
						}
					].map((it) => {
						const Icon = it.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: it.to,
							onClick: () => onOpenChange(false),
							className: "flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-5 w-5",
								strokeWidth: 1.9
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it.label })]
						}, it.to);
					})
				})
			]
		})
	});
}
async function requestSignupVerification(email, name) {
	const response = await fetch("/api/signup-verification", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			action: "request",
			email,
			name
		})
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.error ?? "Não foi possível enviar o código.");
	return true;
}
async function verifySignupVerification(code) {
	const response = await fetch("/api/signup-verification", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			action: "verify",
			code
		})
	});
	const data = await response.json();
	if (!response.ok || !data.ok) return {
		ok: false,
		error: data.error ?? "Código inválido."
	};
	return {
		ok: true,
		email: data.email ?? ""
	};
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "h-5 w-5",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.2 2.8-2.5 3.7v3h4c2.4-2.2 3.5-5.4 3.5-8.8z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 24c3.2 0 5.9-1.1 7.9-2.9l-4-3c-1.1.7-2.5 1.2-3.9 1.2-3 0-5.6-2-6.5-4.8H1.4v3C3.4 21.3 7.4 24 12 24z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.5 14.5c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3v-3H1.4C.5 8.6 0 10.2 0 12s.5 3.4 1.4 5l4.1-2.5z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.7l4.1 3c.9-2.8 3.5-4.9 6.5-4.9z"
			})
		]
	});
}
function FacebookIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "h-5 w-5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#1877F2",
			d: "M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"
		})
	});
}
function AppleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "h-5 w-5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M16.4 12.7c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.7 2.4 3 2.4 1.2-.1 1.7-.8 3.1-.8 1.5 0 1.9.8 3.1.8 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7 0 0-2.5-1-2.5-3.9zM14.2 5.6c.7-.8 1.1-1.9 1-3-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.8-1.4z"
		})
	});
}
/** Desktop-only login modal (square corners, no rounding). */
function LoginModal() {
	const { loginOpen } = useStore();
	const [step, setStep] = import_react.useState("email");
	const [email, setEmail] = import_react.useState("");
	const [password, setPassword] = import_react.useState("");
	const [code, setCode] = import_react.useState("");
	const [showPass, setShowPass] = import_react.useState(false);
	const [error, setError] = import_react.useState("");
	const [agree, setAgree] = import_react.useState(false);
	/** Bloqueia todos os botões enquanto o pedido corre (evita duplo clique). */
	const [busy, setBusy] = import_react.useState(false);
	/** Credencial do Google à espera de ser LIGADA a uma conta com senha. */
	const [pendingGoogle, setPendingGoogle] = import_react.useState(null);
	import_react.useEffect(() => {
		if (!loginOpen) {
			setStep("email");
			setEmail("");
			setPassword("");
			setCode("");
			setError("");
			setAgree(false);
			setShowPass(false);
			setPendingGoogle(null);
			setBusy(false);
		}
	}, [loginOpen]);
	const guard = async (fn) => {
		if (!firebaseEnabled) {
			setError("Backend não configurado.");
			return;
		}
		if (busy) return;
		setBusy(true);
		setError("");
		try {
			await fn();
		} catch (err) {
			setError(authErrorMessage(err));
		} finally {
			setBusy(false);
		}
	};
	const continueEmail = () => void guard(async () => {
		const v = email.trim();
		if (!v || !v.includes("@")) {
			setError("Informe um email válido.");
			return;
		}
		setStep(await emailHasAccount(v) ? "signin" : "signup");
	});
	const doSignIn = () => void guard(async () => {
		if (!password) {
			setError("Digite sua senha.");
			return;
		}
		if (pendingGoogle) {
			await linkGoogleToPasswordAccount(email, password, pendingGoogle);
			setPendingGoogle(null);
		} else await signInWithEmail(email, password);
		actions.closeLogin();
	});
	const validPass = password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password) && !/\s/.test(password);
	const doSignUp = () => void guard(async () => {
		if (!validPass) {
			setError("Senha inválida.");
			return;
		}
		if (!agree) {
			setError("Você precisa aceitar os termos.");
			return;
		}
		await requestSignupVerification(email);
		setCode("");
		setStep("verify");
	});
	const doGoogle = () => void guard(async () => {
		try {
			if (await signInWithGoogle()) actions.closeLogin();
		} catch (err) {
			if (err instanceof NeedsPasswordLinkError) {
				setEmail(err.email);
				setPendingGoogle(err.credential);
				setStep("signin");
				setError("Esta conta já usa senha. Confirme a senha para activar também o Google.");
				return;
			}
			throw err;
		}
	});
	const doFacebook = () => void guard(async () => {
		if (await signInWithFacebook()) actions.closeLogin();
	});
	const doReset = () => void guard(async () => {
		await resetPassword(email);
		setError("Enviamos um link de recuperação para seu email.");
	});
	const doVerify = () => void guard(async () => {
		const result = await verifySignupVerification(code);
		if (!result.ok) {
			setError(result.error);
			return;
		}
		await signUpWithEmail(email, password);
		actions.closeLogin();
	});
	const resendCode = () => void guard(async () => {
		await requestSignupVerification(email);
		setCode("");
		setError("Novo código enviado para o seu email.");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: loginOpen,
		onOpenChange: (o) => o ? actions.openLogin() : actions.closeLogin(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed left-1/2 top-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-0 border border-border bg-background p-8 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "sr-only",
					children: "Entrar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "absolute right-4 top-4 p-1.5 text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}),
				step !== "email" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setStep("email");
						setPassword("");
						setError("");
					},
					className: "absolute left-4 top-4 p-1.5 text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
				}),
				step === "email" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-3 divide-x divide-border bg-brand/25 py-3 text-center",
						children: [
							{
								icon: Ticket,
								t: "30% Off",
								s: "Primeiro Pedido"
							},
							{
								icon: Truck,
								t: "Frete Grátis",
								s: "*Condições"
							},
							{
								icon: PackageOpen,
								t: "Devolução",
								s: "*Condições"
							}
						].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "mx-auto h-5 w-5 text-sale" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[12px] font-bold",
									children: b.t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] leading-tight text-muted-foreground",
									children: b.s
								})
							]
						}, b.t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-5 block text-xs text-muted-foreground",
						children: "Email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: email,
						onChange: (e) => setEmail(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") continueEmail();
						},
						className: "mt-1 h-11 w-full border border-border bg-background px-4 outline-none focus:border-brand-strong"
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-sale",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: continueEmail,
						disabled: busy,
						className: "mt-5 h-11 w-full bg-brand-strong text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
						children: busy ? "A verificar…" : "Continuar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-4 flex items-center gap-3 text-[11px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ou continue com" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: doGoogle,
						disabled: busy,
						className: "flex h-11 w-full items-center justify-center gap-3 border border-border bg-background text-sm font-bold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), " Continuar com o Google"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex items-center justify-center gap-4",
						children: [{
							Icon: FacebookIcon,
							label: "Facebook"
						}, {
							Icon: AppleIcon,
							label: "Apple"
						}].map(({ Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": label,
							onClick: label === "Facebook" ? doFacebook : void 0,
							disabled: busy || label === "Apple",
							className: "grid h-11 w-11 place-items-center rounded-full border border-border bg-background shadow-sm transition hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {})
						}, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex items-center justify-center gap-1 text-[11px] text-emerald-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), " Seus dados estão protegidos."]
					})
				] }),
				step === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-xl font-bold",
						children: "Bem-vindo de volta!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Entre com sua senha para continuar."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-5 block text-xs text-muted-foreground",
						children: "Email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 flex h-11 items-center border border-border bg-muted px-4 text-sm",
						children: email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-4 block text-xs text-muted-foreground",
						children: "Senha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: showPass ? "text" : "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") doSignIn();
							},
							className: "h-11 w-full border border-border bg-background px-4 pr-10 outline-none focus:border-brand-strong"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowPass((s) => !s),
							className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
							children: showPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-sale",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: doSignIn,
						disabled: busy,
						className: "mt-5 h-11 w-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
						children: busy ? "A entrar…" : "Entrar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: doReset,
						disabled: busy,
						className: "mt-3 block w-full text-center text-sm text-brand-strong disabled:opacity-60",
						children: "Esqueci minha senha"
					})
				] }),
				step === "verify" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-xl font-bold",
						children: "Verifique o seu email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"Enviámos um código de 6 dígitos para ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
							". A conta só será criada depois da confirmação."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-5 block text-xs text-muted-foreground",
						children: "Código de verificação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: code,
						onChange: (event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6)),
						onKeyDown: (event) => {
							if (event.key === "Enter") doVerify();
						},
						inputMode: "numeric",
						autoComplete: "one-time-code",
						placeholder: "000000",
						className: "mt-1 h-14 w-full border border-border bg-background text-center text-2xl font-black tracking-[10px] outline-none focus:border-brand-strong"
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-sale",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: doVerify,
						disabled: busy || code.length !== 6,
						className: "mt-5 h-11 w-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
						children: busy ? "A confirmar…" : "Confirmar e criar conta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: resendCode,
						disabled: busy,
						className: "mt-4 block w-full text-center text-sm font-medium text-brand-strong disabled:opacity-60",
						children: "Reenviar código"
					})
				] }),
				step === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-xl font-bold",
						children: "Olá, Novo Amigo!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Defina sua senha para criar uma conta."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-5 block text-xs text-muted-foreground",
						children: "Endereço de email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 flex h-11 items-center border border-border bg-muted px-4 text-sm font-semibold",
						children: email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-4 block text-xs text-muted-foreground",
						children: "Senha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: showPass ? "text" : "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "h-11 w-full border border-border bg-background px-4 pr-10 outline-none focus:border-brand-strong"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowPass((s) => !s),
							className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
							children: showPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 space-y-0.5 text-[12px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: password.length >= 8 ? "text-emerald-600" : "text-sale",
								children: "• Mínimo de 8 caracteres"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: /[a-zA-Z]/.test(password) ? "text-emerald-600" : "text-sale",
								children: "• Pelo menos uma letra"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: /\d/.test(password) ? "text-emerald-600" : "text-sale",
								children: "• Pelo menos um número"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: !/\s/.test(password) && password.length > 0 ? "text-emerald-600" : "text-muted-foreground",
								children: "• A senha não pode conter espaços em branco."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 flex items-start gap-2 text-[12px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: agree,
							onChange: (e) => setAgree(e.target.checked),
							className: "mt-0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"(Obrigatório) Concordo com a",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacidade",
								onClick: () => actions.closeLogin(),
								className: "text-brand-strong underline",
								children: "Política de Privacidade"
							}),
							" ",
							"e com",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/termos",
								onClick: () => actions.closeLogin(),
								className: "text-brand-strong underline",
								children: "os Termos & Condições"
							}),
							"."
						] })]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-sale",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: doSignUp,
						disabled: busy,
						className: "mt-5 h-11 w-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
						children: busy ? "A criar conta…" : "Cadastre-se"
					})
				] })
			]
		})] })
	});
}
/**
* Imagem com Skeleton/Shimmer enquanto carrega.
* - o esqueleto fica visível até o `onLoad` confirmar o carregamento total;
* - se falhar, mostra um estado elegante em vez do ícone quebrado do browser;
* - fade-in suave ao aparecer e `loading="lazy"` por omissão.
*/
/**
* Cache inteligente de imagens já carregadas.
* Uma imagem vista antes nesta sessão aparece de imediato (sem shimmer nem
* novo pedido), evitando o "recarregar" constante ao navegar entre páginas.
*/
var LOADED_KEY = "img_cache_v1";
var loaded = new Set((() => {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(sessionStorage.getItem(LOADED_KEY) || "[]");
	} catch {
		return [];
	}
})());
function rememberLoaded(src) {
	if (loaded.has(src)) return;
	loaded.add(src);
	if (typeof window === "undefined") return;
	try {
		sessionStorage.setItem(LOADED_KEY, JSON.stringify([...loaded].slice(-400)));
	} catch {}
}
function SmartImage({ src, alt, className = "", wrapperClassName = "", eager, draggable, rounded = "" }) {
	const [state, setState] = (0, import_react.useState)(() => src && loaded.has(src) ? "ready" : "loading");
	(0, import_react.useEffect)(() => {
		if (src && loaded.has(src)) {
			setState("ready");
			return;
		}
		setState("loading");
	}, [src]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative overflow-hidden bg-muted ${rounded} ${wrapperClassName}`,
		children: [
			state !== "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `absolute inset-0 shimmer ${rounded}`,
				"aria-hidden": true
			}),
			state === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, { className: "h-4 w-4 opacity-60" })
			}),
			src && state !== "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: state === "ready" ? alt : "",
				draggable,
				loading: eager ? "eager" : "lazy",
				decoding: eager ? "sync" : "async",
				fetchPriority: eager ? "high" : "auto",
				onLoad: () => {
					rememberLoaded(src);
					setState("ready");
				},
				onError: () => setState("error"),
				className: `h-full w-full transition-opacity duration-500 ${state === "ready" ? "opacity-100" : "opacity-0"} ${className}`
			})
		]
	});
}
/** Bloco de esqueleto genérico para textos, cartões e listas. */
function Skeleton({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `shimmer rounded-md ${className}`,
		"aria-hidden": true
	});
}
/** Desktop notifications drawer — slides in from the right. */
function NotificationsDrawer() {
	const { notifDrawerOpen } = useStore();
	const items = useNotifications();
	const unread = items.filter((n) => !n.read).length;
	const ICONS = {
		order: Package,
		delivery: Truck,
		coupon: Ticket,
		product: Sparkles,
		system: Info
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: notifDrawerOpen,
		onOpenChange: (o) => o ? actions.openNotifDrawer() : actions.closeNotifDrawer(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-[400px] sm:max-w-[400px] flex flex-col p-0 gap-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "border-b border-border px-4 py-3 flex-row items-center justify-between space-y-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
						className: "text-base flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${unread ? "fill-gold/30 text-gold" : ""}` }),
							" ",
							"Notificações",
							unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-brand-foreground",
								children: unread
							})
						]
					})
				}),
				items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border px-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => notificationActions.markAllRead(),
						className: "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-3.5 w-3.5" }), " Marcar tudo como lido"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/notifications",
						onClick: () => actions.closeNotifDrawer(),
						className: "ml-auto text-xs font-bold text-muted-foreground hover:text-foreground",
						children: "Ver tudo"
					})]
				}),
				items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col items-center justify-center px-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							className: "h-14 w-14 text-muted-foreground",
							strokeWidth: 1.2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-bold",
							children: "Sem notificações"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Avisamos aqui sobre pedidos, entregas e cupões."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 divide-y divide-border overflow-y-auto",
					children: items.map((n) => {
						const Icon = ICONS[n.kind] ?? Info;
						const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex gap-3 px-4 py-3 ${n.read ? "" : "bg-brand/10"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid h-9 w-9 shrink-0 place-items-center rounded-full ${n.read ? "bg-muted text-muted-foreground" : "bg-gold/20 text-gold"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-bold",
											children: n.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 line-clamp-2 text-xs text-muted-foreground",
											children: n.body
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[10px] uppercase tracking-wide text-muted-foreground",
											children: n.createdAt
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.preventDefault();
										notificationActions.remove(n.id);
									},
									"aria-label": "Remover notificação",
									className: "self-start p-1 text-muted-foreground hover:text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})
							]
						});
						if (!n.href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: body }, n.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: n.href,
							onClick: () => {
								notificationActions.markRead(n.id);
								actions.closeNotifDrawer();
							},
							className: "block hover:bg-muted/40",
							children: body
						}, n.id);
					})
				})
			]
		})
	});
}
/** Desktop mini cart drawer — opens as a slim panel from the left. */
function CartDrawer() {
	const { cart, cartDrawerOpen } = useStore();
	const items = cart.map((c) => ({
		...c,
		product: getAnyProduct(c.id)
	})).filter((i) => i.product);
	const subtotal = items.reduce((s, i) => s + (i.unitPrice ?? i.product.price) * i.qty, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: cartDrawerOpen,
		onOpenChange: (o) => o ? actions.openCartDrawer() : actions.closeCartDrawer(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-[380px] sm:max-w-[380px] flex flex-col p-0 gap-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
				className: "border-b border-border px-4 py-3 flex-row items-center justify-between space-y-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
					className: "text-base flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" }),
						" Seu Carrinho · ",
						items.length
					]
				})
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
						className: "h-14 w-14 text-muted-foreground",
						strokeWidth: 1.2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-bold",
						children: "Sua sacola está vazia"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						onClick: () => actions.closeCartDrawer(),
						className: "mt-4 rounded-full bg-foreground px-6 py-2 text-xs font-bold text-background",
						children: "Explorar produtos"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-3 space-y-2",
				children: items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 rounded-lg border border-border p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src: item.product.image,
							alt: item.product.name,
							rounded: "rounded",
							wrapperClassName: "h-20 w-16 shrink-0",
							className: "object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "line-clamp-2 text-xs",
									children: item.product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-[10px] text-muted-foreground",
									children: item.size
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-bold text-sale",
										children: formatKz(item.unitPrice ?? item.product.price)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center rounded-full border border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => actions.updateQty(idx, item.qty - 1),
												className: "grid h-6 w-6 place-items-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-5 text-center text-xs",
												children: item.qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => actions.updateQty(idx, item.qty + 1),
												className: "grid h-6 w-6 place-items-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
											})
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => actions.removeFromCart(idx),
							className: "self-start p-1 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
						})
					]
				}, idx))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Subtotal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-sale",
						children: formatKz(subtotal)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/checkout",
					onClick: () => actions.closeCartDrawer(),
					className: "block w-full rounded-full py-2.5 text-center text-sm font-bold text-white",
					style: { background: "var(--gradient-gold)" },
					children: "Finalizar Compra"
				})]
			})] })]
		})
	});
}
/** Desktop favorites drawer — opens as a slim panel from the left. */
function FavoritesDrawer() {
	const { favorites, favDrawerOpen } = useStore();
	const items = favorites.map((id) => getAnyProduct(id)).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: favDrawerOpen,
		onOpenChange: (o) => o ? actions.openFavDrawer() : actions.closeFavDrawer(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-[380px] sm:max-w-[380px] flex flex-col p-0 gap-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
				className: "border-b border-border px-4 py-3 flex-row items-center justify-between space-y-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
					className: "text-base flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4" }),
						" Favoritos · ",
						items.length
					]
				})
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
						className: "h-14 w-14 text-muted-foreground",
						strokeWidth: 1.2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-bold",
						children: "Está vazio aqui."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						onClick: () => actions.closeFavDrawer(),
						className: "mt-4 rounded-full bg-foreground px-6 py-2 text-xs font-bold text-background",
						children: "Comprar agora"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-3 grid grid-cols-2 gap-2",
				children: items.map((p) => p && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/product/$id",
					params: { id: p.id },
					onClick: () => actions.closeFavDrawer(),
					className: "overflow-hidden rounded-lg border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-square bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src: p.image,
							alt: p.name,
							wrapperClassName: "absolute inset-0 h-full w-full",
							className: "object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: (e) => {
								e.preventDefault();
								e.stopPropagation();
								actions.toggleFavorite(p.id);
							},
							className: "absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-white/90",
							"aria-label": "Remover",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-2 text-[11px]",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs font-bold text-sale",
							children: formatKz(p.price)
						})]
					})]
				}, p.id))
			})]
		})
	});
}
/** Desktop profile drawer — opens as a slim panel from the right. */
function ProfileDrawer() {
	const { user, profileDrawerOpen, cart, favorites } = useStore();
	const cartCount = cart.reduce((s, c) => s + c.qty, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: profileDrawerOpen,
		onOpenChange: (o) => o ? actions.openProfileDrawer() : actions.closeProfileDrawer(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-[380px] sm:max-w-[380px] flex flex-col p-0 gap-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
				className: "border-b border-border px-4 py-3 flex-row items-center justify-between space-y-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
					className: "text-base flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), " Minha Conta"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-4 space-y-4",
				children: [
					user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-foreground text-background font-bold",
							children: user.email[0]?.toUpperCase()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-bold",
								children: user.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Bazarixy Member"
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							actions.closeProfileDrawer();
							actions.openLogin();
						},
						className: "w-full rounded-full bg-foreground py-2.5 text-sm font-bold text-background",
						children: "Entrar / Cadastrar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2 text-center",
						children: [
							{
								icon: ShoppingCart,
								label: "Carrinho",
								value: cartCount
							},
							{
								icon: Heart,
								label: "Avisos",
								value: favorites.length
							},
							{
								icon: Gift,
								label: "Cupons",
								value: 2
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "mx-auto h-4 w-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm font-black",
									children: s.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: s.label
								})
							]
						}, s.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border divide-y divide-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/orders",
								search: { tab: "unpaid" },
								onClick: () => actions.closeProfileDrawer(),
								className: "flex items-center gap-3 px-3 py-3 text-sm hover:bg-muted/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: "Meus pedidos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/wallet",
								onClick: () => actions.closeProfileDrawer(),
								className: "flex items-center gap-3 px-3 py-3 text-sm hover:bg-muted/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: "Carteira"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/me",
								onClick: () => actions.closeProfileDrawer(),
								className: "flex items-center gap-3 px-3 py-3 text-sm hover:bg-muted/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: "Cupons & Pontos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/settings",
								onClick: () => actions.closeProfileDrawer(),
								className: "flex items-center gap-3 px-3 py-3 text-sm hover:bg-muted/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: "Configurações"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
								]
							})
						]
					}),
					user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							actions.signOut();
							actions.closeProfileDrawer();
						},
						className: "flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-bold text-red-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sair"]
					})
				]
			})]
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileMenu, {
				open: menuOpen,
				onOpenChange: setMenuOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoritesDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsDrawer, {})
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
export { SmartImage as a, verifySignupVerification as c, Skeleton as i, NotificationBell as n, requestSignupVerification as o, SearchIcon as r, requireAuth as s, Layout as t };
