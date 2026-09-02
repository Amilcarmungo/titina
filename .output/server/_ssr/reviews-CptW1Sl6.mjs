import { r as __toESM } from "../_runtime.mjs";
import { a as getDb, o as getFirebaseAuth } from "./client-ColUhoxC.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { K as onSnapshot, L as getDocs, Lt as collection, Ut as doc, et as query, rt as setDoc, un as serverTimestamp, ut as where } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-CptW1Sl6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Gerenciamento de avaliações (reviews) no Firestore.
* Apenas usuários que compraram o produto podem avaliar.
* Cada review é validada contra a compra real do cliente.
*/
/**
* Valida se o usuário realmente comprou o produto verificando os pedidos.
*/
async function verifyPurchase(orderId, productId, uid) {
	const db = getDb();
	if (!db) return false;
	try {
		const ordersRef = collection(db, "orders");
		const q = query(ordersRef, where("id", "==", orderId), where("uid", "==", uid));
		const snap = await getDocs(q);
		if (snap.empty) return false;
		return snap.docs[0].data().items.some((item) => item.productId === productId);
	} catch {
		return false;
	}
}
/**
* Adiciona uma review verificada ao Firestore.
* Apenas persiste se a compra for legítima.
*/
async function addReviewToFirebase(review) {
	const db = getDb();
	const auth = getFirebaseAuth();
	if (!db || !auth?.currentUser) return null;
	const uid = auth.currentUser.uid;
	if (!await verifyPurchase(review.orderId, review.productId, uid)) {
		console.warn("Avaliação rejeitada: compra não verificada", {
			orderId: review.orderId,
			productId: review.productId
		});
		return null;
	}
	try {
		const reviewId = `rv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
		const reviewRef = doc(db, "reviews", reviewId);
		const createdAt = (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR");
		await setDoc(reviewRef, {
			...review,
			uid,
			verified: true,
			createdAt,
			createdAtTimestamp: serverTimestamp()
		});
		return reviewId;
	} catch (error) {
		console.error("Erro ao salvar review:", error);
		return null;
	}
}
/**
* Observa as reviews de um produto (apenas verificadas).
*/
function watchProductReviews(productId, callback) {
	const db = getDb();
	if (!db) return () => {};
	const reviewsRef = collection(db, "reviews");
	const q = query(reviewsRef, where("productId", "==", productId), where("verified", "==", true));
	return onSnapshot(q, (snap) => {
		const reviews = snap.docs.map((d) => ({
			id: d.id,
			...d.data()
		}));
		reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		callback(reviews);
	}, (error) => console.error("Erro ao observar reviews:", error));
}
/**
* Obtém as reviews de um produto uma única vez.
*/
function watchAllReviews(callback) {
	const db = getDb();
	if (!db) return () => {};
	const q = query(collection(db, "reviews"), where("verified", "==", true));
	return onSnapshot(q, (snap) => {
		const reviews = snap.docs.map((d) => ({
			id: d.id,
			...d.data()
		}));
		reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		callback(reviews);
	}, () => callback([]));
}
/**
* Verifica se um pedido já foi avaliado.
*/
async function isOrderReviewedInFirebase(orderId, uid) {
	const db = getDb();
	if (!db) return false;
	try {
		const reviewsRef = collection(db, "reviews");
		const q = query(reviewsRef, where("orderId", "==", orderId), where("uid", "==", uid), where("verified", "==", true));
		return !(await getDocs(q)).empty;
	} catch {
		return false;
	}
}
/**
* Avaliações — apenas dados reais e verificados vindos do banco de dados.
* Nada é lido nem guardado em localStorage (não existem avaliações falsas).
*/
/** Avaliações verificadas de um produto (ou de toda a loja, se `productId` for omitido). */
function useReviews(productId) {
	const [reviews, setReviews] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = productId ? watchProductReviews(productId, setReviews) : watchAllReviews(setReviews);
		return () => unsubscribe();
	}, [productId]);
	return reviews;
}
var reviewActions = { async add(r) {
	const reviewId = await addReviewToFirebase({
		...r,
		uid: ""
	});
	if (!reviewId) throw new Error("Falha na validação da compra");
	return reviewId;
} };
/** Mantido por compatibilidade — a verificação real vive no banco de dados. */
async function markOrderReviewed(_orderId) {}
async function isOrderReviewed(orderId, uid) {
	if (!uid) return false;
	try {
		return await isOrderReviewedInFirebase(orderId, uid);
	} catch {
		return false;
	}
}
if (typeof window !== "undefined") try {
	localStorage.removeItem("shop_reviews_v1");
	localStorage.removeItem("shop_reviewed_orders_v1");
} catch {}
//#endregion
export { useReviews as i, markOrderReviewed as n, reviewActions as r, isOrderReviewed as t };
