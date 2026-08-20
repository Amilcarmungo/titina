import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as getAnyProduct } from "./products-store-DJ_irs6P.mjs";
import { t as getShop } from "./shops-store-CX-UvhEW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-store-DUtOaUN3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Cada conta tem a sua própria cache — nunca partilhamos notificações. */
var keyFor$1 = (uid) => `shop_notifications_v2:${uid}`;
var empty = [];
var owner = null;
var list = empty;
var listeners$1 = /* @__PURE__ */ new Set();
function readFor$1(uid) {
	if (typeof window === "undefined") return empty;
	try {
		const parsed = JSON.parse(localStorage.getItem(keyFor$1(uid)) || "[]");
		return Array.isArray(parsed) ? parsed : empty;
	} catch {
		return empty;
	}
}
function persist() {
	if (typeof window === "undefined" || !owner) return;
	localStorage.setItem(keyFor$1(owner), JSON.stringify(list.slice(0, 100)));
}
function emit$1() {
	persist();
	listeners$1.forEach((l) => l());
}
/** Troca de conta (ou logout): a lista anterior desaparece imediatamente. */
function setNotificationsOwner(uid) {
	if (owner === uid) return;
	owner = uid;
	list = uid ? readFor$1(uid) : empty;
	listeners$1.forEach((l) => l());
}
var bridge = null;
function registerNotificationsBridge(next) {
	bridge = next;
}
/** O backend manda: substitui a lista pelo que está no Firestore. */
function mergeRemoteNotifications(remote) {
	list = remote;
	emit$1();
}
function useNotifications() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners$1.add(l);
		return () => listeners$1.delete(l);
	}, () => list, () => empty);
}
function useUnreadCount() {
	return useNotifications().filter((n) => !n.read).length;
}
var notificationActions = {
	add(n) {
		if (bridge) {
			bridge.add(n);
			return;
		}
		list = [{
			...n,
			id: `n-${Date.now()}`,
			createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-PT"),
			read: false
		}, ...list];
		emit$1();
	},
	markRead(id) {
		list = list.map((n) => n.id === id ? {
			...n,
			read: true
		} : n);
		emit$1();
		bridge?.markRead(id);
	},
	markAllRead() {
		const unread = list.filter((n) => !n.read).map((n) => n.id);
		list = list.map((n) => ({
			...n,
			read: true
		}));
		emit$1();
		unread.forEach((id) => bridge?.markRead(id));
	},
	remove(id) {
		list = list.filter((n) => n.id !== id);
		emit$1();
		bridge?.remove(id);
	},
	clear() {
		const ids = list.map((n) => n.id);
		list = [];
		emit$1();
		ids.forEach((id) => bridge?.remove(id));
	}
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/orders-store-B882Qlzx.js
var STAGE_FLOW = [
	"awaiting_payment",
	"payment_review",
	"payment_accepted",
	"preparing",
	"shipped",
	"delivered",
	"reviewed"
];
var STAGE_LABEL = {
	awaiting_payment: "Aguardando pagamento",
	payment_review: "A analisar o comprovativo",
	payment_rejected: "Comprovativo não validado",
	payment_accepted: "Pagamento aceite",
	preparing: "A loja está a preparar o seu pedido",
	shipped: "Pedido enviado pela transportadora",
	delivered: "Entregue",
	reviewed: "Avaliado"
};
/** Frase formal mostrada ao cliente em cada etapa. */
var STAGE_DESC = {
	awaiting_payment: "Estamos à espera do seu pagamento para iniciar a preparação do pedido.",
	payment_review: "Recebemos o seu comprovativo e a nossa equipa está a confirmar o pagamento.",
	payment_rejected: "O comprovativo enviado não pôde ser validado. Por favor, envie um comprovativo válido ou contacte o nosso suporte.",
	payment_accepted: "Pagamento confirmado com sucesso. Obrigado pela sua confiança.",
	preparing: "A loja está a embalar os seus artigos com todo o cuidado.",
	shipped: "O seu pacote já segue com a transportadora até ao endereço indicado.",
	delivered: "Pedido entregue. Confirme a receção para poder avaliar os artigos.",
	reviewed: "Obrigado pela sua avaliação — ela ajuda outros clientes."
};
function now() {
	return (/* @__PURE__ */ new Date()).toLocaleString("pt-PT", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}).replace(",", " ·");
}
function etaFromNow(days = 7) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + days);
	return `Chega até ${d.toLocaleDateString("pt-PT", {
		day: "2-digit",
		month: "2-digit"
	})}`;
}
/** Agrupa os itens por loja — nem todos os produtos são da mesma loja. */
function buildPackages(order) {
	const groups = /* @__PURE__ */ new Map();
	for (const it of order.items) {
		const shopId = getAnyProduct(it.productId)?.shopId ?? "main";
		groups.set(shopId, [...groups.get(shopId) ?? [], it]);
	}
	const initial = order.status === "unpaid" ? "awaiting_payment" : order.status === "shipped" ? "shipped" : order.status === "review" ? "delivered" : order.status === "processing" && order.paymentProof ? "payment_review" : "preparing";
	return Array.from(groups.entries()).map(([shopId, items], i) => ({
		id: `${order.id}-P${i + 1}`,
		shopId,
		shopName: getShop(shopId)?.name ?? "Bazarixy Oficial",
		stage: initial,
		items,
		timeline: [{
			stage: initial,
			at: order.createdAt
		}],
		...order.status === "shipped" ? { eta: order.eta ?? etaFromNow() } : {}
	}));
}
function packagesOf(order) {
	return order.packages?.length ? order.packages : buildPackages(order);
}
/** O estado do pedido é derivado dos pacotes — o mais atrasado manda. */
function statusFromPackages(pkgs, fallback) {
	if (!pkgs.length) return fallback;
	if (fallback === "returns") return "returns";
	const stages = pkgs.map((p) => p.stage);
	if (stages.some((s) => s === "awaiting_payment" || s === "payment_rejected")) return "unpaid";
	if (stages.every((s) => s === "reviewed")) return "review";
	if (stages.every((s) => s === "delivered" || s === "reviewed")) return "review";
	if (stages.every((s) => s === "shipped" || s === "delivered" || s === "reviewed")) return "shipped";
	return "processing";
}
/** A cache é sempre por conta — nenhum utilizador vê pedidos de outro. */
var keyFor = (uid) => `shop_orders_v2:${uid}`;
var seed = [];
var ownerUid = null;
var staffMode = false;
/** Pedidos criados nesta sessão que ainda podem não ter chegado ao backend. */
var pending = /* @__PURE__ */ new Set();
function readFor(uid) {
	if (typeof window === "undefined") return seed;
	try {
		const s = JSON.parse(localStorage.getItem(keyFor(uid)) || "[]");
		if (Array.isArray(s)) return s.filter((o) => o.uid === uid);
	} catch {
		return seed;
	}
	return seed;
}
var orders = seed;
var listeners = /* @__PURE__ */ new Set();
function emit() {
	if (typeof window !== "undefined" && ownerUid && !staffMode) localStorage.setItem(keyFor(ownerUid), JSON.stringify(orders.filter((o) => o.uid === ownerUid)));
	listeners.forEach((l) => l());
}
/**
* Define de quem são os pedidos em memória. Ao trocar de conta (ou sair) a
* lista é limpa de imediato — a cache de um utilizador nunca aparece a outro.
*/
function setOrdersOwner(uid, staff = false) {
	if (ownerUid === uid && staffMode === staff) return;
	ownerUid = uid;
	staffMode = staff;
	pending.clear();
	orders = uid && !staff ? readFor(uid) : seed;
	listeners.forEach((l) => l());
}
/** Ponte para o Firestore (definida em firebase/orders.ts para evitar dependência circular). */
var remoteSave = null;
var remoteRemove = null;
function registerOrdersBridge(save, remove) {
	remoteSave = save;
	remoteRemove = remove;
}
/**
* O backend é a fonte da verdade: substituímos a lista pelo que vem do
* Firestore (mantendo só os pedidos desta sessão que ainda não sincronizaram).
* Assim uma mudança de estado feita pela equipa aparece de imediato.
*/
function mergeRemoteOrders(remote) {
	const allowed = staffMode ? remote : remote.filter((o) => o.uid === ownerUid);
	const ids = new Set(allowed.map((o) => o.id));
	const stillPending = orders.filter((o) => pending.has(o.id) && !ids.has(o.id) && (staffMode || o.uid === ownerUid));
	allowed.forEach((o) => pending.delete(o.id));
	orders = [...stillPending, ...allowed];
	emit();
}
function put(next) {
	orders = orders.map((o) => o.id === next.id ? next : o);
	emit();
	remoteSave?.(next);
}
/** Avisa o DONO do pedido (notificação na conta dele + e-mail). */
function notifyCustomer(order, pkg, note) {
	const body = note?.trim() ? note.trim() : `${pkg.shopName}: ${STAGE_LABEL[pkg.stage]}${pkg.eta ? ` · ${pkg.eta}` : ""}`;
	const title = `Pedido #${order.id} — ${STAGE_LABEL[pkg.stage]}`;
	const kind = pkg.stage === "shipped" || pkg.stage === "delivered" ? "delivery" : "order";
	if (order.uid) import("./notifications-DIzXr-dd.mjs").then(({ pushNotificationTo }) => pushNotificationTo(order.uid, {
		kind,
		title,
		body,
		href: "/orders"
	}));
	else notificationActions.add({
		kind,
		title,
		body,
		href: "/orders"
	});
	const to = order.customer;
	if (to && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) import("./send-Dtuv1lVJ.mjs").then((n) => n.n).then(({ sendAppEmail }) => sendAppEmail("notification", to, {
		title,
		message: `${body}\n\n${STAGE_DESC[pkg.stage]}`,
		ctaLabel: "Ver o meu pedido",
		ctaPath: "/orders"
	}));
}
function useOrders() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => orders, () => seed);
}
var orderActions = {
	add(o) {
		const id = o.id || `BX-${Math.floor(Math.random() * 9e6 + 1e6)}`;
		const createdAt = now();
		const base = {
			...o,
			id,
			createdAt
		};
		const order = {
			...base,
			packages: buildPackages(base)
		};
		pending.add(id);
		orders = [order, ...orders];
		emit();
		remoteSave?.(order);
		return id;
	},
	updateStatus(id, status) {
		const order = orders.find((o) => o.id === id);
		if (!order) return;
		const stage = status === "unpaid" ? "awaiting_payment" : status === "processing" ? order.paymentProof ? "payment_review" : "preparing" : status === "shipped" ? "shipped" : status === "review" ? "delivered" : packagesOf(order)[0]?.stage ?? "preparing";
		const packages = packagesOf(order).map((p) => ({
			...p,
			stage,
			timeline: [...p.timeline, {
				stage,
				at: now()
			}],
			...stage === "shipped" ? { eta: p.eta ?? etaFromNow() } : {}
		}));
		put({
			...order,
			status,
			packages,
			eta: packages[0]?.eta ?? order.eta
		});
	},
	/** Avança um pacote (loja) e, se pedido, notifica o cliente. */
	setPackageStage(orderId, packageId, stage, opts) {
		const order = orders.find((o) => o.id === orderId);
		if (!order) return;
		let updated = null;
		const packages = packagesOf(order).map((p) => {
			if (p.id !== packageId) return p;
			const eta = opts?.eta ?? (stage === "shipped" ? p.eta ?? etaFromNow() : p.eta);
			updated = {
				...p,
				stage,
				...eta ? { eta } : {},
				...opts?.tracking ? { tracking: opts.tracking } : {},
				timeline: [...p.timeline, {
					stage,
					at: now(),
					...opts?.note ? { note: opts.note } : {}
				}]
			};
			return updated;
		});
		const status = statusFromPackages(packages, order.status);
		const next = {
			...order,
			packages,
			status,
			eta: packages.find((p) => p.eta)?.eta ?? order.eta
		};
		put(next);
		if (opts?.notify !== false && updated) notifyCustomer(next, updated, opts?.note);
	},
	/** Cliente confirmou a receção → passa para «Avaliar». */
	markReceived(orderId, packageId) {
		const order = orders.find((o) => o.id === orderId);
		if (!order) return;
		const packages = packagesOf(order).map((p) => (!packageId || p.id === packageId) && p.stage !== "reviewed" ? {
			...p,
			stage: "delivered",
			timeline: [...p.timeline, {
				stage: "delivered",
				at: now()
			}]
		} : p);
		put({
			...order,
			packages,
			status: statusFromPackages(packages, order.status)
		});
	},
	markReviewed(orderId) {
		const order = orders.find((o) => o.id === orderId);
		if (!order) return;
		const packages = packagesOf(order).map((p) => ({
			...p,
			stage: "reviewed",
			timeline: [...p.timeline, {
				stage: "reviewed",
				at: now()
			}]
		}));
		put({
			...order,
			packages,
			status: "review"
		});
	},
	update(id, patch) {
		const order = orders.find((o) => o.id === id);
		if (!order) return;
		put({
			...order,
			...patch
		});
	},
	/** Cliente pede o reembolso e indica onde quer receber. */
	requestRefund(id, data) {
		const order = orders.find((o) => o.id === id);
		if (!order) return;
		put({
			...order,
			refund: {
				...data,
				requestedAt: now(),
				status: "requested"
			}
		});
		notificationActions.add({
			kind: "order",
			title: `Pedido #${order.id} — reembolso solicitado`,
			body: `Vamos transferir para ${data.method} · ${data.account} depois de confirmarmos a devolução.`,
			href: "/orders"
		});
	},
	remove(id) {
		orders = orders.filter((o) => o.id !== id);
		emit();
		remoteRemove?.(id);
	}
};
//#endregion
export { orderActions as a, setOrdersOwner as c, notificationActions as d, registerNotificationsBridge as f, useUnreadCount as h, mergeRemoteOrders as i, useOrders as l, useNotifications as m, STAGE_FLOW as n, packagesOf as o, setNotificationsOwner as p, STAGE_LABEL as r, registerOrdersBridge as s, STAGE_DESC as t, mergeRemoteNotifications as u };
