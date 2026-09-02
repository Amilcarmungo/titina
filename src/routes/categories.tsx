import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { useCustomProducts } from "@/lib/products-store";
import { useCategories } from "@/lib/categories-store";
import { formatKz } from "@/lib/format";
import { useStore } from "@/lib/store";
import { trackSearch } from "@/lib/firebase/user-data";
import {
  ChevronLeft,
  Camera,
  Search,
  Trophy,
  X,
  Clock,
  Flame,
  SlidersHorizontal,
} from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { recordSearchIntent } from "@/lib/recommendations";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Buscar produtos — Bazarixy" },
      {
        name: "description",
        content:
          "Pesquise produtos, explore categorias e descubra as tendências mais vendidas na Bazarixy.",
      },
      { property: "og:title", content: "Buscar produtos — Bazarixy" },
      {
        property: "og:description",
        content: "Pesquise produtos e explore todas as categorias da Bazarixy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

const discovery = [
  "acessórios",
  "vestidos de verão",
  "vestidos para mulheres",
  "biquíni",
  "trajes de banho",
  "sapatos",
  "roupa esportiva feminina",
  "moletons",
];

const RECENT_KEY = "search_recent_v1";
type Sort = "relevance" | "price-asc" | "price-desc" | "sold";

function SearchPage() {
  const router = useRouter();
  const customs = useCustomProducts();
  const cats = useCategories();
  const { user } = useStore();
  const all = useMemo(() => [...customs], [customs]);

  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("relevance");
  const [cat, setCat] = useState<string | null>(null);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  const remember = (term: string) => {
    const t = term.trim();
    if (!t) return;
    const next = [
      t,
      ...recent.filter((r) => r.toLowerCase() !== t.toLowerCase()),
    ].slice(0, 8);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    recordSearchIntent(t);
    void trackSearch(user?.uid ?? null, t, results.length);
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term && !cat) return [];
    let list = all.filter(
      (p) =>
        (!term ||
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)) &&
        (!cat || p.category === cat),
    );
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "sold")
      list = [...list].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0));
    return list;
  }, [q, cat, sort, all]);

  const searching = !!q.trim() || !!cat;
  const hotList = useMemo(
    () => [...all].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0)).slice(0, 12),
    [all],
  );

  return (
    <Layout hideHeader>
      <div className="mx-auto md:max-w-6xl">
        {/* Search bar */}
        <div className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur">
          <div className="flex items-center gap-2 px-2 py-2 md:px-0 md:py-4">
            <button
              onClick={() => router.history.back()}
              className="shrink-0 p-2 md:hidden"
              aria-label="Voltar"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                remember(q);
              }}
              className="flex min-w-0 flex-1 items-center gap-1 rounded-full border border-brand-strong/40 bg-brand/20 pl-3 pr-1 py-1 transition focus-within:border-brand-strong focus-within:bg-background md:max-w-3xl md:py-1.5"
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Pesquisar produtos, marcas e categorias"
                className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground md:text-base"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="shrink-0 p-1.5 text-muted-foreground"
                  aria-label="Limpar"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                className="shrink-0 p-1.5 text-muted-foreground"
                aria-label="Buscar por foto"
              >
                <Camera className="h-5 w-5" />
              </button>
              <button
                type="submit"
                className="grid h-9 w-12 shrink-0 place-items-center rounded-full bg-brand-strong text-white"
                aria-label="Buscar"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Category chips */}
          <div className="no-scrollbar overflow-x-auto pb-2">
            <div className="flex gap-2 px-3 md:px-0">
              <Chip active={!cat} onClick={() => setCat(null)}>
                Tudo
              </Chip>
              {cats.map((c) => (
                <Chip
                  key={c.slug}
                  active={cat === c.slug}
                  onClick={() => setCat(cat === c.slug ? null : c.slug)}
                >
                  {c.name}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {searching ? (
          <div className="px-3 py-3 md:px-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                <b className="text-foreground">{results.length}</b> resultado(s)
                {q ? ` para “${q}”` : ""}
              </p>
              <label className="flex items-center gap-1.5 rounded-none border border-border px-3 py-1.5 text-xs font-semibold">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="bg-transparent outline-none"
                >
                  <option value="relevance">Relevância</option>
                  <option value="sold">Mais vendidos</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                </select>
              </label>
            </div>

            <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-5">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$id"
                  params={{ id: p.id }}
                  className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/20"
                >
                  <div className="flex items-start gap-3 p-2 md:block md:p-0">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-muted md:h-40 md:w-full">
                      <SmartImage
                        src={p.image}
                        alt={p.name}
                        wrapperClassName="absolute inset-0 h-full w-full"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1 p-2 md:p-2.5">
                      <p className="line-clamp-2 text-xs leading-tight md:text-sm">
                        {p.name}
                      </p>
                      <p className="mt-1 text-sm font-black text-sale">
                        {formatKz(p.price)}
                      </p>
                      <p className="mt-1 hidden text-[11px] leading-snug text-muted-foreground md:line-clamp-2">
                        {p.description ?? "Produto em destaque com qualidade e entrega rápida."}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {results.length === 0 && (
              <div className="py-16 text-center">
                <p className="font-bold">Nenhum produto encontrado</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tente outra palavra ou explore as categorias abaixo.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {discovery.slice(0, 5).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setQ(t);
                        setCat(null);
                      }}
                      className="rounded-none border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-6 px-4 py-4 md:grid-cols-[1fr_320px] md:px-0">
            <div className="space-y-8">
              {recent.length > 0 && (
                <section>
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-1.5 text-lg font-black">
                      <Clock className="h-4 w-4 text-muted-foreground" /> Buscas
                      recentes
                    </h2>
                    <button
                      onClick={() => {
                        setRecent([]);
                        localStorage.removeItem(RECENT_KEY);
                      }}
                      className="text-xs font-bold text-muted-foreground hover:text-foreground"
                    >
                      Limpar
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {recent.map((t) => (
                      <button
                        key={t}
                        onClick={() => setQ(t)}
                        className="rounded-none bg-muted px-3.5 py-2 text-sm hover:bg-muted/70"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2 className="flex items-center gap-1.5 text-lg font-black">
                  <Flame className="h-4 w-4 text-sale" /> Descobrir buscas
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {discovery.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setQ(t);
                        remember(t);
                      }}
                      className="rounded-none border border-border px-3.5 py-2 text-sm transition hover:border-transparent hover:bg-foreground hover:text-background"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-5 w-5 text-gold" />
                  <h2 className="text-lg font-black">Bazarixy Hot List</h2>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2.5 md:grid-cols-6">
                  {hotList.map((p, i) => (
                    <Link
                      key={p.id}
                      to="/product/$id"
                      params={{ id: p.id }}
                      className="group"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-none bg-muted">
                        <SmartImage
                          src={p.image}
                          alt={p.name}
                          wrapperClassName="absolute inset-0 h-full w-full"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-none px-2 py-0.5 text-[10px] font-black text-white"
                          style={{ background: "#111111" }}
                        >
                          TOP {i + 1}
                        </span>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-[11px] leading-tight">
                        {p.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-3">
              <h2 className="text-lg font-black">Todas as categorias</h2>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-2">
                {cats.map((c) => (
                  <Link
                    key={c.slug}
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    className="group overflow-hidden rounded-none bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-0.5"
                  >
                    <div className="flex aspect-square items-center justify-center bg-muted">
                      {c.image ? (
                        <SmartImage
                          src={c.image}
                          alt={c.name}
                          wrapperClassName="absolute inset-0 h-full w-full"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="text-4xl">{c.emoji}</span>
                      )}
                    </div>
                    <div className="p-2 text-center text-xs font-semibold">
                      {c.name}
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-none px-3.5 py-1.5 text-xs font-bold transition ${active ? "text-white" : "border border-border text-foreground hover:bg-muted"}`}
      style={active ? { background: "#111111" } : undefined}
    >
      {children}
    </button>
  );
}
