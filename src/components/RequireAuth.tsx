import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

import { useStore, actions } from "@/lib/store";
import { Layout } from "@/components/Layout";
import { firebaseEnabled } from "@/lib/firebase/client";

/**
 * Protege rotas privadas (pedidos, checkout, carteira, seguir loja…).
 * Sem sessão: no desktop abre o modal de login, no mobile vai para /auth.
 */
export function RequireAuth({ children, title = "Entre para continuar" }: { children: React.ReactNode; title?: string }) {
  const { user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || !firebaseEnabled) return;
    const desktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
    if (desktop) actions.openLogin();
    else void navigate({ to: "/auth" });
  }, [user, navigate]);

  if (user) return <>{children}</>;

  return (
    <Layout hideBottomNav>
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Precisa de uma conta Bazarixy para acessar esta página com segurança.
        </p>
        <button
          onClick={() => {
            const desktop = window.matchMedia("(min-width: 768px)").matches;
            if (desktop) actions.openLogin();
            else void navigate({ to: "/auth" });
          }}
          className="mt-6 h-12 w-full rounded-full bg-brand-strong text-base font-bold text-white transition hover:opacity-90"
        >
          Entrar ou criar conta
        </button>
      </div>
    </Layout>
  );
}