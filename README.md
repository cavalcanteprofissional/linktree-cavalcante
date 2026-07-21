# 🌐 LinkTree Cavalcante

Uma landing page pessoal estilo Linktree — moderna, mobile-first e com superpoderes:

- 🔗 **Links personalizados** organizados em um único lugar
- ✂️ **Encurtador de URL no domínio próprio** (`link.seudominio.com/abc123`)
- 📸 **Feed do Instagram dinâmico** (com fallback quando a API falha)
- 📊 **Analytics de cliques** (opcional, sem depender de serviços externos)

---

## 🚀 Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Estilização | Tailwind v4 + Dark Mode |
| Banco (opcional) | Supabase (Postgres) |
| Deploy | Vercel (free tier) |
| Testes | Playwright |

> O Supabase é **opcional** — o site funciona perfeitamente sem ele em modo fallback. Use-o apenas se quiser analytics de cliques e armazenamento de posts mockados do Instagram.

---

## 📁 Estrutura do Projeto

```
├── app/                    # Rotas do Next.js (App Router)
│   ├── page.tsx            # Página principal (Linktree)
│   ├── layout.tsx          # Layout global com dark mode
│   └── globals.css         # Estilos globais + Tailwind
├── components/             # Componentes reutilizáveis
│   ├── ProfileHeader.tsx   # Avatar + bio
│   ├── LinkButton.tsx      # Botão de link
│   └── InstagramFeed.tsx   # Grid de posts do Instagram
├── config/                 # Configurações e conteúdo
│   ├── links.config.ts     # Lista de links do perfil
│   └── instagram-mock.config.ts  # Posts mockados (fallback)
├── lib/                    # Lógica de negócio
│   ├── supabase.ts         # Cliente Supabase (server-side)
│   ├── instagram.ts        # Wrapper da API do Instagram
│   └── shortener.ts        # Resolução de short codes
├── supabase/               # Scripts SQL do banco
│   ├── schema.sql          # Criação das tabelas
│   ├── rls.sql             # Políticas de segurança
│   └── seed.sql            # Dados de exemplo
├── scripts/                # Utilitários
│   └── analytics_pipeline.py  # Pipeline de agregação (Python)
├── SKILL.md                # Instruções técnicas detalhadas
├── CONTENT.md              # Conteúdo real (preencha aqui!)
├── CHANGELOG.md            # Histórico de versões
├── TODO.md                 # Próximos passos
└── .env.example            # Variáveis de ambiente
```

---

## 🛠️ Começando

### Pré-requisitos

- Node.js 18+
- npm

### Instalar

```bash
git clone <seu-repo>
cd linktree_cavalcante
npm install
```

### Rodar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build para produção

```bash
npm run build
npm start
```

---

## 🔧 Configuração

### 1. Conteúdo do perfil

Edite o arquivo **`CONTENT.md`** com suas informações reais (bio, links, avatar, etc).

Depois, preencha **`config/links.config.ts`** com seus links:

```ts
export const links = [
  { label: "Instagram", url: "https://instagram.com/seuperfil" },
  { label: "WhatsApp", url: "https://wa.me/5511999999999" },
  { label: "Portfólio", url: "https://seuportfolio.com" },
];
```

### 2. Variáveis de ambiente (opcional)

Copie `.env.example` para `.env.local` e preencha se quiser usar Supabase e/ou Instagram real:

```bash
cp .env.example .env.local
```

Todas as variáveis são **opcionais** — o site funciona sem elas usando fallbacks.

### 3. Banco de dados (opcional)

Se for usar Supabase:
1. Crie um projeto gratuito em [supabase.com](https://supabase.com)
2. Rode os scripts na ordem: `schema.sql` → `rls.sql` → `seed.sql`
3. Copie as credenciais para `.env.local`

### 4. Instagram (opcional)

Se for usar o feed real do Instagram:
1. Obtenha um token de acesso de longa duração da Meta Graph API
2. Pegue seu Instagram Business Account ID
3. Preencha `INSTAGRAM_ACCESS_TOKEN` e `INSTAGRAM_BUSINESS_ACCOUNT_ID` no `.env.local`

> Sem token, o feed usa posts mockados definidos em `config/instagram-mock.config.ts`.

---

## 🧪 Testes

```bash
# Rodar validação com Playwright
node scripts/validate.mjs
```

Os screenshots são salvos em `.validation/`.

---

## 🌍 Deploy na Vercel

1. Faça o build local: `npm run build`
2. Crie um repositório no GitHub e faça push
3. Acesse [vercel.com](https://vercel.com) e importe o repositório
4. Configure as variáveis de ambiente no painel da Vercel (Production + Preview)
5. Pronto! Seu LinkTree está no ar 🎉

---

## 📄 Licença

Este projeto é de uso pessoal. Sinta-se à vontade para se inspirar e adaptar.
