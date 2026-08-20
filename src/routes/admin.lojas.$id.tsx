import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Package, ShoppingBag, Star, Store as StoreIcon, MessageSquare } from "lucide-react";
import { getShop } from "@/lib/shops-store";
import { useAllProducts } from "@/lib/products-store";
import { useOrders } from "@/lib/orders-store";
import { useReviews } from "@/lib/reviews";
import { formatKz } from "@/lib/format";
import { AdminTabs } from "@/components/admin/AdminTabs";

export const Route = createFileRoute("/admin/lojas/$id")({
  component: ShopDetail,
});

function ShopDetail() {
  const { id } = useParams({ from: "/admin/lojas/$id" });
  const shop = getShop(id);
  const products = useAllProducts();
  const orders = useOrders();
  const reviews = useReviews();
  const [tab, setTab] = useState("products");

  const shopProducts = useMemo(() => products.filter((p) => (p.shopId ?? "main") === id), [products, id]);
  const productIds = new Set(shopProducts.map((p) => p.id));
  const shopOrders = useMemo(() => orders.filter((o) => o.items.some((i) => productIds.has(i.productId))), [orders, productIds]);
  const shopReviews = useMemo(() => reviews.filter((r) => productIds.has(r.productId)), [reviews, productIds]);

  const revenue = shopOrders.reduce((s, o) => s + o.total, 0);
  const avgRating = shopReviews.length ? (shopReviews.reduce((s, r) => s + r.rating, 0) / shopReviews.length) : 0;

  if (!shop) {
    return (
      <div className="rounded-2xl bg-background p-10 text-center shadow-[var(--shadow-card)]">
        <p className="text-sm text-muted-foreground">Loja não encontrada.</p>
        <Link to="/admin/lojas" className="mt-3 inline-flex text-xs font-bold text-foreground underline">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link to="/admin/lojas" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Todas as lojas
      </Link>

      <div className="overflow-hidden rounded-2xl bg-background shadow-[var(--shadow-card)]">
        <div className="relative aspect-[16/5] bg-gradient-to-br from-muted to-muted/50">
          {shop.cover ? <img src={shop.cover} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-6xl opacity-40"><StoreIcon /></div>}
        </div>
        <div className="relative px-6 pb-5">
          <div className="-mt-10 flex flex-wrap items-end gap-4">
            <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-background ring-4 ring-background shadow-xl">
              {shop.logo ? <img src={shop.logo} alt="" className="h-full w-full object-cover" /> : <StoreIcon className="h-8 w-8 text-muted-foreground" />}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-2xl font-black">{shop.name}</h1>
              <p className="text-xs text-muted-foreground">/{shop.slug} · Responsável: {shop.ownerName || "—"} · Desde {shop.createdAt}</p>
              <p className="mt-1 text-sm text-muted-foreground">{shop.description}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Produtos" value={String(shopProducts.length)} icon={Package} />
            <Stat label="Pedidos" value={String(shopOrders.length)} icon={ShoppingBag} />
            <Stat label="Receita" value={formatKz(revenue)} icon={StoreIcon} />
            <Stat label="Avaliação" value={avgRating ? avgRating.toFixed(1) : "—"} icon={Star} />
          </div>
        </div>
      </div>

      <AdminTabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "products", label: "Produtos", icon: <Package className="h-3.5 w-3.5" />, badge: shopProducts.length },
          { id: "orders", label: "Pedidos", icon: <ShoppingBag className="h-3.5 w-3.5" />, badge: shopOrders.length },
          { id: "reviews", label: "Avaliações", icon: <MessageSquare className="h-3.5 w-3.5" />, badge: shopReviews.length },
        ]}
      />

      {tab === "products" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shopProducts.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]">
              <img src={p.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-bold">{p.name}</p>
                <p className="text-xs font-bold text-sale">{formatKz(p.price)}</p>
              </div>
              <Link to="/admin/produtos" className="text-[11px] font-bold text-muted-foreground hover:text-foreground">Editar</Link>
            </div>
          ))}
          {shopProducts.length === 0 && (
            <div className="col-span-full rounded-2xl bg-background p-10 text-center shadow-[var(--shadow-card)]">
              <p className="text-sm text-muted-foreground">Nenhum produto nesta loja. <Link to="/admin/produtos" className="font-bold text-foreground underline">Adicionar produto</Link></p>
            </div>
          )}
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-2">
          {shopOrders.map((o) => (
            <div key={o.id} className="flex items-center justify-between rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]">
              <div>
                <p className="text-sm font-black">#{o.id}</p>
                <p className="text-[11px] text-muted-foreground">{o.createdAt} · {o.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase text-muted-foreground">{o.status}</p>
                <p className="text-sm font-black text-sale">{formatKz(o.total)}</p>
              </div>
            </div>
          ))}
          {shopOrders.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Nenhum pedido nesta loja.</p>}
        </div>
      )}

      {tab === "reviews" && (
        <div className="space-y-2">
          {shopReviews.map((r) => (
            <div key={r.id} className="rounded-2xl bg-background p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">{r.name}</p>
                <p className="inline-flex items-center gap-0.5 text-xs font-bold text-amber-600">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">{r.createdAt}</p>
            </div>
          ))}
          {shopReviews.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Nenhuma avaliação ainda.</p>}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Package }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}
