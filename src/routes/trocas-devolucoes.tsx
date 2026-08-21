import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ShieldCheck, Mail, RefreshCcw, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/trocas-devolucoes")({
  head: () => ({
    meta: [
      { title: "Política de Trocas e Devoluções — Bazarixy" },
      {
        name: "description",
        content:
          "Política de trocas e devoluções da Bazarixy, incluindo prazos, defeitos, reembolsos e condições aplicáveis à compra.",
      },
      {
        property: "og:title",
        content: "Política de Trocas e Devoluções — Bazarixy",
      },
      {
        property: "og:description",
        content:
          "Regras para devolução, troca e reembolso de produtos comprados na Bazarixy.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReturnPolicyPage,
});

const sections: {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}[] = [
  {
    id: "1",
    title: "1. OBJETIVO",
    paragraphs: [
      "O Bazarixy procura proporcionar uma experiência de compra segura, transparente e confiável aos seus clientes.",
      "Esta Política estabelece as condições aplicáveis às solicitações de troca, devolução e reembolso de produtos adquiridos através da plataforma Bazarixy, sem prejuízo dos direitos que sejam assegurados ao consumidor pela legislação aplicável.",
    ],
  },
  {
    id: "2",
    title: "2. PRAZO PARA DEVOLUÇÃO",
    paragraphs: [
      "2.1 O cliente dispõe de um prazo máximo de 3 (três) dias corridos, contados a partir da data em que o produto foi entregue, para comunicar ao Bazarixy a intenção de solicitar uma devolução, troca ou apresentar uma reclamação relacionada com o estado ou conformidade do produto.",
      "2.2 A solicitação deverá ser apresentada dentro do prazo de 3 (três) dias através dos canais oficiais de suporte do Bazarixy.",
      "2.3 Após o término do prazo de 3 (três) dias, os pedidos de devolução ou troca por motivos não abrangidos por uma obrigação legal, garantia ou outra condição expressamente aplicável ao produto poderão não ser aceites.",
      "2.4 O prazo previsto nesta Política não prejudica direitos ou garantias que sejam obrigatórios nos termos da legislação aplicável.",
    ],
  },
  {
    id: "3",
    title: "3. COMO SOLICITAR UMA DEVOLUÇÃO",
    paragraphs: [
      "Para solicitar uma devolução, o cliente deverá:",
      "1. Contactar o suporte do Bazarixy dentro do prazo estabelecido;",
      "2. Informar o número do pedido;",
      "3. Indicar o motivo da solicitação;",
      "4. Apresentar fotografias ou vídeos do produto, quando solicitado;",
      "5. Aguardar a análise e as instruções da equipa Bazarixy.",
    ],
  },
  {
    id: "4",
    title: "4. CONDIÇÕES DO PRODUTO",
    paragraphs: [
      "Sempre que aplicável, o produto deverá ser devolvido:",
      "- Com a embalagem original;",
      "- Com os acessórios e componentes fornecidos;",
      "- Sem sinais de utilização indevida;",
      "- Sem danos provocados pelo cliente;",
      "- Com os respetivos documentos ou comprovativos, quando aplicável.",
      "A aceitação da devolução estará sujeita à análise das condições do produto e do motivo apresentado.",
    ],
  },
  {
    id: "5",
    title: "5. PRODUTO COM DEFEITO OU INCORRETO",
    paragraphs: [
      "Caso o produto apresente defeito, tenha sido danificado antes da entrega ou seja diferente daquele adquirido, o cliente deverá comunicar o ocorrido ao Bazarixy dentro do prazo estabelecido.",
      "Após análise e confirmação da situação, poderão ser adotadas medidas como:",
      "- Substituição do produto;",
      "- Reparação, quando aplicável;",
      "- Devolução do valor pago;",
      "- Outra solução prevista pela legislação aplicável ou acordada entre as partes.",
    ],
  },
  {
    id: "6",
    title: "6. DEVOLUÇÕES POR OPÇÃO DO CLIENTE",
    paragraphs: [
      "Pedidos motivados exclusivamente por preferência pessoal, mudança de opinião, escolha incorreta ou outro motivo não relacionado com defeito ou desconformidade do produto estarão sujeitos às condições aplicáveis ao respetivo produto e à legislação vigente.",
      "Quando a devolução for permitida, os custos associados poderão ser suportados pelo cliente, salvo disposição em contrário.",
    ],
  },
  {
    id: "7",
    title: "7. REEMBOLSO",
    paragraphs: [
      "Quando um reembolso for aprovado, o Bazarixy informará o cliente sobre o procedimento aplicável.",
      "O prazo para processamento poderá variar de acordo com o método de pagamento utilizado e com as instituições financeiras ou operadores de pagamento envolvidos.",
    ],
  },
  {
    id: "8",
    title: "8. RESPONSABILIDADE DAS LOJAS PARCEIRAS",
    paragraphs: [
      "As Lojas Parceiras são responsáveis pelas informações dos produtos, pela sua qualidade e pelas obrigações relacionadas com os produtos que comercializam, sem prejuízo das responsabilidades que possam caber ao Bazarixy nos termos da legislação aplicável.",
    ],
  },
  {
    id: "9",
    title: "9. PAPEL DO BAZARIXY",
    paragraphs: [
      "O Bazarixy disponibiliza o canal de suporte e poderá intermediar a comunicação entre o cliente e a Loja Parceira responsável pelo produto.",
      "O Bazarixy analisará as solicitações apresentadas e procurará assegurar que sejam tratadas de acordo com esta Política, as condições da compra e a legislação aplicável.",
    ],
  },
  {
    id: "10",
    title: "10. DISPOSIÇÃO FINAL",
    paragraphs: [
      "O prazo de 3 (três) dias corridos constitui o prazo operacional definido pelo Bazarixy para comunicação de pedidos de devolução ou troca, sem prejuízo de garantias, direitos ou prazos que sejam legalmente obrigatórios ou especificamente aplicáveis a determinados produtos.",
      "O Bazarixy poderá atualizar esta Política sempre que necessário, mantendo a versão vigente disponível na plataforma.",
    ],
  },
];

function ReturnPolicyPage() {
  return (
    <Layout
      title="Política de Trocas e Devoluções"
      showBack
      hideHeader
      hideBottomNav
      hideTopNav
    >
      <article className="mx-auto w-full max-w-[980px] bg-white px-4 py-6 text-slate-800 md:px-10 md:py-10">
        <header className="border-b border-slate-200 pb-6 text-center md:pb-8">
          <div className="flex justify-center">
            <img
              src="/logotipo.webp"
              alt="Bazarixy"
              className="h-20 w-auto object-contain md:h-24"
            />
          </div>

          <h1 className="mt-6 font-display text-2xl font-black leading-tight text-slate-900 md:text-4xl">
            Política de Trocas e Devoluções do Bazarixy
          </h1>

          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            <ShieldCheck className="h-4 w-4 text-brand-strong" />
            Última atualização: Agosto de 2026
          </div>
        </header>

        <div className="py-6 md:py-8">
          {sections.map((section) => (
            <section
              key={section.id}
              className="scroll-mt-20 border-b border-slate-200 py-6 last:border-b-0 first:pt-0"
            >
              <h2 className="text-center font-display text-lg font-black tracking-tight text-slate-900 md:text-xl">
                {section.title}
              </h2>

              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={`${section.id}-${index}`}
                  className="mt-3 text-[15px] leading-8 text-slate-700"
                >
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul className="mt-3 space-y-2 pl-5 text-[15px] leading-8 text-slate-700">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="list-disc marker:text-brand-strong"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="border-t border-slate-200 pt-6">
          <h3 className="font-display text-xl font-black text-slate-900">
            Contacto
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <a
              href="mailto:suporte@bazarixy.com"
              className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-brand-strong ring-1 ring-slate-200">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Suporte ao cliente
                </span>
                <span className="text-sm font-medium text-slate-800">
                  suporte@bazarixy.com
                </span>
              </div>
            </a>

            <a
              href="mailto:parcerias@bazarixy.com"
              className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-brand-strong ring-1 ring-slate-200">
                <RefreshCcw className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Parcerias comerciais
                </span>
                <span className="text-sm font-medium text-slate-800">
                  parcerias@bazarixy.com
                </span>
              </div>
            </a>
          </div>
        </section>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-slate-200 pt-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <Link
            to="/termos"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-strong"
          >
            Ler termos e condições
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/privacidade"
            className="text-sm font-bold text-brand-strong underline-offset-4 hover:underline"
          >
            Política de Privacidade
          </Link>
          <Link
            to="/support"
            className="text-sm font-medium text-brand-strong underline-offset-4 hover:underline"
          >
            Falar com o suporte
          </Link>
        </div>
      </article>
    </Layout>
  );
}
