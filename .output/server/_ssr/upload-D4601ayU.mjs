import "../_libs/firebase.mjs";
import { i as uploadBytesResumable, r as ref, t as getDownloadURL } from "../_libs/firebase__storage.mjs";
import { i as getFirebaseStorage, r as getFirebaseAuth } from "./client-C80F8PZn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-D4601ayU.js
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
function stamp(fileName) {
	const safe = fileName.replace(/[^\w.-]+/g, "_").slice(-60);
	return `${Date.now()}_${safe}`;
}
var storagePaths = {
	product: (productId, fileName) => `catalog/products/${productId}/${stamp(fileName)}`,
	category: (slug, fileName) => `catalog/categories/${slug}/${stamp(fileName)}`,
	shop: (shopId, fileName) => `catalog/shops/${shopId}/${stamp(fileName)}`,
	banner: (tabId, fileName) => `content/banners/${tabId}/${stamp(fileName)}`,
	payment: (methodId, fileName) => `content/payments/${methodId}/${stamp(fileName)}`,
	proof: (uid, orderId, fileName) => `users/${uid}/proofs/${orderId}/${stamp(fileName)}`
};
/** Envia um arquivo para o Storage e devolve a URL pública. */
async function uploadFile(path, file, onProgress) {
	const storage = getFirebaseStorage();
	if (!storage) return null;
	const r = ref(storage, path);
	const task = uploadBytesResumable(r, file);
	await new Promise((resolve, reject) => {
		task.on("state_changed", (snapshot) => {
			onProgress?.(snapshot.totalBytes ? Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100) : 0);
		}, reject, resolve);
	});
	return getDownloadURL(r);
}
/**
* Envio de imagens/ficheiros para o Firebase Storage.
* Regra do projeto: guardamos SEMPRE a URL pública do Storage — nunca Base64
* (data:...) no Firestore. Documentos com imagens embutidas estouram o limite
* de 1 MB por documento e tornam a sincronização lenta.
*/
var MAX_BYTES = 8388608;
function reason(err) {
	const code = err?.code ?? "";
	if (code.includes("unauthenticated")) return "Entre na sua conta para enviar ficheiros.";
	if (code.includes("unauthorized") || code.includes("permission")) return "Sem permissão para enviar. Entre na sua conta e tente de novo.";
	if (code.includes("retry-limit") || code.includes("canceled")) return "A ligação falhou a meio do envio.";
	if (code.includes("quota")) return "O armazenamento está cheio. Fale com o suporte.";
	return "Verifique a ligação e tente de novo.";
}
/** Tenta o envio mais do que uma vez — falhas de rede são comuns em mobile. */
async function uploadWithRetry(path, file, attempts = 3, onProgress) {
	let lastError;
	for (let i = 0; i < attempts; i += 1) {
		try {
			const url = await uploadFile(path, file, onProgress);
			if (url) return url;
			lastError = /* @__PURE__ */ new Error("storage-unavailable");
		} catch (err) {
			lastError = err;
		}
		await new Promise((r) => setTimeout(r, 600 * (i + 1)));
	}
	throw lastError ?? /* @__PURE__ */ new Error("upload-failed");
}
async function uploadImageFile(file, path, options) {
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
	const id = options?.silent ? void 0 : toast.loading("A enviar imagem…");
	try {
		const url = await uploadWithRetry(path, file, 3, options?.onProgress);
		if (!options?.silent) toast.success("Imagem enviada", { id });
		return url;
	} catch (err) {
		if (!options?.silent) toast.error(`Não foi possível enviar a imagem. ${reason(err)}`, { id });
		return null;
	}
}
/** Comprovativos aceitam imagem ou PDF e vão sempre para o Storage. */
async function uploadProofFile(file, path, onProgress) {
	if (!(file.type.startsWith("image/") || file.type === "application/pdf")) {
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
		toast.error(`Não foi possível enviar o comprovativo. ${reason(err)}`, { id });
		return null;
	}
}
//#endregion
export { uploadImageFile as n, uploadProofFile as r, storagePaths as t };
