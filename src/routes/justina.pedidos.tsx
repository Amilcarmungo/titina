import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Trash2,
  Eye,
  Printer,
  MapPin,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  X,
  Package as PackageIcon,
  Store as StoreIcon,
} from "lucide-react";
import {
  useOrders,
  orderActions,
  packagesOf,
  STAGE_LABEL,
  type OrderStatus,
  type Order,
  type PackageStage,
} from "@/lib/orders-store";

/** Etapas que a equipa pode aplicar manualmente a um envio. */
const ADMIN_STAGES: PackageStage[] = [
  "awaiting_payment",
  "payment_review",
  "payment_rejected",
  "payment_accepted",
  "preparing",
  "shipped",
  "delivered",
];
import { getAnyProduct } from "@/lib/products-store";
import { getShop } from "@/lib/shops-store";
import { formatKz } from "@/lib/format";
import { AdminModal } from "@/components/admin/AdminModal";
import logoAsset from "@/assets/bazarixy-logo.webp.asset.json";

function shopsForOrder(order: Order): string[] {
  const names = new Set<string>();
  for (const it of order.items) {
    const p = getAnyProduct(it.productId);
    const sid = p?.shopId ?? "main";
    const s = getShop(sid);
    names.add(s?.name ?? "Bazarixy Oficial");
  }
  return Array.from(names);
}

type InvoiceItem = {
  qty: number;
  size?: string;
  color?: string;
  unitPrice?: number;
  product?: { name: string; price: number };
};

/** Renders one quarter-A4 invoice card. Four of these fit on a single A4 sheet. */
function invoiceCard(order: Order, items: InvoiceItem[], logo: string) {
  const rows = items
    .map((it, i) => {
      const unit = it.unitPrice ?? it.product?.price ?? 0;
      const variant = [
        it.size && `Tam: ${it.size}`,
        it.color && `Cor: ${it.color}`,
      ]
        .filter(Boolean)
        .join(" · ");
      return `<tr>
      <td class="c">${i + 1}</td>
      <td><strong>${it.product?.name ?? "Produto"}</strong>${variant ? `<div class="muted">${variant}</div>` : ""}</td>
      <td class="c">${it.qty}</td>
      <td class="r">${formatKz(unit)}</td>
      <td class="r"><strong>${formatKz(unit * it.qty)}</strong></td>
    </tr>`;
    })
    .join("");

  const addr = order.shippingAddress;
  const delivery =
    [
      addr?.street,
      addr?.complement,
      addr?.city,
      addr?.state,
      addr?.cep,
      addr?.country ?? "Angola",
    ]
      .filter(Boolean)
      .join(", ") || "—";

  /** QR code gerado pelo serviço público goqr.me (api.qrserver.com) — aponta para o pedido. */
  const trackUrl = `${typeof window !== "undefined" ? window.location.origin : "https://bazarixy.ao"}/orders?pedido=${encodeURIComponent(order.id)}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=${encodeURIComponent(trackUrl)}`;

  return `<section class="inv">
    <header>
      <img src="${logo}" alt="Bazarixy" />
      <div class="meta">
        <div class="ttl">FATURA</div>
        <div><b>Pedido:</b> #${order.id}</div>
        <div><b>Data:</b> ${order.createdAt}</div>
      </div>
    </header>
    <div class="box">
      <div class="lbl">Endereço de entrega</div>
      <b>${addr?.name ?? order.customer ?? "Cliente"}</b> · <b>Tel.:</b> ${addr?.phone ?? "—"}<br/>
      ${delivery}
    </div>
    <table>
      <thead><tr><th class="c">#</th><th>Descrição</th><th class="c">Qtd</th><th class="r">Unit.</th><th class="r">Total</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="totals">
      <div><span>Subtotal</span><span>${formatKz(order.subtotal ?? order.total)}</span></div>
      ${order.discount ? `<div><span>Desconto</span><span>-${formatKz(order.discount)}</span></div>` : ""}
      <div><span>Entrega</span><span>${order.shipping?.isFree ? "Grátis" : formatKz(order.shipping?.chargedFee ?? 0)}</span></div>
      <div class="grand"><span>Total</span><span>${formatKz(order.total)}</span></div>
    </div>
    <footer>
      <img class="qr" src="${qrSrc}" alt="QR do pedido ${order.id}" />
      <span>Digitalize para acompanhar o pedido</span>
    </footer>
  </section>`;
}

