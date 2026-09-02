/**
 * Utilitários de Headers de Segurança HTTP
 * Implementa as melhores práticas de OWASP para proteção
 */

/**
 * Headers de segurança recomendados
 * Retorna um objeto com headers que devem ser adicionados a cada resposta
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    // Previne ataques de Clickjacking
    "X-Frame-Options": "DENY",

    // Previne MIME type sniffing
    "X-Content-Type-Options": "nosniff",

    // Ativa proteção XSS no navegador
    "X-XSS-Protection": "1; mode=block",

    // Content Security Policy - previne inline scripts e XSS
    "Content-Security-Policy":
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " + // DOMPurify
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data: https:; " +
      "connect-src 'self' https://identitytoolkit.googleapis.com https://*.firebaseio.com https://*.cloudfunctions.net; " +
      "frame-src 'none'; " +
      "object-src 'none'; " +
      "form-action 'self'; " +
      "base-uri 'self'; " +
      "upgrade-insecure-requests;",

    // Referrer Policy - controla informações do referrer
    "Referrer-Policy": "strict-origin-when-cross-origin",

    // Permissions Policy (antigo Feature Policy)
    "Permissions-Policy":
      "geolocation=(), " +
      "microphone=(), " +
      "camera=(), " +
      "payment=(), " +
      "usb=(), " +
      "magnetometer=(), " +
      "gyroscope=(), " +
      "accelerometer=()",

    // HSTS - força uso de HTTPS (comentado, ativar apenas em produção)
    // "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",

    // Desativa caching para páginas sensíveis
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  };
}

/**
 * Headers CORS seguros
 * Customize origin e métodos conforme necessário
 */
export function getCorsHeaders(allowedOrigins?: string[]): Record<string, string> {
  const origins = allowedOrigins || [
    "http://localhost:5173", // Desenvolvimento
    "http://localhost:3000", // Desenvolvimento alternativo
    process.env.VITE_APP_URL || "", // Produção
  ].filter(Boolean);

  return {
    "Access-Control-Allow-Origin": origins[0], // Em produção, validar e permitir múltiplas
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With, X-CSRF-Token",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400", // 24 horas
  };
}

/**
 * Headers para preflight requests (OPTIONS)
 */
export function getPreflightHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "86400",
    "Content-Length": "0",
  };
}

/**
 * Headers para APIs com autenticação
 */
export function getApiSecurityHeaders(): Record<string, string> {
  return {
    ...getSecurityHeaders(),
    "X-Content-Type-Options": "application/json",
    // Não cachear dados sensíveis
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  };
}

/**
 * Classe auxiliar para gerenciar headers em respostas
 */
export class SecurityHeadersManager {
  private headers: Record<string, string> = {};

  constructor(includeDefaults = true) {
    if (includeDefaults) {
      this.headers = { ...getSecurityHeaders() };
    }
  }

  /**
   * Adiciona um header customizado
   */
  addHeader(name: string, value: string): this {
    this.headers[name] = value;
    return this;
  }

  /**
   * Remove um header
   */
  removeHeader(name: string): this {
    delete this.headers[name];
    return this;
  }

  /**
   * Adiciona headers CORS
   */
  addCorsHeaders(allowedOrigins?: string[]): this {
    const corsHeaders = getCorsHeaders(allowedOrigins);
    this.headers = { ...this.headers, ...corsHeaders };
    return this;
  }

  /**
   * Define CSP customizado
   */
  setCustomCsp(
    scriptSrc?: string[],
    styleSrc?: string[],
    imgSrc?: string[]
  ): this {
    const cspParts = [
      `default-src 'self'`,
      `script-src 'self' ${scriptSrc?.join(" ") || ""}`,
      `style-src 'self' ${styleSrc?.join(" ") || ""}`,
      `img-src 'self' data: https: ${imgSrc?.join(" ") || ""}`,
      `font-src 'self' data:`,
      `connect-src 'self' https:`,
      `frame-src 'none'`,
      `object-src 'none'`,
    ];

    this.headers["Content-Security-Policy"] = cspParts.join("; ");
    return this;
  }

  /**
   * Retorna todos os headers
   */
  getHeaders(): Record<string, string> {
    return { ...this.headers };
  }
}

/**
 * Middleware para aplicar headers de segurança
 * Compatível com TanStack Start / Nitro
 */
export function createSecurityHeadersMiddleware(
  options?: {
    corsOrigins?: string[];
    enableHsts?: boolean;
  }
) {
  return (event: any) => {
    const headers = new SecurityHeadersManager();

    if (options?.corsOrigins) {
      headers.addCorsHeaders(options.corsOrigins);
    }

    if (options?.enableHsts) {
      headers.addHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains; preload"
      );
    }

    // Aplicar headers à resposta
    const allHeaders = headers.getHeaders();
    for (const [name, value] of Object.entries(allHeaders)) {
      event.node.res.setHeader(name, value);
    }
  };
}
