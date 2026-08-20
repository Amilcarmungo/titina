import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  ChevronLeft,
  Menu,
  Ticket,
  ChevronRight,
  Globe,
  X,
  Lock,
} from "lucide-react";
import { useStore } from "@/lib/store";
import payExpress from "@/assets/pay-express.jpg.asset.json";
import payMulticaixa from "@/assets/pay-multicaixa.jpg.asset.json";

export const Route = createFileRoute("/wallet")({
  head: () => ({ meta: [{ title: "Carteira — Bazarixy" }] }),
  component: WalletPage,
});

function WalletPage() {
  const { user } = useStore();
  if (!user) {
    return (
      <Layout hideHeader hideBottomNav>
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-8 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-muted">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-black">
            Acesso restrito
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Entre na sua conta Bazarixy para acessar a Carteira, saldos e
            vales-presente.
          </p>
          <Link
            to="/auth"
            className="mt-6 rounded-full bg-foreground px-8 py-3 text-sm font-bold text-background"
          >
            Entrar / Cadastrar
          </Link>
          <Link
            to="/me"
            className="mt-3 text-xs text-muted-foreground underline"
          >
            Voltar para Minha Conta
          </Link>
        </div>
      </Layout>
    );
  }
  return <WalletContent />;
}

function WalletContent() {
  return (
    <Layout hideHeader hideBottomNav>
      {/* Custom dark header */}
      <div className="bg-[#0d1638] text-white">
        <div className="flex items-center px-3 pt-3 pb-2">
          <button onClick={() => window.history.back()} className="p-1.5">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-center text-base font-semibold">
            Carteira
          </h1>
          <button className="p-1.5">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Balance card */}
        <div className="mx-3 mb-3 rounded-t-2xl bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] p-4 pb-5 text-foreground relative overflow-hidden">
          <span className="pointer-events-none absolute -right-6 -bottom-10 text-[180px] font-black text-white/50 leading-none select-none">
            B
          </span>
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-black tracking-tight">0,00</span>
              <span className="grid h-5 w-5 place-items-center rounded-full border border-foreground/60">
                <Globe className="h-3 w-3" />
              </span>
            </div>
            <button
              disabled
              className="mt-3 rounded bg-foreground/30 px-8 py-2.5 text-sm font-medium text-white/90"
            >
              Sacar
            </button>

            <div className="mt-4 grid grid-cols-3 border-t border-foreground/10 pt-3 text-sm">
              {[
                { k: "Pagamento", v: "0" },
                { k: "Vale-presente", v: "-" },
                { k: "Histórico", v: "-" },
              ].map((c) => (
                <button key={c.k} className="flex flex-col items-start gap-1">
                  <span className="flex items-center gap-1 text-foreground/80">
                    {c.k}
                    <ChevronRight className="h-3 w-3" />
                  </span>
                  <span className="text-sm">{c.v}</span>
                </button>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 rounded bg-white/60 px-2.5 py-2 text-[12px]">
              <Ticket className="h-3.5 w-3.5 text-sale" />
              <span className="flex-1">
                Receba seu vale-presente: fácil de usar, compre e use já!
              </span>
              <X className="h-3 w-3 text-foreground/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment service */}
      <div className="bg-background px-4 pt-4">
        <h2 className="font-display text-base font-bold">
          Serviço de Pagamento
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 p-3">
            <p className="text-[10px] font-bold uppercase text-sale">Extra</p>
            <p className="-mt-1 text-3xl font-black text-sale leading-none">
              Kz 5.000<span className="block text-base">OFF</span>
            </p>
            <p className="mt-1 text-[10px] text-foreground/80">
              Pedidos Kz 48.000+ ao pagar com
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <img
                src={payExpress.url}
                alt="Multicaixa Express"
                className="h-6 w-6 rounded object-contain bg-white p-0.5 ring-1 ring-black/5"
              />
              <span className="text-[10px] font-bold text-orange-600">
                Multicaixa Express
              </span>
            </div>
          </div>
          <div className="rounded-xl bg-sky-50 p-3 text-center">
            <p className="text-sm font-bold text-sky-700">Vincular Cartão</p>
            <p className="text-base font-black text-sky-800">Checkout Rápido</p>
            <div className="mt-3 mx-auto grid h-16 w-24 place-items-center rounded-md bg-white shadow-md ring-1 ring-border">
              <img
                src={payMulticaixa.url}
                alt="Multicaixa"
                className="max-h-14 max-w-20 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-4 mx-3 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-card)]">
        {[
          "Métodos de pagamento",
          "Vale-presente",
          "Histórico de transações",
          "Solicitar reembolso",
        ].map((it) => (
          <button
            key={it}
            className="flex w-full items-center justify-between px-4 py-3.5 text-sm"
          >
            <span>{it}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <div className="px-4 py-4 text-center">
        <Link to="/me" className="text-xs text-muted-foreground underline">
          Voltar para Minha Conta
        </Link>
      </div>
    </Layout>
  );
}
