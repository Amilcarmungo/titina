import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Coins, Copy, Gift, Share2, Star, UserPlus, Users } from "lucide-react";

import { Layout } from "@/components/Layout";
import { useStore } from "@/lib/store";
import { usePointsState, POINTS_PER_REFERRAL, POINTS_PER_REVIEW } from "@/lib/points";
import { referralLink } from "@/lib/firebase/referrals";
import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/points")({
  head: () => ({
    meta: [
      { title: "Meus pontos e convites — Bazarixy" },
      { name: "description", content: "Veja os seus pontos Bazarixy, convide amigos com o seu link único e ganhe pontos por cada avaliação." },
      { property: "og:title", content: "Meus pontos e convites — Bazarixy" },
      { property: "og:description", content: "Ganhe pontos por avaliações e por cada amigo convidado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PointsPage,
});

function PointsPage() {
  const { user } = useStore();
  const { earned, referrals, total } = usePointsState();
  const [copied, setCopied] = useState(false);
  const link = user?.uid ? referralLink(user.uid) : "";

  async function copy() {
    if (!requireAuth(user)) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copiado");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Não foi possível copiar");
    }
  }

  async function share() {
    if (!requireAuth(user)) return;
    const data = { title: "Bazarixy", text: "Compra na Bazarixy com o meu convite:", url: link };
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try { await (navigator as Navigator).share(data); return; } catch { /* cancelado */ }
    }
    void copy();
  }

  return (
    <Layout simpleHeader showBack hideBottomNav>
      <div className="mx-auto max-w-3xl px-3 pb-16 pt-3 md:pt-6">
        {/* Saldo */}
        <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-gold to-amber-300 p-5 text-white shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-90">
            <Coins className="h-4 w-4" /> Meus pontos
          </div>
          <p className="mt-2 font-display text-5xl font-black leading-none">{total}</p>
          <p className="mt-2 text-xs opacity-90">
            {POINTS_PER_REVIEW} pontos por avaliação · {POINTS_PER_REFERRAL} pontos por amigo convidado
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/20 px-3 py-2 backdrop-blur">
              <p className="text-[11px] opacity-90">Avaliações</p>
              <p className="font-display text-lg font-black">{earned}</p>
            </div>
            <div className="rounded-xl bg-white/20 px-3 py-2 backdrop-blur">
              <p className="text-[11px] opacity-90">Amigos convidados</p>
              <p className="font-display text-lg font-black">{referrals}</p>
            </div>
          </div>
        </section>

        {/* Convite */}
        <section className="mt-3 rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand/15 text-brand-strong">
              <UserPlus className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-base font-black">Convidar amigo</h2>
              <p className="text-xs text-muted-foreground">Cada amigo que criar conta pelo seu link vale {POINTS_PER_REFERRAL} pontos.</p>
            </div>
          </div>

          {user ? (
            <>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5">
                <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{link}</p>
                <button onClick={copy} className="shrink-0 rounded-lg bg-foreground px-3 py-1.5 text-xs font-bold text-background">
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={share} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-bold text-white">
                  <Share2 className="h-4 w-4" /> Partilhar
                </button>
                <button onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold">
                  <Copy className="h-4 w-4" /> Copiar link
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => requireAuth(user)}
              className="mt-4 w-full rounded-xl bg-foreground px-4 py-3 text-sm font-bold text-background"
            >
              Entrar para receber o meu link
            </button>
          )}
        </section>

        {/* Como ganhar */}
        <section className="mt-3 rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-base font-black">Como ganhar pontos</h2>
          <ul className="mt-3 space-y-3">
            {[
              { icon: Star, title: `Avalie os seus pedidos`, body: `Ganha ${POINTS_PER_REVIEW} pontos por cada avaliação de um pedido entregue.`, to: "/orders" },
              { icon: Users, title: "Convide amigos", body: `${POINTS_PER_REFERRAL} pontos por cada amigo que criar conta com o seu link.` },
              { icon: Gift, title: "Use em cupões", body: "Troque os pontos por descontos disponíveis na página de cupões.", to: "/coupons" },
            ].map((r) => (
              <li key={r.title} className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-foreground">
                  <r.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.body}</p>
                  {r.to && <Link to={r.to} className="mt-1 inline-block text-xs font-bold text-brand-strong">Ver mais</Link>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
