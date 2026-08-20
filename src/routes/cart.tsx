import { formatKz } from "@/lib/format";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { getAnyProduct, useAllProducts } from "@/lib/products-store";
import { useShops } from "@/lib/shops-store";
import { actions, useStore } from "@/lib/store";
import { Minus, Plus, Trash2, ShoppingCart, Check, Store as StoreIcon, Sparkles } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { ProductCard } from "@/components/ProductCard";


export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Sacola — Bazarixy" },
      { name: "description", content: "Reveja os produtos da sua sacola, escolha o que quer pagar agora e finalize a compra na Bazarixy." },
      { property: "og:title", content: "Sacola — Bazarixy" },
      { property: "og:description", content: "Seleccione os itens que quer pagar e finalize a compra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition ${
        checked ? "border-sale bg-sale text-white" : "border-muted-foreground/40 bg-background"
      }`}
    >
      {checked && <Check className="h-3 w-3" strokeWidth={3.5} />}
    </button>
  );
}

/**
 * «Talvez goste também» — recomendações a partir das categorias dos itens da
 * sacola (ou os mais recentes, quando a sacola está vazia).
 */
function Recommendations({ excludeIds, categories }: { excludeIds: string[]; categories: string[] }) {
  const all = useAllProducts();
  if (!all.length) return null;

  const pool = all.filter((p) => !excludeIds.includes(p.id));
  const sameCat = pool.filter((p) => categories.some((c) => (p.category ?? "").toLowerCase() === c.toLowerCase()));
  const list = [...sameCat, ...pool.filter((p) => !sameCat.includes(p))].slice(0, 8);
  if (!list.length) return null;

  return (
    <section className="mt-6 px-3">
      <h2 className="flex items-center gap-2 text-base font-black">
        <Sparkles className="h-4 w-4 text-brand-strong" /> Talvez goste também
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function CartPage() {

  const { cart } = useStore();
  const shops = useShops();

  const items = cart
    .map((c, idx) => ({ ...c, idx, selected: c.selected !== false, product: getAnyProduct(c.id)! }))
    .filter((i) => i.product);

  const groups = shops
    .map((s) => ({ shop: s, list: items.filter((i) => (i.product.shopId ?? "main") === s.id) }))
    .filter((g) => g.list.length > 0);
  const ungrouped = items.filter((i) => !shops.some((s) => s.id === (i.product.shopId ?? "main")));
  if (ungrouped.length) groups.push({ shop: { id: "outros", name: "Outras lojas", slug: "outros", createdAt: "" }, list: ungrouped });

  const selected = items.filter((i) => i.selected);
  const subtotal = selected.reduce((s, i) => s + (i.unitPrice ?? i.product.price) * i.qty, 0);
  const allSelected = items.length > 0 && selected.length === items.length;

  return (
    <Layout simpleHeader hideBottomNav>
      {items.length === 0 ? (
        <div className="mx-auto max-w-5xl pb-16">
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" strokeWidth={1.2} />
            <p className="mt-4 font-display text-xl font-bold">Sua sacola está vazia</p>
            <p className="mt-1 text-sm text-muted-foreground">Adicione produtos para continuar</p>
            <Link to="/" className="mt-6 rounded-full bg-brand px-8 py-2.5 text-sm font-bold text-brand-foreground">
              Explorar produtos
            </Link>
          </div>
          <Recommendations excludeIds={[]} categories={[]} />
        </div>

      ) : (
        <div className="mx-auto max-w-3xl pb-32">
          <div className="flex items-center gap-3 px-4 py-3">
            <Checkbox checked={allSelected} onChange={() => actions.setAllSelected(!allSelected)} label="Seleccionar tudo" />
            <span className="text-sm font-bold">Seleccionar tudo ({items.length})</span>
            {selected.length > 0 && (
              <button
                onClick={() => { if (confirm(`Remover ${selected.length} item(ns)?`)) actions.removeSelected(); }}
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remover
              </button>
            )}
          </div>

          <div className="space-y-2 px-3">
            {groups.map((g) => (
              <section key={g.shop.id} className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2.5 border-b border-border px-3 py-2.5">
                  <Checkbox
                    checked={g.list.every((i) => i.selected)}
                    onChange={() => {
                      const next = !g.list.every((i) => i.selected);
                      g.list.forEach((i) => { if (i.selected !== next) actions.toggleSelected(i.idx); });
                    }}
                    label={`Seleccionar ${g.shop.name}`}
                  />
                  <StoreIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate text-sm font-black">{g.shop.name}</span>
                </div>

                <div className="divide-y divide-border">
                  {g.list.map((item) => {
                    const price = item.unitPrice ?? item.product.price;
                    return (
                      <div key={item.idx} className="flex gap-3 px-3 py-3">
                        <div className="flex items-center">
                          <Checkbox checked={item.selected} onChange={() => actions.toggleSelected(item.idx)} label={item.product.name} />
                        </div>
                        <SmartImage src={item.image ?? item.product.image} alt={item.product.name} rounded="rounded-lg" wrapperClassName="h-24 w-20 shrink-0" className="object-cover" />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <h3 className="line-clamp-2 text-sm">{item.product.name}</h3>
                          <p className="mt-1 inline-flex items-center gap-1.5 self-start rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                            {item.variantLabel ?? item.size}
                            {item.color && <span className="inline-block h-2.5 w-2.5 rounded-full border border-border" style={{ background: item.color }} />}
                          </p>
                          <div className="mt-auto flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <span className="block font-black text-sale">{formatKz(price)}</span>
                              {item.product.oldPrice && (
                                <span className="block text-[11px] text-muted-foreground line-through">{formatKz(item.product.oldPrice)}</span>
                              )}
                            </div>
                            <div className="flex shrink-0 items-center rounded-full border border-border">
                              <button onClick={() => actions.updateQty(item.idx, item.qty - 1)} aria-label="Diminuir" className="grid h-7 w-7 place-items-center"><Minus className="h-3 w-3" /></button>
                              <span className="w-6 text-center text-sm">{item.qty}</span>
                              <button onClick={() => actions.updateQty(item.idx, item.qty + 1)} aria-label="Aumentar" className="grid h-7 w-7 place-items-center"><Plus className="h-3 w-3" /></button>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => actions.removeFromCart(item.idx)} aria-label="Remover" className="self-start p-1 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="mx-3 mt-2 space-y-2 rounded-2xl bg-card p-4 text-sm shadow-[var(--shadow-card)]">
            <div className="flex justify-between"><span className="text-muted-foreground">Itens seleccionados</span><span>{selected.length}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span>Grátis</span></div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-black"><span>Total</span><span className="text-sale">{formatKz(subtotal)}</span></div>
          </div>

          <Recommendations
            excludeIds={items.map((i) => i.id)}
            categories={items.map((i) => i.product.category ?? "").filter(Boolean)}
          />



          <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background px-3 py-2.5">
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <Checkbox checked={allSelected} onChange={() => actions.setAllSelected(!allSelected)} label="Seleccionar tudo" />
              <div className="min-w-0">
                <div className="text-[11px] text-muted-foreground">Total</div>
                <div className="truncate font-black text-sale">{formatKz(subtotal)}</div>
              </div>
              {selected.length === 0 ? (
                <span className="ml-auto rounded-full bg-muted px-8 py-3 text-center text-sm font-bold text-muted-foreground">Continuar (0)</span>
              ) : (
                <Link
                  to="/checkout"
                  className="ml-auto rounded-full bg-brand px-8 py-3 text-center text-sm font-black text-brand-foreground"
                >
                  Continuar ({selected.length})
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
