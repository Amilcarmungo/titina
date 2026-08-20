import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useAllProducts } from "@/lib/products-store";
import { Star, BadgeCheck, Flame } from "lucide-react";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "MonkeyK Beauty Tool — Loja oficial | Bazarixy" },
      {
        name: "description",
        content:
          "Descubra a loja oficial MonkeyK Beauty Tool na Bazarixy. Produtos de beleza com alta taxa de recompra.",
      },
    ],
  }),
  component: StorePage,
});

function StorePage() {
  const products = useAllProducts();
  return (
    <Layout simpleHeader hideBottomNav>
      {/* Cartão da loja — leve, claro e responsivo (sem cabeçalho escuro) */}
      <div className="mx-3 mt-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)] md:mx-0 md:p-6">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/30 font-display text-lg font-black text-brand-foreground md:h-20 md:w-20 md:text-2xl">
            MK
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="truncate font-display text-lg font-black md:text-2xl">
                MonkeyK Beauty Tool
              </h1>
              <BadgeCheck className="h-4 w-4 shrink-0 text-gold md:h-5 md:w-5" />
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground md:text-xs">
              <span className="flex items-center gap-1 font-bold text-foreground">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" /> 4.87
              </span>
              <span>5.5K seguidores</span>
              <span className="flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-sale" /> 99K+ vendidos
              </span>
            </div>
          </div>
          <button className="shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background md:px-6">
            Seguir
          </button>
        </div>

        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
          {["Artigo", "✨ Novo", "Promoção", "Comentários"].map((t, i) => (
            <button
              key={t}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition ${i === 0 ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center justify-between px-4 py-3 text-xs">
        <button className="font-bold">Recomendar ▾</button>
        <div className="flex items-center gap-4 text-muted-foreground">
          <button>Mais Popular</button>
          <button>Preço ⇅</button>
          <button>Filtro ▾</button>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 px-3 md:px-0 pb-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mx-4 mb-6 rounded-lg bg-gradient-to-r from-sale/10 to-gold/10 p-3 text-xs">
        <span className="font-bold text-sale">SuperDeals</span> Poupe até{" "}
        <span className="font-bold">15%</span>. Descubra mais ofertas
        imperdíveis
        <Link to="/" className="ml-1 font-bold underline">
          ›
        </Link>
      </div>
    </Layout>
  );
}
