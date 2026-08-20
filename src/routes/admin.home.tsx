import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  GripVertical,
  LayoutGrid,
  Sparkles,
  Rows3,
  Images,
  Flame,
  ExternalLink,
  Eye,
  Pencil,
} from "lucide-react";
import {
  useHomeConfig,
  homeConfigActions,
  type QuickStripItem,
  type HeroTile,
} from "@/lib/home-config";
import { products as defaultProducts } from "@/lib/products";
import { useCustomProducts } from "@/lib/products-store";
import { useCategories } from "@/lib/categories-store";
import { useSlidesRaw } from "@/lib/banner";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { storagePaths } from "@/lib/firebase/storage";
import { uploadImageFile } from "@/lib/firebase/upload";

export const Route = createFileRoute("/admin/home")({
  component: HomePage,
});

function Card({
  title,
  desc,
  action,
  children,
}: {
  title: string;
  desc?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-background p-5 shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-black">{title}</h2>
          {desc && <p className="text-[11px] text-muted-foreground">{desc}</p>}
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function HomePage() {
  const cfg = useHomeConfig();
  const customs = useCustomProducts();
  const cats = useCategories();
  const slides = useSlidesRaw();
  const all = [...customs, ...defaultProducts];
  const [tab, setTab] = useState("abas");

  const update = (patch: Parameters<typeof homeConfigActions.update>[0]) => {
    homeConfigActions.update(patch);
  };

  const toggle = (
    id: string,
    field: "superPicks" | "viralPicks",
    max: number,
  ) => {
    const current = cfg[field];
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : current.length >= max
        ? current
        : [...current, id];
    update({ [field]: next } as {
      superPicks?: string[];
      viralPicks?: string[];
    });
    toast.success("Salvo");
  };

  const sections: { key: keyof typeof cfg; label: string; desc: string }[] = [
    {
      key: "showQuickStrip",
      label: "Strip de categorias rápidas",
      desc: "Kz 600 + Diário, Férias, Trabalho…",
    },
    {
      key: "showCategories",
      label: "Grade de categorias",
      desc: "Círculos coloridos com imagens",
    },
    {
      key: "showSuperOfertas",
      label: "Super Ofertas",
      desc: "Bloco laranja/rosa",
    },
    { key: "showViral", label: "Viral do Bazarixy", desc: "Bloco lilás" },
  ];

  // Quick strip editing
  const updateStripItem = (id: string, patch: Partial<QuickStripItem>) =>
    update({
      quickStripItems: cfg.quickStripItems.map((it) =>
        it.id === id ? { ...it, ...patch } : it,
      ),
    });
  const removeStripItem = (id: string) =>
    update({
      quickStripItems: cfg.quickStripItems.filter((it) => it.id !== id),
    });
  const addStripItem = () =>
    update({
      quickStripItems: [
        ...cfg.quickStripItems,
        { id: `q-${Date.now()}`, label: "Novo" },
      ],
    });
  const readFile = (f: File, cb: (u: string) => void) => {
    void uploadImageFile(f, storagePaths.banner("home", f.name)).then((url) => {
      if (url) cb(url);
    });
  };

  // Categories grid order
  const orderedCats = cfg.categoriesOrder.length
    ? [
        ...(cfg.categoriesOrder
          .map((s) => cats.find((c) => c.slug === s))
          .filter(Boolean) as typeof cats),
        ...cats.filter((c) => !cfg.categoriesOrder.includes(c.slug)),
      ]
    : cats;
  const moveCat = (slug: string, dir: -1 | 1) => {
    const order = orderedCats.map((c) => c.slug);
    const i = order.indexOf(slug);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= order.length) return;
    [order[i], order[j]] = [order[j], order[i]];
    update({ categoriesOrder: order });
  };

  const tabs = [
    {
      id: "abas",
      label: "Categorias principais",
      icon: <LayoutGrid className="h-4 w-4" />,
      badge: cfg.homeTabs.length,
    },
    {
      id: "strip",
      label: "Strip rápido",
      icon: <Rows3 className="h-4 w-4" />,
      badge: cfg.quickStripItems.length,
    },
    {
      id: "grade",
      label: "Grade de categorias",
      icon: <Sparkles className="h-4 w-4" />,
      badge: orderedCats.length,
    },
    {
      id: "hero",
      label: "Banners laterais",
      icon: <Images className="h-4 w-4" />,
      badge: cfg.heroLeftTiles.length + cfg.heroRightTiles.length,
    },
    {
      id: "destaques",
      label: "Destaques",
      icon: <Flame className="h-4 w-4" />,
      badge: cfg.superPicks.length + cfg.viralPicks.length,
    },
    {
      id: "visibilidade",
      label: "Visibilidade",
      icon: <Eye className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-black">Página inicial</h1>
          <p className="text-xs text-muted-foreground">
            Cada bloco da home tem a sua aba — edite sem misturar conteúdos.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/admin/categorias"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted"
          >
            <ExternalLink className="h-3 w-3" /> Categorias
          </Link>
        </div>
      </div>

      <AdminTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "visibilidade" && (
        <Card
          title="Blocos visíveis"
          desc="Ligue ou desligue cada secção da home."
        >
          <div className="space-y-2">
            {sections.map((s) => (
              <label
                key={s.key}
                className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={cfg[s.key] as boolean}
                  onChange={(e) =>
                    update({ [s.key]: e.target.checked } as Partial<typeof cfg>)
                  }
                  className="h-4 w-4 accent-foreground"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold">{s.label}</p>
                  <p className="text-[11px] text-muted-foreground">{s.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>
      )}

      {tab === "abas" && (
        <Card
          title="Categorias principais (abas da home)"
          desc="Cada aba tem as suas categorias e os seus próprios banners. Ao tocar na aba, a home troca banners e produtos."
          action={
            <Link
              to="/admin/abas/$id"
              params={{ id: "novo" }}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background shadow-lg shadow-foreground/20"
            >
              <Plus className="h-3.5 w-3.5" /> Adicionar aba
            </Link>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {cfg.homeTabs.map((t, idx) => {
              const moveTab = (dir: -1 | 1) => {
                const arr = [...cfg.homeTabs];
                const j = idx + dir;
                if (j < 0 || j >= arr.length) return;
                [arr[idx], arr[j]] = [arr[j], arr[idx]];
                update({ homeTabs: arr });
              };
              const tabSlides = (t.slideIds ?? [])
                .map((id) => slides.find((s) => s.id === id))
                .filter(Boolean) as typeof slides;
              const catNames = t.slugs.map(
                (s) => cats.find((c) => c.slug === s)?.name ?? s,
              );
              return (
                <div
                  key={t.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-background transition hover:shadow-[var(--shadow-card)]"
                >
                  <div className="relative aspect-[16/7] bg-muted">
                    {tabSlides.length ? (
                      <div className="flex h-full">
                        {tabSlides.slice(0, 3).map((s) => (
                          <img
                            key={s.id}
                            src={s.img}
                            alt=""
                            className="h-full flex-1 object-cover"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="grid h-full place-items-center text-[11px] font-semibold text-muted-foreground">
                        Sem banner próprio
                      </div>
                    )}
                    <span className="absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-lg bg-background/90 text-[11px] font-black">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">{t.label}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {catNames.length
                            ? `${catNames.length} categoria(s)`
                            : "Todas as categorias"}{" "}
                          · {tabSlides.length} banner(s)
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button
                          onClick={() => moveTab(-1)}
                          className="grid h-7 w-7 place-items-center rounded-lg border border-border text-xs hover:bg-muted"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveTab(1)}
                          className="grid h-7 w-7 place-items-center rounded-lg border border-border text-xs hover:bg-muted"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                    {catNames.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {catNames.slice(0, 5).map((n) => (
                          <span
                            key={n}
                            className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold"
                          >
                            {n}
                          </span>
                        ))}
                        {catNames.length > 5 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{catNames.length - 5}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="mt-3 flex gap-2">
                      <Link
                        to="/admin/abas/$id"
                        params={{ id: t.id }}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background"
                      >
                        <Pencil className="h-3 w-3" /> Gerir aba
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm("Excluir esta aba?")) {
                            update({
                              homeTabs: cfg.homeTabs.filter(
                                (x) => x.id !== t.id,
                              ),
                            });
                            toast.success("Aba removida");
                          }
                        }}
                        className="grid h-8 w-8 place-items-center rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <Link
              to="/admin/abas/$id"
              params={{ id: "novo" }}
              className="grid min-h-[180px] place-items-center rounded-2xl border-2 border-dashed border-border text-xs font-bold text-muted-foreground transition hover:border-foreground hover:text-foreground"
            >
              <span className="flex flex-col items-center gap-2">
                <Plus className="h-5 w-5" /> Nova aba
              </span>
            </Link>
          </div>
        </Card>
      )}

      {tab === "strip" && (
        <Card
          title="Strip de categorias rápidas"
          desc="Bloco horizontal no topo, começando pelo cartão de destaque."
          action={
            <button
              onClick={addStripItem}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background"
            >
              <Plus className="h-3 w-3" /> Adicionar
            </button>
          }
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="rounded-xl border border-border p-3">
              <span className="text-[11px] font-bold uppercase text-muted-foreground">
                Destaque · legenda
              </span>
              <input
                value={cfg.quickStripSaverLabel}
                onChange={(e) =>
                  update({ quickStripSaverLabel: e.target.value })
                }
                className="mt-1 w-full bg-transparent text-sm outline-none"
              />
            </label>
            <label className="rounded-xl border border-border p-3">
              <span className="text-[11px] font-bold uppercase text-muted-foreground">
                Destaque · preço
              </span>
              <input
                value={cfg.quickStripSaverPrice}
                onChange={(e) =>
                  update({ quickStripSaverPrice: e.target.value })
                }
                className="mt-1 w-full bg-transparent text-sm outline-none"
              />
            </label>
          </div>

          <div className="mt-3 space-y-2">
            {cfg.quickStripItems.map((it) => (
              <div
                key={it.id}
                className="flex items-center gap-3 rounded-xl border border-border p-2"
              >
                <label className="relative grid h-12 w-12 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-lg bg-muted">
                  {it.image ? (
                    <img
                      src={it.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f)
                        readFile(f, (u) =>
                          updateStripItem(it.id, { image: u }),
                        );
                    }}
                  />
                </label>
                <input
                  value={it.label}
                  onChange={(e) =>
                    updateStripItem(it.id, { label: e.target.value })
                  }
                  className="flex-1 min-w-0 rounded-lg border border-border bg-transparent px-2.5 py-1.5 text-sm outline-none"
                />
                <button
                  onClick={() => removeStripItem(it.id)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "grade" && (
        <Card
          title="Grade de categorias"
          desc="Reordene as categorias exibidas na home. Edite nomes/imagens em Categorias."
        >
          <label className="block">
            <span className="text-xs font-semibold">
              Título (opcional, mostrado na home)
            </span>
            <input
              value={cfg.categoriesTitle}
              onChange={(e) => update({ categoriesTitle: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
            />
          </label>
          <div className="mt-3 space-y-1.5">
            {orderedCats.map((c) => (
              <div
                key={c.slug}
                className="flex items-center gap-3 rounded-xl border border-border p-2"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-muted">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{c.emoji}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{c.name}</p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {c.subcategories.length} subcategorias
                  </p>
                </div>
                <button
                  onClick={() => moveCat(c.slug, -1)}
                  className="rounded border border-border px-2 py-1 text-xs"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveCat(c.slug, 1)}
                  className="rounded border border-border px-2 py-1 text-xs"
                >
                  ↓
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "hero" && (
        <Card
          title="Banners laterais (desktop)"
          desc="Os blocos à esquerda e à direita do banner principal."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <TileEditor
              title="Coluna esquerda"
              tiles={cfg.heroLeftTiles}
              cats={cats}
              onChange={(tiles) => update({ heroLeftTiles: tiles })}
              readFile={readFile}
            />
            <TileEditor
              title="Coluna direita"
              tiles={cfg.heroRightTiles}
              cats={cats}
              onChange={(tiles) => update({ heroRightTiles: tiles })}
              readFile={readFile}
              withBadge
            />
          </div>
        </Card>
      )}

      {tab === "destaques" && (
        <div className="space-y-4">
          <Card
            title="Super Ofertas"
            desc="Produtos em destaque (até 8, deixe vazio para automático)."
          >
            <label className="block">
              <span className="text-xs font-semibold">Título</span>
              <input
                value={cfg.superTitle}
                onChange={(e) => update({ superTitle: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
              />
            </label>
            <ProductGrid
              all={all}
              selected={cfg.superPicks}
              onToggle={(id) => toggle(id, "superPicks", 8)}
            />
          </Card>

          <Card title="Viral do Bazarixy" desc="Produtos virais (até 8).">
            <label className="block">
              <span className="text-xs font-semibold">Título</span>
              <input
                value={cfg.viralTitle}
                onChange={(e) => update({ viralTitle: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
              />
            </label>
            <ProductGrid
              all={all}
              selected={cfg.viralPicks}
              onToggle={(id) => toggle(id, "viralPicks", 8)}
            />
          </Card>
        </div>
      )}
    </div>
  );
}

function ProductGrid({
  all,
  selected,
  onToggle,
}: {
  all: { id: string; name: string; image: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="mt-2 grid max-h-72 grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-border p-2 sm:grid-cols-3 lg:grid-cols-4">
      {all.map((p) => {
        const on = selected.includes(p.id);
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onToggle(p.id)}
            className={`flex items-center gap-2 rounded-lg border p-2 text-left transition ${on ? "border-gold bg-gold/10" : "border-border hover:border-foreground"}`}
          >
            <img
              src={p.image}
              alt=""
              className="h-10 w-10 rounded object-cover"
            />
            <span className="line-clamp-2 text-[11px]">{p.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function TileEditor({
  title,
  tiles,
  cats,
  onChange,
  readFile,
  withBadge,
}: {
  title: string;
  tiles: HeroTile[];
  cats: { slug: string; name: string }[];
  onChange: (tiles: HeroTile[]) => void;
  readFile: (f: File, cb: (u: string) => void) => void;
  withBadge?: boolean;
}) {
  const patch = (id: string, p: Partial<HeroTile>) =>
    onChange(tiles.map((t) => (t.id === id ? { ...t, ...p } : t)));
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
        <button
          onClick={() =>
            onChange([...tiles, { id: `h-${Date.now()}`, label: "Novo bloco" }])
          }
          className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-bold hover:bg-muted"
        >
          <Plus className="h-3 w-3" /> Adicionar
        </button>
      </div>
      <div className="mt-2 space-y-2">
        {tiles.map((t) => (
          <div
            key={t.id}
            className="flex gap-2 rounded-xl border border-border p-2"
          >
            <label className="relative grid h-14 w-14 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-lg bg-muted">
              {t.image ? (
                <img
                  src={t.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) readFile(f, (u) => patch(t.id, { image: u }));
                }}
              />
            </label>
            <div className="min-w-0 flex-1 space-y-1.5">
              <input
                value={t.label}
                onChange={(e) => patch(t.id, { label: e.target.value })}
                placeholder="Título"
                className="w-full rounded-lg border border-border bg-transparent px-2.5 py-1.5 text-sm font-bold outline-none"
              />
              <div className="flex gap-1.5">
                <select
                  value={t.slug ?? ""}
                  onChange={(e) =>
                    patch(t.id, { slug: e.target.value || undefined })
                  }
                  className="min-w-0 flex-1 rounded-lg border border-border bg-transparent px-2 py-1.5 text-xs outline-none"
                >
                  <option value="">Todas as categorias</option>
                  {cats.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {withBadge && (
                  <input
                    value={t.badge ?? ""}
                    onChange={(e) => patch(t.id, { badge: e.target.value })}
                    placeholder="Selo"
                    className="w-20 rounded-lg border border-border bg-transparent px-2 py-1.5 text-xs outline-none"
                  />
                )}
              </div>
            </div>
            <button
              onClick={() => onChange(tiles.filter((x) => x.id !== t.id))}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
