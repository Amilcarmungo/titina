/**
 * Exemplo de integração de sanitização em componentes existentes
 * Este arquivo demonstra como aplicar as melhorias de segurança
 */

// =============================================================================
// EXEMPLO 1: Sanitizar Reviews em ProductCard.tsx
// =============================================================================

/*
Antes (INSEGURO):
```tsx
export function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      {product.reviews?.map((review) => (
        <div key={review.id}>
          <p>{review.text}</p> {/* XSS vulnerability! */}
          <p>{review.rating}</p>
        </div>
      ))}
    </div>
  );
}
```

Depois (SEGURO):
*/

import { sanitizeText, containsSuspiciousContent } from "~/lib/security/sanitizer";

export function ProductCardSafe({ product }: { product: any }) {
  return (
    <div>
      <h2>{sanitizeText(product.name)}</h2>
      <p>{sanitizeText(product.description)}</p>
      {product.reviews?.map((review: any) => {
        // Detectar conteúdo suspeito
        if (containsSuspiciousContent(review.text)) {
          console.warn("Conteúdo suspeito em review:", review.id);
        }

        return (
          <div key={review.id}>
            <p>{sanitizeText(review.text)}</p>
            <p>{sanitizeText(review.rating)}</p>
          </div>
        );
      })}
    </div>
  );
}

// =============================================================================
// EXEMPLO 2: Proteger formulário de produto (justina.produtos.tsx)
// =============================================================================

/*
Antes (INSEGURO):
```tsx
async function saveProduct(formData: any) {
  await setDoc(doc(db, "products", productId), {
    name: formData.name, // Sem sanitização!
    description: formData.description,
    price: formData.price,
  });
}
```

Depois (SEGURO):
*/

import { sanitizeName, sanitizeRichText } from "~/lib/security/sanitizer";
import { logAdminAction } from "~/lib/security/audit-logger";

export async function saveProductSecure(
  formData: any,
  adminId: string,
  productId?: string
) {
  // Sanitizar entradas
  const sanitized = {
    name: sanitizeName(formData.name, 100),
    description: sanitizeRichText(formData.description),
    price: parseFloat(formData.price),
  };

  // Validar após sanitização
  if (!sanitized.name || sanitized.price <= 0) {
    throw new Error("Dados do produto inválidos");
  }

  // Obter dados antigos para auditoria
  let oldData = {};
  if (productId) {
    const doc = await getDoc(docRef(db, "products", productId));
    oldData = doc.data() || {};
  }

  // Salvar no Firestore
  const docId = productId || `product_${Date.now()}`;
  await setDoc(doc(db, "products", docId), sanitized);

  // Registrar em auditoria
  await logAdminAction(
    adminId,
    productId ? "admin.config_change" : "admin.config_change",
    docId,
    "product",
    oldData,
    sanitized
  );

  return { id: docId, ...sanitized };
}

// =============================================================================
// EXEMPLO 3: Proteger operações admin (justina.usuarios.tsx)
// =============================================================================

/*
Antes (INSEGURO):
```tsx
async function deleteUser(userId: string) {
  await deleteDoc(doc(db, "users", userId)); // Sem log!
}
```

Depois (SEGURO):
*/

import { logUserDeletion, logAccessDenied } from "~/lib/security/audit-logger";
import { checkRateLimit, RATE_LIMIT_PRESETS } from "~/lib/security/rate-limiter";

export async function deleteUserSecure(
  userId: string,
  adminId: string,
  clientIp: string
) {
  // Rate limiting para operações críticas
  if (!checkRateLimit(`admin:${adminId}`, RATE_LIMIT_PRESETS.API_CRITICAL)) {
    await logAccessDenied(
      adminId,
      "delete_user",
      "Rate limit excedido",
      clientIp
    );
    throw new Error("Muitas operações. Tente novamente mais tarde.");
  }

  try {
    // Obter dados do usuário antes de deletar (para auditoria)
    const userSnap = await getDoc(doc(db, "users", userId));
    const userData = userSnap.data();

    // Deletar usuário
    await deleteDoc(doc(db, "users", userId));

    // Registrar deleção
    await logUserDeletion(adminId, userId, userData?.email || "unknown");

    return { success: true };
  } catch (error) {
    await logAccessDenied(
      adminId,
      "delete_user",
      error instanceof Error ? error.message : "Erro desconhecido",
      clientIp
    );
    throw error;
  }
}

// =============================================================================
// EXEMPLO 4: Login com Rate Limiting (auth.tsx ou server function)
// =============================================================================

/*
Antes (INSEGURO):
```tsx
async function login(email: string, password: string) {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
}
```

Depois (SEGURO):
*/

import { sanitizeEmail } from "~/lib/security/sanitizer";
import {
  logLoginSuccess,
  logLoginFailure,
} from "~/lib/security/audit-logger";

export async function loginSecure(
  email: string,
  password: string,
  clientIp: string,
  userAgent: string
) {
  // Sanitizar email
  const sanitizedEmail = sanitizeEmail(email);
  if (!sanitizedEmail) {
    throw new Error("Email inválido");
  }

  // Rate limit por IP
  if (!checkRateLimit(`login:${clientIp}`, RATE_LIMIT_PRESETS.LOGIN)) {
    await logLoginFailure(
      sanitizedEmail,
      "Rate limit excedido",
      clientIp,
      userAgent
    );
    throw new Error(
      "Muitas tentativas de login. Tente novamente em 15 minutos."
    );
  }

  // Rate limit por email (mais restritivo)
  if (
    !checkRateLimit(
      `login:email:${sanitizedEmail}`,
      RATE_LIMIT_PRESETS.LOGIN
    )
  ) {
    await logLoginFailure(
      sanitizedEmail,
      "Rate limit por email excedido",
      clientIp,
      userAgent
    );
    throw new Error(
      "Muitas tentativas com este email. Tente novamente em 15 minutos."
    );
  }

  try {
    // Tentar login (Firebase Auth gerencia senhas)
    // const user = await signInWithEmailAndPassword(auth, sanitizedEmail, password);

    // Simular sucesso
    const user = { uid: "user123", email: sanitizedEmail };

    // Registrar login bem-sucedido
    await logLoginSuccess(user.uid, sanitizedEmail, clientIp, userAgent);

    return user;
  } catch (error) {
    // Registrar falha
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    await logLoginFailure(
      sanitizedEmail,
      errorMessage,
      clientIp,
      userAgent
    );
    throw error;
  }
}

// =============================================================================
// EXEMPLO 5: Sanitizar formulário genérico (qualquer component)
// =============================================================================

import { sanitizeObject } from "~/lib/security/sanitizer";

export async function handleFormSubmit(formData: any) {
  // Sanitizar todos os campos de uma vez
  const sanitized = sanitizeObject(formData, {
    email: "email",
    name: "name",
    description: "text",
    website: "url",
    phone: "text",
  });

  // Agora os dados estão seguros
  console.log("Dados sanitizados:", sanitized);

  // Enviar ao servidor
  // await submitForm(sanitized);
}

// =============================================================================
// EXEMPLO 6: Usar em Hook de Validação
// =============================================================================

import { useCallback } from "react";
import { containsSuspiciousContent } from "~/lib/security/sanitizer";

export function useSecureInput() {
  const validateInput = useCallback((value: string): boolean => {
    // Detectar padrões suspeitos
    if (containsSuspiciousContent(value)) {
      console.warn("Input contém conteúdo suspeito");
      return false;
    }

    return true;
  }, []);

  return { validateInput };
}

// Uso em componente:
export function SecureInput() {
  const { validateInput } = useSecureInput();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validateInput(e.target.value)) {
      e.target.value = ""; // Limpar input
      alert("Conteúdo suspeito detectado");
    }
  };

  return <input onChange={handleChange} />;
}
