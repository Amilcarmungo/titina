import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import logoAsset from "@/assets/bazarixy-logo.webp.asset.json";
import { ShieldCheck, Mail, Handshake, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos e Condições — Bazarixy" },
      {
        name: "description",
        content:
          "Termos e condições de utilização da plataforma Bazarixy, incluindo compras, pagamentos, entregas e responsabilidades da marketplace em Angola.",
      },
      { property: "og:title", content: "Termos e Condições — Bazarixy" },
      {
        property: "og:description",
        content:
          "Regras de utilização, responsabilidades, pagamentos e protecção de dados da plataforma Bazarixy.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsPage,
});

const sections: {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}[] = [
  {
    id: "1",
    title: "1. DISPOSIÇÕES INICIAIS",
    paragraphs: [
      "Bem-vindo ao Bazarixy.",
      "O presente documento estabelece os Termos e Condições de Utilização da plataforma digital Bazarixy, incluindo o website, aplicações, sistemas e demais serviços disponibilizados pela plataforma.",
      "O Bazarixy é uma plataforma de comércio eletrónico que permite a ligação entre consumidores e lojas parceiras previamente verificadas, disponibilizando ferramentas tecnológicas para apresentação de produtos, realização de pedidos, comunicação, processamento de informações e suporte ao utilizador.",
      "Ao aceder, navegar ou utilizar os serviços do Bazarixy, o utilizador declara ter lido, compreendido e aceite integralmente os presentes Termos e Condições.",
    ],
  },
  {
    id: "2",
    title: "2. DEFINIÇÕES",
    paragraphs: [
      "Para efeitos destes Termos, aplicam-se as seguintes definições:",
      "2.1 Bazarixy — Entidade responsável pela operação, manutenção e desenvolvimento da plataforma digital Bazarixy, incluindo os seus sistemas tecnológicos, funcionalidades, serviços de suporte e mecanismos de segurança.",
      "2.2 Plataforma — Ambiente digital disponibilizado pelo Bazarixy onde clientes podem consultar produtos, realizar pedidos e interagir com lojas parceiras.",
      "2.3 Cliente — Pessoa singular ou coletiva que utiliza a plataforma para consultar produtos, efetuar compras ou utilizar qualquer serviço disponibilizado pelo Bazarixy.",
      "2.4 Loja Parceira — Pessoa singular ou coletiva devidamente aprovada pelo Bazarixy para disponibilizar produtos ou serviços através da plataforma.",
      "2.5 Produto — Bem ou serviço disponibilizado por uma Loja Parceira dentro da plataforma Bazarixy.",
    ],
  },
  {
    id: "3",
    title: "3. NATUREZA E FUNCIONAMENTO DA PLATAFORMA",
    paragraphs: [
      "3.1 O Bazarixy opera como uma plataforma de marketplace digital, permitindo que lojas parceiras qualificadas disponibilizem produtos aos clientes.",
      "3.2 O Bazarixy não representa automaticamente o fabricante, importador ou proprietário dos produtos disponibilizados pelas lojas parceiras, salvo quando expressamente indicado.",
      "3.3 A aprovação de uma Loja Parceira pelo Bazarixy não constitui garantia absoluta sobre todos os produtos comercializados, mas representa uma análise interna baseada nos critérios definidos pela plataforma.",
      "3.4 O Bazarixy reserva-se o direito de aceitar, rejeitar, suspender ou remover lojas, produtos ou conteúdos que violem estes Termos, políticas internas ou legislação aplicável.",
    ],
  },
  {
    id: "4",
    title: "4. CADASTRO E CONTA DO UTILIZADOR",
    paragraphs: [
      "4.1 Determinadas funcionalidades da plataforma poderão exigir a criação de uma conta.",
      "4.2 O utilizador compromete-se a fornecer informações verdadeiras, completas e atualizadas.",
      "4.3 O utilizador é responsável pela confidencialidade das suas credenciais de acesso e por todas as atividades realizadas através da sua conta.",
      "4.4 Caso sejam identificadas informações falsas, utilização indevida ou comportamento fraudulento, o Bazarixy poderá limitar ou suspender o acesso à conta.",
    ],
  },
  {
    id: "5",
    title: "5. PROCESSO DE COMPRA",
    paragraphs: [
      "5.1 A apresentação de produtos na plataforma constitui uma disponibilização comercial, estando a confirmação da compra condicionada à validação do pedido e disponibilidade do produto.",
      "5.2 Antes da conclusão da compra, o cliente terá acesso às informações disponíveis sobre o produto, incluindo preço, características, condições de entrega e outras informações relevantes.",
      "5.3 O contrato de compra e venda relativo ao produto será estabelecido entre o cliente e a respetiva Loja Parceira, salvo situações em que o Bazarixy seja expressamente indicado como vendedor direto.",
    ],
  },
  {
    id: "6",
    title: "6. PAGAMENTOS",
    paragraphs: [
      "6.1 O Bazarixy disponibiliza diferentes métodos de pagamento conforme a disponibilidade técnica e comercial da plataforma.",
      "6.2 Pagamentos realizados por transferência bancária ou serviços como Multicaixa Express, Unitel Money, PayPay ou outros meios similares poderão exigir validação manual antes da confirmação definitiva do pedido.",
      "6.3 O Bazarixy poderá recusar ou suspender transações quando existirem indícios de fraude, irregularidade ou violação das políticas da plataforma.",
    ],
  },
  {
    id: "7",
    title: "7. ENTREGA DOS PRODUTOS",
    paragraphs: [
      "7.1 As condições de entrega serão apresentadas ao cliente no momento da compra.",
      "7.2 A entrega poderá ser realizada diretamente pelo Bazarixy, pela Loja Parceira ou por operadores logísticos autorizados.",
      "7.3 Prazos de entrega podem variar conforme localização, disponibilidade do produto, transportadora e fatores externos.",
      "7.4 O cliente deverá fornecer informações corretas para entrega, sendo responsável por eventuais consequências resultantes de dados incorretos.",
    ],
  },
  {
    id: "8",
    title: "8. RESPONSABILIDADES DO BAZARIXY",
    paragraphs: [
      "O Bazarixy compromete-se a:",
      "a) Manter a plataforma funcional e acessível dentro dos limites técnicos possíveis;",
      "b) Implementar medidas razoáveis de segurança para proteção da plataforma e dos utilizadores;",
      "c) Disponibilizar canais de suporte;",
      "d) Promover um ambiente comercial organizado e seguro.",
      "O Bazarixy não garante que a plataforma estará livre de interrupções, falhas técnicas ou indisponibilidades temporárias decorrentes de manutenção, atualizações ou fatores externos.",
    ],
  },
  {
    id: "9",
    title: "9. RESPONSABILIDADES DAS LOJAS PARCEIRAS",
    paragraphs: [
      "As Lojas Parceiras são exclusivamente responsáveis por:",
      "a) Legalidade dos produtos disponibilizados;",
      "b) Veracidade das informações publicadas;",
      "c) Existência e disponibilidade dos produtos;",
      "d) Cumprimento das obrigações comerciais relacionadas às vendas;",
      "e) Garantias fornecidas pelos fabricantes ou fornecedores;",
      "f) Cumprimento das normas aplicáveis aos produtos comercializados.",
    ],
  },
  {
    id: "10",
    title: "10. GARANTIAS, TROCAS E DEVOLUÇÕES",
    paragraphs: [
      "10.1 Pedidos relacionados a defeitos, trocas ou devoluções deverão seguir a Política de Trocas e Devoluções do Bazarixy e as regras aplicáveis ao produto adquirido.",
      "10.2 O cliente deverá apresentar informações suficientes para análise do pedido, incluindo número da compra, descrição do problema e, quando solicitado, imagens ou documentos.",
      "10.3 O Bazarixy poderá atuar como intermediador para facilitar a comunicação entre cliente e Loja Parceira.",
    ],
  },
  {
    id: "11",
    title: "11. CONDUTAS PROIBIDAS",
    list: [
      "Comercializar produtos ilegais;",
      "Publicar informações falsas;",
      "Praticar fraude;",
      "Violar direitos de propriedade intelectual;",
      "Tentar comprometer a segurança dos sistemas;",
      "Utilizar a plataforma para fins contrários à legislação aplicável.",
    ],
    paragraphs: ["É proibido utilizar a plataforma para:"],
  },
  {
    id: "12",
    title: "12. PROPRIEDADE INTELECTUAL",
    paragraphs: [
      "Todos os elementos pertencentes ao Bazarixy, incluindo marca, nome comercial, logotipo, interface, código, funcionalidades, conteúdos e identidade visual, são propriedade exclusiva do Bazarixy ou utilizados mediante autorização.",
      "É proibida qualquer reprodução, alteração ou utilização sem autorização prévia.",
    ],
  },
  {
    id: "13",
    title: "13. PRIVACIDADE E PROTEÇÃO DE DADOS",
    paragraphs: [
      "13.1 O Bazarixy recolhe e trata dados pessoais necessários para funcionamento da plataforma, incluindo:",
      "- Criação de contas;",
      "- Processamento de pedidos;",
      "- Entregas;",
      "- Comunicação;",
      "- Segurança;",
      "- Melhoria dos serviços.",
      "13.2 O Bazarixy compromete-se a tratar os dados dos utilizadores de forma confidencial e aplicar medidas adequadas de proteção.",
    ],
  },
  {
    id: "14",
    title: "14. ALTERAÇÃO DOS TERMOS",
    paragraphs: [
      "O Bazarixy poderá modificar estes Termos sempre que necessário devido a alterações legais, evolução dos serviços ou melhorias da plataforma.",
      "A versão atualizada estará sempre disponível na plataforma.",
    ],
  },
  {
    id: "15",
    title: "15. LEGISLAÇÃO APLICÁVEL",
    paragraphs: [
      "Os presentes Termos são regulados pela legislação vigente na República de Angola.",
      "Qualquer conflito relacionado com a utilização da plataforma deverá ser resolvido preferencialmente através dos canais de suporte do Bazarixy.",
      "Não sendo possível uma resolução amigável, será competente o foro de Luanda, salvo disposição legal em contrário.",
    ],
  },
];

function TermsPage() {
  return (
    <Layout
      title="Termos e Condições"
      showBack
      hideHeader
      hideBottomNav
      hideTopNav
    >
      <article className="mx-auto w-full max-w-[980px] bg-white px-4 py-6 text-slate-800 md:px-10 md:py-10">
        <header className="border-b border-slate-200 pb-6 text-center md:pb-8">
          <div className="flex justify-center">
            <img
              src={logoAsset.url}
              alt="Bazarixy"
              className="h-20 w-auto object-contain md:h-24"
            />
          </div>

          <h1 className="mt-6 font-display text-2xl font-black leading-tight text-slate-900 md:text-4xl">
            Termos e Condições de Utilização da Plataforma Bazarixy
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
            Contactos oficiais
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
                <Handshake className="h-5 w-5" />
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
            to="/support"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-strong"
          >
            Falar com o suporte
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/trocas-devolucoes"
            className="text-sm font-bold text-brand-strong underline-offset-4 hover:underline"
          >
            Política de Trocas e Devoluções
          </Link>
          <span className="text-sm text-slate-500">
            Estas condições podem ser atualizadas com aviso na plataforma.
          </span>
        </div>
      </article>
    </Layout>
  );
}
