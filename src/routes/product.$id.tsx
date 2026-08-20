import { formatKz } from "@/lib/format";
import {
  createFileRoute,
  Link,
  notFound,
  useRouter,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import {
  getProduct,
  products,
  type Product,
  type ProductVariant,
} from "@/lib/products";
import { getAnyProduct } from "@/lib/products-store";
import {
  ProductOptionsSheet,
  type ChosenOptions,
} from "@/components/ProductOptionsSheet";
import { colorName } from "@/lib/colors";
import { actions, useStore } from "@/lib/store";
import {
  Share2,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ShoppingCart,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { SearchIcon } from "@/components/SearchIcon";
import logo from "../../logotipo.webp";
import { toastAdded } from "@/lib/toast-added";
import { useReviews, type Review } from "@/lib/reviews";
import { useShops, type Shop } from "@/lib/shops-store";
import { SmartImage } from "@/components/SmartImage";
import { ShareSheet, nativeShare } from "@/components/ShareSheet";
import { absoluteUrl, paths, productUrl, SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => getProduct(params.id) ?? null,
  head: ({ params, loaderData }) => {
    const path = paths.product(params.id);
    if (!loaderData) {
      return {
        meta: [{ title: `Produto — ${SITE_NAME}` }],
        links: [{ rel: "canonical", href: absoluteUrl(path) }],
      };
    }
    const url = productUrl(params.id);
    const image = absoluteUrl(loaderData.image);
    const price = loaderData.price;
    const desc =
      (loaderData.description || `${loaderData.name} na ${SITE_NAME}.`)
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 155)
        .replace(/\s+\S*$/, "") + "…";
    return {
      meta: [
        { title: `${loaderData.name} — ${SITE_NAME}` },
        { name: "description", content: desc },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:locale", content: "pt_PT" },
        { property: "og:type", content: "product" },
        { property: "og:title", content: loaderData.name },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:image:alt", content: loaderData.name },
        { property: "product:price:amount", content: String(price) },
        { property: "product:price:currency", content: "AOA" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: loaderData.name },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: image },
        { name: "twitter:image:alt", content: loaderData.name },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.name,
            description: desc,
            image: [image],
            url,
            brand: { "@type": "Brand", name: SITE_NAME },
            offers: {
              "@type": "Offer",
              price,
              priceCurrency: "AOA",
              availability: "https://schema.org/InStock",
              url,
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <Layout title="Não encontrado" showBack>
      <p className="p-6 text-center">Produto não encontrado.</p>
    </Layout>
  ),
  errorComponent: () => (
    <Layout title="Erro" showBack>
      <p className="p-6 text-center">Algo deu errado.</p>
    </Layout>
  ),
});

function ProductPage() {
  const { id } = Route.useParams();
  const loaded = Route.useLoaderData();
  const product = loaded ?? getAnyProduct(id);
  const router = useRouter();
  const { cart } = useStore();
  const shops = useShops();
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const userReviews = useReviews(id);
  const [sheet, setSheet] = useState<null | "cart" | "buy">(null);
  const variants: ProductVariant[] = product?.variants ?? [];
  const [variantId, setVariantId] = useState<string | undefined>(
    variants[0]?.id,
  );
  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [color, setColor] = useState(product?.colors[0] ?? "");
  const [imgIdx, setImgIdx] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  const variant = useMemo(
    () => variants.find((v: ProductVariant) => v.id === variantId),
    [variants, variantId],
  );

  /** Photos shown for the current selection: variant photos when a variant is picked. */
  const gallery = useMemo<string[]>(() => {
    if (variant) {
      const list = [variant.image, ...(variant.images ?? [])].filter(
        Boolean,
      ) as string[];
      if (list.length) return list.slice(0, 4);
    }
    if (!product) return [];
    return product.images?.length ? product.images : [product.image];
  }, [variant, product]);

  if (!product) {
    return (
      <Layout title="Não encontrado" showBack>
        <p className="p-6 text-center">Produto não encontrado.</p>
      </Layout>
    );
  }

  const price = variant?.price ?? product.price;
  const shop = shops.find((item) => item.id === (product.shopId ?? "main"));
  const oldPrice = variant?.oldPrice ?? product.oldPrice;
  const mainImage =
    gallery[Math.min(imgIdx, gallery.length - 1)] ?? product.image;
  const sizeList = variant?.sizes?.length ? variant.sizes : product.sizes;
  const pickVariant = (vid: string) => {
    setVariantId(vid);
    setImgIdx(0);
  };

  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  // Avaliações reais (verificadas) — sem números fictícios.
  const reviewCount = userReviews.length;
  const avgRating = reviewCount
    ? userReviews.reduce((s, r) => s + r.rating, 0) / reviewCount
    : 0;

  return (
    <Layout hideHeader hideBottomNav>
      {/* ============ DESKTOP LAYOUT ============ */}
      <div className="hidden md:block">
        <nav className="mb-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Início
          </Link>
          <span className="mx-1.5">/</span>
          <Link to="/categories" className="hover:text-foreground">
            Categorias
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-12 gap-8">
          {/* Thumbnails */}
          <div className="col-span-1 flex flex-col gap-2">
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`overflow-hidden rounded-md border-2 ${i === imgIdx ? "border-brand-strong" : "border-transparent"}`}
              >
                <SmartImage
                  src={src}
                  alt={`${product.name} ${i + 1}`}
                  wrapperClassName="aspect-square w-full"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="col-span-6">
            <div className="overflow-hidden rounded-lg bg-muted">
              <SmartImage
                src={mainImage}
                alt={product.name}
                eager
                wrapperClassName="aspect-[4/5] w-full"
                className="object-cover"
              />
            </div>
          </div>

          {/* Info panel */}
          <div className="col-span-5 space-y-5">
            <div>
              <h1 className="text-xl font-medium leading-snug">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                {reviewCount > 0 ? (
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                    <span className="font-semibold text-foreground">
                      {avgRating.toFixed(1)}
                    </span>
                    <span>
                      ({reviewCount}{" "}
                      {reviewCount === 1 ? "avaliação" : "avaliações"})
                    </span>
                  </span>
                ) : (
                  <span>Sem avaliações ainda</span>
                )}
                <span>{product.sold.toLocaleString("pt-BR")} vendidos</span>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-xs text-muted-foreground">
                  A partir de
                </span>
                <span className="font-display text-4xl font-black text-sale">
                  {formatKz(price)}
                </span>
                {oldPrice && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatKz(oldPrice)}
                    </span>
                    <span className="rounded bg-sale px-2 py-0.5 text-xs font-bold text-sale-foreground">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                ou 3x de {formatKz(price / 3)} sem juros
              </p>
            </div>

            <VariantPicker
              product={product}
              variants={variants}
              variantId={variantId}
              onVariant={pickVariant}
              color={color}
              onColor={setColor}
              size="lg"
            />

            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  <span className="text-muted-foreground">Tamanho: </span>
                  <span className="font-semibold">{size}</span>
                </p>
                <button className="text-xs text-muted-foreground underline">
                  Guia de tamanhos
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizeList.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-16 rounded-full border px-4 py-2 text-sm transition ${size === s ? "border-brand-strong bg-brand text-brand-foreground" : "border-border hover:border-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 rounded-lg border border-border p-3 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Envio Nacional · Frete grátis acima de Kz 120.000</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
                <span>Devolução gratuita em 30 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <span>Pagamento 100% seguro</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSheet("cart")}
                className="flex-1 rounded-full bg-brand py-3.5 text-sm font-bold uppercase tracking-wider text-brand-foreground transition hover:opacity-90"
              >
                Adicionar ao carrinho
              </button>
              <button
                onClick={() => setSheet("buy")}
                className="flex-1 rounded-full border-2 border-brand-strong py-3.5 text-sm font-bold uppercase tracking-wider transition hover:bg-brand/20"
              >
                Comprar agora
              </button>
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="font-display text-base font-bold">Descrição</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>
            {shop && <ShopCard shop={shop} />}
          </div>
        </div>

        <ReviewsSection
          reviews={userReviews}
          average={avgRating}
          count={reviewCount}
        />

        <div className="mt-10">
          <h3 className="font-display text-xl font-bold">
            Você também pode gostar
          </h3>
          <div className="mt-4 grid grid-cols-5 gap-4">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 5)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>
      </div>

      {/* ============ MOBILE LAYOUT ============ */}
      <div className="md:hidden">
        {/* Sticky product header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur shadow-[0_1px_10px_rgba(0,0,0,0.05)]">
          <div className="flex h-12 items-center gap-0.5 px-1.5">
            <button
              onClick={() => window.history.back()}
              aria-label="Voltar"
              className="grid h-9 w-9 place-items-center rounded-full active:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => actions.openMenu()}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-full active:bg-muted"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              to="/"
              className="mx-auto flex min-w-0 items-center justify-center"
            >
              <img src={logo} alt="Bazarixy" className="h-7 w-auto" />
            </Link>
            <Link
              to="/categories"
              aria-label="Buscar"
              className="grid h-9 w-9 place-items-center rounded-full active:bg-muted"
            >
              <SearchIcon className="h-5 w-5" />
            </Link>
            <button
              aria-label="Partilhar"
              onClick={() => {
                void (async () => {
                  const target = {
                    url: productUrl(product.id),
                    title: product.name,
                    text: `${product.description || `Veja ${product.name}`} na Bazarixy`,
                    image: mainImage,
                  };
                  if (!(await nativeShare(target))) setShareOpen(true);
                })();
              }}
              className="grid h-9 w-9 place-items-center rounded-full active:bg-muted"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <Link
              to="/cart"
              aria-label="Carrinho"
              className="relative grid h-9 w-9 place-items-center rounded-full active:bg-muted"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <div
            className="border-t border-border/60 px-3 py-1.5"
            aria-hidden="true"
          />
        </header>

        <div className="relative bg-muted">
          <SmartImage
            src={mainImage}
            alt={product.name}
            eager
            wrapperClassName="aspect-[3/4] w-full"
            className="object-cover"
          />
          {gallery.length > 1 && (
            <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  aria-label={`Foto ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-5 bg-brand" : "w-1.5 bg-white/70"}`}
                />
              ))}
            </div>
          )}
        </div>
        {gallery.length > 1 && (
          <div className="no-scrollbar flex gap-2 overflow-x-auto bg-card px-4 py-2.5">
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 ${i === imgIdx ? "border-brand-strong" : "border-border"}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="space-y-4 bg-card px-4 py-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-black text-sale">
                {formatKz(price)}
              </span>
              {oldPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatKz(oldPrice)}
                  </span>
                  <span className="rounded bg-sale/10 px-1.5 py-0.5 text-xs font-bold text-sale">
                    -{discount}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              ou 3x de {formatKz(price / 3)} sem juros
            </p>
          </div>

          <h1 className="text-base font-medium leading-snug">{product.name}</h1>

          <div className="flex items-center gap-3 text-xs">
            {reviewCount > 0 ? (
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                <span className="font-semibold">{avgRating.toFixed(1)}</span>
                <span className="text-muted-foreground">({reviewCount})</span>
              </div>
            ) : (
              <span className="text-muted-foreground">
                Sem avaliações ainda
              </span>
            )}
            <span className="text-muted-foreground">
              {product.sold.toLocaleString("pt-BR")} vendidos
            </span>
          </div>
        </div>

        <div className="mt-2 space-y-2 bg-card px-4 py-4">
          <VariantPicker
            product={product}
            variants={variants}
            variantId={variantId}
            onVariant={pickVariant}
            color={color}
            onColor={setColor}
          />
          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              Tamanho:{" "}
              <span className="font-medium text-foreground">{size}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {sizeList.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 rounded-md border px-3 py-2 text-sm ${size === s ? "border-brand-strong bg-brand text-brand-foreground" : "border-border"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-3 bg-card px-4 py-4 text-sm">
          <div className="flex items-center gap-3">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span>Frete grátis acima de Kz 120.000</span>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
            <span>Devolução gratuita em 30 dias</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            <span>Pagamento 100% seguro</span>
          </div>
        </div>

        <div className="mt-2 bg-card px-4 py-4">
          <h3 className="font-display text-lg font-bold">Descrição</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        {/* Reviews block — Shein style */}
        <ReviewsSection
          reviews={userReviews}
          average={avgRating}
          count={reviewCount}
          className="mt-2"
        />

        {shop && <ShopCard shop={shop} mobile />}

        <div className="mt-2 bg-card px-4 py-4">
          <h3 className="font-display text-lg font-bold">
            Você também pode gostar
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>

        {/* Sticky action bar (mobile only) */}
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background px-3 py-2 md:hidden">
          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              aria-label="Carrinho"
              className="relative grid h-11 w-11 place-items-center rounded-full border border-border"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setSheet("cart")}
              className="flex-1 rounded-full border-2 border-brand-strong py-2.5 text-sm font-bold"
            >
              Adicionar
            </button>
            <button
              onClick={() => setSheet("buy")}
              className="flex-1 rounded-full bg-brand py-2.5 text-sm font-bold text-brand-foreground"
            >
              Comprar agora
            </button>
          </div>
        </div>
      </div>

      <ShareSheet
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        target={{
          url: productUrl(product.id),
          title: product.name,
          text: `${product.description || `Veja ${product.name}`} na Bazarixy`,
          image: mainImage,
        }}
      />

      {sheet && (
        <ProductOptionsSheet
          open
          mode={sheet}
          product={product}
          onClose={() => setSheet(null)}
          onConfirm={(o: ChosenOptions) => {
            actions.addToCart({
              id: product.id,
              qty: o.qty,
              size: o.size,
              color: o.color,
              variantId: o.variantId,
              variantLabel: o.variantLabel,
              unitPrice: o.unitPrice,
              image: o.image ?? mainImage,
            });
            const go = sheet === "buy";
            setSheet(null);
            if (go) void router.navigate({ to: "/cart" });
            else toastAdded();
          }}
        />
      )}
    </Layout>
  );
}

