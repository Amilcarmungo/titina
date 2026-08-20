import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { getAnyProduct } from "@/lib/products-store";
import { formatKz } from "@/lib/format";
import {
  CreditCard, Package, Truck, MessageSquare, Undo2, ChevronRight,
  Clock, CheckCircle2, MapPin, Star, RotateCcw, X, ChevronLeft, ArrowDown, AlertTriangle,
} from "lucide-react";
import { z } from "zod";
import { useState, useEffect } from "react";
import {
  useOrders, orderActions, packagesOf, STAGE_FLOW, STAGE_LABEL, STAGE_DESC,
  type Order, type OrderStatus, type OrderPackage,
  type PackageStage,
} from "@/lib/orders-store";
import { reviewActions, isOrderReviewed, markOrderReviewed } from "@/lib/reviews";
import { addPoints, POINTS_PER_REVIEW } from "@/lib/points";
import { useStore } from "@/lib/store";
import { RequireAuth } from "@/components/RequireAuth";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { SmartImage } from "@/components/SmartImage";

const searchSchema = z.object({
  tab: z.enum(["unpaid", "processing", "shipped", "review", "returns"]).optional(),
});

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Meus pedidos — Bazarixy" }] }),
  validateSearch: searchSchema,
  component: OrdersPage,
});

const TABS: { key: OrderStatus; label: string; icon: typeof CreditCard }[] = [
  { key: "unpaid", label: "A pagar", icon: CreditCard },
  { key: "processing", label: "Processando", icon: Package },
  { key: "shipped", label: "Enviado", icon: Truck },
  { key: "review", label: "Avaliar", icon: MessageSquare },
  { key: "returns", label: "Devoluções", icon: Undo2 },
];

const statusMeta: Record<OrderStatus, { color: string; label: string; icon: typeof Clock; phrase: string }> = {
  unpaid: {
    color: "text-sale", label: "Aguardando pagamento", icon: Clock,
    phrase: "O pagamento deste pedido ainda não foi concluído. Finalize-o para garantir os seus artigos.",
  },
  processing: {
    color: "text-amber-600", label: "Em processamento", icon: Package,
    phrase: "O seu pedido está a ser tratado pela nossa equipa e pelas lojas envolvidas.",
  },
  shipped: {
    color: "text-emerald-600", label: "A caminho", icon: Truck,
    phrase: "O pedido já saiu para entrega. Acompanhe abaixo cada etapa do envio.",
  },
  review: {
    color: "text-brand-strong", label: "Pronto para avaliar", icon: Star,
    phrase: "Pedido concluído. A sua opinião é muito importante para nós.",
  },
  returns: {
    color: "text-muted-foreground", label: "Em devolução", icon: RotateCcw,
    phrase: "O processo de devolução está em curso. Informamos assim que o reembolso for emitido.",
  },
};

function OrdersPage() {
  return (
    <RequireAuth title="Entre para ver os seus pedidos">
      <OrdersContent />
    </RequireAuth>
  );
}

