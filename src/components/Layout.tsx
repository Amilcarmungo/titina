import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ShoppingCart, User, Heart, ChevronLeft, Menu, LayoutGrid } from "lucide-react";
import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { actions, useStore } from "@/lib/store";
import { useHomeConfig, useActiveHomeTab, setActiveHomeTab } from "@/lib/home-config";
import { useUnreadCount } from "@/lib/notifications-store";
import { useSlides, useBannerIndex } from "@/lib/banner";
import { SearchIcon } from "@/components/SearchIcon";
import { MobileMenu } from "@/components/MobileMenu";
import { LoginModal } from "@/components/LoginModal";
import { CartDrawer, FavoritesDrawer, ProfileDrawer, NotificationsDrawer } from "@/components/SideDrawers";
import { requireAuth } from "@/lib/auth-guard";
import LOGO from "../../logotipo.webp";


/** Coração das notificações: só fica dourado (e a piscar) quando há avisos novos. */
export function NotificationBell({ count, className = "" }: { count: number; className?: string }) {
  const has = count > 0;
  return (
    <span className={`relative inline-grid place-items-center ${className}`}>
      <Heart
        className={
          has
            ? "h-5 w-5 fill-gold text-gold animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.65)]"
            : "h-5 w-5 fill-none text-current opacity-80"
        }
        strokeWidth={2.2}
      />
      {has && (
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-pulse rounded-full bg-brand-strong ring-2 ring-background" />
      )}
    </span>
  );
}

