//#region node_modules/.nitro/vite/services/ssr/assets/format-DAL2ZktZ.js
/**
* Preços são guardados e apresentados directamente em Kwanza (AOA).
* Não existe qualquer conversão/multiplicação: o valor que o gestor escreve
* no painel é exactamente o valor que o cliente vê.
*/
function formatKz(value) {
	const n = Number.isFinite(value) ? value : 0;
	const hasCents = Math.abs(n % 1) > .001;
	return `Kz ${n.toLocaleString("pt-AO", {
		minimumFractionDigits: hasCents ? 2 : 0,
		maximumFractionDigits: hasCents ? 2 : 0
	})}`;
}
//#endregion
export { formatKz as t };
