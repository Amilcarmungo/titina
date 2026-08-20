import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Target, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { useOrders } from "@/lib/orders-store";
import { useAllProducts } from "@/lib/products-store";
import { revenueSummary } from "@/lib/revenue";
import { formatKz } from "@/lib/format";
import {
  METRIC_LABEL,
  goalActions,
  useGoals,
  type Goal,
  type GoalMetric,
} from "@/lib/goals-store";

export const Route = createFileRoute("/admin/metas")({
  component: GoalsPage,
});

function currentPeriod() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function GoalsPage() {
  const goals = useGoals();
  const orders = useOrders();
  const products = useAllProducts();
  const [open, setOpen] = useState(false);

  const progress = useMemo(() => {
    const rev = revenueSummary(orders);
    const customers = new Set(orders.map((o) => o.uid ?? o.id)).size;
    return (g: Goal) => {
      const value =
        g.metric === "revenue"
          ? rev.gross
          : g.metric === "orders"
            ? orders.length
            : g.metric === "products"
              ? products.length
              : customers;
      return {
        value,
        pct:
          g.target > 0
            ? Math.min(100, Math.round((value / g.target) * 100))
            : 0,
      };
    };
  }, [orders, products]);

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-foreground text-background">
          <Target className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-black">Metas</h1>
          <p className="text-xs text-muted-foreground">
            Defina objectivos de receita, pedidos, produtos e clientes.
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="ml-auto inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-bold text-background"
        >
          <Plus className="h-4 w-4" /> Nova meta
        </button>
      </header>

      {goals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Target
            className="mx-auto h-12 w-12 text-muted-foreground"
            strokeWidth={1.2}
          />
          <p className="mt-3 font-display text-lg font-black">
            Nenhuma meta definida
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Crie a primeira meta para acompanhar o crescimento da Bazarixy.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {goals.map((g) => {
            const { value, pct } = progress(g);
            const fmt = (n: number) =>
              g.metric === "revenue" ? formatKz(n) : n.toLocaleString("pt-BR");
            return (
              <article
                key={g.id}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-base font-black">
                      {g.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {METRIC_LABEL[g.metric]} · {g.period}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      goalActions.remove(g.id);
                      toast.success("Meta removida");
                    }}
                    aria-label="Remover meta"
                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-end justify-between text-sm">
                  <span className="font-display text-xl font-black">
                    {fmt(value)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    de {fmt(g.target)}
                  </span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${pct >= 100 ? "bg-emerald-500" : "bg-gold"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] font-bold text-muted-foreground">
                  {pct}% concluído
                </p>
                {g.note && (
                  <p className="mt-2 text-xs text-muted-foreground">{g.note}</p>
                )}
              </article>
            );
          })}
        </div>
      )}

      {open && <GoalModal onClose={() => setOpen(false)} />}
    </div>
  );
}

function GoalModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [metric, setMetric] = useState<GoalMetric>("revenue");
  const [target, setTarget] = useState("");
  const [period, setPeriod] = useState(currentPeriod());
  const [note, setNote] = useState("");

  const save = () => {
    const value = Number(target.replace(/\D/g, ""));
    if (!title.trim()) {
      toast.error("Dê um nome à meta");
      return;
    }
    if (!value) {
      toast.error("Defina o valor alvo");
      return;
    }
    goalActions.add({
      title: title.trim(),
      metric,
      target: value,
      period,
      note: note.trim() || undefined,
    });
    toast.success("Meta criada");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-[2px] md:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-background p-5 pb-7 shadow-2xl md:rounded-3xl md:pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-black">Nova meta</h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-1.5 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="mt-4 block text-xs font-semibold text-muted-foreground">
          Nome
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex.: Receita de Agosto"
          className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-gold"
        />

        <label className="mt-3 block text-xs font-semibold text-muted-foreground">
          Indicador
        </label>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as GoalMetric)}
          className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-gold"
        >
          {Object.entries(METRIC_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">
              Valor alvo
            </label>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">
              Período
            </label>
            <input
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="2026-08"
              className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-gold"
            />
          </div>
        </div>

        <label className="mt-3 block text-xs font-semibold text-muted-foreground">
          Nota (opcional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
        />

        <button
          onClick={save}
          className="mt-4 h-12 w-full rounded-xl bg-foreground text-sm font-black text-background"
        >
          Guardar meta
        </button>
      </div>
    </div>
  );
}
