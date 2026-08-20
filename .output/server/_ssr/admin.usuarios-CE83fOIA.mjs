import { r as __toESM } from "../_runtime.mjs";
import "../_libs/firebase.mjs";
import { i as onSnapshot, p as collection } from "../_libs/@firebase/firestore+[...].mjs";
import { n as getDb } from "./client-nkMekIqc.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useStaff } from "./roles-BA0F-kDN.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Users, k as Search, w as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.usuarios-CE83fOIA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UsersPage() {
	const { staff } = useStaff();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [state, setState] = (0, import_react.useState)("loading");
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const db = getDb();
		if (!db || !staff) {
			setState("error");
			return;
		}
		return onSnapshot(collection(db, "users"), (snap) => {
			setRows(snap.docs.map((d) => ({
				...d.data(),
				uid: d.id
			})));
			setState("ready");
		}, () => setState("error"));
	}, [staff]);
	const list = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		const base = [...rows].sort((a, b) => (a.email ?? "").localeCompare(b.email ?? ""));
		if (!term) return base;
		return base.filter((r) => `${r.email ?? ""} ${r.name ?? ""} ${r.uid}`.toLowerCase().includes(term));
	}, [rows, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-11 w-11 place-items-center rounded-2xl bg-foreground text-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-black",
							children: "Usuários"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [rows.length, " conta(s) registada(s) na Bazarixy."]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Buscar por email ou nome",
							className: "min-w-0 flex-1 bg-transparent text-sm outline-none"
						})]
					})
				]
			}),
			state === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-xl bg-muted" }, i))
			}),
			state === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground",
				children: "Sem permissão para listar utilizadores ou sem ligação ao banco. Só a equipa autenticada consegue ver esta página."
			}),
			state === "ready" && (list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground",
				children: "Nenhum utilizador encontrado."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-2xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden grid-cols-[1fr_auto_auto] gap-4 border-b border-border px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-muted-foreground sm:grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Conta" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pontos" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ID" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-xs font-black",
									children: r.photoURL ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: r.photoURL,
										alt: "",
										className: "h-full w-full object-cover"
									}) : (r.email?.[0] ?? "?").toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-bold",
										children: r.name || r.email || "Sem nome"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: r.email
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex w-fit items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }),
									" ",
									r.points ?? 0,
									" pts"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "truncate text-[11px] text-muted-foreground",
								children: r.uid
							})
						]
					}, r.uid))
				})]
			}))
		]
	});
}
//#endregion
export { UsersPage as component };
