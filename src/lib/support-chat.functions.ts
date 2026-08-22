import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      }),
    )
    .max(30),
});

const SYSTEM = `És a Jilda IA, a assistente virtual da Bazarixy — um marketplace angolano de moda, beleza, casa e electrónica.
Responde SEMPRE em português de Angola, de forma curta (máx. 4 frases), simpática e prática.
Conhecimento da loja:
- Pagamentos: Multicaixa Express, Unitel Money, PayPay e transferência. O cliente escolhe o método no checkout, copia os dados e envia o comprovativo (imagem ou PDF). O pedido só segue para envio depois da validação do comprovativo.
- Entregas: Luanda 24-48h; outras províncias 3-7 dias úteis. Frete grátis acima de Kz 120.000.
- Devoluções: 30 dias após a entrega, produto sem uso e com embalagem.
- Cupons: na página «Meus cupons», o código aplica-se no checkout em «Cupom de desconto».
- Acompanhar pedido: menu «Mim» › «Meus pedidos».
Se o assunto for sensível (reembolso já pedido, produto danificado, queixa), sugere falar com a equipa no WhatsApp +244 934 033 532.
Nunca inventes números de pedido, prazos ou valores que não te sejam dados.`;

export function fallbackSupportReply(message: string): string {
  const text = message.toLocaleLowerCase();
  if (
    text.includes("pag") ||
    text.includes("comprov") ||
    text.includes("transfer")
  ) {
    return "Escolha um método no checkout, copie exactamente o valor e os dados apresentados e envie o comprovativo real. Nunca envie comprovativo falso, alterado ou com valor diferente do pedido; o pedido só segue depois da validação. Se já enviou algo incorrecto, fale connosco no WhatsApp +244 934 033 532.";
  }
  if (
    text.includes("entreg") ||
    text.includes("frete") ||
    text.includes("envio")
  ) {
    return "O custo e o prazo aparecem no checkout depois de informar a morada. O frete grátis depende da regra activa e do valor mínimo mostrado no resumo; acompanhe o pedido em «Meus pedidos».";
  }
  if (
    text.includes("devol") ||
    text.includes("reembols") ||
    text.includes("danific")
  ) {
    return "Para devoluções ou reembolsos, mantenha o produto sem uso e contacte a equipa pelo WhatsApp +244 934 033 532 com o número do pedido.";
  }
  return "Posso ajudar com pagamentos, entregas, pedidos, devoluções e cupons. Diga-me o que precisa ou fale directamente com a equipa no WhatsApp +244 934 033 532.";
}

export const askSupport = createServerFn({ method: "POST" })
  .validator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.GEMINI_API_KEY;
    const lastMessage = data.messages.at(-1)?.content ?? "";
    if (!key) return { reply: fallbackSupportReply(lastMessage) };

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
          encodeURIComponent(key),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM }] },
            contents: data.messages.map((message) => ({
              role: message.role === "assistant" ? "model" : "user",
              parts: [{ text: message.content }],
            })),
          }),
          signal: controller.signal,
        },
      );
      clearTimeout(timeout);

      if (res.status === 429 || !res.ok)
        return { reply: fallbackSupportReply(lastMessage) };
      const json = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      return {
        reply:
          json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
          fallbackSupportReply(lastMessage),
      };
    } catch {
      return { reply: fallbackSupportReply(lastMessage) };
    }
  });
