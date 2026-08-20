import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  Copy,
  FileCheck2,
  ShieldAlert,
} from "lucide-react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/como-pagar")({
  head: () => ({
    meta: [
      { title: "Como pagar — Bazarixy" },
      {
        name: "description",
        content:
          "Aprenda a pagar na Bazarixy e a enviar um comprovativo válido.",
      },
    ],
  }),
  component: HowToPayPage,
});

const steps = [
  {
    icon: Copy,
    title: "Escolha o método",
    text: "No checkout, seleccione Multicaixa Express, Unitel Money, PayPay ou transferência.",
  },
  {
    icon: Copy,
    title: "Copie os dados",
    text: "Use o número, o código do pedido e o valor exacto apresentados na página de pagamento.",
  },
  {
    icon: FileCheck2,
    title: "Faça a transferência",
    text: "Transfira exactamente o valor do pedido. Guarde o comprovativo original da operação.",
  },
  {
    icon: CheckCircle2,
    title: "Envie e aguarde",
    text: "Carregue uma imagem ou PDF legível. A equipa valida o pagamento antes de preparar o envio.",
  },
];

function HowToPayPage() {
  return (
    <Layout title="Como pagar" showBack hideBottomNav>
      <main className="mx-auto max-w-2xl space-y-4 px-3 py-5 md:px-0">
        <section className="rounded-2xl bg-foreground p-5 text-background shadow-[var(--shadow-card)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-background/60">
            Pagamento seguro
          </p>
          <h1 className="mt-2 font-display text-2xl font-black">
            Pague com o valor certo, sem complicações.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-background/75">
            O pedido só entra em preparação depois de a nossa equipa confirmar o
            pagamento e o comprovativo.
          </p>
        </section>

        <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
          <h2 className="text-base font-black">Passo a passo</h2>
          <ol className="mt-3 space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="flex gap-3 rounded-xl border border-border p-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-black">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-950">
          <h2 className="flex items-center gap-2 text-base font-black">
            <ShieldAlert className="h-5 w-5" /> Nunca faça isto
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li className="flex gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> Não envie
              comprovativo falso, editado, reutilizado ou de outra pessoa.
            </li>
            <li className="flex gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> Não
              transfira um valor diferente do total mostrado no pedido.
            </li>
            <li className="flex gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> Não envie o
              mesmo comprovativo para pedidos diferentes.
            </li>
          </ul>
          <p className="mt-3 text-xs font-semibold">
            Tentativas de fraude podem levar ao cancelamento do pedido e à
            suspensão da conta.
          </p>
        </section>

        <section className="flex items-center justify-between gap-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
          <div>
            <p className="text-sm font-black">Precisa de ajuda?</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              A equipa pode confirmar o estado do seu pagamento.
            </p>
          </div>
          <Link
            to="/support"
            className="shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background"
          >
            Falar com suporte
          </Link>
        </section>

        <Link
          to="/cart"
          className="flex items-center justify-center gap-1 py-2 text-sm font-bold text-brand-strong"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar à sacola
        </Link>
      </main>
    </Layout>
  );
}
