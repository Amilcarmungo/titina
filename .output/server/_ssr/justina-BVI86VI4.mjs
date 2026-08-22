import { r as __toESM } from "../_runtime.mjs";
import { t as firebaseEnabled } from "./client-C80F8PZn.mjs";
import { D as signInWithGoogle, F as useStore, L as watchOrders, O as signOutUser, T as signInWithEmail, f as authErrorMessage } from "./router-C57BLtN5.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as setOrdersOwner } from "./orders-store-fkxM3akK.mjs";
import { a as useStaff, n as can, t as ROLE_LABEL } from "./roles-BxfhjeTv.mjs";
import { d as useRouterState, m as Outlet, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as ShoppingBag, D as Settings, H as Package, T as ShieldAlert, Tt as EyeOff, Wt as ChartColumn, X as LogOut, Z as Lock, _ as Store, bt as FolderTree, dt as House, f as TrendingUp, ft as Heart, h as Target, i as Users, k as Search, kt as CreditCard, m as Ticket, n as X, q as Menu, rt as LayoutGrid, u as Truck, w as ShieldCheck, wt as Eye } from "../_libs/lucide-react.mjs";
import { t as bazarixy_logo_webp_asset_default } from "./bazarixy-logo.webp.asset-DpuZaeeP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina-BVI86VI4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Portão do painel: exige sessão Firebase E um documento `staff/{uid}` ativo.
* As permissões vivem no backend (Firestore + regras); aqui só refletimos.
*/
function AdminGate({ children }) {
	const { user } = useStore();
	const { staff, loading } = useStaff();
	if (!firebaseEnabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		title: "Backend não configurado",
		text: "Configure as chaves do Firebase no .env para usar o painel."
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, {});
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		title: "A verificar permissões…",
		text: "Um instante."
	});
	if (!staff) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoStaff, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sr-only",
		children: ["Sessão: ", ROLE_LABEL[staff.role]]
	}), children] });
}
/** Conta sem permissão: mensagem neutra, sem revelar como o acesso é concedido. */
function NoStaff() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-muted/30 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-2xl bg-background p-6 text-center shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5 text-sale" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-lg font-bold",
					children: "Acesso restrito"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Esta conta não tem permissão para entrar no painel. Se acredita que se trata de um engano, fale com um administrador da loja."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => void signOutUser(),
						className: "flex flex-1 items-center justify-center gap-1 rounded-full border border-border py-2.5 text-sm font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Trocar conta"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex-1 rounded-full bg-brand-strong py-2.5 text-center text-sm font-bold text-white",
						children: "Ir para a loja"
					})]
				})
			]
		})
	});
}
function Notice({ title, text, icon, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-muted/30 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-2xl bg-background p-6 text-center shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted",
					children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-lg font-bold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: text
				}),
				action && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => void signOutUser(),
						className: "flex flex-1 items-center justify-center gap-1 rounded-full border border-border py-2.5 text-sm font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Trocar conta"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex-1 rounded-full bg-brand-strong py-2.5 text-sm font-bold text-white",
						children: "Ir para a loja"
					})]
				})
			]
		})
	});
}
function AdminLogin() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const run = async (fn) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-muted/30 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-brand-strong" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-center text-lg font-bold",
					children: "Painel Bazarixy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-xs text-muted-foreground",
					children: "Acesso apenas para a equipa autorizada."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-5 block text-xs text-muted-foreground",
					children: "Email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: email,
					onChange: (e) => setEmail(e.target.value),
					autoComplete: "username",
					className: "mt-1 h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-brand-strong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-xs text-muted-foreground",
					children: "Senha"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: show ? "text" : "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") run(() => signInWithEmail(email, password));
						},
						autoComplete: "current-password",
						className: "h-11 w-full rounded-full border border-border bg-background px-4 pr-11 text-sm outline-none focus:border-brand-strong"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setShow((s) => !s),
						className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground",
						children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-sale",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => void run(() => signInWithEmail(email, password)),
					disabled: busy,
					className: "mt-4 h-11 w-full rounded-full bg-brand-strong text-sm font-bold text-white hover:opacity-90 disabled:opacity-60",
					children: busy ? "A entrar…" : "Entrar no painel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => void run(() => signInWithGoogle()),
					disabled: busy,
					className: "mt-2 h-11 w-full rounded-full border border-border text-sm font-bold hover:bg-muted disabled:opacity-60",
					children: "Continuar com o Google"
				})
			]
		})
	});
}
var GROUPS = [
	{
		title: "Visão geral",
		items: [
			{
				to: "/justina",
				label: "Dashboard",
				icon: LayoutGrid,
				exact: true
			},
			{
				to: "/justina/receita",
				label: "Receita total",
				icon: TrendingUp,
				perm: "settings.write"
			},
			{
				to: "/justina/metas",
				label: "Metas",
				icon: Target,
				perm: "settings.write"
			},
			{
				to: "/justina/pesquisas",
				label: "Pesquisas dos clientes",
				icon: ChartColumn,
				perm: "settings.write"
			}
		]
	},
	{
		title: "Loja",
		items: [
			{
				to: "/justina/produtos",
				label: "Produtos",
				icon: Package,
				perm: "catalog.write"
			},
			{
				to: "/justina/categorias",
				label: "Categorias",
				icon: FolderTree,
				perm: "catalog.write"
			},
			{
				to: "/justina/pedidos",
				label: "Pedidos",
				icon: ShoppingBag,
				perm: "orders.status"
			},
			{
				to: "/justina/lojas",
				label: "Lojas",
				icon: Store,
				perm: "catalog.write"
			}
		]
	},
	{
		title: "Pessoas",
		items: [{
			to: "/justina/usuarios",
			label: "Usuários",
			icon: Users,
			perm: "orders.status"
		}, {
			to: "/justina/equipa",
			label: "Equipa",
			icon: ShieldCheck,
			perm: "staff.manage"
		}]
	},
	{
		title: "Conteúdo",
		items: [{
			to: "/justina/home",
			label: "Página inicial",
			icon: House,
			perm: "catalog.write"
		}]
	},
	{
		title: "Marketing",
		items: [{
			to: "/justina/cupons",
			label: "Cupons",
			icon: Ticket,
			perm: "catalog.write"
		}]
	},
	{
		title: "Sistema",
		items: [
			{
				to: "/justina/logistica",
				label: "Logística & fretes",
				icon: Truck,
				perm: "settings.write"
			},
			{
				to: "/justina/pagamentos",
				label: "Pagamentos",
				icon: CreditCard,
				perm: "settings.write"
			},
			{
				to: "/justina/config",
				label: "Configurações",
				icon: Settings,
				perm: "settings.write"
			}
		]
	}
];
function AdminShell() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, {}) });
}
function AdminLayout() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { staff } = useStaff();
	const { user } = useStore();
	(0, import_react.useEffect)(() => {
		if (!staff || !user?.uid) return;
		setOrdersOwner(user.uid, true);
		const stop = watchOrders(user.uid, true);
		return () => {
			stop();
			setOrdersOwner(user.uid ?? null, false);
		};
	}, [staff, user?.uid]);
	const isActive = (to, exact) => exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-gradient-to-br from-muted/40 via-background to-muted/20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-3 backdrop-blur-xl md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(true),
					className: "grid h-9 w-9 place-items-center rounded-lg hover:bg-muted md:hidden",
					"aria-label": "Menu",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCollapsed((c) => !c),
					className: "hidden h-9 w-9 place-items-center rounded-lg hover:bg-muted md:grid",
					"aria-label": collapsed ? "Mostrar menu lateral" : "Esconder menu lateral",
					title: collapsed ? "Mostrar menu" : "Esconder menu",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/justina",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: bazarixy_logo_webp_asset_default.url,
						alt: "Bazarixy",
						className: "h-7 w-auto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline rounded-full bg-foreground px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-background",
						children: "Admin"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden md:flex ml-6 items-center gap-2 rounded-full border border-border bg-muted/40 px-3.5 py-2 text-sm text-muted-foreground w-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs",
						children: "Pesquisar…"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid h-9 w-9 place-items-center rounded-lg hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 fill-gold text-gold" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "rounded-full border border-border px-3.5 py-1.5 text-xs font-bold hover:bg-muted",
							children: "Ver loja"
						}),
						staff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline rounded-full bg-brand/30 px-2.5 py-1 text-[10px] font-bold text-brand-strong",
							children: ROLE_LABEL[staff.role]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							title: user?.email ?? "",
							className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-foreground to-foreground/70 text-xs font-black text-background",
							children: (user?.email?.[0] ?? "B").toUpperCase()
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: `hidden md:flex sticky top-16 h-[calc(100vh-4rem)] shrink-0 flex-col overflow-y-auto overflow-x-hidden border-r border-border/60 bg-background/40 transition-all duration-300 ${collapsed ? "w-[68px] p-2" : "w-64 p-3"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, {
						isActive,
						collapsed
					})
				}),
				open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-50 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
						onClick: () => setOpen(false)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "absolute left-0 top-0 h-full w-72 max-w-[80%] bg-background p-3 shadow-2xl overflow-y-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-black",
								children: "Menu Admin"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOpen(false),
								className: "grid h-8 w-8 place-items-center rounded-md hover:bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, {
							isActive,
							onNavigate: () => setOpen(false)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 min-w-0 p-3 md:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-6xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					})
				})
			]
		})]
	});
}
function SideNav({ isActive, onNavigate, collapsed }) {
	const { staff } = useStaff();
	const groups = GROUPS.map((g) => ({
		...g,
		items: g.items.filter((n) => !n.perm || can(staff, n.perm))
	})).filter((g) => g.items.length > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex flex-col gap-5 text-sm",
		children: [groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1.5 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground",
			children: g.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-0.5",
			children: g.items.map((n) => {
				const active = isActive(n.to, n.exact);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: n.to,
					onClick: onNavigate,
					title: n.label,
					className: `group flex items-center gap-3 rounded-xl py-2.5 font-medium transition ${collapsed ? "justify-center px-0" : "px-3"} ${active ? "bg-foreground text-background shadow-lg shadow-foreground/20" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: `h-4 w-4 ${active ? "" : "text-muted-foreground group-hover:text-foreground"}` }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[13px]",
						children: n.label
					})]
				}, n.to);
			})
		})] }, g.title)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => {
				onNavigate?.();
				signOutUser();
			},
			title: "Sair do admin",
			className: `mt-2 flex items-center gap-3 rounded-xl py-2.5 text-sm text-muted-foreground hover:bg-muted ${collapsed ? "justify-center px-0" : "px-3"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }),
				" ",
				!collapsed && "Sair do admin"
			]
		})]
	});
}
//#endregion
export { AdminShell as component };
