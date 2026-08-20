import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { actions, useStore } from "@/lib/store";
import { getAnyProduct as getProduct } from "@/lib/products-store";
import { formatKz } from "@/lib/format";
import {
  Minus, Plus, Trash2, ShoppingCart, Heart, X,
  User, Settings, Package, Wallet, LogOut, ChevronRight, Ticket, Gift,
} from "lucide-react";
import { useNotifications, notificationActions } from "@/lib/notifications-store";
import { Truck, Sparkles, Info, CheckCheck } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";

/** Desktop notifications drawer — slides in from the right. */
export function NotificationsDrawer() {
  const { notifDrawerOpen } = useStore();
  const items = useNotifications();
  const unread = items.filter((n) => !n.read).length;
  const ICONS = { order: Package, delivery: Truck, coupon: Ticket, product: Sparkles, system: Info } as const;

  return (
    <Sheet open={notifDrawerOpen} onOpenChange={(o) => (o ? actions.openNotifDrawer() : actions.closeNotifDrawer())}>
      <SheetContent side="right" className="w-[400px] sm:max-w-[400px] flex flex-col p-0 gap-0">
        <SheetHeader className="border-b border-border px-4 py-3 flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-base flex items-center gap-2">
            <Heart className={`h-4 w-4 ${unread ? "fill-gold/30 text-gold" : ""}`} /> Notificações
            {unread > 0 && <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-brand-foreground">{unread}</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length > 0 && (
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <button
              onClick={() => notificationActions.markAllRead()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted"
            >
              <CheckCheck className="h-3.5 w-3.5" /> Marcar tudo como lido
            </button>
            <Link to="/notifications" onClick={() => actions.closeNotifDrawer()} className="ml-auto text-xs font-bold text-muted-foreground hover:text-foreground">
              Ver tudo
            </Link>
          </div>
        )}

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <Heart className="h-14 w-14 text-muted-foreground" strokeWidth={1.2} />
            <p className="mt-3 font-bold">Sem notificações</p>
            <p className="mt-1 text-xs text-muted-foreground">Avisamos aqui sobre pedidos, entregas e cupões.</p>
          </div>
        ) : (
          <div className="flex-1 divide-y divide-border overflow-y-auto">
            {items.map((n) => {
              const Icon = ICONS[n.kind] ?? Info;
              const body = (
                <div className={`flex gap-3 px-4 py-3 ${n.read ? "" : "bg-brand/10"}`}>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${n.read ? "bg-muted text-muted-foreground" : "bg-gold/20 text-gold"}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{n.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.body}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{n.createdAt}</p>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); notificationActions.remove(n.id); }}
                    aria-label="Remover notificação"
                    className="self-start p-1 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
              if (!n.href) return <div key={n.id}>{body}</div>;
              return (
                <Link key={n.id} to={n.href} onClick={() => { notificationActions.markRead(n.id); actions.closeNotifDrawer(); }} className="block hover:bg-muted/40">
                  {body}
                </Link>
              );
            })}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

