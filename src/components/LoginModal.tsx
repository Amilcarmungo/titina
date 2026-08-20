import * as React from "react";
import { Link } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X,
  ShieldCheck,
  Ticket,
  Truck,
  PackageOpen,
  ChevronLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { actions, useStore } from "@/lib/store";
import {
  authErrorMessage,
  emailHasAccount,
  linkGoogleToPasswordAccount,
  NeedsPasswordLinkError,
  resetPassword,
  signInWithFacebook,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from "@/lib/firebase/auth";
import type { AuthCredential } from "firebase/auth";
import { firebaseEnabled } from "@/lib/firebase/client";

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

/** Desktop-only login modal (square corners, no rounding). */
export function LoginModal() {
  const { loginOpen } = useStore();
  const [step, setStep] = React.useState<"email" | "signin" | "signup">(
    "email",
  );
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [error, setError] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  /** Bloqueia todos os botões enquanto o pedido corre (evita duplo clique). */
  const [busy, setBusy] = React.useState(false);
  /** Credencial do Google à espera de ser LIGADA a uma conta com senha. */
  const [pendingGoogle, setPendingGoogle] =
    React.useState<AuthCredential | null>(null);

  React.useEffect(() => {
    if (!loginOpen) {
      setStep("email");
      setEmail("");
      setPassword("");
      setError("");
      setAgree(false);
      setShowPass(false);
      setPendingGoogle(null);
      setBusy(false);
    }
  }, [loginOpen]);

  const guard = async (fn: () => Promise<void>) => {
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
  const continueEmail = () =>
    void guard(async () => {
      const v = email.trim();
      if (!v || !v.includes("@")) {
        setError("Informe um email válido.");
        return;
      }
      setStep((await emailHasAccount(v)) ? "signin" : "signup");
    });
  const doSignIn = () =>
    void guard(async () => {
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
      actions.closeLogin();
    });
  const validPass =
    password.length >= 8 &&
    /[a-zA-Z]/.test(password) &&
    /\d/.test(password) &&
    !/\s/.test(password);
  const doSignUp = () =>
    void guard(async () => {
      if (!validPass) {
        setError("Senha inválida.");
        return;
      }
      if (!agree) {
        setError("Você precisa aceitar os termos.");
        return;
      }
      await signUpWithEmail(email, password);
      actions.closeLogin();
    });
  const doGoogle = () =>
    void guard(async () => {
      try {
        const u = await signInWithGoogle();
        if (u) actions.closeLogin();
      } catch (err) {
        if (err instanceof NeedsPasswordLinkError) {
          setEmail(err.email);
          setPendingGoogle(err.credential);
          setStep("signin");
          setError(
            "Esta conta já usa senha. Confirme a senha para activar também o Google.",
          );
          return;
        }
        throw err;
      }
    });
  const doFacebook = () =>
    void guard(async () => {
      const u = await signInWithFacebook();
      if (u) actions.closeLogin();
    });
  const doReset = () =>
    void guard(async () => {
      await resetPassword(email);
      setError("Enviamos um link de recuperação para seu email.");
    });

  return (
    <DialogPrimitive.Root
      open={loginOpen}
      onOpenChange={(o) => (o ? actions.openLogin() : actions.closeLogin())}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-0 border border-border bg-background p-8 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <DialogPrimitive.Title className="sr-only">
            Entrar
          </DialogPrimitive.Title>
          <DialogPrimitive.Close className="absolute right-4 top-4 p-1.5 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
          {step !== "email" && (
            <button
              onClick={() => {
                setStep("email");
                setPassword("");
                setError("");
              }}
              className="absolute left-4 top-4 p-1.5 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {step === "email" && (
            <>
              <div className="mt-4 grid grid-cols-3 divide-x divide-border bg-brand/25 py-3 text-center">
                {[
                  { icon: Ticket, t: "30% Off", s: "Primeiro Pedido" },
                  { icon: Truck, t: "Frete Grátis", s: "*Condições" },
                  { icon: PackageOpen, t: "Devolução", s: "*Condições" },
                ].map((b) => (
                  <div key={b.t} className="px-2">
                    <b.icon className="mx-auto h-5 w-5 text-sale" />
                    <p className="mt-1 text-[12px] font-bold">{b.t}</p>
                    <p className="text-[10px] leading-tight text-muted-foreground">
                      {b.s}
                    </p>
                  </div>
                ))}
              </div>

              <label className="mt-5 block text-xs text-muted-foreground">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") continueEmail();
                }}
                className="mt-1 h-11 w-full border border-border bg-background px-4 outline-none focus:border-brand-strong"
              />
              {error && <p className="mt-1 text-xs text-sale">{error}</p>}

              <button
                onClick={continueEmail}
                disabled={busy}
                className="mt-5 h-11 w-full bg-brand-strong text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "A verificar…" : "Continuar"}
              </button>

              <div className="my-4 flex items-center gap-3 text-[11px] text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                <span>Ou continue com</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <button
                onClick={doGoogle}
                disabled={busy}
                className="flex h-11 w-full items-center justify-center gap-3 border border-border bg-background text-sm font-bold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                <GoogleIcon /> Continuar com o Google
              </button>
              <div className="mt-3 flex items-center justify-center gap-4">
                {[
                  { Icon: FacebookIcon, label: "Facebook" },
                  { Icon: AppleIcon, label: "Apple" },
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    onClick={label === "Facebook" ? doFacebook : undefined}
                    disabled={busy || label === "Apple"}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background shadow-sm transition hover:bg-muted"
                  >
                    <Icon />
                  </button>
                ))}
              </div>

              <p className="mt-3 flex items-center justify-center gap-1 text-[11px] text-emerald-600">
                <ShieldCheck className="h-3 w-3" /> Seus dados estão protegidos.
              </p>
            </>
          )}

          {step === "signin" && (
            <>
              <h2 className="mt-2 text-xl font-bold">Bem-vindo de volta!</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Entre com sua senha para continuar.
              </p>

              <label className="mt-5 block text-xs text-muted-foreground">
                Email
              </label>
              <div className="mt-1 flex h-11 items-center border border-border bg-muted px-4 text-sm">
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
                  className="h-11 w-full border border-border bg-background px-4 pr-10 outline-none focus:border-brand-strong"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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
                className="mt-5 h-11 w-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "A entrar…" : "Entrar"}
              </button>
              <button
                onClick={doReset}
                disabled={busy}
                className="mt-3 block w-full text-center text-sm text-brand-strong disabled:opacity-60"
              >
                Esqueci minha senha
              </button>
            </>
          )}

          {step === "signup" && (
            <>
              <h2 className="mt-2 text-xl font-bold">Olá, Novo Amigo!</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Defina sua senha para criar uma conta.
              </p>

              <label className="mt-5 block text-xs text-muted-foreground">
                Endereço de email
              </label>
              <div className="mt-1 flex h-11 items-center border border-border bg-muted px-4 text-sm font-semibold">
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
                  className="h-11 w-full border border-border bg-background px-4 pr-10 outline-none focus:border-brand-strong"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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
                  <Link
                    to="/privacidade"
                    onClick={() => actions.closeLogin()}
                    className="text-brand-strong underline"
                  >
                    Política de Privacidade
                  </Link>{" "}
                  e com{" "}
                  <Link
                    to="/termos"
                    onClick={() => actions.closeLogin()}
                    className="text-brand-strong underline"
                  >
                    os Termos & Condições
                  </Link>
                  .
                </span>
              </label>

              {error && <p className="mt-1 text-xs text-sale">{error}</p>}

              <button
                onClick={doSignUp}
                disabled={busy}
                className="mt-5 h-11 w-full bg-brand-strong text-base font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "A criar conta…" : "Cadastre-se"}
              </button>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
