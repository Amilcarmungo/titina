import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  ChevronLeft,
  Ticket,
  Truck,
  PackageOpen,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  authErrorMessage,
  completePasswordReset,
  emailHasAccount,
  linkGoogleToPasswordAccount,
  NeedsPasswordLinkError,
  resetPassword,
  signInWithFacebook,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  validatePasswordResetCode,
} from "@/lib/firebase/auth";
import type { AuthCredential } from "firebase/auth";
import { captureReferralFromUrl } from "@/lib/firebase/referrals";
import { useStore } from "@/lib/store";
import { firebaseEnabled } from "@/lib/firebase/client";
import {
  requestSignupVerification,
  verifySignupVerification,
} from "@/lib/firebase/email-verification";
import logoMark from "../../img/bazarixy-mark.webp";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Entrar / Cadastrar — Bazarixy" }] }),
  component: AuthPage,
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.2 2.8-2.5 3.7v3h4c2.4-2.2 3.5-5.4 3.5-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-4-3c-1.1.7-2.5 1.2-3.9 1.2-3 0-5.6-2-6.5-4.8H1.4v3C3.4 21.3 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.5 14.5c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3v-3H1.4C.5 8.6 0 10.2 0 12s.5 3.4 1.4 5l4.1-2.5z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.7l4.1 3c.9-2.8 3.5-4.9 6.5-4.9z"
      />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"
      />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.4 12.7c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.7 2.4 3 2.4 1.2-.1 1.7-.8 3.1-.8 1.5 0 1.9.8 3.1.8 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7 0 0-2.5-1-2.5-3.9zM14.2 5.6c.7-.8 1.1-1.9 1-3-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.8-1.4z"
      />
    </svg>
  );
}

