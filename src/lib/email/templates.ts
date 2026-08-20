/**
 * Registo central dos e-mails da Bazarixy.
 *
 * Para acrescentar um novo tipo de e-mail no futuro basta adicionar uma entrada
 * em `EMAIL_TEMPLATES`: assunto + HTML. Nada mais precisa de mudar (a API e o
 * helper do frontend passam a aceitar o novo nome automaticamente).
 */
import { SITE_URL } from "@/lib/site";

import {
  button,
  codeBox,
  esc,
  heading,
  itemsTable,
  muted,
  paragraph,
  shell,
  summaryRow,
  type EmailLineItem,
} from "./components";

export type EmailTemplateName =
  | "verify-email"
  | "password-reset"
  | "order-confirmation"
  | "notification"
  | "promo";

export type EmailPayloads = {
  "verify-email": { name?: string; code: string; minutes?: number };
  "password-reset": { name?: string; resetLink: string };
  "order-confirmation": {
    name?: string;
    orderCode: string;
    items: EmailLineItem[];
    subtotal: string;
    discount?: string;
    total: string;
    address?: string;
    paymentMethod?: string;
  };
  notification: {
    name?: string;
    title: string;
    message: string;
    ctaLabel?: string;
    ctaPath?: string;
  };
  promo: {
    name?: string;
    headline: string;
    message: string;
    ctaLabel?: string;
    ctaPath?: string;
    imageUrl?: string;
  };
};

export type EmailRequest<K extends EmailTemplateName = EmailTemplateName> = {
  template: K;
  to: string;
  data: EmailPayloads[K];
};

type Built = { subject: string; html: string };

const url = (path?: string) =>
  path
    ? path.startsWith("http")
      ? path
      : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`
    : SITE_URL;
const hello = (name?: string) =>
  paragraph(name ? `Olá <strong>${esc(name)}</strong>,` : "Olá,");

export const EMAIL_TEMPLATES: {
  [K in EmailTemplateName]: (data: EmailPayloads[K]) => Built;
} = {
  "verify-email": (d) => ({
    subject: `${d.code} é o seu código de verificação — Bazarixy`,
    html: shell(
      heading("Confirme o seu e-mail") +
        hello(d.name) +
        paragraph(
          "Use o código abaixo para confirmar a sua conta na Bazarixy.",
        ) +
        codeBox(d.code) +
        muted(
          `O código expira em ${esc(d.minutes ?? 15)} minutos. Se não foi você, ignore este e-mail.`,
        ),
      "Código de verificação da sua conta",
    ),
  }),

  "password-reset": (d) => ({
    subject: "Recuperar a sua palavra-passe — Bazarixy",
    html: shell(
      heading("Recuperar palavra-passe") +
        hello(d.name) +
        paragraph(
          "Recebemos um pedido para redefinir a sua palavra-passe. Toque no botão abaixo para criar uma nova.",
        ) +
        button("Criar nova palavra-passe", d.resetLink) +
        muted(
          "O link é válido por tempo limitado e só pode ser usado uma vez. Se não pediu isto, pode ignorar este e-mail em segurança.",
        ),
      "Redefina a sua palavra-passe",
    ),
  }),

  "order-confirmation": (d) => ({
    subject: `Pedido ${d.orderCode} confirmado — Bazarixy`,
    html: shell(
      heading("Pedido confirmado!") +
        hello(d.name) +
        paragraph(
          `Obrigado pela sua compra. O seu pedido <strong>${esc(d.orderCode)}</strong> foi registado e já está a ser tratado.`,
        ) +
        itemsTable(d.items) +
        summaryRow("Subtotal", d.subtotal) +
        (d.discount ? summaryRow("Desconto", `-${d.discount}`) : "") +
        summaryRow("Frete", "Grátis") +
        summaryRow("Total", d.total, true) +
        (d.paymentMethod ? muted(`Pagamento: ${esc(d.paymentMethod)}`) : "") +
        (d.address ? muted(`Entrega: ${esc(d.address)}`) : "") +
        button("Ver os meus pedidos", url("/orders")),
      `Pedido ${d.orderCode} confirmado`,
    ),
  }),

  notification: (d) => ({
    subject: d.title,
    html: shell(
      heading(d.title) +
        hello(d.name) +
        paragraph(esc(d.message)) +
        (d.ctaLabel ? button(d.ctaLabel, url(d.ctaPath)) : ""),
      d.title,
    ),
  }),

  promo: (d) => ({
    subject: d.headline,
    html: shell(
      (d.imageUrl
        ? `<img src="${esc(d.imageUrl)}" alt="" width="544" style="display:block;width:100%;border-radius:12px;margin-bottom:18px" />`
        : "") +
        heading(d.headline) +
        hello(d.name) +
        paragraph(esc(d.message)) +
        button(d.ctaLabel ?? "Ver ofertas", url(d.ctaPath ?? "/super-ofertas")),
      d.headline,
    ),
  }),
};

export function isEmailTemplate(value: unknown): value is EmailTemplateName {
  return typeof value === "string" && value in EMAIL_TEMPLATES;
}

export function buildEmail(template: EmailTemplateName, data: unknown): Built {
  const build = EMAIL_TEMPLATES[template] as (d: unknown) => Built;
  return build(data ?? {});
}
