import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { getAnyProduct as getProduct } from "@/lib/products-store";
import { formatKz } from "@/lib/format";
import { actions, useStore } from "@/lib/store";
import { orderActions } from "@/lib/orders-store";
import { usePaymentMethods } from "@/lib/payments-store";
import { newOrderCode, setPendingPayment } from "@/lib/pending-payment";
import { validateCoupon, type Coupon } from "@/lib/coupons-store";
import { listAddresses, saveAddress, saveCheckoutDraft, clearCheckoutDraft } from "@/lib/firebase/user-data";
import { emptyAddress, readCachedAddress, writeCachedAddress } from "@/lib/address-cache";
import { sendAppEmail } from "@/lib/email/send";
import { Check, ChevronRight, ChevronDown, Minus, Plus, ShieldCheck, CreditCard, MapPin } from "lucide-react";



export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar Compra — Bazarixy" },
      { name: "description", content: "Complete seu pedido em 3 etapas: endereço, confirmação e pagamento." },
    ],
  }),
  component: CheckoutPage,
});

type Address = {
  name: string; phone: string; countryCode: string;
  street: string; complement: string; state: string; city: string; cep: string;
  isDefault: boolean;
};

const STEPS = [
  { id: 1, label: "Adicione o endereço" },
  { id: 2, label: "Confirme o pedido" },
  { id: 3, label: "Pague" },
];

