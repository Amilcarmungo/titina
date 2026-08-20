import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, Truck, Bike, Store as StoreIcon, MapPin, RotateCcw, Power } from "lucide-react";
import { useCarriers, useShippingSettings, carrierActions, shippingActions, CARRIER_LABEL, splitFreight, PLATFORM_FEE, type Carrier, type CarrierType, type Zone } from "@/lib/logistics-store";
import { formatKz } from "@/lib/format";
import { AdminModal, AdminField, AdminInput } from "@/components/admin/AdminModal";

export const Route = createFileRoute("/admin/logistica")({
  component: LogisticsPage,
});

type Draft = Omit<Carrier, "id" | "createdAt"> & { id?: string };

const empty = (): Draft => ({
  name: "", type: "moto", phone: "", active: true, baseFee: 1500, perKm: 150,
  maxWeightKg: 10, etaText: "Mesmo dia", coverage: "Luanda", zones: [],
});

const ICON: Record<CarrierType, typeof Truck> = { transportadora: Truck, moto: Bike, retirada: StoreIcon };

function LogisticsPage() {
  const carriers = useCarriers();
  const shippingSettings = useShippingSettings();
  const [modal, setModal] = useState<Draft | null>(null);
  const [simKm, setSimKm] = useState(8);

  const active = carriers.filter((c) => c.active);
  const cheapest = useMemo(() => {
    const fees = active.filter((c) => c.type !== "retirada").map((c) => c.baseFee);
    return fees.length ? Math.min(...fees) : 0;
  }, [active]);

  const save = () => {
    if (!modal) return;
    if (!modal.name.trim()) { toast.error("Dê um nome à transportadora"); return; }
    const { id, ...rest } = modal;
    if (id) { carrierActions.update(id, rest); toast.success("Frete atualizado"); }
    else { carrierActions.add(rest); toast.success("Transportadora criada"); }
    setModal(null);
  };

  const setZone = (zid: string, patch: Partial<Zone>) =>
    setModal((m) => m ? { ...m, zones: m.zones.map((z) => z.id === zid ? { ...z, ...patch } : z) } : m);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Logística & fretes</h1>
          <p className="text-xs text-muted-foreground">
            Transportadoras, moto-boys e zonas de entrega · Bazarixy retém {Math.round(PLATFORM_FEE * 100)}% do valor do frete
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { carrierActions.reset(); shippingActions.reset(); toast.success("Restaurado"); }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted">
            <RotateCcw className="h-3.5 w-3.5" /> Restaurar padrão
          </button>
          <button onClick={() => setModal(empty())} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/20">
            <Plus className="h-4 w-4" /> Nova opção de entrega
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-500/10 to-transparent p-4">
          <p className="text-[11px] font-bold uppercase text-muted-foreground">Opções ativas</p>
          <p className="text-2xl font-black">{active.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-500/10 to-transparent p-4">
          <p className="text-[11px] font-bold uppercase text-muted-foreground">Frete mínimo</p>
          <p className="text-2xl font-black">{formatKz(cheapest)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-gradient-to-br from-orange-500/10 to-pink-500/5 p-4">
          <p className="text-[11px] font-bold uppercase text-muted-foreground">Comissão no frete</p>
          <p className="text-2xl font-black">{Math.round(PLATFORM_FEE * 100)}%</p>
        </div>
      </div>

      <div className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-black">Política de frete grátis</h2>
            <p className="mt-1 text-[11px] text-muted-foreground">A regra é aplicada automaticamente no carrinho e no checkout.</p>
          </div>
          <label className="flex items-center gap-2 text-xs font-bold">
            <input type="checkbox" checked={shippingSettings.freeShippingEnabled} onChange={(e) => shippingActions.update({ freeShippingEnabled: e.target.checked })} className="h-4 w-4 accent-foreground" />
            Ativar frete grátis
          </label>
        </div>
        <div className="mt-4 max-w-xs">
          <AdminField label="Compra mínima (Kz)">
            <AdminInput type="number" min={0} value={shippingSettings.freeShippingThreshold} onChange={(e) => shippingActions.update({ freeShippingThreshold: Number(e.target.value) })} />
          </AdminField>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {carriers.map((c) => {
          const Icon = ICON[c.type];
          return (
            <div key={c.id} className="rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-start gap-3">
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white ${c.type === "moto" ? "bg-orange-500" : c.type === "transportadora" ? "bg-blue-600" : "bg-neutral-700"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-black">{c.name}</p>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold">{CARRIER_LABEL[c.type]}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${c.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}`}>
                      {c.active ? "Ativo" : "Pausado"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {c.coverage} · {c.etaText}{c.maxWeightKg ? ` · até ${c.maxWeightKg} kg` : ""}{c.phone ? ` · ${c.phone}` : ""}
                  </p>
                  <p className="mt-1 text-xs">
                    Base <span className="font-bold">{formatKz(c.baseFee)}</span>
                    {c.perKm ? <> · por km <span className="font-bold">{formatKz(c.perKm)}</span></> : null}
                  </p>
                  {c.zones.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.zones.map((z) => (
                        <span key={z.id} className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px]">
                          <MapPin className="h-3 w-3" /> {z.name} · {formatKz(z.fee)} · {z.etaText}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 rounded-lg bg-muted/50 p-2 text-[11px]">
                    Simulação {simKm} km: <b>{formatKz(c.baseFee + c.perKm * simKm)}</b> · Bazarixy {formatKz(splitFreight(c.baseFee + c.perKm * simKm).platform)} · transportadora {formatKz(splitFreight(c.baseFee + c.perKm * simKm).carrier)}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button onClick={() => carrierActions.update(c.id, { active: !c.active })} title="Ativar/pausar"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted">
                    <Power className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setModal({ ...c })} className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => { if (confirm("Remover opção de entrega?")) { carrierActions.remove(c.id); toast.success("Removido"); } }}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-black">Simulador de distância</h2>
        <p className="text-[11px] text-muted-foreground">Ajuste os km para comparar o custo de cada opção.</p>
        <input type="range" min={1} max={60} value={simKm} onChange={(e) => setSimKm(Number(e.target.value))} className="mt-3 w-full accent-foreground" />
        <p className="mt-1 text-xs font-bold">{simKm} km</p>
      </div>

      <AdminModal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.id ? "Editar entrega" : "Nova opção de entrega"}
        subtitle="Taxas, cobertura e zonas"
        size="lg"
        footer={
          <>
            <button onClick={() => setModal(null)} className="rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted">Cancelar</button>
            <button onClick={save} className="rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background">Salvar</button>
          </>
        }
      >
        {modal && (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <AdminField label="Nome"><AdminInput value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value })} /></AdminField>
              <AdminField label="Tipo">
                <select value={modal.type} onChange={(e) => setModal({ ...modal, type: e.target.value as CarrierType })}
                  className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none">
                  <option value="transportadora">Transportadora</option>
                  <option value="moto">Moto-boy</option>
                  <option value="retirada">Retirada na loja</option>
                </select>
              </AdminField>
              <AdminField label="Telefone"><AdminInput value={modal.phone ?? ""} onChange={(e) => setModal({ ...modal, phone: e.target.value })} /></AdminField>
              <AdminField label="Cobertura"><AdminInput value={modal.coverage ?? ""} onChange={(e) => setModal({ ...modal, coverage: e.target.value })} /></AdminField>
              <AdminField label="Taxa base (Kz)"><AdminInput type="number" value={modal.baseFee} onChange={(e) => setModal({ ...modal, baseFee: Number(e.target.value) })} /></AdminField>
              <AdminField label="Preço por km (Kz)"><AdminInput type="number" value={modal.perKm} onChange={(e) => setModal({ ...modal, perKm: Number(e.target.value) })} /></AdminField>
              <AdminField label="Peso máximo (kg)"><AdminInput type="number" value={modal.maxWeightKg ?? 0} onChange={(e) => setModal({ ...modal, maxWeightKg: Number(e.target.value) })} /></AdminField>
              <AdminField label="Prazo estimado"><AdminInput value={modal.etaText ?? ""} onChange={(e) => setModal({ ...modal, etaText: e.target.value })} /></AdminField>
            </div>

            <label className="flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" checked={modal.active} onChange={(e) => setModal({ ...modal, active: e.target.checked })} className="h-4 w-4 accent-foreground" />
              Disponível no checkout
            </label>

            <div className="rounded-xl border border-border p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black">Zonas de entrega</p>
                <button onClick={() => setModal({ ...modal, zones: [...modal.zones, { id: `z-${Date.now()}`, name: "Nova zona", fee: modal.baseFee, etaText: "24h" }] })}
                  className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background">
                  <Plus className="h-3 w-3" /> Zona
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {modal.zones.map((z) => (
                  <div key={z.id} className="grid gap-2 sm:grid-cols-[1fr_120px_120px_40px]">
                    <AdminInput value={z.name} onChange={(e) => setZone(z.id, { name: e.target.value })} placeholder="Zona" />
                    <AdminInput type="number" value={z.fee} onChange={(e) => setZone(z.id, { fee: Number(e.target.value) })} placeholder="Kz" />
                    <AdminInput value={z.etaText} onChange={(e) => setZone(z.id, { etaText: e.target.value })} placeholder="Prazo" />
                    <button onClick={() => setModal({ ...modal, zones: modal.zones.filter((x) => x.id !== z.id) })}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {modal.zones.length === 0 && <p className="text-[11px] text-muted-foreground">Sem zonas — será usada a taxa base + km.</p>}
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
