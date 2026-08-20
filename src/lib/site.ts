/**
 * Domínio oficial e caminhos canónicos da Bazarixy.
 *
 * Todo link partilhado (produto, loja, convite) é construído aqui para que o
 * SEO, o Open Graph e as partilhas apontem sempre para o mesmo endereço.
 */
export const SITE_URL = "https://bazarixy.com";
export const SITE_NAME = "Bazarixy";

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
