import { r as __toESM } from "../_runtime.mjs";
import "../_libs/firebase.mjs";
import { i as onSnapshot, l as setDoc, m as doc, p as collection, t as deleteDoc, v as serverTimestamp } from "../_libs/@firebase/firestore+[...].mjs";
import { n as getDb } from "./client-C80F8PZn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as usePermission, t as ROLE_LABEL } from "./roles-BxfhjeTv.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LoaderCircle, o as UserPlus, p as Trash2, w as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.equipa-DDzgx0ke.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	"justina",
	"gerente",
	"atendente"
];
var ROLE_HINT = {
	admin: "Acesso total, incluindo equipa e configurações.",
	gerente: "Catálogo, publicações e estados de pedidos.",
	atendente: "Apenas estados de pedidos e atendimento."
};
function EquipaPage() {
	const canManage = usePermission("staff.manage");
	const [members, setMembers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [uid, setUid] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("atendente");
	const [shopId, setShopId] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const db = getDb();
		if (!db || !canManage) {
			setLoading(false);
			return;
		}
		return onSnapshot(collection(db, "staff"), (snap) => {
			setMembers(snap.docs.map((d) => ({
				uid: d.id,
				...d.data()
			})));
			setLoading(false);
		}, () => setLoading(false));
	}, [canManage]);
	const add = async () => {
		const db = getDb();
		if (!db) return;
		const id = uid.trim();
		if (id.length < 8) {
			toast.error("Indique o UID do utilizador (Firebase Auth).");
			return;
		}
		setBusy(true);
		try {
			await setDoc(doc(db, "staff", id), {
				role,
				active: true,
				name: name.trim() || null,
				shopId: shopId.trim() || null,
				updatedAt: serverTimestamp()
			}, { merge: true });
			toast.success("Membro adicionado à equipa.");
			setUid("");
			setName("");
			setShopId("");
		} catch {
			toast.error("Sem permissão para alterar a equipa.");
		} finally {
			setBusy(false);
		}
	};
	const setActive = async (m, active) => {
		const db = getDb();
		if (!db) return;
		await setDoc(doc(db, "staff", m.uid), { active }, { merge: true }).catch(() => toast.error("Sem permissão."));
	};
	const remove = async (m) => {
		const db = getDb();
		if (!db) return;
		await deleteDoc(doc(db, "staff", m.uid)).catch(() => toast.error("Sem permissão."));
	};
	if (!canManage) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-border p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
				className: "mx-auto h-10 w-10 text-muted-foreground",
				strokeWidth: 1.3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-lg font-black",
				children: "Sem acesso"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Só um administrador pode gerir a equipa."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-black",
				children: "Equipa"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Adicione membros e escolha o sector de cada um. As permissões são validadas no servidor."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-sm font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Adicionar membro"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-semibold",
								children: ["UID do utilizador", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: uid,
									onChange: (e) => setUid(e.target.value),
									placeholder: "ex.: 8fK2p…",
									className: "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-gold"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-semibold",
								children: ["Nome (opcional)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-gold"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-semibold",
								children: [
									"Sector / função",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: role,
										onChange: (e) => setRole(e.target.value),
										className: "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-gold",
										children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: r,
											children: ROLE_LABEL[r]
										}, r))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-[11px] font-normal text-muted-foreground",
										children: ROLE_HINT[role]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-semibold",
								children: ["Loja (opcional)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: shopId,
									onChange: (e) => setShopId(e.target.value),
									placeholder: "ID da loja",
									className: "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-gold"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: add,
						disabled: busy,
						className: "mt-3 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background disabled:opacity-60",
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Adicionar à equipa"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "border-b border-border px-4 py-3 text-sm font-bold",
					children: [
						"Membros (",
						members.length,
						")"
					]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2 p-4",
					children: [
						0,
						1,
						2
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 animate-pulse rounded-xl bg-muted" }, i))
				}) : members.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 text-center text-sm text-muted-foreground",
					children: "Ainda não há membros."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-bold",
									children: m.name || m.uid
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-[11px] text-muted-foreground",
									children: [
										ROLE_LABEL[m.role] ?? m.role,
										m.shopId ? ` · ${m.shopId}` : "",
										" · ",
										m.uid
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActive(m, m.active === false),
								className: `rounded-full border px-3 py-1.5 text-xs font-bold ${m.active === false ? "border-border text-muted-foreground" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-600"}`,
								children: m.active === false ? "Inactivo" : "Activo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => remove(m),
								"aria-label": "Remover membro",
								className: "grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						]
					}, m.uid))
				})]
			})
		]
	});
}
//#endregion
export { EquipaPage as component };
