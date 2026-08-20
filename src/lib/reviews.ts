/**
 * Avaliações — apenas dados reais e verificados vindos do banco de dados.
 * Nada é lido nem guardado em localStorage (não existem avaliações falsas).
 */

import { useEffect, useState } from "react";
import {
  addReviewToFirebase,
  watchProductReviews,
  watchAllReviews,
  isOrderReviewedInFirebase,
} from "@/lib/firebase/reviews";
import type { Review as FirebaseReview } from "@/lib/firebase/reviews";

export type Review = FirebaseReview;

/** Avaliações verificadas de um produto (ou de toda a loja, se `productId` for omitido). */
export function useReviews(productId?: string): Review[] {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const unsubscribe = productId
      ? watchProductReviews(productId, setReviews)
      : watchAllReviews(setReviews);
    return () => unsubscribe();
  }, [productId]);

  return reviews;
}

export const reviewActions = {
  async add(r: Omit<Review, "id" | "createdAt" | "verified" | "createdAtTimestamp" | "uid">) {
    const reviewId = await addReviewToFirebase({ ...r, uid: "" });
    if (!reviewId) throw new Error("Falha na validação da compra");
    return reviewId;
  },
};

/** Mantido por compatibilidade — a verificação real vive no banco de dados. */
export async function markOrderReviewed(_orderId: string) {}

export async function isOrderReviewed(orderId: string, uid?: string): Promise<boolean> {
  if (!uid) return false;
  try {
    return await isOrderReviewedInFirebase(orderId, uid);
  } catch {
    return false;
  }
}

// Limpeza única: apaga avaliações antigas guardadas no navegador (dados falsos/locais).
if (typeof window !== "undefined") {
  try {
    localStorage.removeItem("shop_reviews_v1");
    localStorage.removeItem("shop_reviewed_orders_v1");
  } catch {}
}
