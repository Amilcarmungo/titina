import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutGrid,
  Package,
  ShoppingBag,
  Home as HomeIcon,
  FolderTree,
  Settings,
  CreditCard,
  Menu,
  X,
  LogOut,
  Store as StoreIcon,
  Search,
  Heart,
  Truck,
  TrendingUp,
  Ticket,
  Target,
  Users,
  ShieldCheck,
} from "lucide-react";

import logoAsset from "@/assets/bazarixy-logo.webp.asset.json";
import { AdminGate } from "@/components/admin/AdminGate";
import {
  ROLE_LABEL,
  can,
  useStaff,
  type Permission,
} from "@/lib/firebase/roles";
import { signOutUser } from "@/lib/firebase/auth";
import { watchOrders } from "@/lib/firebase/orders";
import { useStore } from "@/lib/store";
import { setOrdersOwner } from "@/lib/orders-store";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Bazarixy" },
      {
        name: "description",
        content:
          "Painel de administração — banners, produtos, categorias, pedidos, lojas.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminShell,
});

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutGrid;
  exact?: boolean;
  perm?: Permission;
};
type NavGroup = { title: string; items: NavItem[] };

const GROUPS: NavGroup[] = [
  {
    title: "Visão geral",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutGrid, exact: true },
      {
        to: "/admin/receita",
        label: "Receita total",
        icon: TrendingUp,
        perm: "settings.write",
      },
      {
        to: "/admin/metas",
        label: "Metas",
        icon: Target,
        perm: "settings.write",
      },
    ],
  },
  {
    title: "Loja",
    items: [
      {
        to: "/admin/produtos",
        label: "Produtos",
        icon: Package,
        perm: "catalog.write",
      },
      {
        to: "/admin/categorias",
        label: "Categorias",
        icon: FolderTree,
        perm: "catalog.write",
      },
      {
        to: "/admin/pedidos",
        label: "Pedidos",
        icon: ShoppingBag,
        perm: "orders.status",
      },
      {
        to: "/admin/lojas",
        label: "Lojas",
        icon: StoreIcon,
        perm: "catalog.write",
      },
    ],
  },
  {
    title: "Pessoas",
    items: [
      {
        to: "/admin/usuarios",
        label: "Usuários",
        icon: Users,
        perm: "orders.status",
      },
      {
        to: "/admin/equipa",
        label: "Equipa",
        icon: ShieldCheck,
        perm: "staff.manage",
      },
    ],
  },
  {
    title: "Conteúdo",
    items: [
      {
        to: "/admin/home",
        label: "Página inicial",
        icon: HomeIcon,
        perm: "catalog.write",
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        to: "/admin/cupons",
        label: "Cupons",
        icon: Ticket,
        perm: "catalog.write",
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        to: "/admin/logistica",
        label: "Logística & fretes",
        icon: Truck,
        perm: "settings.write",
      },
      {
        to: "/admin/pagamentos",
        label: "Pagamentos",
        icon: CreditCard,
        perm: "settings.write",
      },
      {
        to: "/admin/config",
        label: "Configurações",
        icon: Settings,
        perm: "settings.write",
      },
    ],
  },
];

function AdminShell() {
  return (
    <AdminGate>
      <AdminLayout />
    </AdminGate>
  );
}

function AdminLayout() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { staff } = useStaff();
  const { user } = useStore();

  // A equipa acompanha todos os pedidos em tempo real (modo equipa).
  useEffect(() => {
    if (!staff || !user?.uid) return;
    setOrdersOwner(user.uid, true);
    const stop = watchOrders(user.uid, true);
    return () => {
      stop();
      setOrdersOwner(user.uid ?? null, false);
    };
  }, [staff, user?.uid]);

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 via-background to-muted/20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-3 backdrop-blur-xl md:px-6">
        <button
          onClick={() => setOpen(true)}
          className="grid h-9 w-9 place-items-center rounded-lg hover:bg-muted md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden h-9 w-9 place-items-center rounded-lg hover:bg-muted md:grid"
          aria-label={
            collapsed ? "Mostrar menu lateral" : "Esconder menu lateral"
          }
          title={collapsed ? "Mostrar menu" : "Esconder menu"}
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/admin" className="flex items-center gap-2.5">
          <img src={logoAsset.url} alt="Bazarixy" className="h-7 w-auto" />
          <span className="hidden sm:inline rounded-full bg-foreground px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-background">
            Admin
          </span>
        </Link>
        <div className="hidden md:flex ml-6 items-center gap-2 rounded-full border border-border bg-muted/40 px-3.5 py-2 text-sm text-muted-foreground w-72">
          <Search className="h-4 w-4" />
          <span className="text-xs">Pesquisar…</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="grid h-9 w-9 place-items-center rounded-lg hover:bg-muted">
            <Heart className="h-4 w-4 fill-gold text-gold" />
          </button>
          <Link
            to="/"
            className="rounded-full border border-border px-3.5 py-1.5 text-xs font-bold hover:bg-muted"
          >
            Ver loja
          </Link>
          {staff && (
            <span className="hidden sm:inline rounded-full bg-brand/30 px-2.5 py-1 text-[10px] font-bold text-brand-strong">
              {ROLE_LABEL[staff.role]}
            </span>
          )}
          <div
            title={user?.email ?? ""}
            className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-foreground to-foreground/70 text-xs font-black text-background"
          >
            {(user?.email?.[0] ?? "B").toUpperCase()}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside
          className={`hidden md:flex sticky top-16 h-[calc(100vh-4rem)] shrink-0 flex-col overflow-y-auto overflow-x-hidden border-r border-border/60 bg-background/40 transition-all duration-300 ${
            collapsed ? "w-[68px] p-2" : "w-64 p-3"
          }`}
        >
          <SideNav isActive={isActive} collapsed={collapsed} />
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-full w-72 max-w-[80%] bg-background p-3 shadow-2xl overflow-y-auto">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-lg font-black">
                  Menu Admin
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-md hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <SideNav isActive={isActive} onNavigate={() => setOpen(false)} />
            </aside>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 p-3 md:p-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function SideNav({
  isActive,
  onNavigate,
  collapsed,
}: {
  isActive: (to: string, exact?: boolean) => boolean;
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  const { staff } = useStaff();
  const groups = GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((n) => !n.perm || can(staff, n.perm)),
  })).filter((g) => g.items.length > 0);
  return (
    <nav className="flex flex-col gap-5 text-sm">
      {groups.map((g) => (
        <div key={g.title}>
          {!collapsed && (
            <p className="mb-1.5 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {g.title}
            </p>
          )}
          <div className="flex flex-col gap-0.5">
            {g.items.map((n) => {
              const active = isActive(n.to, n.exact);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={onNavigate}
                  title={n.label}
                  className={`group flex items-center gap-3 rounded-xl py-2.5 font-medium transition ${collapsed ? "justify-center px-0" : "px-3"} ${
                    active
                      ? "bg-foreground text-background shadow-lg shadow-foreground/20"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <n.icon
                    className={`h-4 w-4 ${active ? "" : "text-muted-foreground group-hover:text-foreground"}`}
                  />
                  {!collapsed && <span className="text-[13px]">{n.label}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          onNavigate?.();
          void signOutUser();
        }}
        title="Sair do admin"
        className={`mt-2 flex items-center gap-3 rounded-xl py-2.5 text-sm text-muted-foreground hover:bg-muted ${collapsed ? "justify-center px-0" : "px-3"}`}
      >
        <LogOut className="h-4 w-4" /> {!collapsed && "Sair do admin"}
      </button>
    </nav>
  );
}
