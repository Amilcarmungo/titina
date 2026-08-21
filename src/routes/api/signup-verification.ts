import { createFileRoute } from "@tanstack/react-router";
import { buildEmail } from "@/lib/email/templates";

const MAX_AGE_SECONDS = 15 * 60;
const COOKIE = "bazarixy_signup_verification";

type Challenge = {
  email: string;
  codeHash: string;
  expiresAt: number;
};

function secret() {
  return (
    process.env["EMAIL_VERIFICATION_SECRET"] ||
    process.env["RESEND_API_KEY"] ||
    "development-only-verification-secret"
  );
}

function base64Url(value: ArrayBuffer | string) {
  const bytes =
    typeof value === "string"
      ? new TextEncoder().encode(value)
      : new Uint8Array(value);
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="));
}

async function digest(value: string) {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function signature(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64Url(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)),
  );
}

async function seal(challenge: Challenge) {
  const payload = base64Url(JSON.stringify(challenge));
  return `${payload}.${await signature(payload)}`;
}

async function unseal(value: string | null): Promise<Challenge | null> {
  if (!value) return null;
  const [payload, provided] = value.split(".");
  if (!payload || !provided || (await signature(payload)) !== provided)
    return null;
  try {
    const data = JSON.parse(fromBase64Url(payload)) as Challenge;
    if (
      typeof data.email !== "string" ||
      typeof data.codeHash !== "string" ||
      typeof data.expiresAt !== "number" ||
      Date.now() > data.expiresAt
    ) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function cookie(value: string, maxAge: number, secure: boolean) {
  return `${COOKIE}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`;
}

function getCookie(request: Request) {
  return (
    request.headers
      .get("cookie")
      ?.split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${COOKIE}=`))
      ?.slice(COOKIE.length + 1) ?? null
  );
}

export const Route = createFileRoute("/api/signup-verification")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secure = new URL(request.url).protocol === "https:";
        let body: {
          action?: unknown;
          email?: unknown;
          name?: unknown;
          code?: unknown;
        };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json({ error: "JSON inválido." }, { status: 400 });
        }

        if (body.action === "request") {
          const email =
            typeof body.email === "string"
              ? body.email.trim().toLowerCase()
              : "";
          const name =
            typeof body.name === "string"
              ? body.name.trim().slice(0, 80)
              : undefined;
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ error: "Email inválido." }, { status: 400 });
          }
          const code = String(Math.floor(Math.random() * 1_000_000)).padStart(
            6,
            "0",
          );
          const challenge: Challenge = {
            email,
            codeHash: await digest(`${email}:${code}`),
            expiresAt: Date.now() + MAX_AGE_SECONDS * 1000,
          };
          try {
            const { subject, html } = buildEmail("verify-email", {
              code,
              name,
              minutes: 15,
            });
            const { sendWithResend } =
              await import("@/lib/email/resend.server");
            await sendWithResend({ to: email, subject, html });
            return new Response(JSON.stringify({ ok: true }), {
              headers: {
                "content-type": "application/json",
                "set-cookie": await seal(challenge).then((value) =>
                  cookie(value, MAX_AGE_SECONDS, secure),
                ),
              },
            });
          } catch (error) {
            console.error("[/api/signup-verification]", error);
            return Response.json(
              { error: "Não foi possível enviar o código agora." },
              { status: 502 },
            );
          }
        }

        if (body.action === "verify") {
          const code = typeof body.code === "string" ? body.code.trim() : "";
          const challenge = await unseal(getCookie(request));
          if (!challenge || !/^\d{6}$/.test(code)) {
            return Response.json(
              { ok: false, error: "Código inválido ou expirado." },
              { status: 400 },
            );
          }
          const valid =
            (await digest(`${challenge.email}:${code}`)) === challenge.codeHash;
          if (!valid)
            return Response.json(
              { ok: false, error: "Código incorrecto." },
              { status: 400 },
            );
          return new Response(
            JSON.stringify({ ok: true, email: challenge.email }),
            {
              headers: {
                "content-type": "application/json",
                "set-cookie": cookie("", 0, secure),
              },
            },
          );
        }

        return Response.json({ error: "Acção inválida." }, { status: 400 });
      },
    },
  },
});
