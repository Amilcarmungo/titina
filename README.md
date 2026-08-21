# Bazarixy

> **Acelera o teu mundo.**

O **Bazarixy** é uma plataforma de comércio eletrónico criada para facilitar a descoberta, comparação e compra de produtos através de uma experiência moderna, rápida e intuitiva.

A plataforma conecta consumidores a **lojas verificadas**, oferecendo um ambiente digital pensado para tornar as compras online mais simples, seguras e acessíveis.

---

## 🛍️ Sobre o Bazarixy

O Bazarixy foi desenvolvido para transformar a forma como as pessoas descobrem e compram produtos.

Em vez de procurar produtos em vários lugares, o utilizador pode explorar diferentes categorias, descobrir ofertas, consultar detalhes dos produtos e realizar as suas compras dentro de uma única plataforma.

### Principais objetivos

- Facilitar a descoberta de produtos
- Conectar consumidores a lojas verificadas
- Criar uma experiência de compra moderna
- Tornar o comércio eletrónico mais acessível
- Oferecer uma plataforma rápida e intuitiva
- Criar confiança entre compradores e lojas

---

## ✨ Funcionalidades

### 🛒 Compras

- Catálogo de produtos
- Categorias de produtos
- Pesquisa de produtos
- Página detalhada do produto
- Galeria com múltiplas imagens
- Seleção de variantes
- Produtos relacionados
- Carrinho de compras
- Gestão de encomendas
- Confirmação de encomendas

### 🏪 Lojas

- Lojas verificadas
- Perfis de lojas
- Catálogo por loja
- Informações da loja
- Sistema de reputação
- Comunicação entre utilizador e loja

### 👤 Conta

- Criação de conta
- Login
- Login com Google
- Recuperação de palavra-passe
- Verificação de conta
- Gestão do perfil
- Histórico de encomendas

### ❤️ Experiência

- Produtos favoritos
- Notificações
- Promoções
- Banners promocionais
- Feed de descoberta
- Interface responsiva
- Experiência otimizada para dispositivos móveis

### 💰 Carteira

- Carteira digital
- Carregamento de saldo
- Pagamentos através da plataforma
- Gestão de transações
- Levantamentos, quando disponíveis

---

## 🎨 Design e experiência

O Bazarixy foi desenvolvido com foco em uma experiência visual moderna e intuitiva.

A interface procura combinar:

- Design limpo
- Navegação simples
- Banners promocionais
- Cards de produtos modernos
- Imagens de alta qualidade
- Hierarquia visual clara
- Carregamento progressivo
- Skeleton loading
- Layout responsivo
- Experiência mobile-first

A inspiração vem das melhores práticas utilizadas por grandes plataformas de comércio eletrónico, mantendo uma **identidade visual própria para o Bazarixy**.

---

## 🔐 Segurança

A segurança da plataforma é uma das prioridades do projeto.

O Bazarixy utiliza mecanismos para proteger contas, dados e operações, incluindo:

- Autenticação de utilizadores
- Verificação de contas
- Regras de segurança
- Controlo de acesso
- Validação de operações
- Gestão de permissões
- Proteção de dados
- Armazenamento seguro de ficheiros

---

## 🚀 Tecnologias

O projeto utiliza tecnologias modernas para garantir desempenho, escalabilidade e facilidade de manutenção.

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend e infraestrutura

- Firebase
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Vercel

### Comunicação

- Resend

## Configurar e-mails e suporte com IA

As chaves abaixo são usadas apenas no servidor. Nunca coloque
`RESEND_API_KEY`, `LOVABLE_API_KEY` ou qualquer chave secreta num componente
React, numa variável iniciada por `VITE_` ou no Git.

### Desenvolvimento local

1. Copie `.env.example` para `.env`.
2. Preencha `RESEND_API_KEY` com uma chave criada no [Resend](https://resend.com/api-keys).
3. No Resend, verifique `mail.bazarixy.com`; depois use `Bazarixy <notificacoes@mail.bazarixy.com>` em `EMAIL_FROM`.
4. Preencha `LOVABLE_API_KEY` com a chave do AI Gateway da Lovable. O suporte usa Gemini através desse gateway.
5. Reinicie o servidor depois de alterar o `.env`.

O Resend já envia o código de verificação, a confirmação da compra e as
notificações de alteração do estado do pedido. O endpoint interno é
`POST /api/email` e exige autenticação Firebase.

### Produção

Adicione as mesmas variáveis no painel de Environment Variables da plataforma
onde a aplicação está publicada. Para Cloudflare/Wrangler, use secrets:

```sh
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put LOVABLE_API_KEY
```

`EMAIL_FROM` pode ser uma variável normal, desde que `mail.bazarixy.com` esteja
verificado no Resend. Depois de alterar secrets, faça um novo deploy. Sem
`RESEND_API_KEY`, os e-mails não são enviados; sem `LOVABLE_API_KEY`, o suporte
continua disponível com respostas locais.

---

## 🏗️ Arquitetura

A aplicação utiliza uma arquitetura moderna baseada em frontend web, serviços cloud e APIs.

```text
                    ┌─────────────────────┐
                    │      Bazarixy       │
                    │   Web Application   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Authentication     Firestore        Storage
          Firebase         Database          Firebase
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                          Vercel
                               │
                               ▼
                            Resend
