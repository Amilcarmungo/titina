import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminModal-DXEoyymL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sizes = {
	sm: "md:max-w-md",
	md: "md:max-w-lg",
	lg: "md:max-w-2xl",
	xl: "md:max-w-4xl"
};
function AdminModal({ open, onClose, title, subtitle, size = "lg", footer, children }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const h = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", h);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", h);
			document.body.style.overflow = "";
		};
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-0 md:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `w-full ${sizes[size]} md:rounded-2xl rounded-t-3xl bg-background max-h-[92vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-300`,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 border-b border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-black tracking-tight",
							children: title
						}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: subtitle
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border hover:bg-muted transition",
						"aria-label": "Fechar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-6 py-5",
					children
				}),
				footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap justify-end gap-2 border-t border-border bg-muted/30 px-6 py-3",
					children: footer
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"aria-hidden": true,
			tabIndex: -1,
			onClick: onClose,
			className: "fixed inset-0 -z-10"
		})]
	});
}
function AdminField({ label, hint, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5",
				children
			}),
			hint && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-[11px] text-muted-foreground",
				children: hint
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-[11px] text-destructive",
				children: error
			})
		]
	});
}
function AdminInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: `w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/10 ${props.className ?? ""}`
	});
}
function AdminTextarea(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		className: `w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/10 ${props.className ?? ""}`
	});
}
function AdminSelect(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: `w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/10 ${props.className ?? ""}`
	});
}
//#endregion
export { AdminTextarea as a, AdminSelect as i, AdminInput as n, AdminModal as r, AdminField as t };
