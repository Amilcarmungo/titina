import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  Settings,
  Ticket,
  Coins,
  Wallet,
  Gift,
  CreditCard,
  Package,
  Truck,
  MessageSquare,
  Undo2,
  Headphones,
  Repeat2,
  Store,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { actions, useStore } from "@/lib/store";
import { useCoupons } from "@/lib/coupons-store";
import { useOrders } from "@/lib/orders-store";
import { usePoints } from "@/lib/points";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/me")({
  head: () => ({
    meta: [
      { title: "Minha conta — Bazarixy" },
      { name: "description", content: "Sua conta Bazarixy." },
    ],
  }),
  component: MePage,
});

function MePage() {
  const [tab, setTab] = useState<"wishlist" | "recent">("wishlist");
  const { user } = useStore();
  const coupons = useCoupons().filter((c) => c.active);
  const orders = useOrders();
  const points = usePoints();
  const countOf = (status: string) =>
    orders.filter((o) => o.status === status).length;

  /** Nome quando existe; senão o email sem o domínio. Foto quando existe; senão a inicial. */
  const displayName = user?.name?.trim() || (user?.email?.split("@")[0] ?? "");
  const initial = (displayName || user?.email || "?")[0]?.toUpperCase() ?? "?";

  const onSignInClick = (e: React.MouseEvent) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      e.preventDefault();
      actions.openLogin();
    }
  };

  return (
    <Layout title="Minha Conta" hideHeader>
      <div className="md:max-w-4xl md:mx-auto space-y-6">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-brand/20 via-brand/10 to-background rounded-2xl border border-brand/20 px-6 py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {user ? (
                user.photoURL ? (
                  <SmartImage
                    src={user.photoURL}
                    alt={displayName}
                    rounded="rounded-xl"
                    wrapperClassName="h-16 w-16 shrink-0 ring-2 ring-brand/60"
                    className="object-cover"
                  />
                ) : (
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-brand-strong text-2xl font-black text-background">
                    {initial}
                  </span>
                )
              ) : null}
              <div className="min-w-0">
                {user ? (
                  <>
                    <h1 className="text-3xl font-black">Bem-vindo, {displayName}!</h1>
                    <p className="text-muted-foreground mt-1">{user.email}</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-sm font-bold text-gold">
                        ⭐ {points} pontos
                      </span>
                    </div>
                  </>
                ) : (
                  <div>
                    <h1 className="text-3xl font-black">Crie sua conta Bazarixy</h1>
                    <p className="text-muted-foreground mt-1">Aproveite benefícios exclusivos</p>
                    <Link to="/auth" onClick={onSignInClick} className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-strong text-background font-bold px-6 py-2 hover:opacity-90 transition">
                      Entrar ou Cadastrar <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {user && (
              <Link to="/settings" className="p-3 rounded-lg hover:bg-background/50 transition">
                <Settings className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>

        {user && (
          <>
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground font-semibold">Pedidos</p>
                <p className="mt-2 text-2xl font-black">{orders.length}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground font-semibold">Cupons</p>
                <p className="mt-2 text-2xl font-black">{coupons.length}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground font-semibold">Pontos</p>
                <p className="mt-2 text-2xl font-black">{points}</p>
              </div>
            </div>

            {/* Main actions grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: ShoppingBag, label: "Meus Pedidos", to: "/orders" },
                { icon: Ticket, label: "Cupons", to: "/coupons", badge: coupons.length },
                { icon: Heart, label: "Favoritos", to: "/favorites" },
                { icon: Gift, label: "Convidar", to: "/points" },
              ].map((q) => (
                <Link
                  to={q.to}
                  key={q.label}
                  className="relative group rounded-xl border border-border bg-card p-4 hover:border-brand-strong hover:bg-brand/5 transition flex flex-col items-center gap-2"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-muted group-hover:bg-brand/20 transition">
                    <q.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-xs font-semibold text-center">{q.label}</span>
                  {q.badge ? (
                    <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-sale text-[10px] font-bold text-white">
                      {q.badge > 9 ? "9+" : q.badge}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>

            {/* Orders status */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-bold text-lg mb-4">Status dos Pedidos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { icon: CreditCard, label: "A pagar", status: "unpaid" },
                  { icon: Package, label: "Processando", status: "processing" },
                  { icon: Truck, label: "Enviado", status: "shipped" },
                  { icon: MessageSquare, label: "Avaliar", status: "review" },
                  { icon: Undo2, label: "Devoluções", status: "returns" },
                ].map((s) => {
                  const count = countOf(s.status);
                  return (
                    <Link
                      key={s.status}
                      to="/orders"
                      search={{ tab: s.status as any }}
                      className="relative flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition"
                    >
                      <s.icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                      <span className="text-xs font-semibold text-center">{s.label}</span>
                      {count > 0 && (
                        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-sale text-[10px] font-bold text-white">
                          {count > 9 ? "9+" : count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Services */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-bold text-lg mb-4">Mais Serviços</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { icon: Headphones, label: "Suporte", to: "/support" },
                  { icon: Repeat2, label: "Trocas", to: "/orders", search: { tab: "returns" } },
                  { icon: Store, label: "Lojas", to: "/" },
                  { icon: ShieldCheck, label: "Política", to: "/termos" },
                  { icon: AlertCircle, label: "Avisos", to: "/notifications" },
                ].map((s) => (
                  <Link
                    key={s.label}
                    to={s.to}
                    {...(s.search ? { search: s.search as any } : {})}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition"
                  >
                    <s.icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                    <span className="text-xs font-semibold text-center">{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Wishlist section */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 className="font-bold text-lg">Seus Favoritos</h2>
                <Link to="/favorites" className="text-xs text-brand-strong hover:underline">
                  Ver tudo →
                </Link>
              </div>
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground" strokeWidth={1.2} />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Você ainda não salvou nada por aqui.
                  </p>
                  <Link
                    to="/"
                    className="mt-4 rounded-full bg-brand-strong text-background px-6 py-2 text-xs font-bold hover:opacity-90 transition"
                  >
                    Explorar produtos
                  </Link>
                </div>
              ) : (
                <p className="px-6 py-4 text-sm text-muted-foreground">
                  Você tem {orders.length} favorito(s) salvos
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
