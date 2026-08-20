import { createFileRoute } from "@tanstack/react-router";

import { buildEmail, isEmailTemplate } from "@/lib/email/templates";

/**
 * API serverless de e-mails (Resend).
 * POST /api/email  { template, to, data }
 *
 * Segurança:
 *  - a chave do Resend vive só nas Environment Variables do servidor;
 *  - é obrigatório um ID token válido do Firebase (Authorization: Bearer …);
 *  - o destinatário tem de ser o e-mail do próprio utilizador autenticado
 *    (excepto para membros com token de serviço interno em campanhas).
 */
export const Route = createFileRoute("/api/email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { sendWithResend, verifyFirebaseIdToken, isActiveStaff } = await import("@/lib/email/resend.server");

        let payload: { template?: unknown; to?: unknown; data?: unknown };
        try {
          payload = (await request.json()) as typeof payload;
        } catch {
          return Response.json({ error: "JSON inválido." }, { status: 400 });
        }

        const { template, to, data } = payload;
        if (!isEmailTemplate(template)) {
          return Response.json({ error: "Template desconhecido." }, { status: 400 });
        }
        if (typeof to !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
          return Response.json({ error: "Destinatário inválido." }, { status: 400 });
        }

        const auth = request.headers.get("authorization") ?? "";
        const idToken = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "";
        const account = await verifyFirebaseIdToken(idToken);
        if (!account) return Response.json({ error: "Não autorizado." }, { status: 401 });
        if (account.email && account.email !== to.toLowerCase()) {
          // Excepção: a equipa activa pode avisar o dono de um pedido.
          const staff = await isActiveStaff(idToken, account.uid);
          if (!staff) {
            return Response.json({ error: "Só é possível enviar para o seu próprio e-mail." }, { status: 403 });
          }
        }

        try {
          const { subject, html } = buildEmail(template, data);
          const result = await sendWithResend({ to, subject, html });
          return Response.json({ ok: true, id: result.id });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Falha no envio.";
          console.error("[/api/email]", message);
          return Response.json({ ok: false, error: message }, { status: 502 });
        }
      },
    },
  },
});
