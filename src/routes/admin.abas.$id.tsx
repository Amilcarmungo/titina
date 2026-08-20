import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Pencil, Image as ImageIcon, Check } from "lucide-react";
import { useHomeConfig, homeConfigActions, type HomeTab } from "@/lib/home-config";
import { useCategories } from "@/lib/categories-store";
import { useSlidesRaw, slideActions, type SlideData } from "@/lib/banner";
import { products as defaultProducts } from "@/lib/products";
import { useCustomProducts } from "@/lib/products-store";
import { AdminModal, AdminField, AdminInput } from "@/components/admin/AdminModal";
import { storagePaths } from "@/lib/firebase/storage";
import { uploadImageFile } from "@/lib/firebase/upload";

export const Route = createFileRoute("/admin/abas/$id")({
  head: () => ({
    meta: [
      { title: "Gerir aba da home — Bazarixy Admin" },
      { name: "description", content: "Crie e edite abas principais da página inicial: nome, categorias e banners exclusivos." },
      { property: "og:title", content: "Gerir aba da home — Bazarixy Admin" },
      { property: "og:description", content: "Crie e edite abas principais da página inicial: nome, categorias e banners exclusivos." },
    ],
  }),
  component: TabEditor,
});

type BannerDraft = Omit<SlideData, "id"> & { id?: string };
const emptyBanner = (): BannerDraft => ({ img: "", title: "", subtitle: "", caption: "", cta: "Comprar agora", pickIds: [] });

function TabEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const cfg = useHomeConfig();
  const cats = useCategories();
  const slides = useSlidesRaw();
  const isNew = id === "novo";

  const existing = cfg.homeTabs.find((t) => t.id === id);
  const [label, setLabel] = useState(existing?.label ?? "");
  const [slugs, setSlugs] = useState<string[]>(existing?.slugs ?? []);
  const [slideIds, setSlideIds] = useState<string[]>(existing?.slideIds ?? []);
  const [banner, setBanner] = useState<BannerDraft | null>(null);
  const [bannerFiles, setBannerFiles] = useState<{ image?: File; overlay?: File }>({});
  const [publishing, setPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [publishedLink, setPublishedLink] = useState<string | null>(null);

  const tabBanners = useMemo(
    () => slideIds.map((sid) => slides.find((s) => s.id === sid)).filter(Boolean) as SlideData[],
    [slideIds, slides],
  );

  if (!isNew && !existing) {
    return (
      <div className="space-y-3">
        <p className="text-sm font-bold">Aba não encontrada.</p>
        <Link to="/admin/home" className="text-xs font-bold underline">Voltar à página inicial</Link>
      </div>
    );
  }

  const persist = (patch: Partial<HomeTab>) => {
    if (isNew) return;
    homeConfigActions.update({
      homeTabs: cfg.homeTabs.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });
  };

  const toggleCat = (slug: string) => {
    const next = slugs.includes(slug) ? slugs.filter((s) => s !== slug) : [...slugs, slug];
    setSlugs(next);
    persist({ slugs: next });
  };

  const saveTab = () => {
    if (!label.trim()) { toast.error("Dê um nome à aba"); return; }
    if (isNew) {
      const newId = `t-${Date.now()}`;
      homeConfigActions.update({ homeTabs: [...cfg.homeTabs, { id: newId, label: label.trim(), slugs, slideIds }] });
      toast.success("Aba criada");
      navigate({ to: "/admin/abas/$id", params: { id: newId } });
    } else {
      persist({ label: label.trim(), slugs, slideIds });
      toast.success("Aba salva");
    }
  };

  const saveBanner = async () => {
    if (!banner) return;
    if (!banner.title || !banner.img) { toast.error("Preencha título e imagem"); return; }
    setPublishing(true);
    setPublishProgress(10);
    const bannerId = banner.id ?? `b-${Date.now()}`;
    const img = bannerFiles.image
      ? await uploadImageFile(bannerFiles.image, storagePaths.banner(bannerId, bannerFiles.image.name), { silent: true, onProgress: (p) => setPublishProgress(Math.round(10 + p * 0.55)) })
      : banner.img;
    const overlay = bannerFiles.overlay
      ? await uploadImageFile(bannerFiles.overlay, storagePaths.banner(`${bannerId}/overlay`, bannerFiles.overlay.name), { silent: true, onProgress: (p) => setPublishProgress(Math.round(65 + p * 0.2)) })
      : banner.overlay;
    if (!img) { setPublishing(false); toast.error("Não foi possível enviar a imagem do banner."); return; }
    const published = { ...banner, img, overlay: overlay ?? undefined };
    if (banner.id) {
      setPublishProgress(90);
      await slideActions.update(banner.id, published);
      toast.success("Banner atualizado");
    } else {
      const { id: _omit, ...rest } = published;
      void _omit;
      setPublishProgress(90);
      const result = slideActions.add(rest);
      await result.published;
      const newId = result.id;
      const next = [...slideIds, newId];
      setSlideIds(next);
      persist({ slideIds: next });
      toast.success("Banner criado para esta aba");
    }
    if (banner.img.startsWith("blob:")) URL.revokeObjectURL(banner.img);
    if (banner.overlay?.startsWith("blob:")) URL.revokeObjectURL(banner.overlay);
    setBannerFiles({});
    setPublishProgress(100);
    setPublishedLink(`${window.location.origin}/`);
    setPublishing(false);
    setBanner(null);
  };

  const removeBanner = (sid: string) => {
    if (!confirm("Excluir este banner?")) return;
    void slideActions.remove(sid).catch(() => {});
    const next = slideIds.filter((x) => x !== sid);
    setSlideIds(next);
    persist({ slideIds: next });
    toast.success("Banner removido");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/admin/home" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-black tracking-tight">{isNew ? "Nova aba principal" : label || "Aba"}</h1>
            <p className="text-xs text-muted-foreground">Nome, categorias e banners exclusivos desta aba.</p>
          </div>
        </div>
        <button onClick={saveTab} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/20">
          <Check className="h-4 w-4" /> {isNew ? "Criar aba" : "Salvar"}
        </button>
      </div>

      {/* 1 — nome */}
      <section className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Passo 1 · Nome da aba</p>
        <input value={label} onChange={(e) => setLabel(e.target.value)}
          onBlur={() => label.trim() && persist({ label: label.trim() })}
          placeholder="Ex.: Mulher, Homem, Kids…"
          className="mt-2 w-full max-w-md rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-bold outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10" />
      </section>

      {/* 2 — categorias */}
      <section className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Passo 2 · Categorias desta aba</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Só as categorias escolhidas aparecem. Subcategorias não são exibidas nesta aba.</p>
          </div>
          <Link to="/admin/categorias" className="rounded-full border border-border px-3 py-1.5 text-[11px] font-bold hover:bg-muted">Gerir categorias</Link>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {cats.map((c) => {
            const on = slugs.includes(c.slug);
            return (
              <button key={c.slug} type="button" onClick={() => toggleCat(c.slug)}
                className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${on ? "border-foreground bg-muted/60" : "border-border hover:border-foreground"}`}>
                <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-base">
                  {c.image ? <img src={c.image} alt="" className="h-full w-full object-cover" /> : c.emoji}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs font-bold">{c.name}</span>
                {on && <Check className="h-3.5 w-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          {slugs.length ? `${slugs.length} categoria(s) nesta aba.` : "Sem seleção = mostra produtos de todas as categorias."}
        </p>
      </section>

      {/* 3 — banners */}
      <section className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Passo 3 · Banners desta aba</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Crie aqui os banners que aparecem quando o cliente toca nesta aba.</p>
          </div>
          <button onClick={() => { setBannerFiles({}); setBanner(emptyBanner()); }}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background">
            <Plus className="h-3.5 w-3.5" /> Criar banner
          </button>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {tabBanners.map((s) => (
            <div key={s.id} className="overflow-hidden rounded-2xl border border-border">
              <div className="relative aspect-[16/9] bg-muted">
                <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white drop-shadow">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-90">{s.subtitle}</p>
                  <p className="font-display text-lg font-black leading-tight">{s.title}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-2.5">
                <p className="text-[11px] text-muted-foreground">{s.pickIds.length} destaque(s)</p>
                <div className="flex gap-1.5">
                  <button onClick={() => setBanner({ ...s })} className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => removeBanner(s.id)} className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => { setBannerFiles({}); setBanner(emptyBanner()); }}
            className="grid min-h-[160px] place-items-center rounded-2xl border-2 border-dashed border-border text-xs font-bold text-muted-foreground transition hover:border-foreground hover:text-foreground">
            <span className="flex flex-col items-center gap-2"><ImageIcon className="h-5 w-5" /> Novo banner</span>
          </button>
        </div>
      </section>

      <AdminModal
        open={!!banner}
        onClose={() => setBanner(null)}
        title={banner?.id ? "Editar banner" : "Criar banner desta aba"}
        subtitle="Imagem, textos e produtos em destaque"
        size="lg"
        footer={
          <>
            <button onClick={() => setBanner(null)} className="rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted">Cancelar</button>
            <button disabled={publishing} onClick={() => void saveBanner()} className="rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background shadow-lg shadow-foreground/20 disabled:opacity-60">{publishing ? "A publicar…" : "Publicar"}</button>
          </>
        }
      >
        {banner && (
          <div className="grid gap-4">
            {publishing && <div className="rounded-xl border border-brand/40 bg-brand/10 p-3"><div className="flex justify-between text-xs font-bold"><span>A publicar banner no Firebase…</span><span>{publishProgress}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-background"><div className="h-full rounded-full bg-brand-strong transition-all" style={{ width: `${publishProgress}%` }} /></div></div>}
            <div className="grid gap-4 md:grid-cols-2">
              <AdminField label="Título"><AdminInput value={banner.title} onChange={(e) => setBanner({ ...banner, title: e.target.value })} /></AdminField>
              <AdminField label="Subtítulo"><AdminInput value={banner.subtitle} onChange={(e) => setBanner({ ...banner, subtitle: e.target.value })} /></AdminField>
              <AdminField label="Legenda"><AdminInput value={banner.caption} onChange={(e) => setBanner({ ...banner, caption: e.target.value })} /></AdminField>
              <AdminField label="CTA"><AdminInput value={banner.cta} onChange={(e) => setBanner({ ...banner, cta: e.target.value })} /></AdminField>
            </div>
            <AdminField label="Imagem">
              <div className="flex flex-wrap items-center gap-3">
                <input id="ab-file" type="file" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) { const preview = URL.createObjectURL(f); setBannerFiles((files) => ({ ...files, image: f })); setBanner({ ...banner, img: preview }); }
                    e.target.value = "";
                  }} />
                <label htmlFor="ab-file" className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted">
                  <ImageIcon className="h-4 w-4" /> Enviar
                </label>
                <input type="url" value={banner.img.startsWith("data:") ? "" : banner.img}
                  onChange={(e) => setBanner({ ...banner, img: e.target.value })} placeholder="ou cole URL"
                  className="min-w-[220px] flex-1 rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none" />
                {banner.img && <img src={banner.img} alt="" className="h-16 w-24 rounded-lg object-cover ring-1 ring-border" />}
              </div>
            </AdminField>
            <AdminField label="Imagem sem fundo (PNG) — sobreposta no banner mobile">
              <div className="flex flex-wrap items-center gap-3">
                <input id="ab-overlay" type="file" accept="image/png,image/webp,image/*" className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) { const preview = URL.createObjectURL(f); setBannerFiles((files) => ({ ...files, overlay: f })); setBanner({ ...banner, overlay: preview }); }
                    e.target.value = "";
                  }} />
                <label htmlFor="ab-overlay" className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted">
                  <ImageIcon className="h-4 w-4" /> Enviar PNG
                </label>
                {banner.overlay && (
                  <>
                    <img src={banner.overlay} alt="" className="h-16 w-16 rounded-lg object-contain ring-1 ring-border" />
                    <button onClick={() => setBanner({ ...banner, overlay: "" })} className="text-xs font-bold text-red-600">Remover</button>
                  </>
                )}
              </div>
            </AdminField>
            <AdminField label="Produtos em destaque (até 3)">
              <ProductPicker selected={banner.pickIds} onChange={(ids) => setBanner({ ...banner, pickIds: ids })} max={3} />
            </AdminField>
          </div>
        )}
      </AdminModal>
      {publishedLink && <div className="fixed inset-x-4 bottom-5 z-[70] mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-background p-4 shadow-2xl"><p className="font-black text-emerald-700">Banner publicado</p><p className="mt-1 truncate text-xs text-muted-foreground">{publishedLink}</p><div className="mt-3 flex gap-2"><button onClick={() => navigator.clipboard?.writeText(publishedLink).then(() => toast.success("Link copiado"))} className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background">Copiar link</button><button onClick={() => setPublishedLink(null)} className="rounded-full border border-border px-4 py-2 text-xs font-bold">Fechar</button></div></div>}
    </div>
  );
}

function ProductPicker({ selected, onChange, max = 3 }: { selected: string[]; onChange: (ids: string[]) => void; max?: number }) {
  const customs = useCustomProducts();
  const all = [...customs, ...defaultProducts];
  return (
    <div className="grid max-h-56 grid-cols-2 gap-2 overflow-y-auto rounded-xl border border-border p-2 md:grid-cols-4">
      {all.map((p) => {
        const on = selected.includes(p.id);
        return (
          <button key={p.id} type="button"
            onClick={() => onChange(on ? selected.filter((x) => x !== p.id) : selected.length >= max ? selected : [...selected, p.id])}
            className={`flex items-center gap-2 rounded-lg border p-2 text-left transition ${on ? "border-gold bg-gold/10" : "border-border hover:border-foreground"}`}>
            <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
            <span className="line-clamp-2 text-[11px]">{p.name}</span>
          </button>
        );
      })}
    </div>
  );
}
