# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] — 2026-07-20

### Adicionado

- **ProfileHeader** — avatar com iniciais (fallback se sem imagem), nome e bio
- **LinkButton** — botão de link com ícone SVG inline, hover state (sky-400), altura 48px (acessível)
- **Página Linktree dinâmica** — consome `links.config.ts` e renderiza ProfileHeader + LinkButton
- **`config/shortener-static.config.ts`** — mapa estático `short_code → URL` para fallback do encurtador

### Alterado

- `config/links.config.ts` populado com 4 links (Instagram, WhatsApp, Portfólio, + placeholder extra)
- `app/page.tsx` refatorado para usar `@/components/ProfileHeader` e `@/components/LinkButton`
- `scripts/validate.mjs` atualizado para testar Etapa 2 (link buttons, ausência de skeletons)

### Validação

- Build limpo com TypeScript check
- Playwright: 4 link buttons renderizados em mobile e desktop, h1 ok, dark mode ok, 0 skeletons

## [0.1.0] — 2026-07-20

### Adicionado

- **Scaffold do projeto** com Next.js 16.2.10 (App Router), TypeScript, Tailwind v4
- **Dark mode** como padrão (classe `dark` no `<html>`, fundo slate-900, texto slate-50)
- **Página principal** (`/`): avatar placeholder com iniciais "LC", título "LinkTree Cavalcante", bio placeholder, skeletons para links futuros
- **Estrutura de pastas** completa seguindo a arquitetura do `SKILL.md`:
  - `components/` — ProfileHeader, LinkButton, InstagramFeed (placeholders)
  - `config/` — links.config.ts, instagram-mock.config.ts (tipados)
  - `lib/` — supabase.ts, instagram.ts, shortener.ts (com lógica de fallback)
  - `supabase/` — schema.sql, rls.sql, seed.sql (prontos para criar o banco)
  - `scripts/` — analytics_pipeline.py (placeholder)
- **Validação com Playwright**: build limpo, screenshots mobile (375×812) e desktop (1280×800), testes de DOM automatizados

### Infraestrutura

- Configuração do **MCP GitHub global** em `~/.config/opencode/opencode.json` (disponível em todos os projetos)
- `GITHUB_TOKEN` configurado como variável de ambiente persistente do Windows (User scope)
- `opencode.json` local removido (sem segredo no repositório)

- Dependências: `next`, `react`, `react-dom`, `@supabase/supabase-js`, `tailwindcss`
- DevDependencies: `typescript`, `@types/node`, `@types/react`, `eslint`, `playwright`
- `.env.example` com variáveis para Supabase, Instagram e domínio do encurtador
- `CONTENT.md` para separação entre instruções técnicas (SKILL.md) e conteúdo real

## [0.4.0] — 2026-07-20

### Adicionado

- **Projeto Supabase `linktree-cavalcante`** criado (ref: `ezcrzdbfdxchqpckrfan`)
- **SQLs aplicados**: `schema.sql` → `rls.sql` → `seed.sql` (4 tabelas + RLS + seed data)
- **`.env.local`** com `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`
- Config global MCP atualizado com novo `project_ref`

### Analytics — Real vs Fallback

- Com `.env.local`: `/api/analytics` → `source: "supabase"`, registra em `link_clicks` ✅
- Sem `.env.local`: `/api/analytics` → `source: "noop"`, sem depender de BD ✅
- `lib/shortener.ts` com Supabase: busca em DB → fallback `staticShortLinks`

### Validação

- Redirect `/portfolio` registrou clique real no Supabase
- `link_clicks` populada com 2 entradas do teste + 3 do seed

## [0.3.0] — 2026-07-20

### Adicionado

- **Rota `/[shortcode]`** — resolve shortcodes via Supabase (se configurado) ou mapa estático `shortener-static.config.ts`
- **Redirect 302** para shortcodes conhecidos; **redirect 307** para home quando desconhecido
- **Analytics fire-and-forget** — POST assíncrono para `/api/analytics` sem bloquear o usuário
- **Endpoint `/api/analytics`** — registra clique no Supabase (se configurado) ou retorna `{ ok: true, source: "noop" }`

### Alterado

- `lib/shortener.ts` agora importa `staticShortLinks` do config e implementa a lógica completa de resolução (DB → estático → null)

### Validação

- Playwright: `/portfolio` → 302 + `Location: cavalcanteprofissional.github.io`
- Playwright: `/unknown404` → 307 + `Location: localhost:3099/`
- Playwright: `POST /api/analytics` → 200 + `{ ok: true, source: "noop" }`

## [0.5.0] — 2026-07-20

### Adicionado

- **`lib/instagram.ts`** — lógica completa: tenta Meta Graph API → Supabase mock → config estático (3 níveis de fallback)
- **`app/api/instagram/route.ts`** — GET `/api/instagram` com `revalidate: 1800` (30 min cache)
- **`components/InstagramFeed.tsx`** — grid 3 colunas, loading com skeleton, hover com caption, cliente-side fetch
- **`config/instagram-mock.config.ts`** — 3 posts placeholder (imagens `placehold.co`)

### Alterado

- `app/page.tsx` — `<InstagramFeed />` adicionado abaixo dos links

### Validação

- `/api/instagram` → 200 + `source: "mock"` + 3 posts retornados
- Mobile: feed visível, 3 imagens renderizadas
- Desktop: screenshot com feed completo

### Pendente para próximas versões

- [ ] Deploy inicial na Vercel (manual)
- [ ] Integração Meta Graph API (Etapa 7)
- [ ] Pipeline Python de agregação (Etapa 10)
