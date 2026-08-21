/**
 * Componentes reutilizáveis para os e-mails da Bazarixy.
 *
 * São funções puras que devolvem HTML responsivo (tabelas + estilos inline),
 * o formato que funciona em Gmail, Outlook, Apple Mail e webmails africanos.
 * Nenhum destes ficheiros toca no Firebase — só constrói HTML.
 */
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

const BRAND = "#e83e8c";
const BRAND_DARK = "#c52d73";
const BRAND_PALE = "#fff0f6";
const TEXT = "#24202a";
const MUTED = "#766d78";
const BORDER = "#f1e5ec";
const LOGO_URL = absoluteUrl("/img/bazarixy-mark.webp");

/** Escapa texto vindo de dados do utilizador (nunca injectar HTML cru). */
export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function heading(text: string): string {
  return `<h1 style="margin:0 0 12px;font:700 24px/1.25 Arial,Helvetica,sans-serif;letter-spacing:-.2px;color:${TEXT}">${esc(text)}</h1>`;
}

export function paragraph(text: string): string {
  return `<p style="margin:0 0 16px;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:${TEXT}">${text}</p>`;
}

export function muted(text: string): string {
  return `<p style="margin:0 0 10px;font:400 13px/1.6 Arial,Helvetica,sans-serif;color:${MUTED}">${text}</p>`;
}

export function noticeLabel(label: string): string {
  return `<div style="display:inline-block;margin:0 0 16px;padding:7px 11px;border-radius:999px;background:${BRAND_PALE};font:700 11px Arial,Helvetica,sans-serif;letter-spacing:.4px;text-transform:uppercase;color:${BRAND_DARK}">${esc(label)}</div>`;
}

export function messageBlock(text: string): string {
  const content = esc(text).replace(/\r?\n/g, "<br />");
  return `<div style="margin:18px 0;padding:16px 18px;border-left:4px solid ${BRAND};border-radius:0 10px 10px 0;background:#fff7fa;font:400 14px/1.65 Arial,Helvetica,sans-serif;color:${TEXT}">${content}</div>`;
}

export function button(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0">
    <tr><td style="background:${BRAND};border-radius:10px;box-shadow:0 5px 14px rgba(232,62,140,.2)">
      <a href="${esc(href)}" style="display:inline-block;padding:14px 26px;font:700 14px Arial,Helvetica,sans-serif;color:#fff;text-decoration:none">${esc(label)}</a>
    </td></tr>
  </table>`;
}

export function codeBox(code: string): string {
  return `<div style="margin:22px 0;padding:20px;border:1px solid #f6c4db;border-radius:14px;text-align:center;background:${BRAND_PALE}">
    <div style="font:700 34px/1 Arial,Helvetica,sans-serif;letter-spacing:9px;color:${BRAND_DARK}">${esc(code)}</div>
    <div style="margin-top:8px;font:400 12px Arial,Helvetica,sans-serif;color:${MUTED}">Código de verificação</div>
  </div>`;
}

export type EmailLineItem = {
  name: string;
  qty: number;
  price: string;
  image?: string;
};

export function itemsTable(items: EmailLineItem[]): string {
  const rows = items
    .map(
      (i) => `<tr>
        <td style="padding:12px 0;width:62px;vertical-align:top">${
          i.image
            ? `<img src="${esc(i.image)}" width="56" height="56" alt="${esc(i.name)}" style="border-radius:10px;object-fit:cover;display:block;border:1px solid ${BORDER}" />`
            : ""
        }</td>
        <td style="padding:10px 8px;font:400 14px/1.4 Arial,Helvetica,sans-serif;color:${TEXT}">${esc(i.name)}<br /><span style="color:${MUTED};font-size:12px">Qtd: ${esc(i.qty)}</span></td>
        <td style="padding:10px 0;text-align:right;font:700 14px Arial,Helvetica,sans-serif;color:${TEXT};white-space:nowrap">${esc(i.price)}</td>
      </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER};border-bottom:1px solid ${BORDER};margin:18px 0">${rows}</table>`;
}

export function summaryRow(
  label: string,
  value: string,
  strong = false,
): string {
  const weight = strong ? 700 : 400;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="font:${weight} 14px Arial,Helvetica,sans-serif;color:${TEXT};padding:4px 0">${esc(label)}</td>
    <td style="font:${weight} 14px Arial,Helvetica,sans-serif;color:${strong ? BRAND_DARK : TEXT};padding:4px 0;text-align:right">${esc(value)}</td>
  </tr></table>`;
}

/** Envelope comum: cabeçalho, corpo centrado (máx. 600px) e rodapé. */
export function shell(bodyHtml: string, preheader = ""): string {
  return `<!doctype html>
<html lang="pt"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${SITE_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#fff7fa">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff7fa;padding:30px 12px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${BORDER};border-radius:18px;overflow:hidden">
      <tr><td style="padding:22px 28px;border-bottom:1px solid ${BORDER};background:#fff">
        <a href="${SITE_URL}" style="font:800 20px Arial,Helvetica,sans-serif;color:${TEXT};text-decoration:none"><img src="${LOGO_URL}" width="42" height="42" alt="${SITE_NAME}" style="display:inline-block;vertical-align:middle;border-radius:12px;margin-right:10px" /><span style="vertical-align:middle">${SITE_NAME}</span></a>
      </td></tr>
      <tr><td style="padding:26px 28px">${bodyHtml}</td></tr>
      <tr><td style="padding:24px 28px;background:${BRAND_PALE};font:400 12px/1.7 Arial,Helvetica,sans-serif;color:${MUTED}">
        <strong style="color:${TEXT}">Bazarixy</strong> · Compras online em Angola<br />
        Recebeu este e-mail porque tem uma conta ou uma encomenda na ${SITE_NAME}.<br />
        <a href="${SITE_URL}" style="color:${BRAND_DARK};font-weight:700;text-decoration:none">${SITE_URL.replace("https://", "")}</a> · <a href="${absoluteUrl("/support")}" style="color:${BRAND_DARK};font-weight:700;text-decoration:none">Contactar suporte</a><br />
        <span style="color:#9b8d97">Este é um e-mail automático. Por favor, não responda directamente.</span>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
