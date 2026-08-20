import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Loader2, ShieldCheck, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { getDb } from "@/lib/firebase/client";
import {
  ROLE_LABEL,
  usePermission,
  type StaffMember,
  type StaffRole,
} from "@/lib/firebase/roles";

export const Route = createFileRoute("/admin/equipa")({
  head: () => ({
    meta: [
      { title: "Equipa — Admin Bazarixy" },
      {
        name: "description",
        content: "Adicione membros da equipa e defina o sector de cada um.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: EquipaPage,
});

const ROLES: StaffRole[] = ["admin", "gerente", "atendente"];

const ROLE_HINT: Record<StaffRole, string> = {
  admin: "Acesso total, incluindo equipa e configurações.",
  gerente: "Catálogo, publicações e estados de pedidos.",
  atendente: "Apenas estados de pedidos e atendimento.",
};

function EquipaPage() {
  const canManage = usePermission("staff.manage");
  const [members, setMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<StaffRole>("atendente");
  const [shopId, setShopId] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const db = getDb();
    if (!db || !canManage) {
      setLoading(false);
      return;
    }
    return onSnapshot(
      collection(db, "staff"),
      (snap) => {
        setMembers(
          snap.docs.map((d) => ({
            uid: d.id,
            ...(d.data() as Omit<StaffMember, "uid">),
          })),
        );
        setLoading(false);
      },
      () => setLoading(false),
    );
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
      await setDoc(
        doc(db, "staff", id),
        {
          role,
          active: true,
          name: name.trim() || null,
          shopId: shopId.trim() || null,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
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

  const setActive = async (m: StaffMember, active: boolean) => {
    const db = getDb();
    if (!db) return;
    await setDoc(doc(db, "staff", m.uid), { active }, { merge: true }).catch(
      () => toast.error("Sem permissão."),
    );
  };

  const remove = async (m: StaffMember) => {
    const db = getDb();
    if (!db) return;
    await deleteDoc(doc(db, "staff", m.uid)).catch(() =>
      toast.error("Sem permissão."),
    );
  };

  if (!canManage) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center">
        <ShieldCheck
          className="mx-auto h-10 w-10 text-muted-foreground"
          strokeWidth={1.3}
        />
        <p className="mt-3 font-display text-lg font-black">Sem acesso</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Só um administrador pode gerir a equipa.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-black">Equipa</h1>
        <p className="text-sm text-muted-foreground">
          Adicione membros e escolha o sector de cada um. As permissões são
          validadas no servidor.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="flex items-center gap-2 text-sm font-bold">
          <UserPlus className="h-4 w-4" /> Adicionar membro
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            UID do utilizador
            <input
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="ex.: 8fK2p…"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-gold"
            />
          </label>
          <label className="text-xs font-semibold">
            Nome (opcional)
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-gold"
            />
          </label>
          <label className="text-xs font-semibold">
            Sector / função
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as StaffRole)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-gold"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABEL[r]}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-[11px] font-normal text-muted-foreground">
              {ROLE_HINT[role]}
            </span>
          </label>
          <label className="text-xs font-semibold">
            Loja (opcional)
            <input
              value={shopId}
              onChange={(e) => setShopId(e.target.value)}
              placeholder="ID da loja"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal outline-none focus:border-gold"
            />
          </label>
        </div>
        <button
          onClick={add}
          disabled={busy}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Adicionar à
          equipa
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card">
        <p className="border-b border-border px-4 py-3 text-sm font-bold">
          Membros ({members.length})
        </p>
        {loading ? (
          <div className="space-y-2 p-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : members.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            Ainda não há membros.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {members.map((m) => (
              <li
                key={m.uid}
                className="flex flex-wrap items-center gap-3 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">
                    {m.name || m.uid}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {ROLE_LABEL[m.role] ?? m.role}
                    {m.shopId ? ` · ${m.shopId}` : ""} · {m.uid}
                  </p>
                </div>
                <button
                  onClick={() => setActive(m, m.active === false)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold ${m.active === false ? "border-border text-muted-foreground" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-600"}`}
                >
                  {m.active === false ? "Inactivo" : "Activo"}
                </button>
                <button
                  onClick={() => remove(m)}
                  aria-label="Remover membro"
                  className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
