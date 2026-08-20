import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminTabs-4tAQj8U4.js
var import_jsx_runtime = require_jsx_runtime();
function AdminTabs({ tabs, active, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-1 overflow-x-auto no-scrollbar border-b border-border",
		children: tabs.map((t) => {
			const on = t.id === active;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onChange(t.id),
				className: `relative inline-flex items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-bold transition ${on ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
				children: [
					t.icon,
					t.label,
					t.badge !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${on ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`,
						children: t.badge
					}),
					on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-px left-2 right-2 h-0.5 rounded-full bg-foreground" })
				]
			}, t.id);
		})
	});
}
//#endregion
export { AdminTabs as t };