function AuthPage() {
  const [step, setStep] = useState<
    "email" | "signin" | "signup" | "verify" | "reset"
  >("email");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingGoogle, setPendingGoogle] = useState<AuthCredential | null>(
    null,
  );
  const router = useRouter();

  const { user } = useStore();

  /** Link de convite (?convite=) é guardado para dar 50 pontos a quem convidou. */
  useEffect(() => {
    captureReferralFromUrl();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const code = params.get("oobCode");
    if (mode !== "resetPassword" || !code) return;
    setResetCode(code);
    setStep("reset");
    setBusy(true);
    void validatePasswordResetCode(code)
      .then((resetEmail) => setEmail(resetEmail))
      .catch(() =>
        setError("Este link expirou ou já foi utilizado. Peça um novo link."),
      )
      .finally(() => setBusy(false));
  }, []);

  /**
   * Sessão activa → a página de login desaparece sozinha. Funciona para
   * email/senha, Google (popup ou redirect) e para quem já estava entrado.
   */
  useEffect(() => {
    if (!user || step === "verify" || step === "reset") return;
    const back = typeof window !== "undefined" && window.history.length > 1;
    if (back) router.history.back();
    else void router.navigate({ to: "/", replace: true });
  }, [user, router, step]);

  const finish = () => {
    /* a saída é feita pelo efeito acima, assim que a sessão chega */
  };

  const guard = async (fn: () => Promise<void>) => {
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

  const continueEmail = () =>
    guard(async () => {
      const v = email.trim();
      if (!v || !v.includes("@")) {
        setError("Informe um email válido.");
        return;
      }
      setStep((await emailHasAccount(v)) ? "signin" : "signup");
    });
  const doSignIn = () =>
    guard(async () => {
      if (!password) {
        setError("Digite sua senha.");
        return;
      }
      if (pendingGoogle) {
        await linkGoogleToPasswordAccount(email, password, pendingGoogle);
        setPendingGoogle(null);
      } else {
        await signInWithEmail(email, password);
      }
      finish();
    });
  const validPass =
    password.length >= 8 &&
    /[a-zA-Z]/.test(password) &&
    /\d/.test(password) &&
    !/\s/.test(password);
  const doSignUp = () =>
    guard(async () => {
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
      setInfo(
        "Enviámos um código de 6 dígitos. A conta só será criada depois da confirmação.",
      );
    });
  const doVerify = () =>
    guard(async () => {
      const res = await verifySignupVerification(code);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      await signUpWithEmail(email, password);
      setStep("email");
      void router.navigate({ to: "/", replace: true });
    });
  const resendCode = () =>
    guard(async () => {
      await requestSignupVerification(email);
      setCode("");
      setInfo("Novo código enviado.");
    });
  const doGoogle = () =>
    guard(async () => {
      try {
        const u = await signInWithGoogle();
        if (u) finish();
      } catch (err) {
        if (err instanceof NeedsPasswordLinkError) {
          setEmail(err.email);
          setPendingGoogle(err.credential);
          setStep("signin");
          setInfo(
            "Esta conta já usa senha. Confirme a senha para activar também o Google.",
          );
          return;
        }
        throw err;
      }
    });
  const doFacebook = () =>
    guard(async () => {
      const u = await signInWithFacebook();
      if (u) finish();
    });
  const doReset = () =>
    guard(async () => {
      await resetPassword(email);
      setInfo("Enviamos um link de recuperação para seu email.");
    });
  const doCompleteReset = () =>
    guard(async () => {
      if (
        newPassword.length < 8 ||
        !/[a-zA-Z]/.test(newPassword) ||
        !/\d/.test(newPassword)
      ) {
        setError(
          "A nova senha precisa de 8 caracteres, uma letra e um número.",
        );
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

  return (
    <Layout hideHeader hideBottomNav>
      <div className="min-h-screen bg-background px-5 pt-3">
        <button onClick={goBack} className="-ml-2 p-1.5">
          <ChevronLeft className="h-6 w-6" />
        </button>

        {step === "email" && (
          <>
            <div className="mt-2 flex flex-col items-center text-center">
              <img
                src={logoMark}
                alt="Bazarixy"
                className="h-16 w-16 object-contain"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 divide-x divide-border rounded-2xl bg-brand/25 py-3 text-center">
              {[
                { icon: Ticket, t: "30% Off", s: "Primeiro Pedido" },
                { icon: Truck, t: "Frete Grátis", s: "*Sujeito a condições" },
                {
                  icon: PackageOpen,
                  t: "Devolução Grátis",
                  s: "*Sujeito a condições",
                },
              ].map((b) => (
                <div key={b.t} className="px-2">
                  <b.icon className="mx-auto h-5 w-5 text-brand-strong" />
                  <p className="mt-1 text-[12px] font-bold">{b.t}</p>
                  <p className="text-[10px] leading-tight text-muted-foreground">
                    {b.s}
                  </p>
                </div>
              ))}
            </div>

            <label className="mt-6 block text-xs text-muted-foreground">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") continueEmail();
              }}
              className="mt-1 h-12 w-full rounded-full border border-border bg-background px-4 outline-none focus:border-brand-strong"
            />
            {error && <p className="mt-1 text-xs text-sale">{error}</p>}

            <button
              onClick={continueEmail}
              disabled={busy}
              className="mt-5 h-12 w-full rounded-full bg-foreground text-base font-bold text-background transition hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Aguarde…" : "Continuar"}
            </button>

            <button
              onClick={doReset}
              className="mt-4 block w-full text-center text-sm font-medium text-brand-strong"
            >
              Não consegue acessar sua conta?
            </button>
            {info && (
              <p className="mt-1 text-center text-xs text-emerald-600">
                {info}
              </p>
            )}

            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              <span>Ou continue com</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              onClick={doGoogle}
              disabled={busy}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-background text-sm font-bold shadow-sm transition hover:bg-muted disabled:opacity-60"
            >
              <GoogleIcon /> Continuar com o Google
            </button>

            {/*
            <div className="mt-3 flex items-center justify-center gap-5">
              {[
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: AppleIcon, label: "Apple" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  onClick={label === "Facebook" ? doFacebook : undefined}
                  disabled={busy || label === "Apple"}
                  className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background shadow-sm transition hover:bg-muted"
                >
                  <Icon />
                </button>
              ))}
            </div>
            */}

            <div className="mt-6 flex justify-center">
              <button className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs">
                📍 Angola <ChevronDown className="h-3 w-3" />
              </button>
            </div>

            <p className="mt-4 pb-10 text-center text-[11px] text-muted-foreground">
              Ao continuar, você concorda com nossa{" "}
              <Link to="/privacidade" className="text-brand-strong underline">
                Política de Privacidade
              </Link>{" "}
              e{" "}
              <Link to="/termos" className="text-brand-strong underline">
                Termos & Condições
              </Link>
              .
            </p>
          </>
        )}

        {step === "signin" && (
          <div className="mt-4">
            <h1 className="text-2xl font-bold">Bem-vindo de volta!</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Entre com sua senha para continuar.
            </p>

            <label className="mt-6 block text-xs text-muted-foreground">
              Email
            </label>
            <div className="mt-1 flex h-12 items-center rounded-full bg-muted px-4 text-sm">
              {email}
            </div>

            <label className="mt-4 block text-xs text-muted-foreground">
              Senha
            </label>
            <div className="relative mt-1">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") doSignIn();
                }}
                className="h-12 w-full rounded-full border border-border bg-background px-4 pr-11 outline-none focus:border-brand-strong"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPass ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {error && <p className="mt-1 text-xs text-sale">{error}</p>}

            <button
              onClick={doSignIn}
              disabled={busy}
              className="mt-5 h-12 w-full rounded-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Entrando…" : "Entrar"}
            </button>
            <button
              onClick={doReset}
              className="mt-3 block w-full text-center text-sm text-brand-strong"
            >
              Esqueci minha senha
            </button>
            {info && (
              <p className="mt-1 text-center text-xs text-emerald-600">
                {info}
              </p>
            )}
          </div>
        )}

        {step === "verify" && (
          <div className="mt-4">
            <h1 className="text-2xl font-bold">Confirme o seu e-mail</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Escreva o código de 6 dígitos que enviámos para{" "}
              <strong>{email}</strong>.
            </p>

            <input
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              inputMode="numeric"
              placeholder="000000"
              className="mt-6 h-14 w-full rounded-2xl border border-border bg-background text-center text-2xl font-black tracking-[10px] outline-none focus:border-brand-strong"
            />
            {error && <p className="mt-1 text-xs text-sale">{error}</p>}
            {info && <p className="mt-1 text-xs text-emerald-600">{info}</p>}

            <button
              onClick={doVerify}
              disabled={busy || code.length < 6}
              className="mt-5 h-12 w-full rounded-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "A confirmar…" : "Confirmar"}
            </button>
            <div className="mt-3 flex items-center justify-between text-sm">
              <button
                onClick={resendCode}
                disabled={busy}
                className="font-medium text-brand-strong disabled:opacity-60"
              >
                Reenviar código
              </button>
              <button
                onClick={() => void router.navigate({ to: "/", replace: true })}
                className="text-muted-foreground"
              >
                Confirmar mais tarde
              </button>
            </div>
          </div>
        )}

        {step === "reset" && (
          <div className="mt-4">
            <h1 className="text-2xl font-bold">Crie uma nova senha</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {email
                ? `Defina uma nova senha para ${email}.`
                : "Defina uma nova senha segura para a sua conta."}
            </p>

            <label className="mt-6 block text-xs text-muted-foreground">
              Nova senha
            </label>
            <div className="relative mt-1">
              <input
                type={showPass ? "text" : "password"}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="h-12 w-full rounded-full border border-border bg-background px-4 pr-11 outline-none focus:border-brand-strong"
              />
              <button
                type="button"
                onClick={() => setShowPass((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPass ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <label className="mt-4 block text-xs text-muted-foreground">
              Confirmar nova senha
            </label>
            <input
              type={showPass ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") doCompleteReset();
              }}
              className="mt-1 h-12 w-full rounded-full border border-border bg-background px-4 outline-none focus:border-brand-strong"
            />
            {error && <p className="mt-1 text-xs text-sale">{error}</p>}
            {info && <p className="mt-1 text-xs text-emerald-600">{info}</p>}
            <button
              onClick={doCompleteReset}
              disabled={busy || !resetCode}
              className="mt-5 h-12 w-full rounded-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "A validar…" : "Guardar nova senha"}
            </button>
          </div>
        )}

        {step === "signup" && (
          <div className="mt-4">
            <h1 className="text-2xl font-bold">Olá, Novo Amigo!</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Defina sua senha para criar uma conta.
            </p>

            <label className="mt-6 block text-xs text-muted-foreground">
              Endereço de email
            </label>
            <div className="mt-1 flex h-12 items-center rounded-full bg-muted px-4 text-sm font-semibold">
              {email}
            </div>

            <label className="mt-4 block text-xs text-muted-foreground">
              Senha
            </label>
            <div className="relative mt-1">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-full border border-border bg-background px-4 pr-11 outline-none focus:border-brand-strong"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPass ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <ul className="mt-2 space-y-0.5 text-[12px]">
              <li
                className={
                  password.length >= 8 ? "text-emerald-600" : "text-sale"
                }
              >
                • Mínimo de 8 caracteres
              </li>
              <li
                className={
                  /[a-zA-Z]/.test(password) ? "text-emerald-600" : "text-sale"
                }
              >
                • Pelo menos uma letra
              </li>
              <li
                className={
                  /\d/.test(password) ? "text-emerald-600" : "text-sale"
                }
              >
                • Pelo menos um número
              </li>
              <li
                className={
                  !/\s/.test(password) && password.length > 0
                    ? "text-emerald-600"
                    : "text-muted-foreground"
                }
              >
                • A senha não pode conter espaços em branco.
              </li>
            </ul>

            <label className="mt-4 flex items-start gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                (Obrigatório) Concordo com a{" "}
                <Link to="/termos" className="text-brand-strong underline">
                  Política de Privacidade e Cookies
                </Link>{" "}
                e com{" "}
                <Link to="/termos" className="text-brand-strong underline">
                  os Termos & Condições
                </Link>
                .
              </span>
            </label>

            {error && <p className="mt-1 text-xs text-sale">{error}</p>}

            <button
              onClick={doSignUp}
              disabled={busy}
              className="mt-5 h-12 w-full rounded-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Criando conta…" : "Cadastre-se"}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
