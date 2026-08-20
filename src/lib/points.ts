/**
 * Pontos Bazarixy.
 *
 *  · Avaliações de pedidos → pontos guardados em `users/{uid}.points`.
 *  · Convites aceites      → 5 pontos por amigo (contados em `referrals`).
 *
 * Sem sessão os pontos ficam apenas no dispositivo (localStorage) e são
 * enviados para o banco assim que o utilizador entra.
 */
import { useSyncExternalStore } from "react";
import { doc, increment, onSnapshot, setDoc } from "firebase/firestore";

import { getDb } from "@/lib/firebase/client";
import { watchReferrals, POINTS_PER_REFERRAL } from "@/lib/firebase/referrals";

const KEY = "bx_points_v1";

export const POINTS_PER_REVIEW = 50;
export { POINTS_PER_REFERRAL };

function readLocal(): number {
  if (typeof window === "undefined") return 0;
  const n = Number(localStorage.getItem(KEY) ?? "0");
  return Number.isFinite(n) ? n : 0;
}

type PointsState = { earned: number; referrals: number; total: number };

const server: PointsState = { earned: 0, referrals: 0, total: 0 };
let state: PointsState = { earned: readLocal(), referrals: 0, total: readLocal() };
const listeners = new Set<() => void>();

function set(patch: Partial<PointsState>) {
  const next = { ...state, ...patch };
  state = { ...next, total: next.earned + next.referrals * POINTS_PER_REFERRAL };
  listeners.forEach((l) => l());
}

let uid: string | null = null;
let stopProfile: (() => void) | null = null;
let stopReferrals: (() => void) | null = null;

/** Liga os pontos à conta autenticada (chamado pelo FirebaseAuthSync). */
export function bindPoints(nextUid: string | null) {
  if (uid === nextUid) return;
  stopProfile?.(); stopReferrals?.();
  stopProfile = stopReferrals = null;
  uid = nextUid;
  if (!nextUid) { set({ earned: readLocal(), referrals: 0 }); return; }

  const db = getDb();
  if (!db) return;
  const pending = readLocal();
  if (pending > 0) {
    // Migra os pontos ganhos antes do login e limpa o dispositivo.
    void setDoc(doc(db, "users", nextUid), { uid: nextUid, points: increment(pending) }, { merge: true })
      .then(() => { localStorage.setItem(KEY, "0"); })
      .catch(() => {});
  }
  stopProfile = onSnapshot(
    doc(db, "users", nextUid),
    (snap) => set({ earned: Number(snap.data()?.["points"] ?? 0) }),
    () => {},
  );
  stopReferrals = watchReferrals(nextUid, (count) => set({ referrals: count }));
}

export function usePointsState(): PointsState {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => state,
    () => server,
  );
}

export function usePoints(): number {
  return usePointsState().total;
}

export function addPoints(amount: number) {
  const db = getDb();
  if (uid && db) {
    set({ earned: state.earned + amount });
    void setDoc(doc(db, "users", uid), { uid, points: increment(amount) }, { merge: true }).catch(() => {});
    return state.total;
  }
  const next = readLocal() + amount;
  if (typeof window !== "undefined") localStorage.setItem(KEY, String(next));
  set({ earned: next });
  return state.total;
}
