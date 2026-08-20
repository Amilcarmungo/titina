import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Ticket, Plus, Pencil, Trash2 } from "lucide-react";
import { AdminModal, AdminField, AdminInput, AdminSelect } from "@/components/admin/AdminModal";
import { useCoupons, couponActions, type Coupon } from "@/lib/coupons-store";
import { formatKz } from "@/lib/format";

export const Route = createFileRoute("/admin/cupons")({
  component: CouponsAdmin,
});

const empty: Coupon = { code: "", type: "percent", value: 10, minOrder: 0, description: "", expires: "", active: true };

function CouponsAdmin() {
  const coupons = useCoupons();
  const [draft, setDraft] = useState<Coupon | null>(null);
  const [editing, setEditing] = useState<string | null>(null);

  const save = () => {
    if (!draft) return;
    if (!draft.code.trim()) { toast.error("Define o código do cupom."); return; }
    if (draft.value <= 0) { toast.error("O valor deve ser maior que zero."); return; }
    if (editing) couponActions.update(editing, { ...draft, code: draft.code.trim().toUpperCase() });
    else couponActions.add(draft);
    toast.success(editing ? "Cupom atualizado" : "Cupom criado");
    setDraft(null); setEditing(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Cupons</h1>
          <p className="text-xs text-muted-foreground">{coupons.length} cupom(ns) · usados no checkout</p>
        </div>
        <button onClick={() => { setEditing(null); setDraft({ ...empty }); }} className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background">
          <Plus className="h-4 w-4" /> Novo cupom
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {coupons.map((c) => (
          <div key={c.code} className="rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-muted"><Ticket className="h-5 w-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-sm font-black tracking-wider">{c.code}</p>
                <p className="text-[11px] text-muted-foreground">
                  {c.type === "percent" ? `${c.value}% OFF` : `${formatKz(c.value)} OFF`}
                  {c.minOrder > 0 ? ` · mín. ${formatKz(c.minOrder)}` : ""}
                </p>
                {c.description && <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">{c.description}</p>}
                <div className="mt-2 flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${c.active ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                    {c.active ? "Ativo" : "Inativo"}
                  </span>
                  {c.expires && <span className="text-[10px] text-muted-foreground">expira {c.expires}</span>}
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => { setEditing(c.code); setDraft({ ...c }); }} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border py-1.5 text-xs font-bold hover:bg-muted">
                <Pencil className="h-3.5 w-3.5" /> Editar
              </button>
              <button onClick={() => couponActions.update(c.code, { active: !c.active })} className="rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted">
                {c.active ? "Desativar" : "Ativar"}
              </button>
              <button onClick={() => { couponActions.remove(c.code); toast.success("Cupom removido"); }} className="grid h-8 w-8 place-items-center rounded-full border border-border text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal
        open={!!draft}
        onClose={() => { setDraft(null); setEditing(null); }}
        title={editing ? "Editar cupom" : "Novo cupom"}
        subtitle="Os cupons ativos podem ser aplicados na página de finalizar compra."
        footer={
          <>
            <button onClick={() => { setDraft(null); setEditing(null); }} className="rounded-full border border-border px-4 py-2 text-sm font-bold">Cancelar</button>
            <button onClick={save} className="rounded-full bg-foreground px-5 py-2 text-sm font-bold text-background">Guardar</button>
          </>
        }
      >
        {draft && (
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Código">
              <AdminInput value={draft.code} onChange={(e) => setDraft({ ...draft, code: e.target.value.toUpperCase() })} placeholder="BAZARIXY10" />
            </AdminField>
            <AdminField label="Tipo">
              <AdminSelect value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as Coupon["type"] })}>
                <option value="percent">Percentagem (%)</option>
                <option value="fixed">Valor fixo (Kz)</option>
              </AdminSelect>
            </AdminField>
            <AdminField label={draft.type === "percent" ? "Desconto (%)" : "Desconto (Kz)"}>
              <AdminInput type="number" value={draft.value} onChange={(e) => setDraft({ ...draft, value: Number(e.target.value) })} />
            </AdminField>
            <AdminField label="Pedido mínimo (Kz)">
              <AdminInput type="number" value={draft.minOrder} onChange={(e) => setDraft({ ...draft, minOrder: Number(e.target.value) })} />
            </AdminField>
            <AdminField label="Validade (dd/mm/aaaa)" hint="Deixe vazio para não expirar">
              <AdminInput value={draft.expires ?? ""} onChange={(e) => setDraft({ ...draft, expires: e.target.value })} placeholder="31/12/2026" />
            </AdminField>
            <AdminField label="Estado">
              <AdminSelect value={draft.active ? "1" : "0"} onChange={(e) => setDraft({ ...draft, active: e.target.value === "1" })}>
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </AdminSelect>
            </AdminField>
            <div className="sm:col-span-2">
              <AdminField label="Descrição">
                <AdminInput value={draft.description ?? ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="10% off na primeira compra" />
              </AdminField>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
