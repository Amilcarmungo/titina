import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Search, ShieldCheck, Users } from "lucide-react";

import { getDb } from "@/lib/firebase/client";
import { useStaff } from "@/lib/firebase/roles";

export const Route = createFileRoute("/admin/usuarios")({
  component: UsersPage,
});

type Row = {
  uid: string;
  email?: string;
  name?: string | null;
  photoURL?: string | null;
  points?: number;
  createdAt?: unknown;
};

function UsersPage() {
  const { staff } = useStaff();
  const [rows, setRows] = useState<Row[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [q, setQ] = useState("");

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
    <div className="space-y-4">
      <header className="flex flex-wrap items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-foreground text-background">
          <Users className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-black">Usuários</h1>
          <p className="text-xs text-muted-foreground">
            {rows.length} conta(s) registada(s) na Bazarixy.
          </p>
        </div>
        <div className="ml-auto flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 sm:w-72">
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
          Sem permissão para listar utilizadores ou sem ligação ao banco. Só a
          equipa autenticada consegue ver esta página.
        </p>
      )}

      {state === "ready" &&
        (list.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Nenhum utilizador encontrado.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="hidden grid-cols-[1fr_auto_auto] gap-4 border-b border-border px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-muted-foreground sm:grid">
              <span>Conta</span>
              <span>Pontos</span>
              <span>ID</span>
            </div>
            <ul className="divide-y divide-border">
              {list.map((r) => (
                <li
                  key={r.uid}
                  className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-xs font-black">
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
                  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold">
                    <ShieldCheck className="h-3.5 w-3.5" /> {r.points ?? 0} pts
                  </span>
                  <code className="truncate text-[11px] text-muted-foreground">
                    {r.uid}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
