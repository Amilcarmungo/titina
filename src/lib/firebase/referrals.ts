/**
 * Convites (referral) — cada utilizador tem um link único e ganha pontos por
 * cada amigo que criar conta através dele.
 *
 *   referrals/{novoUid} = { uid, referrerUid, createdAt }
 *
 * O novo utilizador é quem escreve o seu próprio registo (é o único que as
 * regras autorizam), e o convidador lê os registos onde é o `referrerUid`.
 * Assim os pontos são sempre calculados a partir do banco, nunca do frontend.
 */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { getDb } from "./client";
import { inviteUrl } from "@/lib/site";

const PENDING_KEY = "bx_referral_code";

export const POINTS_PER_REFERRAL = 5;

/** Código de convite público de um utilizador (o próprio uid). */
export function referralCode(uid: string) {
  return uid;
}

/** Link único de convite — sempre no domínio oficial bazarixy.com. */
export function referralLink(uid: string) {
  return inviteUrl(referralCode(uid));
}

/** Guarda o código presente no URL (?convite= / ?ref=) para usar no cadastro. */
export function captureReferralFromUrl() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("convite") || params.get("ref");
  if (code && code.length >= 6) localStorage.setItem(PENDING_KEY, code);
}

export function pendingReferral(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PENDING_KEY);
}

/**
 * Registra o convite na primeira vez que o utilizador aparece autenticado.
 * Nunca sobrescreve um registo existente e ignora auto-convites.
 */
export async function recordReferralOnce(uid: string) {
  const db = getDb();
  const code = pendingReferral();
  if (!db || !code || code === uid) return;
  try {
    const ref = doc(db, "referrals", uid);
    if ((await getDoc(ref)).exists()) {
      localStorage.removeItem(PENDING_KEY);
      return;
    }
    await setDoc(ref, { uid, referrerUid: code, createdAt: serverTimestamp() });
    localStorage.removeItem(PENDING_KEY);
  } catch {
    /* silencioso — o convite pode ser inválido */
  }
}

export async function countReferrals(uid: string): Promise<number> {
  const db = getDb();
  if (!db) return 0;
  try {
    const snap = await getDocs(
      query(collection(db, "referrals"), where("referrerUid", "==", uid)),
    );
    return snap.size;
  } catch {
    return 0;
  }
}

export function watchReferrals(uid: string, cb: (count: number) => void) {
  const db = getDb();
  if (!db) return () => {};
  return onSnapshot(
    query(collection(db, "referrals"), where("referrerUid", "==", uid)),
    (snap) => cb(snap.size),
    () => cb(0),
  );
}
