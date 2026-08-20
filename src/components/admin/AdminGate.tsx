import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, LogOut, ShieldAlert, Eye, EyeOff } from "lucide-react";

import { useStore } from "@/lib/store";
import { firebaseEnabled } from "@/lib/firebase/client";
import { authErrorMessage, signInWithEmail, signInWithGoogle, signOutUser } from "@/lib/firebase/auth";
import { ROLE_LABEL, useStaff } from "@/lib/firebase/roles";

/**
 * Portão do painel: exige sessão Firebase E um documento `staff/{uid}` ativo.
 * As permissões vivem no backend (Firestore + regras); aqui só refletimos.
 */
export function AdminGate({ children }: { children: React.ReactNode }) {
  const { user } = useStore();
  const { staff, loading } = useStaff();

  if (!firebaseEnabled) {
    return <Notice title="Backend não configurado" text="Configure as chaves do Firebase no .env para usar o painel." />;
  }
  if (!user) return <AdminLogin />;
  if (loading) return <Notice title="A verificar permissões…" text="Um instante." />;
  if (!staff) return <NoStaff />;
  return (
    <>
      <div className="sr-only">Sessão: {ROLE_LABEL[staff.role]}</div>
      {children}
    </>
  );
}

/** Conta sem permissão: mensagem neutra, sem revelar como o acesso é concedido. */
function NoStaff() {
  return (
    <div className="grid min-h-screen place-items-center bg-muted/30 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-background p-6 text-center shadow-xl">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted">
          <ShieldAlert className="h-5 w-5 text-sale" />
        </div>
        <h1 className="mt-4 text-lg font-bold">Acesso restrito</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Esta conta não tem permissão para entrar no painel. Se acredita que se trata de um engano, fale com um administrador da loja.
        </p>
        <div className="mt-5 flex gap-2">
          <button onClick={() => void signOutUser()} className="flex flex-1 items-center justify-center gap-1 rounded-full border border-border py-2.5 text-sm font-bold">
            <LogOut className="h-4 w-4" /> Trocar conta
          </button>
          <Link to="/" className="flex-1 rounded-full bg-brand-strong py-2.5 text-center text-sm font-bold text-white">Ir para a loja</Link>
        </div>
      </div>
    </div>
  );
}


function Notice({ title, text, icon, action }: { title: string; text: string; icon?: React.ReactNode; action?: boolean }) {
  return (
    <div className="grid min-h-screen place-items-center bg-muted/30 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-background p-6 text-center shadow-xl">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted">{icon ?? <Lock className="h-5 w-5" />}</div>
        <h1 className="mt-4 text-lg font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
        {action && (
          <div className="mt-5 flex gap-2">
            <button onClick={() => void signOutUser()} className="flex flex-1 items-center justify-center gap-1 rounded-full border border-border py-2.5 text-sm font-bold">
              <LogOut className="h-4 w-4" /> Trocar conta
            </button>
            <Link to="/" className="flex-1 rounded-full bg-brand-strong py-2.5 text-sm font-bold text-white">Ir para a loja</Link>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true); setError("");
    try { await fn(); } catch (err) { setError(authErrorMessage(err)); } finally { setBusy(false); }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-muted/30 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/30">
          <Lock className="h-5 w-5 text-brand-strong" />
        </div>
        <h1 className="mt-4 text-center text-lg font-bold">Painel Bazarixy</h1>
        <p className="mt-1 text-center text-xs text-muted-foreground">Acesso apenas para a equipa autorizada.</p>

        <label className="mt-5 block text-xs text-muted-foreground">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          className="mt-1 h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-brand-strong"
        />

        <label className="mt-3 block text-xs text-muted-foreground">Senha</label>
        <div className="relative mt-1">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") void run(() => signInWithEmail(email, password)); }}
            autoComplete="current-password"
            className="h-11 w-full rounded-full border border-border bg-background px-4 pr-11 text-sm outline-none focus:border-brand-strong"
          />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {error && <p className="mt-2 text-xs text-sale">{error}</p>}

        <button
          onClick={() => void run(() => signInWithEmail(email, password))}
          disabled={busy}
          className="mt-4 h-11 w-full rounded-full bg-brand-strong text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "A entrar…" : "Entrar no painel"}
        </button>
        <button
          onClick={() => void run(() => signInWithGoogle())}
          disabled={busy}
          className="mt-2 h-11 w-full rounded-full border border-border text-sm font-bold hover:bg-muted disabled:opacity-60"
        >
          Continuar com o Google
        </button>
      </div>
    </div>
  );
}