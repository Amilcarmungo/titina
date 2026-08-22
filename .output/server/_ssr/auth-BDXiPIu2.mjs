import { r as __toESM } from "../_runtime.mjs";
import { t as firebaseEnabled } from "./client-C80F8PZn.mjs";
import { D as signInWithGoogle, E as signInWithFacebook, F as useStore, I as validatePasswordResetCode, R as captureReferralFromUrl, T as signInWithEmail, f as authErrorMessage, h as emailHasAccount, k as signUpWithEmail, m as completePasswordReset, n as NeedsPasswordLinkError, v as linkGoogleToPasswordAccount, x as resetPassword } from "./router-CVfpnsdH.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useRouter, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Bt as ChevronDown, Tt as EyeOff, U as PackageOpen, m as Ticket, u as Truck, wt as Eye, zt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { c as verifySignupVerification, o as requestSignupVerification, t as Layout } from "./Layout-D8r_bkbc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BDXiPIu2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function AuthPage() {
	const [step, setStep] = (0, import_react.useState)("email");
	const [code, setCode] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmNewPassword, setConfirmNewPassword] = (0, import_react.useState)("");
	const [resetCode, setResetCode] = (0, import_react.useState)("");
	const [showPass, setShowPass] = (0, import_react.useState)(false);
	const [agree, setAgree] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [info, setInfo] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [pendingGoogle, setPendingGoogle] = (0, import_react.useState)(null);
	const router = useRouter();
	const { user } = useStore();
	/** Link de convite (?convite=) é guardado para dar 5 pontos a quem convidou. */
	(0, import_react.useEffect)(() => {
		captureReferralFromUrl();
	}, []);
	(0, import_react.useEffect)(() => {
		const params = new URLSearchParams(window.location.search);
		const mode = params.get("mode");
		const code = params.get("oobCode");
		if (mode !== "resetPassword" || !code) return;
		setResetCode(code);
		setStep("reset");
		setBusy(true);
		validatePasswordResetCode(code).then((resetEmail) => setEmail(resetEmail)).catch(() => setError("Este link expirou ou já foi utilizado. Peça um novo link.")).finally(() => setBusy(false));
	}, []);
	/**
	* Sessão activa → a página de login desaparece sozinha. Funciona para
	* email/senha, Google (popup ou redirect) e para quem já estava entrado.
	*/
	(0, import_react.useEffect)(() => {
		if (!user || step === "verify" || step === "reset") return;
		if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
		else router.navigate({
			to: "/",
			replace: true
		});
	}, [
		user,
		router,
		step
	]);
	const guard = async (fn) => {
		if (!firebaseEnabled) {
			setError("Backend não configurado.");
			return;
		}
		setBusy(true);
		setError("");
		setInfo("");
		try {
			await fn();
		} catch (err) {
			setError(authErrorMessage(err));
		} finally {
			setBusy(false);
		}
	};
	const continueEmail = () => guard(async () => {
		const v = email.trim();
		if (!v || !v.includes("@")) {
			setError("Informe um email válido.");
			return;
		}
		setStep(await emailHasAccount(v) ? "signin" : "signup");
	});
	const doSignIn = () => guard(async () => {
		if (!password) {
			setError("Digite sua senha.");
			return;
		}
		if (pendingGoogle) {
			await linkGoogleToPasswordAccount(email, password, pendingGoogle);
			setPendingGoogle(null);
		} else await signInWithEmail(email, password);
	});
	const validPass = password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password) && !/\s/.test(password);
	const doSignUp = () => guard(async () => {
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
		setInfo("Enviámos um código de 6 dígitos. A conta só será criada depois da confirmação.");
	});
	const doVerify = () => guard(async () => {
		const res = await verifySignupVerification(code);
		if (!res.ok) {
			setError(res.error);
			return;
		}
		await signUpWithEmail(email, password);
		setStep("email");
		router.navigate({
			to: "/",
			replace: true
		});
	});
	const resendCode = () => guard(async () => {
		await requestSignupVerification(email);
		setCode("");
		setInfo("Novo código enviado.");
	});
	const doGoogle = () => guard(async () => {
		try {
			if (await signInWithGoogle());
		} catch (err) {
			if (err instanceof NeedsPasswordLinkError) {
				setEmail(err.email);
				setPendingGoogle(err.credential);
				setStep("signin");
				setInfo("Esta conta já usa senha. Confirme a senha para activar também o Google.");
				return;
			}
			throw err;
		}
	});
	const doFacebook = () => guard(async () => {
		if (await signInWithFacebook());
	});
	const doReset = () => guard(async () => {
		await resetPassword(email);
		setInfo("Enviamos um link de recuperação para seu email.");
	});
	const doCompleteReset = () => guard(async () => {
		if (newPassword.length < 8 || !/[a-zA-Z]/.test(newPassword) || !/\d/.test(newPassword)) {
			setError("A nova senha precisa de 8 caracteres, uma letra e um número.");
			return;
		}
		if (newPassword !== confirmNewPassword) {
			setError("As senhas não coincidem.");
			return;
		}
		await completePasswordReset(resetCode, newPassword);
		setInfo("Senha alterada com sucesso. Já pode entrar na sua conta.");
		setNewPassword("");
		setConfirmNewPassword("");
		setStep("signin");
		window.history.replaceState({}, "", "/auth");
	});
	const goBack = () => {
		if (step === "email") window.history.back();
		else {
			setStep("email");
			setPassword("");
			setError("");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		hideHeader: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen bg-background px-5 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: goBack,
					className: "-ml-2 p-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-6 w-6" })
				}),
				step === "email" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-col items-center text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/bazarixy-mark-BoezJBBF.webp",
							alt: "Bazarixy",
							className: "h-16 w-16 object-contain"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-3 divide-x divide-border rounded-2xl bg-brand/25 py-3 text-center",
						children: [
							{
								icon: Ticket,
								t: "30% Off",
								s: "Primeiro Pedido"
							},
							{
								icon: Truck,
								t: "Frete Grátis",
								s: "*Sujeito a condições"
							},
							{
								icon: PackageOpen,
								t: "Devolução Grátis",
								s: "*Sujeito a condições"
							}
						].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "mx-auto h-5 w-5 text-brand-strong" }),
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
						className: "mt-6 block text-xs text-muted-foreground",
						children: "Email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: email,
						onChange: (e) => setEmail(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") continueEmail();
						},
						className: "mt-1 h-12 w-full rounded-full border border-border bg-background px-4 outline-none focus:border-brand-strong"
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-sale",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: continueEmail,
						disabled: busy,
						className: "mt-5 h-12 w-full rounded-full bg-foreground text-base font-bold text-background transition hover:opacity-90 disabled:opacity-60",
						children: busy ? "Aguarde…" : "Continuar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: doReset,
						className: "mt-4 block w-full text-center text-sm font-medium text-brand-strong",
						children: "Não consegue acessar sua conta?"
					}),
					info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-center text-xs text-emerald-600",
						children: info
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-5 flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ou continue com" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: doGoogle,
						disabled: busy,
						className: "flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-background text-sm font-bold shadow-sm transition hover:bg-muted disabled:opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), " Continuar com o Google"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex items-center justify-center gap-5",
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
							className: "grid h-12 w-12 place-items-center rounded-full border border-border bg-background shadow-sm transition hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {})
						}, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs",
							children: ["📍 Angola ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 pb-10 text-center text-[11px] text-muted-foreground",
						children: [
							"Ao continuar, você concorda com nossa",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacidade",
								className: "text-brand-strong underline",
								children: "Política de Privacidade"
							}),
							" ",
							"e",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/termos",
								className: "text-brand-strong underline",
								children: "Termos & Condições"
							}),
							"."
						]
					})
				] }),
				step === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: "Bem-vindo de volta!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Entre com sua senha para continuar."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-6 block text-xs text-muted-foreground",
							children: "Email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex h-12 items-center rounded-full bg-muted px-4 text-sm",
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
								className: "h-12 w-full rounded-full border border-border bg-background px-4 pr-11 outline-none focus:border-brand-strong"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPass((s) => !s),
								className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground",
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
							className: "mt-5 h-12 w-full rounded-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:opacity-60",
							children: busy ? "Entrando…" : "Entrar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: doReset,
							className: "mt-3 block w-full text-center text-sm text-brand-strong",
							children: "Esqueci minha senha"
						}),
						info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-center text-xs text-emerald-600",
							children: info
						})
					]
				}),
				step === "verify" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: "Confirme o seu e-mail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"Escreva o código de 6 dígitos que enviámos para",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: code,
							onChange: (e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
							inputMode: "numeric",
							placeholder: "000000",
							className: "mt-6 h-14 w-full rounded-2xl border border-border bg-background text-center text-2xl font-black tracking-[10px] outline-none focus:border-brand-strong"
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-sale",
							children: error
						}),
						info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-emerald-600",
							children: info
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: doVerify,
							disabled: busy || code.length < 6,
							className: "mt-5 h-12 w-full rounded-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:opacity-60",
							children: busy ? "A confirmar…" : "Confirmar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: resendCode,
								disabled: busy,
								className: "font-medium text-brand-strong disabled:opacity-60",
								children: "Reenviar código"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => void router.navigate({
									to: "/",
									replace: true
								}),
								className: "text-muted-foreground",
								children: "Confirmar mais tarde"
							})]
						})
					]
				}),
				step === "reset" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: "Crie uma nova senha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: email ? `Defina uma nova senha para ${email}.` : "Defina uma nova senha segura para a sua conta."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-6 block text-xs text-muted-foreground",
							children: "Nova senha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showPass ? "text" : "password",
								value: newPassword,
								onChange: (event) => setNewPassword(event.target.value),
								className: "h-12 w-full rounded-full border border-border bg-background px-4 pr-11 outline-none focus:border-brand-strong"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPass((value) => !value),
								className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground",
								children: showPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-4 block text-xs text-muted-foreground",
							children: "Confirmar nova senha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: showPass ? "text" : "password",
							value: confirmNewPassword,
							onChange: (event) => setConfirmNewPassword(event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Enter") doCompleteReset();
							},
							className: "mt-1 h-12 w-full rounded-full border border-border bg-background px-4 outline-none focus:border-brand-strong"
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-sale",
							children: error
						}),
						info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-emerald-600",
							children: info
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: doCompleteReset,
							disabled: busy || !resetCode,
							className: "mt-5 h-12 w-full rounded-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:opacity-60",
							children: busy ? "A validar…" : "Guardar nova senha"
						})
					]
				}),
				step === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: "Olá, Novo Amigo!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Defina sua senha para criar uma conta."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-6 block text-xs text-muted-foreground",
							children: "Endereço de email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex h-12 items-center rounded-full bg-muted px-4 text-sm font-semibold",
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
								className: "h-12 w-full rounded-full border border-border bg-background px-4 pr-11 outline-none focus:border-brand-strong"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPass((s) => !s),
								className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground",
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
									to: "/termos",
									className: "text-brand-strong underline",
									children: "Política de Privacidade e Cookies"
								}),
								" ",
								"e com",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/termos",
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
							className: "mt-5 h-12 w-full rounded-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:opacity-60",
							children: busy ? "Criando conta…" : "Cadastre-se"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
