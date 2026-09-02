//#region node_modules/.nitro/vite/services/ssr/assets/site-BzUm8isV.js
/**
* Domínio oficial e caminhos canónicos da Bazarixy.
*
* Todo link partilhado (produto, loja, convite) é construído aqui para que o
* SEO, o Open Graph e as partilhas apontem sempre para o mesmo endereço.
*/
var SITE_URL = "https://bazarixy.com";
var SITE_NAME = "Bazarixy";
var HOME_TITLE = "Bazarixy | Compras Online em Angola";
var HOME_DESCRIPTION = "Bazarixy — Compra online em Angola. Encontra promoções em roupas, telemóveis, eletrónicos, calçados, beleza, casa, desporto e muito mais. Descobre ofertas, produtos de lojas verificadas e compra com segurança.";
var SHARE_IMAGE = absoluteUrl("/detalhesdolinks.png");
/** Normaliza uma descrição para snippets do Google e prévias sociais. */
function seoDescription(value, fallback, max = 155) {
	const text = (value || fallback).replace(/\s+/g, " ").trim();
	if (text.length <= max) return text;
	return `${text.slice(0, max - 1).replace(/\s+\S*$/, "").trim()}…`;
}
/** Texto claro para partilhas: identifica o conteúdo e dá contexto à marca. */
function shareText(title, description, subject = "Veja na Bazarixy") {
	const detail = seoDescription(description, "", 220);
	return detail ? `${title} — ${detail} ${subject}` : `${title} · ${subject}`;
}
/** Junta um caminho relativo ao domínio oficial (sem barras duplicadas). */
function absoluteUrl(path = "/") {
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
var paths = {
	product: (id) => `/product/${encodeURIComponent(id)}`,
	shop: (id) => `/shop/${encodeURIComponent(id)}`,
	category: (slug) => `/category/${encodeURIComponent(slug)}`,
	invite: (code) => `/auth?convite=${encodeURIComponent(code)}`
};
var productUrl = (id) => absoluteUrl(paths.product(id));
var shopUrl = (id) => absoluteUrl(paths.shop(id));
var inviteUrl = (code) => absoluteUrl(paths.invite(code));
//#endregion
export { SITE_URL as a, paths as c, shareText as d, shopUrl as f, SITE_NAME as i, productUrl as l, HOME_TITLE as n, absoluteUrl as o, SHARE_IMAGE as r, inviteUrl as s, HOME_DESCRIPTION as t, seoDescription as u };
