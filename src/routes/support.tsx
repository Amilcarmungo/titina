import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Layout } from "@/components/Layout";
import { askSupport, fallbackSupportReply } from "@/lib/support-chat.functions";
import {
  MessageCircle,
  Instagram,
  Phone,
  Send,
  ChevronDown,
  ChevronUp,
  Truck,
  PackageOpen,
  CreditCard,
  RotateCcw,
  Zap,
  ChevronRight,
} from "lucide-react";
import supportLogo from "../../img/suportlogo.png";

export const WHATSAPP = "https://wa.me/244934033532";
export const INSTAGRAM = "https://www.instagram.com/bazarixy/";
export const PHONE = "+244 934 033 532";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Suporte Bazarixy — Assistente e contactos" },
      {
        name: "description",
        content:
          "Fale com a Jilda IA, a assistente virtual da Bazarixy, ou contacte a equipa por WhatsApp, Instagram e telefone.",
      },
      {
        property: "og:title",
        content: "Suporte Bazarixy — Assistente e contactos",
      },
      {
        property: "og:description",
        content:
          "Assistente virtual, WhatsApp, Instagram e telefone da Bazarixy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SupportPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SHORTCUTS = [
  {
    icon: Zap,
    label: "Entrega urgente",
    prompt: "Preciso de uma entrega urgente. Como funciona?",
  },
  {
    icon: Truck,
    label: "Rastrear",
    prompt: "Como acompanho o estado do meu pedido?",
  },
  {
    icon: CreditCard,
    label: "Pagamentos",
    prompt: "Que métodos de pagamento posso usar e como envio o comprovativo?",
  },
  {
    icon: RotateCcw,
    label: "Devoluções",
    prompt: "Como faço uma devolução ou reembolso?",
  },
  {
    icon: PackageOpen,
    label: "Enviar pedido",
    prompt: "Como faço para finalizar e enviar o meu pedido?",
  },
];

const FAQ_TABS = ["Perguntas frequentes", "Pré-venda", "Conteúdo"] as const;

const FAQS: Record<string, { q: string; a: string }[]> = {
  "Perguntas frequentes": [
    {
      q: "Quanto tempo o pedido demora para chegar?",
      a: "Em Luanda entregamos em 24-48h. Nas outras províncias entre 3 e 7 dias úteis, contados após a validação do comprovativo.",
    },
    {
      q: "Por que meu pedido está atrasado?",
      a: "Normalmente é por comprovativo ainda em análise ou morada incompleta. Verifique em «Meus pedidos» — se estiver em processamento há mais de 48h, fale connosco.",
    },
    {
      q: "Existe alguma taxa adicional?",
      a: "Não cobramos taxas escondidas. O frete é grátis acima de Kz 120.000 e aparece sempre no resumo antes de pagar.",
    },
    {
      q: "Por que meu pagamento foi recusado?",
      a: "Confirme se o valor transferido é exactamente igual ao do pedido e se o comprovativo está legível. Pode reenviar o comprovativo pela página do pagamento.",
    },
  ],
  "Pré-venda": [
    {
      q: "Posso reservar um produto?",
      a: "Sim. Adicione à sacola e finalize — a reserva fica activa durante 24h enquanto envia o comprovativo.",
    },
    {
      q: "Os tamanhos são fiéis?",
      a: "Cada produto tem o guia de tamanhos na página de detalhes. Em caso de dúvida, pergunte-me o tamanho que costuma usar.",
    },
  ],
  Conteúdo: [
    {
      q: "Como me torno vendedor na Bazarixy?",
      a: "Envie-nos uma mensagem no WhatsApp com o nome da loja e o tipo de produtos. Criamos a sua loja no marketplace.",
    },
    {
      q: "Onde vejo as novidades?",
      a: "No Instagram @bazarixy publicamos lançamentos, campanhas e cupons antes de todos.",
    },
  ],
};

