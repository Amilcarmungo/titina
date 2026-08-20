import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as orderActions, l as useOrders, o as packagesOf, r as STAGE_LABEL } from "./orders-store-qQk2r5Yq.mjs";
import { t as getAnyProduct } from "./products-store-DJ_irs6P.mjs";
import { t as getShop } from "./shops-store-CX-UvhEW.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as bazarixy_logo_webp_asset_default } from "./bazarixy-logo.webp.asset-DpuZaeeP.mjs";
import { H as Package, I as Printer, J as MapPin, _ as Store, d as TriangleAlert, kt as CreditCard, n as X, p as Trash2, w as ShieldCheck, wt as Eye } from "../_libs/lucide-react.mjs";
import { r as AdminModal } from "./AdminModal-DXEoyymL.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pedidos-CyIvq0kH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Etapas que a equipa pode aplicar manualmente a um envio. */
var ADMIN_STAGES = [
	"awaiting_payment",
	"payment_review",
	"payment_rejected",
	"payment_accepted",
	"preparing",
	"shipped",
	"delivered"
];
function shopsForOrder(order) {
	const names = /* @__PURE__ */ new Set();
	for (const it of order.items) {
		const sid = getAnyProduct(it.productId)?.shopId ?? "main";
		const s = getShop(sid);
		names.add(s?.name ?? "Bazarixy Oficial");
	}
	return Array.from(names);
}
/** Renders one quarter-A4 invoice card. Four of these fit on a single A4 sheet. */
function invoiceCard(order, items, logo) {
	const rows = items.map((it, i) => {
		const unit = it.unitPrice ?? it.product?.price ?? 0;
		const variant = [it.size && `Tam: ${it.size}`, it.color && `Cor: ${it.color}`].filter(Boolean).join(" · ");
		return `<tr>
      <td class="c">${i + 1}</td>
      <td><strong>${it.product?.name ?? "Produto"}</strong>${variant ? `<div class="muted">${variant}</div>` : ""}</td>
      <td class="c">${it.qty}</td>
      <td class="r">${formatKz(unit)}</td>
      <td class="r"><strong>${formatKz(unit * it.qty)}</strong></td>
    </tr>`;
	}).join("");
	const addr = order.shippingAddress;
	const delivery = [
		addr?.street,
		addr?.complement,
		addr?.city,
		addr?.state,
		addr?.cep,
		addr?.country ?? "Angola"
	].filter(Boolean).join(", ") || "—";
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
function openInvoiceWindow(cards) {
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
  <script>window.onload=function(){window.print()}<\/script>
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
	return typeof window !== "undefined" ? window.location.origin + bazarixy_logo_webp_asset_default.url : bazarixy_logo_webp_asset_default.url;
}
function printInvoice(order, items) {
	if (order.status !== "processing") {
		toast.error("A fatura só pode ser impressa quando o pedido está em Processando.");
		return;
	}
	openInvoiceWindow(invoiceCard(order, items, logoUrl()));
}
/** Prints every «Processando» order — 4 invoices per A4 sheet. */
function printInvoiceBatch(orders) {
	const ready = orders.filter((o) => o.status === "processing");
	if (ready.length === 0) {
		toast.error("Nenhum pedido em Processando para imprimir.");
		return;
	}
	const logo = logoUrl();
	openInvoiceWindow(ready.map((o) => {
		return invoiceCard(o, o.items.map((it) => ({
			...it,
			product: getAnyProduct(it.productId)
		})).filter((i) => i.product), logo);
	}).join(""));
}
var STATUSES = [
	{
		key: "unpaid",
		label: "A pagar",
		color: "bg-red-100 text-red-700",
		dot: "bg-red-500"
	},
	{
		key: "processing",
		label: "Processando",
		color: "bg-amber-100 text-amber-700",
		dot: "bg-amber-500"
	},
	{
		key: "shipped",
		label: "Enviado",
		color: "bg-blue-100 text-blue-700",
		dot: "bg-blue-500"
	},
	{
		key: "review",
		label: "Avaliar",
		color: "bg-purple-100 text-purple-700",
		dot: "bg-purple-500"
	},
	{
		key: "returns",
		label: "Devolução",
		color: "bg-gray-200 text-gray-700",
		dot: "bg-gray-500"
	}
];
function OrdersPage() {
	const orders = useOrders();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const list = filter === "all" ? orders : orders.filter((o) => o.status === filter);
	const current = selected ? orders.find((o) => o.id === selected) ?? null : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-black tracking-tight",
						children: "Pedidos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [orders.length, " pedido(s) registrados · toque para ver detalhes"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => printInvoiceBatch(orders),
					className: "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold hover:bg-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3.5 w-3.5" }), " Imprimir facturas (4/A4)"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1.5 overflow-x-auto no-scrollbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setFilter("all"),
					className: `rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap ${filter === "all" ? "bg-foreground text-background" : "bg-muted"}`,
					children: [
						"Todos (",
						orders.length,
						")"
					]
				}), STATUSES.map((s) => {
					const n = orders.filter((o) => o.status === s.key).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilter(s.key),
						className: `rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap ${filter === s.key ? "bg-foreground text-background" : "bg-muted"}`,
						children: [
							s.label,
							" (",
							n,
							")"
						]
					}, s.key);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [list.map((o) => {
					const meta = STATUSES.find((s) => s.key === o.status);
					const shops = shopsForOrder(o);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelected(o.id),
						className: "w-full text-left rounded-2xl bg-background p-4 shadow-[var(--shadow-card)] transition hover:shadow-lg hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-black",
												children: ["#", o.id]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${meta.color}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${meta.dot}` }), meta.label]
											}),
											o.paymentProof && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[10px] font-bold",
												children: "✓ comprovante"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-[11px] text-muted-foreground",
										children: [
											o.createdAt,
											" · ",
											o.customer || "cliente"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: shops.join(" · ")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs",
										children: [
											o.items.reduce((s, i) => s + i.qty, 0),
											" item(s) ·",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-sale",
												children: formatKz(o.total)
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full border border-border px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3" }), " Detalhes"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex gap-1.5 overflow-x-auto",
							children: o.items.map((it, idx) => {
								const p = getAnyProduct(it.productId);
								if (!p) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: "",
										className: "h-full w-full object-cover"
									}), it.qty > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "absolute right-0.5 bottom-0.5 rounded bg-black/70 px-1 text-[9px] font-bold text-white",
										children: ["x", it.qty]
									})]
								}, idx);
							})
						})]
					}, o.id);
				}), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "Nenhum pedido."
				})]
			}),
			current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderDetail, {
				order: current,
				onClose: () => setSelected(null)
			})
		]
	});
}
function OrderDetail({ order, onClose }) {
	const [proofOpen, setProofOpen] = (0, import_react.useState)(false);
	const [pendingStatus, setPendingStatus] = (0, import_react.useState)(null);
	const items = (0, import_react.useMemo)(() => order.items.map((it) => ({
		...it,
		product: getAnyProduct(it.productId)
	})).filter((i) => i.product), [order]);
	const meta = STATUSES.find((s) => s.key === order.status);
	const confirmChange = (target) => {
		if (order.status === "unpaid" && target !== "unpaid" && !order.paymentProof) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
			open: true,
			onClose,
			title: `Pedido #${order.id}`,
			subtitle: `${order.createdAt} · ${order.customer ?? "cliente"}`,
			size: "xl",
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => printInvoice(order, items),
					disabled: order.status !== "processing",
					title: order.status !== "processing" ? "Só é possível imprimir a fatura quando o pedido está em Processando" : "Imprimir fatura",
					className: "mr-auto rounded-full border border-border px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 enabled:hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3.5 w-3.5" }), " Imprimir fatura"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						if (confirm("Remover pedido?")) {
							orderActions.remove(order.id);
							toast.success("Removido");
							onClose();
						}
					},
					className: "rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Excluir"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background",
					children: "Fechar"
				})
			] }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-[1fr_320px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-black",
										children: "Status atual"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${meta.color}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${meta.dot}` }), meta.label]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-1.5",
									children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										disabled: s.key === order.status,
										onClick: () => confirmChange(s.key),
										className: `rounded-full px-3 py-1.5 text-xs font-bold transition ${s.key === order.status ? "bg-foreground text-background opacity-60" : "border border-border hover:bg-muted"}`,
										children: ["→ ", s.label]
									}, s.key))
								}),
								order.status === "unpaid" && !order.paymentProof && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 inline-flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-[11px] font-medium text-amber-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 mt-0.5" }), "Não avance sem verificar o comprovante — obrigatório para segurança da entrega."]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-black inline-flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), " Envios por loja"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-[11px] text-muted-foreground",
									children: "Cada loja tem o seu ritmo. Ao mudar a etapa, o cliente recebe a notificação correspondente."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 space-y-3",
									children: packagesOf(order).map((pkg, i, all) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/70 p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "truncate text-xs font-bold",
													children: [all.length > 1 ? `Envio ${i + 1}/${all.length} · ` : "", pkg.shopName]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold",
													children: STAGE_LABEL[pkg.stage]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 flex flex-wrap gap-1.5",
												children: ADMIN_STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													disabled: s === pkg.stage,
													onClick: () => {
														orderActions.setPackageStage(order.id, pkg.id, s, { notify: true });
														toast.success("Etapa atualizada e cliente notificado");
													},
													className: `rounded-full px-2.5 py-1 text-[11px] font-bold transition ${s === pkg.stage ? "bg-foreground text-background opacity-60" : "border border-border hover:bg-muted"}`,
													children: STAGE_LABEL[s]
												}, s))
											}),
											pkg.eta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-[11px] font-semibold text-emerald-700",
												children: pkg.eta
											})
										]
									}, pkg.id))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "mb-3 text-sm font-black inline-flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), " Itens do pedido"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-border",
									children: items.map((it, i) => {
										const shop = getShop(it.product.shopId ?? "main");
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 py-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: it.product.image,
													alt: "",
													className: "h-14 w-14 rounded-lg object-cover ring-1 ring-border"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 flex-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "line-clamp-1 text-sm font-bold",
															children: it.product.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-foreground/80",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-3 w-3" }),
																" ",
																shop?.name ?? "Bazarixy Oficial"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[11px] text-muted-foreground",
															children: [
																it.size && `Tam: ${it.size}`,
																it.size && it.color && " · ",
																it.color && `Cor: ${it.color}`,
																" · Qtd: ",
																it.qty
															]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-right",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-muted-foreground",
														children: [
															formatKz(it.unitPrice ?? it.product.price),
															" ×",
															" ",
															it.qty
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm font-black text-sale",
														children: formatKz((it.unitPrice ?? it.product.price) * it.qty)
													})]
												})
											]
										}, i);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex justify-between border-t border-border pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Subtotal:"
												}),
												" ",
												formatKz(order.subtotal ?? order.total)
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Frete:"
												}),
												" ",
												order.shipping?.isFree ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-emerald-700",
													children: "Grátis"
												}) : formatKz(order.shipping?.chargedFee ?? 0)
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-bold",
												children: "Total"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg font-black text-sale",
										children: formatKz(order.total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "mb-3 text-sm font-black inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4" }), " Pagamento & comprovante"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-[1fr_140px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Método:"
											}),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold",
												children: order.paymentMethod ?? "—"
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Valor:"
											}),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-sale",
												children: formatKz(order.total)
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Frete:"
											}),
											" ",
											order.shipping?.isFree ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-emerald-700",
												children: "Grátis"
											}) : formatKz(order.shipping?.chargedFee ?? 0)
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: `inline-flex items-center gap-1.5 text-xs font-bold ${order.paymentProof ? "text-emerald-700" : "text-amber-700"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), order.paymentProof ? "Comprovante anexado" : "Sem comprovante"]
										})
									]
								}), order.paymentProof ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setProofOpen(true),
									className: "relative aspect-square overflow-hidden rounded-xl ring-1 ring-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: order.paymentProof,
										alt: "Comprovante",
										className: "h-full w-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute inset-x-0 bottom-0 bg-black/60 py-1 text-center text-[10px] font-bold text-white",
										children: "Ver"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid aspect-square place-items-center rounded-xl border-2 border-dashed border-border text-[11px] text-muted-foreground text-center px-2",
									children: "Nenhum comprovante enviado"
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-2 text-sm font-black inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), " Endereço"]
						}), order.shippingAddress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-0.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: order.shippingAddress.name ?? order.customer
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: order.shippingAddress.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: [order.shippingAddress.street, order.shippingAddress.complement].filter(Boolean).join(", ") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: [order.shippingAddress.city, order.shippingAddress.state].filter(Boolean).join(" — ") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted-foreground",
									children: [
										order.shippingAddress.cep,
										" ·",
										" ",
										order.shippingAddress.country ?? "Angola"
									]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Endereço não informado."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border p-4 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-sm font-black",
							children: "Checklist antes de enviar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-1.5 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [order.paymentProof ? "✅" : "⚠️", " Comprovante verificado"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [order.shippingAddress ? "✅" : "⚠️", " Endereço confirmado"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [items.length > 0 ? "✅" : "⚠️", " Produtos separados"]
								})
							]
						})]
					})]
				})]
			})
		}),
		proofOpen && order.paymentProof && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4",
			onClick: () => setProofOpen(false),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: order.paymentProof,
				alt: "Comprovante",
				className: "max-h-[90vh] max-w-full rounded-xl"
			})]
		}),
		pendingStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
			open: true,
			onClose: () => setPendingStatus(null),
			title: "Confirmar mudança de estado",
			size: "sm",
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setPendingStatus(null),
				className: "rounded-full border border-border px-5 py-2 text-sm font-bold hover:bg-muted",
				children: "Cancelar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: applyStatus,
				className: "rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background",
				children: "Confirmar"
			})] }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Vais mudar o estado do pedido",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-black",
						children: ["#", order.id]
					}),
					" para",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-black",
						children: STATUSES.find((s) => s.key === pendingStatus)?.label
					}),
					"."
				] }), pendingStatus === "shipped" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-amber-50 p-3 text-xs text-amber-900",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold",
						children: "Antes de marcar como enviado, confirma:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-1 list-disc pl-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Comprovante de pagamento verificado" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Endereço de entrega correto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Todos os produtos separados e embalados" })
						]
					})]
				})]
			})
		})
	] });
}
//#endregion
export { OrdersPage as component };