function Stepper({ step }: { step: number }) {
  return (
    <div className="bg-muted/40 px-4 py-4">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        {STEPS.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;
          return (
            <div key={s.id} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${done || active ? "bg-sale text-white" : "bg-muted text-muted-foreground"}`}>
                  {done ? <Check className="h-4 w-4" /> : s.id}
                </div>
                <span className={`mt-1 max-w-[110px] truncate text-[11px] font-semibold ${done || active ? "text-sale" : "text-muted-foreground"}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 h-[3px] flex-1 rounded-full ${step > s.id ? "bg-sale" : "bg-muted"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, user } = useStore();
  const items = cart
    .map((c, idx) => ({ ...c, idx, product: getProduct(c.id)! }))
    .filter((i) => i.product && i.selected !== false);
  const subtotal = items.reduce((s, i) => s + (i.unitPrice ?? i.product.price) * i.qty, 0);

  useEffect(() => {
    if (!user) navigate({ to: "/auth" });
  }, [user, navigate]);

  const cached = readCachedAddress(user?.uid);
  const [step, setStep] = useState(() => (cached?.name && cached.street && cached.city && cached.cep ? 2 : 1));
  // Endereço guardado no dispositivo → nova compra já vem preenchida.
  const [address, setAddress] = useState<Address>(() => cached ?? emptyAddress);


  const methods = usePaymentMethods().filter((m) => m.active);
  const [payment, setPayment] = useState<string | null>(null);
  const [card, setCard] = useState({ number: "", holder: "", exp: "", cvv: "" });
  const [showCardForm, setShowCardForm] = useState(false);
  const [placed, setPlaced] = useState(false);

  // Cupom
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const discount = coupon ? Math.min(coupon.type === "percent" ? (subtotal * coupon.value) / 100 : coupon.value, subtotal) : 0;
  const total = Math.max(subtotal - discount, 0);

  const applyCoupon = () => {
    const res = validateCoupon(couponCode, subtotal);
    if (!res.ok) { setCoupon(null); setCouponError(res.error); return; }
    setCoupon(res.coupon);
    setCouponError("");
  };

  // Endereço padrão guardado → salta directo para «Confirme o pedido».
  const [addressLoaded, setAddressLoaded] = useState(false);
  useEffect(() => {
    const uid = user?.uid;
    if (!uid || addressLoaded) return;
    let alive = true;
    void listAddresses(uid)
      .then((rows) => {
        if (!alive) return;
        setAddressLoaded(true);
        const def = rows.find((r) => r.isDefault) ?? rows[0];
        if (!def) return;
        const raw = (def.phone ?? "").trim();
        const cc = def.countryCode || (raw.startsWith("+") ? raw.split(" ")[0] : "+244");
        const phone = raw.startsWith("+") ? raw.slice(cc.length).trim() : raw;
        const next = {
          name: def.name ?? "", phone, countryCode: cc,
          street: def.street ?? "", complement: def.complement ?? "",
          state: def.state ?? "", city: def.city ?? "", cep: def.cep ?? "",
          isDefault: def.isDefault ?? true,
        };
        setAddress(next);
        writeCachedAddress(uid, next);
        if (def.isDefault && def.name && def.street && def.city) setStep((s) => (s === 1 ? 2 : s));

      })
      .catch(() => setAddressLoaded(true));
    return () => { alive = false; };
  }, [user?.uid, addressLoaded]);

  const canConfirmAddress = address.name && address.phone && address.street && address.city && address.cep;

  // Checkout abandonado: guarda o rascunho enquanto o pedido não é concluído.
  useEffect(() => {
    if (!user?.uid || placed || items.length === 0) return;
    const t = setTimeout(() => {
      void saveCheckoutDraft(user.uid!, {
        step,
        total,
        items: items.map((i) => ({ productId: i.id, qty: i.qty, size: i.size, color: i.color, unitPrice: i.unitPrice ?? i.product.price, image: i.image ?? i.product.image })),
        address,
        paymentMethod: payment,
        coupon: coupon?.code ?? null,
      });
    }, 800);
    return () => clearTimeout(t);
  }, [user?.uid, placed, step, total, payment, address, coupon, items.length]);

  const placeOrder = () => {
    const uid = user?.uid ?? null;
    writeCachedAddress(uid, address);
    if (uid) void saveAddress(uid, {
      name: address.name, phone: `${address.countryCode} ${address.phone}`,
      countryCode: address.countryCode, street: address.street, complement: address.complement,
      city: address.city, state: address.state, cep: address.cep, country: "Angola",
      isDefault: address.isDefault,
    }).catch(() => {});
    void clearCheckoutDraft(uid);
    const orderId = orderActions.add({
      status: "processing",
      items: items.map((i) => ({ productId: i.id, qty: i.qty, size: i.size, color: i.color, unitPrice: i.unitPrice ?? i.product.price, image: i.image ?? i.product.image })),
      total,
      customer: user?.email || address.name,
      paymentMethod: payment ?? undefined,
      shippingAddress: {
        name: address.name, phone: `${address.countryCode} ${address.phone}`,
        street: address.street, complement: address.complement,
        city: address.city, state: address.state, cep: address.cep, country: "Angola",
      },
      notes: coupon ? `Cupom aplicado: ${coupon.code}` : undefined,
    });
    // Confirmação por e-mail (Resend) — nunca bloqueia o fluxo da compra.
    if (user?.email) {
      void sendAppEmail("order-confirmation", user.email, {
        name: address.name || user.name,
        orderCode: orderId,
        items: items.map((i) => ({
          name: i.product.name,
          qty: i.qty,
          price: formatKz((i.unitPrice ?? i.product.price) * i.qty),
          image: i.image ?? i.product.image,
        })),
        subtotal: formatKz(subtotal),
        discount: discount > 0 ? formatKz(discount) : undefined,
        total: formatKz(total),
        address: [address.street, address.complement, address.city, address.state, "Angola"].filter(Boolean).join(", "),
        paymentMethod: payment ?? undefined,
      });
    }
    setPlaced(true);
    actions.removeSelected();
  };





  if (items.length === 0 && !placed) {
    return (
      <Layout title="Faça seu pedido em 3 etapas" showBack hideBottomNav>
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <p className="font-bold">Sua sacola está vazia</p>
          <Link to="/" className="mt-4 rounded-full bg-foreground px-6 py-2 text-xs font-bold text-background">Explorar</Link>
        </div>
      </Layout>
    );
  }

  if (placed) {
    return (
      <Layout title="Pedido confirmado" showBack hideBottomNav>
        <div className="mx-auto max-w-lg px-6 py-16 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">Pedido realizado!</h1>
          <p className="mt-1 text-sm text-muted-foreground">Obrigado pela sua compra. Enviaremos atualizações por e-mail.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/orders" className="flex-1 rounded-full bg-foreground py-3 text-sm font-bold text-background">Meus Pedidos</Link>
            <Link to="/" className="flex-1 rounded-full border border-border py-3 text-sm font-bold">Continuar</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Faça seu pedido em 3 etapas" showBack hideBottomNav hideHeader showSearch={false}>
      <Stepper step={step} />

      <div className="mx-auto grid max-w-5xl gap-4 px-3 py-4 md:grid-cols-[1fr_360px] md:px-0">
        <div className="space-y-4">
          {step === 1 && (
            <>
              <section className="rounded-xl bg-card p-4 shadow-sm">
                <h2 className="font-bold">País / Região</h2>
                <button className="mt-3 flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm">
                  <span className="flex items-center gap-2"><span>🇦🇴</span> Angola</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </section>

              <section className="rounded-xl bg-card p-4 shadow-sm">
                <h2 className="font-bold">Informações pessoais</h2>
                <Field label="Nome de contato*" value={address.name} onChange={(v) => setAddress({ ...address, name: v })} error={!address.name ? "Por favor, insira seu nome" : undefined} />
                <div className="mt-3 grid grid-cols-[110px_1fr] gap-3">
                  <div className="rounded-lg border border-border px-3 py-2">
                    <div className="text-[10px] text-muted-foreground">Código do país</div>
                    <div className="font-bold">{address.countryCode}</div>
                  </div>
                  <Field label="Número de celular* (9 dígitos)" value={address.phone} onChange={(v) => setAddress({ ...address, phone: v })} format="phone" />
                </div>
              </section>

              <section className="rounded-xl bg-card p-4 shadow-sm">
                <h2 className="font-bold">Endereço</h2>
                <div className="space-y-3">
                  <Field label="Bairro / Condomínio / Centralidade*" value={address.street} onChange={(v) => setAddress({ ...address, street: v })} />
                  <Field label="Apartamento, andar, bloco, / Referência etc." value={address.complement} onChange={(v) => setAddress({ ...address, complement: v })} />
                  <Field label="Província*" value={address.state} onChange={(v) => setAddress({ ...address, state: v })} />
                  <Field label="Município / Cidade*" value={address.city} onChange={(v) => setAddress({ ...address, city: v })} />
                  <Field label="Código Postal*" value={address.cep} onChange={(v) => setAddress({ ...address, cep: v })} format="numeric" maxLength={8} />
                </div>
              </section>

              <section className="flex items-center justify-between rounded-xl bg-card p-4 shadow-sm">
                <span className="text-sm">Definir como endereço padrão de envio</span>
                <button
                  onClick={() => setAddress({ ...address, isDefault: !address.isDefault })}
                  className={`relative h-6 w-11 rounded-full transition ${address.isDefault ? "bg-sale" : "bg-muted"}`}
                  aria-label="toggle"
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${address.isDefault ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </section>
            </>
          )}

          {step === 2 && (
            <>
              <section className="rounded-xl bg-card p-4 shadow-sm">
                <h2 className="font-bold">Endereços de Entrega</h2>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{address.name}</p>
                    <p className="text-sm text-muted-foreground">{address.countryCode} {address.phone}</p>
                    <p className="text-sm text-muted-foreground">{address.cep}</p>
                    <p className="text-sm text-muted-foreground">{[address.street, address.complement, address.city, address.state, "Angola"].filter(Boolean).join(", ")}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="p-2 text-muted-foreground"><ChevronRight className="h-5 w-5" /></button>
                </div>
                <button
                  onClick={() => { setAddress(emptyAddress); setStep(1); }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2.5 text-xs font-bold text-muted-foreground hover:bg-muted"
                >
                  <MapPin className="h-4 w-4" /> Usar outro endereço
                </button>
              </section>


              {items.map((item) => (
                <section key={item.idx} className="rounded-xl bg-card p-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded bg-yellow-200 px-1.5 py-0.5 font-bold text-yellow-900">Choice</span>
                    <span className="font-semibold">Enviado pela Bazarixy</span>
                    <button className="text-sky-600">Visualizar({item.qty})</button>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <img src={item.image ?? item.product.image} alt={item.product.name} className="h-24 w-24 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm line-clamp-2">{item.product.name}</p>
                      <p className="mt-1 font-bold">{formatKz(item.unitPrice ?? item.product.price)}</p>
                      <div className="mt-2 inline-flex items-center rounded-md border border-border">
                        <button onClick={() => actions.updateQty(item.idx, item.qty - 1)} className="grid h-7 w-7 place-items-center"><Minus className="h-3 w-3" /></button>
                        <span className="w-7 text-center text-sm">{item.qty}</span>
                        <button onClick={() => actions.updateQty(item.idx, item.qty + 1)} className="grid h-7 w-7 place-items-center"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 border-t border-border pt-2 text-sm">
                    <p className="font-bold">Envio: Frete grátis</p>
                    <p className="text-muted-foreground">Entrega: 12 de agosto</p>
                  </div>
                </section>
              ))}

              <section className="rounded-xl bg-card p-4 shadow-sm text-sm">
                <h2 className="font-bold">Resumo</h2>
                <div className="mt-3 flex justify-between"><span>Subtotal</span><span>{formatKz(subtotal)}</span></div>

                <div className="mt-3 border-y border-border py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Cupom de desconto</span>
                    <Link to="/coupons" className="text-[11px] font-bold text-sky-600">Ver cupons</Link>
                  </div>
                  {coupon ? (
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">
                      <span className="font-mono text-xs font-black text-emerald-700">{coupon.code}</span>
                      <span className="text-xs font-bold text-emerald-700">-{formatKz(discount)}</span>
                      <button onClick={() => { setCoupon(null); setCouponCode(""); }} className="text-[11px] font-bold text-red-600">Remover</button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => { e.preventDefault(); applyCoupon(); }}
                      className="mt-2 flex gap-2"
                    >
                      <input
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                        placeholder="Digite o código aqui"
                        className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs uppercase outline-none focus:border-foreground"
                      />
                      <button type="submit" className="rounded-lg bg-foreground px-4 py-2 text-xs font-bold text-background">Aplicar</button>
                    </form>
                  )}
                  {couponError && <p className="mt-1 text-[11px] text-red-500">{couponError}</p>}
                </div>

                {discount > 0 && (
                  <div className="mt-2 flex justify-between text-emerald-700"><span>Desconto</span><span>-{formatKz(discount)}</span></div>
                )}
                <div className="mt-2 flex justify-between"><span>Frete</span><span>grátis</span></div>
                <div className="mt-2 flex justify-between text-base font-bold"><span>Total</span><span className="text-sale">{formatKz(total)}</span></div>
                <p className="mt-4 text-[11px] text-muted-foreground">
                  Ao clicar "Fazer o pedido", eu afirmo que li e estou de acordo{" "}
                  <Link to="/termos" className="text-sky-600">com os termos e condições de uso</Link>.
                </p>
              </section>

            </>
          )}

          {step === 3 && (
            <>
              <p className="flex items-center gap-2 text-sm text-emerald-600"><ShieldCheck className="h-4 w-4" /> Sua informação de pagamento está segura conosco.</p>

              {methods.map((m) => (
                <section key={m.id} className="rounded-xl bg-card p-4 shadow-sm">
                  <button
                    onClick={() => { setPayment(m.id as any); setShowCardForm(m.id === "card"); }}
                    className="flex w-full items-center gap-3 text-left"
                  >
                    <span className={`grid h-5 w-5 flex-none place-items-center rounded-full border ${payment === m.id ? "border-sale" : "border-muted-foreground"}`}>
                      {payment === m.id && <span className="h-2.5 w-2.5 rounded-full bg-sale" />}
                    </span>
                    {m.image ? (
                      <span className="grid h-12 w-12 flex-none place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-border">
                        <img src={m.image} alt={m.label} className="max-h-10 max-w-10 object-contain" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      </span>
                    ) : (
                      <span className="grid h-12 w-12 flex-none place-items-center rounded-lg bg-muted">
                        <CreditCard className="h-6 w-6" />
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold">{m.label}</span>
                      <span className="block text-[11px] text-muted-foreground">{m.desc}</span>
                    </span>
                  </button>

                  {m.id === "card" && payment === "card" && showCardForm && (
                    <div className="mt-4 space-y-3">
                      <Field label="Número do Cartão" value={card.number} onChange={(v) => setCard({ ...card, number: v })} format="numeric" maxLength={19} />
                      <Field label="Nome do Titular" value={card.holder} onChange={(v) => setCard({ ...card, holder: v })} />
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="MM/AA" value={card.exp} onChange={(v) => setCard({ ...card, exp: v })} />
                        <Field label="CVV" value={card.cvv} onChange={(v) => setCard({ ...card, cvv: v })} format="numeric" maxLength={4} />
                      </div>
                    </div>
                  )}
                </section>
              ))}

              <section className="rounded-xl bg-card p-4 text-xs shadow-sm">
                <p className="font-bold">Próximo passo</p>
                <p className="mt-1 text-muted-foreground">
                  Ao tocar em «Pagar» vai para a página do método escolhido, com as instruções e o envio do comprovativo.
                </p>
              </section>


              <div className="rounded-xl bg-card p-4 text-xs shadow-sm">
                <p className="flex items-center gap-2 font-bold"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Bazarixy protege suas informações do pagamento</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>✓ Protocolo PCI DSS</li>
                  <li>✓ Todas as informações permanecem seguras</li>
                  <li>✓ Todos os dados são criptografados</li>
                </ul>
              </div>

            </>
          )}
        </div>

        {/* Desktop summary rail */}
        <aside className="hidden md:block">
          <div className="sticky top-24 rounded-xl bg-card p-4 shadow-sm">
            <h3 className="font-bold">Resumo</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Itens ({items.length})</span><span>{formatKz(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span>grátis</span></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold"><span>Total</span><span className="text-sale">{formatKz(total)}</span></div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom action bar */}
      <div className="sticky bottom-0 left-0 right-0 z-30 border-t border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-3 py-3">
          {step === 3 ? (
            <button className="flex items-center gap-1 text-sm font-bold">
              {formatKz(total)} <ChevronDown className="h-4 w-4" />
            </button>
          ) : (
            <div className="text-sm">
              <div className="text-muted-foreground text-[11px]">Total</div>
              <div className="font-bold text-sale">{formatKz(total)}</div>
            </div>
          )}
          <button
            disabled={(step === 1 && !canConfirmAddress) || (step === 3 && !payment)}
            onClick={() => {
              if (step === 1) setStep(2);
              else if (step === 2) setStep(3);
              else if (payment === "card") placeOrder();
              else if (payment) {
                const code = newOrderCode();
                setPendingPayment({
                  code,
                  methodId: payment,
                  total,
                  items: items.map((i) => ({ productId: i.id, name: i.product.name, qty: i.qty, size: i.size, color: i.color, unitPrice: i.unitPrice ?? i.product.price, image: i.image ?? i.product.image })),
                  customer: user?.email || address.name,
                  shippingAddress: {
                    name: address.name, phone: `${address.countryCode} ${address.phone}`,
                    street: address.street, complement: address.complement,
                    city: address.city, state: address.state, cep: address.cep, country: "Angola",
                  },
                });
                void navigate({ to: "/pay/$method", params: { method: payment } }).then(() => actions.removeSelected());
              }
            }}
            className="ml-auto min-w-[180px] rounded-full bg-foreground py-3 text-sm font-bold text-background disabled:opacity-50"

          >
            {step === 1 ? "Salvar endereço" : step === 2 ? "Fazer o pedido" : "Pagar"}
          </button>

        </div>
      </div>
    </Layout>
  );
}

function formatPhone(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 9);
  return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

function Field({ label, value, onChange, error, inputMode, format, maxLength }: { label: string; value: string; onChange: (v: string) => void; error?: string; inputMode?: "text" | "numeric" | "tel"; format?: "phone" | "numeric"; maxLength?: number }) {
  const handle = (raw: string) => {
    if (format === "phone") return onChange(formatPhone(raw));
    if (format === "numeric") {
      const d = raw.replace(/\D/g, "");
      return onChange(maxLength ? d.slice(0, maxLength) : d);
    }
    onChange(raw);
  };
  return (
    <div className="mt-3">
      <div className="rounded-lg border border-border px-3 py-2">
        <label className="block text-[10px] text-muted-foreground">{label}</label>
        <input
          value={value}
          inputMode={format === "phone" || format === "numeric" ? "numeric" : inputMode}
          onChange={(e) => handle(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
