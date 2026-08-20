import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  DollarSign,
  Globe,
  X,
  ChevronDown,
  Home,
  Heart,
  Headset,
  User,
} from "lucide-react";
import { useState } from "react";
import { useCategories } from "@/lib/categories-store";
import { useHomeConfig } from "@/lib/home-config";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

const infoLinks: { label: string; to?: string; href?: string }[] = [
  { label: "Suporte", to: "/support" },
  { label: "Info de Envio" },
  { label: "Política de Devolução" },
  { label: "Reembolso" },
  { label: "Como Pagar", to: "/como-pagar" },
  { label: "Centro de Privacidade" },
  { label: "Cookies" },
];

export function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const categories = useCategories();
  const cfg = useHomeConfig();
  const [tab, setTab] = useState(0);
  const [infoOpen, setInfoOpen] = useState(true);

  /** Same category tabs used no cabeçalho / banner. */
  const topTabs = cfg.homeTabs.length
    ? cfg.homeTabs
    : [{ id: "t-all", label: "Tudo", slugs: [] as string[] }];
  const activeTab = topTabs[Math.min(tab, topTabs.length - 1)];
  const visibleCats = activeTab.slugs.length
    ? categories.filter((c) => activeTab.slugs.includes(c.slug))
    : categories;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[85vw] max-w-sm p-0 flex flex-col gap-0 pb-16"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {/* Top tabs */}
        <div className="flex items-center justify-between border-b border-border pl-2 pr-1">
          <div className="no-scrollbar flex flex-1 gap-5 overflow-x-auto px-2 py-3">
            {topTabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setTab(i)}
                className={`relative whitespace-nowrap text-sm font-bold ${
                  i === tab
                    ? "text-foreground after:absolute after:-bottom-2.5 after:left-0 after:right-0 after:h-0.5 after:bg-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="grid h-9 w-9 place-items-center rounded bg-foreground text-background"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Categories list */}
          <ul className="py-1">
            {visibleCats.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-muted">
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={c.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xl">{c.emoji}</span>
                    )}
                  </div>
                  <span className="flex-1 text-[15px] font-medium">
                    {c.name}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
            {visibleCats.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-muted-foreground">
                Sem categorias nesta aba.
              </li>
            )}
          </ul>

          {/* Divider gap */}
          <div className="h-2 bg-muted" />

          {/* Currency / Language */}
          <ul className="divide-y divide-border">
            <li className="flex items-center gap-3 px-4 py-3">
              <DollarSign className="h-5 w-5" />
              <span className="flex-1 text-sm">Alterar Moeda</span>
              <span className="text-xs text-muted-foreground">AOA</span>
            </li>
            <li className="flex items-center gap-3 px-4 py-3">
              <Globe className="h-5 w-5" />
              <span className="flex-1 text-sm">Alterar Idioma</span>
              <span className="text-xs text-muted-foreground">Português</span>
            </li>
          </ul>

          <div className="h-2 bg-muted" />

          {/* Bazarixy Info */}
          <button
            onClick={() => setInfoOpen((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold"
          >
            BAZARIXY Info
            <ChevronDown
              className={`h-4 w-4 transition-transform ${infoOpen ? "" : "-rotate-90"}`}
            />
          </button>
          {infoOpen && (
            <ul className="pb-4">
              {infoLinks.map((l) => (
                <li key={l.label} className="text-[15px]">
                  {l.to ? (
                    <Link
                      to={l.to}
                      onClick={() => onOpenChange(false)}
                      className="block px-4 py-2.5"
                    >
                      {l.label}
                    </Link>
                  ) : l.href ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block px-4 py-2.5"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <span className="block px-4 py-2.5">{l.label}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottom nav (matches storefront tabs) */}
        <nav className="absolute inset-x-0 bottom-0 grid grid-cols-4 border-t border-border bg-background">
          {[
            { to: "/", icon: Home, label: "Loja" },
            { to: "/notifications", icon: Heart, label: "Notificações" },
            { to: "/support", icon: Headset, label: "Suporte" },
            { to: "/me", icon: User, label: "Mim" },
          ].map((it) => {
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
                onClick={() => onOpenChange(false)}
                className="flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] text-muted-foreground"
              >
                <Icon className="h-5 w-5" strokeWidth={1.9} />
                <span>{it.label}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
