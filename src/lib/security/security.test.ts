/**
 * Testes dos Utilitários de Segurança
 * Execute com: npm test -- security.test.ts
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  sanitizeText,
  sanitizeEmail,
  sanitizeUrl,
  sanitizeName,
  containsSuspiciousContent,
  sanitizeObject,
} from "~/lib/security/sanitizer";
import {
  checkRateLimit,
  resetRateLimit,
  RATE_LIMIT_PRESETS,
} from "~/lib/security/rate-limiter";

// =============================================================================
// TESTES DE SANITIZAÇÃO
// =============================================================================

describe("Sanitizer Tests", () => {
  describe("sanitizeText", () => {
    it("deve remover tags HTML", () => {
      const input = "<script>alert('xss')</script>Hello";
      const result = sanitizeText(input);
      expect(result).not.toContain("<");
      expect(result).toContain("Hello");
    });

    it("deve remover caracteres especiais perigosos", () => {
      const input = "Hello<img src=x>World";
      const result = sanitizeText(input);
      expect(result).not.toContain("<");
      expect(result).not.toContain(">");
    });

    it("deve retornar string vazia para null/undefined", () => {
      expect(sanitizeText(null as any)).toBe("");
      expect(sanitizeText(undefined as any)).toBe("");
    });

    it("deve fazer trim de espaços", () => {
      const input = "  Hello World  ";
      const result = sanitizeText(input);
      expect(result).toBe("Hello World");
    });
  });

  describe("sanitizeEmail", () => {
    it("deve validar email correto", () => {
      const input = "USER@EXAMPLE.COM";
      const result = sanitizeEmail(input);
      expect(result).toBe("user@example.com");
    });

    it("deve rejeitar email inválido", () => {
      expect(sanitizeEmail("invalid.email")).toBe("");
      expect(sanitizeEmail("@example.com")).toBe("");
      expect(sanitizeEmail("user@")).toBe("");
    });

    it("deve fazer lowercase e trim", () => {
      const input = "  USER@EXAMPLE.COM  ";
      const result = sanitizeEmail(input);
      expect(result).toBe("user@example.com");
    });
  });

  describe("sanitizeUrl", () => {
    it("deve permitir URLs seguras", () => {
      const url = "https://example.com/page";
      const result = sanitizeUrl(url);
      expect(result).toContain("example.com");
    });

    it("deve bloquear javascript: URLs", () => {
      const url = "javascript:alert('xss')";
      const result = sanitizeUrl(url);
      expect(result).toBe("");
    });

    it("deve bloquear data: URLs", () => {
      const url = "data:text/html,<script>alert('xss')</script>";
      const result = sanitizeUrl(url);
      expect(result).toBe("");
    });

    it("deve permitir URLs relativas", () => {
      const url = "/page/example";
      const result = sanitizeUrl(url);
      expect(result).toBe("/page/example");
    });
  });

  describe("sanitizeName", () => {
    it("deve limitar comprimento", () => {
      const input = "a".repeat(100);
      const result = sanitizeName(input, 50);
      expect(result.length).toBeLessThanOrEqual(50);
    });

    it("deve remover tags HTML", () => {
      const input = "John<script>Doe";
      const result = sanitizeName(input);
      expect(result).not.toContain("<");
      expect(result).not.toContain(">");
    });

    it("deve fazer trim", () => {
      const input = "  John Doe  ";
      const result = sanitizeName(input);
      expect(result).toBe("John Doe");
    });
  });

  describe("containsSuspiciousContent", () => {
    it("deve detectar <script> tags", () => {
      expect(containsSuspiciousContent("<script>alert('xss')</script>")).toBe(
        true
      );
    });

    it("deve detectar javascript: protocol", () => {
      expect(containsSuspiciousContent("click <a href='javascript:void(0)'></a>")).toBe(
        true
      );
    });

    it("deve detectar event handlers", () => {
      expect(
        containsSuspiciousContent("<img src=x onerror='alert(1)'>")
      ).toBe(true);
    });

    it("deve permitir conteúdo seguro", () => {
      expect(
        containsSuspiciousContent("Hello world, this is safe content")
      ).toBe(false);
    });
  });

  describe("sanitizeObject", () => {
    it("deve sanitizar múltiplos campos", () => {
      const input = {
        email: "USER@EXAMPLE.COM",
        name: "  John Doe  ",
        bio: "<script>alert('xss')</script>",
      };

      const result = sanitizeObject(input, {
        email: "email",
        name: "name",
        bio: "text",
      });

      expect(result.email).toBe("user@example.com");
      expect(result.name).toBe("John Doe");
      expect(result.bio).not.toContain("<script>");
    });
  });
});

// =============================================================================
// TESTES DE RATE LIMITING
// =============================================================================

describe("Rate Limiter Tests", () => {
  beforeEach(() => {
    // Limpar rate limits antes de cada teste
    resetRateLimit("test-user");
    resetRateLimit("test-ip");
  });

  describe("checkRateLimit", () => {
    it("deve permitir solicitações dentro do limite", () => {
      const result = checkRateLimit("test-user", {
        maxAttempts: 5,
        windowSeconds: 60,
      });
      expect(result).toBe(true);
    });

    it("deve rejeitar após exceder limite", () => {
      const config = { maxAttempts: 2, windowSeconds: 60 };

      expect(checkRateLimit("test-user", config)).toBe(true); // 1ª tentativa
      expect(checkRateLimit("test-user", config)).toBe(true); // 2ª tentativa
      expect(checkRateLimit("test-user", config)).toBe(false); // 3ª tentativa (excede)
    });

    it("deve criar nova entrada se não existir", () => {
      const result = checkRateLimit("new-user", {
        maxAttempts: 5,
        windowSeconds: 60,
      });
      expect(result).toBe(true);
    });

    it("deve usar presets corretamente", () => {
      expect(
        checkRateLimit("test-user", RATE_LIMIT_PRESETS.LOGIN)
      ).toBe(true);

      // Fazer 5 tentativas (máximo permitido)
      for (let i = 1; i < RATE_LIMIT_PRESETS.LOGIN.maxAttempts; i++) {
        checkRateLimit("test-user", RATE_LIMIT_PRESETS.LOGIN);
      }

      // 6ª tentativa deve falhar
      expect(
        checkRateLimit("test-user", RATE_LIMIT_PRESETS.LOGIN)
      ).toBe(false);
    });
  });
});

// =============================================================================
// TESTES DE INTEGRAÇÃO
// =============================================================================

describe("Security Integration Tests", () => {
  it("deve sanitizar e validar email de login", () => {
    const userInput = "  USER@EXAMPLE.COM  <script>";
    const sanitized = sanitizeEmail(userInput);

    expect(sanitized).toBe("user@example.com");
    expect(sanitized).not.toContain("<");
  });

  it("deve combinar rate limit com sanitização", () => {
    const email = sanitizeEmail("attacker@example.com");
    const config = RATE_LIMIT_PRESETS.LOGIN;

    // Primeira tentativa permitida
    expect(checkRateLimit(`login:${email}`, config)).toBe(true);

    // Simular múltiplas tentativas
    for (let i = 1; i < config.maxAttempts; i++) {
      checkRateLimit(`login:${email}`, config);
    }

    // Deve rejeitar após exceder
    expect(checkRateLimit(`login:${email}`, config)).toBe(false);
  });

  it("deve detectar e bloquear XSS em review", () => {
    const maliciousReview =
      'Great product! <script>fetch("https://attacker.com")</script>';

    if (containsSuspiciousContent(maliciousReview)) {
      const safe = sanitizeText(maliciousReview);
      expect(safe).not.toContain("<script>");
    }
  });
});