function OrdersContent() {
  const { tab } = useSearch({ from: "/orders" });
  const active: OrderStatus = tab ?? "unpaid";
  const orders = useOrders();
  const list = orders.filter((o) => o.status === active);
  const [reviewFor, setReviewFor] = useState<Order | null>(null);

  return (
    <Layout hideHeader>
      <div className="sticky top-0 md:top-16 z-30 bg-background border-b border-border">
        <div className="flex items-center gap-1 px-2 pt-2 md:hidden">
          <button onClick={() => window.history.back()} className="-ml-1 p-1.5" aria-label="Voltar">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold">Meus Pedidos</h1>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          <div className="flex min-w-full gap-1 px-2">
            {TABS.map((t) => {
              const isActive = t.key === active;
              const count = orders.filter((o) => o.status === t.key).length;
              const Icon = t.icon;
              return (
                <Link
                  key={t.key}
                  to="/orders"
                  search={{ tab: t.key }}
                  className={`relative flex flex-col items-center gap-1 px-3 py-2.5 min-w-[72px] text-[11px] ${isActive ? "font-bold text-foreground" : "text-muted-foreground"}`}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 1.7} />
                    {count > 0 && (
                      <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-strong px-1 text-[9px] font-bold text-white">
                        {count}
                      </span>
                    )}
                  </div>
                  <span className="leading-none">{t.label}</span>
                  {isActive && <span className="absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-brand-strong" />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-3 px-3 md:px-0 pb-8">
        {list.length === 0 ? (
          <EmptyState status={active} />
        ) : (
          list.map((o) => <OrderCard key={o.id} order={o} onReview={() => setReviewFor(o)} />)
        )}
      </div>

      {reviewFor && <ReviewModal order={reviewFor} onClose={() => setReviewFor(null)} />}
    </Layout>
  );
}

function OrderCard({ order, onReview }: { order: Order; onReview: () => void }) {
  const meta = statusMeta[order.status];
  const Icon = meta.icon;
  const first = getAnyProduct(order.items[0].productId);
  const totalItems = order.items.reduce((s, i) => s + i.qty, 0);
  const [reviewed, setReviewed] = useState(false);
  const navigate = useNavigate();
  const pkgs = packagesOf(order);
  const [openTimeline, setOpenTimeline] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const { user } = useStore();

  // Verifica se o pedido foi avaliado quando o componente monta ou quando muda o usuário
  useEffect(() => {
    (async () => {
      const isReviewed = await isOrderReviewed(order.id, user?.uid);
      setReviewed(isReviewed);
    })();
  }, [order.id, user?.uid]);

  const pay = () => {
    void navigate({ to: "/pay/$method", params: { method: order.paymentMethod || "multicaixa-express" } });
  };

  return (
    <div className="rounded-2xl bg-white shadow-[var(--shadow-card)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/70">
        <div className="flex items-center gap-1.5 min-w-0">
          <Icon className={`h-4 w-4 shrink-0 ${meta.color}`} strokeWidth={2.2} />
          <span className={`text-xs font-bold truncate ${meta.color}`}>
            {order.paymentProof && order.status === "processing" ? "Pagamento em análise" : meta.label}
          </span>
        </div>
        <span className="text-[11px] text-muted-foreground shrink-0">#{order.id}</span>
      </div>

      <p className="border-b border-border/60 bg-muted/30 px-4 py-2 text-[11px] leading-relaxed text-muted-foreground">
        {meta.phrase}
      </p>

      <div className="px-4 py-3">
        <div className="flex gap-3">
          {order.items.slice(0, 3).map((it) => {
            const p = getAnyProduct(it.productId);
            if (!p) return null;
            return (
              <div key={it.productId} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                <SmartImage src={it.image ?? p.image} alt={p.name} wrapperClassName="absolute inset-0 h-full w-full" className="object-cover" />
                {it.qty > 1 && (
                  <span className="absolute right-1 bottom-1 rounded bg-black/70 px-1 text-[9px] font-bold text-white">
                    x{it.qty}
                  </span>
                )}
              </div>
            );
          })}
          <div className="ml-auto text-right">
            <p className="text-[11px] text-muted-foreground">{totalItems} {totalItems === 1 ? "item" : "itens"}</p>
            <p className="mt-0.5 text-sm font-black">{formatKz(order.total)}</p>
            <p className={`mt-0.5 text-[11px] font-semibold ${order.shipping?.isFree ? "text-emerald-700" : "text-muted-foreground"}`}>
              {order.shipping?.isFree ? "Frete grátis" : `Frete ${formatKz(order.shipping?.chargedFee ?? 0)}`}
            </p>
          </div>
        </div>

        {first && <p className="mt-2 text-xs text-muted-foreground line-clamp-1">{first.name}</p>}

        {order.status === "review" ? (
          <div className="mt-3 rounded-xl bg-brand/15 px-3 py-2.5">
            <p className="text-[12px] font-bold text-brand-strong">Avalie e ganhe {POINTS_PER_REVIEW} pontos</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
              Conte como foi a sua experiência. Os pontos entram na sua conta assim que publicar a avaliação.
            </p>
          </div>
        ) : order.status === "returns" ? (
          <RefundBlock order={order} onRequest={() => setRefundOpen(true)} />
        ) : (
          <div className="mt-2.5 space-y-1.5">
            {pkgs.map((pkg, i) => (
              <PackageBlock
                key={pkg.id}
                pkg={pkg}
                index={i}
                total={pkgs.length}
                status={order.status}
                expanded={openTimeline}
                onReceived={() => {
                  orderActions.markReceived(order.id, pkg.id);
                  toast.success("Receção confirmada — já pode avaliar.");
                }}
              />
            ))}
            <button onClick={() => setOpenTimeline((v) => !v)} className="text-[11px] font-semibold text-brand-strong">
              {openTimeline ? "Ocultar detalhes" : "Ver detalhes do envio"}
            </button>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-foreground">{order.createdAt}</span>
          <div className="flex gap-2">
            {order.status === "unpaid" && (
              <>
                <button
                  onClick={() => { orderActions.remove(order.id); toast.success("Pedido cancelado."); }}
                  className="rounded-full border border-border px-3 py-1.5 text-xs"
                >
                  Cancelar
                </button>
                <button onClick={pay} className="rounded-full bg-brand-strong px-3 py-1.5 text-xs font-bold text-white hover:opacity-90">
                  Pagar agora
                </button>
              </>
            )}
            {order.status === "processing" && (
              <button onClick={() => setOpenTimeline(true)} className="rounded-full border border-brand-strong/60 px-3 py-1.5 text-xs font-semibold text-brand-strong">
                Ver estado
              </button>
            )}
            {order.status === "shipped" && (
              <>
                <button onClick={() => setOpenTimeline(true)} className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs">
                  <MapPin className="h-3 w-3" /> Rastrear
                </button>
                {(() => {
                  const canConfirm = pkgs.some((p) => p.stage === "delivered");
                  return (
                    <button
                      disabled={!canConfirm}
                      title={canConfirm ? "Confirmar receção" : "Disponível quando a entrega for confirmada pela loja"}
                      onClick={() => { orderActions.markReceived(order.id); toast.success("Obrigado! Já pode avaliar."); }}
                      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                        canConfirm
                          ? "bg-brand-strong text-white hover:opacity-90"
                          : "cursor-not-allowed bg-muted text-muted-foreground"
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" /> Recebido
                    </button>
                  );
                })()}
              </>
            )}
            {order.status === "review" && (
              reviewed ? (
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Avaliado
                </span>
              ) : (
                <button onClick={onReview} className="flex items-center gap-1 rounded-full bg-brand-strong px-3 py-1.5 text-xs font-bold text-white hover:opacity-90">
                  <Star className="h-3 w-3 fill-white" /> Avaliar produto
                </button>
              )
            )}
            {order.status === "returns" && !order.refund && (
              <button onClick={() => setRefundOpen(true)} className="rounded-full bg-brand-strong px-3 py-1.5 text-xs font-bold text-white hover:opacity-90">
                Pedir reembolso
              </button>
            )}

          </div>
        </div>
      </div>

      {refundOpen && <RefundModal order={order} onClose={() => setRefundOpen(false)} />}
    </div>
  );
}

/** Resumo da devolução e do reembolso — sem etapas antigas, só o que falta fazer. */
function RefundBlock({ order, onRequest }: { order: Order; onRequest: () => void }) {
  const r = order.refund;
  if (!r) {
    return (
      <div className="mt-3 rounded-xl border border-border/70 px-3 py-2.5">
        <p className="text-[11px] font-bold">Devolução aceite</p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
          Está tudo pronto. Indique onde quer receber o dinheiro e confirme as condições — assim que a encomenda chegar ao nosso armazém, emitimos o reembolso.
        </p>
        <button onClick={onRequest} className="mt-2 rounded-full bg-brand-strong px-3 py-1.5 text-[11px] font-bold text-white hover:opacity-90">
          Pedir reembolso
        </button>
      </div>
    );
  }
  return (
    <div className="mt-3 rounded-xl bg-brand/15 px-3 py-2.5">
      <p className="animate-pulse text-[11px] font-bold text-brand-strong">Reembolso em processamento</p>
      <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
        Vamos transferir {formatKz(order.total)} para <b>{r.method}</b> · {r.account} ({r.holder}). Pedido em {r.requestedAt}.
      </p>
    </div>
  );
}

const REFUND_METHODS = ["Multicaixa Express", "Unitel Money", "PayPay", "Transferência bancária (IBAN)"];

function RefundModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const [method, setMethod] = useState(REFUND_METHODS[0]);
  const [account, setAccount] = useState("");
  const [holder, setHolder] = useState("");
  const [note, setNote] = useState("");
  const [agree, setAgree] = useState(false);

  const submit = () => {
    if (account.trim().length < 6) { toast.error("Indique o número ou IBAN onde quer receber."); return; }
    if (holder.trim().length < 3) { toast.error("Indique o nome do titular da conta."); return; }
    if (!agree) { toast.error("Confirme as condições da devolução."); return; }
    orderActions.requestRefund(order.id, { method, account: account.trim(), holder: holder.trim(), note: note.trim() });
    toast.success("Pedido de reembolso registado.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px] animate-fade-in" onClick={onClose}>
      <div
        className="max-h-[88vh] w-full max-w-sm overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl animate-slide-in-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-black">Pedir reembolso</h3>
            <p className="text-[11px] text-muted-foreground">Pedido #{order.id} · {formatKz(order.total)}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-muted" aria-label="Fechar"><X className="h-4 w-4" /></button>
        </div>

        <label className="mt-4 block text-[11px] font-bold text-muted-foreground">Onde quer receber?</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-strong"
        >
          {REFUND_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <label className="mt-3 block text-[11px] font-bold text-muted-foreground">Número / IBAN</label>
        <input
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="Ex.: 923 000 000 ou AO06 0000 0000 0000"
          className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-strong"
        />

        <label className="mt-3 block text-[11px] font-bold text-muted-foreground">Nome do titular</label>
        <input
          value={holder}
          onChange={(e) => setHolder(e.target.value)}
          className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand-strong"
        />

        <label className="mt-3 block text-[11px] font-bold text-muted-foreground">Observações (opcional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-strong"
        />

        <label className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5" />
          <span>Confirmo que o artigo está sem uso, com a embalagem original, e que devolvo a encomenda completa. O reembolso é emitido após a verificação no armazém.</span>
        </label>

        <button onClick={submit} className="mt-4 h-11 w-full rounded-full bg-brand-strong text-sm font-bold text-white hover:opacity-90">
          Confirmar pedido de reembolso
        </button>
      </div>
    </div>
  );
}

/** Etapa a partir da qual cada separador começa a contar (não repetimos o passado). */
const ENTRY_STAGE: Record<OrderStatus, PackageStage> = {
  unpaid: "awaiting_payment",
  processing: "payment_review",
  shipped: "shipped",
  review: "delivered",
  returns: "delivered",
};

/** Etapas visíveis: começam no separador atual e param na etapa em curso. */
function visibleStages(stage: PackageStage, status: OrderStatus): PackageStage[] {
  if (stage === "payment_rejected") return ["payment_rejected"];
  const from = STAGE_FLOW.indexOf(ENTRY_STAGE[status]);
  const idx = STAGE_FLOW.indexOf(stage);
  const list = STAGE_FLOW.filter((s) => s !== "payment_rejected").filter((s) => {
    const i = STAGE_FLOW.indexOf(s);
    return i >= from && i <= idx;
  });
  return list.length ? list : [stage];
}

/** Estado por loja: cada pacote pode andar num ritmo diferente. */
function PackageBlock({
  pkg, index, total, status, expanded, onReceived,
}: { pkg: OrderPackage; index: number; total: number; status: OrderStatus; expanded: boolean; onReceived: () => void }) {
  const all = visibleStages(pkg.stage, status);
  // Recolhido: apenas a etapa em curso (a que está a piscar).
  const stages = expanded ? all : [pkg.stage];
  return (
    <div className="rounded-xl border border-border/70 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[10px] font-bold text-muted-foreground">
          {total > 1 ? `Envio ${index + 1}/${total} · ` : ""}{pkg.shopName}
        </p>
        {pkg.eta && (
          <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-emerald-700">
            <Truck className="h-3 w-3" strokeWidth={2.2} /> {pkg.eta}
          </span>
        )}
      </div>

      <ol className="mt-1.5 space-y-0">
        {stages.map((st, i) => {
          const isCurrent = st === pkg.stage;
          const rejected = st === "payment_rejected";
          return (
            <li key={st}>
              <div className="flex items-start gap-2">
                <span
                  className={`mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full ${
                    rejected ? "bg-destructive/15 text-destructive"
                    : isCurrent ? "animate-pulse bg-brand/40 text-brand-strong"
                    : "bg-brand-strong/15 text-brand-strong"
                  }`}
                >
                  {rejected ? <AlertTriangle className="h-2 w-2" /> : <CheckCircle2 className="h-2.5 w-2.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[11px] font-bold leading-snug ${
                      rejected ? "text-destructive"
                      : isCurrent ? "animate-pulse text-foreground"
                      : "text-brand-strong"
                    }`}
                  >
                    {STAGE_LABEL[st]}
                  </p>
                  {isCurrent && (
                    <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">{STAGE_DESC[st]}</p>
                  )}
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="ml-[6px] flex h-3.5 items-center">
                  <ArrowDown className="h-3 w-3 text-brand-strong/50" strokeWidth={2.4} />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {expanded && pkg.timeline.length > 0 && (
        <ul className="mt-2 space-y-1 border-t border-border/60 pt-2">
          {[...pkg.timeline].reverse().map((ev, i) => (
            <li key={`${ev.stage}-${i}`} className="flex gap-2 text-[10px]">
              <span className={`mt-1 h-1 w-1 shrink-0 rounded-full ${i === 0 ? "bg-brand-strong" : "bg-muted-foreground/40"}`} />
              <span>
                <span className="font-semibold">{STAGE_LABEL[ev.stage]}</span>
                {ev.note && <span className="text-muted-foreground"> — {ev.note}</span>}
                <span className="block text-muted-foreground">{ev.at}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {pkg.stage === "delivered" && total > 1 && (
        <button onClick={onReceived} className="mt-2 w-full rounded-full bg-brand-strong py-1.5 text-[11px] font-bold text-white hover:opacity-90">
          Recebi este envio
        </button>
      )}
    </div>
  );
}

function ReviewModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const { user } = useStore();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [itemIdx, setItemIdx] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const item = order.items[itemIdx];
  const product = item ? getAnyProduct(item.productId) : undefined;

  const submit = async () => {
    if (!product) return;
    if (text.trim().length < 5) { 
      toast.error("Escreva um comentário com pelo menos 5 caracteres"); 
      return; 
    }

    setIsSubmitting(true);
    try {
      await reviewActions.add({
        productId: product.id,
        orderId: order.id,
        name: user?.name || user?.email?.split("@")[0] || "Cliente",
        photoURL: user?.photoURL ?? null,
        rating,
        size: item.size,
        color: item.color,
        text: text.trim(),
      });
      await markOrderReviewed(order.id);
      addPoints(POINTS_PER_REVIEW);
      toast.success(`Avaliação publicada! +${POINTS_PER_REVIEW} pontos`);
      onClose();
    } catch (error) {
      console.error("Erro ao publicar avaliação:", error);
      toast.error("Não conseguimos validar sua compra. Verifique se o pedido foi entregue corretamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-[2px] animate-fade-in md:items-center" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-2xl animate-slide-in-bottom md:rounded-3xl md:pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-border md:hidden" />
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-lg font-black">Avaliar produto</h3>
            <p className="text-[11px] text-muted-foreground">Conte a sua experiência — ajuda outros clientes a decidir.</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-muted" aria-label="Fechar"><X className="h-4 w-4" /></button>
        </div>

        {order.items.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {order.items.map((it, idx) => {
              const p = getAnyProduct(it.productId);
              if (!p) return null;
              return (
                <button key={idx} onClick={() => setItemIdx(idx)} className={`shrink-0 rounded-lg border-2 p-1 ${idx === itemIdx ? "border-foreground" : "border-border"}`}>
                  <SmartImage src={it.image ?? p.image} alt={p.name} rounded="rounded" wrapperClassName="h-14 w-14" className="object-cover" />
                </button>
              );
            })}
          </div>
        )}

        {product && (
          <div className="mt-3 flex items-center gap-3">
            <SmartImage src={product.image} alt={product.name} rounded="rounded-lg" wrapperClassName="h-14 w-14 shrink-0" className="object-cover" />
            <p className="line-clamp-2 text-sm font-semibold">{product.name}</p>
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs font-semibold text-muted-foreground">Sua nota</p>
          <div className="mt-1 flex gap-1">
            {[1,2,3,4,5].map((n) => (
              <button key={n} onClick={() => setRating(n)}>
                <Star className={`h-8 w-8 transition ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold text-muted-foreground">Comentário</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Conte como foi sua experiência com o produto…"
            className="mt-1 w-full resize-none rounded-lg border border-border bg-transparent p-3 text-sm outline-none focus:border-foreground"
          />
        </div>

        <div className="mt-5 flex gap-2">
          <button onClick={onClose} disabled={isSubmitting} className="flex-1 rounded-full border border-border py-3 text-sm font-bold disabled:opacity-50">Cancelar</button>
          <button onClick={submit} disabled={isSubmitting} className="flex-1 rounded-full bg-brand-strong py-3 text-sm font-black text-white hover:opacity-90 disabled:opacity-50">
            {isSubmitting ? "Publicando..." : "Publicar avaliação"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ status }: { status: OrderStatus }) {
  const meta = statusMeta[status];
  const Icon = meta.icon;
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-muted">
        <Icon className="h-9 w-9 text-muted-foreground" strokeWidth={1.4} />
      </div>
      <p className="mt-4 text-sm font-semibold">Nenhum pedido {meta.label.toLowerCase()}</p>
      <p className="mt-1 text-xs text-muted-foreground">Quando tiveres um pedido, aparece aqui.</p>
      <Link to="/" className="mt-4 rounded-full bg-foreground px-6 py-2 text-xs font-bold text-background inline-flex items-center gap-1">
        Continuar comprando <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
