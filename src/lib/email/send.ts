/**
 * Helper reutilizável do frontend para pedir o envio de um e-mail.
 * Nunca fala com o Resend directamente — chama a API serverless /api/email
 * com o ID token do Firebase, para a chave nunca aparecer no browser.
 */
import { getFirebaseAuth } from "@/lib/firebase/client";

import type { EmailPayloads, EmailTemplateName } from "./templates";

export async function sendAppEmail<K extends EmailTemplateName>(
  template: K,
  to: string,
  data: EmailPayloads[K],
): Promise<boolean> {
  try {
    const user = getFirebaseAuth()?.currentUser;
    const idToken = user ? await user.getIdToken() : "";
    if (!idToken) return false;
    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ template, to, data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
