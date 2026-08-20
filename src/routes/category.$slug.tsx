import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  Menu,
  ShoppingCart,
  Camera,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { NotificationBell } from "@/components/Layout";
import { useUnreadCount } from "@/lib/notifications-store";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { SearchIcon } from "@/components/SearchIcon";
import { useCategories } from "@/lib/categories-store";
import { useCustomProducts } from "@/lib/products-store";
import { useStore } from "@/lib/store";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/category/$slug")({
  validateSearch: (search: Record<string, unknown>): { sub?: string } => ({
    sub: typeof search.sub === "string" ? search.sub : undefined,
  }),
  loader: ({ params }) => ({ slug: params.slug }),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Categoria — Bazarixy` },
          {
            name: "description",
            content: `Compre produtos com preços incríveis.`,
          },
        ]
      : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <Layout title="Categoria" showBack>
      <p className="p-6">Categoria não encontrada.</p>
    </Layout>
  ),
  errorComponent: () => (
    <Layout title="Erro" showBack>
      <p className="p-6">Algo deu errado.</p>
    </Layout>
  ),
});

function CategoryPage() {
  const { slug } = Route.useLoaderData();
  const { sub: subParam } = Route.useSearch();
  const cats = useCategories();
  const cat = cats.find((c) => c.slug === slug);
  const customs = useCustomProducts();
  const [sub, setSub] = useState<string | "all">(subParam ?? "all");
  const { cart } = useStore();
  const unread = useUnreadCount();
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const all = useMemo(
    () => [...customs].filter((p) => p.category === slug),
    [customs, slug],
  );
  const filtered =
    sub === "all" ? all : all.filter((p) => p.subcategory === sub);

  // Resolve a representative image for each subcategory (first product of that sub)
  const subImage = (name: string) =>
    all.find((p) => p.subcategory === name)?.image ?? cat?.image;

  if (!cat) throw notFound();

  const subs = cat.subcategories ?? [];

  return (
    <Layout title={cat.name} showBack hideHeader>
      {/* Mobile custom header (matches the reference) */}
      <header className="sticky top-0 z-40 border-b border-border bg-background md:hidden">
        <div className="flex items-center gap-1.5 px-2 py-2">
          <button
            onClick={() => window.history.back()}
            className="p-1.5"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <Link to="/categories" className="p-1.5" aria-label="Menu">
            <Menu className="h-5 w-5" strokeWidth={2.2} />
          </Link>
          <Link
            to="/categories"
            className="flex-1 min-w-0 flex items-center gap-1 rounded-full border-2 border-foreground bg-background pl-3 pr-1 py-1"
          >
            <span className="flex-1 min-w-0 truncate text-[13px] text-foreground/80">
              {cat.name} femininas
            </span>
            <button
              aria-label="Buscar por imagem"
              className="grid h-7 w-7 place-items-center text-foreground/70"
            >
              <Camera className="h-4 w-4" strokeWidth={2} />
            </button>
            <span className="grid h-7 w-9 place-items-center rounded-full bg-foreground text-background">
              <SearchIcon className="h-4 w-4" strokeWidth={2} />
            </span>
          </Link>
          <Link
            to="/notifications"
            className="relative p-1.5"
            aria-label="Notificações"
          >
            <NotificationBell count={unread} />
          </Link>
          <Link to="/cart" className="relative p-1.5" aria-label="Carrinho">
            <ShoppingCart className="h-5 w-5" strokeWidth={2.2} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Subcategory circle swiper — BELOW the banner */}
      {subs.length > 0 && (
        <div className="bg-background">
          <div className="no-scrollbar mx-auto flex max-w-5xl gap-3 overflow-x-auto px-3 py-3 md:gap-5 md:px-0 md:py-4">
            <SubTile
              label="Tudo"
              image={cat.image}
              active={sub === "all"}
              onClick={() => setSub("all")}
            />
            {subs.map((s) => (
              <SubTile
                key={s}
                label={s}
                image={cat.subImages?.[s] ?? subImage(s)}
                active={sub === s}
                onClick={() => setSub(s)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Filter row */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-3 py-3 text-xs md:px-0 md:py-4">
        <button className="inline-flex items-center gap-1 font-bold">
          Recomendar <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-center gap-4 text-muted-foreground">
          <button>Mais Popular</button>
          <button>Preço ⇅</button>
          <button className="inline-flex items-center gap-1">
            Filtro <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 px-3 pb-8 md:grid-cols-4 md:gap-5 md:px-0 lg:grid-cols-5">
        {(filtered.length ? filtered : all).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && all.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
            Nenhum produto nesta categoria ainda.
          </p>
        )}
      </div>
    </Layout>
  );
}

function SubTile({
  label,
  image,
  active,
  onClick,
}: {
  label: string;
  image?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-[62px] shrink-0 flex-col items-center gap-1.5 md:w-[72px]"
    >
      <div
        className={`grid h-[58px] w-[58px] place-items-center overflow-hidden rounded-full bg-muted transition md:h-[68px] md:w-[68px] ${
          active
            ? "ring-2 ring-[hsl(22_95%_55%)] ring-offset-2 ring-offset-background"
            : "ring-1 ring-border"
        }`}
      >
        {image ? (
          <SmartImage
            src={image}
            alt={label}
            wrapperClassName="absolute inset-0 h-full w-full"
            className="object-cover"
          />
        ) : (
          <span className="text-2xl">🛍️</span>
        )}
      </div>
      <span
        className={`line-clamp-2 text-center text-[11px] leading-tight md:text-xs ${
          active
            ? "font-bold bg-gradient-to-r from-[hsl(22_95%_55%)] to-[hsl(330_85%_60%)] bg-clip-text text-transparent"
            : "text-foreground/80"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