export function Layout({
  children,
  title,
  showBack,
  transparentHeader = false,
  hideBottomNav = false,
  hideHeader = false,
  hideTopNav = false,
  simpleHeader = false,
}: {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  transparentHeader?: boolean;
  hideBottomNav?: boolean;
  hideHeader?: boolean;
  hideTopNav?: boolean;
  /** Cabeçalho limpo: só o botão voltar e o logo (usado em Sacola, Configurações…). */
  simpleHeader?: boolean;
}) {
  const { cart, user, menuOpen } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const unread = useUnreadCount();
  const idx = useBannerIndex();
  const slides = useSlides();
  const cfg = useHomeConfig();
  const activeTab = useActiveHomeTab();

  const slide = slides[idx] ?? slides[0];

  /** Exactamente as mesmas abas do banner da home — e sincronizadas com ele. */
  const navTabs = cfg.homeTabs.length ? cfg.homeTabs : [{ id: "t-all", label: "Tudo", slugs: [] as string[] }];
  const selectTab = (index: number) => {
    setActiveHomeTab(index);
    if (pathname !== "/") window.location.assign("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** O carrinho abre sempre a página normal (sem gaveta lateral). */
  const openCart = (e: MouseEvent) => {
    if (!requireAuth(user)) { e.preventDefault(); return; }
  };

  const [scrolled, setScrolled] = useState(false);
  const setMenuOpen = (v: boolean) => actions.setMenu(v);
  /** Notifications: right-side drawer on desktop, full page on mobile. */
  const openNotifications = (e: MouseEvent) => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      e.preventDefault();
      actions.openNotifDrawer();
    }
  };
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerPositionCls = transparentHeader ? "absolute" : "sticky";

  return (
    <div className={`min-h-screen bg-background ${hideBottomNav ? "" : "pb-16 md:pb-0"}`}>
      {!hideTopNav && (
      <div className="hidden md:block sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-2">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center">
            <BrandLogo className="h-10" />
          </Link>
          <div className="ml-auto flex flex-1 items-center justify-end gap-3">
            <Link to="/categories" className="hidden lg:flex flex-1 max-w-md items-center gap-2 rounded-full border border-brand-strong/50 bg-brand/25 px-4 py-2 text-sm text-brand-foreground transition hover:bg-brand/40">
              <SearchIcon className="h-4 w-4 text-brand-strong" />
              <span className="flex-1 truncate">Buscar em Bazarixy…</span>
              <span className="grid h-6 w-8 place-items-center rounded-full bg-brand-strong text-white">
                <SearchIcon className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link to="/notifications" onClick={openNotifications} aria-label="Notificações" className="relative p-2">
              <NotificationBell count={unread} />
            </Link>
            <Link to="/cart" onClick={openCart} className="relative p-2" aria-label="Carrinho">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground">{cartCount}</span>
              )}
            </Link>
            {user ? (
              <Link
                to="/me"
                onClick={(e) => {
                  if (window.matchMedia("(min-width: 768px)").matches) {
                    e.preventDefault();
                    actions.openProfileDrawer();
                  }
                }}
                className="p-2"
              >
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <button onClick={() => actions.openLogin()} className="p-2" aria-label="Entrar"><User className="h-5 w-5" /></button>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Mobile header */}
      {!hideHeader && simpleHeader && (
        <header className="sticky top-0 left-0 right-0 z-40 border-b border-border bg-background/95 backdrop-blur md:hidden">
          <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-3">
            <button onClick={() => window.history.back()} className="-ml-1 justify-self-start p-1.5" aria-label="Voltar">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <Link to="/" className="justify-self-center">
              <BrandLogo className="h-8" />
            </Link>
            <span aria-hidden />
          </div>
        </header>
      )}
      {!hideHeader && !simpleHeader && (
      <header className={`${headerPositionCls} top-0 left-0 right-0 z-40 md:hidden`}>
        <div className="relative">
          {!transparentHeader && (
            <>
              <img src={slide.img} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
            </>
          )}

          <div className="relative grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 text-white">
            <div className="flex items-center gap-1 justify-self-start">
              {showBack ? (
                <button onClick={() => window.history.back()} className="-ml-1 p-1.5" aria-label="Voltar">
                  <ChevronLeft className="h-5 w-5" />
                </button>
              ) : (
                <button onClick={() => setMenuOpen(true)} aria-label="Menu" className="p-1.5">
                  <Menu className="h-5 w-5" />
                </button>
              )}
              <Link to="/notifications" aria-label="Notificações" className="relative p-1.5">
                <NotificationBell count={unread} />
              </Link>
            </div>

            <div className="justify-self-center">
              {title ? (
                <h1 className="truncate text-base font-semibold drop-shadow">{title}</h1>
              ) : (
                <Link to="/" className="flex items-center">
                  <BrandLogo className="h-9 drop-shadow-lg" />
                </Link>
              )}
            </div>

            <div className="flex items-center gap-1 justify-self-end">
              <Link to="/categories" aria-label="Buscar" className="p-1.5">
                <SearchIcon className="h-5 w-5" />
              </Link>
              <Link to="/cart" onClick={openCart} className="relative p-1.5" aria-label="Carrinho">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground">{cartCount}</span>
                )}
              </Link>
            </div>
          </div>

          {/* Category tabs (same list as the banner) */}
          {!transparentHeader && (
            <div className="no-scrollbar relative overflow-x-auto">
              <div className="flex gap-5 px-3 pb-2">
                {navTabs.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => selectTab(i)}
                    className={`relative whitespace-nowrap text-sm font-bold drop-shadow ${i === activeTab ? "text-white after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-white" : "text-white/80"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
      )}

      {/* Home-only: sticky white search header that reveals after the user scrolls past the banner */}
      {transparentHeader && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border md:hidden transition-all duration-300 ${scrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
        >
          <div className="flex items-center gap-2 px-3 pt-2 pb-2">
            <button onClick={() => setMenuOpen(true)} aria-label="Menu" className="p-1.5"><Menu className="h-5 w-5" strokeWidth={2.2} /></button>
            <Link to="/notifications" aria-label="Notificações" className="relative p-1.5">
              <NotificationBell count={unread} />
            </Link>
            <Link
              to="/categories"
              className="flex-1 flex items-center gap-2 rounded-full border border-foreground/80 pl-3 pr-1 py-1 text-sm"
            >
              <span className="flex-1 truncate text-foreground/70">acessórios de cabelo</span>
              <span className="grid h-7 w-9 place-items-center rounded-full bg-brand text-brand-foreground">
                <SearchIcon className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>
            <Link to="/cart" className="relative p-1.5" aria-label="Carrinho">
              <ShoppingCart className="h-5 w-5" strokeWidth={2.2} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground">{cartCount}</span>
              )}
            </Link>
          </div>
          <div className="no-scrollbar overflow-x-auto">
            <div className="flex gap-5 px-3 pb-2">
              {navTabs.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => selectTab(i)}
                  className={`relative whitespace-nowrap text-sm font-bold ${i === activeTab ? "text-foreground after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-brand-strong" : "text-foreground/85"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className={hideTopNav && hideHeader ? "mx-auto w-full max-w-[980px] px-0 py-0 md:px-0 md:py-0" : "mx-auto md:max-w-7xl md:px-6 md:py-6"}>{children}</main>

      {/* Mobile bottom nav */}
      {!hideBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden">
          <div className="grid grid-cols-4">
            {[
              { to: "/", icon: Home, label: "Loja" },
              { to: "/categories", icon: LayoutGrid, label: "Categorias" },
              { to: "/cart", icon: ShoppingCart, label: "Carrinho" },
              { to: "/me", icon: User, label: "Eu" },
            ].map((it) => {
              const active = pathname === it.to;
              const Icon = it.icon;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`relative flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] ${active ? "text-brand-strong" : "text-muted-foreground"}`}
                >
                  <span className="relative">
                    <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.8} />
                    {it.to === "/cart" && cartCount > 0 && (
                      <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-brand-foreground">{cartCount}</span>
                    )}
                  </span>
                  <span className={active ? "font-semibold" : ""}>{it.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
      <LoginModal />
      <CartDrawer />
      <FavoritesDrawer />
      <ProfileDrawer />
      <NotificationsDrawer />
    </div>
  );
}

/** Mantém a marca visível mesmo se um asset legado do Lovable não estiver disponível. */
function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <img src={LOGO} alt="Bazarixy" className="h-full w-auto" onError={(event) => {
        event.currentTarget.style.display = "none";
        event.currentTarget.nextElementSibling?.classList.remove("hidden");
      }} />
      <span className="hidden font-display text-xl font-black tracking-tight text-brand-strong">Bazarixy</span>
    </span>
  );
}
