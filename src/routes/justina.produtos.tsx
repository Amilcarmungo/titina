import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  Image as ImageIcon,
  Palette,
  Info,
  Package as PackageIcon,
  Tag,
  Check,
  ChevronLeft,
  ChevronRight,
  ListChecks,
  Sparkle,
} from "lucide-react";
import { COLOR_PALETTE, colorName } from "@/lib/colors";
import { useAllProducts, productActions } from "@/lib/products-store";
import { useCategories } from "@/lib/categories-store";
import { useShops } from "@/lib/shops-store";
import { formatKz } from "@/lib/format";
import type { Product, ProductVariant, ProductAttribute } from "@/lib/products";
import {
  AdminModal,
  AdminField,
  AdminInput,
  AdminTextarea,
  AdminSelect,
} from "@/components/admin/AdminModal";
import { ImageGallery } from "@/components/admin/ImageGallery";
import { storagePaths } from "@/lib/firebase/storage";
import { uploadImageFile } from "@/lib/firebase/upload";

export const Route = createFileRoute("/justina/produtos")({
  component: ProductsPage,
});

type Draft = {
  name: string;
  price: string;
  oldPrice: string;
  category: string;
  subcategory: string;
  shopId: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  brand: string;
  sku: string;
  stock: string;
};

const empty = (cat: string, shop: string): Draft => ({
  name: "",
  price: "",
  oldPrice: "",
  category: cat,
  subcategory: "",
  shopId: shop,
  images: [],
  description: "",
  sizes: [],
  colors: [],
  variants: [],
  attributes: [],
  brand: "",
  sku: "",
  stock: "",
});

const STEPS = [
  { id: "basic", label: "Básico", icon: Info },
  { id: "attrs", label: "Atributos", icon: ListChecks },
  { id: "price", label: "Preço & stock", icon: Tag },
  { id: "media", label: "Mídia", icon: ImageIcon },
  { id: "variants", label: "Variantes", icon: Palette },
  { id: "review", label: "Rever", icon: Check },
] as const;

/** Sugestões de atributos por tipo de produto — funciona para roupa, eletrónica, casa, etc. */
const ATTR_PRESETS: { label: string; attrs: ProductAttribute[] }[] = [
  {
    label: "Roupa & calçado",
    attrs: [
      { name: "Tamanho", values: ["P", "M", "G", "GG"] },
      { name: "Material", values: [] },
    ],
  },
  {
    label: "Telemóveis & PC",
    attrs: [
      { name: "Armazenamento", values: ["64GB", "128GB", "256GB"] },
      { name: "Memória RAM", values: ["4GB", "8GB"] },
      { name: "Marca", values: [] },
    ],
  },
  {
    label: "Eletrodomésticos",
    attrs: [
      { name: "Voltagem", values: ["110V", "220V"] },
      { name: "Potência", values: [] },
    ],
  },
  {
    label: "Beleza",
    attrs: [
      { name: "Volume", values: ["30ml", "50ml", "100ml"] },
      { name: "Tipo de pele", values: [] },
    ],
  },
  {
    label: "Casa & decoração",
    attrs: [
      { name: "Dimensões", values: [] },
      { name: "Material", values: [] },
    ],
  },
];

