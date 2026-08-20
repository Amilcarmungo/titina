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
      <div className="md:max-w-3xl md:mx-auto">
        {/* Top: Sign in row */}
        <div className="bg-gradient-to-b from-pink-50 via-pink-50/60 to-background px-4 pt-5 pb-4 md:rounded-2xl">
          <div className="flex items-center justify-between gap-2">
            {user ? (
              <div className="flex min-w-0 flex-1 items-center gap-2">
                {user.photoURL ? (
                  <SmartImage
                    src={user.photoURL}
                    alt={displayName}
                    rounded="rounded-full"
                    wrapperClassName="h-10 w-10 shrink-0 ring-2 ring-brand/60"
                    className="object-cover"
                  />
                ) : (
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground text-background font-bold">
                    {initial}
                  </span>
                )}
                <span className="font-display text-base sm:text-lg md:text-xl font-black truncate min-w-0">
                  {displayName}
                </span>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={onSignInClick}
                className="flex min-w-0 flex-1 items-center gap-1"
              >
                <span className="font-display text-xl sm:text-2xl md:text-3xl font-black truncate">
                  Sign In / Register
                </span>
                <ChevronRight className="h-6 w-6 shrink-0" />
              </Link>
            )}
            <Link to="/settings" className="p-2 shrink-0">
              <Settings className="h-5 w-5" />
            </Link>
          </div>

          {/* Two club cards */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Bazarixy Club */}
            <div className="rounded-xl bg-white p-3 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-black text-white">
                  B
                </span>
                <span className="font-display text-sm font-black tracking-wider text-gold">
                  BAZARIXY CLUB
                </span>
              </div>
              <p className="mt-2 text-sm">Benefícios exclusivos</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-border py-3 text-center">
                  <Gift className="mx-auto h-5 w-5 text-gold" />
                  <p className="mt-1 text-[11px]">Brindes</p>
                </div>
                <div className="rounded-lg border border-border py-3 text-center">
                  <CreditCard className="mx-auto h-5 w-5 text-gold" />
                  <p className="mt-1 text-[11px]">Crédito</p>
                </div>
              </div>
              <button className="mt-2 w-full rounded-md bg-orange-50 py-2 text-sm font-bold text-amber-700">
                Aderir agora
              </button>
            </div>

            {/* Bazarixy Saver */}
            <div className="rounded-xl bg-white p-3 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-1">
                <span className="font-display text-sm font-black tracking-wider text-sale">
                  BAZARIXY
                </span>
                <span className="font-display text-sm font-black italic text-sale">
                  Saver
                </span>
              </div>
              <p className="mt-2 text-sm">Cupons para você!</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {coupons.slice(0, 2).map((c) => (
                  <div
                    key={c.code}
                    className="rounded-lg border border-border py-2 text-center"
                  >
                    <p className="text-sm font-black text-sale">
                      {c.type === "percent" ? (
                        <>
                          {c.value}
                          <span className="text-[10px]">% OFF</span>
                        </>
                      ) : (
                        <>
                          Kz {c.value.toLocaleString("pt-AO")}
                          <span className="text-[10px]"> OFF</span>
                        </>
                      )}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {c.minOrder
                        ? `Pedidos Kz ${c.minOrder.toLocaleString("pt-AO")}+`
                        : "Sem mínimo"}
                    </p>
                  </div>
                ))}
                {coupons.length === 0 && (
                  <p className="col-span-2 text-[11px] text-muted-foreground">
                    Sem cupons disponíveis agora.
                  </p>
                )}
              </div>
              <Link
                to="/coupons"
                className="mt-2 block w-full rounded-md bg-pink-50 py-2 text-center text-sm font-bold text-sale"
              >
                Ver cupons
              </Link>
            </div>
          </div>
        </div>

        {/* Quick actions row */}
        <div className="mx-3 md:mx-0 mt-3 rounded-xl bg-white shadow-[var(--shadow-card)] p-3">
          <div className="grid grid-cols-4 gap-2">
            {[
              {
                icon: Ticket,
                label: "Cupons",
                to: "/coupons",
                badge: coupons.length,
              },
              { icon: Coins, label: "Pontos", to: "/points", badge: points },
              { icon: Wallet, label: "Carteira", to: "/wallet", badge: 0 },
              { icon: Gift, label: "Convidar", to: "/points", badge: 0 },
            ].map((q) => (
              <Link
                to={q.to}
                key={q.label}
                className="flex flex-col items-center gap-1 py-2"
              >
                <span className="relative">
                  <q.icon className="h-6 w-6" strokeWidth={1.6} />
                  {q.badge > 0 && (
                    <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-white">
                      {q.badge > 99 ? "99+" : q.badge}
                    </span>
                  )}
                </span>
                <span className="text-[11px]">{q.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* My orders */}
        <div className="mx-3 md:mx-0 mt-3 rounded-xl bg-white shadow-[var(--shadow-card)] p-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold">Meus Pedidos</h2>
            <Link
              to="/orders"
              search={{ tab: "unpaid" as const }}
              className="flex items-center text-xs text-muted-foreground"
            >
              Ver todos <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {[
              { icon: CreditCard, label: "A pagar", tab: "unpaid" as const },
              {
                icon: Package,
                label: "Processando",
                tab: "processing" as const,
              },
              { icon: Truck, label: "Enviado", tab: "shipped" as const },
              { icon: MessageSquare, label: "Avaliar", tab: "review" as const },
              { icon: Undo2, label: "Devoluções", tab: "returns" as const },
            ].map((o) => {
              const badge = countOf(o.tab);
              return (
                <Link
                  key={o.label}
                  to="/orders"
                  search={{ tab: o.tab }}
                  className="relative flex flex-col items-center gap-1 py-2 text-center"
                >
                  <div className="relative">
                    <o.icon className="h-6 w-6" strokeWidth={1.6} />
                    {badge > 0 && (
                      <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-white">
                        {badge > 99 ? "99+" : badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] leading-tight">{o.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* More services */}
        <div className="mx-3 md:mx-0 mt-3 rounded-xl bg-white shadow-[var(--shadow-card)] p-3">
          <h2 className="font-display text-base font-bold">Mais Serviços</h2>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {[
              { icon: Headphones, label: "Suporte", to: "/support" as const },
              {
                icon: Repeat2,
                label: "Trocas",
                to: "/orders" as const,
                search: { tab: "returns" as const },
              },
              { icon: Store, label: "Seguindo", to: "/store" as const },
              { icon: ShieldCheck, label: "Política", to: "/termos" as const },
              {
                icon: AlertCircle,
                label: "Avisos",
                to: "/notifications" as const,
              },
            ].map((s) => (
              <Link
                key={s.label}
                to={s.to}
                {...(s.search ? { search: s.search } : {})}
                className="flex flex-col items-center gap-1 py-2 text-center"
              >
                <s.icon className="h-6 w-6" strokeWidth={1.6} />
                <span className="text-[10px] leading-tight">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Wishlist / recent tabs */}
        <div className="mx-3 md:mx-0 mt-3 rounded-xl bg-white shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-6 border-b border-border px-4 pt-3">
            {(["wishlist", "recent"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative pb-3 text-sm ${tab === t ? "font-bold text-foreground after:absolute after:-bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-foreground" : "text-muted-foreground"}`}
              >
                {t === "wishlist" ? "Favoritos" : "Vistos recentemente"}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <Heart
              className="h-12 w-12 text-muted-foreground"
              strokeWidth={1.2}
            />
            <p className="mt-3 text-sm text-muted-foreground">
              Você ainda não salvou nada por aqui.
            </p>
            <Link
              to="/"
              className="mt-4 rounded-full bg-foreground px-6 py-2 text-xs font-bold text-background"
            >
              Explorar produtos
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
