import { r as __toESM } from "../_runtime.mjs";
import { a as getDb } from "./client-ColUhoxC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { o as useStaff } from "./roles-DIBzW3mP.mjs";
import { K as onSnapshot, L as getDocs, Lt as collection, T as deleteDoc, Ut as doc, et as query, ut as where } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Search, T as ShieldCheck, Y as MapPin, a as UsersRound, et as Loader, i as Users, m as Trash2, n as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/justina.usuarios-p2X9cNEG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UsersPage() {
	const { staff } = useStaff();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [state, setState] = (0, import_react.useState)("loading");
	const [q, setQ] = (0, import_react.useState)("");
	const [selectedUser, setSelectedUser] = (0, import_react.useState)(null);
	const [loadingDetail, setLoadingDetail] = (0, import_react.useState)(false);
	const [deletingUid, setDeletingUid] = (0, import_react.useState)(null);
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
	const loadUserDetail = async (uid) => {
		setLoadingDetail(true);
		const db = getDb();
		if (!db) {
			setLoadingDetail(false);
			return;
		}
		try {
			const user = rows.find((r) => r.uid === uid);
			if (!user) return;
			const addresses = (await getDocs(collection(db, "users", uid, "addresses"))).docs.map((d) => d.data());
			const referrals = (await getDocs(query(collection(db, "users"), where("referredBy", "==", uid)))).docs.map((d) => d.id);
			const ordersSnap = await getDocs(collection(db, "users", uid, "orders"));
			const orders = {
				count: ordersSnap.size,
				total: ordersSnap.docs.reduce((sum, doc) => sum + (doc.data().total ?? 0), 0)
			};
			setSelectedUser({
				uid,
				email: user.email,
				name: user.name,
				photoURL: user.photoURL,
				points: user.points,
				createdAt: user.createdAt,
				addresses,
				referrals,
				orders
			});
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingDetail(false);
		}
	};
	const deleteUser = async (uid) => {
		if (!confirm(`Tem a certeza que quer remover este utilizador? Esta ação é irreversível.`)) return;
		setDeletingUid(uid);
		const db = getDb();
		if (!db) {
			toast.error("Erro ao conectar ao banco de dados");
			setDeletingUid(null);
			return;
		}
		try {
			await deleteDoc(doc(db, "users", uid));
			toast.success("Utilizador removido com sucesso");
			setSelectedUser(null);
		} catch (err) {
			console.error(err);
			toast.error("Erro ao remover utilizador");
		} finally {
			setDeletingUid(null);
		}
	};
	const list = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		const base = [...rows].sort((a, b) => (a.email ?? "").localeCompare(b.email ?? ""));
		if (!term) return base;
		return base.filter((r) => `${r.email ?? ""} ${r.name ?? ""} ${r.uid}`.toLowerCase().includes(term));
	}, [rows, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-12 w-12 place-items-center rounded-2xl bg-brand-strong text-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-black",
							children: "Usuários"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								rows.length,
								" conta(s) registada(s) • ",
								list.length,
								" resultado(s)"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full sm:w-72 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2",
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
				className: "overflow-x-auto rounded-2xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden lg:grid grid-cols-[1.5fr_auto_auto_auto_auto_auto] gap-4 border-b border-border px-6 py-3 text-[11px] font-black uppercase tracking-wider text-muted-foreground sticky top-0 bg-muted/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Conta" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-center",
							children: "Pontos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-center",
							children: "Pedidos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-center",
							children: "Referidos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-center",
							children: "Data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-center",
							children: "Ações"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: list.map((r) => {
						const dateStr = (r.createdAt?.toDate?.() ?? /* @__PURE__ */ new Date()).toLocaleDateString("pt-PT");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-3 px-4 py-4 lg:grid-cols-[1.5fr_auto_auto_auto_auto_auto] lg:items-center hover:bg-muted/50 transition",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-sm font-black",
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
									className: "inline-flex w-fit items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold lg:justify-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }),
										" ",
										r.points ?? 0
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center text-sm font-bold text-foreground bg-muted/50 rounded-lg py-2 px-2",
									children: "0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center text-sm font-bold text-foreground bg-muted/50 rounded-lg py-2 px-2",
									children: "0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center text-xs text-muted-foreground",
									children: dateStr
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 justify-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => loadUserDetail(r.uid),
										className: "rounded-lg bg-brand-strong/10 px-3 py-2 text-xs font-bold text-brand-strong hover:bg-brand-strong/20 transition",
										children: "Ver"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => deleteUser(r.uid),
										disabled: deletingUid === r.uid,
										className: "rounded-lg bg-sale/10 px-3 py-2 text-xs font-bold text-sale hover:bg-sale/20 transition disabled:opacity-50",
										children: deletingUid === r.uid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							]
						}, r.uid);
					})
				})]
			}))
		]
	}), selectedUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserModal, {
		user: selectedUser,
		onClose: () => setSelectedUser(null),
		loading: loadingDetail,
		onDelete: () => deleteUser(selectedUser.uid),
		isDeleting: deletingUid === selectedUser.uid
	})] });
}
function UserModal({ user, onClose, loading, onDelete, isDeleting }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-border p-6 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-xl font-black",
						children: user.photoURL ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: user.photoURL,
							alt: "",
							className: "h-full w-full object-cover"
						}) : (user.email?.[0] ?? "?").toUpperCase()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-black",
								children: user.name || user.email || "Sem nome"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: user.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex gap-2 flex-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }),
										" ",
										user.points ?? 0,
										" pts"
									]
								})
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "p-2 text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-5 w-5 animate-spin text-brand-strong" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-muted/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Compras"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-2xl font-black",
								children: user.orders.count
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-muted/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Total gasto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-2xl font-black",
								children: [(user.orders.total / 1e3).toFixed(0), "K"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-muted/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Referidos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-2xl font-black",
								children: user.referrals.length
							})]
						})
					]
				}),
				user.addresses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
						" Endereços (",
						user.addresses.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: user.addresses.map((addr, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-muted/50 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: addr.street
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								addr.city,
								", ",
								addr.country
							]
						})]
					}, i))
				})] }),
				user.referrals.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { className: "h-4 w-4" }),
						" Usuários Convidados (",
						user.referrals.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: user.referrals.map((uid, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-border bg-muted/50 p-3 text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "text-muted-foreground",
							children: uid
						})
					}, i))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border pt-6 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-bold hover:bg-muted transition",
						children: "Fechar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onDelete,
						disabled: isDeleting,
						className: "flex-1 rounded-lg bg-sale/10 px-4 py-2.5 text-sm font-bold text-sale hover:bg-sale/20 transition disabled:opacity-50 flex items-center justify-center gap-2",
						children: isDeleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { className: "h-4 w-4 animate-spin" }), " Removendo..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Remover Utilizador"] })
					})]
				})
			] })]
		})
	});
}
//#endregion
export { UsersPage as component };
