import { createFileRoute, Link } from "@tanstack/react-router";
import { useOrders } from "@/lib/orders-store";
import { useCustomProducts } from "@/lib/products-store";
import { useSlidesRaw } from "@/lib/banner";
import { useCategories } from "@/lib/categories-store";
import { useShops } from "@/lib/shops-store";
import { useCarriers, PLATFORM_FEE } from "@/lib/logistics-store";
import { revenueSummary } from "@/lib/revenue";
import { getAnyProduct } from "@/lib/products-store";
import { formatKz } from "@/lib/format";
import {
  Package,
  ShoppingBag,
  Layers,
  FolderTree,
  TrendingUp,
  Store as StoreIcon,
  ArrowUpRight,
  Plus,
  Image as ImageIcon,
  ClipboardList,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Sparkline({
  values,
  color = "currentColor",
}: {
  values: number[];
  color?: string;
}) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const pts = values
    .map(
      (v, i) =>
        `${(i / (values.length - 1 || 1)) * 100},${100 - ((v - min) / range) * 100}`,
    )
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="h-10 w-full"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
      />
    </svg>
  );
}

function Dashboard() {
  const orders = useOrders();
  const customs = useCustomProducts();
  const slides = useSlidesRaw();
  const cats = useCategories();
  const shops = useShops();
  const carriers = useCarriers();

  const rev = revenueSummary(orders);
  const pending = orders.filter(
    (o) => o.status === "unpaid" || o.status === "processing",
  ).length;

  const trend = [3, 4, 3, 6, 5, 7, 8, 6, 9, 10, 8, 12];

  const stats = [
    {
      to: "/admin/receita",
      label: "Receita total",
      value: formatKz(rev.gross),
      sub: `Bazarixy ${Math.round(PLATFORM_FEE * 100)}% · ${formatKz(rev.platform)}`,
      icon: TrendingUp,
      tint: "from-emerald-500/20 to-emerald-500/5",
      ic: "bg-emerald-500",
      trend,
    },
    {
      to: "/admin/pedidos",
      label: "Pedidos",
      value: `${orders.length}`,
      sub: `${pending} pendentes`,
      icon: ShoppingBag,
      tint: "from-blue-500/20 to-blue-500/5",
      ic: "bg-blue-500",
      trend: trend.map((v) => v * 0.6),
    },
    {
      to: "/admin/produtos",
      label: "Produtos",
      value: `${customs.length}`,
      sub: "publicados por você",
      icon: Package,
      tint: "from-purple-500/20 to-purple-500/5",
      ic: "bg-purple-500",
      trend: trend.map((v) => v * 0.4),
    },
    {
      to: "/admin/categorias",
      label: "Categorias",
      value: `${cats.length}`,
      sub: "editar categorias",
      icon: FolderTree,
      tint: "from-pink-500/20 to-pink-500/5",
      ic: "bg-pink-500",
      trend: trend.map((v) => v * 0.3),
    },
    {
      to: "/admin/lojas",
      label: "Lojas",
      value: `${shops.length}`,
      sub: "gerir vitrines",
      icon: StoreIcon,
      tint: "from-amber-500/20 to-amber-500/5",
      ic: "bg-amber-500",
      trend: trend.map((v) => v * 0.5),
    },
  ];

  const quick = [
    {
      to: "/admin/produtos",
      label: "Adicionar produto",
      desc: "Publique um novo item",
      icon: Plus,
      color: "bg-emerald-500",
    },
    {
      to: "/admin/home",
      label: "Novo banner",
      desc: "Destaque na home",
      icon: ImageIcon,
      color: "bg-amber-500",
    },
    {
      to: "/admin/logistica",
      label: "Fretes",
      desc: `${carriers.filter((c) => c.active).length} opções ativas`,
      icon: Truck,
      color: "bg-blue-600",
    },
    {
      to: "/admin/pedidos",
      label: "Ver pedidos",
      desc: `${pending} aguardando`,
      icon: ClipboardList,
      color: "bg-blue-500",
    },
  ];

  const statusColor: Record<string, string> = {
    unpaid: "bg-red-100 text-red-700",
    processing: "bg-amber-100 text-amber-700",
    shipped: "bg-blue-100 text-blue-700",
    review: "bg-purple-100 text-purple-700",
    returns: "bg-gray-200 text-gray-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">
            Bem-vindo(a) 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie tudo da sua loja Bazarixy num só lugar.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          Hoje ·{" "}
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${s.tint} p-4 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-foreground hover:shadow-xl`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`grid h-10 w-10 place-items-center rounded-xl text-white shadow-lg ${s.ic}`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-wide text-muted-foreground font-bold">
              {s.label}
            </p>
            <p className="mt-0.5 text-xl font-black">{s.value}</p>
            {s.sub && (
              <p className="text-[11px] text-muted-foreground">{s.sub}</p>
            )}
            <div className="mt-2 text-foreground/40">
              <Sparkline values={s.trend} />
            </div>
          </Link>
        ))}
      </div>

      {/* Revenue split */}
      <Link
        to="/admin/receita"
        className="block rounded-2xl bg-background p-5 shadow-[var(--shadow-card)] transition hover:shadow-xl"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-black">
              Divisão da receita
            </h2>
            <p className="text-xs text-muted-foreground">
              Bazarixy retém {Math.round(PLATFORM_FEE * 100)}% de cada venda e
              de cada frete.
            </p>
          </div>
          <span className="text-xs font-bold text-muted-foreground">
            Ver relatório completo ›
          </span>
        </div>
        <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="bg-gradient-to-r from-orange-500 to-pink-500"
            style={{ width: `${PLATFORM_FEE * 100}%` }}
          />
          <div className="flex-1 bg-emerald-500" />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-muted/40 p-3">
            <p className="text-[11px] font-bold uppercase text-muted-foreground">
              Bruto
            </p>
            <p className="text-lg font-black">{formatKz(rev.gross)}</p>
          </div>
          <div className="rounded-xl bg-muted/40 p-3">
            <p className="text-[11px] font-bold uppercase text-muted-foreground">
              Bazarixy 5%
            </p>
            <p className="text-lg font-black text-sale">
              {formatKz(rev.platform)}
            </p>
          </div>
          <div className="rounded-xl bg-muted/40 p-3">
            <p className="text-[11px] font-bold uppercase text-muted-foreground">
              Lojas 95%
            </p>
            <p className="text-lg font-black text-emerald-600">
              {formatKz(rev.shop)}
            </p>
          </div>
        </div>
      </Link>

      <div>
        <h2 className="mb-3 font-display text-lg font-black">Ações rápidas</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quick.map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-background p-4 transition hover:border-foreground hover:shadow-xl"
            >
              <div
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white ${q.color}`}
              >
                <q.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black">{q.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{q.desc}</p>
              </div>
              <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)] lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-black">
              Pedidos recentes
            </h2>
            <Link
              to="/admin/pedidos"
              className="text-xs font-bold text-muted-foreground hover:text-foreground"
            >
              Ver todos ›
            </Link>
          </div>
          <div className="divide-y divide-border">
            {orders.slice(0, 6).map((o) => {
              const first = o.items[0]
                ? getAnyProduct(o.items[0].productId)
                : undefined;
              return (
                <div
                  key={o.id}
                  className="flex items-center gap-3 py-3 text-sm"
                >
                  {first?.image ? (
                    <img
                      src={first.image}
                      alt=""
                      className="h-10 w-10 rounded-lg object-cover ring-1 ring-border"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-muted" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">#{o.id}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {o.createdAt} · {o.customer ?? "cliente"}
                    </p>
                  </div>
                  <span
                    className={`hidden sm:inline rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColor[o.status]}`}
                  >
                    {o.status}
                  </span>
                  <span className="text-sm font-black text-sale">
                    {formatKz(o.total)}
                  </span>
                </div>
              );
            })}
            {orders.length === 0 && (
              <p className="py-6 text-center text-xs text-muted-foreground">
                Nenhum pedido ainda.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]">
          <h2 className="mb-3 font-display text-lg font-black">Conteúdo</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4" /> Banners ativos
              </span>
              <span className="font-black">{slides.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
              <span className="flex items-center gap-2">
                <FolderTree className="h-4 w-4" /> Categorias
              </span>
              <span className="font-black">{cats.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
              <span className="flex items-center gap-2">
                <StoreIcon className="h-4 w-4" /> Lojas ativas
              </span>
              <span className="font-black">{shops.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
