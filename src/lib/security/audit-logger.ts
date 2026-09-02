/**
 * Sistema de Logging de Auditoria para rastreamento de ações sensíveis
 * Registra todas as operações críticas para segurança e compliance
 */

import { serverTimestamp } from "firebase/firestore";

export type AuditAction =
  | "user.login"
  | "user.logout"
  | "user.registration"
  | "user.password_reset"
  | "user.email_change"
  | "user.delete"
  | "admin.create"
  | "admin.delete"
  | "admin.role_change"
  | "admin.user_delete"
  | "admin.user_edit"
  | "admin.config_change"
  | "admin.staff_add"
  | "admin.staff_remove"
  | "data.export"
  | "data.import"
  | "payment.process"
  | "payment.refund"
  | "security.2fa_enable"
  | "security.2fa_disable"
  | "security.session_revoke"
  | "access.failed_login"
  | "access.suspicious_activity"
  | "access.permission_denied";

export type AuditSeverity = "info" | "warning" | "error" | "critical";

export interface AuditLogEntry {
  /** ID único da entrada */
  id?: string;

  /** Ação realizada */
  action: AuditAction;

  /** Usuário que realizou a ação */
  userId?: string;

  /** Email do usuário (para casos de login/registro) */
  userEmail?: string;

  /** IP de origem da requisição */
  ipAddress?: string;

  /** User Agent do navegador */
  userAgent?: string;

  /** Recurso afetado (ex: UID do usuário deletado, documento alterado) */
  resourceId?: string;

  /** Tipo de recurso */
  resourceType?: string;

  /** Dados anteriores (para auditoria de mudanças) */
  previousData?: Record<string, any>;

  /** Dados novos (após a ação) */
  newData?: Record<string, any>;

  /** Descrição da ação */
  description?: string;

  /** Severidade do evento */
  severity: AuditSeverity;

  /** Status (success, failed) */
  status: "success" | "failed";

  /** Mensagem de erro (se houver) */
  error?: string;

  /** Timestamp automático do servidor */
  timestamp?: any;

  /** Dados customizados */
  metadata?: Record<string, any>;
}

/**
 * Logger de auditoria em memória (para desenvolvimento)
 * Em produção, isso seria escrito direto em Firestore ou em banco de logs externo
 */
const auditLogs: AuditLogEntry[] = [];

/**
 * Registra um evento de auditoria
 * @param entry - Entrada de auditoria
 */
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  try {
    const logEntry: AuditLogEntry = {
      ...entry,
      timestamp: serverTimestamp(),
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    };

    // Armazenar em memória
    auditLogs.push(logEntry);

    // Em produção, enviar para Firestore ou banco de logs
    // await setDoc(doc(db, "auditLogs", logEntry.id!), logEntry);

    console.log(
      `[AUDIT] ${logEntry.action} - ${logEntry.userId || logEntry.userEmail || "unknown"} - Status: ${logEntry.status}`
    );

    // Log crítico para alertas em tempo real
    if (logEntry.severity === "critical") {
      console.error(`[SECURITY ALERT] ${logEntry.action}: ${logEntry.description}`);
      // Aqui você poderia enviar alertas via email, Slack, etc
    }
  } catch (error) {
    console.error("[AUDIT ERROR]", error);
  }
}

/**
 * Log de tentativa de login bem-sucedida
 */
export function logLoginSuccess(
  userId: string,
  email: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  return logAudit({
    action: "user.login",
    userId,
    userEmail: email,
    ipAddress,
    userAgent,
    description: `Usuário ${email} fez login com sucesso`,
    severity: "info",
    status: "success",
  });
}

/**
 * Log de tentativa de login falhada
 */
export function logLoginFailure(
  email: string,
  reason: string,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  return logAudit({
    action: "access.failed_login",
    userEmail: email,
    ipAddress,
    userAgent,
    description: `Falha na tentativa de login: ${reason}`,
    severity: "warning",
    status: "failed",
    error: reason,
  });
}

/**
 * Log de atividade suspeita
 */
