/**
 * Cache local do endereço de entrega.
 *
 * Guarda o último endereço usado no dispositivo para que, numa nova compra, o
 * checkout apareça já preenchido (mesmo antes do Firestore responder). O
 * utilizador pode sempre editar ou adicionar outro endereço.
 */
const KEY = "bx_address_cache_v1";

export type CachedAddress = {
  name: string; phone: string; countryCode: string;
  street: string; complement: string; state: string; city: string; cep: string;
  isDefault: boolean;
};

export function readCachedAddress(uid?: string | null): CachedAddress | null {
  if (typeof window === "undefined") return null;
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || "{}") as Record<string, CachedAddress>;
    return all[uid || "anon"] ?? null;
  } catch {
    return null;
  }
}

export function writeCachedAddress(uid: string | null | undefined, address: CachedAddress) {
  if (typeof window === "undefined") return;
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || "{}") as Record<string, CachedAddress>;
    all[uid || "anon"] = address;
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch { /* quota */ }
}

export const emptyAddress: CachedAddress = {
  name: "", phone: "", countryCode: "+244",
  street: "", complement: "", state: "", city: "", cep: "",
  isDefault: true,
};
