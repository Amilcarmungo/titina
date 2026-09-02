/**
 * Utilitários de Sanitização para proteção contra XSS
 * Usa DOMPurify para sanitizar HTML e remover scripts maliciosos
 */

import DOMPurify from "dompurify";

/**
 * Configuração padrão do DOMPurify
 * Permite apenas tags HTML seguras e remove scripts, iframes, etc
 */
const DEFAULT_CONFIG = {
  ALLOWED_TAGS: [
    "b",
    "i",
    "em",
    "strong",
    "a",
    "p",
    "br",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "pre",
  ],
  ALLOWED_ATTR: ["href", "title", "target", "rel"],
  KEEP_CONTENT: true,
};

/**
 * Configuração permissiva para campos de descrição/conteúdo
 * Permite mais tags mas mantém proteção contra XSS
 */
const RICH_TEXT_CONFIG = {
  ALLOWED_TAGS: [
    "b",
    "i",
    "em",
    "strong",
    "a",
    "p",
    "br",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "pre",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
  ],
  ALLOWED_ATTR: ["href", "title", "target", "rel"],
  KEEP_CONTENT: true,
};

/**
 * Sanitiza string HTML, removendo scripts e tags perigosas
 * @param html - HTML string a sanitizar
 * @param config - Configuração customizada (opcional)
 * @returns HTML seguro
 */
export function sanitizeHtml(
  html: string,
  config = DEFAULT_CONFIG
): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  return DOMPurify.sanitize(html, config);
}

/**
 * Sanitiza texto simples, removendo qualquer tag HTML
 * @param text - Texto a sanitizar
 * @returns Texto seguro sem HTML
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  return text
    .replace(/[<>]/g, "") // Remove < e >
    .trim();
}

/**
 * Sanitiza URL para evitar javascript: e data: URIs
 * @param url - URL a validar
 * @returns URL segura ou string vazia
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== "string") {
    return "";
  }

  try {
    // Tenta parsear a URL
    const parsed = new URL(url, window.location.href);

    // Bloqueia protocolos perigosos
    if (["javascript:", "data:", "vbscript:"].includes(parsed.protocol)) {
      return "";
    }

    return parsed.href;
  } catch {
    // Se não for URL válida, tenta como path relativo
    if (!url.startsWith("/") && !url.startsWith("?")) {
      return "";
    }

    return url;
  }
}

/**
 * Sanitiza email (simples validação + limpeza)
 * @param email - Email a sanitizar
 * @returns Email limpo ou string vazia
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== "string") {
    return "";
  }

  const cleaned = email.toLowerCase().trim();

  // Regex simples de validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(cleaned) ? cleaned : "";
}

/**
 * Sanitiza nome de usuário (remover caracteres especiais)
 * @param name - Nome a sanitizar
 * @param maxLength - Comprimento máximo (padrão 50)
 * @returns Nome sanitizado
 */
export function sanitizeName(name: string, maxLength = 50): string {
  if (!name || typeof name !== "string") {
    return "";
  }

  return name
    .trim()
    .substring(0, maxLength)
    .replace(/[<>]/g, ""); // Remove < e >
}

/**
 * Sanitiza conteúdo rico (markdown-like)
 * @param content - Conteúdo a sanitizar
 * @returns Conteúdo seguro com tags permitidas
 */
export function sanitizeRichText(content: string): string {
  if (!content || typeof content !== "string") {
    return "";
  }

  return DOMPurify.sanitize(content, RICH_TEXT_CONFIG);
}

/**
 * Sanitiza múltiplos campos de um objeto
 * Útil para sanitizar dados de formulário antes de enviar
 * @param data - Objeto com dados
 * @param fields - Mapa de campo -> tipo de sanitização
 * @returns Objeto com campos sanitizados
 */
export function sanitizeObject<T extends Record<string, any>>(
  data: T,
  fields: Record<keyof T, "text" | "html" | "email" | "url" | "name">
): Partial<T> {
  const sanitized: Partial<T> = {};

  for (const field in fields) {
    const type = fields[field];
    const value = data[field];

    if (value === undefined || value === null) {
      continue;
    }

    switch (type) {
      case "text":
        sanitized[field] = sanitizeText(String(value)) as T[Extract<keyof T, string>];
        break;
      case "html":
        sanitized[field] = sanitizeHtml(String(value)) as T[Extract<keyof T, string>];
        break;
      case "email":
        sanitized[field] = sanitizeEmail(String(value)) as T[Extract<keyof T, string>];
        break;
      case "url":
        sanitized[field] = sanitizeUrl(String(value)) as T[Extract<keyof T, string>];
        break;
      case "name":
        sanitized[field] = sanitizeName(String(value)) as T[Extract<keyof T, string>];
        break;
    }
  }

  return sanitized;
}

/**
 * Detecta conteúdo potencialmente malicioso
 * @param text - Texto a verificar
 * @returns true se contém conteúdo suspeito
 */
export function containsSuspiciousContent(text: string): boolean {
  if (!text || typeof text !== "string") {
    return false;
  }

  const suspiciousPatterns = [
    /<script/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick=, onerror=, etc
    /eval\(/gi,
    /expression\s*\(/gi,
    /vbscript:/gi,
    /data:text\/html/gi,
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(text));
}
