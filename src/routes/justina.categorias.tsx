import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Pencil,
  Eye,
  X,
  ArrowRightLeft,
  LayoutList,
  Layers,
  Info,
} from "lucide-react";
import { useCategories, categoryActions } from "@/lib/categories-store";
import { useAllProducts, productActions } from "@/lib/products-store";
import { formatKz } from "@/lib/format";
import {
  AdminModal,
  AdminField,
  AdminInput,
} from "@/components/admin/AdminModal";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { storagePaths } from "@/lib/firebase/storage";
import { uploadImageFile } from "@/lib/firebase/upload";

export const Route = createFileRoute("/justina/categorias")({
  component: CategoriesPage,
});

type EditDraft = {
  slug: string | null;
  name: string;
  image: string;
  title: string;
  subtitle: string;
};

function CategoriesPage() {
  const cats = useCategories();
  const products = useAllProducts();
  const [edit, setEdit] = useState<null | EditDraft>(null);
  const [drawer, setDrawer] = useState<string | null>(null);

  const openNew = () =>
    setEdit({
      slug: null,
      name: "",
      image: "",
      title: "",
      subtitle: "Coleção exclusiva",
    });

  const save = () => {
    if (!edit) return;
    if (!edit.name.trim()) {
      toast.error("Nome obrigatório");
      return;
    }
    if (edit.slug) {
      categoryActions.update(edit.slug, {
        name: edit.name,
        image: edit.image || undefined,
        title: edit.title,
        subtitle: edit.subtitle,
      });
      toast.success("Categoria atualizada");
    } else {
      const slug = edit.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      categoryActions.add({
        slug,
        name: edit.name,
        image: edit.image || undefined,
        title: edit.title,
        subtitle: edit.subtitle,
        subcategories: [],
      });
      toast.success("Categoria criada");
    }
    setEdit(null);
  };

  const readFile = (f: File) => {
    void uploadImageFile(
      f,
      storagePaths.category(edit?.slug ?? "novas", f.name),
    ).then((url) => {
      if (url) setEdit((m) => (m ? { ...m, image: url } : m));
    });
  };

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    products.forEach((p) => {
      m[p.category] = (m[p.category] ?? 0) + 1;
    });
    return m;
  }, [products]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">
            Categorias
          </h1>
          <p className="text-xs text-muted-foreground">
            {cats.length} categoria(s). Clique numa categoria para gerir
            produtos e subcategorias.
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/20"
        >
          <Plus className="h-4 w-4" /> Nova categoria
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <button
            key={c.slug}
            onClick={() => setDrawer(c.slug)}
            className="group rounded-2xl bg-background text-left shadow-[var(--shadow-card)] overflow-hidden transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="relative aspect-[16/9] bg-muted">
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl">
                  {c.emoji ?? "🏷️"}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute bottom-3 left-4 font-display text-xl font-black text-white drop-shadow-lg">
                {c.title ?? c.name}
              </span>
              <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-black">
                {counts[c.slug] ?? 0} produtos
              </span>
            </div>
            <div className="flex items-center justify-between p-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Slug: {c.slug}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {c.subcategories.length} subcategoria(s)
                </p>
              </div>
              <span className="rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background inline-flex items-center gap-1">
                <Eye className="h-3 w-3" /> Abrir
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Category drawer */}
      {drawer && (
        <CategoryDrawer
          slug={drawer}
          onClose={() => setDrawer(null)}
          onEdit={() => {
            const c = cats.find((x) => x.slug === drawer);
            if (c)
              setEdit({
                slug: c.slug,
                name: c.name,
                image: c.image ?? "",
                title: c.title ?? c.name,
                subtitle: c.subtitle ?? "",
              });
          }}
        />
      )}

      <AdminModal
        open={!!edit}
        onClose={() => setEdit(null)}
        title={edit?.slug ? "Editar categoria" : "Nova categoria"}
        subtitle="Nome, imagem de capa e texto do banner"
        size="md"
        footer={
          <>
            <button
              onClick={() => setEdit(null)}
              className="rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted"
            >
              Cancelar
            </button>
            <button
              onClick={save}
              className="rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background shadow-lg shadow-foreground/20"
            >
              Salvar
            </button>
          </>
        }
      >
        {edit && (
          <div className="grid gap-4">
            <AdminField label="Nome">
              <AdminInput
                value={edit.name}
                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              />
            </AdminField>
            <AdminField label="Título no banner">
              <AdminInput
                value={edit.title}
                onChange={(e) => setEdit({ ...edit, title: e.target.value })}
              />
            </AdminField>
            <AdminField label="Subtítulo">
              <AdminInput
                value={edit.subtitle}
                onChange={(e) => setEdit({ ...edit, subtitle: e.target.value })}
              />
            </AdminField>
            <AdminField label="Imagem de capa">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  id="cat-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) readFile(f);
                  }}
                />
                <label
                  htmlFor="cat-file"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted"
                >
                  <ImageIcon className="h-4 w-4" /> Enviar
                </label>
                <input
                  type="url"
                  value={edit.image.startsWith("data:") ? "" : edit.image}
                  onChange={(e) => setEdit({ ...edit, image: e.target.value })}
                  placeholder="ou cole URL"
                  className="min-w-[200px] flex-1 rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
                />
                {edit.image && (
                  <img
                    src={edit.image}
                    alt=""
                    className="h-16 w-24 rounded-lg object-cover ring-1 ring-border"
                  />
                )}
              </div>
            </AdminField>
          </div>
        )}
      </AdminModal>
    </div>
  );
}

