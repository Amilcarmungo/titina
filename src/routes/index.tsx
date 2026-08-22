import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import {
  useAllProducts,
  useProductsStatus,
  retryProducts,
} from "@/lib/products-store";
import {
  useSlides,
  setBannerIndex,
  useBannersStatus,
  retryBanners,
} from "@/lib/banner";
import {
  useHomeConfig,
  useActiveHomeTab,
  setActiveHomeTab,
} from "@/lib/home-config";
import {
  useCategories,
  useCategoriesStatus,
  type CategoryFull,
} from "@/lib/categories-store";
import { SmartImage, Skeleton } from "@/components/SmartImage";
import type { Product } from "@/lib/products";
import { formatKz } from "@/lib/format";
import { useOrders } from "@/lib/orders-store";
import {
  rankFeedProducts,
  useRecommendationSignals,
} from "@/lib/recommendations";
import { useStore } from "@/lib/store";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  SHARE_IMAGE,
  SITE_URL,
} from "@/lib/site";
import promo1 from "@/assets/promo-1.png";
import promo2 from "@/assets/promo-2.png";
import promo3 from "@/assets/promo-3.png";

const promos = [promo1, promo2, promo3];
const FEED_PAGE_SIZE = 8;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESCRIPTION },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: SHARE_IMAGE },
      {
        property: "og:image:alt",
        content: "Bazarixy - Compras online em Angola",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESCRIPTION },
      { name: "twitter:image", content: SHARE_IMAGE },
    ],
  }),
  component: Home,
});

