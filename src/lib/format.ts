/**
 * Preços são guardados e apresentados directamente em Kwanza (AOA).
 * Não existe qualquer conversão/multiplicação: o valor que o gestor escreve
 * no painel é exactamente o valor que o cliente vê.
 */
export function formatKz(value: number): string {
  const n = Number.isFinite(value) ? value : 0;
  const hasCents = Math.abs(n % 1) > 0.001;
  return `Kz ${n.toLocaleString("pt-AO", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  })}`;
}
