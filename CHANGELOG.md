# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

---

## [0.11.0] — 2026-07-22

### Adicionado

- **AnimatedSection** (`components/dashboard/AnimatedSection.tsx`) — fadeInUp com IntersectionObserver, delay sequencial e callback `onVisible` para re-trigger de animações
- **Dashboard scroll animations** — cada seção do dashboard anima em sequência (100, 300, 500, 700, 900ms); seções abaixo da dobra só disparam via scroll
- **Analytics badge no avatar** — botão redondo com ícone `bar-chart` posicionado a 45° (1:30) na borda da foto, neon glow, hover idêntico aos sociais, link `/dashboard`
- **Ícone `bar-chart` e `globe`** em `lib/icons.ts`
- **Portfólio e Lattes** nos SocialIcons com ícones `globe` e `book-open`

### Alterado

- **SocialIcons.tsx** — WhatsApp corrigido de `message-circle` para `whatsapp`; adicionados Portfólio e Lattes
- **page.tsx** — SocialIcons movido para depois de LocationCard; link "📊 Analytics" removido (agora no avatar)
- **ProfileHeader.tsx** — `"use client"`; avatar envolto em `<a>` ao GitHub com neon glow + overlay GitHub no hover; `object-[center_55%]`; bio `whitespace-nowrap`; Analytics badge com `key` re-trigger
- **Footer.tsx** — "Todos os direitos reservados" quebra via `<br class="hidden sm:block" />`
- **ClicksChart.tsx** — `animationDuration` 2000ms; `key` re-renderiza gráfico quando `visible` muda
- **LinksChart.tsx** — `animationDuration` 1500ms; `key` re-renderiza gráfico quando `visible` muda
- **StatCard.tsx** — removido `animate-fade-in-up` (AnimatedSection gerencia)
- **dashboard/page.tsx** — seções envolvidas em AnimatedSection com delays + `observeVisibility` + `onVisible`

## [0.10.0] — 2026-07-22

### Adicionado

- **CRT power-on effect** (`CrtOverlay.tsx`) — flash branco + scanlines + wobble, reproduz uma vez por sessão via `sessionStorage`
- **Neon glow** nos botões (`LinkButton.tsx`) — `box-shadow` multi-camada hsla(212, 75%, 55%) que intensifica no hover
- **Social Icons** (`SocialIcons.tsx`) — LinkedIn, GitHub, Instagram, WhatsApp em círculos com neon glow no hover
- **Location Card** (`LocationCard.tsx`) — endereço + iframe OpenStreetMap com filtro modo escuro + link Google Maps
- **Animação Instagram Feed** (`InstagramFeed.tsx`) — stagger `fadeInUp` com `animationDelay: i * 80ms`
- **Dashboard animações** — `ClicksChart.tsx` (animationDuration 1500, ease-out), `LinksChart.tsx` (animationDuration 1000, ease-out), `StatCard.tsx` (fadeInUp)
- **Avatar linkável para GitHub** (`ProfileHeader.tsx`) — foto envolta em `<a>` com neon glow + overlay com ícone GitHub no hover
- **Animações globais** (`globals.css`) — @keyframes CRT flash, scanlines, wobble, fadeInUp, fadeIn

### Alterado

- **page.tsx** — `SocialIcons` posicionado após `LocationCard` (antes do Analytics); `LocationCard` adicionado após InstagramFeed
- **layout.tsx** — `<CrtOverlay />` incluído no body
- **ProfileHeader.tsx** — `"use client"` para eventos hover; `object-[center_55%]` para centralizar rosto no círculo; bio com `whitespace-nowrap` + `text-xs sm:text-sm` para manter em uma linha
- **Footer.tsx** — "Todos os direitos reservados" quebra para nova linha em desktop via `<br class="hidden sm:block" />`
- **InstagramFeed.tsx** — adicionado `unoptimized` no `<Image>` para compatibilidade com placehold.co (SVG)

## [0.9.0] — 2026-07-22

### Adicionado

