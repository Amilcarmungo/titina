/**
 * Sistema de Rate Limiting para proteção contra brute force e abuse
 * Implementação em memória para desenvolvimento, adaptável para Redis em produção
 */

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  /** Número máximo de tentativas permitidas */
  maxAttempts: number;
  /** Janela de tempo em segundos */
  windowSeconds: number;
  /** Mensagem de erro customizada */
  message?: string;
}

/**
 * Verifica se um identificador excedeu o rate limit
 * @param identifier - Chave única (IP, UID, email, etc)
 * @param config - Configuração do rate limit
 * @returns true se dentro do limite, false se excedeu
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): boolean {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  if (!store[key]) {
    store[key] = { count: 1, resetTime: now + config.windowSeconds * 1000 };
    return true;
  }

  const entry = store[key];

  // Se a janela de tempo expirou, resetar
  if (now >= entry.resetTime) {
    store[key] = { count: 1, resetTime: now + config.windowSeconds * 1000 };
    return true;
  }

  // Incrementar contador
  entry.count++;

  // Verificar se excedeu o limite
  if (entry.count > config.maxAttempts) {
    return false;
  }

  return true;
}

/**
 * Retorna o tempo restante até o reset do rate limit (em segundos)
 */
export function getRateLimitReset(identifier: string): number {
  const key = `ratelimit:${identifier}`;
  if (!store[key]) return 0;

  const now = Date.now();
  const resetTime = store[key].resetTime;
  const remaining = Math.ceil((resetTime - now) / 1000);

  return Math.max(0, remaining);
}

/**
 * Reseta manualmente um rate limit (útil para limpeza ou testes)
 */
export function resetRateLimit(identifier: string): void {
  const key = `ratelimit:${identifier}`;
  delete store[key];
}

/**
 * Limpa rate limits expirados (executar periodicamente em produção)
 */
export function cleanupExpiredLimits(): void {
  const now = Date.now();
  let cleaned = 0;

  for (const key in store) {
    if (store[key].resetTime <= now) {
      delete store[key];
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`[Rate Limiter] Limpeza: ${cleaned} entradas expiradas removidas`);
  }
}

/**
 * Configurações predefinidas comuns
 */
export const RATE_LIMIT_PRESETS = {
  /** Máximo 5 tentativas de login a cada 15 minutos */
  LOGIN: {
    maxAttempts: 5,
    windowSeconds: 900, // 15 minutos
    message: "Muitas tentativas de login. Tente novamente em 15 minutos.",
  },

  /** Máximo 3 tentativas de verificação de email a cada 5 minutos */
  EMAIL_VERIFICATION: {
    maxAttempts: 3,
    windowSeconds: 300, // 5 minutos
    message: "Muitas tentativas de verificação. Tente novamente em 5 minutos.",
  },

  /** Máximo 10 requisições por minuto para APIs gerais */
  API_GENERAL: {
    maxAttempts: 10,
    windowSeconds: 60, // 1 minuto
    message: "Limite de requisições excedido. Tente novamente mais tarde.",
  },

  /** Máximo 3 requisições por minuto para operações críticas */
  API_CRITICAL: {
    maxAttempts: 3,
    windowSeconds: 60, // 1 minuto
    message: "Limite de requisições críticas excedido. Tente novamente mais tarde.",
  },

  /** Máximo 50 requisições por 10 minutos para downloads */
  DOWNLOAD: {
    maxAttempts: 50,
    windowSeconds: 600, // 10 minutos
    message: "Limite de downloads excedido. Tente novamente mais tarde.",
  },
};

// Limpeza periódica em background (a cada 5 minutos)
if (typeof setInterval !== "undefined") {
  setInterval(cleanupExpiredLimits, 5 * 60 * 1000);
}