export function logSuspiciousActivity(
  userId: string | undefined,
  activityType: string,
  details: string,
  ipAddress?: string,
  metadata?: Record<string, any>
): Promise<void> {
  return logAudit({
    action: "access.suspicious_activity",
    userId,
    ipAddress,
    description: `Atividade suspeita detectada: ${activityType}`,
    severity: "warning",
    status: "success",
    metadata: {
      activityType,
      details,
      ...metadata,
    },
  });
}

/**
 * Log de ação administrativa crítica
 */
export function logAdminAction(
  adminId: string,
  action: AuditAction,
  resourceId: string,
  resourceType: string,
  previousData?: Record<string, any>,
  newData?: Record<string, any>
): Promise<void> {
  return logAudit({
    action,
    userId: adminId,
    resourceId,
    resourceType,
    previousData,
    newData,
    description: `Admin executou ação: ${action} em ${resourceType}/${resourceId}`,
    severity: action.includes("delete") ? "critical" : "info",
    status: "success",
  });
}

/**
 * Log de acesso negado
 */
export function logAccessDenied(
  userId: string | undefined,
  attemptedAction: string,
  reason: string,
  ipAddress?: string
): Promise<void> {
  return logAudit({
    action: "access.permission_denied",
    userId,
    ipAddress,
    description: `Acesso negado: usuário tentou ${attemptedAction}`,
    severity: "warning",
    status: "failed",
    error: reason,
  });
}

/**
 * Log de mudança de senha
 */
export function logPasswordChange(
  userId: string,
  email: string
): Promise<void> {
  return logAudit({
    action: "user.password_reset",
    userId,
    userEmail: email,
    description: `Senha alterada para ${email}`,
    severity: "info",
    status: "success",
  });
}

/**
 * Log de deleção de conta
 */
export function logUserDeletion(
  adminId: string,
  deletedUserId: string,
  deletedEmail: string
): Promise<void> {
  return logAudit({
    action: "admin.user_delete",
    userId: adminId,
    resourceId: deletedUserId,
    resourceType: "user",
    userEmail: deletedEmail,
    description: `Admin deletou usuário ${deletedEmail} (${deletedUserId})`,
    severity: "critical",
    status: "success",
  });
}

/**
 * Log de mudança de permissões
 */
export function logRoleChange(
  adminId: string,
  targetUserId: string,
  previousRole: string,
  newRole: string
): Promise<void> {
  return logAudit({
    action: "admin.role_change",
    userId: adminId,
    resourceId: targetUserId,
    resourceType: "staff",
    previousData: { role: previousRole },
    newData: { role: newRole },
    description: `Role alterada: ${previousRole} -> ${newRole}`,
    severity: "warning",
    status: "success",
  });
}

/**
 * Recupera logs de auditoria (desenvolvimento apenas)
 */
export function getAuditLogs(
  filter?: {
    action?: AuditAction;
    userId?: string;
    severity?: AuditSeverity;
    limit?: number;
  }
): AuditLogEntry[] {
  let logs = [...auditLogs];

  if (filter?.action) {
    logs = logs.filter((log) => log.action === filter.action);
  }

  if (filter?.userId) {
    logs = logs.filter((log) => log.userId === filter.userId);
  }

  if (filter?.severity) {
    logs = logs.filter((log) => log.severity === filter.severity);
  }

  const limit = filter?.limit || 100;
  return logs.slice(-limit);
}

/**
 * Limpa logs antigos (manutenção)
 * Em produção, usar política de retenção do Firestore
 */
export function cleanupOldLogs(daysToKeep = 30): number {
  const cutoffDate = Date.now() - daysToKeep * 24 * 60 * 60 * 1000;
  const initialLength = auditLogs.length;

  // Nota: timestamp é um valor do Firebase, então esta lógica é simplificada
  // Em produção, seria implementada no Firestore

  console.log(
    `[AUDIT CLEANUP] Mantendo logs dos últimos ${daysToKeep} dias`
  );

  return initialLength - auditLogs.length;
}