function openInvoiceWindow(cards: string) {
  const html = `<!doctype html><html lang="pt"><head><meta charset="utf-8">
  <title>Faturas — Bazarixy</title>
  <style>
    @page { size: A4; margin: 6mm; }
    *{box-sizing:border-box}
    body{font-family:"Helvetica Neue",Arial,sans-serif;color:#111;margin:0}
    .sheet{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:138mm;gap:4mm}
    .inv{border:1px solid #d4d4d4;border-radius:3mm;padding:5mm;display:flex;flex-direction:column;overflow:hidden;page-break-inside:avoid}
    .inv header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #111;padding-bottom:2.5mm}
    .inv header img{height:9mm}
    .meta{text-align:right;font-size:7.5pt;line-height:1.5}
    .ttl{font-size:12pt;font-weight:800;letter-spacing:-.3px}
    .box{margin-top:3mm;border:1px solid #e7e7e7;border-radius:2mm;padding:2.5mm;font-size:7pt;line-height:1.45}
    .lbl{font-size:6pt;text-transform:uppercase;letter-spacing:.1em;color:#777;margin-bottom:1mm}
    table{width:100%;border-collapse:collapse;font-size:7pt;margin-top:3mm}
    th{background:#111;color:#fff;text-align:left;padding:1.4mm;font-size:6pt;text-transform:uppercase;letter-spacing:.08em}
    td{padding:1.6mm;border-bottom:1px solid #eee;vertical-align:top}
    .muted{color:#777;font-size:6pt}
    .c{text-align:center}.r{text-align:right}
    .totals{margin-top:auto;padding-top:2mm;font-size:7.5pt}
    .totals div{display:flex;justify-content:space-between;padding:0.6mm 0}
    .totals .grand{border-top:1.5px solid #111;font-size:9.5pt;font-weight:800;padding-top:1.5mm}
    footer{margin-top:2mm;border-top:1px solid #eee;padding-top:1.5mm;font-size:5.8pt;color:#777;display:flex;align-items:center;gap:2mm}
    footer .qr{width:13mm;height:13mm}
  </style></head><body><div class="sheet">${cards}</div>
  <script>window.onload=function(){window.print()}</script>
  </body></html>`;

  const w = window.open("", "_blank", "width=900,height=1000");
  if (!w) {
    toast.error("Permite pop-ups para imprimir a fatura.");
    return;
  }
  w.document.write(html);
  w.document.close();
}

function logoUrl() {
  return typeof window !== "undefined"
    ? window.location.origin + logoAsset.url
    : logoAsset.url;
}

function printInvoice(order: Order, items: InvoiceItem[]) {
  if (order.status !== "processing") {
    toast.error(
      "A fatura só pode ser impressa quando o pedido está em Processando.",
    );
    return;
  }
  openInvoiceWindow(invoiceCard(order, items, logoUrl()));
}

/** Prints every «Processando» order — 4 invoices per A4 sheet. */
function printInvoiceBatch(orders: Order[]) {
  const ready = orders.filter((o) => o.status === "processing");
  if (ready.length === 0) {
    toast.error("Nenhum pedido em Processando para imprimir.");
    return;
  }
  const logo = logoUrl();
  const cards = ready
    .map((o) => {
      const items = o.items
        .map((it) => ({ ...it, product: getAnyProduct(it.productId) }))
        .filter((i) => i.product);
      return invoiceCard(o, items, logo);
    })
    .join("");
  openInvoiceWindow(cards);
}

export const Route = createFileRoute("/justina/pedidos")({
  component: OrdersPage,
});

