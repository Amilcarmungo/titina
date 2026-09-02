/**
 * Exemplo de Server Functions com Rate Limiting e Auditoria
 * Implementa proteção de segurança em operações críticas
 */

import { createServerFn } from "@tanstack/react-start/server";
import { checkRateLimit, RATE_LIMIT_PRESETS } from "~/lib/security/rate-limiter";
import { logAudit, logLoginFailure, logAccessDenied } from "~/lib/security/audit-logger";
import { sanitizeEmail, sanitizeName } from "~/lib/security/sanitizer";

/**
 * Verifica rate limit e lança erro se excedido
 */
function enforceRateLimit(identifier: string, config: typeof RATE_LIMIT_PRESETS[keyof typeof RATE_LIMIT_PRESETS]) {
  if (!checkRateLimit(identifier, config)) {
    throw new Error(`Rate limit exceeded: ${config.message}`);
  }
}

/**
 * Extrai IP do cliente da requisição
 * Funciona com proxies e load balancers
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  
  return (
    (headers.get("cf-connecting-ip") as string) || // Cloudflare
    (headers.get("x-forwarded-for") as string)?.split(",")[0] || // Proxies
    (headers.get("x-real-ip") as string) || // Nginx
    "unknown"
  ).trim();
}

/**
 * Extrai User Agent da requisição
 */
export function getUserAgent(request: Request): string {
  return request.headers.get("user-agent") || "unknown";
}

/**
 * Server Function: Validação de Email com Rate Limiting
 * Exemplo de como proteger endpoints críticos
 */
export const validateEmailServer = createServerFn({
  method: "POST",
})
  .addMiddleware(async (middleware) => {
    return middleware.next();
  })
  .handler(async (data: { email: string }, { request }) => {
    try {
      // Sanitizar email
      const email = sanitizeEmail(data.email);
      
      if (!email) {
        throw new Error("Email inválido");
      }

      // Rate limiting: máximo 3 tentativas por 5 minutos
      const clientIp = getClientIp(request);
      enforceRateLimit(
        `email-verify:${clientIp}`,
        RATE_LIMIT_PRESETS.EMAIL_VERIFICATION
      );

      // Log de tentativa
      await logAudit({
        action: "user.registration",
        userEmail: email,
        ipAddress: clientIp,
        description: `Validação de email iniciada: ${email}`,
        severity: "info",
        status: "success",
      });

      // Aqui você enviaria o código de verificação
      return { success: true, message: "Código de verificação enviado" };
    } catch (error) {
      const clientIp = getClientIp(request);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

      await logAudit({
        action: "access.failed_login",
        userEmail: data.email,
        ipAddress: clientIp,
        description: `Falha na validação de email`,
        severity: "warning",
        status: "failed",
        error: errorMessage,
      });

      throw error;
    }
  });

/**
 * Server Function: Login com Rate Limiting e Auditoria
 */
export const loginServer = createServerFn({
  method: "POST",
})
  .handler(async (
    data: { email: string; password: string },
    { request }
  ) => {
    try {
      const email = sanitizeEmail(data.email);
      const clientIp = getClientIp(request);

      if (!email) {
        throw new Error("Email inválido");
      }

      // Rate limiting: máximo 5 tentativas por 15 minutos
      enforceRateLimit(
        `login:${clientIp}`,
        RATE_LIMIT_PRESETS.LOGIN
      );

      // Também rate limit por email (mais restritivo)
      enforceRateLimit(
        `login:email:${email}`,
        RATE_LIMIT_PRESETS.LOGIN
      );

      // Aqui você validaria as credenciais com Firebase
      // const user = await authenticateUser(email, data.password);

      // Se falhar:
      throw new Error("Credenciais inválidas");
    } catch (error) {
      const clientIp = getClientIp(request);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

      await logLoginFailure(
        data.email,
        errorMessage,
        clientIp,
        getUserAgent(request)
      );

      throw error;
    }
  });

/**
 * Server Function: Deletar Usuário (Admin)
 * Operação crítica com auditoria completa
 */
export const deleteUserServer = createServerFn({
  method: "POST",
})
  .handler(async (
    data: { userId: string; adminId: string },
    { request }
  ) => {
    try {
      const clientIp = getClientIp(request);

      // Verificar permissões do admin (isso deveria vir do Firebase Auth)
      // const adminPermissions = await checkAdminPermissions(data.adminId);
      // if (!adminPermissions.canDeleteUsers) {
      //   throw new Error("Sem permissão para deletar usuários");
      // }

      // Rate limiting para operações críticas
      enforceRateLimit(
        `admin-action:${data.adminId}`,
        RATE_LIMIT_PRESETS.API_CRITICAL
      );

      // Aqui você deletaria o usuário do Firestore
      // await deleteDoc(doc(db, "users", data.userId));

      // Log de auditoria crítica
      await logAudit({
        action: "admin.user_delete",
        userId: data.adminId,
        resourceId: data.userId,
        resourceType: "user",
        ipAddress: clientIp,
        description: `Usuário ${data.userId} deletado por admin ${data.adminId}`,
        severity: "critical",
        status: "success",
      });

      return { success: true, message: "Usuário deletado com sucesso" };
    } catch (error) {
      const clientIp = getClientIp(request);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

      await logAudit({
        action: "access.permission_denied",
        userId: data.adminId,
        ipAddress: clientIp,
        description: `Falha na tentativa de deletar usuário ${data.userId}`,
        severity: "warning",
        status: "failed",
        error: errorMessage,
      });

      throw error;
    }
  });

/**
 * Server Function: Criar/Editar Produto com Sanitização
 */
export const saveProductServer = createServerFn({
  method: "POST",
})
  .handler(async (
    data: {
      id?: string;
      name: string;
      description: string;
      adminId: string;
    },
    { request }
  ) => {
    try {
      // Sanitizar entradas
      const sanitized = {
        name: sanitizeName(data.name),
        description: sanitizeName(data.description), // ou sanitizeRichText se permitir HTML
      };

      if (!sanitized.name) {
        throw new Error("Nome do produto inválido");
      }

      // Rate limiting para uploads
      const clientIp = getClientIp(request);
      enforceRateLimit(
        `product-upload:${data.adminId}`,
        RATE_LIMIT_PRESETS.API_GENERAL
      );

      // Aqui você salvaria no Firestore
      // const docRef = await setDoc(doc(db, "products", data.id || newId()), sanitized);

      await logAudit({
        action: "admin.config_change",
        userId: data.adminId,
        resourceId: data.id || "new",
        resourceType: "product",
        newData: sanitized,
        ipAddress: clientIp,
        description: `Produto ${data.id ? "atualizado" : "criado"}`,
        severity: "info",
        status: "success",
      });

      return { success: true, id: data.id || "new-id" };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      throw error;
    }
  });

/**
 * Exemplo de uso em componentes React:
 *
 * ```tsx
 * import { validateEmailServer } from "~/server/security-examples.server";
 *
 * export function LoginForm() {
 *   const mutation = useMutation({
 *     mutationFn: async (email: string) => {
 *       return await validateEmailServer({ email });
 *     },
 *     onError: (error) => {
 *       // Rate limit excedido?
 *       if (error.message.includes("Rate limit")) {
 *         toast.error("Muitas tentativas. Tente novamente mais tarde.");
 *       }
 *     },
 *   });
 *
 *   return (
 *     <form onSubmit={(e) => {
 *       e.preventDefault();
 *       mutation.mutate(email);
 *     }}>
 *       {/* ... */}
 *     </form>
 *   );
 * }
 * ```
 */
