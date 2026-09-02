import { n as __exportAll, r as __toESM } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-store-B_Op6deg.js
var notifications_store_B_Op6deg_exports = /* @__PURE__ */ __exportAll({
	a: () => useNotifications,
	i: () => registerNotificationsBridge,
	n: () => notificationActions,
	o: () => useUnreadCount,
	r: () => notifications_store_exports,
	t: () => mergeRemoteNotifications
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var notifications_store_exports = /* @__PURE__ */ __exportAll$1({
	mergeRemoteNotifications: () => mergeRemoteNotifications,
	notificationActions: () => notificationActions,
	registerNotificationsBridge: () => registerNotificationsBridge,
	setNotificationsOwner: () => setNotificationsOwner,
	useNotifications: () => useNotifications,
	useUnreadCount: () => useUnreadCount
});
/** Cada conta tem a sua própria cache — nunca partilhamos notificações. */
var keyFor = (uid) => `shop_notifications_v2:${uid}`;
var empty = [];
var owner = null;
var list = empty;
var listeners = /* @__PURE__ */ new Set();
function readFor(uid) {
	if (typeof window === "undefined") return empty;
	try {
		const parsed = JSON.parse(localStorage.getItem(keyFor(uid)) || "[]");
		return Array.isArray(parsed) ? parsed : empty;
	} catch {
		return empty;
	}
}
function persist() {
	if (typeof window === "undefined" || !owner) return;
	localStorage.setItem(keyFor(owner), JSON.stringify(list.slice(0, 100)));
}
function emit() {
	persist();
	listeners.forEach((l) => l());
}
/** Troca de conta (ou logout): a lista anterior desaparece imediatamente. */
function setNotificationsOwner(uid) {
	if (owner === uid) return;
	owner = uid;
	list = uid ? readFor(uid) : empty;
	listeners.forEach((l) => l());
}
var bridge = null;
function registerNotificationsBridge(next) {
	bridge = next;
}
/** O backend manda: substitui a lista pelo que está no Firestore. */
function mergeRemoteNotifications(remote) {
	list = remote;
	emit();
}
function useNotifications() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
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
		emit();
	},
	markRead(id) {
		list = list.map((n) => n.id === id ? {
			...n,
			read: true
		} : n);
		emit();
		bridge?.markRead(id);
	},
	markAllRead() {
		const unread = list.filter((n) => !n.read).map((n) => n.id);
		list = list.map((n) => ({
			...n,
			read: true
		}));
		emit();
		unread.forEach((id) => bridge?.markRead(id));
	},
	remove(id) {
		list = list.filter((n) => n.id !== id);
		emit();
		bridge?.remove(id);
	},
	clear() {
		const ids = list.map((n) => n.id);
		list = [];
		emit();
		ids.forEach((id) => bridge?.remove(id));
	}
};
//#endregion
export { useNotifications as a, registerNotificationsBridge as i, notificationActions as n, useUnreadCount as o, notifications_store_B_Op6deg_exports as r, mergeRemoteNotifications as t };
