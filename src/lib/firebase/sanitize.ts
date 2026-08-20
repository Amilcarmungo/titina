/**
 * O Firestore rejeita `undefined` em qualquer campo (`Unsupported field value: undefined`).
 * Antes de gravar, removemos recursivamente todas as chaves com valor `undefined`.
 */
export function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .filter((v) => v !== undefined)
      .map((v) => stripUndefined(v)) as unknown as T;
  }
  if (
    value &&
    typeof value === "object" &&
    Object.getPrototypeOf(value) === Object.prototype
  ) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === undefined) continue;
      out[k] = stripUndefined(v);
    }
    return out as T;
  }
  return value;
}
