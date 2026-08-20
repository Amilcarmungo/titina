import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) }))
    .max(30),
});

const SYSTEM = `És a Siyo, a assistente virtual da Bazarixy — um marketplace angolano de moda, beleza, casa e electrónica.
Responde SEMPRE em português de Angola, de forma curta (máx. 4 frases), simpática e prática.
Conhecimento da loja:
- Pagamentos: Multicaixa Express, Unitel Money, PayPay e transferência. O cliente escolhe o método no checkout, copia os dados e envia o comprovativo (imagem ou PDF). O pedido só segue para envio depois da validação do comprovativo.
- Entregas: Luanda 24-48h; outras províncias 3-7 dias úteis. Frete grátis acima de Kz 120.000.
- Devoluções: 30 dias após a entrega, produto sem uso e com embalagem.
- Cupons: na página «Meus cupons», o código aplica-se no checkout em «Cupom de desconto».
- Acompanhar pedido: menu «Mim» › «Meus pedidos».
Se o assunto for sensível (reembolso já pedido, produto danificado, queixa), sugere falar com a equipa no WhatsApp +244 934 033 532.
Nunca inventes números de pedido, prazos ou valores que não te sejam dados.`;

export const askSupport = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { reply: "O assistente está indisponível de momento. Fale connosco no WhatsApp +244 934 033 532." };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM }, ...data.messages],
      }),
    });

    if (res.status === 429) return { reply: "Estamos com muitos pedidos agora. Tente de novo dentro de instantes ou fale no WhatsApp +244 934 033 532." };
    if (!res.ok) return { reply: "Não consegui responder agora. Pode falar com a equipa no WhatsApp +244 934 033 532." };

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { reply: json.choices?.[0]?.message?.content?.trim() || "Pode reformular a pergunta?" };
  });
