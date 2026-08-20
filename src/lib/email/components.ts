/**
 * Componentes reutilizáveis para os e-mails da Bazarixy.
 *
 * São funções puras que devolvem HTML responsivo (tabelas + estilos inline),
 * o formato que funciona em Gmail, Outlook, Apple Mail e webmails africanos.
 * Nenhum destes ficheiros toca no Firebase — só constrói HTML.
 */
import { SITE_NAME, SITE_URL } from "@/lib/site";

const BRAND = "#C7A24A";
const TEXT = "#1a1a1a";
const MUTED = "#6b6b6b";

/** Escapa texto vindo de dados do utilizador (nunca injectar HTML cru). */
export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function heading(text: string): string {
  return `<h1 style="margin:0 0 12px;font:700 22px/1.3 Arial,Helvetica,sans-serif;color:${TEXT}">${esc(text)}</h1>`;
}

export function paragraph(text: string): string {
  return `<p style="margin:0 0 14px;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:${TEXT}">${text}</p>`;
}

export function muted(text: string): string {
  return `<p style="margin:0 0 10px;font:400 13px/1.6 Arial,Helvetica,sans-serif;color:${MUTED}">${text}</p>`;
}

export function button(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0">
    <tr><td style="background:${TEXT};border-radius:999px">
      <a href="${esc(href)}" style="display:inline-block;padding:13px 28px;font:700 14px Arial,Helvetica,sans-serif;color:#fff;text-decoration:none">${esc(label)}</a>
    </td></tr>
  </table>`;
}

export function codeBox(code: string): string {
  return `<div style="margin:20px 0;padding:18px;border:1px dashed ${BRAND};border-radius:14px;text-align:center;background:#fdf9ef">
    <div style="font:700 32px/1 Arial,Helvetica,sans-serif;letter-spacing:8px;color:${TEXT}">${esc(code)}</div>
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
        <td style="padding:10px 0;width:62px;vertical-align:top">${
          i.image
            ? `<img src="${esc(i.image)}" width="56" height="56" alt="" style="border-radius:8px;object-fit:cover;display:block" />`
            : ""
        }</td>
        <td style="padding:10px 8px;font:400 14px/1.4 Arial,Helvetica,sans-serif;color:${TEXT}">${esc(i.name)}<br /><span style="color:${MUTED};font-size:12px">Qtd: ${esc(i.qty)}</span></td>
        <td style="padding:10px 0;text-align:right;font:700 14px Arial,Helvetica,sans-serif;color:${TEXT};white-space:nowrap">${esc(i.price)}</td>
      </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee;border-bottom:1px solid #eee;margin:16px 0">${rows}</table>`;
}

export function summaryRow(
  label: string,
  value: string,
  strong = false,
): string {
  const weight = strong ? 700 : 400;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="font:${weight} 14px Arial,Helvetica,sans-serif;color:${TEXT};padding:4px 0">${esc(label)}</td>
    <td style="font:${weight} 14px Arial,Helvetica,sans-serif;color:${TEXT};padding:4px 0;text-align:right">${esc(value)}</td>
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
<body style="margin:0;padding:0;background:#f5f5f5">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 12px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden">
      <tr><td style="padding:22px 28px;border-bottom:1px solid #f0f0f0">
        <a href="${SITE_URL}" style="font:800 20px Arial,Helvetica,sans-serif;color:${TEXT};text-decoration:none">${SITE_NAME}</a>
      </td></tr>
      <tr><td style="padding:26px 28px">${bodyHtml}</td></tr>
      <tr><td style="padding:20px 28px;background:#fafafa;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:${MUTED}">
        Recebeu este e-mail porque tem uma conta na ${SITE_NAME}.<br />
        <a href="${SITE_URL}" style="color:${MUTED}">${SITE_URL.replace("https://", "")}</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}