function ProductsPage() {
  const products = useAllProducts();
  const cats = useCategories();
  const shops = useShops();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [modal, setModal] = useState<null | {
    editingId: string | null;
    draft: Draft;
  }>(null);
  const [step, setStep] = useState(0);
  const [pendingFiles, setPendingFiles] = useState<Record<string, File>>({});
  const [publishing, setPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [publishedLink, setPublishedLink] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = products;
    if (filter !== "all") list = list.filter((p) => p.category === filter);
    const term = q.trim().toLowerCase();
    if (term) list = list.filter((p) => p.name.toLowerCase().includes(term));
    return list;
  }, [products, q, filter]);

  const countByCat = useMemo(() => {
    const m: Record<string, number> = {};
    products.forEach((p) => {
      m[p.category] = (m[p.category] ?? 0) + 1;
    });
    return m;
  }, [products]);

  const openNew = () => {
    setStep(0);
    setPendingFiles({});
    setModal({
      editingId: null,
      draft: empty(cats[0]?.slug ?? "outros", shops[0]?.id ?? "main"),
    });
  };
  const openEdit = (p: Product) => {
    setStep(0);
    setPendingFiles({});
    setModal({
      editingId: p.id,
      draft: {
        name: p.name,
        price: String(p.price),
        oldPrice: p.oldPrice ? String(p.oldPrice) : "",
        category: p.category,
        subcategory: p.subcategory ?? "",
        shopId: p.shopId ?? shops[0]?.id ?? "main",
        images: p.images && p.images.length ? p.images : [p.image],
        description: p.description,
        sizes: p.sizes,
        colors: p.colors,
        variants: p.variants ?? [],
        attributes: p.attributes ?? [],
        brand: p.brand ?? "",
        sku: p.sku ?? "",
        stock: p.stock != null ? String(p.stock) : "",
      },
    });
  };

  const save = async () => {
    if (!modal) return;
    const d = modal.draft;
    const price = parseFloat(d.price);
    const oldPrice = d.oldPrice ? parseFloat(d.oldPrice) : undefined;
    if (d.name.trim().length < 3) {
      toast.error("Escreva um nome com pelo menos 3 letras");
      setStep(0);
      return;
    }
    if (!d.category) {
      toast.error("Escolha a categoria");
      setStep(0);
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Escreva um preço válido em Kz");
      setStep(2);
      return;
    }
    if (oldPrice != null && oldPrice <= price) {
      toast.error("O preço antigo tem de ser maior que o preço actual");
      setStep(2);
      return;
    }
    if (!d.images.length) {
      toast.error("Adicione pelo menos 1 imagem do produto");
      setStep(3);
      return;
    }
    setPublishing(true);
    setPublishProgress(3);
    const totalUploads = Object.keys(pendingFiles).length || 1;
    let completedUploads = 0;
    const upload = async (value: string, folder: string) => {
      const file = pendingFiles[value];
      if (!file) return value;
      const url = await uploadImageFile(
        file,
        storagePaths.product(
          `${modal.editingId ?? "new"}-${Date.now()}${folder}`,
          file.name,
        ),
        {
          silent: true,
          onProgress: (percent) =>
            setPublishProgress(
              Math.min(
                88,
                Math.round(
                  ((completedUploads + percent / 100) / totalUploads) * 88,
                ),
              ),
            ),
        },
      );
      completedUploads += 1;
      setPublishProgress(
        Math.min(88, Math.round((completedUploads / totalUploads) * 88)),
      );
      return url ?? "";
    };
    const images: string[] = [];
    for (const [index, image] of d.images.entries()) {
      const uploaded = await upload(image, `/image-${index}`);
      if (uploaded) images.push(uploaded);
    }
    if (!images.length) {
      setPublishing(false);
      toast.error("Não foi possível enviar as imagens. Tente novamente.");
      return;
    }
    const variants = d.variants.length ? ([] as ProductVariant[]) : undefined;
    if (variants)
      for (const [i, v] of d.variants.entries()) {
        const extra: string[] = [];
        for (const [j, image] of (v.images ?? []).entries()) {
          const uploaded = await upload(image, `/variant-${i}-${j}`);
          if (uploaded) extra.push(uploaded);
        }
        variants.push({
          ...v,
          image: await upload(
            v.image || d.images[i] || d.images[0] || "",
            `/variant-${i}`,
          ),
          images: extra,
        });
      }
    const payload: Omit<Product, "id"> = {
      name: d.name,
      price,
      oldPrice,
      category: d.category,
      subcategory: d.subcategory || undefined,
      shopId: d.shopId || undefined,
      image: images[0],
      images,
      variants: variants
        ? variants.map((v, i) => ({
            ...v,
            // O cliente nunca deve ver "Nova variante": usa a cor escrita ou um nome sequencial.
            label:
              v.label.trim() ||
              colorName(v.color) ||
              v.color?.trim() ||
              `Opção ${i + 1}`,
            image: v.image || images[i] || images[0] || "",
          }))
        : undefined,
      description: d.description,
      sizes: d.sizes,
      colors: d.colors,
      attributes: d.attributes.filter((a) => a.name.trim()).length
        ? d.attributes.filter((a) => a.name.trim())
        : undefined,
      brand: d.brand || undefined,
      sku: d.sku || undefined,
      stock: d.stock ? parseInt(d.stock, 10) : undefined,
      rating: 5,
      reviews: 0,
      sold: 0,
    };
    setPublishProgress(92);
    let productId: string;
    try {
      if (modal.editingId) {
        productId = modal.editingId;
        await productActions.update(productId, payload);
      } else {
        const result = productActions.add(payload);
        productId = result.id;
        await result.published;
      }
    } catch (err) {
      setPublishing(false);
      setPublishProgress(0);
      toast.error(
        (err as Error)?.message ||
          "Não foi possível guardar no banco de dados. Tente novamente.",
      );
      return;
    }
    setPublishProgress(100);
    const link = `${window.location.origin}/product/${productId}`;
    setPublishedLink(link);
    toast.success(
      modal.editingId
        ? "Produto atualizado no banco de dados"
        : "Produto publicado no banco de dados",
    );
    setPublishing(false);
    Object.keys(pendingFiles).forEach((url) => URL.revokeObjectURL(url));
    setPendingFiles({});
    setModal(null);
  };

  const updateDraft = (patch: Partial<Draft>) =>
    modal && setModal({ ...modal, draft: { ...modal.draft, ...patch } });
  const currentCat = modal
    ? cats.find((c) => c.slug === modal.draft.category)
    : undefined;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">
            Produtos
          </h1>
          <p className="text-xs text-muted-foreground">
            {products.length} produto(s) no catálogo
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/20 hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Adicionar produto
        </button>
      </div>

      <div className="rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-1 min-w-[200px] items-center gap-2 rounded-xl border border-border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Pesquisar por nome…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <Filter className="h-3.5 w-3.5 text-muted-foreground mx-1" />
            <button
              onClick={() => setFilter("all")}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${filter === "all" ? "bg-foreground text-background" : "bg-muted"}`}
            >
              Todas ({products.length})
            </button>
            {cats.map((c) => (
              <button
                key={c.slug}
                onClick={() => setFilter(c.slug)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${filter === c.slug ? "bg-foreground text-background" : "bg-muted"}`}
              >
                {c.name} ({countByCat[c.slug] ?? 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-background shadow-[var(--shadow-card)] overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs">
              <tr>
                <th className="p-3">Produto</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Preço</th>
                <th className="p-3">Variantes</th>
                <th className="p-3 w-32">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={p.image}
                          alt=""
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        {p.images && p.images.length > 1 && (
                          <span className="absolute -bottom-1 -right-1 rounded-full bg-foreground px-1.5 py-0.5 text-[9px] font-bold text-background">
                            +{p.images.length - 1}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="line-clamp-1 font-bold">{p.name}</p>
                        <p className="line-clamp-1 text-[11px] text-muted-foreground">
                          {p.description || "—"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-xs">
                    {cats.find((c) => c.slug === p.category)?.name ??
                      p.category}
                    {p.subcategory && (
                      <span className="ml-1 text-muted-foreground">
                        · {p.subcategory}
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-bold text-sale whitespace-nowrap">
                    {formatKz(p.price)}
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {p.variants?.length ?? 0}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Remover produto?"))
                            productActions
                              .remove(p.id)
                              .then(() =>
                                toast.success("Removido do banco de dados"),
                              )
                              .catch((err) =>
                                toast.error(
                                  (err as Error)?.message ??
                                    "Não foi possível remover",
                                ),
                              );
                        }}
                        className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center text-sm text-muted-foreground"
                  >
                    Nenhum produto.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-border">
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3">
              <img
                src={p.image}
                alt=""
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-bold">{p.name}</p>
                <p className="text-xs font-bold text-sale">
                  {formatKz(p.price)}
                </p>
              </div>
              <button
                onClick={() => openEdit(p)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-border"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm("Remover?"))
                    productActions
                      .remove(p.id)
                      .then(() => toast.success("Removido do banco de dados"))
                      .catch((err) =>
                        toast.error(
                          (err as Error)?.message ?? "Não foi possível remover",
                        ),
                      );
                }}
                className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="p-8 text-center text-sm text-muted-foreground">
              Nenhum produto.
            </p>
          )}
        </div>
      </div>

      {/* Sugestões de cores para os campos de texto */}
      <datalist id="bx-colors">
        {COLOR_PALETTE.map((c) => (
          <option key={c.hex} value={c.name} />
        ))}
      </datalist>

      <AdminModal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.editingId ? "Editar produto" : "Novo produto"}
        subtitle="Publique um item completo — imagens, categoria e variantes."
        size="xl"
        footer={
          <>
            <button
              onClick={() => (step === 0 ? setModal(null) : setStep(step - 1))}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted"
            >
              {step === 0 ? (
                "Cancelar"
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4" /> Anterior
                </>
              )}
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background shadow-lg shadow-foreground/20 hover:opacity-90"
              >
                Seguinte <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                disabled={publishing}
                onClick={() => void save()}
                className="inline-flex items-center gap-1.5 rounded-full px-6 py-2 text-sm font-black text-white shadow-lg disabled:opacity-60"
                style={{ background: "linear-gradient(90deg,#f59e0b,#f43f7e)" }}
              >
                <Check className="h-4 w-4" />{" "}
                {publishing
                  ? "A publicar…"
                  : modal?.editingId
                    ? "Salvar alterações"
                    : "Publicar produto"}
              </button>
            )}
          </>
        }
      >
        {modal && (
          <div className="space-y-5">
            <Stepper step={step} onStep={setStep} />
            {publishing && (
              <div className="rounded-xl border border-brand/40 bg-brand/10 p-3">
                <div className="flex justify-between text-xs font-bold">
                  <span>A publicar produto no Firebase…</span>
                  <span>{publishProgress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-background">
                  <div
                    className="h-full rounded-full bg-brand-strong transition-all"
                    style={{ width: `${publishProgress}%` }}
                  />
                </div>
              </div>
            )}

            {STEPS[step].id === "basic" && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <AdminField label="Nome do produto">
                    <AdminInput
                      value={modal.draft.name}
                      onChange={(e) => updateDraft({ name: e.target.value })}
                      placeholder="Ex.: Vestido Midi Elegante / iPhone 13 128GB"
                    />
                  </AdminField>
                </div>
                <AdminField label="Categoria">
                  <AdminSelect
                    value={modal.draft.category}
                    onChange={(e) =>
                      updateDraft({ category: e.target.value, subcategory: "" })
                    }
                  >
                    {cats.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </AdminSelect>
                </AdminField>
                <AdminField label="Subcategoria">
                  <AdminSelect
                    value={modal.draft.subcategory}
                    onChange={(e) =>
                      updateDraft({ subcategory: e.target.value })
                    }
                  >
                    <option value="">— nenhuma —</option>
                    {currentCat?.subcategories.map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </AdminSelect>
                </AdminField>
                <AdminField label="Loja">
                  <AdminSelect
                    value={modal.draft.shopId}
                    onChange={(e) => updateDraft({ shopId: e.target.value })}
                  >
                    {shops.map((sh) => (
                      <option key={sh.id} value={sh.id}>
                        {sh.name}
                      </option>
                    ))}
                  </AdminSelect>
                </AdminField>
                <AdminField label="Marca (opcional)">
                  <AdminInput
                    value={modal.draft.brand}
                    onChange={(e) => updateDraft({ brand: e.target.value })}
                    placeholder="Samsung, Zara…"
                  />
                </AdminField>
                <div className="md:col-span-2">
                  <AdminField label="Descrição">
                    <AdminTextarea
                      rows={4}
                      value={modal.draft.description}
                      onChange={(e) =>
                        updateDraft({ description: e.target.value })
                      }
                      placeholder="Detalhes, materiais, especificações…"
                    />
                  </AdminField>
                </div>
              </div>
            )}

            {STEPS[step].id === "attrs" && (
              <AttributesEditor
                attributes={modal.draft.attributes}
                onChange={(a) => updateDraft({ attributes: a })}
                sizes={modal.draft.sizes}
                onSizes={(sz) => updateDraft({ sizes: sz })}
                colors={modal.draft.colors}
                onColors={(c) => updateDraft({ colors: c })}
              />
            )}

            {STEPS[step].id === "price" && (
              <div className="grid gap-4 md:grid-cols-2">
                <AdminField
                  label="Preço (Kz)"
                  hint="Valor exacto que o cliente vê, sem conversão"
                >
                  <AdminInput
                    value={modal.draft.price}
                    onChange={(e) =>
                      updateDraft({
                        price: e.target.value
                          .replace(",", ".")
                          .replace(/[^0-9.]/g, ""),
                      })
                    }
                    placeholder="Ex.: 12500"
                  />
                </AdminField>
                <AdminField
                  label="Preço antigo (opcional)"
                  hint="Aparece riscado como oferta"
                >
                  <AdminInput
                    value={modal.draft.oldPrice}
                    onChange={(e) =>
                      updateDraft({
                        oldPrice: e.target.value
                          .replace(",", ".")
                          .replace(/[^0-9.]/g, ""),
                      })
                    }
                    placeholder="Ex.: 19900"
                  />
                </AdminField>
                <AdminField label="Stock (opcional)">
                  <AdminInput
                    value={modal.draft.stock}
                    onChange={(e) =>
                      updateDraft({
                        stock: e.target.value.replace(/[^0-9]/g, ""),
                      })
                    }
                    placeholder="25"
                  />
                </AdminField>
                <AdminField label="SKU (opcional)">
                  <AdminInput
                    value={modal.draft.sku}
                    onChange={(e) => updateDraft({ sku: e.target.value })}
                    placeholder="BX-0001"
                  />
                </AdminField>
              </div>
            )}

            {STEPS[step].id === "media" && (
              <ImageGallery
                images={modal.draft.images}
                onChange={(imgs) => updateDraft({ images: imgs })}
                onFilesAdded={(files) =>
                  setPendingFiles((current) => ({ ...current, ...files }))
                }
                max={5}
              />
            )}

            {STEPS[step].id === "variants" && (
              <VariantsEditor
                variants={modal.draft.variants}
                onChange={(v) => updateDraft({ variants: v })}
                basePrice={parseFloat(modal.draft.price) || 0}
                images={modal.draft.images}
                onFilesAdded={(files) =>
                  setPendingFiles((current) => ({ ...current, ...files }))
                }
              />
            )}

            {STEPS[step].id === "review" && (
              <div className="grid gap-4 md:grid-cols-[200px_1fr]">
                <div className="grid gap-2">
                  {modal.draft.images[0] ? (
                    <img
                      src={modal.draft.images[0]}
                      alt=""
                      className="aspect-square w-full rounded-2xl object-cover ring-1 ring-border"
                    />
                  ) : (
                    <div className="grid aspect-square w-full place-items-center rounded-2xl border border-dashed border-border text-xs text-muted-foreground">
                      Sem imagem
                    </div>
                  )}
                  <div className="flex gap-1.5">
                    {modal.draft.images.slice(1).map((im, i) => (
                      <img
                        key={i}
                        src={im}
                        alt=""
                        className="h-11 w-11 rounded-lg object-cover ring-1 ring-border"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-display text-xl font-black">
                    {modal.draft.name || "Sem nome"}
                  </p>
                  <p className="text-lg font-black text-sale">
                    {formatKz(parseFloat(modal.draft.price) || 0)}
                  </p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>
                      Categoria:{" "}
                      <b className="text-foreground">
                        {currentCat?.name ?? modal.draft.category}
                      </b>
                      {modal.draft.subcategory
                        ? ` · ${modal.draft.subcategory}`
                        : ""}
                    </li>
                    <li>
                      Loja:{" "}
                      <b className="text-foreground">
                        {shops.find((sh) => sh.id === modal.draft.shopId)
                          ?.name ?? "—"}
                      </b>
                    </li>
                    <li>
                      Imagens:{" "}
                      <b className="text-foreground">
                        {modal.draft.images.length}
                      </b>{" "}
                      · Variantes:{" "}
                      <b className="text-foreground">
                        {modal.draft.variants.length}
                      </b>
                    </li>
                    {modal.draft.sizes.length > 0 && (
                      <li>
                        Tamanhos:{" "}
                        <b className="text-foreground">
                          {modal.draft.sizes.join(", ")}
                        </b>
                      </li>
                    )}
                    {modal.draft.colors.length > 0 && (
                      <li>
                        Cores:{" "}
                        <b className="text-foreground">
                          {modal.draft.colors.map(colorName).join(", ")}
                        </b>
                      </li>
                    )}
                    {modal.draft.attributes.map((a) => (
                      <li key={a.name}>
                        {a.name}:{" "}
                        <b className="text-foreground">
                          {a.values.join(", ") || "—"}
                        </b>
                      </li>
                    ))}
                  </ul>
                  {(!modal.draft.name ||
                    !modal.draft.price ||
                    modal.draft.images.length === 0) && (
                    <p className="rounded-xl bg-destructive/10 p-3 text-xs font-bold text-destructive">
                      Faltam dados obrigatórios: nome, preço e pelo menos 1
                      imagem.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </AdminModal>
      {publishedLink && (
        <div className="fixed inset-x-4 bottom-5 z-[70] mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-background p-4 shadow-2xl">
          <p className="font-black text-emerald-700">Produto publicado</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {publishedLink}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() =>
                navigator.clipboard
                  ?.writeText(publishedLink)
                  .then(() => toast.success("Link copiado"))
              }
              className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background"
            >
              Copiar link
            </button>
            <button
              onClick={() => setPublishedLink(null)}
              className="rounded-full border border-border px-4 py-2 text-xs font-bold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function VariantsEditor({
  variants,
  onChange,
  basePrice,
  images,
  onFilesAdded,
}: {
  variants: ProductVariant[];
  onChange: (v: ProductVariant[]) => void;
  basePrice: number;
  images: string[];
  onFilesAdded: (files: Record<string, File>) => void;
}) {
  const add = () =>
    onChange([
      ...variants,
      {
        id: `v-${Date.now()}`,
        label: "",
        color: "",
        price: basePrice,
        image: images[variants.length] ?? images[0] ?? "",
      },
    ]);
  const upd = (i: number, patch: Partial<ProductVariant>) =>
    onChange(variants.map((v, x) => (x === i ? { ...v, ...patch } : v)));
  const rm = (i: number) => onChange(variants.filter((_, x) => x !== i));

  const readFile = (f: File, cb: (u: string) => void) => {
    const preview = URL.createObjectURL(f);
    onFilesAdded({ [preview]: f });
    cb(preview);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <PackageIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
          <div className="flex-1 text-xs text-muted-foreground">
            <p className="font-bold text-foreground">Variantes de produto</p>
            <p>
              Cada variante é uma versão da mesma família: carregue a foto de
              capa, escreva a cor/detalhe, defina o preço e junte até 3 fotos
              extra dessa cor. Se deixar o nome vazio, usamos a cor escrita.
            </p>
          </div>
          <button
            onClick={add}
            className="rounded-full bg-foreground px-4 py-1.5 text-xs font-bold text-background whitespace-nowrap inline-flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" /> Adicionar variante
          </button>
        </div>
      </div>

      {variants.length === 0 && (
        <p className="py-6 text-center text-sm text-muted-foreground">
          Nenhuma variante ainda.
        </p>
      )}

      <div className="space-y-3">
        {variants.map((v, i) => (
          <div
            key={v.id}
            className="rounded-2xl border border-border bg-background p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-black">
                Variante {i + 1}
              </span>
              <span className="truncate text-xs font-bold text-muted-foreground">
                {v.label.trim() ||
                  colorName(v.color) ||
                  v.color?.trim() ||
                  "sem nome — usaremos a cor"}
              </span>
            </div>
            <div className="flex flex-wrap items-start gap-3">
              <div className="relative">
                <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-xl border border-border bg-muted">
                  {v.image || images[0] ? (
                    <img
                      src={v.image || images[0]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <label className="absolute -bottom-1 -right-1 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-foreground text-background">
                  <Plus className="h-3 w-3" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) readFile(f, (u) => upd(i, { image: u }));
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
              <div className="grid flex-1 gap-2 min-w-[200px] md:grid-cols-2">
                <AdminField
                  label="Nome da variante (opcional)"
                  hint="Vazio = usa a cor escrita"
                >
                  <AdminInput
                    value={v.label}
                    onChange={(e) => upd(i, { label: e.target.value })}
                    placeholder="Ex.: Preto fosco"
                  />
                </AdminField>
                <AdminField
                  label="Cor"
                  hint="Escreva a cor como quer que o cliente veja"
                >
                  <AdminInput
                    list="bx-colors"
                    value={v.color ?? ""}
                    onChange={(e) => upd(i, { color: e.target.value })}
                    placeholder="Ex.: Vermelho, Azul-marinho…"
                  />
                </AdminField>
                <AdminField label="Preço">
                  <AdminInput
                    value={String(v.price)}
                    onChange={(e) =>
                      upd(i, { price: parseFloat(e.target.value) || 0 })
                    }
                  />
                </AdminField>
                <AdminField label="Preço antigo">
                  <AdminInput
                    value={v.oldPrice ? String(v.oldPrice) : ""}
                    onChange={(e) =>
                      upd(i, {
                        oldPrice: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                  />
                </AdminField>
                {images.length > 0 && (
                  <div className="md:col-span-2">
                    <AdminField label="Usar uma imagem já carregada">
                      <div className="flex flex-wrap gap-1.5">
                        {images.map((im, x) => (
                          <button
                            key={x}
                            onClick={() => upd(i, { image: im })}
                            className={`h-12 w-12 overflow-hidden rounded-lg ring-2 ${v.image === im ? "ring-foreground" : "ring-border"}`}
                          >
                            <img
                              src={im}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </AdminField>
                  </div>
                )}
                <div className="md:col-span-2">
                  <AdminField
                    label="Mais fotos desta cor/detalhe"
                    hint="Até 3 fotos extra — o cliente vê-as ao tocar nesta cor"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {(v.images ?? []).map((im, x) => (
                        <div key={x} className="relative">
                          <img
                            src={im}
                            alt=""
                            className="h-14 w-14 rounded-lg object-cover ring-1 ring-border"
                          />
                          <button
                            onClick={() =>
                              upd(i, {
                                images: (v.images ?? []).filter(
                                  (_, y) => y !== x,
                                ),
                              })
                            }
                            className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-background text-destructive shadow ring-1 ring-border"
                            aria-label="Remover foto"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {(v.images?.length ?? 0) < 3 && (
                        <label className="grid h-14 w-14 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-foreground">
                          <Plus className="h-4 w-4" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f)
                                readFile(f, (u) =>
                                  upd(i, { images: [...(v.images ?? []), u] }),
                                );
                              e.target.value = "";
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </AdminField>
                </div>
                <div className="md:col-span-2">
                  <AdminField
                    label="Tamanhos desta variante (opcional)"
                    hint="Deixe vazio para usar os tamanhos gerais do produto"
                  >
                    <TokenInput
                      values={v.sizes ?? []}
                      onChange={(sz) => upd(i, { sizes: sz })}
                      placeholder="Adicionar tamanho…"
                    />
                  </AdminField>
                </div>
                <div className="md:col-span-2">
                  <AdminField label="SKU (opcional)">
                    <AdminInput
                      value={v.sku ?? ""}
                      onChange={(e) => upd(i, { sku: e.target.value })}
                      placeholder="BX-VST-001"
                    />
                  </AdminField>
                </div>
              </div>
              <button
                onClick={() => rm(i)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stepper({
  step,
  onStep,
}: {
  step: number;
  onStep: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
      {STEPS.map((st, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <button
            key={st.id}
            onClick={() => onStep(i)}
            className="flex shrink-0 items-center gap-1"
          >
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                active
                  ? "bg-foreground text-background"
                  : done
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <st.icon className="h-3.5 w-3.5" />
              {st.label}
            </span>
            {i < STEPS.length - 1 && (
              <span
                className={`h-px w-4 ${done ? "bg-foreground" : "bg-border"}`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function TokenInput({
  values,
  onChange,
  placeholder,
  list,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  list?: string;
}) {
  const [text, setText] = useState("");
  const add = () => {
    const v = text.trim();
    if (!v) return;
    if (!values.includes(v)) onChange([...values, v]);
    setText("");
  };
  return (
    <div>
      <div className="flex gap-2">
        <AdminInput
          list={list}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
        />
        <button
          onClick={add}
          className="shrink-0 rounded-xl border border-border px-3 text-xs font-bold hover:bg-muted"
        >
          Adicionar
        </button>
      </div>
      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold"
            >
              {v}
              <button
                onClick={() => onChange(values.filter((x) => x !== v))}
                aria-label={`Remover ${v}`}
              >
                <Trash2 className="h-3 w-3 text-destructive" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function AttributesEditor({
  attributes,
  onChange,
  sizes,
  onSizes,
  colors,
  onColors,
}: {
  attributes: ProductAttribute[];
  onChange: (a: ProductAttribute[]) => void;
  sizes: string[];
  onSizes: (v: string[]) => void;
  colors: string[];
  onColors: (v: string[]) => void;
}) {
  const upd = (i: number, patch: Partial<ProductAttribute>) =>
    onChange(attributes.map((a, x) => (x === i ? { ...a, ...patch } : a)));
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4">
        <p className="flex items-center gap-1.5 text-xs font-black">
          <Sparkle className="h-3.5 w-3.5" /> Modelos rápidos
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Escolha um modelo conforme o tipo de produto — pode editar tudo
          depois.
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ATTR_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() =>
                onChange([
                  ...attributes,
                  ...p.attrs.map((a) => ({ ...a, values: [...a.values] })),
                ])
              }
              className="rounded-full bg-background px-3 py-1.5 text-[11px] font-bold ring-1 ring-border hover:bg-muted"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <AdminField
        label="Cores disponíveis"
        hint="Escreva a cor e pressione Enter — o cliente vê exactamente este nome"
      >
        <TokenInput
          values={colors}
          onChange={onColors}
          placeholder="Escrever cor (ex.: Preto fosco)…"
          list="bx-colors"
        />
      </AdminField>

      <AdminField
        label="Tamanhos"
        hint="Ex.: P, M, G ou 38, 40 — pressione Enter"
      >
        <TokenInput
          values={sizes}
          onChange={onSizes}
          placeholder="Adicionar tamanho…"
        />
      </AdminField>

      <div className="space-y-3">
        {attributes.map((a, i) => (
          <div key={i} className="rounded-2xl border border-border p-3">
            <div className="flex items-center gap-2">
              <AdminInput
                value={a.name}
                onChange={(e) => upd(i, { name: e.target.value })}
                placeholder="Nome do atributo (Armazenamento, Voltagem…)"
              />
              <button
                onClick={() => onChange(attributes.filter((_, x) => x !== i))}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2">
              <TokenInput
                values={a.values}
                onChange={(v) => upd(i, { values: v })}
                placeholder="Adicionar valor (128GB, 220V…)"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => onChange([...attributes, { name: "", values: [] }])}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted"
      >
        <Plus className="h-3.5 w-3.5" /> Novo atributo
      </button>
    </div>
  );
}
