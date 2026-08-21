import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, Plus, Pencil, Trash2, ImageIcon } from "lucide-react";
import { AdminModal } from "@/components/admin/AdminModal";
import {
  usePaymentMethods,
  paymentActions,
  type PaymentMethod,
} from "@/lib/payments-store";
import { storagePaths } from "@/lib/firebase/storage";
import { uploadImageFile } from "@/lib/firebase/upload";

export const Route = createFileRoute("/justina/pagamentos")({
  component: PaymentsAdmin,
});

type Draft = Omit<PaymentMethod, "id"> & { id?: string };

const empty: Draft = {
  label: "",
  desc: "",
  image: "",
  active: true,
  instructions: "",
};

function PaymentsAdmin() {
  const methods = usePaymentMethods();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const openNew = () => {
    setEditingId(null);
    setDraft({ ...empty });
  };
  const openEdit = (m: PaymentMethod) => {
    setEditingId(m.id);
    setDraft({ ...m });
  };

  const save = () => {
    if (!draft) return;
    if (!draft.label.trim()) {
      toast.error("Dá um nome ao método.");
      return;
    }
    if (editingId) {
      paymentActions.update(editingId, draft);
      toast.success("Método atualizado");
    } else {
      paymentActions.add(draft);
      toast.success("Método adicionado");
    }
    setDraft(null);
    setEditingId(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">
            Métodos de pagamento
          </h1>
          <p className="text-xs text-muted-foreground">
            {methods.length} método(s) · aparecem no checkout
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background"
        >
          <Plus className="h-4 w-4" /> Novo método
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {methods.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]"
          >
            <span className="grid h-12 w-12 flex-none place-items-center overflow-hidden rounded-xl bg-muted ring-1 ring-border">
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.label}
                  className="max-h-10 max-w-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <CreditCard className="h-5 w-5" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black">{m.label}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {m.desc || m.id}
              </p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${m.active ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}
              >
                {m.active ? "Ativo" : "Inativo"}
              </span>
            </div>
            <div className="flex flex-none gap-1.5">
              <button
                onClick={() => openEdit(m)}
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted"
                aria-label="Editar"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Remover ${m.label}?`)) {
                    paymentActions.remove(m.id);
                    toast.success("Removido");
                  }
                }}
                className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                aria-label="Remover"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {methods.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Nenhum método.
          </p>
        )}
      </div>

      {draft && (
        <AdminModal
          open
          onClose={() => {
            setDraft(null);
            setEditingId(null);
          }}
          title={editingId ? "Editar método" : "Novo método"}
          subtitle="Aparece na etapa de pagamento do checkout"
          size="md"
          footer={
            <>
              <button
                onClick={() => {
                  setDraft(null);
                  setEditingId(null);
                }}
                className="rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted"
              >
                Cancelar
              </button>
              <button
                onClick={save}
                className="rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background"
              >
                Guardar
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-bold">Nome</span>
              <input
                value={draft.label}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                placeholder="Ex.: Multicaixa Express"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold">Descrição</span>
              <input
                value={draft.desc}
                onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                placeholder="Pagamento instantâneo pelo app"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold">
                Número para transferência (aparece na página de pagamento)
              </span>
              <input
                value={draft.phone ?? ""}
                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                placeholder="923 000 000"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold">
                Instruções para o cliente (opcional)
              </span>
              <textarea
                value={draft.instructions ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, instructions: e.target.value })
                }
                rows={3}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                placeholder="Número da conta / IBAN / passos"
              />
            </label>

            <div className="flex items-center gap-3">
              <span className="grid h-16 w-16 flex-none place-items-center overflow-hidden rounded-xl bg-muted ring-1 ring-border">
                {draft.image ? (
                  <img
                    src={draft.image}
                    alt=""
                    className="max-h-14 max-w-14 object-contain"
                  />
                ) : (
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </span>
              <div>
                <input
                  id="pm-img"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f)
                      void uploadImageFile(
                        f,
                        storagePaths.payment(draft.id || "novo", f.name),
                      ).then((url: string | null) => {
                        if (url) setDraft({ ...draft, image: url });
                      });
                    e.target.value = "";
                  }}
                />
                <label
                  htmlFor="pm-img"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted"
                >
                  {draft.image ? "Substituir logo" : "Carregar logo"}
                </label>
                {draft.image && (
                  <button
                    onClick={() => setDraft({ ...draft, image: "" })}
                    className="ml-2 text-xs font-bold text-red-600"
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                checked={draft.active}
                onChange={(e) =>
                  setDraft({ ...draft, active: e.target.checked })
                }
              />
              Ativo no checkout
            </label>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