/** Desktop mini cart drawer — opens as a slim panel from the left. */
export function CartDrawer() {
  const { cart, cartDrawerOpen } = useStore();
  const items = cart.map((c) => ({ ...c, product: getProduct(c.id)! })).filter((i) => i.product);
  const subtotal = items.reduce((s, i) => s + (i.unitPrice ?? i.product.price) * i.qty, 0);

  return (
    <Sheet open={cartDrawerOpen} onOpenChange={(o) => (o ? actions.openCartDrawer() : actions.closeCartDrawer())}>
      <SheetContent side="right" className="w-[380px] sm:max-w-[380px] flex flex-col p-0 gap-0">
        <SheetHeader className="border-b border-border px-4 py-3 flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-base flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" /> Seu Carrinho · {items.length}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingCart className="h-14 w-14 text-muted-foreground" strokeWidth={1.2} />
            <p className="mt-3 font-bold">Sua sacola está vazia</p>
            <Link
              to="/"
              onClick={() => actions.closeCartDrawer()}
              className="mt-4 rounded-full bg-foreground px-6 py-2 text-xs font-bold text-background"
            >
              Explorar produtos
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 rounded-lg border border-border p-2">
                  <SmartImage src={item.product.image} alt={item.product.name} rounded="rounded" wrapperClassName="h-20 w-16 shrink-0" className="object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="line-clamp-2 text-xs">{item.product.name}</h3>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{item.size}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-bold text-sale">{formatKz(item.unitPrice ?? item.product.price)}</span>
                      <div className="flex items-center rounded-full border border-border">
                        <button onClick={() => actions.updateQty(idx, item.qty - 1)} className="grid h-6 w-6 place-items-center"><Minus className="h-3 w-3" /></button>
                        <span className="w-5 text-center text-xs">{item.qty}</span>
                        <button onClick={() => actions.updateQty(idx, item.qty + 1)} className="grid h-6 w-6 place-items-center"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => actions.removeFromCart(idx)} className="self-start p-1 text-muted-foreground">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-sale">{formatKz(subtotal)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => actions.closeCartDrawer()}
                className="block w-full rounded-full py-2.5 text-center text-sm font-bold text-white"
                style={{ background: "var(--gradient-gold)" }}
              >
                Finalizar Compra
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

/** Desktop favorites drawer — opens as a slim panel from the left. */
export function FavoritesDrawer() {
  const { favorites, favDrawerOpen } = useStore();
  const items = favorites.map((id) => getProduct(id)).filter(Boolean);

  return (
    <Sheet open={favDrawerOpen} onOpenChange={(o) => (o ? actions.openFavDrawer() : actions.closeFavDrawer())}>
      <SheetContent side="right" className="w-[380px] sm:max-w-[380px] flex flex-col p-0 gap-0">
        <SheetHeader className="border-b border-border px-4 py-3 flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-base flex items-center gap-2">
            <Heart className="h-4 w-4" /> Favoritos · {items.length}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <Heart className="h-14 w-14 text-muted-foreground" strokeWidth={1.2} />
            <p className="mt-3 font-bold">Está vazio aqui.</p>
            <Link
              to="/"
              onClick={() => actions.closeFavDrawer()}
              className="mt-4 rounded-full bg-foreground px-6 py-2 text-xs font-bold text-background"
            >
              Comprar agora
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 gap-2">
            {items.map((p) => p && (
              <Link
                key={p.id}
                to="/product/$id"
                params={{ id: p.id }}
                onClick={() => actions.closeFavDrawer()}
                className="overflow-hidden rounded-lg border border-border"
              >
                <div className="relative aspect-square bg-muted">
                  <SmartImage src={p.image} alt={p.name} wrapperClassName="absolute inset-0 h-full w-full" className="object-cover" />
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); actions.toggleFavorite(p.id); }}
                    className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-white/90"
                    aria-label="Remover"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="p-1.5">
                  <p className="line-clamp-2 text-[11px]">{p.name}</p>
                  <p className="mt-0.5 text-xs font-bold text-sale">{formatKz(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

/** Desktop profile drawer — opens as a slim panel from the right. */
export function ProfileDrawer() {
  const { user, profileDrawerOpen, cart, favorites } = useStore();
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <Sheet open={profileDrawerOpen} onOpenChange={(o) => (o ? actions.openProfileDrawer() : actions.closeProfileDrawer())}>
      <SheetContent side="right" className="w-[380px] sm:max-w-[380px] flex flex-col p-0 gap-0">
        <SheetHeader className="border-b border-border px-4 py-3 flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" /> Minha Conta
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-foreground text-background font-bold">{user.email[0]?.toUpperCase()}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{user.email}</p>
                <p className="text-[11px] text-muted-foreground">Bazarixy Member</p>
              </div>
            </div>
          ) : (
            <button onClick={() => { actions.closeProfileDrawer(); actions.openLogin(); }} className="w-full rounded-full bg-foreground py-2.5 text-sm font-bold text-background">
              Entrar / Cadastrar
            </button>
          )}

          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { icon: ShoppingCart, label: "Carrinho", value: cartCount },
              { icon: Heart, label: "Avisos", value: favorites.length },
              { icon: Gift, label: "Cupons", value: 2 },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border p-2">
                <s.icon className="mx-auto h-4 w-4" />
                <p className="mt-1 text-sm font-black">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border divide-y divide-border">
            <Link to="/orders" search={{ tab: "unpaid" as const }} onClick={() => actions.closeProfileDrawer()} className="flex items-center gap-3 px-3 py-3 text-sm hover:bg-muted/50">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Meus pedidos</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/wallet" onClick={() => actions.closeProfileDrawer()} className="flex items-center gap-3 px-3 py-3 text-sm hover:bg-muted/50">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Carteira</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/me" onClick={() => actions.closeProfileDrawer()} className="flex items-center gap-3 px-3 py-3 text-sm hover:bg-muted/50">
              <Ticket className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Cupons & Pontos</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link to="/settings" onClick={() => actions.closeProfileDrawer()} className="flex items-center gap-3 px-3 py-3 text-sm hover:bg-muted/50">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">Configurações</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>


          {user && (
            <button
              onClick={() => { actions.signOut(); actions.closeProfileDrawer(); }}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-bold text-red-600"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
