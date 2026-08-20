import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

import { getFirebaseStorage } from "./client";

/**
 * Organização das pastas no bucket gs://bazarixymy.firebasestorage.app
 *   catalog/products/{productId}/…   fotos de produtos e variantes
 *   catalog/categories/{slug}/…      imagens de categorias e subcategorias
 *   catalog/shops/{shopId}/…         logo e capa das lojas
 *   content/banners/{tabId}/…        banners de cada aba da home
 *   content/payments/{methodId}/…    logos dos métodos de pagamento
 *   orders/{orderId}/proofs/…        comprovativos de pagamento
 *   users/{uid}/{folder}/…           ficheiros privados do utilizador
 */
function stamp(fileName: string) {
  const safe = fileName.replace(/[^\w.-]+/g, "_").slice(-60);
  return `${Date.now()}_${safe}`;
}

export const storagePaths = {
  product: (productId: string, fileName: string) =>
    `catalog/products/${productId}/${stamp(fileName)}`,
  category: (slug: string, fileName: string) =>
    `catalog/categories/${slug}/${stamp(fileName)}`,
  shop: (shopId: string, fileName: string) =>
    `catalog/shops/${shopId}/${stamp(fileName)}`,
  banner: (tabId: string, fileName: string) =>
    `content/banners/${tabId}/${stamp(fileName)}`,
  payment: (methodId: string, fileName: string) =>
    `content/payments/${methodId}/${stamp(fileName)}`,
  // Comprovativo fica na pasta do próprio utilizador: qualquer cliente logado
  // consegue enviar e ler o seu ficheiro (a equipa também lê).
  proof: (uid: string, orderId: string, fileName: string) =>
    `users/${uid}/proofs/${orderId}/${stamp(fileName)}`,
};

/** Envia um arquivo para o Storage e devolve a URL pública. */
export async function uploadFile(
  path: string,
  file: Blob | File,
  onProgress?: (percent: number) => void,
): Promise<string | null> {
  const storage = getFirebaseStorage();
  if (!storage) return null;
  const r = ref(storage, path);
  const task = uploadBytesResumable(r, file);
  await new Promise<void>((resolve, reject) => {
    task.on(
      "state_changed",
      (snapshot) => {
        onProgress?.(
          snapshot.totalBytes
            ? Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              )
            : 0,
        );
      },
      reject,
      resolve,
    );
  });
  return getDownloadURL(r);
}

export function userUploadPath(uid: string, folder: string, fileName: string) {
  return `users/${uid}/${folder}/${stamp(fileName)}`;
}

export async function removeFile(path: string) {
  const storage = getFirebaseStorage();
  if (!storage) return;
  await deleteObject(ref(storage, path)).catch(() => {});
}
