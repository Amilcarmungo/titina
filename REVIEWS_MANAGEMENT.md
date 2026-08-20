# 🛡️ Guia de Gestão de Avaliações — Bazarixy

## Visão Geral

O sistema de avaliações foi totalmente refeito para garantir que **apenas avaliações legítimas** (de compras verificadas) sejam armazenadas e visíveis aos outros usuários.

### Principais Mudanças

1. **Firebase como Fonte de Verdade**: As avaliações são agora armazenadas no Firestore em vez de localStorage
2. **Validação de Compra**: Cada avaliação é validada contra o histórico de pedidos do usuário
3. **Avaliações Verificadas**: Apenas reviews com `verified: true` são exibidas
4. **Migração Automática**: Reviews legítimas do localStorage são migradas automaticamente

---

## 🔒 Segurança

### Validação em Tempo Real

Quando um usuário tenta adicionar uma avaliação:

1. O sistema verifica se o `uid` do usuário corresponde a um pedido real
2. Verifica se o pedido contém o produto que está sendo avaliado
3. Valida comprimento do texto (mín. 5 caracteres) e rating (1-5)
4. Apenas após essas validações, a avaliação é marcada como `verified: true`

### Regras do Firestore

```firestore
match /reviews/{reviewId} {
  // Apenas reviews verificadas são públicas
  allow read: if resource.data.verified == true;
  
  // Clientes só podem criar reviews verificadas
  allow create: if request.auth != null
                && request.resource.data.uid == request.auth.uid
                && request.resource.data.verified == true
                && request.resource.data.text.size() >= 5
                && request.resource.data.rating >= 1
                && request.resource.data.rating <= 5;
  
  // Apenas admins/moderadores podem editar/deletar
  allow update, delete: if hasRole(['admin', 'moderador']);
}
```

---

## 📊 Estrutura de uma Review

```typescript
type Review = {
  id: string;                           // ID único
  productId: string;                    // Produto avaliado
  orderId: string;                      // Pedido que originou a review
  uid: string;                          // Usuário que avaliou
  name: string;                         // Nome do avaliador
  photoURL?: string | null;             // Foto do avaliador
  rating: number;                       // 1-5 estrelas
  size?: string;                        // Tamanho comprado
  color?: string;                       // Cor comprada
  text: string;                         // Comentário (mín. 5 caracteres)
  verified: boolean;                    // ✅ Compra verificada
  createdAt: string;                    // Data em formato pt-BR
  createdAtTimestamp?: Timestamp;       // Timestamp do Firebase
};
```

---

## 🧹 Remover Avaliações Falsas

### Opção 1: Manualmente via Console Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Vá para `Firestore Database`
3. Abra a coleção `reviews`
4. Selecione a review a remover
5. Clique em "Delete Document"

### Opção 2: Criar um Script Admin

```typescript
// src/lib/firebase/admin-reviews.ts
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getDb } from "./client";

export async function deleteReviewsForProduct(productId: string) {
  const db = getDb();
  if (!db) return;

  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, where("productId", "==", productId));
  const snap = await getDocs(q);

  for (const docSnap of snap.docs) {
    await deleteDoc(doc(db, "reviews", docSnap.id));
  }
}

export async function deleteReviewsForUser(uid: string) {
  const db = getDb();
  if (!db) return;

  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, where("uid", "==", uid));
  const snap = await getDocs(q);

  for (const docSnap of snap.docs) {
    await deleteDoc(doc(db, "reviews", docSnap.id));
  }
}
```

### Opção 3: Bulk Delete via Firestore Rules

**Apenas admins podem fazer bulk deletes:**

```firestore
// Adicionar à coleção reviews:
match /reviews/{reviewId} {
  // Admins podem limpar tudo
  allow read: if resource.data.verified == true;
  allow create: if ...;
  allow update, delete: if hasRole(['admin', 'moderador']);
}
```

---

## 🔄 Migração do localStorage

### Como Funciona

Quando um usuário autenticado acessa o site pela primeira vez:

1. O componente `ReviewsMigrationSync` inicia automaticamente
2. Lê reviews do localStorage (`shop_reviews_v1`)
3. Para cada review:
   - Valida se o `orderId` existe nos pedidos do Firestore
   - Verifica se o produto está no pedido
   - Verifica se o texto tem pelo menos 5 caracteres
   - Verifica se o rating é válido (1-5)
4. Migra apenas as reviews válidas para Firebase
5. Marca como migrado com uma flag no localStorage

### Removendo o localStorage (depois de x dias)

```typescript
// Depois de garantir que a migração foi bem-sucedida:
export function clearLocalStorageReviews() {
  localStorage.removeItem("shop_reviews_v1");
  localStorage.removeItem("shop_reviewed_orders_v1");
}
```

---

## 📈 Monitoramento

### Verificar Reviews Não Verificadas

Se houver reviews com `verified: false`, são inválidas:

```sql
-- Query no Firestore console:
db.collection("reviews").where("verified", "==", false).get()
```

### Estatísticas

```typescript
export async function getReviewStats(productId: string) {
  const reviews = await getProductReviews(productId);
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? reviews.reduce((s, r) => s + r.rating, 0) / totalReviews 
    : 0;
  
  return { totalReviews, avgRating };
}
```

---

## ⚠️ Problemas Comuns

### "Avaliação não foi publicada"

**Causa**: Review não passou na validação de compra

**Solução**:
- Verifique se o pedido existe no Firestore
- Verifique se o pedido contém o produto
- Verifique se o `uid` no pedido corresponde ao usuário

### Reviews do localStorage não aparecem

**Causa**: Falharam na validação durante a migração

**Solução**:
- Acesse o browser console
- Procure por logs de migração: `Migração de reviews concluída`
- Verifique os `errors` retornados
- Se necessário, remova manualmente a flag: `localStorage.removeItem("reviews_migrated_${uid}")`

### Muito lentas para carregar

**Causa**: Muitas reviews ou índices não criados

**Solução**:
- Crie um índice no Firestore: `reviews (productId, verified)`
- Considere paginar as reviews (mostre 5 por vez)

---

## 🚀 Próximos Passos

- [ ] Adicionar moderação de reviews (filtrar spam/xingamentos)
- [ ] Implementar sistema de helpful votes ("útil" / "não útil")
- [ ] Adicionar fotos nas reviews
- [ ] Notificar lojistas quando há nova review
- [ ] Dashboard de analytics de reviews

---

## 📞 Suporte

Para questões sobre o sistema de reviews, verifique:

1. Logs do browser (console.log)
2. Logs do Firebase (Extension "Firebase Extensions")
3. Arquivo `src/lib/firebase/reviews.ts`
4. Arquivo `src/lib/firebase/reviews-migration.ts`
