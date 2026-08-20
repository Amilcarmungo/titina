/**
 * Ferramentas Admin para Gerenciar Avaliações.
 * Use no admin panel ou via console para remover avaliações falsas.
 */

import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { getDb } from "./client";
import type { Review } from "./reviews";

/**
 * Deleta uma review específica pelo ID.
 */
export async function deleteReviewById(reviewId: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  try {
    await deleteDoc(doc(db, "reviews", reviewId));
    console.log(`Review ${reviewId} deletada com sucesso`);
    return true;
  } catch (error) {
    console.error(`Erro ao deletar review ${reviewId}:`, error);
    return false;
  }
}

/**
 * Deleta todas as reviews de um usuário.
 */
export async function deleteAllReviewsByUser(uid: string): Promise<number> {
  const db = getDb();
  if (!db) return 0;

  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("uid", "==", uid));
    const snap = await getDocs(q);

    let count = 0;
    for (const docSnap of snap.docs) {
      await deleteDoc(doc(db, "reviews", docSnap.id));
      count++;
    }

    console.log(`${count} reviews deletadas do usuário ${uid}`);
    return count;
  } catch (error) {
    console.error("Erro ao deletar reviews do usuário:", error);
    return 0;
  }
}

/**
 * Deleta todas as reviews de um produto.
 */
export async function deleteAllReviewsForProduct(productId: string): Promise<number> {
  const db = getDb();
  if (!db) return 0;

  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("productId", "==", productId));
    const snap = await getDocs(q);

    let count = 0;
    for (const docSnap of snap.docs) {
      await deleteDoc(doc(db, "reviews", docSnap.id));
      count++;
    }

    console.log(`${count} reviews deletadas do produto ${productId}`);
    return count;
  } catch (error) {
    console.error("Erro ao deletar reviews do produto:", error);
    return 0;
  }
}

/**
 * Deleta reviews não verificadas (potencialmente falsas).
 */
export async function deleteUnverifiedReviews(): Promise<number> {
  const db = getDb();
  if (!db) return 0;

  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("verified", "==", false));
    const snap = await getDocs(q);

    let count = 0;
    for (const docSnap of snap.docs) {
      await deleteDoc(doc(db, "reviews", docSnap.id));
      count++;
    }

    console.log(`${count} reviews não verificadas deletadas`);
    return count;
  } catch (error) {
    console.error("Erro ao deletar reviews não verificadas:", error);
    return 0;
  }
}

/**
 * Deleta reviews muito antigas (mais de X dias).
 */
export async function deleteReviewsOlderThan(days: number): Promise<number> {
  const db = getDb();
  if (!db) return 0;

  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef);
    const snap = await getDocs(q);

    let count = 0;
    for (const docSnap of snap.docs) {
      const review = docSnap.data() as Review;
      const reviewDate = review.createdAtTimestamp
        ? review.createdAtTimestamp.toDate()
        : new Date(review.createdAt);

      if (reviewDate < cutoffDate) {
        await deleteDoc(docSnap.ref);
        count++;
      }
    }

    console.log(`${count} reviews mais antigas que ${days} dias foram deletadas`);
    return count;
  } catch (error) {
    console.error("Erro ao deletar reviews antigas:", error);
    return 0;
  }
}

/**
 * Encontra reviews suspeitas (rating muito alto ou texto muito curto).
 */
export async function findSuspiciousReviews(): Promise<Review[]> {
  const db = getDb();
  if (!db) return [];

  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("verified", "==", true));
    const snap = await getDocs(q);

    const suspicious: Review[] = [];

    snap.docs.forEach((docSnap) => {
      const review = { id: docSnap.id, ...docSnap.data() } as Review;

      // Flags suspeitas
      const isSuspicious =
        (review.rating === 5 && review.text.length < 20) || // 5 stars mas texto muito curto
        (review.text.includes("fake") || review.text.includes("falso")) || // Menção a fake/falso
        !review.photoURL; // Sem foto de perfil

      if (isSuspicious) {
        suspicious.push(review);
      }
    });

    console.log(`${suspicious.length} reviews suspeitas encontradas`);
    return suspicious;
  } catch (error) {
    console.error("Erro ao procurar reviews suspeitas:", error);
    return [];
  }
}

/**
 * Obtém todas as reviews de um produto.
 */
export async function getAllReviewsForProduct(productId: string): Promise<Review[]> {
  const db = getDb();
  if (!db) return [];

  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("productId", "==", productId),
      where("verified", "==", true)
    );
    const snap = await getDocs(q);

    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
  } catch (error) {
    console.error("Erro ao obter reviews do produto:", error);
    return [];
  }
}

/**
 * Marca uma review como spam (função para futuro sistema de moderação).
 */
export async function markReviewAsSpam(reviewId: string, reason: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  try {
    const reviewRef = doc(db, "reviews", reviewId);
    await updateDoc(reviewRef, {
      spam: true,
      spamReason: reason,
      markedAsSpamAt: Timestamp.now(),
    });

    console.log(`Review ${reviewId} marcada como spam: ${reason}`);
    return true;
  } catch (error) {
    console.error("Erro ao marcar review como spam:", error);
    return false;
  }
}

/**
 * Obtém estatísticas de reviews.
 */
export async function getReviewsStats() {
  const db = getDb();
  if (!db) return null;

  try {
    const reviewsRef = collection(db, "reviews");

    // Total de reviews
    const totalSnap = await getDocs(query(reviewsRef));
    const total = totalSnap.size;

    // Reviews verificadas
    const verifiedSnap = await getDocs(
      query(reviewsRef, where("verified", "==", true))
    );
    const verified = verifiedSnap.size;

    // Reviews não verificadas
    const unverifiedSnap = await getDocs(
      query(reviewsRef, where("verified", "==", false))
    );
    const unverified = unverifiedSnap.size;

    // Rating médio
    let avgRating = 0;
    let ratingSum = 0;
    verifiedSnap.docs.forEach((doc) => {
      ratingSum += (doc.data() as Review).rating || 0;
    });
    if (verified > 0) avgRating = ratingSum / verified;

    return {
      total,
      verified,
      unverified,
      avgRating: avgRating.toFixed(2),
    };
  } catch (error) {
    console.error("Erro ao calcular stats:", error);
    return null;
  }
}

/**
 * Exporta todas as reviews para análise.
 */
export async function exportAllReviews(): Promise<Review[]> {
  const db = getDb();
  if (!db) return [];

  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef);
    const snap = await getDocs(q);

    const reviews = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];

    // Salva como JSON
    const json = JSON.stringify(reviews, null, 2);
    console.log(json);

    return reviews;
  } catch (error) {
    console.error("Erro ao exportar reviews:", error);
    return [];
  }
}
