import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useOrders } from "@/lib/orders-store";
import { useShops } from "@/lib/shops-store";
import { getAnyProduct } from "@/lib/products-store";
import { formatKz } from "@/lib/format";
import {
  revenueSummary,
  revenueByMonth,
  splitSale,
  PLATFORM_FEE,
} from "@/lib/revenue";
import {
  TrendingUp,
  Wallet,
  Store as StoreIcon,
  PieChart,
  Download,
  ArrowLeft,
  Receipt,
} from "lucide-react";

export const Route = createFileRoute("/justina/receita")({
  component: RevenuePage,
});

function Bar({ value, max }: { value: number; max: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
        style={{ width: `${max ? (value / max) * 100 : 0}%` }}
      />
    </div>
  );
}

function RevenuePage() {
  const orders = useOrders();
  const shops = useShops();
  const sum = useMemo(() => revenueSummary(orders), [orders]);
  const months = useMemo(() => revenueByMonth(orders), [orders]);
  const maxMonth = Math.max(...months.map((m) => m.value), 1);

  const byShop = useMemo(() => {
    const map = new Map<string, number>();
    for (const o of orders) {
      for (const it of o.items) {
        const p = getAnyProduct(it.productId);
        const sid = p?.shopId ?? "main";
        map.set(
          sid,
          (map.get(sid) ?? 0) + (it.unitPrice ?? p?.price ?? 0) * it.qty,
        );
      }
    }
    return Array.from(map, ([id, gross]) => ({
      id,
      name: shops.find((s) => s.id === id)?.name ?? "Bazarixy Oficial",
      ...splitSale(gross),
    })).sort((a, b) => b.gross - a.gross);
  }, [orders, shops]);

  const exportCsv = () => {
    const rows = [
      ["Pedido", "Data", "Estado", "Total", "Bazarixy 5%", "Loja 95%"],
      ...orders.map((o) => {
        const s = splitSale(o.total);
        return [
          o.id,
          o.createdAt,
          o.status,
          o.total.toFixed(2),
          s.platform.toFixed(2),
          s.shop.toFixed(2),
        ];
      }),
    ];
    const csv = rows.map((r) => r.join(";")).join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "receita-bazarixy.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const cards = [
    {
      label: "Receita bruta",
      value: formatKz(sum.gross),
      sub: `${sum.orders} pedido(s) pagos`,
      icon: TrendingUp,
      tint: "from-emerald-500/15 to-emerald-500/0",
      ic: "bg-emerald-500",
    },
    {
      label: `Bazarixy (${Math.round(PLATFORM_FEE * 100)}%)`,
      value: formatKz(sum.platform),
      sub: "comissão da plataforma",
      icon: PieChart,
      tint: "from-orange-500/15 to-pink-500/0",
      ic: "bg-gradient-to-br from-orange-500 to-pink-500",
    },
    {
      label: "Repasse às lojas",
      value: formatKz(sum.shop),
      sub: "95% das vendas",
      icon: StoreIcon,
      tint: "from-blue-500/15 to-blue-500/0",
      ic: "bg-blue-500",
    },
    {
      label: "A receber",
      value: formatKz(sum.pending),
      sub: "pedidos ainda não pagos",
      icon: Wallet,
      tint: "from-amber-500/15 to-amber-500/0",
      ic: "bg-amber-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link
            to="/justina"
            className="mb-1 inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Dashboard
          </Link>
          <h1 className="font-display text-3xl font-black tracking-tight">
            Receita total
          </h1>
          <p className="text-xs text-muted-foreground">
            A Bazarixy retém {Math.round(PLATFORM_FEE * 100)}% de cada venda e
            de cada frete — o restante é repassado à loja.
          </p>
        </div>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted"
        >
          <Download className="h-3.5 w-3.5" /> Exportar CSV
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`rounded-2xl border border-border bg-gradient-to-br ${c.tint} p-4 shadow-[var(--shadow-card)]`}
          >
            <div
              className={`grid h-10 w-10 place-items-center rounded-xl text-white shadow-lg ${c.ic}`}
            >
              <c.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              {c.label}
            </p>
            <p className="mt-0.5 text-xl font-black">{c.value}</p>
            <p className="text-[11px] text-muted-foreground">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)] lg:col-span-2">
          <h2 className="font-display text-lg font-black">Evolução mensal</h2>
          <div className="mt-4 space-y-3">
            {months.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">{m.label}</span>
                  <span className="text-muted-foreground">
                    {formatKz(m.value)} · Bazarixy{" "}
                    {formatKz(m.value * PLATFORM_FEE)}
                  </span>
                </div>
                <Bar value={m.value} max={maxMonth} />
              </div>
            ))}
            {months.length === 0 && (
              <p className="py-6 text-center text-xs text-muted-foreground">
                Sem receita registrada.
              </p>
            )}
          </div>

          <div className="mt-6 rounded-xl bg-muted/40 p-4 text-xs">
            <p className="font-black">Como é calculado</p>
            <ul className="mt-1.5 space-y-1 text-muted-foreground">
              <li>
                Receita bruta = soma dos pedidos pagos (processando, enviado,
                avaliar).
              </li>
              <li>
                Comissão Bazarixy = receita bruta ×{" "}
                {Math.round(PLATFORM_FEE * 100)}%.
              </li>
              <li>Repasse à loja = receita bruta − comissão.</li>
              <li>
                Devoluções ({formatKz(sum.refunded)}) não entram no cálculo.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-lg font-black">Por loja</h2>
            <div className="mt-3 space-y-3">
              {byShop.map((s) => (
                <div key={s.id} className="rounded-xl border border-border p-3">
                  <p className="text-sm font-bold">{s.name}</p>
                  <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                    <span>Bruto</span>
                    <span className="font-bold text-foreground">
                      {formatKz(s.gross)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Bazarixy 5%</span>
                    <span>{formatKz(s.platform)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Repasse</span>
                    <span className="font-bold text-sale">
                      {formatKz(s.shop)}
                    </span>
                  </div>
                </div>
              ))}
              {byShop.length === 0 && (
                <p className="text-xs text-muted-foreground">Sem dados.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]">
            <h2 className="mb-3 font-display text-lg font-black">
              Indicadores
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
                <span className="flex items-center gap-2">
                  <Receipt className="h-4 w-4" /> Ticket médio
                </span>
                <span className="font-black">{formatKz(sum.avgTicket)}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
                <span>Pedidos pagos</span>
                <span className="font-black">{sum.orders}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
                <span>Devoluções</span>
                <span className="font-black">{formatKz(sum.refunded)}</span>
              </div>
            </div>
            <Link
              to="/justina/logistica"
              className="mt-3 block rounded-xl border border-border p-3 text-center text-xs font-bold hover:bg-muted"
            >
              Gerir fretes e transportadoras ›
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
