import { createFileRoute } from "@tanstack/react-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, Search, Sparkles, Users, XCircle } from "lucide-react";

import { getDb } from "@/lib/firebase/client";
import { useStaff } from "@/lib/firebase/roles";
import { useCustomProducts } from "@/lib/products-store";

export const Route = createFileRoute("/justina/pesquisas")({
  head: () => ({
    meta: [
      { title: "Pesquisas dos clientes — Bazarixy Admin" },
      {
        name: "description",
        content:
          "Veja o que os clientes procuram e encontre oportunidades para a loja.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: SearchesPage,
});

type SearchRow = {
  term: string;
  normalized: string;
  searchCount: number;
  users: number;
  resultCount: number | null;
  lastSearchedAt?: { toDate?: () => Date } | null;
};

type SearchDoc = {
  term?: string;
  normalized?: string;
  searchCount?: number;
  resultCount?: number | null;
  lastSearchedAt?: { toDate?: () => Date } | null;
};

function SearchesPage() {
  const { staff } = useStaff();
  const products = useCustomProducts();
  const [rows, setRows] = useState<SearchRow[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      const db = getDb();
      if (!db || !staff) {
        setState("error");
        return;
      }
      try {
        const users = await getDocs(collection(db, "users"));
        const perTerm = new Map<string, SearchRow>();
        await Promise.all(
          users.docs.map(async (user) => {
            const searches = await getDocs(
              collection(db, "users", user.id, "searches"),
            );
            searches.docs.forEach((entry) => {
              const data = entry.data() as SearchDoc;
              const normalized = (data.normalized ?? data.term ?? entry.id)
                .trim()
                .toLowerCase();
              if (!normalized) return;
              const current = perTerm.get(normalized);
              const count = Math.max(1, data.searchCount ?? 1);
              if (current) {
                current.searchCount += count;
                current.users += 1;
                if ((data.resultCount ?? 0) < (current.resultCount ?? 0)) {
                  current.resultCount = data.resultCount ?? null;
                }
              } else {
                perTerm.set(normalized, {
                  term: data.term ?? normalized,
                  normalized,
                  searchCount: count,
                  users: 1,
                  resultCount: data.resultCount ?? null,
                  lastSearchedAt: data.lastSearchedAt,
                });
              }
            });
          }),
        );
        if (!active) return;
        setRows(
          [...perTerm.values()].sort((a, b) => b.searchCount - a.searchCount),
        );
        setState("ready");
      } catch {
        if (active) setState("error");
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [staff]);

  const filtered = useMemo(() => {
    const term = filter.trim().toLowerCase();
    return term
      ? rows.filter((row) => row.term.toLowerCase().includes(term))
      : rows;
  }, [filter, rows]);
  const noResults = filtered.filter((row) => row.resultCount === 0);
  const totalSearches = rows.reduce((sum, row) => sum + row.searchCount, 0);
  const productsText = products
    .map((product) => `${product.name} ${product.category}`.toLowerCase())
    .join(" ");
  const opportunities = noResults.filter(
    (row) => !productsText.includes(row.normalized),
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-strong text-background">
            <BarChart3 className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-black">
              Pesquisas dos clientes
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Descubra o que as pessoas procuram para decidir que produtos, categorias ou stock criar a seguir.
            </p>
          </div>
        </div>
        <label className="w-full sm:w-72 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Filtrar termos"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
      </header>

      {state === "loading" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
      )}
      {state === "error" && (
        <p className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Não foi possível carregar as pesquisas. Verifique a ligação ao banco e
          as permissões da equipa.
        </p>
      )}
      {state === "ready" && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric
              icon={<Search className="h-5 w-5" />}
              label="Pesquisas registadas"
              value={totalSearches}
              color="brand"
            />
            <Metric
              icon={<Users className="h-4 w-4" />}
              label="Termos diferentes"
              value={rows.length}
              color="purple"
            />
            <Metric
              icon={<XCircle className="h-4 w-4" />}
              label="Sem resultados"
              value={noResults.length}
              color="sale"
            />
          </div>

          {opportunities.length > 0 && (
            <section className="rounded-2xl border border-brand/40 bg-brand/10 p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-strong" />
                <h2 className="font-bold text-lg">Oportunidades de produto</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Estes termos têm procura, mas não parecem existir no catálogo
                atual. Considere adicionar estes produtos.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {opportunities.slice(0, 15).map((row) => (
                  <span
                    key={row.normalized}
                    className="inline-flex items-center gap-1.5 rounded-full bg-background px-3.5 py-2 text-sm font-semibold text-foreground border border-brand/20 hover:border-brand-strong transition"
                  >
                    <Search className="h-3.5 w-3.5" />
                    {row.term} 
                    <span className="text-muted-foreground">({row.searchCount})</span>
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h2 className="font-bold text-lg">Termos mais procurados</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Dados agregados sobre as pesquisas realizadas. {filtered.length} termo(s) encontrado(s).
              </p>
            </div>
            {filtered.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">
                Ainda não há pesquisas suficientes.
              </p>
            ) : (
              <div className="divide-y divide-border">
                {filtered.slice(0, 100).map((row, index) => (
                  <div
                    key={row.normalized}
                    className="grid gap-3 px-6 py-4 sm:grid-cols-[3rem_1fr_auto_auto] sm:items-center hover:bg-muted/50 transition"
                  >
                    <span className="text-sm font-black text-muted-foreground bg-muted/50 rounded-lg py-2 px-3 text-center w-fit">
                      #{index + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-foreground">{row.term}</span>
                      {row.resultCount === 0 && (
                        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-sale/15 px-2 py-0.5 text-xs font-bold text-sale">
                          <XCircle className="h-3 w-3" /> Sem resultados
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{row.users} cliente(s)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{row.searchCount} busca(s)</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  color = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color?: "default" | "brand" | "purple" | "sale";
}) {
  const colorClasses = {
    default: "border-border bg-card text-foreground",
    brand: "border-brand/40 bg-brand/10 text-brand-strong",
    purple: "border-purple-40 bg-purple/10 text-purple-600",
    sale: "border-sale/40 bg-sale/10 text-sale",
  };

  return (
    <div className={`rounded-2xl border p-5 ${colorClasses[color]}`}>
      <div className="flex items-center gap-2">
        <span className={color === "default" ? "text-muted-foreground" : ""}>{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-black">
        {value.toLocaleString("pt-BR")}
      </p>
    </div>
  );
}
