/**
 * Verificação de e-mail por código (6 dígitos) — Firebase + Resend.
 *
 *  users/{uid}/security/emailVerification  { codeHash, expiresAt, attempts }
 *
 * O código nunca é guardado em claro: fica só o hash SHA-256.
 */
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { getDb } from "@/lib/firebase/client";
import { sendAppEmail } from "@/lib/email/send";

const MINUTES = 15;

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomCode() {
  const n = crypto.getRandomValues(new Uint32Array(1))[0]! % 1_000_000;
  return String(n).padStart(6, "0");
}

/** Gera, guarda e envia o código de verificação. */
export async function sendVerificationCode(uid: string, email: string, name?: string) {
  const db = getDb();
  if (!db) return false;
  const code = randomCode();
  await setDoc(
    doc(db, "users", uid, "security", "emailVerification"),
    {
      codeHash: await sha256(code),
      email: email.toLowerCase(),
      expiresAt: Date.now() + MINUTES * 60_000,
      attempts: 0,
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
  return sendAppEmail("verify-email", email, { code, name, minutes: MINUTES });
}

export type VerifyResult = { ok: true } | { ok: false; error: string };

/** Confere o código enviado pelo utilizador. */
export async function confirmVerificationCode(uid: string, code: string): Promise<VerifyResult> {
  const db = getDb();
  if (!db) return { ok: false, error: "Backend não configurado." };
  const ref = doc(db, "users", uid, "security", "emailVerification");
  const snap = await getDoc(ref);
  if (!snap.exists()) return { ok: false, error: "Peça um novo código." };
  const data = snap.data() as { codeHash?: string; expiresAt?: number; attempts?: number };
  if ((data.attempts ?? 0) >= 6) return { ok: false, error: "Demasiadas tentativas. Peça um novo código." };
  if (!data.expiresAt || Date.now() > data.expiresAt) return { ok: false, error: "Código expirado. Peça um novo." };
  if ((await sha256(code.trim())) !== data.codeHash) {
    await updateDoc(ref, { attempts: (data.attempts ?? 0) + 1 }).catch(() => {});
    return { ok: false, error: "Código incorrecto." };
  }
  await setDoc(doc(db, "users", uid), { uid, emailVerified: true, verifiedAt: serverTimestamp() }, { merge: true });
  return { ok: true };
}
