import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Store as StoreIcon, Image as ImageIcon, Pencil, Trash2, ArrowUpRight, Package } from "lucide-react";
import { useShops, shopActions, type Shop } from "@/lib/shops-store";
import { useAllProducts } from "@/lib/products-store";
import { AdminModal, AdminField, AdminInput, AdminTextarea } from "@/components/admin/AdminModal";
import { storagePaths } from "@/lib/firebase/storage";
import { uploadImageFile } from "@/lib/firebase/upload";

export const Route = createFileRoute("/admin/lojas")({
  component: ShopsPage,
});

type Draft = { id: string | null; name: string; slug: string; logo: string; cover: string; description: string; ownerName: string };
const empty = (): Draft => ({ id: null, name: "", slug: "", logo: "", cover: "", description: "", ownerName: "" });

function ShopsPage() {
  const shops = useShops();
  const products = useAllProducts();
  const [modal, setModal] = useState<Draft | null>(null);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    products.forEach((p) => { const s = p.shopId ?? "main"; m[s] = (m[s] ?? 0) + 1; });
    return m;
  }, [products]);

  const openNew = () => setModal(empty());
  const openEdit = (s: Shop) => setModal({ id: s.id, name: s.name, slug: s.slug, logo: s.logo ?? "", cover: s.cover ?? "", description: s.description ?? "", ownerName: s.ownerName ?? "" });

  const save = () => {
    if (!modal) return;
    if (!modal.name.trim()) { toast.error("Nome obrigatório"); return; }
    const slug = modal.slug || modal.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (modal.id) {
      shopActions.update(modal.id, { name: modal.name, slug, logo: modal.logo || undefined, cover: modal.cover || undefined, description: modal.description, ownerName: modal.ownerName });
      toast.success("Loja atualizada");
    } else {
      shopActions.add({ name: modal.name, slug, logo: modal.logo || undefined, cover: modal.cover || undefined, description: modal.description, ownerName: modal.ownerName });
      toast.success("Loja criada");
    }
    setModal(null);
  };

  const readFile = async (key: "logo" | "cover", f: File) => {
    const url = await uploadImageFile(f, storagePaths.shop(modal?.id ?? "novas", f.name));
    if (url) setModal((m) => (m ? { ...m, [key]: url } : m));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Lojas</h1>
          <p className="text-xs text-muted-foreground">{shops.length} loja(s) · Cada loja tem seus produtos, pedidos e avaliações</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/20">
          <Plus className="h-4 w-4" /> Nova loja
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shops.map((s) => (
          <div key={s.id} className="group overflow-hidden rounded-2xl bg-background shadow-[var(--shadow-card)] transition hover:shadow-xl">
            <div className="relative aspect-[16/8] bg-gradient-to-br from-muted to-muted/60">
              {s.cover ? <img src={s.cover} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-4xl opacity-40"><StoreIcon /></div>}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="relative px-4 pb-4">
              <div className="-mt-8 flex items-end justify-between">
                <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-background ring-4 ring-background shadow-lg">
                  {s.logo ? <img src={s.logo} alt="" className="h-full w-full object-cover" /> : <StoreIcon className="h-6 w-6 text-muted-foreground" />}
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(s)} className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted"><Pencil className="h-3.5 w-3.5" /></button>
                  {s.id !== "main" && (
                    <button onClick={() => { if (confirm("Excluir loja?")) { shopActions.remove(s.id); toast.success("Removida"); } }}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <p className="font-display text-lg font-black">{s.name}</p>
                <p className="text-[11px] text-muted-foreground">/{s.slug} · {s.ownerName || "Sem responsável"}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{s.description || "—"}</p>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2 text-xs">
                <span className="inline-flex items-center gap-1.5"><Package className="h-3.5 w-3.5" /> {counts[s.id] ?? 0} produto(s)</span>
                <Link to="/admin/lojas/$id" params={{ id: s.id }} className="inline-flex items-center gap-1 font-bold text-foreground">
                  Abrir loja <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminModal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.id ? "Editar loja" : "Nova loja"}
        subtitle="Nome, marca e responsável"
        size="lg"
        footer={
          <>
            <button onClick={() => setModal(null)} className="rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted">Cancelar</button>
            <button onClick={save} className="rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background shadow-lg shadow-foreground/20">Salvar</button>
          </>
        }
      >
        {modal && (
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Nome da loja"><AdminInput value={modal.name} onChange={(e) => setModal({ ...modal, name: e.target.value })} placeholder="Ex.: Bazarixy Beleza" /></AdminField>
            <AdminField label="Slug (URL)" hint="Deixe vazio para gerar automaticamente"><AdminInput value={modal.slug} onChange={(e) => setModal({ ...modal, slug: e.target.value })} placeholder="bazarixy-beleza" /></AdminField>
            <AdminField label="Responsável"><AdminInput value={modal.ownerName} onChange={(e) => setModal({ ...modal, ownerName: e.target.value })} placeholder="Nome do responsável" /></AdminField>
            <AdminField label="Logo">
              <div className="flex items-center gap-2">
                <input id="s-logo" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) readFile("logo", f); }} />
                <label htmlFor="s-logo" className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-bold hover:bg-muted"><ImageIcon className="h-3.5 w-3.5" /> Enviar</label>
                {modal.logo && <img src={modal.logo} alt="" className="h-12 w-12 rounded-lg object-cover ring-1 ring-border" />}
              </div>
            </AdminField>
            <div className="md:col-span-2"><AdminField label="Capa (cover)">
              <div className="flex items-center gap-2">
                <input id="s-cover" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) readFile("cover", f); }} />
                <label htmlFor="s-cover" className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-bold hover:bg-muted"><ImageIcon className="h-3.5 w-3.5" /> Enviar</label>
                {modal.cover && <img src={modal.cover} alt="" className="h-12 w-24 rounded-lg object-cover ring-1 ring-border" />}
              </div>
            </AdminField></div>
            <div className="md:col-span-2"><AdminField label="Descrição"><AdminTextarea rows={3} value={modal.description} onChange={(e) => setModal({ ...modal, description: e.target.value })} placeholder="Sobre esta loja…" /></AdminField></div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
