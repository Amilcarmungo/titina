import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useAllProducts } from "@/lib/products-store";
import { useHomeConfig } from "@/lib/home-config";

export const Route = createFileRoute("/super-ofertas")({
  component: SuperOffersPage,
});

function SuperOffersPage() {
  const products = useAllProducts();
  const config = useHomeConfig();
  const picks = config.superPicks.length
    ? products.filter((product) => config.superPicks.includes(product.id))
    : [...products]
        .filter(
          (product) => product.oldPrice && product.oldPrice > product.price,
        )
        .sort((a, b) => b.oldPrice! - b.price - (a.oldPrice! - a.price));

  return (
    <Layout>
      <main className="mx-auto max-w-6xl px-4 py-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-[.18em]">
            Seleção especial
          </p>
          <h1 className="mt-1 font-display text-3xl font-black">
            {config.superTitle}
          </h1>
          <p className="mt-1 text-sm text-white/90">
            Ofertas ativas e produtos com desconto para si.
          </p>
        </div>
        {picks.length ? (
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {picks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Ainda não há Super Ofertas publicadas.
          </p>
        )}
      </main>
    </Layout>
  );
}
