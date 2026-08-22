import { n as productActions } from "./products-store-TDcUsz9F.mjs";
import { i as seedProducts } from "./products-De10hxZJ.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useHomeConfig, t as homeConfigActions } from "./home-config-CaKXkxMI.mjs";
import { t as categoryActions } from "./categories-store-C4Vdw11E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.config-Bsos5-Ie.js
var import_jsx_runtime = require_jsx_runtime();
function ConfigPage() {
	const cfg = useHomeConfig();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-black",
				children: "Configurações"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Preferências gerais da loja."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)] space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold",
						children: "Nome da loja"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: cfg.storeName,
						onChange: (e) => homeConfigActions.update({ storeName: e.target.value }),
						className: "mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold",
						children: "Moeda"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: cfg.currency,
						onChange: (e) => homeConfigActions.update({ currency: e.target.value }),
						className: "mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-background p-5 shadow-[var(--shadow-card)] space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-black",
						children: "Dados de demonstração"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "O site mostra apenas o que existe no banco de dados. Use estes botões para semear exemplos e depois editá-los em Produtos e Categorias."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									categoryActions.seed();
									toast.success("Categorias de exemplo criadas");
								},
								className: "rounded-full border border-border px-4 py-2 text-xs font-bold",
								children: "Semear categorias"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: async () => {
									try {
										await productActions.seed(seedProducts);
										toast.success("Produtos de exemplo publicados");
									} catch (err) {
										toast.error(err?.message ?? "Não foi possível publicar");
									}
								},
								className: "rounded-full border border-border px-4 py-2 text-xs font-bold",
								children: "Semear produtos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									homeConfigActions.reset();
									toast.success("Home restaurada");
								},
								className: "rounded-full border border-border px-4 py-2 text-xs font-bold",
								children: "Restaurar home"
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { ConfigPage as component };