const STATUSES: {
  key: OrderStatus;
  label: string;
  color: string;
  dot: string;
}[] = [
  {
    key: "unpaid",
    label: "A pagar",
    color: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  {
    key: "processing",
    label: "Processando",
    color: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  {
    key: "shipped",
    label: "Enviado",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  {
    key: "review",
    label: "Avaliar",
    color: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
  },
  {
    key: "returns",
    label: "Devolução",
    color: "bg-gray-200 text-gray-700",
    dot: "bg-gray-500",
  },
];

function OrdersPage() {
  const orders = useOrders();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [selected, setSelected] = useState<string | null>(null);
  const list =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const current = selected
    ? (orders.find((o) => o.id === selected) ?? null)
    : null;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-black tracking-tight">
            Pedidos
          </h1>
          <p className="text-xs text-muted-foreground">
            {orders.length} pedido(s) registrados · toque para ver detalhes
          </p>
        </div>
        <button
          onClick={() => printInvoiceBatch(orders)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted"
        >
          <Printer className="h-3.5 w-3.5" /> Imprimir facturas (4/A4)
        </button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap ${filter === "all" ? "bg-foreground text-background" : "bg-muted"}`}
        >
          Todos ({orders.length})
        </button>
        {STATUSES.map((s) => {
          const n = orders.filter((o) => o.status === s.key).length;
          return (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap ${filter === s.key ? "bg-foreground text-background" : "bg-muted"}`}
            >
              {s.label} ({n})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {list.map((o) => {
          const meta = STATUSES.find((s) => s.key === o.status)!;
          const shops = shopsForOrder(o);
          return (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className="w-full text-left rounded-2xl bg-background p-4 shadow-[var(--shadow-card)] transition hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-black">#{o.id}</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${meta.color}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
                      />
                      {meta.label}
                    </span>
                    {o.paymentProof && (
                      <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[10px] font-bold">
                        ✓ comprovante
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {o.createdAt} · {o.customer || "cliente"}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <StoreIcon className="h-3 w-3" />
                    <span className="font-semibold text-foreground">
                      {shops.join(" · ")}
                    </span>
                  </p>
                  <p className="mt-1 text-xs">
                    {o.items.reduce((s, i) => s + i.qty, 0)} item(s) ·{" "}
                    <span className="font-bold text-sale">
                      {formatKz(o.total)}
                    </span>
                  </p>
                </div>

                <span className="rounded-full border border-border px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1">
                  <Eye className="h-3 w-3" /> Detalhes
                </span>
              </div>
              <div className="mt-3 flex gap-1.5 overflow-x-auto">
                {o.items.map((it, idx) => {
                  const p = getAnyProduct(it.productId);
                  if (!p) return null;
                  return (
                    <div
                      key={idx}
                      className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border"
                    >
                      <img
                        src={p.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      {it.qty > 1 && (
                        <span className="absolute right-0.5 bottom-0.5 rounded bg-black/70 px-1 text-[9px] font-bold text-white">
                          x{it.qty}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </button>
          );
        })}
        {list.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Nenhum pedido.
          </p>
        )}
      </div>

      {current && (
        <OrderDetail order={current} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function OrderDetail({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const [proofOpen, setProofOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);

  const items = useMemo(
    () =>
      order.items
        .map((it) => ({ ...it, product: getAnyProduct(it.productId) }))
        .filter((i) => i.product),
    [order],
  );
  const meta = STATUSES.find((s) => s.key === order.status)!;

  const confirmChange = (target: OrderStatus) => {
    // Guard critical transitions
    if (
      order.status === "unpaid" &&
      target !== "unpaid" &&
      !order.paymentProof
    ) {
      toast.error("Sem comprovante — verifique o pagamento antes de avançar.");
      return;
    }
    setPendingStatus(target);
  };

  const applyStatus = () => {
    if (!pendingStatus) return;
    orderActions.updateStatus(order.id, pendingStatus);
    toast.success("Estado atualizado com segurança");
    setPendingStatus(null);
  };

  return (
    <>
      <AdminModal
        open
        onClose={onClose}
        title={`Pedido #${order.id}`}
        subtitle={`${order.createdAt} · ${order.customer ?? "cliente"}`}
        size="xl"
        footer={
          <>
            <button
              onClick={() => printInvoice(order, items)}
              disabled={order.status !== "processing"}
              title={
                order.status !== "processing"
                  ? "Só é possível imprimir a fatura quando o pedido está em Processando"
                  : "Imprimir fatura"
              }
              className="mr-auto rounded-full border border-border px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 enabled:hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Printer className="h-3.5 w-3.5" /> Imprimir fatura
            </button>
            <button
              onClick={() => {
                if (confirm("Remover pedido?")) {
                  orderActions.remove(order.id);
                  toast.success("Removido");
                  onClose();
                }
              }}

              className="rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 inline-flex items-center gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" /> Excluir
            </button>
            <button
              onClick={onClose}
              className="rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background"
            >
              Fechar
            </button>
          </>
        }
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black">Status atual</h3>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${meta.color}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                  {meta.label}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {STATUSES.map((s) => (
                  <button
                    key={s.key}
                    disabled={s.key === order.status}
                    onClick={() => confirmChange(s.key)}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${s.key === order.status ? "bg-foreground text-background opacity-60" : "border border-border hover:bg-muted"}`}
                  >
                    → {s.label}
                  </button>
                ))}
              </div>
              {order.status === "unpaid" && !order.paymentProof && (
                <p className="mt-3 inline-flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-[11px] font-medium text-amber-800">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5" />
                  Não avance sem verificar o comprovante — obrigatório para
                  segurança da entrega.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-border p-4">
              <h3 className="text-sm font-black inline-flex items-center gap-1.5">
                <PackageIcon className="h-4 w-4" /> Envios por loja
              </h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Cada loja tem o seu ritmo. Ao mudar a etapa, o cliente recebe a
                notificação correspondente.
              </p>
              <div className="mt-3 space-y-3">
                {packagesOf(order).map((pkg, i, all) => (
                  <div
                    key={pkg.id}
                    className="rounded-xl border border-border/70 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-bold">
                        {all.length > 1
                          ? `Envio ${i + 1}/${all.length} · `
                          : ""}
                        {pkg.shopName}
                      </p>
                      <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold">
                        {STAGE_LABEL[pkg.stage]}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {ADMIN_STAGES.map((s) => (
                        <button
                          key={s}
                          disabled={s === pkg.stage}
                          onClick={() => {
                            orderActions.setPackageStage(order.id, pkg.id, s, {
                              notify: true,
                            });
                            toast.success(
                              "Etapa atualizada e cliente notificado",
                            );
                          }}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                            s === pkg.stage
                              ? "bg-foreground text-background opacity-60"
                              : "border border-border hover:bg-muted"
                          }`}
                        >
                          {STAGE_LABEL[s]}
                        </button>
                      ))}
                    </div>
                    {pkg.eta && (
                      <p className="mt-2 text-[11px] font-semibold text-emerald-700">
                        {pkg.eta}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border p-4">
              <h3 className="mb-3 text-sm font-black inline-flex items-center gap-1.5">
                <PackageIcon className="h-4 w-4" /> Itens do pedido
              </h3>
              <div className="divide-y divide-border">
                {items.map((it, i) => {
                  const shop = getShop(it.product!.shopId ?? "main");
                  return (
                    <div key={i} className="flex items-center gap-3 py-3">
                      <img
                        src={it.product!.image}
                        alt=""
                        className="h-14 w-14 rounded-lg object-cover ring-1 ring-border"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-bold">
                          {it.product!.name}
                        </p>
                        <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-foreground/80">
                          <StoreIcon className="h-3 w-3" />{" "}
                          {shop?.name ?? "Bazarixy Oficial"}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {it.size && `Tam: ${it.size}`}
                          {it.size && it.color && " · "}
                          {it.color && `Cor: ${it.color}`} · Qtd: {it.qty}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {formatKz(it.unitPrice ?? it.product!.price)} ×{" "}
                          {it.qty}
                        </p>
                        <p className="text-sm font-black text-sale">
                          {formatKz(
                            (it.unitPrice ?? it.product!.price) * it.qty,
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3">
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">Subtotal:</span>{" "}
                    {formatKz(order.subtotal ?? order.total)}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Frete:</span>{" "}
                    {order.shipping?.isFree ? (
                      <span className="font-bold text-emerald-700">Grátis</span>
                    ) : (
                      formatKz(order.shipping?.chargedFee ?? 0)
                    )}
                  </p>
                  <p className="mt-1 font-bold">Total</p>
                </div>
                <span className="text-lg font-black text-sale">
                  {formatKz(order.total)}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-border p-4">
              <h3 className="mb-3 text-sm font-black inline-flex items-center gap-1.5">
                <CreditCard className="h-4 w-4" /> Pagamento & comprovante
              </h3>
              <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
                <div className="space-y-1.5 text-sm">
                  <p>
                    <span className="text-muted-foreground">Método:</span>{" "}
                    <span className="font-bold">
                      {order.paymentMethod ?? "—"}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Valor:</span>{" "}
                    <span className="font-bold text-sale">
                      {formatKz(order.total)}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Frete:</span>{" "}
                    {order.shipping?.isFree ? (
                      <span className="font-bold text-emerald-700">Grátis</span>
                    ) : (
                      formatKz(order.shipping?.chargedFee ?? 0)
                    )}
                  </p>
                  <p
                    className={`inline-flex items-center gap-1.5 text-xs font-bold ${order.paymentProof ? "text-emerald-700" : "text-amber-700"}`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {order.paymentProof
                      ? "Comprovante anexado"
                      : "Sem comprovante"}
                  </p>
                </div>
                {order.paymentProof ? (
                  <button
                    onClick={() => setProofOpen(true)}
                    className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-border"
                  >
                    <img
                      src={order.paymentProof}
                      alt="Comprovante"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-black/60 py-1 text-center text-[10px] font-bold text-white">
                      Ver
                    </span>
                  </button>
                ) : (
                  <div className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-border text-[11px] text-muted-foreground text-center px-2">
                    Nenhum comprovante enviado
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border p-4">
              <h3 className="mb-2 text-sm font-black inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> Endereço
              </h3>
              {order.shippingAddress ? (
                <div className="space-y-0.5 text-sm">
                  <p className="font-bold">
                    {order.shippingAddress.name ?? order.customer}
                  </p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.phone}
                  </p>
                  <p>
                    {[
                      order.shippingAddress.street,
                      order.shippingAddress.complement,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <p>
                    {[order.shippingAddress.city, order.shippingAddress.state]
                      .filter(Boolean)
                      .join(" — ")}
                  </p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.cep} ·{" "}
                    {order.shippingAddress.country ?? "Angola"}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Endereço não informado.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-border p-4 text-xs">
              <h3 className="mb-2 text-sm font-black">
                Checklist antes de enviar
              </h3>
              <ul className="space-y-1.5 text-muted-foreground">
                <li className="flex items-center gap-2">
                  {order.paymentProof ? "✅" : "⚠️"} Comprovante verificado
                </li>
                <li className="flex items-center gap-2">
                  {order.shippingAddress ? "✅" : "⚠️"} Endereço confirmado
                </li>
                <li className="flex items-center gap-2">
                  {items.length > 0 ? "✅" : "⚠️"} Produtos separados
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </AdminModal>

      {proofOpen && order.paymentProof && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4"
          onClick={() => setProofOpen(false)}
        >
          <button className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white text-foreground">
            <X className="h-5 w-5" />
          </button>
          <img
            src={order.paymentProof}
            alt="Comprovante"
            className="max-h-[90vh] max-w-full rounded-xl"
          />
        </div>
      )}

      {pendingStatus && (
        <AdminModal
          open
          onClose={() => setPendingStatus(null)}
          title="Confirmar mudança de estado"
          size="sm"
          footer={
            <>
              <button
                onClick={() => setPendingStatus(null)}
                className="rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted"
              >
                Cancelar
              </button>
              <button
                onClick={applyStatus}
                className="rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background"
              >
                Confirmar
              </button>
            </>
          }
        >
          <div className="space-y-3 text-sm">
            <p>
              Vais mudar o estado do pedido{" "}
              <span className="font-black">#{order.id}</span> para{" "}
              <span className="font-black">
                {STATUSES.find((s) => s.key === pendingStatus)?.label}
              </span>
              .
            </p>
            {pendingStatus === "shipped" && (
              <div className="rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
                <p className="font-bold">
                  Antes de marcar como enviado, confirma:
                </p>
                <ul className="mt-1 list-disc pl-4">
                  <li>Comprovante de pagamento verificado</li>
                  <li>Endereço de entrega correto</li>
                  <li>Todos os produtos separados e embalados</li>
                </ul>
              </div>
            )}
          </div>
        </AdminModal>
      )}
    </>
  );
}