/** Dados reais da loja associada ao produto; o toque leva ao respetivo perfil. */
function ReviewsSection({
  reviews,
  average,
  count,
  className = "",
}: {
  reviews: Review[];
  average: number;
  count: number;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-border bg-card p-5 ${className}`}>
      <h3 className="font-display text-lg font-bold">Avaliações</h3>
      {count === 0 ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Este produto ainda não tem avaliações. Só mostramos avaliações de
          compras verificadas.
        </p>
      ) : (
        <>
          <div className="mt-3 flex items-center gap-4">
            <div className="text-3xl font-black">{average.toFixed(1)}</div>
            <div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(average) ? "fill-gold text-gold" : "text-muted-foreground/40"}`}
                  />
                ))}
                <span className="ml-1 text-xs text-muted-foreground">
                  ({count})
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">
                Baseado em compras verificadas
              </span>
            </div>
          </div>
          <div className="mt-4 divide-y divide-border">
            {reviews.map((review) => (
              <div key={review.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    {review.photoURL ? (
                      <img
                        src={review.photoURL}
                        alt={review.name}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="h-7 w-7 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/20 text-[11px] font-bold text-gold">
                        {review.name[0]?.toUpperCase()}
                      </div>
                    )}
                    <span className="truncate text-xs font-semibold">
                      {review.name}
                    </span>
                    <div className="flex shrink-0 items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`h-3 w-3 ${j < review.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {review.size ? `Tam: ${review.size}` : review.createdAt}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/90">
                  {review.text}
                </p>
                <span className="mt-1.5 block text-[11px] text-muted-foreground">
                  Compra verificada
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ShopCard({ shop, mobile = false }: { shop: Shop; mobile?: boolean }) {
  const initials = shop.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <Link
      to="/shop/$id"
      params={{ id: shop.id }}
      className={`${mobile ? "mt-2 block bg-card px-4 py-4 active:bg-muted/50" : "block rounded-xl border border-border p-4 hover:bg-muted/40"}`}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-foreground font-display text-sm font-black text-background">
          {shop.logo ? (
            <img
              src={shop.logo}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{shop.name}</p>
          {shop.description && (
            <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">
              {shop.description}
            </p>
          )}
          {shop.ownerName && (
            <p className="mt-1 text-[11px] text-muted-foreground">
              Responsável: {shop.ownerName}
            </p>
          )}
        </div>
        <span className="text-muted-foreground">›</span>
      </div>
      <span className="mt-3 block rounded-full border border-border py-2 text-center text-xs font-bold">
        Ver perfil da loja
      </span>
    </Link>
  );
}

/** Colour / detail selector — shows each variant's cover photo and swaps the gallery. */
function VariantPicker({
  product,
  variants,
  variantId,
  onVariant,
  color,
  onColor,
  size = "sm",
}: {
  product: Product;
  variants: ProductVariant[];
  variantId?: string;
  onVariant: (id: string) => void;
  color: string;
  onColor: (c: string) => void;
  size?: "sm" | "lg";
}) {
  const box = size === "lg" ? "h-16 w-16" : "h-14 w-14";
  /** A foto mostrada no lugar da cor — nunca fica vazio, seja variante ou não. */
  const photoFor = (i: number, own?: string) =>
    own || product.images?.[i] || product.image;

  if (variants.length > 0) {
    const active = variants.find((v) => v.id === variantId);
    return (
      <div>
        <p className="text-xs text-muted-foreground">
          Cor / detalhe:{" "}
          <span className="font-semibold text-foreground">
            {active?.label || colorName(active?.color) || "Padrão"}
          </span>
          {active?.images?.length ? (
            <span className="ml-1">· {active.images.length + 1} fotos</span>
          ) : null}
        </p>
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
          {variants.map((v, i) => (
            <button
              key={v.id}
              onClick={() => onVariant(v.id)}
              title={v.label || colorName(v.color)}
              className={`relative shrink-0 overflow-hidden rounded-lg border-2 transition ${variantId === v.id ? "border-brand-strong" : "border-border"}`}
            >
              <img
                src={photoFor(i, v.image)}
                alt={v.label || colorName(v.color)}
                className={`${box} object-cover`}
              />
              {(v.images?.length ?? 0) > 0 && (
                <span className="absolute bottom-0.5 right-0.5 rounded bg-black/60 px-1 text-[9px] font-bold text-white">
                  +{v.images!.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (product.colors.length === 0) return null;

  return (
    <div>
      <p className="text-xs text-muted-foreground">
        Cor:{" "}
        <span className="font-semibold text-foreground">
          {colorName(color)}
        </span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {product.colors.map((c: string, i: number) => (
          <button
            key={c}
            onClick={() => onColor(c)}
            aria-label={colorName(c)}
            className={`overflow-hidden rounded-lg border-2 ${color === c ? "border-brand-strong" : "border-border"}`}
          >
            <img
              src={photoFor(i)}
              alt={colorName(c)}
              className={`${box} object-cover`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
