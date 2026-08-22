import { r as __toESM } from "../_runtime.mjs";
import { F as useStore, P as usePointsState, _ as linkGoogleToCurrentAccount, f as authErrorMessage, g as ensurePasswordMethod, l as actions, u as activeSignInMethods, z as referralLink } from "./router-CpH00U3h.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useRouter, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { At as Copy, E as Share2, F as QrCode, Rt as ChevronRight, Vt as Check, Yt as ArrowUp, o as UserPlus } from "../_libs/lucide-react.mjs";
import { t as Layout } from "./Layout-COZ4pjzI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-lcMgckGo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Row({ label, right, to, onClick }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between bg-white px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[15px] text-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-muted-foreground",
			children: [right, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
		})]
	});
	if (to) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: "block w-full text-left",
		children: inner
	});
}
function Section({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "bg-muted/40 px-4 py-3 text-[15px] font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y divide-border",
			children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { ...it }, it.label))
		})]
	});
}
function Picker({ open, title, options, value, onSelect, onClose }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-t-2xl bg-white md:rounded-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 py-3 text-center text-sm font-bold border-b border-border",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[60vh] overflow-y-auto",
					children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							onSelect(opt);
							onClose();
						},
						className: "flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-muted/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt }), value === opt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-gold" })]
					}, opt))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "w-full py-3 text-sm font-semibold text-muted-foreground border-t border-border",
					children: "Cancelar"
				})
			]
		})
	});
}
function PasswordDialog({ open, hasPassword, onClose }) {
	const [pw, setPw] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-t-2xl bg-white p-5 md:rounded-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-black",
					children: hasPassword ? "Alterar senha" : "Adicionar senha"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "O login com Google continua activo. Poderá entrar com qualquer um dos métodos."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					value: pw,
					onChange: (e) => setPw(e.target.value),
					placeholder: "Nova senha (mínimo 8 caracteres)",
					className: "mt-4 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-gold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy || pw.length < 8,
					onClick: async () => {
						setBusy(true);
						try {
							await ensurePasswordMethod(pw);
							toast.success(hasPassword ? "Senha actualizada" : "Senha adicionada à sua conta");
							onClose();
						} catch (err) {
							toast.error(authErrorMessage(err));
						} finally {
							setBusy(false);
						}
					},
					className: "mt-3 w-full bg-foreground py-3 text-sm font-bold text-background disabled:opacity-50",
					children: busy ? "A guardar…" : "Guardar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "mt-2 w-full py-2 text-sm font-semibold text-muted-foreground",
					children: "Cancelar"
				})
			]
		})
	});
}
function SettingsPage() {
	const { user } = useStore();
	const router = useRouter();
	const username = user?.name?.trim() || user?.email?.split("@")[0] || "convidado";
	const [currency, setCurrency] = (0, import_react.useState)("KZ");
	const [language, setLanguage] = (0, import_react.useState)("Português");
	const [pickCurrency, setPickCurrency] = (0, import_react.useState)(false);
	const [pickLanguage, setPickLanguage] = (0, import_react.useState)(false);
	const [methods, setMethods] = (0, import_react.useState)({
		password: false,
		google: false
	});
	const [pwOpen, setPwOpen] = (0, import_react.useState)(false);
	const { referrals } = usePointsState();
	const link = user?.uid ? referralLink(user.uid) : "";
	(0, import_react.useEffect)(() => {
		if (user) setMethods(activeSignInMethods());
		else setMethods({
			password: false,
			google: false
		});
	}, [user, pwOpen]);
	const notImpl = () => toast.success("Em breve");
	async function copyLink() {
		try {
			await navigator.clipboard.writeText(link);
			toast.success("Link de convite copiado");
		} catch {
			toast.error("Não foi possível copiar");
		}
	}
	async function shareLink() {
		if (typeof navigator !== "undefined" && "share" in navigator) try {
			await navigator.share({
				title: "Bazarixy",
				text: "Compra na Bazarixy com o meu convite:",
				url: link
			});
			return;
		} catch {}
		copyLink();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		simpleHeader: true,
		hideBottomNav: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:max-w-2xl md:mx-auto md:my-6 md:rounded-2xl md:overflow-hidden md:shadow-[var(--shadow-card)] md:bg-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex w-full items-center justify-between bg-white px-4 py-5",
						onClick: notImpl,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-bold truncate",
							children: username
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-muted-foreground shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 bg-white px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4.5 w-4.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[15px] font-bold",
										children: "Convidar amigo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											5,
											" pontos por amigo · ",
											referrals,
											" ",
											"convidado(s)"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/points",
									className: "shrink-0 text-xs font-bold text-brand-strong",
									children: "Ver pontos"
								})
							]
						}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex items-center gap-2 border border-border bg-muted/40 px-3 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "min-w-0 flex-1 truncate text-xs text-muted-foreground",
								children: link
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: shareLink,
								className: "inline-flex items-center justify-center gap-2 bg-gold px-3 py-2.5 text-xs font-bold text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-3.5 w-3.5" }), " Partilhar"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: copyLink,
								className: "inline-flex items-center justify-center gap-2 border border-border px-3 py-2.5 text-xs font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), " Copiar link"]
							})]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "mt-3 block bg-foreground py-2.5 text-center text-xs font-bold text-background",
							children: "Entrar para receber o meu link"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Formas de entrar",
						items: user ? [{
							label: methods.password ? "Senha (activa) — alterar" : "Adicionar senha",
							right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: methods.password ? "text-emerald-600" : "",
								children: methods.password ? "Activa" : "Inactiva"
							}),
							onClick: () => setPwOpen(true)
						}, {
							label: methods.google ? "Google (activo)" : "Ligar conta Google",
							right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: methods.google ? "text-emerald-600" : "",
								children: methods.google ? "Activo" : "Inactivo"
							}),
							onClick: async () => {
								if (methods.google) {
									toast.success("O Google já está ligado a esta conta");
									return;
								}
								try {
									await linkGoogleToCurrentAccount();
									setMethods(activeSignInMethods());
									toast.success("Google ligado — pode entrar com Google ou senha");
								} catch (err) {
									toast.error(authErrorMessage(err));
								}
							}
						}] : [{
							label: "Entrar na minha conta",
							to: "/auth"
						}]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Configurações",
						items: [
							{
								label: "Livro de endereços",
								onClick: notImpl
							},
							{
								label: "Alterar moeda",
								right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currency }),
								onClick: () => setPickCurrency(true)
							},
							{
								label: "Alterar idioma",
								right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: language }),
								onClick: () => setPickLanguage(true)
							},
							{
								label: "Meus pontos e convites",
								to: "/points"
							},
							{
								label: "Meus cupões",
								to: "/coupons"
							},
							{
								label: "Meus pedidos",
								onClick: () => router.navigate({
									to: "/orders",
									search: { tab: "unpaid" }
								})
							},
							{
								label: "Preferências de contato",
								onClick: notImpl
							},
							{
								label: "Acessibilidade",
								onClick: notImpl
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Informações",
						items: [
							{
								label: "Informações de envio",
								onClick: notImpl
							},
							{
								label: "Política de devolução",
								onClick: notImpl
							},
							{
								label: "Escolha de anúncios",
								onClick: notImpl
							},
							{
								label: "Reembolso",
								onClick: notImpl
							},
							{
								label: "Métodos de pagamento",
								onClick: notImpl
							},
							{
								label: "Sobre a Carteira Bazarixy",
								onClick: notImpl
							},
							{
								label: "Política de pontos bônus",
								onClick: notImpl
							},
							{
								label: "Política de cupons",
								onClick: notImpl
							},
							{
								label: "Termos e condições Bazarixy VIP",
								onClick: notImpl
							},
							{
								label: "Guia de avaliações",
								onClick: notImpl
							},
							{
								label: "Cartão-presente",
								onClick: notImpl
							},
							{
								label: "Como rastrear meu pedido",
								onClick: notImpl
							},
							{
								label: "Como fazer um pedido",
								onClick: notImpl
							},
							{
								label: "Central de privacidade",
								onClick: notImpl
							},
							{
								label: "Termos e condições",
								onClick: notImpl
							},
							{
								label: "Sobre nós",
								onClick: notImpl
							},
							{
								label: "Responsabilidade social",
								onClick: notImpl
							},
							{
								label: "Acessibilidade",
								onClick: notImpl
							},
							{
								label: "Ficha técnica",
								onClick: notImpl
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex w-full items-center justify-between bg-white px-4 py-4",
							onClick: notImpl,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[15px]",
								children: "Trocar de conta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									actions.signOut();
									toast.success("Sessão encerrada");
									router.navigate({ to: "/" });
								},
								className: "block w-full bg-white px-4 py-4 text-left text-[15px]",
								children: "Sair"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "Voltar ao topo",
								onClick: () => window.scrollTo({
									top: 0,
									behavior: "smooth"
								}),
								className: "absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
				open: pickCurrency,
				title: "Alterar moeda",
				options: [
					"KZ",
					"USD",
					"EUR",
					"BRL"
				],
				value: currency,
				onSelect: setCurrency,
				onClose: () => setPickCurrency(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picker, {
				open: pickLanguage,
				title: "Alterar idioma",
				options: [
					"Português",
					"English",
					"Español",
					"Français"
				],
				value: language,
				onSelect: setLanguage,
				onClose: () => setPickLanguage(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordDialog, {
				open: pwOpen,
				hasPassword: methods.password,
				onClose: () => setPwOpen(false)
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