function Home() {
  const allSlides = useSlides();
  const cfg = useHomeConfig();
  const categories: CategoryFull[] = useCategories();
  const catStatus = useCategoriesStatus();
  const products = useAllProducts();
  const orders = useOrders();
  const { favorites } = useStore();
  const signals = useRecommendationSignals();
  const prodStatus = useProductsStatus();
  const bannerStatus = useBannersStatus();
  const orderedCats = useMemo(() => {
    if (!cfg.categoriesOrder.length) return categories;
    const map = new Map(categories.map((c) => [c.slug, c]));
    const head = cfg.categoriesOrder
      .map((s) => map.get(s))
      .filter(Boolean) as CategoryFull[];
    const tail = categories.filter(
      (c) => !cfg.categoriesOrder.includes(c.slug),
    );
    return [...head, ...tail];
  }, [categories, cfg.categoriesOrder]);
  const [i, setI] = useState(0);
  const tab = useActiveHomeTab();
  const setTab = setActiveHomeTab;

  const tabs = cfg.homeTabs.length
    ? cfg.homeTabs
    : [{ id: "t-all", label: "Tudo", slugs: [] as string[] }];
  const active = tabs[Math.min(tab, tabs.length - 1)];

  // Banners da aba activa (se não houver selecção, mostra todos)
  const slides = useMemo(() => {
    const ids = active.slideIds ?? [];
    if (!ids.length) return allSlides;
    const picked = allSlides.filter((s) => ids.includes(s.id));
    return picked.length ? picked : allSlides;
  }, [allSlides, active.slideIds]);

  // ao trocar de aba, volta ao primeiro banner
  useEffect(() => {
    setI(0);
    setBannerIndex(0);
  }, [tab]);

  useEffect(() => {
    const id = setInterval(() => {
      setI((v) => {
        const next = (v + 1) % (slides.length || 1);
        setBannerIndex(next);
        return next;
      });
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const goTo = (idx: number) => {
    setI(idx);
    setBannerIndex(idx);
  };

  // touch swipe (mobile)
  const touch = { x: 0, active: false } as { x: number; active: boolean };
  const onTouchStart = (e: React.TouchEvent) => {
    touch.x = e.touches[0].clientX;
    touch.active = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.active) return;
    const dx = e.changedTouches[0].clientX - touch.x;
    touch.active = false;
    if (Math.abs(dx) > 40)
      goTo(
        dx < 0
          ? (i + 1) % slides.length
          : (i - 1 + slides.length) % slides.length,
      );
  };

  // produtos da categoria activa + das suas subcategorias
  const filtered = useMemo(
    () =>
      !active.slugs.length
        ? products
        : products.filter((p) => active.slugs.includes(p.category)),
    [products, active.slugs],
  );

  const tabCats = useMemo(
    () =>
      !active.slugs.length
        ? orderedCats
        : orderedCats.filter((c) => active.slugs.includes(c.slug)),
    [orderedCats, active.slugs],
  );

  const slide = slides[Math.min(i, slides.length - 1)] ?? slides[0];
  const [feedSeed] = useState(() => {
    if (typeof window === "undefined") return 1;
    const key = "bazarixy_feed_seed_v1";
    const saved = Number(sessionStorage.getItem(key));
    if (Number.isFinite(saved) && saved > 0) return saved;
    const next = Date.now() + Math.floor(Math.random() * 100000);
    sessionStorage.setItem(key, String(next));
    return next;
  });
  const feedOrderKey = `bazarixy_feed_order_v1_${active.id}`;
  const feedVisibleKey = `bazarixy_feed_visible_v1_${active.id}`;
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === "undefined") return FEED_PAGE_SIZE;
    const saved = Number(sessionStorage.getItem(feedVisibleKey));
    return Number.isFinite(saved) && saved >= FEED_PAGE_SIZE
      ? saved
      : FEED_PAGE_SIZE;
  });
  const feedEndRef = useRef<HTMLDivElement>(null);
  const feedProducts = useMemo(() => {
    const category =
      tab === 0 ? null : active.slugs.length === 1 ? active.slugs[0] : null;
    const source = category
      ? products.filter((product) => product.category === category)
      : products;
    const productMap = new Map(source.map((product) => [product.id, product]));

    if (typeof window !== "undefined") {
      try {
        const saved = JSON.parse(
          sessionStorage.getItem(feedOrderKey) || "[]",
        ) as unknown;
        if (Array.isArray(saved)) {
          const savedProducts = saved
            .filter((id): id is string => typeof id === "string")
            .map((id) => productMap.get(id))
            .filter((product): product is Product => Boolean(product));
          if (savedProducts.length) {
            const savedIds = new Set(
              savedProducts.map((product) => product.id),
            );
            return [
              ...savedProducts,
              ...source.filter((product) => !savedIds.has(product.id)),
            ];
          }
        }
      } catch {
        // Recalcula uma ordem válida se a sessão tiver dados corrompidos.
      }
    }

    const ranked = rankFeedProducts(products, {
      favorites,
      orders,
      category,
      seed: feedSeed,
    });
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        feedOrderKey,
        JSON.stringify(ranked.map((product) => product.id)),
      );
    }
    return ranked;
  }, [active.slugs, feedOrderKey, feedSeed, favorites, orders, products, tab]);
  const visibleFeedProducts = feedProducts.slice(0, visibleCount);

  useEffect(() => {
    const saved = Number(sessionStorage.getItem(feedVisibleKey));
    setVisibleCount(
      Number.isFinite(saved) && saved >= FEED_PAGE_SIZE
        ? saved
        : FEED_PAGE_SIZE,
    );
  }, [active.id, feedVisibleKey]);

  useEffect(() => {
    sessionStorage.setItem(feedVisibleKey, String(visibleCount));
  }, [feedVisibleKey, visibleCount]);

  useEffect(() => {
    const node = feedEndRef.current;
    if (!node || visibleCount >= feedProducts.length) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting)
          setVisibleCount((count) => count + FEED_PAGE_SIZE);
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [feedProducts.length, visibleCount]);

  return (
    <Layout transparentHeader>
      {/* ============ MOBILE HERO ============ */}
      {!slide ? (
        <div className="md:hidden">
          {bannerStatus === "error" ? (
            <ErrorState onRetry={retryBanners} className="aspect-[4/4.2]" />
          ) : (
            <Skeleton className="aspect-[4/4.2] w-full rounded-none" />
          )}
        </div>
      ) : (
        <div
          className="relative overflow-hidden select-none md:hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {slides.map((s, idx) => (
              <SmartImage
                key={idx}
                src={s.img}
                alt={s.title}
                eager={idx === 0}
                draggable={false}
                wrapperClassName="aspect-[4/4.2] w-full shrink-0"
                className="object-cover"
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/85" />

          <div className="absolute left-0 right-0 top-14 z-10">
            <div className="no-scrollbar overflow-x-auto">
              <div className="flex gap-5 px-3 pt-1 pb-2.5">
                {tabs.map((t, idx) => (
                  <button
                    key={t.label}
                    onClick={() => setTab(idx)}
                    className={`relative whitespace-nowrap text-sm font-bold drop-shadow ${idx === tab ? "text-white after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-white" : "text-white/80"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 px-4 pb-3 text-white">
            <div className="grid grid-cols-2 items-center gap-3">
              {/* LEFT — promo image (no background) */}
              <div className="flex items-center justify-center">
                <img
                  src={slide.overlay || promos[i % promos.length]}
                  alt={slide.subtitle}
                  className="h-32 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
                />
              </div>
              {/* RIGHT — product picks */}
              <div className="flex items-center justify-end gap-2">
                {slide.picks.map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="block w-[96px] shrink-0 text-white"
                  >
                    <SmartImage
                      src={p.image}
                      alt={p.name}
                      rounded="rounded-lg"
                      wrapperClassName="aspect-square w-full"
                      className="object-cover"
                    />
                    <p className="mt-1 text-[11px] font-bold drop-shadow">
                      {formatKz(p.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-2.5 flex justify-center gap-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ DESKTOP HERO: Shein-style 3-column ============ */}
      <div className="hidden md:block">
        <div className="-mt-1 mb-3 flex items-center gap-6">
          {tabs.map((t, idx) => (
            <button
              key={t.label}
              onClick={() => setTab(idx)}
              className={`relative py-1.5 text-sm ${idx === tab ? "font-bold text-foreground after:absolute after:-bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 grid-rows-1 gap-3 h-[340px] lg:h-[380px]">
          {/* LEFT column — 3 stacked banner tiles */}
          <div className="col-span-3 flex min-h-0 flex-col gap-3">
            {cfg.heroLeftTiles.map((it, idx) => (
              <Link
                key={it.id}
                to={it.slug ? "/category/$slug" : "/categories"}
                params={it.slug ? { slug: it.slug } : undefined}
                className="group relative min-h-0 flex-1 overflow-hidden rounded-xl bg-neutral-900 text-white"
              >
                <div className="absolute inset-0 flex">
                  <div className="flex flex-1 items-center px-3">
                    <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold leading-none text-neutral-900 whitespace-nowrap">
                      {it.label}
                    </span>
                  </div>
                  <SmartImage
                    src={
                      it.image ||
                      products[(idx * 3) % (products.length || 1)]?.image
                    }
                    alt={it.label}
                    wrapperClassName="h-full w-2/5"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* CENTER — main hero */}
          <div className="col-span-6 h-full min-h-0">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted">
              {!slide &&
                (bannerStatus === "error" ? (
                  <ErrorState onRetry={retryBanners} className="h-full" />
                ) : (
                  <Skeleton className="absolute inset-0 h-full w-full" />
                ))}
              {slides.map((s, idx) => (
                <SmartImage
                  key={idx}
                  src={s.img}
                  alt={s.title}
                  eager={idx === 0}
                  wrapperClassName={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-out ${idx === i ? "opacity-100" : "opacity-0"}`}
                  className="object-cover"
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/75" />

              <button
                onClick={() => goTo((i - 1 + slides.length) % slides.length)}
                aria-label="Anterior"
                className="absolute left-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-foreground shadow transition hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => goTo((i + 1) % slides.length)}
                aria-label="Próximo"
                className="absolute right-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-foreground shadow transition hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {slide && (
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">
                    {slide.subtitle}
                  </p>
                  <p className="mt-1.5 font-display text-2xl lg:text-3xl font-black leading-tight drop-shadow line-clamp-1">
                    {slide.title}
                  </p>
                  <p className="mt-1 max-w-md text-xs opacity-90 line-clamp-1">
                    {slide.caption}
                  </p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <button className="rounded-full bg-white px-4 py-1.5 text-[11px] font-bold text-foreground transition hover:bg-white/90">
                      {slide.cta}
                    </button>
                    <div className="flex gap-1.5">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => goTo(idx)}
                          className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT column — 3 stacked brand/category tiles */}
          <div className="col-span-3 flex min-h-0 flex-col gap-3">
            {cfg.heroRightTiles.map((it, idx) => (
              <Link
                key={it.id}
                to={it.slug ? "/category/$slug" : "/categories"}
                params={it.slug ? { slug: it.slug } : undefined}
                className="group relative min-h-0 flex-1 overflow-hidden rounded-xl bg-neutral-800"
              >
                <SmartImage
                  src={
                    it.image ||
                    products[(idx * 4 + 1) % (products.length || 1)]?.image
                  }
                  alt={it.label}
                  wrapperClassName="absolute inset-0 h-full w-full"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 rounded-sm bg-white/95 px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-neutral-900">
                  {it.label}
                </span>
                {it.badge && (
                  <span className="absolute bottom-2 right-3 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-white">
                    {it.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick category strip */}
      {cfg.showQuickStrip && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-3 md:px-0">
          <div
            className="relative shrink-0 overflow-hidden rounded-xl"
            style={{
              width: 110,
              height: 140,
              background: "var(--gradient-sale)",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center px-2 text-center text-white">
              <span className="text-[10px] uppercase tracking-wide opacity-80">
                A partir de
              </span>
              <span className="font-display text-3xl font-black drop-shadow">
                {cfg.quickStripSaverPrice}
              </span>
              <span className="mt-1 text-[10px] font-semibold">
                {cfg.quickStripSaverLabel}
              </span>
            </div>
          </div>
          {cfg.quickStripItems.map((item, idx) => (
            <div
              key={item.id}
              className="relative shrink-0 overflow-hidden rounded-xl bg-muted"
              style={{ width: 110, height: 140 }}
            >
              <SmartImage
                src={
                  item.image ??
                  products[(idx + 1) % (products.length || 1)]?.image
                }
                alt={item.label}
                wrapperClassName="h-full w-full"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/70 py-1 text-center text-[11px] font-medium text-white">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Categories grid — triangle tiles */}
      {cfg.showCategories && (
        <div className="mt-4 px-3 md:px-0">
          <div className="rounded-2xl bg-card p-3 shadow-[var(--shadow-card)]">
            {cfg.categoriesTitle && (
              <h3 className="mb-2 px-1 font-display text-sm font-black">
                {cfg.categoriesTitle}
              </h3>
            )}
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
              {catStatus === "loading" &&
                !tabCats.length &&
                Array.from({ length: 8 }).map((_, k) => (
                  <div
                    key={`cs-${k}`}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-full" />
                    <Skeleton className="h-2.5 w-12" />
                  </div>
                ))}
              {tabCats.map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className="relative h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-full bg-gradient-to-br from-muted to-accent">
                    {c.image ? (
                      <SmartImage
                        src={c.image}
                        alt={c.name}
                        rounded="rounded-full"
                        wrapperClassName="h-full w-full"
                        className="object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-2xl">
                        {c.emoji}
                      </span>
                    )}
                  </div>
                  <span className="text-center text-[10px] md:text-xs leading-tight">
                    {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Super Deals — mobile: single strip */}
      {cfg.showSuperOfertas && (
        <div className="mt-4 px-3 md:hidden">
          <SuperOfertasBlock items={filtered} />
        </div>
      )}

      {/* Desktop: Super Ofertas + Viral do Bazarixy side by side */}
      <div className="mt-4 hidden md:grid grid-cols-2 gap-4">
        {cfg.showSuperOfertas && <SuperOfertasBlock items={filtered} />}
        {cfg.showViral && <ViralBlock items={filtered} />}
      </div>

      <section
        className="mt-5 px-3 md:px-0"
        data-profile-views={signals.viewed.length}
      >
        {prodStatus === "loading" && !filtered.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {Array.from({ length: FEED_PAGE_SIZE }).map((_, k) => (
              <div key={`ps-${k}`}>
                <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                <Skeleton className="mt-2 h-3 w-4/5" />
                <Skeleton className="mt-1.5 h-3 w-1/3" />
              </div>
            ))}
          </div>
        ) : prodStatus === "error" && !filtered.length ? (
          <ErrorState onRetry={retryProducts} className="py-12" />
        ) : visibleFeedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {visibleFeedProducts.map((p, i) => (
              <div key={p.id}>
                <ProductCard
                  product={p}
                  aspect={
                    i % 3 === 1
                      ? "aspect-[3/4.6]"
                      : i % 3 === 2
                        ? "aspect-[3/3.4]"
                        : "aspect-[3/4]"
                  }
                />
              </div>
            ))}
            <div ref={feedEndRef} className="h-8 w-full" aria-hidden="true" />
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Nenhum produto publicado em{" "}
            <span className="font-semibold">{active.label}</span> por enquanto.
          </p>
        )}
      </section>
    </Layout>
  );
}

function SuperOfertasBlock({ items }: { items: Product[] }) {
  return (
    <div>
      <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-orange-50 to-pink-50 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-lg font-black text-sale">
            Super
          </span>
          <Zap className="h-4 w-4 fill-sale text-sale" />
          <span className="font-display text-lg font-black">Ofertas</span>
        </div>
        <Link to="/categories" className="text-xs text-muted-foreground">
          Ver tudo ›
        </Link>
      </div>
      <div className="no-scrollbar -mt-px flex gap-2 overflow-x-auto rounded-b-2xl bg-gradient-to-b from-pink-50 to-background p-3">
        {items.slice(0, 6).map((p) => (
          <Link
            key={p.id}
            to="/product/$id"
            params={{ id: p.id }}
            className="shrink-0"
            style={{ width: 120 }}
          >
            <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
              <SmartImage
                src={p.image}
                alt={p.name}
                wrapperClassName="h-full w-full"
                className="object-cover"
              />
            </div>
            <p className="mt-1 text-xs font-bold text-sale">
              {formatKz(p.price)}
            </p>
            {p.oldPrice && (
              <span className="mt-0.5 inline-block rounded-sm bg-sale/10 px-1 py-0.5 text-[9px] font-bold text-sale">
                -{Math.round((1 - p.price / p.oldPrice) * 100)}%
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ViralBlock({ items }: { items: Product[] }) {
  const viral = [...items].sort((a, b) => b.sold - a.sold).slice(0, 6);
  return (
    <div>
      <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-purple-100 to-fuchsia-100 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <Zap className="h-4 w-4 fill-purple-600 text-purple-600" />
          <span className="font-display text-lg font-black text-purple-700">
            Viral do{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Bazarixy
            </span>
          </span>
        </div>
        <Link to="/categories" className="text-xs text-muted-foreground">
          Ver tudo ›
        </Link>
      </div>
      <div className="no-scrollbar -mt-px flex gap-2 overflow-x-auto rounded-b-2xl bg-gradient-to-b from-purple-50 to-background p-3">
        {viral.map((p) => (
          <Link
            key={p.id}
            to="/product/$id"
            params={{ id: p.id }}
            className="shrink-0"
            style={{ width: 120 }}
          >
            <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
              <SmartImage
                src={p.image}
                alt={p.name}
                wrapperClassName="absolute inset-0 h-full w-full"
                className="object-cover"
              />
              <span className="absolute left-1 top-1 rounded-full bg-purple-600 px-1.5 py-0.5 text-[9px] font-black text-white">
                VIRAL
              </span>
            </div>
            <p className="mt-1 text-xs font-bold text-purple-700">
              {formatKz(p.price)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ErrorState({
  onRetry,
  className = "",
}: {
  onRetry: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-xl bg-muted/50 text-center ${className}`}
    >
      <p className="text-xs text-muted-foreground">
        Não foi possível carregar os dados.
      </p>
      <button
        onClick={onRetry}
        className="rounded-full bg-foreground px-4 py-1.5 text-[11px] font-bold text-background"
      >
        Tentar novamente
      </button>
    </div>
  );
}
