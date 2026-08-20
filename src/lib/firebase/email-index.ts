/**
 * Verificação segura de "este email já tem conta?".
 *
 * Não usamos listagem de emails (enumeração) nem revelamos dados: guardamos
 * apenas o SHA-256 do email em `emailIndex/{hash}`. Só quem já conhece o email
 * consegue consultar o hash correspondente — as regras proibem `list`.
 */
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { getDb } from "./client";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function emailHash(email: string): Promise<string | null> {
  if (typeof window === "undefined" || !window.crypto?.subtle) return null;
  const bytes = new TextEncoder().encode(normalizeEmail(email));
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** true = já existe conta · false = não existe · null = não foi possível saber */
export async function emailIsRegistered(email: string): Promise<boolean | null> {
  const db = getDb();
  const hash = await emailHash(email);
  if (!db || !hash) return null;
  try {
    const snap = await getDoc(doc(db, "emailIndex", hash));
    return snap.exists();
  } catch {
    return null;
  }
}

/** Registra o hash do email após um login/cadastro bem-sucedido. */
export async function rememberEmail(email: string) {
  const db = getDb();
  const hash = await emailHash(email);
  if (!db || !hash) return;
  try {
    await setDoc(doc(db, "emailIndex", hash), { createdAt: serverTimestamp() }, { merge: true });
  } catch {
    /* silencioso — é apenas um índice auxiliar */
  }
}