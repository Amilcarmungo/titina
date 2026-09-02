import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Layout } from "@/components/Layout";
import { askSupport, fallbackSupportReply } from "@/lib/support-chat.functions";
import { getFirebaseAuth } from "@/lib/firebase/client";
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
  ChevronLeft,
  Sparkles,
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
      content:
        "Bem-vindo à Bazarixy! Eu sou a Jilda IA, como posso ajudá-lo hoje?",
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
      const authToken = await getFirebaseAuth()?.currentUser?.getIdToken();
      const res = await ask({
        data: { messages: next.slice(-12), authToken },
      });
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
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-30 border-b border-border bg-background">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-3 py-3 md:px-6">
            <button
              onClick={() => window.history.back()}
              aria-label="Voltar"
              className="grid h-9 w-9 place-items-center border border-border bg-transparent text-muted-foreground transition hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="relative">
              <img
                src={supportLogo}
                alt="Jilda IA"
                className="h-10 w-10 border border-border bg-background object-contain"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 border-2 border-background bg-emerald-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[15px] font-black leading-tight tracking-tight">
                Jilda IA
              </p>
              <p className="text-[11px] text-muted-foreground">
                Assistente Bazarixy
              </p>
            </div>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-emerald-500 bg-emerald-500 px-3 py-2 text-[11px] font-black text-white transition hover:opacity-90 md:px-4 md:text-xs"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Falar com humano
            </a>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-5xl gap-5 px-3 pb-40 pt-5 md:grid-cols-[minmax(0,1fr)_320px] md:px-6 md:pb-10">
          <section className="flex min-h-[70vh] flex-col border border-border bg-background md:h-[calc(100vh-9rem)]">
            <div className="hidden items-center gap-2 border-b border-border px-5 py-3 md:flex">
              <Sparkles className="h-4 w-4 text-sale" />
              <p className="text-xs font-black uppercase tracking-wide text-muted-foreground">
                Conversa
              </p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4 md:px-5">
              {messages.map((m, i) =>
                m.role === "assistant" ? (
                  <div key={i} className="flex items-end gap-2.5">
                    <img
                      src={supportLogo}
                      alt="Jilda IA"
                      className="h-8 w-8 shrink-0 border border-border bg-background object-contain"
                    />
                    <div className="max-w-[85%] whitespace-pre-line border border-border bg-background px-4 py-3 text-sm leading-relaxed">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-line bg-foreground px-4 py-3 text-sm leading-relaxed text-background">
                      {m.content}
                    </div>
                  </div>
                ),
              )}
              {loading && (
                <div className="flex items-end gap-2.5">
                  <img
                    src={supportLogo}
                    alt=""
                    className="h-8 w-8 shrink-0 border border-border bg-background object-contain"
                  />
                  <div className="flex items-center gap-1 border border-border bg-background px-4 py-3.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.1s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-border px-3 py-3 md:px-5">
              {SHORTCUTS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.prompt)}
                  className="group inline-flex shrink-0 items-center gap-2 border border-border bg-transparent px-3 py-2 text-[11px] font-bold transition hover:border-foreground"
                >
                  <span className="grid h-6 w-6 place-items-center border border-border bg-transparent text-foreground">
                    <s.icon className="h-3.5 w-3.5" />
                  </span>
                  {s.label}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="hidden items-end gap-2 border-t border-border px-5 py-3 md:flex"
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
                placeholder="Escreva a sua mensagem…"
                className="max-h-32 min-h-11 flex-1 resize-none border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Enviar"
                className="grid h-11 w-11 shrink-0 place-items-center bg-foreground text-background transition hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </section>

          <aside className="space-y-4 md:h-[calc(100vh-9rem)] md:overflow-y-auto md:pr-1">
            <section className="border border-border bg-background p-4">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-muted-foreground">
                Fale connosco
              </p>
              <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-1">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 border border-border p-3 transition hover:border-foreground"
                >
                  <span className="grid h-10 w-10 place-items-center bg-emerald-500 text-white">
                    <MessageCircle className="h-4.5 w-4.5" />
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
                  className="flex items-center gap-3 border border-border p-3 transition hover:border-foreground"
                >
                  <span className="grid h-10 w-10 place-items-center bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 text-white">
                    <Instagram className="h-4.5 w-4.5" />
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
                  className="flex items-center gap-3 border border-border p-3 transition hover:border-foreground"
                >
                  <span className="grid h-10 w-10 place-items-center bg-foreground text-background">
                    <Phone className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-black">Telefone</span>
                    <span className="block truncate text-[11px] text-muted-foreground">
                      {PHONE}
                    </span>
                  </span>
                </a>
              </div>
            </section>

            <section className="border border-border bg-background p-4">
              <div className="flex items-center gap-3 border-b border-border pb-2">
                <div className="no-scrollbar flex flex-1 items-center gap-3 overflow-x-auto">
                  {FAQ_TABS.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTab(t);
                        setOpenFaq(null);
                      }}
                      className={`whitespace-nowrap px-2.5 py-1 text-xs font-bold transition ${
                        tab === t
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setFaqOpen((v) => !v)}
                  aria-label="Mostrar perguntas"
                  className="grid h-7 w-7 place-items-center text-muted-foreground hover:text-foreground"
                >
                  {faqOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
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
                        <span className="grid h-6 w-6 shrink-0 place-items-center border border-border text-[11px] font-black text-muted-foreground">
                          {i + 1}
                        </span>
                        <span className="min-w-0 flex-1 text-sm">{f.q}</span>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 text-muted-foreground transition ${openFaq === i ? "rotate-90 text-foreground" : ""}`}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="pb-3 pl-9 pr-2">
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {f.a}
                          </p>
                          <button
                            onClick={() => send(f.q)}
                            className="mt-2 inline-flex items-center gap-1.5 border border-foreground px-3 py-1.5 text-[11px] font-bold text-foreground transition hover:bg-foreground hover:text-background"
                          >
                            <Sparkles className="h-3 w-3" />
                            Perguntar à Jilda IA
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </aside>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background px-3 py-2.5 md:hidden">
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
              placeholder="Escreva a sua mensagem…"
              className="max-h-32 min-h-11 flex-1 resize-none border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Enviar"
              className="grid h-11 w-11 shrink-0 place-items-center bg-foreground text-background transition hover:opacity-90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
