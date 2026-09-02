# Guia de Implementação de Segurança - Bazarixy

## 📋 Resumo das Implementações

Este documento descreve como integrar as novas camadas de segurança no projeto existente.

---

## 1️⃣ Rate Limiting

### Arquivo: `src/lib/security/rate-limiter.ts`

#### Uso em Server Functions:

```typescript
import { checkRateLimit, RATE_LIMIT_PRESETS } from "~/lib/security/rate-limiter";

// Em uma server function:
export const myProtectedEndpoint = createServerFn({
  method: "POST",
}).handler(async (data, { request }) => {
  const clientIp = request.headers.get("cf-connecting-ip") || "unknown";
  
  // Verificar rate limit
  if (!checkRateLimit(clientIp, RATE_LIMIT_PRESETS.LOGIN)) {
    throw new Error("Muitas tentativas. Tente novamente mais tarde.");
  }

  // ... resto da lógica
});
```

#### Presets Disponíveis:

- `RATE_LIMIT_PRESETS.LOGIN` - 5 tentativas por 15 minutos
- `RATE_LIMIT_PRESETS.EMAIL_VERIFICATION` - 3 tentativas por 5 minutos
- `RATE_LIMIT_PRESETS.API_GENERAL` - 10 requisições por minuto
- `RATE_LIMIT_PRESETS.API_CRITICAL` - 3 requisições por minuto
- `RATE_LIMIT_PRESETS.DOWNLOAD` - 50 requisições por 10 minutos

---

## 2️⃣ Sanitização XSS

### Arquivo: `src/lib/security/sanitizer.ts`

#### Proteção de Campos Críticos:

```typescript
import { sanitizeText, sanitizeEmail, sanitizeUrl, sanitizeHtml } from "~/lib/security/sanitizer";

// Sanitizar email
const email = sanitizeEmail(userInput); // "user@example.com"

// Sanitizar nome (remove HTML tags)
const name = sanitizeName(userInput, 50); // max 50 caracteres

// Sanitizar conteúdo HTML seguro
const description = sanitizeRichText(productDescription); // Permite <b>, <i>, <a>, etc

// Sanitizar múltiplos campos de uma vez
const formData = sanitizeObject(userFormData, {
  email: "email",
  name: "name",
  bio: "text",
  website: "url",
});
```

#### Aplicar em ProductCard (Reviews):

```typescript
import { sanitizeText, containsSuspiciousContent } from "~/lib/security/sanitizer";

// Em ProductCard.tsx ou componente de review:
const sanitizedReview = sanitizeText(review.text);
const sanitizedRating = sanitizeName(review.rating);

// Detectar conteúdo suspeito
if (containsSuspiciousContent(review.text)) {
  console.warn("Conteúdo suspeito detectado em review:", review.id);
  // Sinalizar para moderação
}
```

---

## 3️⃣ Logging de Auditoria

### Arquivo: `src/lib/security/audit-logger.ts`

#### Registrar Ações Críticas:

```typescript
import {
  logLoginSuccess,
  logLoginFailure,
  logAdminAction,
  logUserDeletion,
  logAccessDenied,
} from "~/lib/security/audit-logger";

// Login bem-sucedido
await logLoginSuccess(userId, email, ipAddress, userAgent);

// Login falhado
await logLoginFailure(email, "Senha incorreta", ipAddress, userAgent);

// Ação de admin
await logAdminAction(
  adminId,
  "admin.user_delete",
  userId,
  "user",
  oldData,
  newData
);

// Deletar usuário
await logUserDeletion(adminId, deletedUserId, deletedEmail);

// Acesso negado
await logAccessDenied(userId, "delete_product", "Sem permissão", ipAddress);
```

#### Integrar em Componentes Admin:

```typescript
// Em justina.usuarios.tsx ou justina.equipa.tsx
import { logAdminAction } from "~/lib/security/audit-logger";

async function handleDeleteUser(userId: string) {
  try {
    const snapshot = await getDoc(doc(db, "users", userId));
    const oldData = snapshot.data();

    // Deletar
    await deleteDoc(doc(db, "users", userId));

    // Registrar auditoria
    await logAdminAction(
      currentAdminId,
      "admin.user_delete",
      userId,
      "user",
      oldData,
      {}
    );
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
  }
}
```

---

## 4️⃣ Headers de Segurança

### Arquivo: `src/lib/security/security-headers.ts`

Já integrado em `src/server.ts`. Headers aplicados automaticamente a todas as respostas:

- ✅ **X-Frame-Options** - Previne Clickjacking
- ✅ **X-Content-Type-Options** - Previne MIME sniffing
- ✅ **X-XSS-Protection** - Proteção XSS do navegador
- ✅ **Content-Security-Policy** - Previne inline scripts e XSS
- ✅ **Referrer-Policy** - Controla envio de referrer
- ✅ **Permissions-Policy** - Desabilita APIs perigosas

Não requer ação adicional - funcionando automaticamente!

---

## 5️⃣ Passos de Implementação Imediatos

### A. Proteger Endpoints de Login

**Arquivo a modificar:** `src/routes/auth.tsx` ou server function de login