function SupportPage() {
  const ask = useServerFn(askSupport);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: "Bem-vindo à Bazarixy! Eu sou a Siyo, como posso ajudá-lo hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<string>(FAQ_TABS[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await ask({ data: { messages: next.slice(-12) } });
      setMessages([...next, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: fallbackSupportReply(content) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout hideHeader hideBottomNav>
      <div className="flex min-h-screen flex-col bg-muted/30">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background px-3 py-3">
          <button
            onClick={() => window.history.back()}
            aria-label="Voltar"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
          >
            <span className="text-xl leading-none">‹</span>
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="font-display text-base font-black tracking-tight">
              Suporte Bazarixy
            </p>
            <p className="text-[11px] text-muted-foreground">
              Assistente Jilda IA · online
            </p>
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-sale"
          >
            Humano
          </a>
        </header>

        <div className="mx-auto w-full max-w-3xl flex-1 px-3 pb-40 pt-4 md:pb-44">
          {/* Conversation */}
          <div className="space-y-4">
            {messages.map((m, i) =>
              m.role === "assistant" ? (
                <div key={i} className="flex items-start gap-2.5">
                  <img
                    src={supportLogo}
                    alt="Jilda IA"
                    className="h-9 w-9 shrink-0 rounded-full bg-background object-contain ring-1 ring-border"
                  />
                  <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-tl-sm bg-background px-4 py-3 text-sm shadow-[var(--shadow-card)]">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-foreground">
                    {m.content}
                  </div>
                </div>
              ),
            )}
            {loading && (
              <div className="flex items-start gap-2.5">
                <img
                  src={supportLogo}
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-full bg-background object-contain ring-1 ring-border"
                />
                <div className="rounded-2xl rounded-tl-sm bg-background px-4 py-3 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
                  A escrever…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Shortcut cards */}
          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
            {SHORTCUTS.map((s) => (
              <button
                key={s.label}
                onClick={() => send(s.prompt)}
                className="flex w-[104px] shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-background px-2 py-3 text-center shadow-[var(--shadow-card)] transition hover:-translate-y-0.5"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted">
                  <s.icon className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-bold leading-tight">
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* FAQ */}
          <section className="mt-3 rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 border-b border-border pb-2">
              <div className="no-scrollbar flex flex-1 items-center gap-3 overflow-x-auto">
                {FAQ_TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTab(t);
                      setOpenFaq(null);
                    }}
                    className={`whitespace-nowrap text-xs font-bold ${tab === t ? "text-sale" : "text-muted-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setFaqOpen((v) => !v)}
                className="inline-flex items-center gap-1 text-xs font-bold text-sale"
              >
                Mais{" "}
                {faqOpen ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {faqOpen && (
              <ul className="divide-y divide-border">
                {FAQS[tab].map((f, i) => (
                  <li key={f.q}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center gap-3 py-3 text-left"
                    >
                      <span
                        className={`text-sm font-black ${i === 0 ? "text-sale" : i === 1 ? "text-amber-500" : "text-muted-foreground"}`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-sm">{f.q}</span>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition ${openFaq === i ? "rotate-90" : ""}`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="pb-3 pl-7 pr-2">
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {f.a}
                        </p>
                        <button
                          onClick={() => send(f.q)}
                          className="mt-2 rounded-full border border-border px-3 py-1 text-[11px] font-bold hover:bg-muted"
                        >
                          Perguntar à Jilda IA
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Contact channels */}
          <section className="mt-3 grid gap-2 sm:grid-cols-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white">
                <MessageCircle className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-black">WhatsApp</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {PHONE}
                </span>
              </span>
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-pink-500 text-white">
                <Instagram className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-black">Instagram</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  @bazarixy
                </span>
              </span>
            </a>
            <a
              href="tel:+244934033532"
              className="flex items-center gap-2.5 rounded-2xl bg-background p-3 shadow-[var(--shadow-card)]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background">
                <Phone className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-black">Telefone</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {PHONE}
                </span>
              </span>
            </a>
          </section>
        </div>

        {/* Composer */}
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background px-3 py-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="mx-auto flex max-w-3xl items-end gap-2"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              rows={1}
              placeholder="Digite a sua mensagem aqui"
              className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl bg-muted px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-sale/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Enviar"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-strong text-white transition hover:opacity-90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