- **Footer global** com assinatura "Produzido por" + `assinatura-lucas.png` no layout
- **Botão "📊 Analytics"** na página inicial, linkando para `/dashboard`
- **Avatar local** em `public/images/foto-perfil.webp` (substitui URL externa do portfólio)
- `docs/REF-FOOTER-ASSINATURA.md` movido da raiz para documentação

## [0.8.0] — 2026-07-22

### Adicionado

- **Dashboard Analytics** (`/dashboard`) com 4 métricas, gráficos Recharts e tabelas
- **6 APIs de dados**: `stats`, `clicks`, `links`, `referrers`, `recent`, `auth`
- **Login condicional**: sem `DASHBOARD_PASSWORD`, dashboard aberto; com senha, exige login
- `lib/dashboard-auth.ts` — pbkdf2 + cookie para sessão
- `lib/dashboard-api.ts` — queries agregadas ao Supabase
- `lib/icons.ts` — paths SVG extraídos de `LinkButton.tsx`
- `app/error.tsx` — error boundary customizado
- `app/not-found.tsx` — página 404 customizada
- `app/sitemap.ts` — sitemap.xml
- `public/robots.txt` — instruções para crawlers
- `scripts/analytics_pipeline.py` — pipeline Python de agregação

### Alterado

- **`<img>` → `next/image`** no `ProfileHeader` e `InstagramFeed`
- **LinkButton.tsx** — SVGs importam de `lib/icons.ts`; adicionado `aria-hidden`, `focus-visible`, `aria-label`
- **layout.tsx** — OG tags, Twitter card, theme-color, metadataBase, robots
- **InstagramFeed.tsx** — `next/image`, `alt` fallback, `console.warn` no catch
- **lib/shortener.ts** — logging em catch blocks
- **lib/instagram.ts** — logging no catch, validação de URL no `fetchFromSupabase`
- **Instagram mock** (`instagram_posts_mock`) — URLs reais no seed.sql
- **tsconfig.json** — `noUncheckedIndexedAccess` ativado
- **.env.example** — removido `NEXT_PUBLIC_SUPABASE_ANON_KEY` (não usado), adicionado `DASHBOARD_PASSWORD`
- **next.config.ts** — `remotePatterns` configurado

### Corrigido

- **Ícone WhatsApp** — adicionado path `message-circle` em `lib/icons.ts` (estava sem fallback)
- **Instagram feed** — valida URLs do Supabase com `new URL()` para ignorar placeholders

## [0.7.0] — 2026-07-21

### Adicionado
- Conteúdo real do portfolio (bio, links, avatar)
- Paleta Corporate Blue com variáveis CSS HSL
- Ícones LinkedIn, GitHub, briefcase, book-open, message-circle

### Removido
- Botão "Site" dos links

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

## [0.6.0] — 2026-07-20

### Adicionado

- **Integração real Meta Graph API**: token e account ID da `cavalcanteprofissional` (MEDIA_CREATOR)
- `lib/instagram.ts` ajustado para `graph.instagram.com` (compatível com contas Creator)

### Alterado

- `lib/instagram.ts`: fallback agora ocorre mesmo quando API retorna 0 posts (antes só em erro HTTP)
- `lib/instagram.ts`: logs detalhados em dev (API retornou X posts, fallback ativado, etc.)
- `.env.local`: `INSTAGRAM_ACCESS_TOKEN` + `INSTAGRAM_BUSINESS_ACCOUNT_ID` adicionados

### Comportamento

1. Token presente → API real (`graph.instagram.com/me/media`)
2. API retorna 0 posts → fallback Supabase (`instagram_posts_mock`)
3. Sem Supabase → fallback `config/instagram-mock.config.ts`
4. Tudo vazio → array vazio (sem quebras)

### Validação

- `/api/instagram` → 200 + `source: "mock"` + 3 posts do Supabase
- Fallback funcional com token real ativo mas conta sem posts

### Pendente para próximas versões

- [ ] Deploy inicial na Vercel (manual)
- [ ] Ajustes finos mobile-first (Etapa 8)
- [ ] Pipeline Python de agregação (Etapa 10)