```typescript
import { checkRateLimit, RATE_LIMIT_PRESETS } from "~/lib/security/rate-limiter";
import { logLoginFailure, logLoginSuccess } from "~/lib/security/audit-logger";

export const loginAction = createServerFn({
  method: "POST",
}).handler(async (data: { email: string; password: string }, { request }) => {
  const clientIp = request.headers.get("cf-connecting-ip") || "unknown";

  // Sanitizar
  const email = sanitizeEmail(data.email);

  // Rate limit
  if (!checkRateLimit(`login:${clientIp}`, RATE_LIMIT_PRESETS.LOGIN)) {
    await logLoginFailure(email, "Rate limit excedido", clientIp);
    throw new Error("Muitas tentativas de login");
  }

  try {
    // Validar credenciais com Firebase
    // const user = await signInWithEmailAndPassword(auth, email, data.password);
    
    await logLoginSuccess(user.uid, email, clientIp);
    return { success: true, user };
  } catch (error) {
    await logLoginFailure(email, error.message, clientIp);
    throw error;
  }
});
```

### B. Sanitizar Campos de Produto e Review

**Arquivos a modificar:**
- `src/routes/justina.produtos.tsx`
- `src/components/ProductCard.tsx`
- Qualquer lugar que salve reviews

```typescript
import { sanitizeText, sanitizeRichText } from "~/lib/security/sanitizer";

// Antes de salvar no Firestore:
const product = {
  name: sanitizeName(formData.name),
  description: sanitizeRichText(formData.description),
  price: parseFloat(formData.price),
};

await setDoc(doc(db, "products", productId), product);
```

### C. Adicionar Logs de Auditoria em Operações Admin

**Arquivos a modificar:**
- `src/routes/justina.usuarios.tsx`
- `src/routes/justina.equipa.tsx`
- `src/routes/justina.produtos.tsx`

```typescript
import { logAdminAction, logUserDeletion } from "~/lib/security/audit-logger";

// Quando deletar usuário:
await logUserDeletion(currentAdminId, userToDeleteId, userEmail);

// Quando mudar role:
await logAdminAction(
  adminId,
  "admin.role_change",
  userId,
  "staff",
  { role: oldRole },
  { role: newRole }
);
```

---

## 6️⃣ Checklist de Segurança - Status Atual

### 1. Gestão de Segredos e Credenciais
- ✅ Nunca armazenar chaves de API no front-end
- ✅ Nunca expor tokens, senhas ou credenciais no código
- ✅ Utilizar variáveis de ambiente
- ✅ Restringir permissões das chaves de API

### 2. Arquitetura e Acesso a Dados
- ✅ Firestore Rules protegem acesso direto
- ✅ Implementar validações no servidor
- ⚠️ **TODO**: Mover operações Firestore direto do React para server functions

### 3. Proteção de Dados dos Usuários
- ✅ Exibir apenas informações necessárias
- ✅ Nunca expor senhas
- ✅ Dados sensíveis isolados por usuário
- ✅ **NOVO**: Sanitização XSS implementada

### 4. Validação e Sanitização de Entradas
- ✅ Validar dados recebidos do usuário
- ✅ **NOVO**: Sanitizar com DOMPurify
- ✅ Proteger contra SQL Injection (Firestore native)
- ✅ **NOVO**: Proteção XSS com sanitizer.ts
- ✅ Limitar tamanho dos dados
- ✅ Validar front-end e back-end (Firestore Rules)

### 5. Autenticação e Autorização
- ✅ Autenticação via Firebase Auth
- ✅ Verificar permissões em Firestore Rules
- ✅ AdminGate protege painel
- ✅ **NOVO**: Rate limiting em login

### 6. Monitoramento e Logs
- ⚠️ **NOVO**: Logging de auditoria implementado
- ✅ Error capturing com error-capture.ts
- ⚠️ **TODO**: Conectar auditoria a Firestore
- ⚠️ **TODO**: Alertas de comportamento suspeito

### 7. Proteção Contra Abusos
- ✅ **NOVO**: Rate limiting implementado
- ✅ **NOVO**: Rate limit para login (5 tentativas / 15 min)
- ✅ **NOVO**: Rate limit para email verification (3 tentativas / 5 min)
- ⚠️ **TODO**: CAPTCHA em login (opcional)
- ✅ **NOVO**: Bloqueio automático após rate limit

---

## 7️⃣ Próximos Passos (Médio Prazo)

1. **Conectar Auditoria a Firestore**
   ```typescript
   // Em audit-logger.ts, descomentar:
   await setDoc(doc(db, "auditLogs", logEntry.id!), logEntry);
   ```

2. **Implementar Alertas de Segurança**
   - Múltiplas tentativas falhadas
   - Acesso a áreas sensíveis
   - Deletções em massa

3. **Adicionar 2FA para Staff**
   ```typescript
   // Integrar TOTP ou autenticação por email
   import OtpAuth from "otpauth";
   ```

4. **Rate Limiting com Redis**
   - Para ambientes com múltiplas instâncias
   - Compartilhar estado entre servidores

5. **Sentry/Datadog Integration**
   ```typescript
   import * as Sentry from "@sentry/react";
   ```

---

## ⚠️ Notas Importantes

1. **Rate Limiter em Memória**: Adequado para desenvolvimento, mas em produção com múltiplas instâncias, usar Redis.

2. **Auditoria em Memória**: Logs atualmente em RAM. Para produção, descomentar integração com Firestore.

3. **CSP Headers**: Configurado permissivamente. Em produção, revisar e restringir URLs.

4. **HSTS**: Comentado por padrão. Ativar apenas em produção com HTTPS.

5. **Teste de Segurança**: Execute regularmente `npm run lint` e considere ferramentas como OWASP ZAP.

---

## 🔒 Referências

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [DOMPurify](https://github.com/cure53/DOMPurify)
