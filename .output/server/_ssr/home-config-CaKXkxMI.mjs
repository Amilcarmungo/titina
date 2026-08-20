import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as attachSync } from "./sync-store-BZQqyU1u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-config-CaKXkxMI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "shop_home_config_v4";
var defaults = {
	showQuickStrip: true,
	showCategories: true,
	showSuperOfertas: true,
	showViral: true,
	superTitle: "Super Ofertas",
	viralTitle: "Viral do Bazarixy",
	superPicks: [],
	viralPicks: [],
	storeName: "Bazarixy",
	currency: "Kz",
	quickStripSaverLabel: "Super Saver",
	quickStripSaverPrice: "Kz 600",
	quickStripItems: [
		{
			id: "q1",
			label: "Diário"
		},
		{
			id: "q2",
			label: "Férias"
		},
		{
			id: "q3",
			label: "Trabalho"
		},
		{
			id: "q4",
			label: "Noite"
		},
		{
			id: "q5",
			label: "Festa"
		}
	],
	categoriesTitle: "Categorias",
	categoriesOrder: [],
	homeTabs: [
		{
			id: "t-all",
			label: "Tudo",
			slugs: []
		},
		{
			id: "t-mulher",
			label: "Mulher",
			slugs: [
				"dresses",
				"tops",
				"skirts",
				"jumpsuits"
			]
		},
		{
			id: "t-curve",
			label: "Curve",
			slugs: [
				"dresses",
				"tops",
				"jumpsuits"
			]
		},
		{
			id: "t-kids",
			label: "Kids",
			slugs: ["outros"]
		},
		{
			id: "t-local",
			label: "Local",
			slugs: []
		},
		{
			id: "t-jeans",
			label: "Jeans",
			slugs: ["denim", "pants"]
		},
		{
			id: "t-praia",
			label: "Praia",
			slugs: ["swim"]
		},
		{
			id: "t-trico",
			label: "Tricô",
			slugs: ["knit"]
		}
	],
	heroLeftTiles: [
		{
			id: "hl1",
			label: "Mais Vendidos"
		},
		{
			id: "hl2",
			label: "Envio Nacional"
		},
		{
			id: "hl3",
			label: "Bazarixy Trends"
		}
	],
	heroRightTiles: [
		{
			id: "hr1",
			label: "Elenzga",
			slug: "dresses",
			badge: "CURVE"
		},
		{
			id: "hr2",
			label: "Bazarixy BAE",
			slug: "tops",
			badge: "NEW"
		},
		{
			id: "hr3",
			label: "Bazarixy MOD",
			slug: "knit",
			badge: "TOP"
		}
	]
};
function read() {
	if (typeof window === "undefined") return defaults;
	try {
		return {
			...defaults,
			...JSON.parse(localStorage.getItem(KEY) || "{}")
		};
	} catch {
		return defaults;
	}
}
var cfg = read();
var listeners = /* @__PURE__ */ new Set();
function emit() {
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(cfg));
	listeners.forEach((l) => l());
	sync.push();
}
var sync = attachSync("homeConfig", () => cfg, (value) => {
	if (!value || typeof value !== "object") return;
	cfg = {
		...defaults,
		...value
	};
	if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(cfg));
	listeners.forEach((l) => l());
});
function useHomeConfig() {
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => cfg, () => defaults);
}
var homeConfigActions = {
	update(patch) {
		cfg = {
			...cfg,
			...patch
		};
		emit();
	},
	reset() {
		cfg = defaults;
		emit();
	}
};
var activeTab = 0;
var tabListeners = /* @__PURE__ */ new Set();
function useActiveHomeTab() {
	return (0, import_react.useSyncExternalStore)((l) => {
		tabListeners.add(l);
		return () => tabListeners.delete(l);
	}, () => activeTab, () => 0);
}
function setActiveHomeTab(index) {
	if (activeTab === index) return;
	activeTab = index;
	tabListeners.forEach((l) => l());
}
//#endregion
export { useHomeConfig as i, setActiveHomeTab as n, useActiveHomeTab as r, homeConfigActions as t };
