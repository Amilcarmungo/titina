import type { Order } from "@/lib/orders-store";
import { PLATFORM_FEE } from "@/lib/logistics-store";

export { PLATFORM_FEE };

/** Bazarixy fica com 5% de cada venda; o restante é da loja. */
export function splitSale(amount: number) {
  const platform = amount * PLATFORM_FEE;
  return { gross: amount, platform, shop: amount - platform };
}

export const PAID_STATUSES = ["processing", "shipped", "review"] as const;

export function isPaid(o: Order) {
  return (PAID_STATUSES as readonly string[]).includes(o.status);
}

export function revenueSummary(orders: Order[]) {
  const paid = orders.filter(isPaid);
  const gross = paid.reduce((s, o) => s + o.total, 0);
  const pending = orders
    .filter((o) => o.status === "unpaid")
    .reduce((s, o) => s + o.total, 0);
  const refunded = orders
    .filter((o) => o.status === "returns")
    .reduce((s, o) => s + o.total, 0);
  const { platform, shop } = splitSale(gross);
  return {
    orders: paid.length,
    gross,
    platform,
    shop,
    pending,
    refunded,
    avgTicket: paid.length ? gross / paid.length : 0,
  };
}

/** Agrupa receita por mês (rótulo curto) usando createdAt "dd/mm/aaaa · hh:mm". */
export function revenueByMonth(orders: Order[]) {
  const map = new Map<string, number>();
  for (const o of orders.filter(isPaid)) {
    const m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(o.createdAt);
    const key = m ? `${m[2]}/${m[3]}` : "—";
    map.set(key, (map.get(key) ?? 0) + o.total);
  }
  return Array.from(map, ([label, value]) => ({ label, value })).reverse();
}
