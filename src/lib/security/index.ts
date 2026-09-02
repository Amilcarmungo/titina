/**
 * Central de Segurança - Exports de todos os utilitários
 * Import de aqui para facilitar uso em todo o projeto
 */

// Rate Limiting
export {
  checkRateLimit,
  getRateLimitReset,
  resetRateLimit,
  cleanupExpiredLimits,
  RATE_LIMIT_PRESETS,
  type RateLimitConfig,
} from "./rate-limiter";

// Sanitização
export {
  sanitizeHtml,
  sanitizeText,
  sanitizeUrl,
  sanitizeEmail,
  sanitizeName,
  sanitizeRichText,
  sanitizeObject,
  containsSuspiciousContent,
} from "./sanitizer";

// Logging de Auditoria
export {
  logAudit,
  logLoginSuccess,
  logLoginFailure,
  logSuspiciousActivity,
  logAdminAction,
  logAccessDenied,
  logPasswordChange,
  logUserDeletion,
  logRoleChange,
  getAuditLogs,
  cleanupOldLogs,
  type AuditAction,
  type AuditSeverity,
  type AuditLogEntry,
} from "./audit-logger";

// Security Headers
export {
  getSecurityHeaders,
  getCorsHeaders,
  getPreflightHeaders,
  getApiSecurityHeaders,
  SecurityHeadersManager,
  createSecurityHeadersMiddleware,
} from "./security-headers";

/**
 * Quick Start Guide
 *
 * 1. RATE LIMITING:
 *    import { checkRateLimit, RATE_LIMIT_PRESETS } from "~/lib/security";
 *    if (!checkRateLimit(userId, RATE_LIMIT_PRESETS.LOGIN)) {
 *      throw new Error("Too many attempts");
 *    }
 *
 * 2. SANITIZAÇÃO:
 *    import { sanitizeText, sanitizeEmail } from "~/lib/security";
 *    const safe = sanitizeText(userInput);
 *    const email = sanitizeEmail(userEmail);
 *
 * 3. AUDITORIA:
 *    import { logLoginSuccess, logAdminAction } from "~/lib/security";
 *    await logLoginSuccess(userId, email);
 *    await logAdminAction(adminId, "admin.delete", resourceId);
 *
 * 4. HEADERS (automático em server.ts):
 *    Headers de segurança já aplicados a todas as respostas!
 */
