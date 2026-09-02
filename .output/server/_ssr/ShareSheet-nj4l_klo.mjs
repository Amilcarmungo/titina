import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { At as Copy, E as Share2, K as MessageCircle, O as Send, Vt as Check, Y as Mail, n as X, tt as Link2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ShareSheet-nj4l_klo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Folha de partilha — abre por baixo no mobile (bottom sheet) e como cartão
* centrado no desktop. Usa sempre o link canónico de bazarixy.com.
*/
function encode(v) {
	return encodeURIComponent(v);
}
var NETWORKS = (t) => {
	const msg = t.text ? `${t.text} ${t.url}` : t.url;
	return [
		{
			key: "whatsapp",
			label: "WhatsApp",
			tint: "bg-[#25D366] text-white",
			Icon: MessageCircle,
			href: `https://wa.me/?text=${encode(msg)}`
		},
		{
			key: "facebook",
			label: "Facebook",
			tint: "bg-[#1877F2] text-white",
			Icon: Share2,
			href: `https://www.facebook.com/sharer/sharer.php?u=${encode(t.url)}`
		},
		{
			key: "telegram",
			label: "Telegram",
			tint: "bg-[#229ED9] text-white",
			Icon: Send,
			href: `https://t.me/share/url?url=${encode(t.url)}&text=${encode(t.text ?? t.title)}`
		},
		{
			key: "x",
			label: "X",
			tint: "bg-foreground text-background",
			Icon: Share2,
			href: `https://twitter.com/intent/tweet?url=${encode(t.url)}&text=${encode(t.text ?? t.title)}`
		},
		{
			key: "email",
			label: "Email",
			tint: "bg-muted text-foreground",
			Icon: Mail,
			href: `mailto:?subject=${encode(t.title)}&body=${encode(msg)}`
		}
	];
};
/** Abre a partilha nativa quando existe; caso contrário devolve false. */
async function nativeShare(t) {
	if (typeof navigator === "undefined" || !("share" in navigator)) return false;
	try {
		await navigator.share({
			title: t.title,
			text: t.text,
			url: t.url
		});
		return true;
	} catch {
		return false;
	}
}
function ShareSheet({ open, onClose, target }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(target.url);
			setCopied(true);
			toast.success("Link copiado");
			setTimeout(() => setCopied(false), 1800);
		} catch {
			toast.error("Não foi possível copiar");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[120] flex items-end justify-center bg-black/50 backdrop-blur-[2px] animate-fade-in md:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-t-3xl bg-background p-5 pb-7 shadow-2xl animate-slide-in-bottom md:rounded-3xl md:pb-5",
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-label": "Partilhar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-3 h-1.5 w-12 rounded-full bg-border md:hidden" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [
						target.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: target.image,
							alt: "",
							className: "h-14 w-14 shrink-0 rounded-xl object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-base font-black leading-tight",
								children: "Partilhar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 line-clamp-2 text-xs text-muted-foreground",
								children: target.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							"aria-label": "Fechar",
							className: "rounded-full p-1.5 hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5",
					children: [NETWORKS(target).map(({ key, label, tint, Icon, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: onClose,
						className: "flex flex-col items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `grid h-12 w-12 place-items-center rounded-full ${tint}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-semibold text-muted-foreground",
							children: label
						})]
					}, key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: copy,
						className: "flex flex-col items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-12 w-12 place-items-center rounded-full bg-gold text-white",
							children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-semibold text-muted-foreground",
							children: copied ? "Copiado" : "Copiar"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 flex-1 truncate text-xs text-muted-foreground",
						children: target.url
					})]
				})
			]
		})
	});
}
//#endregion
export { nativeShare as n, ShareSheet as t };
