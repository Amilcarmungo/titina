import { r as __toESM } from "../_runtime.mjs";
import { C as saveAddress, F as useStore, l as actions, p as clearCheckoutDraft, w as saveCheckoutDraft, y as listAddresses } from "./router-BKH7YloI.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as orderActions } from "./orders-store-CICR66I0.mjs";
import { t as getAnyProduct } from "./products-store-TDcUsz9F.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as formatKz } from "./format-DAL2ZktZ.mjs";
import { Bt as ChevronDown, J as MapPin, R as Plus, Rt as ChevronRight, Vt as Check, W as Minus, kt as CreditCard, w as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Layout } from "./Layout-DPypAtH7.mjs";
import { i as quoteShipping, l as useShippingSettings, o as shippingOptions } from "./logistics-store-CyhBKYKg.mjs";
import { t as sendAppEmail } from "./send-Dtuv1lVJ.mjs";
import { r as usePaymentMethods } from "./payments-store-estnBhgv.mjs";
import { i as setPendingPayment, r as newOrderCode } from "./pending-payment-DaWfZjfD.mjs";
import { r as validateCoupon } from "./coupons-store-0vi0k8j5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-HhKG0bwB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Cache local do endereço de entrega.
*
* Guarda o último endereço usado no dispositivo para que, numa nova compra, o
* checkout apareça já preenchido (mesmo antes do Firestore responder). O
* utilizador pode sempre editar ou adicionar outro endereço.
*/
var KEY = "bx_address_cache_v1";
function readCachedAddress(uid) {
	if (typeof window === "undefined") return null;
	try {
		return JSON.parse(localStorage.getItem(KEY) || "{}")[uid || "anon"] ?? null;
	} catch {
		return null;
	}
}
function writeCachedAddress(uid, address) {
	if (typeof window === "undefined") return;
	try {
		const all = JSON.parse(localStorage.getItem(KEY) || "{}");
		all[uid || "anon"] = address;
		localStorage.setItem(KEY, JSON.stringify(all));
	} catch {}
}
var emptyAddress = {
	name: "",
	phone: "",
	countryCode: "+244",
	street: "",
	complement: "",
	state: "",
	city: "",
	cep: "",
	isDefault: true
};
var STEPS = [
	{
		id: 1,
		label: "Adicione o endereço"
	},
	{
		id: 2,
		label: "Confirme o pedido"
	},
	{
		id: 3,
		label: "Pague"
	}
];
function Stepper({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-muted/40 px-4 py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex max-w-3xl items-center justify-between",
			children: STEPS.map((s, i) => {
				const done = step > s.id;
				const active = step === s.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 items-center last:flex-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${done || active ? "bg-sale text-white" : "bg-muted text-muted-foreground"}`,
							children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : s.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `mt-1 max-w-[110px] truncate text-[11px] font-semibold ${done || active ? "text-sale" : "text-muted-foreground"}`,
							children: s.label
						})]
					}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mx-2 h-[3px] flex-1 rounded-full ${step > s.id ? "bg-sale" : "bg-muted"}` })]
				}, s.id);
			})
		})
	});
}
function CheckoutPage() {
	const navigate = useNavigate();
	const { cart, user } = useStore();
	const items = cart.map((c, idx) => ({
		...c,
		idx,
		product: getAnyProduct(c.id)
	})).filter((i) => i.product && i.selected !== false);
	const subtotal = items.reduce((s, i) => s + (i.unitPrice ?? i.product.price) * i.qty, 0);
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth" });
	}, [user, navigate]);
	const cached = readCachedAddress(user?.uid);
	const [step, setStep] = (0, import_react.useState)(() => cached?.name && cached.street && cached.city && cached.cep ? 2 : 1);
	const [address, setAddress] = (0, import_react.useState)(() => cached ?? emptyAddress);
	const [carrierId, setCarrierId] = (0, import_react.useState)();
	const shippingSettings = useShippingSettings();
	const shippingOptionsForOrder = shippingOptions(subtotal, address);
	const shipping = quoteShipping(subtotal, carrierId, address);
	const methods = usePaymentMethods().filter((m) => m.active);
	const [payment, setPayment] = (0, import_react.useState)(null);
	const [card, setCard] = (0, import_react.useState)({
		number: "",
		holder: "",
		exp: "",
		cvv: ""
	});
	const [showCardForm, setShowCardForm] = (0, import_react.useState)(false);
	const [placed, setPlaced] = (0, import_react.useState)(false);
	const [couponCode, setCouponCode] = (0, import_react.useState)("");
	const [coupon, setCoupon] = (0, import_react.useState)(null);
	const [couponError, setCouponError] = (0, import_react.useState)("");
	const discount = coupon ? Math.min(coupon.type === "percent" ? subtotal * coupon.value / 100 : coupon.value, subtotal) : 0;
	const total = Math.max(subtotal - discount + (shipping?.chargedFee ?? 0), 0);
	const applyCoupon = () => {
		const res = validateCoupon(couponCode, subtotal);
		if (!res.ok) {
			setCoupon(null);
			setCouponError(res.error);
			return;
		}
		setCoupon(res.coupon);
		setCouponError("");
	};
	const [addressLoaded, setAddressLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const uid = user?.uid;
		if (!uid || addressLoaded) return;
		let alive = true;
		listAddresses(uid).then((rows) => {
			if (!alive) return;
			setAddressLoaded(true);
			const def = rows.find((r) => r.isDefault) ?? rows[0];
			if (!def) return;
			const raw = (def.phone ?? "").trim();
			const cc = def.countryCode || (raw.startsWith("+") ? raw.split(" ")[0] : "+244");
			const phone = raw.startsWith("+") ? raw.slice(cc.length).trim() : raw;
			const next = {
				name: def.name ?? "",
				phone,
				countryCode: cc,
				street: def.street ?? "",
				complement: def.complement ?? "",
				state: def.state ?? "",
				city: def.city ?? "",
				cep: def.cep ?? "",
				isDefault: def.isDefault ?? true
			};
			setAddress(next);
			writeCachedAddress(uid, next);
			if (def.isDefault && def.name && def.street && def.city) setStep((s) => s === 1 ? 2 : s);
		}).catch(() => setAddressLoaded(true));
		return () => {
			alive = false;
		};
	}, [user?.uid, addressLoaded]);
	const canConfirmAddress = address.name && address.phone && address.street && address.city && address.cep;
	(0, import_react.useEffect)(() => {
		if (!user?.uid || placed || items.length === 0) return;
		const t = setTimeout(() => {
			saveCheckoutDraft(user.uid, {
				step,
				total,
				items: items.map((i) => ({
					productId: i.id,
					qty: i.qty,
					size: i.size,
					color: i.color,
					unitPrice: i.unitPrice ?? i.product.price,
					image: i.image ?? i.product.image
				})),
				address,
				paymentMethod: payment,
				coupon: coupon?.code ?? null,
				shipping
			});
		}, 800);
		return () => clearTimeout(t);
	}, [
		user?.uid,
		placed,
		step,
		total,
		payment,
		address,
		coupon,
		items.length
	]);
	const placeOrder = () => {
		const uid = user?.uid ?? null;
		writeCachedAddress(uid, address);
		if (uid) saveAddress(uid, {
			name: address.name,
			phone: `${address.countryCode} ${address.phone}`,
			countryCode: address.countryCode,
			street: address.street,
			complement: address.complement,
			city: address.city,
			state: address.state,
			cep: address.cep,
			country: "Angola",
			isDefault: address.isDefault
		}).catch(() => {});
		clearCheckoutDraft(uid);
		const orderId = orderActions.add({
			status: "processing",
			items: items.map((i) => ({
				productId: i.id,
				qty: i.qty,
				size: i.size,
				color: i.color,
				unitPrice: i.unitPrice ?? i.product.price,
				image: i.image ?? i.product.image
			})),
			subtotal,
			discount,
			shipping: shipping ? { ...shipping } : void 0,
			total,
			customer: user?.email || address.name,
			paymentMethod: payment ?? void 0,
			shippingAddress: {
				name: address.name,
				phone: `${address.countryCode} ${address.phone}`,
				street: address.street,
				complement: address.complement,
				city: address.city,
				state: address.state,
				cep: address.cep,
				country: "Angola"
			},
			notes: coupon ? `Cupom aplicado: ${coupon.code}` : void 0
		});
		if (user?.email) sendAppEmail("order-confirmation", user.email, {
			name: address.name || user.name,
			orderCode: orderId,
			items: items.map((i) => ({
				name: i.product.name,
				qty: i.qty,
				price: formatKz((i.unitPrice ?? i.product.price) * i.qty),
				image: i.image ?? i.product.image
			})),
			subtotal: formatKz(subtotal),
			discount: discount > 0 ? formatKz(discount) : void 0,
			total: formatKz(total),
			address: [
				address.street,
				address.complement,
				address.city,
				address.state,
				"Angola"
			].filter(Boolean).join(", "),
			paymentMethod: payment ?? void 0
		});
		setPlaced(true);
		actions.removeSelected();
	};
	if (items.length === 0 && !placed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		title: "Faça seu pedido em 3 etapas",
		showBack: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center px-6 py-20 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-bold",
				children: "Sua sacola está vazia"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 rounded-full bg-foreground px-6 py-2 text-xs font-bold text-background",
				children: "Explorar"
			})]
		})
	});
	if (placed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		title: "Pedido confirmado",
		showBack: true,
		hideBottomNav: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg px-6 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-8 w-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-2xl font-bold",
					children: "Pedido realizado!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Obrigado pela sua compra. Enviaremos atualizações por e-mail."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders",
						className: "flex-1 rounded-full bg-foreground py-3 text-sm font-bold text-background",
						children: "Meus Pedidos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex-1 rounded-full border border-border py-3 text-sm font-bold",
						children: "Continuar"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		title: "Faça seu pedido em 3 etapas",
		showBack: true,
		hideBottomNav: true,
		hideHeader: true,
		showSearch: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, { step }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-5xl gap-4 px-3 py-4 md:grid-cols-[1fr_360px] md:px-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl bg-card p-4 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-bold",
									children: "País / Região"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "mt-3 flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🇦🇴" }), " Angola"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl bg-card p-4 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-bold",
										children: "Informações pessoais"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Nome de contato*",
										value: address.name,
										onChange: (v) => setAddress({
											...address,
											name: v
										}),
										error: !address.name ? "Por favor, insira seu nome" : void 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid grid-cols-[110px_1fr] gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border px-3 py-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground",
												children: "Código do país"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold",
												children: address.countryCode
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Número de celular* (9 dígitos)",
											value: address.phone,
											onChange: (v) => setAddress({
												...address,
												phone: v
											}),
											format: "phone"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl bg-card p-4 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-bold",
									children: "Endereço"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Bairro / Condomínio / Centralidade*",
											value: address.street,
											onChange: (v) => setAddress({
												...address,
												street: v
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Apartamento, andar, bloco, / Referência etc.",
											value: address.complement,
											onChange: (v) => setAddress({
												...address,
												complement: v
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Província*",
											value: address.state,
											onChange: (v) => setAddress({
												...address,
												state: v
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Município / Cidade*",
											value: address.city,
											onChange: (v) => setAddress({
												...address,
												city: v
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Código Postal*",
											value: address.cep,
											onChange: (v) => setAddress({
												...address,
												cep: v
											}),
											format: "numeric",
											maxLength: 8
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "flex items-center justify-between rounded-xl bg-card p-4 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Definir como endereço padrão de envio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setAddress({
										...address,
										isDefault: !address.isDefault
									}),
									className: `relative h-6 w-11 rounded-full transition ${address.isDefault ? "bg-sale" : "bg-muted"}`,
									"aria-label": "toggle",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${address.isDefault ? "left-[22px]" : "left-0.5"}` })
								})]
							})
						] }),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl bg-card p-4 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-bold",
										children: "Endereços de Entrega"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold",
												children: address.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-muted-foreground",
												children: [
													address.countryCode,
													" ",
													address.phone
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: address.cep
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: [
													address.street,
													address.complement,
													address.city,
													address.state,
													"Angola"
												].filter(Boolean).join(", ")
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setStep(1),
											className: "p-2 text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setAddress(emptyAddress);
											setStep(1);
										},
										className: "mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2.5 text-xs font-bold text-muted-foreground hover:bg-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), " Usar outro endereço"]
									})
								]
							}),
							items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl bg-card p-4 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-yellow-200 px-1.5 py-0.5 font-bold text-yellow-900",
												children: "Choice"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: "Enviado pela Bazarixy"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: "text-sky-600",
												children: [
													"Visualizar(",
													item.qty,
													")"
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: item.image ?? item.product.image,
											alt: item.product.name,
											className: "h-24 w-24 rounded-lg object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm line-clamp-2",
													children: item.product.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-bold",
													children: formatKz(item.unitPrice ?? item.product.price)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-2 inline-flex items-center rounded-md border border-border",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => actions.updateQty(item.idx, item.qty - 1),
															className: "grid h-7 w-7 place-items-center",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "w-7 text-center text-sm",
															children: item.qty
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => actions.updateQty(item.idx, item.qty + 1),
															className: "grid h-7 w-7 place-items-center",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
														})
													]
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 border-t border-border pt-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-bold",
											children: [
												"Envio:",
												" ",
												shipping?.isFree ? "Frete grátis" : formatKz(shipping?.chargedFee ?? 0)
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-muted-foreground",
											children: [
												shipping?.carrierName ?? "Escolha uma opção de entrega",
												" ",
												"· ",
												shipping?.etaText ?? "Prazo a confirmar"
											]
										})]
									})
								]
							}, item.idx)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl bg-card p-4 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-bold",
										children: "Opção de entrega"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: shippingSettings.freeShippingEnabled ? `Frete grátis em compras a partir de ${formatKz(shippingSettings.freeShippingThreshold)}.` : "Escolha a forma de entrega para ver o custo."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-muted-foreground" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 space-y-2",
									children: [shippingOptionsForOrder.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setCarrierId(option.carrierId),
										className: `flex w-full items-center justify-between rounded-lg border p-3 text-left ${shipping?.carrierId === option.carrierId ? "border-foreground bg-muted/50" : "border-border"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm font-bold",
												children: option.carrierName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block text-[11px] text-muted-foreground",
												children: [option.zoneName ? `${option.zoneName} · ` : "", option.etaText]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `shrink-0 text-sm font-black ${option.isFree ? "text-emerald-700" : "text-sale"}`,
											children: option.isFree ? "Grátis" : formatKz(option.chargedFee)
										})]
									}, option.carrierId)), shippingOptionsForOrder.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Não há opções de entrega ativas. Contacte o suporte."
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl bg-card p-4 shadow-sm text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-bold",
										children: "Resumo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatKz(subtotal) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 border-y border-border py-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: "Cupom de desconto"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/coupons",
													className: "text-[11px] font-bold text-sky-600",
													children: "Ver cupons"
												})]
											}),
											coupon ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs font-black text-emerald-700",
														children: coupon.code
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs font-bold text-emerald-700",
														children: ["-", formatKz(discount)]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => {
															setCoupon(null);
															setCouponCode("");
														},
														className: "text-[11px] font-bold text-red-600",
														children: "Remover"
													})
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
												onSubmit: (e) => {
													e.preventDefault();
													applyCoupon();
												},
												className: "mt-2 flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: couponCode,
													onChange: (e) => {
														setCouponCode(e.target.value.toUpperCase());
														setCouponError("");
													},
													placeholder: "Digite o código aqui",
													className: "min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs uppercase outline-none focus:border-foreground"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													className: "rounded-lg bg-foreground px-4 py-2 text-xs font-bold text-background",
													children: "Aplicar"
												})]
											}),
											couponError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-[11px] text-red-500",
												children: couponError
											})
										]
									}),
									discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex justify-between text-emerald-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Desconto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["-", formatKz(discount)] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Frete" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: shipping?.isFree ? "font-bold text-emerald-700" : "",
											children: shipping?.isFree ? "Grátis" : formatKz(shipping?.chargedFee ?? 0)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex justify-between text-base font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sale",
											children: formatKz(total)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-4 text-[11px] text-muted-foreground",
										children: [
											"Ao clicar \"Fazer o pedido\", eu afirmo que li e estou de acordo",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/termos",
												className: "text-sky-600",
												children: "com os termos e condições de uso"
											}),
											"."
										]
									})
								]
							})
						] }),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-sm text-emerald-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), " Sua informação de pagamento está segura conosco."]
							}),
							methods.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl bg-card p-4 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setPayment(m.id);
										setShowCardForm(m.id === "card");
									},
									className: "flex w-full items-center gap-3 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid h-5 w-5 flex-none place-items-center rounded-full border ${payment === m.id ? "border-sale" : "border-muted-foreground"}`,
											children: payment === m.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-sale" })
										}),
										m.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-12 w-12 flex-none place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-border",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: m.image,
												alt: m.label,
												className: "max-h-10 max-w-10 object-contain",
												onError: (e) => {
													e.currentTarget.style.display = "none";
												}
											})
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-12 w-12 flex-none place-items-center rounded-lg bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-bold",
												children: m.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-[11px] text-muted-foreground",
												children: m.desc
											})]
										})
									]
								}), m.id === "card" && payment === "card" && showCardForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Número do Cartão",
											value: card.number,
											onChange: (v) => setCard({
												...card,
												number: v
											}),
											format: "numeric",
											maxLength: 19
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Nome do Titular",
											value: card.holder,
											onChange: (v) => setCard({
												...card,
												holder: v
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "MM/AA",
												value: card.exp,
												onChange: (v) => setCard({
													...card,
													exp: v
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "CVV",
												value: card.cvv,
												onChange: (v) => setCard({
													...card,
													cvv: v
												}),
												format: "numeric",
												maxLength: 4
											})]
										})
									]
								})]
							}, m.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl bg-card p-4 text-xs shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: "Próximo passo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: "Ao tocar em «Pagar» vai para a página do método escolhido, com as instruções e o envio do comprovativo."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-card p-4 text-xs shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald-600" }), " Bazarixy protege suas informações do pagamento"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-2 space-y-1 text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "✓ Protocolo PCI DSS" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "✓ Todas as informações permanecem seguras" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "✓ Todos os dados são criptografados" })
									]
								})]
							})
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-24 rounded-xl bg-card p-4 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold",
							children: "Resumo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											"Itens (",
											items.length,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatKz(subtotal) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Frete"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shipping?.isFree ? "Grátis" : formatKz(shipping?.chargedFee ?? 0) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-t border-border pt-2 text-base font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sale",
										children: formatKz(total)
									})]
								})
							]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky bottom-0 left-0 right-0 z-30 border-t border-border bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center gap-3 px-3 py-3",
					children: [step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-1 text-sm font-bold",
						children: [
							formatKz(total),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground text-[11px]",
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-sale",
							children: formatKz(total)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: step === 1 && !canConfirmAddress || step === 3 && !payment,
						onClick: () => {
							if (step === 1) setStep(2);
							else if (step === 2) setStep(3);
							else if (payment === "card") placeOrder();
							else if (payment) {
								const code = newOrderCode();
								setPendingPayment({
									code,
									methodId: payment,
									total,
									subtotal,
									discount,
									shipping: shipping ?? void 0,
									items: items.map((i) => ({
										productId: i.id,
										name: i.product.name,
										qty: i.qty,
										size: i.size,
										color: i.color,
										unitPrice: i.unitPrice ?? i.product.price,
										image: i.image ?? i.product.image
									})),
									customer: user?.email || address.name,
									shippingAddress: {
										name: address.name,
										phone: `${address.countryCode} ${address.phone}`,
										street: address.street,
										complement: address.complement,
										city: address.city,
										state: address.state,
										cep: address.cep,
										country: "Angola"
									}
								});
								navigate({
									to: "/pay/$method",
									params: { method: payment }
								}).then(() => actions.removeSelected());
							}
						},
						className: "ml-auto min-w-[180px] rounded-full bg-foreground py-3 text-sm font-bold text-background disabled:opacity-50",
						children: step === 1 ? "Salvar endereço" : step === 2 ? "Fazer o pedido" : "Pagar"
					})]
				})
			})
		]
	});
}
function formatPhone(v) {
	return v.replace(/\D/g, "").slice(0, 9).replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}
function Field({ label, value, onChange, error, inputMode, format, maxLength }) {
	const handle = (raw) => {
		if (format === "phone") return onChange(formatPhone(raw));
		if (format === "numeric") {
			const d = raw.replace(/\D/g, "");
			return onChange(maxLength ? d.slice(0, maxLength) : d);
		}
		onChange(raw);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-border px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-[10px] text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				inputMode: format === "phone" || format === "numeric" ? "numeric" : inputMode,
				onChange: (e) => handle(e.target.value),
				className: "w-full bg-transparent text-sm outline-none"
			})]
		}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] text-red-500",
			children: error
		})]
	});
}
//#endregion
export { CheckoutPage as component };