function CategoryDrawer({
  slug,
  onClose,
  onEdit,
}: {
  slug: string;
  onClose: () => void;
  onEdit: () => void;
}) {
  const cats = useCategories();
  const products = useAllProducts();
  const cat = cats.find((c) => c.slug === slug);
  const [tab, setTab] = useState("products");
  const [subInput, setSubInput] = useState("");

  const inCat = useMemo(
    () => products.filter((p) => p.category === slug),
    [products, slug],
  );

  if (!cat) return null;

  return (
    <AdminModal
      open
      onClose={onClose}
      title={cat.title ?? cat.name}
      subtitle={`${inCat.length} produto(s) · ${cat.subcategories.length} subcategoria(s)`}
      size="xl"
      footer={
        <>
          <button
            onClick={() => {
              if (confirm("Excluir categoria?")) {
                categoryActions.remove(slug);
                toast.success("Removida");
                onClose();
              }
            }}
            className="mr-auto rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 inline-flex items-center gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" /> Excluir categoria
          </button>
          <button
            onClick={onEdit}
            className="rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted inline-flex items-center gap-1.5"
          >
            <Pencil className="h-3.5 w-3.5" /> Editar detalhes
          </button>
          <button
            onClick={onClose}
            className="rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background"
          >
            Fechar
          </button>
        </>
      }
    >
      <div className="mb-4 flex items-center gap-4 rounded-2xl bg-gradient-to-br from-muted/60 to-muted/20 p-4">
        {cat.image ? (
          <img
            src={cat.image}
            alt=""
            className="h-16 w-24 rounded-xl object-cover ring-1 ring-border"
          />
        ) : (
          <div className="grid h-16 w-24 place-items-center rounded-xl bg-muted text-2xl">
            🏷️
          </div>
        )}
        <div className="min-w-0">
          <p className="font-display text-xl font-black">{cat.name}</p>
          <p className="text-xs text-muted-foreground">{cat.subtitle}</p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
            slug: {cat.slug}
          </p>
        </div>
      </div>

      <AdminTabs
        active={tab}
        onChange={setTab}
        tabs={[
          {
            id: "products",
            label: "Produtos",
            icon: <LayoutList className="h-3.5 w-3.5" />,
            badge: inCat.length,
          },
          {
            id: "subs",
            label: "Subcategorias",
            icon: <Layers className="h-3.5 w-3.5" />,
            badge: cat.subcategories.length,
          },
          { id: "info", label: "Info", icon: <Info className="h-3.5 w-3.5" /> },
        ]}
      />

      <div className="mt-4">
        {tab === "products" && (
          <div className="space-y-2">
            {inCat.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Nenhum produto nesta categoria.
              </p>
            )}
            {inCat.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-3"
              >
                <img
                  src={p.image}
                  alt=""
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-bold">{p.name}</p>
                  <p className="text-xs font-bold text-sale">
                    {formatKz(p.price)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <ArrowRightLeft className="h-3.5 w-3.5 text-muted-foreground" />
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      const target = e.target.value;
                      if (!target) return;
                      void productActions.moveCategory(p.id, target);
                      toast.success(
                        `Movido para "${cats.find((c) => c.slug === target)?.name}"`,
                      );
                      e.target.value = "";
                    }}
                    className="rounded-lg border border-border bg-background px-2 py-1.5 text-xs font-bold"
                  >
                    <option value="">Mover para…</option>
                    {cats
                      .filter((c) => c.slug !== slug)
                      .map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "subs" && (
          <div>
            <div className="mb-3 flex gap-2">
              <input
                value={subInput}
                onChange={(e) => setSubInput(e.target.value)}
                placeholder="Nova subcategoria"
                className="flex-1 rounded-xl border border-border bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-foreground"
              />
              <button
                onClick={() => {
                  if (subInput.trim()) {
                    categoryActions.addSub(slug, subInput.trim());
                    setSubInput("");
                  }
                }}
                className="rounded-full bg-foreground px-5 py-2 text-sm font-bold text-background inline-flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar
              </button>
            </div>
            {cat.subcategories.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhuma subcategoria.
              </p>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              {cat.subcategories.map((s) => {
                const img = cat.subImages?.[s];
                const onFile = (f: File) => {
                  void uploadImageFile(
                    f,
                    storagePaths.category(`${slug}/${s}`, f.name),
                  ).then((url) => {
                    if (url) categoryActions.setSubImage(slug, s, url);
                  });
                };
                return (
                  <div
                    key={s}
                    className="flex items-center gap-3 rounded-xl border border-border p-2"
                  >
                    <label className="relative grid h-14 w-14 cursor-pointer place-items-center overflow-hidden rounded-full bg-muted ring-1 ring-border">
                      {img ? (
                        <img
                          src={img}
                          alt={s}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) onFile(f);
                        }}
                      />
                    </label>
                    <span className="flex-1 truncate text-sm font-bold">
                      {s}
                    </span>
                    <button
                      onClick={() => categoryActions.removeSub(slug, s)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "info" && (
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Nome:</span>{" "}
              <span className="font-bold">{cat.name}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Título:</span>{" "}
              {cat.title ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Subtítulo:</span>{" "}
              {cat.subtitle ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Slug:</span>{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                {cat.slug}
              </code>
            </p>
            <p>
              <span className="text-muted-foreground">Produtos:</span>{" "}
              {inCat.length}
            </p>
          </div>
        )}
      </div>
    </AdminModal>
  );
}
