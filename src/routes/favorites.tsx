import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useAllProducts } from "@/lib/products-store";
import { useStore } from "@/lib/store";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "Favoritos — Bazarixy" }, { name: "description", content: "Seus produtos favoritos." }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites } = useStore();
  const products = useAllProducts();
  const items = products.filter(p => favorites.includes(p.id));

  if (items.length > 0) {
    return (
      <Layout title="Favoritos" showBack hideBottomNav>
        <div className="grid grid-cols-2 gap-3 p-3">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </Layout>
    );
  }

  const suggestions = products.slice(0, 4);

  return (
    <Layout title="Favoritos" showBack hideBottomNav>
      {/* Empty state — Shein style */}
      <div className="flex flex-col items-center justify-center px-6 pt-10 pb-6 text-center">
        <div className="relative">
          <Heart className="h-20 w-20 text-foreground/70" strokeWidth={1.2} />
          <span className="absolute -top-1 -left-2 text-foreground/40">✦</span>
          <span className="absolute top-2 -right-3 text-foreground/40">✧</span>
          <span className="absolute -bottom-1 -left-3 text-foreground/40">·</span>
          <span className="absolute bottom-2 -right-2 text-foreground/40">○</span>
        </div>
        <p className="mt-4 text-sm text-foreground/80">Está vazio aqui.</p>
        <div className="mt-6 flex w-full max-w-md gap-3">
          <Link to="/me" className="flex-1 rounded-sm bg-foreground py-3 text-center text-sm font-bold text-background">
            Entrar / Cadastrar
          </Link>
          <Link to="/" className="flex-1 rounded-sm border border-foreground py-3 text-center text-sm font-bold">
            Comprar agora
          </Link>
        </div>
      </div>

      <div className="mt-3 bg-muted/50 px-4 py-5">
        <h2 className="font-display text-lg font-bold">Curta.</h2>
        <p className="mt-1 text-xs text-muted-foreground">Guarde tudo o que ama numa só página.</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
            <span>Pense bem antes de comprar.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
            <span>Receba notificações quando esgotar.</span>
          </li>
        </ul>
      </div>

      <section className="mt-5 px-3">
        <div className="flex items-center justify-center gap-2">
          <span className="text-muted-foreground">◆</span>
          <h2 className="font-display text-base font-bold">Você também pode gostar</h2>
          <span className="text-muted-foreground">◆</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {suggestions.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </Layout>
  );
}
