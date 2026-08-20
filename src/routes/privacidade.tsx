import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import logoAsset from "@/assets/bazarixy-logo.webp.asset.json";
import { ShieldCheck, Mail, LockKeyhole, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Bazarixy" },
      { name: "description", content: "Política de privacidade da plataforma Bazarixy, incluindo recolha, utilização, proteção e partilha de dados pessoais." },
      { property: "og:title", content: "Política de Privacidade — Bazarixy" },
      { property: "og:description", content: "Como o Bazarixy recolhe, utiliza, protege e partilha os dados dos utilizadores." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

const sections: { id: string; title: string; paragraphs: string[]; list?: string[] }[] = [
  {
    id: "1",
    title: "1. INTRODUÇÃO",
    paragraphs: [
      "O Bazarixy valoriza a privacidade e a proteção dos dados pessoais dos seus utilizadores.",
      "A presente Política de Privacidade descreve como o Bazarixy recolhe, utiliza, armazena e protege as informações pessoais dos utilizadores que acedem ou utilizam a plataforma digital Bazarixy.",
      "Ao utilizar os serviços do Bazarixy, o utilizador declara estar informado sobre as práticas descritas nesta Política de Privacidade.",
    ],
  },
  {
    id: "2",
    title: "2. RESPONSÁVEL PELO TRATAMENTO DOS DADOS",
    paragraphs: [
      "O responsável pelo tratamento dos dados pessoais recolhidos através da plataforma Bazarixy é o próprio Bazarixy, enquanto entidade responsável pela operação e gestão dos seus serviços digitais.",
      "Para questões relacionadas com privacidade e proteção de dados, pode contactar-nos através do email suporte@bazarixy.com.",
    ],
  },
  {
    id: "3",
    title: "3. DADOS QUE RECOLHEMOS",
    paragraphs: [
      "Dependendo da utilização da plataforma, o Bazarixy poderá recolher diferentes tipos de informações, incluindo:",
      "3.1 Dados de cadastro — nome completo, número de telefone, endereço de email, palavra-passe protegida através de mecanismos de segurança e informações necessárias para criação e gestão da conta.",
      "3.2 Dados de compra — produtos adquiridos, histórico de pedidos, morada ou informações necessárias para entrega, informações relacionadas com pagamentos.",
      "3.3 Dados fornecidos às lojas parceiras — quando necessário para concluir uma compra, determinadas informações poderão ser partilhadas com a Loja Parceira responsável pelo produto, exclusivamente para processamento do pedido, entrega ou suporte relacionado.",
      "3.4 Dados técnicos — endereço IP, tipo de dispositivo, sistema operativo, dados de navegação e registos de utilização da plataforma.",
    ],
  },
  {
    id: "4",
    title: "4. COMO UTILIZAMOS OS SEUS DADOS",
    paragraphs: [
      "O Bazarixy utiliza os dados recolhidos para:",
      "a) Criar e gerir contas de utilizadores;",
      "b) Processar compras e pedidos;",
      "c) Permitir entregas e comunicação relacionada aos pedidos;",
      "d) Prestar suporte ao cliente;",
      "e) Melhorar a segurança e funcionamento da plataforma;",
      "f) Prevenir fraudes, abusos e utilizações indevidas;",
      "g) Personalizar a experiência do utilizador;",
      "h) Enviar comunicações relacionadas com serviços, promoções e novidades, quando autorizado.",
    ],
  },
  {
    id: "5",
    title: "5. PARTILHA DE DADOS",
    paragraphs: [
      "O Bazarixy não vende, aluga ou comercializa os dados pessoais dos seus utilizadores.",
      "Os dados poderão ser partilhados apenas quando necessário para:",
      "5.1 Lojas Parceiras — informações essenciais poderão ser disponibilizadas às lojas responsáveis pelos produtos adquiridos, exclusivamente para cumprimento da compra, preparação e suporte do pedido.",
      "5.2 Parceiros de serviços — poderão existir parceiros tecnológicos ou operacionais que auxiliem o funcionamento da plataforma, tais como serviços de pagamento, armazenamento, entrega e segurança tecnológica. Estes parceiros deverão utilizar os dados apenas para finalidades relacionadas com os serviços prestados.",
      "5.3 Obrigações legais — o Bazarixy poderá divulgar informações quando exigido por lei, autoridades competentes ou processos legais válidos.",
    ],
  },
  {
    id: "6",
    title: "6. SEGURANÇA DOS DADOS",
    paragraphs: [
      "O Bazarixy aplica medidas técnicas e organizacionais destinadas a proteger os dados dos utilizadores contra acesso não autorizado, perda, alteração indevida, divulgação não autorizada e utilização abusiva.",
      "Apesar dos esforços de segurança, nenhum sistema digital pode garantir proteção absoluta contra todos os riscos existentes na internet.",
    ],
  },
  {
    id: "7",
    title: "7. PAGAMENTOS E COMPROVATIVOS",
    paragraphs: [
      "Quando o utilizador realiza pagamentos através de métodos como Multicaixa Express, Unitel Money, PayPay ou outros meios disponíveis, os dados necessários para validação da transação poderão ser tratados pelo Bazarixy.",
      "Comprovativos de pagamento enviados pelo utilizador serão utilizados exclusivamente para confirmação da compra e prevenção de fraudes.",
    ],
  },
  {
    id: "8",
    title: "8. COOKIES E TECNOLOGIAS SEMELHANTES",
    paragraphs: [
      "O Bazarixy poderá utilizar cookies e tecnologias semelhantes para melhorar o funcionamento da plataforma, guardar preferências do utilizador, analisar a utilização dos serviços e melhorar a experiência de navegação.",
      "O utilizador poderá controlar ou limitar cookies através das configurações do seu navegador.",
    ],
  },
  {
    id: "9",
    title: "9. ARMAZENAMENTO DOS DADOS",
    paragraphs: [
      "Os dados pessoais serão armazenados pelo período necessário para cumprir as finalidades para as quais foram recolhidos, incluindo obrigações legais, resolução de conflitos e segurança da plataforma.",
      "Após esse período, os dados poderão ser eliminados ou anonimizados.",
    ],
  },
  {
    id: "10",
    title: "10. DIREITOS DO UTILIZADOR",
    paragraphs: [
      "O utilizador poderá solicitar, conforme aplicável:",
      "- Acesso aos seus dados pessoais;",
      "- Correção de informações incorretas;",
      "- Atualização dos seus dados;",
      "- Eliminação da conta;",
      "- Esclarecimentos sobre utilização dos dados.",
      "Os pedidos deverão ser enviados através dos canais oficiais do Bazarixy.",
    ],
  },
  {
    id: "11",
    title: "11. PROTEÇÃO DE MENORES",
    paragraphs: [
      "A plataforma Bazarixy não é destinada a utilizadores que não possuam capacidade legal para realizar compras sem autorização dos seus responsáveis.",
      "Caso sejam identificados dados recolhidos indevidamente de menores, o Bazarixy poderá tomar medidas para eliminar essas informações.",
    ],
  },
  {
    id: "12",
    title: "12. ALTERAÇÕES A ESTA POLÍTICA",
    paragraphs: [
      "O Bazarixy poderá atualizar esta Política de Privacidade sempre que necessário para refletir mudanças nos serviços, tecnologias utilizadas ou requisitos legais.",
      "A versão atualizada estará sempre disponível na plataforma.",
    ],
  },
  {
    id: "13",
    title: "13. CONTACTO",
    paragraphs: [
      "Para dúvidas, pedidos ou informações relacionadas com privacidade:",
      "Bazarixy",
      "suporte@bazarixy.com",
      "parcerias@bazarixy.com",
    ],
  },
];

function PrivacyPage() {
  return (
    <Layout title="Política de Privacidade" showBack hideHeader hideBottomNav hideTopNav>
      <article className="mx-auto w-full max-w-[980px] bg-white px-4 py-6 text-slate-800 md:px-10 md:py-10">
        <header className="border-b border-slate-200 pb-6 text-center md:pb-8">
          <div className="flex justify-center">
            <img src={logoAsset.url} alt="Bazarixy" className="h-20 w-auto object-contain md:h-24" />
          </div>

          <h1 className="mt-6 font-display text-2xl font-black leading-tight text-slate-900 md:text-4xl">
            Política de Privacidade
          </h1>

          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            <ShieldCheck className="h-4 w-4 text-brand-strong" />
            Última atualização: Agosto de 2026
          </div>
        </header>

        <div className="py-6 md:py-8">
          {sections.map((section) => (
            <section key={section.id} className="scroll-mt-20 border-b border-slate-200 py-6 last:border-b-0 first:pt-0">
              <h2 className="text-center font-display text-lg font-black tracking-tight text-slate-900 md:text-xl">{section.title}</h2>

              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.id}-${index}`} className="mt-3 text-[15px] leading-8 text-slate-700">
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul className="mt-3 space-y-2 pl-5 text-[15px] leading-8 text-slate-700">
                  {section.list.map((item) => (
                    <li key={item} className="list-disc marker:text-brand-strong">{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="border-t border-slate-200 pt-6">
          <h3 className="font-display text-xl font-black text-slate-900">Contacto</h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <a href="mailto:suporte@bazarixy.com" className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-brand-strong ring-1 ring-slate-200">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Suporte</span>
                <span className="text-sm font-medium text-slate-800">suporte@bazarixy.com</span>
              </div>
            </a>

            <a href="mailto:parcerias@bazarixy.com" className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-brand-strong ring-1 ring-slate-200">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Parcerias</span>
                <span className="text-sm font-medium text-slate-800">parcerias@bazarixy.com</span>
              </div>
            </a>
          </div>
        </section>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-slate-200 pt-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <Link to="/termos" className="inline-flex items-center gap-2 text-sm font-bold text-brand-strong">
            Ler termos e condições
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/trocas-devolucoes" className="text-sm font-bold text-brand-strong underline-offset-4 hover:underline">
            Política de Trocas e Devoluções
          </Link>
          <Link to="/support" className="text-sm font-medium text-brand-strong underline-offset-4 hover:underline">
            Falar com o suporte
          </Link>
        </div>
      </article>
    </Layout>
  );
}
