import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BellOff,
  CheckCheck,
  Info,
  Package,
  Sparkles,
  Ticket,
  Trash2,
  Truck,
} from "lucide-react";

import { Layout } from "@/components/Layout";
import {
  useNotifications,
  notificationActions,
  type AppNotification,
  type NotificationKind,
} from "@/lib/notifications-store";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notificações — Bazarixy" },
      {
        name: "description",
        content:
          "Acompanhe pedidos, entregas, cupões e novidades das lojas da Bazarixy num só lugar.",
      },
      { property: "og:title", content: "Notificações — Bazarixy" },
      {
        property: "og:description",
        content: "Pedidos, entregas, cupões e novidades.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NotificationsPage,
});

const META: Record<
  NotificationKind,
  { icon: typeof Info; tint: string; label: string }
> = {
  order: {
    icon: Package,
    tint: "bg-blue-500/12 text-blue-600",
    label: "Pedido",
  },
  delivery: {
    icon: Truck,
    tint: "bg-emerald-500/12 text-emerald-600",
    label: "Entrega",
  },
  coupon: {
    icon: Ticket,
    tint: "bg-pink-500/12 text-pink-600",
    label: "Cupão",
  },
  product: { icon: Sparkles, tint: "bg-gold/15 text-gold", label: "Novidade" },
  system: {
    icon: Info,
    tint: "bg-muted text-muted-foreground",
    label: "Sistema",
  },
};

type Filter = "all" | "unread" | NotificationKind;

function Card({ n }: { n: AppNotification }) {
  const meta = META[n.kind] ?? META.system;
  const Icon = meta.icon;

  const body = (
    <div
      className={`group relative flex gap-3 rounded-2xl border p-3.5 transition-shadow ${n.read ? "border-border bg-card" : "border-gold/40 bg-gold/[0.06] shadow-[var(--shadow-card)]"}`}
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${meta.tint}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            {meta.label}
          </span>
          {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
          <span className="ml-auto shrink-0 text-[10px] text-muted-foreground">
            {n.createdAt}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug">
          {n.title}
        </p>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {n.body}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          notificationActions.remove(n.id);
        }}
        aria-label="Remover notificação"
        className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full text-muted-foreground opacity-60 hover:bg-destructive/10 hover:text-destructive hover:opacity-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  if (!n.href) return body;
  return (
    <Link
      to={n.href}
      onClick={() => notificationActions.markRead(n.id)}
      className="block"
    >
      {body}
    </Link>
  );
}

function NotificationsPage() {
  const items = useNotifications();
  const [filter, setFilter] = useState<Filter>("all");
  const unread = items.filter((n) => !n.read).length;

  const filters: { key: Filter; label: string }[] = useMemo(() => {
    const kinds = Array.from(new Set(items.map((n) => n.kind)));
    return [
      { key: "all", label: `Todas${items.length ? ` (${items.length})` : ""}` },
      { key: "unread", label: `Não lidas${unread ? ` (${unread})` : ""}` },
      ...kinds.map((k) => ({ key: k as Filter, label: META[k]?.label ?? k })),
    ];
  }, [items, unread]);

  const list = items.filter((n) =>
    filter === "all" ? true : filter === "unread" ? !n.read : n.kind === filter,
  );

  return (
    <Layout simpleHeader showBack hideBottomNav>
      <div className="mx-auto max-w-3xl px-3 pb-16 pt-3 md:pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-display text-xl font-black">
            {unread > 0
              ? `${unread} nova${unread > 1 ? "s" : ""} notificação${unread > 1 ? "ões" : ""}`
              : "Tudo em dia"}
          </p>
          <div className="ml-auto flex flex-wrap gap-2">
            {items.length > 0 && (
              <button
                onClick={() => notificationActions.markAllRead()}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted"
              >
                <CheckCheck className="h-3.5 w-3.5" /> Marcar tudo como lido
              </button>
            )}
            {items.length > 0 && (
              <button
                onClick={() => notificationActions.clear()}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted"
              >
                <Trash2 className="h-3.5 w-3.5" /> Limpar
              </button>
            )}
          </div>
        </div>

        {items.length > 0 && (
          <div className="-mx-3 mt-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${filter === f.key ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {list.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <BellOff
              className="h-14 w-14 text-muted-foreground"
              strokeWidth={1.2}
            />
            <p className="mt-4 font-display text-lg font-black">
              Sem notificações
            </p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Avisamos aqui sobre pedidos, entregas, cupões e novidades das
              lojas.
            </p>
            <Link
              to="/"
              className="mt-6 rounded-full bg-foreground px-8 py-2.5 text-sm font-bold text-background"
            >
              Explorar produtos
            </Link>
          </div>
        ) : (
          <div className="mt-3 space-y-2.5">
            {list.map((n) => (
              <Card key={n.id} n={n} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
