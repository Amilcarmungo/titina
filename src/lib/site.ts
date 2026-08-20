/**
 * Domínio oficial e caminhos canónicos da Bazarixy.
 *
 * Todo link partilhado (produto, loja, convite) é construído aqui para que o
 * SEO, o Open Graph e as partilhas apontem sempre para o mesmo endereço.
 */
export const SITE_URL = "https://bazarixy.com";
export const SITE_NAME = "Bazarixy";

/** Normaliza uma descrição para snippets do Google e prévias sociais. */
export function seoDescription(
  value: string | undefined,
  fallback: string,
  max = 155,
): string {
  const text = (value || fallback).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text
    .slice(0, max - 1)
    .replace(/\s+\S*$/, "")
    .trim()}…`;
}

/** Texto claro para partilhas: identifica o conteúdo e dá contexto à marca. */
export function shareText(
  title: string,
  description: string | undefined,
  subject = "Veja na Bazarixy",
): string {
  const detail = seoDescription(description, "", 220);
  return detail ? `${title} — ${detail} ${subject}` : `${title} · ${subject}`;
}

/** Junta um caminho relativo ao domínio oficial (sem barras duplicadas). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export const paths = {
  product: (id: string) => `/product/${encodeURIComponent(id)}`,
  shop: (id: string) => `/shop/${encodeURIComponent(id)}`,
  category: (slug: string) => `/category/${encodeURIComponent(slug)}`,
  invite: (code: string) => `/auth?convite=${encodeURIComponent(code)}`,
};

export const productUrl = (id: string) => absoluteUrl(paths.product(id));
export const shopUrl = (id: string) => absoluteUrl(paths.shop(id));
export const categoryUrl = (slug: string) => absoluteUrl(paths.category(slug));
export const inviteUrl = (code: string) => absoluteUrl(paths.invite(code));
