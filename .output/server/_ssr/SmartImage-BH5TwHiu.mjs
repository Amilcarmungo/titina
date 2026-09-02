import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { ft as ImageOff } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SmartImage-BH5TwHiu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Imagem com Skeleton/Shimmer enquanto carrega.
* - o esqueleto fica visível até o `onLoad` confirmar o carregamento total;
* - se falhar, mostra um estado elegante em vez do ícone quebrado do browser;
* - fade-in suave ao aparecer e `loading="lazy"` por omissão.
*/
/**
* Cache inteligente de imagens já carregadas.
* Uma imagem vista antes nesta sessão aparece de imediato (sem shimmer nem
* novo pedido), evitando o "recarregar" constante ao navegar entre páginas.
*/
var LOADED_KEY = "img_cache_v1";
var loaded = new Set((() => {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(sessionStorage.getItem(LOADED_KEY) || "[]");
	} catch {
		return [];
	}
})());
function rememberLoaded(src) {
	if (loaded.has(src)) return;
	loaded.add(src);
	if (typeof window === "undefined") return;
	try {
		sessionStorage.setItem(LOADED_KEY, JSON.stringify([...loaded].slice(-400)));
	} catch {}
}
function SmartImage({ src, alt, className = "", wrapperClassName = "", eager, draggable, rounded = "" }) {
	const [state, setState] = (0, import_react.useState)(() => src && loaded.has(src) ? "ready" : "loading");
	(0, import_react.useEffect)(() => {
		if (src && loaded.has(src)) {
			setState("ready");
			return;
		}
		setState("loading");
	}, [src]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative overflow-hidden bg-muted ${rounded} ${wrapperClassName}`,
		children: [
			state !== "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `absolute inset-0 shimmer ${rounded}`,
				"aria-hidden": true
			}),
			state === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, { className: "h-4 w-4 opacity-60" })
			}),
			src && state !== "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: state === "ready" ? alt : "",
				draggable,
				loading: eager ? "eager" : "lazy",
				decoding: eager ? "sync" : "async",
				fetchPriority: eager ? "high" : "auto",
				onLoad: () => {
					rememberLoaded(src);
					setState("ready");
				},
				onError: () => setState("error"),
				className: `h-full w-full transition-opacity duration-500 ${state === "ready" ? "opacity-100" : "opacity-0"} ${className}`
			})
		]
	});
}
/** Bloco de esqueleto genérico para textos, cartões e listas. */
function Skeleton({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `shimmer rounded-md ${className}`,
		"aria-hidden": true
	});
}
//#endregion
export { SmartImage as n, Skeleton as t };
