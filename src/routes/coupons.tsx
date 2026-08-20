import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { useCoupons, type Coupon } from "@/lib/coupons-store";
import { formatKz } from "@/lib/format";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/coupons")({
  head: () => ({
    meta: [
      { title: "Meus cupões — Bazarixy" },
      { name: "description", content: "Veja os cupões de desconto disponíveis, os já usados e os expirados, e aplique-os ao finalizar a compra na Bazarixy." },
      { property: "og:title", content: "Meus cupões — Bazarixy" },
      { property: "og:description", content: "Cupões de desconto disponíveis para usar no checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CouponsPage,
});

const TABS = ["não utilizado", "Usados", "Expirado"] as const;
const FILTERS = ["Todos", "Expirando em breve", "Novo", "Envio"] as const;

function parseExpiry(s?: string) {
  if (!s) return null;
  const [d, m, y] = s.split("/").map(Number);
  if (!d || !m || !y) return null;
  return new Date(y, m - 1, d, 23, 59, 59);
}

function CouponCard({ c, dim }: { c: Coupon; dim?: boolean }) {
  const [open, setOpen] = useState(false);
  const exp = parseExpiry(c.expires);

  return (
    <article className={`relative flex flex-col overflow-hidden bg-[#fdf1ec] sm:flex-row ${dim ? "opacity-60 grayscale" : ""}`}>
      <span className="absolute left-0 top-0 z-10 bg-brand px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-brand-foreground">Novo</span>
      {/* notches */}
      <span className="pointer-events-none absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-background sm:block" />
      <span className="pointer-events-none absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-background sm:block" />

      <div className="flex shrink-0 flex-col items-center justify-center border-b border-dashed border-sale/40 px-3 pb-4 pt-7 sm:w-36 sm:border-b-0 sm:border-r sm:py-7">
        <p className="font-display text-3xl font-black leading-none text-sale sm:text-4xl">
          <span className="break-all">{c.type === "percent" ? c.value : formatKz(c.value)}</span>
          {c.type === "percent" && <span className="align-super text-base">%OFF</span>}
        </p>
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">
          {c.minOrder > 0 ? `Pedidos ${formatKz(c.minOrder)}+` : "Sem mínimo"}
        </p>
      </div>

      <div className="min-w-0 flex-1 px-4 py-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-base font-black leading-tight sm:text-lg">Cupão para todo o site</h3>
            <p className="mt-1 text-sm">
              <span className="text-muted-foreground">Código </span>
              <span className="break-all font-mono font-black text-sale">{c.code}</span>
            </p>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{c.description || "Para produtos seleccionados"}</p>
          </div>
          <button
            onClick={() => { navigator.clipboard?.writeText(c.code); toast.success("Código copiado"); }}
            className="shrink-0 bg-brand px-4 py-2 text-xs font-black text-brand-foreground sm:px-5"
          >
            Compre
          </button>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="mt-3 flex items-center gap-1 text-left text-[11px] text-muted-foreground">
          {exp ? `Expira em ${c.expires}` : "Sem data de expiração"}
          <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <ul className="mt-2 space-y-1 text-[11px] text-muted-foreground">
            <li>· Aplicável no checkout em «Cupom de desconto».</li>
            <li>· {c.type === "percent" ? `Desconto de ${c.value}% sobre o subtotal.` : `Desconto de ${formatKz(c.value)} sobre o subtotal.`}</li>
            <li>· {c.minOrder > 0 ? `Válido em pedidos a partir de ${formatKz(c.minOrder)}.` : "Sem valor mínimo de pedido."}</li>
            <li>· Não acumulável com outros cupões.</li>
          </ul>
        )}
      </div>
    </article>
  );
}


function CouponsPage() {
  const all = useCoupons();
  const [tab, setTab] = useState<string>(TABS[0]);
  const [filter, setFilter] = useState<string>(FILTERS[0]);

  const now = Date.now();
  const { available, expired } = useMemo(() => {
    const av: Coupon[] = [];
    const ex: Coupon[] = [];
    all.forEach((c) => {
      const d = parseExpiry(c.expires);
      if (!c.active || (d && d.getTime() < now)) ex.push(c);
      else av.push(c);
    });
    return { available: av, expired: ex };
  }, [all, now]);

  const base = tab === "Expirado" ? expired : tab === "Usados" ? [] : available;
  const list = base.filter((c) => {
    if (filter === "Expirando em breve") {
      const d = parseExpiry(c.expires);
      return !!d && d.getTime() - now < 7 * 864e5;
    }
    if (filter === "Envio") return c.type === "fixed";
    return true;
  });

  return (
    <Layout hideHeader hideBottomNav>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-30 border-b border-border bg-background">
          <div className="mx-auto flex max-w-3xl items-center gap-2 px-2 py-3">
            <button onClick={() => window.history.back()} aria-label="Voltar" className="grid h-9 w-9 place-items-center">
              <span className="text-xl leading-none">‹</span>
            </button>
            <div className="flex flex-1 items-center justify-center gap-7">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative pb-1 text-sm font-bold ${
                    tab === t ? "text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-3 pb-16">
          <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-bold transition ${
                  filter === f ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <h1 className="font-display text-xl font-black">Meus Cupões</h1>

          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            {list.map((c) => (
              <CouponCard key={c.code} c={c} dim={tab === "Expirado"} />
            ))}
            {list.length === 0 && (
              <div className="border border-dashed border-border py-16 text-center">
                <p className="font-bold">Nenhum cupão aqui</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tab === "Usados" ? "Os cupões que usar aparecem nesta lista." : "Volte em breve para novas promoções."}
                </p>
              </div>
            )}
          </div>

          <Link to="/" className="mt-6 inline-block bg-brand px-6 py-2.5 text-sm font-bold text-brand-foreground">Continuar a comprar</Link>
        </div>
      </div>
    </Layout>
  );
}
