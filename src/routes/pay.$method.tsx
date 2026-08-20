import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { formatKz } from "@/lib/format";
import { orderActions } from "@/lib/orders-store";
import { getPaymentMethod, usePaymentMethods } from "@/lib/payments-store";
import { clearPendingPayment, getPendingPayment, type PendingPayment } from "@/lib/pending-payment";
import { storagePaths } from "@/lib/firebase/storage";
import { uploadProofFile } from "@/lib/firebase/upload";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { Check, Copy, FileText, Info, ShieldCheck, Trash2, Upload, Clock, LoaderCircle } from "lucide-react";

export const Route = createFileRoute("/pay/$method")({
  head: () => ({
    meta: [
      { title: "Pagamento — Bazarixy" },
      { name: "description", content: "Conclua o pagamento do seu pedido e envie o comprovativo para validação." },
      { property: "og:title", content: "Pagamento — Bazarixy" },
      { property: "og:description", content: "Instruções de pagamento e envio de comprovativo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PayMethodPage,
});

const defaultSteps = [
  "Abra a app do método escolhido no seu telemóvel.",
  "Copie os dados ao lado (número, valor e código do pedido).",
  "Confirme o envio e guarde o comprovativo.",
  "Carregue o comprovativo aqui para concluir o pedido.",
];

function PayMethodPage() {
  const { method: methodParam } = useParams({ from: "/pay/$method" });
  const navigate = useNavigate();
  const methods = usePaymentMethods();
  const [pending, setPending] = useState<PendingPayment | null>(null);
  const [proof, setProof] = useState<{ file: File; preview: string; name: string; type: string } | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const finishLock = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setPending(getPendingPayment()); }, []);

  const methodId = methodParam === "express" ? "multicaixa-express" : methodParam;
  const method = useMemo(
    () => methods.find((m) => m.id === methodId) ?? getPaymentMethod(pending?.methodId),
    [methods, methodId, pending],
  );
  const isExpress = (method?.id ?? methodId) === "multicaixa-express";

  const message = useMemo(
    () => (pending?.items ?? []).map((i) => `${i.qty}x ${i.name}`).join(", ").slice(0, 140),
    [pending],
  );

  const copy = (value: string, label: string) => {
    navigator.clipboard?.writeText(value);
    toast.success(`${label} copiado`);
  };

  // O ficheiro fica só no dispositivo; o envio para o Storage acontece ao finalizar.
  const pickFile = (f?: File) => {
    if (!f) return;
    const ok = f.type.startsWith("image/") || f.type === "application/pdf";
    if (!ok) { toast.error("Só é aceite imagem ou PDF."); return; }
    if (f.size > 8 * 1024 * 1024) { toast.error("Ficheiro muito grande (máx. 8 MB)."); return; }
    setProof((prev) => {
      if (prev?.preview) URL.revokeObjectURL(prev.preview);
      return { file: f, preview: URL.createObjectURL(f), name: f.name, type: f.type };
    });
  };

  const clearProof = () => {
    setProof((prev) => { if (prev?.preview) URL.revokeObjectURL(prev.preview); return null; });
  };

  const finish = async () => {
    if (!pending || !proof || sending || finishLock.current) return;
    const uid = getFirebaseAuth()?.currentUser?.uid;
    if (!uid) { toast.error("Entre na sua conta para enviar o comprovativo."); return; }
    finishLock.current = true;
    setSending(true);
    setProgress(0);
    const url = await uploadProofFile(proof.file, storagePaths.proof(uid, pending.code, proof.file.name), setProgress);
    setSending(false);
    if (!url) { finishLock.current = false; return; }
    const id = orderActions.add({
      id: pending.code,
      status: "processing",
      items: pending.items.map((i) => ({ productId: i.productId, qty: i.qty, size: i.size, color: i.color, unitPrice: i.unitPrice })),
      subtotal: pending.subtotal,
      discount: pending.discount,
      shipping: pending.shipping,
      total: pending.total,
      customer: pending.customer,
      paymentMethod: method?.id ?? methodId,
      paymentProof: url,
      shippingAddress: pending.shippingAddress,
      notes: `Pagamento enviado por ${method?.label ?? methodId} · Comprovativo: ${proof.name}`,
    });
    clearPendingPayment();
    if (proof.preview) URL.revokeObjectURL(proof.preview);
    setDone(id);
  };

  if (done) {
    return (
      <Layout hideHeader hideBottomNav>
        <div className="mx-auto max-w-md px-6 py-16 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-amber-600">
            <Clock className="h-8 w-8" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-black">Pagamento enviado</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            O seu pagamento do pedido <b>{done}</b> está a ser avaliado. Assim que o comprovativo for validado, a encomenda segue para envio — pode acompanhar o estado em «Meus pedidos».
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/orders" search={{ tab: "processing" as const }} className="flex-1 rounded-full bg-foreground py-3 text-sm font-bold text-background">Meus pedidos</Link>
            <Link to="/" className="flex-1 rounded-full border border-border py-3 text-sm font-bold">Continuar</Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!pending) {
    return (
      <Layout hideHeader hideBottomNav>
        <div className="mx-auto max-w-md px-6 py-20 text-center">
          <p className="font-bold">Nenhum pagamento pendente</p>
          <p className="mt-1 text-sm text-muted-foreground">Finalize um pedido no checkout para pagar.</p>
          <button onClick={() => navigate({ to: "/cart" })} className="mt-5 rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background">
            Ir para a sacola
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideHeader hideBottomNav>
      <div className="mx-auto max-w-5xl px-3 pb-28 pt-4 md:px-0 md:pb-10">
        {/* Brand bar */}
        <div className="overflow-hidden rounded-2xl" style={{ background: isExpress ? "linear-gradient(90deg,#f59e0b,#f97316)" : "linear-gradient(90deg,#111827,#374151)" }}>
          <div className="flex items-center justify-center gap-2 px-4 py-3 text-white">
            {method?.image ? (
              <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-white/90">
                <img src={method.image} alt={method.label} className="max-h-7 max-w-7 object-contain" />
              </span>
            ) : (
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/25 text-sm font-black">✳</span>
            )}
            <span className="font-display text-xl font-black tracking-tight">{method?.label ?? "Pagamento"}</span>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,380px)_1fr] md:items-start">
          <div className="space-y-4">
            {isExpress ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl p-4 text-white shadow-[var(--shadow-card)]"
                style={{ background: "radial-gradient(120% 120% at 20% 0%, #2f8fe0 0%, #1565c0 45%, #0b3f8f 100%)" }}>
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20" />
                <div className="absolute -right-16 top-6 h-48 w-48 rounded-full border border-white/10" />
                <div className="flex items-start justify-between">
                  <span className="font-display text-xl font-black tracking-tight">BAI</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest opacity-80">Débito</span>
                </div>
                <div className="mt-4 h-8 w-11 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500" />
                <div className="mt-4 font-mono text-base tracking-[0.18em] opacity-95">•••• •••• •••• ••••</div>
                <div className="mt-3 flex items-end justify-between text-[10px] uppercase tracking-widest opacity-85">
                  <span>Válido até<br /><span className="text-sm tracking-normal">07/29</span></span>
                  <span className="text-sm normal-case tracking-normal opacity-90">{method?.label ?? "Multicaixa Express"}</span>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-foreground p-5 text-background shadow-[var(--shadow-card)]">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Pagamento seguro</p>
                <p className="mt-2 font-display text-2xl font-black">{method?.label ?? "Pagamento"}</p>
                <p className="mt-1 text-xs opacity-80">{method?.desc}</p>
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <span className="font-mono text-sm tracking-widest opacity-80">{pending.code}</span>
                  <span className="font-display text-lg font-black">{formatKz(pending.total)}</span>
                </div>
              </div>
            )}

            <div className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
              <h2 className="flex items-center gap-2 text-sm font-black"><Info className="h-4 w-4 text-sale" /> Como pagar</h2>
              <ol className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                {(method?.instructions ? method.instructions.split("\n").filter(Boolean) : defaultSteps).map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-foreground text-[9px] font-black text-background">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-600"><ShieldCheck className="h-3.5 w-3.5" /> O pedido só é enviado após validação do comprovativo.</p>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
            <CopyRow label="Número de telemóvel / conta" value={method?.phone || "923 000 000"} onCopy={copy} mono />
            <CopyRow label="Valor (máximo de 250.000 Kz por transferência)" value={formatKz(pending.total)} onCopy={copy} highlight />
            <CopyRow label="Nome Ordenante (código do pedido)" value={pending.code} onCopy={copy} mono />
            <CopyRow label="Mensagem" value={message || "Compra Bazarixy"} onCopy={copy} multiline />

            <div className="pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Comprovativo *</p>
              <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => pickFile(e.target.files?.[0])} />
              {!proof ? (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="mt-2 flex w-full flex-col items-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-muted/40 px-4 py-7 text-center transition hover:border-sale hover:bg-sale/5"
                >
                  <Upload className="h-5 w-5 text-sale" />
                  <span className="text-sm font-bold">Carregar comprovativo</span>
                  <span className="text-[11px] text-muted-foreground">Imagem (JPG, PNG) ou PDF · máx. 8 MB</span>
                </button>
              ) : (
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-border p-3">
                  {proof.type === "application/pdf" ? (
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-muted"><FileText className="h-6 w-6" /></span>
                  ) : (
                    <img src={proof.preview} alt="Comprovativo" className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-border" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{proof.name}</p>
                    <button onClick={() => fileRef.current?.click()} className="text-[11px] font-bold text-sale">Substituir ficheiro</button>
                  </div>
                  <button onClick={clearProof} className="grid h-9 w-9 place-items-center rounded-lg border border-border text-destructive hover:bg-destructive/10" aria-label="Remover">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
              <p className="mt-2 text-[11px] text-muted-foreground">
                {proof ? "O comprovativo é enviado ao tocar em «Finalizar»." : "Sem comprovativo não é possível finalizar."}
              </p>
            </div>

            <button
              onClick={() => void finish()}
              disabled={!proof || sending}
              className="hidden w-full rounded-full py-3 text-sm font-black text-white transition disabled:cursor-not-allowed disabled:opacity-50 md:block"
              style={{ background: "linear-gradient(90deg,#f59e0b,#f43f7e)" }}
            >
              {sending ? `A enviar comprovativo… ${progress}%` : `Finalizar pedido · ${formatKz(pending.total)}`}
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background px-3 py-3 md:hidden">
        <button
          onClick={() => void finish()}
          disabled={!proof || sending}
          className="w-full rounded-full py-3 text-sm font-black text-white disabled:opacity-50"
          style={{ background: "linear-gradient(90deg,#f59e0b,#f43f7e)" }}
        >
          {sending ? `A enviar… ${progress}%` : `Finalizar · ${formatKz(pending.total)}`}
        </button>
      </div>
    </Layout>
  );
}

function CopyRow({ label, value, onCopy, mono, highlight, multiline }: {
  label: string; value: string; onCopy: (v: string, l: string) => void;
  mono?: boolean; highlight?: boolean; multiline?: boolean;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-start gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5">
        <span className={`min-w-0 flex-1 text-sm ${mono ? "font-mono tracking-wide" : ""} ${highlight ? "text-base font-black text-sale" : "font-semibold"} ${multiline ? "line-clamp-3" : "truncate"}`}>
          {value}
        </span>
        <button onClick={() => onCopy(value, label)} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-background hover:bg-muted" aria-label={`Copiar ${label}`}>
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
