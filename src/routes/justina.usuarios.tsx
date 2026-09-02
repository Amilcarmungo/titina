import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Search, ShieldCheck, Users, MapPin, Gift, ShoppingBag, Users2, X, Loader, Trash2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { getDb } from "@/lib/firebase/client";
import { useStaff } from "@/lib/firebase/roles";

export const Route = createFileRoute("/justina/usuarios")({
  component: UsersPage,
});

type Row = {
  uid: string;
  email?: string;
  name?: string | null;
  photoURL?: string | null;
  points?: number;
  createdAt?: unknown;
  addresses?: Array<{ street?: string; city?: string; country?: string }>;
  referredBy?: string;
  referralCount?: number;
  ordersCount?: number;
  totalSpent?: number;
};

type UserDetail = {
  uid: string;
  email?: string;
  name?: string | null;
  photoURL?: string | null;
  points?: number;
  createdAt?: unknown;
  addresses: Array<{ street?: string; city?: string; country?: string }>;
  referrals: string[];
  orders: { count: number; total: number };
};

function UsersPage() {
  const { staff } = useStaff();
  const [rows, setRows] = useState<Row[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [q, setQ] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);

  useEffect(() => {
    const db = getDb();
    if (!db || !staff) {
      setState("error");
      return;
    }
    return onSnapshot(
      collection(db, "users"),
      (snap) => {
        setRows(snap.docs.map((d) => ({ ...(d.data() as Row), uid: d.id })));
        setState("ready");
      },
      () => setState("error"),
    );
  }, [staff]);

  const loadUserDetail = async (uid: string) => {
    setLoadingDetail(true);
    const db = getDb();
    if (!db) {
      setLoadingDetail(false);
      return;
    }
    
    try {
      const user = rows.find(r => r.uid === uid);
      if (!user) return;

      // Buscar endereços
      const addressesSnap = await getDocs(collection(db, "users", uid, "addresses"));
      const addresses = addressesSnap.docs.map(d => d.data() as any);

      // Buscar referrals
      const referralsSnap = await getDocs(query(collection(db, "users"), where("referredBy", "==", uid)));
      const referrals = referralsSnap.docs.map(d => d.id);

      // Buscar orders
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

  const deleteUser = async (uid: string) => {
    if (!confirm(`Tem a certeza que quer remover este utilizador? Esta ação é irreversível.`)) {
      return;
    }

    setDeletingUid(uid);
    const db = getDb();
    if (!db) {
      toast.error("Erro ao conectar ao banco de dados");
      setDeletingUid(null);
      return;
    }

    try {
      // Deletar documento do usuário
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

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const base = [...rows].sort((a, b) =>
      (a.email ?? "").localeCompare(b.email ?? ""),
    );
    if (!term) return base;
    return base.filter((r) =>
      `${r.email ?? ""} ${r.name ?? ""} ${r.uid}`.toLowerCase().includes(term),
    );
  }, [rows, q]);

  return (
    <>
      <div className="space-y-4">
        <header className="flex flex-wrap items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-strong text-background">
            <Users className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-black">Usuários</h1>
            <p className="text-sm text-muted-foreground">
              {rows.length} conta(s) registada(s) • {list.length} resultado(s)
            </p>
          </div>
          <div className="w-full sm:w-72 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por email ou nome"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </header>

        {state === "loading" && (
          <div className="space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        )}

        {state === "error" && (
          <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Sem permissão para listar utilizadores ou sem ligação ao banco. Só a equipa autenticada consegue ver esta página.
          </p>
        )}

        {state === "ready" &&
          (list.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              Nenhum utilizador encontrado.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
              <div className="hidden lg:grid grid-cols-[1.5fr_auto_auto_auto_auto_auto] gap-4 border-b border-border px-6 py-3 text-[11px] font-black uppercase tracking-wider text-muted-foreground sticky top-0 bg-muted/50">
                <span>Conta</span>
                <span className="text-center">Pontos</span>
                <span className="text-center">Pedidos</span>
                <span className="text-center">Referidos</span>
                <span className="text-center">Data</span>
                <span className="text-center">Ações</span>
              </div>
              <ul className="divide-y divide-border">
                {list.map((r) => {
                  const createdDate = r.createdAt?.toDate?.() ?? new Date();
                  const dateStr = createdDate.toLocaleDateString("pt-PT");
                  
                  return (
                    <li
                      key={r.uid}
                      className="grid gap-3 px-4 py-4 lg:grid-cols-[1.5fr_auto_auto_auto_auto_auto] lg:items-center hover:bg-muted/50 transition"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-sm font-black">
                          {r.photoURL ? (
                            <img
                              src={r.photoURL}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            (r.email?.[0] ?? "?").toUpperCase()
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold">
                            {r.name || r.email || "Sem nome"}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {r.email}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold lg:justify-center">
                        <ShieldCheck className="h-3 w-3" /> {r.points ?? 0}
                      </span>
                      <div className="text-center text-sm font-bold text-foreground bg-muted/50 rounded-lg py-2 px-2">
                        0
                      </div>
                      <div className="text-center text-sm font-bold text-foreground bg-muted/50 rounded-lg py-2 px-2">
                        0
                      </div>
                      <div className="text-center text-xs text-muted-foreground">
                        {dateStr}
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => loadUserDetail(r.uid)}
                          className="rounded-lg bg-brand-strong/10 px-3 py-2 text-xs font-bold text-brand-strong hover:bg-brand-strong/20 transition"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => deleteUser(r.uid)}
                          disabled={deletingUid === r.uid}
                          className="rounded-lg bg-sale/10 px-3 py-2 text-xs font-bold text-sale hover:bg-sale/20 transition disabled:opacity-50"
                        >
                          {deletingUid === r.uid ? <Loader className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
      </div>

      {selectedUser && (
        <UserModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
          loading={loadingDetail}
          onDelete={() => deleteUser(selectedUser.uid)}
          isDeleting={deletingUid === selectedUser.uid}
        />
      )}
    </>
  );
}

function UserModal({ user, onClose, loading, onDelete, isDeleting }: { user: UserDetail; onClose: () => void; loading: boolean; onDelete: () => void; isDeleting: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-border p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-xl font-black">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="h-full w-full object-cover" />
              ) : (
                (user.email?.[0] ?? "?").toUpperCase()
              )}
            </span>
            <div className="min-w-0">
              <h2 className="text-xl font-black">{user.name || user.email || "Sem nome"}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold">
                  <ShieldCheck className="h-3.5 w-3.5" /> {user.points ?? 0} pts
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="h-5 w-5 animate-spin text-brand-strong" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground">Compras</p>
                <p className="mt-1 text-2xl font-black">{user.orders.count}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground">Total gasto</p>
                <p className="mt-1 text-2xl font-black">{(user.orders.total / 1000).toFixed(0)}K</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground">Referidos</p>
                <p className="mt-1 text-2xl font-black">{user.referrals.length}</p>
              </div>
            </div>

            {/* Addresses */}
            {user.addresses.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-bold">
                  <MapPin className="h-4 w-4" /> Endereços ({user.addresses.length})
                </h3>
                <div className="mt-3 space-y-2">
                  {user.addresses.map((addr, i) => (
                    <div key={i} className="rounded-lg border border-border bg-muted/50 p-3">
                      <p className="text-sm font-semibold">{addr.street}</p>
                      <p className="text-xs text-muted-foreground">{addr.city}, {addr.country}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Referrals */}
            {user.referrals.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-bold">
                  <Users2 className="h-4 w-4" /> Usuários Convidados ({user.referrals.length})
                </h3>
                <div className="mt-3 space-y-2">
                  {user.referrals.map((uid, i) => (
                    <div key={i} className="rounded-lg border border-border bg-muted/50 p-3 text-xs">
                      <code className="text-muted-foreground">{uid}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-border pt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-bold hover:bg-muted transition"
              >
                Fechar
              </button>
              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="flex-1 rounded-lg bg-sale/10 px-4 py-2.5 text-sm font-bold text-sale hover:bg-sale/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" /> Removendo...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" /> Remover Utilizador
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
