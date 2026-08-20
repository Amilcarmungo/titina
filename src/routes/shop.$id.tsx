import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useAllProducts } from "@/lib/products-store";
import { getShop, useShops } from "@/lib/shops-store";
import { Star, BadgeCheck, Flame, Share2, Store as StoreIcon, ChevronLeft } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { ShareSheet, nativeShare } from "@/components/ShareSheet";
import { absoluteUrl, paths, shopUrl, SITE_NAME } from "@/lib/site";
import { toggleFollow, useFollowedShops } from "@/lib/firebase/follows";
import { useStore } from "@/lib/store";
import { requireAuth } from "@/lib/auth-guard";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/$id")({
  loader: ({ params }) => ({ id: params.id }),
  head: ({ params }) => {
    const shop = getShop(params.id);
    const name = shop?.name ?? "Loja";
    const desc = (shop?.description ?? `Descubra a loja ${name} na ${SITE_NAME}.`).slice(0, 155);
    const image = absoluteUrl(shop?.cover || shop?.logo || "/favicon.ico");
    return {
      meta: [
        { title: `${name} — Loja oficial | ${SITE_NAME}` },
        { name: "description", content: desc },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:title", content: `${name} — ${SITE_NAME}` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: shopUrl(params.id) },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${name} — ${SITE_NAME}` },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: paths.shop(params.id) }],
    };
  },
  component: ShopPage,
  notFoundComponent: () => <Layout title="Loja" showBack><p className="p-6">Loja não encontrada.</p></Layout>,
});

function ShopPage() {
  const { id } = Route.useLoaderData();
  useShops(); // subscribe so live edits refresh
  const shop = getShop(id);
  const { user } = useStore();
  const followed = useFollowedShops();
  const [shareOpen, setShareOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const following = followed.includes(id);
  const all = useAllProducts();
  const shopProducts = useMemo(
    () => all.filter((p) => (p.shopId ?? "main") === id),
    [all, id],
  );

  if (!shop) throw notFound();

  const initials = shop.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Layout hideHeader hideBottomNav>
      <ShareSheet
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        target={{ url: shopUrl(id), title: shop.name, text: `Veja a loja ${shop.name} na Bazarixy`, image: shop.logo || shop.cover }}
      />

      {/* Simple top bar */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-8">
          <button
            onClick={() => window.history.back()}
            className="grid h-9 w-9 place-items-center rounded-full bg-muted/70 hover:bg-muted transition"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="truncate px-3 text-sm font-semibold text-foreground md:text-base">
            {shop.name}
          </h1>
          <button
            onClick={() => {
              void (async () => {
                const target = { url: shopUrl(id), title: shop.name, text: `Veja a loja ${shop.name} na Bazarixy`, image: shop.logo || shop.cover };
                if (!(await nativeShare(target))) setShareOpen(true);
              })();
            }}
            aria-label="Partilhar loja"
            className="grid h-9 w-9 place-items-center rounded-full bg-muted/70 hover:bg-muted transition"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Shop profile — no cover, rounder logo */}
      <div className="px-4 pt-4 pb-5 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-end md:gap-6">
          <div className="flex items-center gap-4 md:items-end md:gap-5">
            <div className="grid h-24 w-24 md:h-32 md:w-32 shrink-0 place-items-center rounded-full bg-background text-foreground font-display text-2xl md:text-3xl font-black shadow-xl ring-4 ring-background overflow-hidden">
              {shop.logo ? (
                <SmartImage src={shop.logo} alt={shop.name} wrapperClassName="absolute inset-0 h-full w-full" className="object-cover" />
              ) : (
                initials || <StoreIcon className="h-8 w-8" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate font-display text-lg md:text-2xl font-black text-foreground">
                  {shop.name}
                </h2>
                <BadgeCheck className="h-4 w-4 md:h-5 md:w-5 text-gold shrink-0" />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-muted-foreground">
                <span className="rounded bg-gold px-1.5 py-0.5 font-bold text-foreground">Choices</span>
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-gold text-gold" /> 4.87
                </span>
                <span>· {shopProducts.length} produto(s)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:ml-auto">
            <button
              onClick={() => {
                if (!requireAuth(user) || saving) return;
                setSaving(true);
                void toggleFollow(id, shop.name)
                  .then((now) => toast.success(now ? "A seguir esta loja" : "Deixou de seguir"))
                  .catch((e: Error) => toast.error(e.message))
                  .finally(() => setSaving(false));
              }}
              disabled={saving}
              className={`rounded-full px-5 py-2 text-xs font-bold transition disabled:opacity-60 ${following ? "border border-border bg-background text-foreground" : "bg-foreground text-background"}`}
            >
              {following ? "Seguindo" : "+ Seguir loja"}
            </button>
          </div>
        </div>

        <div className="mx-auto mt-4 flex max-w-5xl gap-2 overflow-x-auto no-scrollbar md:flex-wrap md:overflow-visible">
          <span className="whitespace-nowrap rounded-full bg-muted px-3 py-1 text-[11px] font-medium">
            🗓 {shop.createdAt}
          </span>
          <span className="whitespace-nowrap rounded-full bg-muted px-3 py-1 text-[11px] flex items-center gap-1 font-medium">
            <Flame className="h-3 w-3 text-sale" /> Alta taxa de recompra
          </span>
          {shop.ownerName && (
            <span className="whitespace-nowrap rounded-full bg-muted px-3 py-1 text-[11px] font-medium">
              👤 {shop.ownerName}
            </span>
          )}
        </div>

        {shop.description && (
          <p className="mx-auto mt-3 max-w-5xl text-sm text-muted-foreground">
            {shop.description}
          </p>
        )}
      </div>

      {/* Products */}
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 px-3 py-4 md:grid-cols-4 md:gap-4 md:px-0 lg:grid-cols-5">
        {shopProducts.length ? shopProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        )) : (
          <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
            Esta loja ainda não tem produtos.
          </p>
        )}
      </div>

      <div className="mx-4 mb-6 rounded-lg bg-gradient-to-r from-sale/10 to-gold/10 p-3 text-xs md:mx-auto md:max-w-5xl">
        <span className="font-bold text-sale">SuperDeals</span> Poupe até{" "}
        <span className="font-bold">15%</span> nesta loja
        <Link to="/" className="ml-1 font-bold underline">›</Link>
      </div>
    </Layout>
  );
}
