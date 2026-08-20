/**
 * Gerenciamento de avaliações (reviews) no Firestore.
 * Apenas usuários que compraram o produto podem avaliar.
 * Cada review é validada contra a compra real do cliente.
 */

import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { getDb, getFirebaseAuth } from "./client";
import type { Order } from "@/lib/orders-store";

export type Review = {
  id: string;
  productId: string;
  orderId: string;
  uid: string;
  name: string;
  photoURL?: string | null;
  rating: number;
  size?: string;
  color?: string;
  text: string;
  verified: boolean; // Verdadeira = compra verificada no Firestore
  createdAt: string;
  createdAtTimestamp?: Timestamp;
};

/**
 * Valida se o usuário realmente comprou o produto verificando os pedidos.
 */
async function verifyPurchase(
  orderId: string,
  productId: string,
  uid: string,
): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("id", "==", orderId),
      where("uid", "==", uid),
    );
    const snap = await getDocs(q);

    if (snap.empty) return false;

    const order = snap.docs[0].data() as Order;
    // Verifica se o pedido contém o produto
    return order.items.some((item) => item.productId === productId);
  } catch {
    return false;
  }
}

/**
 * Adiciona uma review verificada ao Firestore.
 * Apenas persiste se a compra for legítima.
 */
export async function addReviewToFirebase(
  review: Omit<Review, "id" | "createdAt" | "verified" | "createdAtTimestamp">,
) {
  const db = getDb();
  const auth = getFirebaseAuth();
  if (!db || !auth?.currentUser) return null;

  const uid = auth.currentUser.uid;
  const verified = await verifyPurchase(review.orderId, review.productId, uid);

  if (!verified) {
    console.warn("Avaliação rejeitada: compra não verificada", {
      orderId: review.orderId,
      productId: review.productId,
    });
    return null;
  }

  try {
    const reviewId = `rv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const reviewRef = doc(db, "reviews", reviewId);
    const createdAt = new Date().toLocaleDateString("pt-BR");

    await setDoc(reviewRef, {
      ...review,
      uid,
      verified: true,
      createdAt,
      createdAtTimestamp: serverTimestamp(),
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
export function watchProductReviews(
  productId: string,
  callback: (reviews: Review[]) => void,
) {
  const db = getDb();
  if (!db) return () => {};

  const reviewsRef = collection(db, "reviews");
  const q = query(
    reviewsRef,
    where("productId", "==", productId),
    where("verified", "==", true),
  );

  return onSnapshot(
    q,
    (snap) => {
      const reviews = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Review[];

      // Ordena por mais recentes primeiro
      reviews.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      callback(reviews);
    },
    (error) => console.error("Erro ao observar reviews:", error),
  );
}

/**
 * Obtém as reviews de um produto uma única vez.
 */
export function watchAllReviews(callback: (reviews: Review[]) => void) {
  const db = getDb();
  if (!db) return () => {};
  const q = query(collection(db, "reviews"), where("verified", "==", true));
  return onSnapshot(
    q,
    (snap) => {
      const reviews = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Review[];
      reviews.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      callback(reviews);
    },
    () => callback([]),
  );
}

/**
 * Obtém as reviews de um produto uma única vez.
 */
export async function getProductReviews(productId: string): Promise<Review[]> {
  const db = getDb();
  if (!db) return [];

  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("productId", "==", productId),
      where("verified", "==", true),
    );

    const snap = await getDocs(q);
    const reviews = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Review[];

    // Ordena por mais recentes primeiro
    reviews.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return reviews;
  } catch (error) {
    console.error("Erro ao obter reviews:", error);
    return [];
  }
}

/**
 * Calcula a média de rating de um produto baseado em reviews verificadas.
 */
export async function calculateAverageRating(
  productId: string,
): Promise<number> {
  const reviews = await getProductReviews(productId);
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

/**
 * Verifica se um pedido já foi avaliado.
 */
export async function isOrderReviewedInFirebase(
  orderId: string,
  uid: string,
): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("orderId", "==", orderId),
      where("uid", "==", uid),
      where("verified", "==", true),
    );

    const snap = await getDocs(q);
    return !snap.empty;
  } catch {
    return false;
  }
}
