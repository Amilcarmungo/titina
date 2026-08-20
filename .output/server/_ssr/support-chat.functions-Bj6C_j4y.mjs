import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./server-BZSXEwNl.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/support-chat.functions-Bj6C_j4y.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var schema = objectType({ messages: arrayType(objectType({
	role: enumType(["user", "assistant"]),
	content: stringType().max(4e3)
})).max(30) });
var SYSTEM = `És a Siyo, a assistente virtual da Bazarixy — um marketplace angolano de moda, beleza, casa e electrónica.
Responde SEMPRE em português de Angola, de forma curta (máx. 4 frases), simpática e prática.
Conhecimento da loja:
- Pagamentos: Multicaixa Express, Unitel Money, PayPay e transferência. O cliente escolhe o método no checkout, copia os dados e envia o comprovativo (imagem ou PDF). O pedido só segue para envio depois da validação do comprovativo.
- Entregas: Luanda 24-48h; outras províncias 3-7 dias úteis. Frete grátis acima de Kz 120.000.
- Devoluções: 30 dias após a entrega, produto sem uso e com embalagem.
- Cupons: na página «Meus cupons», o código aplica-se no checkout em «Cupom de desconto».
- Acompanhar pedido: menu «Mim» › «Meus pedidos».
Se o assunto for sensível (reembolso já pedido, produto danificado, queixa), sugere falar com a equipa no WhatsApp +244 934 033 532.
Nunca inventes números de pedido, prazos ou valores que não te sejam dados.`;
var askSupport_createServerFn_handler = createServerRpc({
	id: "2fa18c9031533ccf5681f8a82f713b2cf97179e9fcc1cbf44fa8f415e55ab137",
	name: "askSupport",
	filename: "src/lib/support-chat.functions.ts"
}, (opts) => askSupport.__executeServer(opts));
var askSupport = createServerFn({ method: "POST" }).inputValidator((data) => schema.parse(data)).handler(askSupport_createServerFn_handler, async ({ data }) => {
	const key = processModule.env.LOVABLE_API_KEY;
	if (!key) return { reply: "O assistente está indisponível de momento. Fale connosco no WhatsApp +244 934 033 532." };
	const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${key}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			model: "google/gemini-2.5-flash",
			messages: [{
				role: "system",
				content: SYSTEM
			}, ...data.messages]
		})
	});
	if (res.status === 429) return { reply: "Estamos com muitos pedidos agora. Tente de novo dentro de instantes ou fale no WhatsApp +244 934 033 532." };
	if (!res.ok) return { reply: "Não consegui responder agora. Pode falar com a equipa no WhatsApp +244 934 033 532." };
	return { reply: (await res.json()).choices?.[0]?.message?.content?.trim() || "Pode reformular a pergunta?" };
});
//#endregion
export { askSupport_createServerFn_handler };
