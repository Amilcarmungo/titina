/**
 * Comunicação com o Resend — SÓ no servidor.
 * A chave (RESEND_API_KEY) nunca sai das Environment Variables.
 */
export type SendResult = { id: string };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function sendWithResend(input: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) throw new Error("RESEND_API_KEY não configurada.");

  const from =
    process.env["EMAIL_FROM"] ?? "Bazarixy <nao-responder@bazarixy.com>";

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
    }),
  });

  const body = await res.text();
  if (!res.ok) {
    console.error(`Resend falhou [${res.status}]: ${body}`);
    throw new Error(`Resend falhou [${res.status}]: ${body}`);
  }
  const parsed = JSON.parse(body) as { id?: string };
  return { id: parsed.id ?? "" };
}

/**
 * Confirma que o pedido vem de um utilizador autenticado no Firebase e devolve
 * o e-mail verificado do token (evita que alguém envie e-mails para terceiros).
 */
export async function verifyFirebaseIdToken(
  idToken: string,
): Promise<{ uid: string; email: string } | null> {
  const apiKey = import.meta.env["VITE_FIREBASE_API_KEY"];
  if (!apiKey || !idToken) return null;
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken }),
    },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as {
    users?: { localId: string; email?: string }[];
  };
  const u = data.users?.[0];
  return u ? { uid: u.localId, email: (u.email ?? "").toLowerCase() } : null;
}

/**
 * Confirma no Firestore (com o próprio token do utilizador, respeitando as
 * regras) se quem pede é membro activo da equipa. Só a equipa pode enviar
 * e-mails para outros endereços — por exemplo o estado de um pedido.
 */
export async function isActiveStaff(
  idToken: string,
  uid: string,
): Promise<boolean> {
  const projectId = import.meta.env["VITE_FIREBASE_PROJECT_ID"];
  if (!projectId || !idToken || !uid) return false;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/staff/${uid}`;
  const res = await fetch(url, {
    headers: { authorization: `Bearer ${idToken}` },
  });
  if (!res.ok) return false;
  const doc = (await res.json()) as {
    fields?: {
      active?: { booleanValue?: boolean };
      role?: { stringValue?: string };
    };
  };
  const role = doc.fields?.role?.stringValue;
  return (
    doc.fields?.active?.booleanValue === true &&
    (role === "admin" || role === "gerente" || role === "atendente")
  );
}
