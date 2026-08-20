/**
 * Envio de imagens/ficheiros para o Firebase Storage.
 * Regra do projeto: guardamos SEMPRE a URL pública do Storage — nunca Base64
 * (data:...) no Firestore. Documentos com imagens embutidas estouram o limite
 * de 1 MB por documento e tornam a sincronização lenta.
 */
import { toast } from "sonner";

import { uploadFile } from "./storage";
import { getFirebaseAuth } from "./client";

const MAX_BYTES = 8 * 1024 * 1024;

function reason(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";
  if (code.includes("unauthenticated"))
    return "Entre na sua conta para enviar ficheiros.";
  if (code.includes("unauthorized") || code.includes("permission"))
    return "Sem permissão para enviar. Entre na sua conta e tente de novo.";
  if (code.includes("retry-limit") || code.includes("canceled"))
    return "A ligação falhou a meio do envio.";
  if (code.includes("quota"))
    return "O armazenamento está cheio. Fale com o suporte.";
  return "Verifique a ligação e tente de novo.";
}

/** Tenta o envio mais do que uma vez — falhas de rede são comuns em mobile. */
async function uploadWithRetry(
  path: string,
  file: File,
  attempts = 3,
  onProgress?: (percent: number) => void,
): Promise<string> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i += 1) {
    try {
      const url = await uploadFile(path, file, onProgress);
      if (url) return url;
      lastError = new Error("storage-unavailable");
    } catch (err) {
      lastError = err;
    }
    await new Promise((r) => setTimeout(r, 600 * (i + 1)));
  }
  throw lastError ?? new Error("upload-failed");
}

export async function uploadImageFile(
  file: File,
  path: string,
  options?: { silent?: boolean; onProgress?: (percent: number) => void },
): Promise<string | null> {
  if (!file.type.startsWith("image/")) {
    toast.error("Só são aceites imagens.");
    return null;
  }
  if (file.size > MAX_BYTES) {
    toast.error("Imagem muito grande (máx. 8 MB).");
    return null;
  }
  if (!getFirebaseAuth()?.currentUser) {
    toast.error("Entre na sua conta para enviar imagens.");
    return null;
  }
  const id = options?.silent ? undefined : toast.loading("A enviar imagem…");
  try {
    const url = await uploadWithRetry(path, file, 3, options?.onProgress);
    if (!options?.silent) toast.success("Imagem enviada", { id });
    return url;
  } catch (err) {
    if (!options?.silent)
      toast.error(`Não foi possível enviar a imagem. ${reason(err)}`, { id });
    return null;
  }
}

/** Comprovativos aceitam imagem ou PDF e vão sempre para o Storage. */
export async function uploadProofFile(
  file: File,
  path: string,
  onProgress?: (percent: number) => void,
): Promise<string | null> {
  const ok = file.type.startsWith("image/") || file.type === "application/pdf";
  if (!ok) {
    toast.error("Só é aceite imagem ou PDF.");
    return null;
  }
  if (file.size > MAX_BYTES) {
    toast.error("Ficheiro muito grande (máx. 8 MB).");
    return null;
  }
  if (!getFirebaseAuth()?.currentUser) {
    toast.error("Entre na sua conta para enviar o comprovativo.");
    return null;
  }

  const id = toast.loading("A preparar envio do comprovativo…");
  try {
    const url = await uploadWithRetry(path, file, 3, (percent) => {
      onProgress?.(percent);
      toast.loading(`A enviar comprovativo… ${percent}%`, { id });
    });
    toast.success("Comprovativo enviado", { id });
    return url;
  } catch (err) {
    toast.error(`Não foi possível enviar o comprovativo. ${reason(err)}`, {
      id,
    });
    return null;
  }
}
