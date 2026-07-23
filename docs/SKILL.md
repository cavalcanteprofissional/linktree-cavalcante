# SKILL.md — Linktree-Style Site com Encurtador de URL e Feed Instagram

> Instruções para o assistente de IA (opencode) construir de forma autônoma um site estilo Linktree, mobile-first, com encurtador de URL no domínio próprio (analytics opcional via fallback) e feed do Instagram dinâmico com fallback mockado.

---

## 1. Visão Geral

Construir uma landing page pessoal estilo Linktree:
- **Mobile-first**, mas responsivo para desktop.
- Lista de links personalizados (redes sociais, portfólio, WhatsApp, etc).
- **Encurtador de URL** operando no domínio próprio (ex: `link.seudominio.com/abc123`), com **fallback de analytics**: se houver Supabase configurado, registra cliques; se não houver, apenas redireciona (sem quebrar o fluxo).
- **Feed do Instagram dinâmico** via API oficial da Meta, com **fallback para posts mockados** selecionados manualmente, caso a API falhe ou não esteja configurada.

Este documento separa **instruções de construção** (arquitetura, stack, contratos de dados) de **conteúdo** (textos, links, imagens reais), que devem ficar em um `CONTENT.md` à parte. Onde não houver dado real disponível, usar placeholders explícitos (`[PLACEHOLDER: ...]`).

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Observação |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Deploy inicial em Vercel (teste); domínio definitivo pode migrar depois |
| Hospedagem | Vercel (free tier) | Compatível com Edge Functions / API Routes |
| Estilização | Tailwind CSS | Mobile-first por padrão |
| Banco de dados | Supabase (Postgres) | Usado **apenas** para analytics de cliques e posts mockados — opcional/fallback |
| Cliente Supabase | `@supabase/supabase-js` | Service role apenas em server-side (API routes), nunca no client |
| Instagram API | Meta Graph API (Instagram Business/Basic Display) | Requer token de acesso de longa duração |
| Analytics pipeline (opcional) | Script Python (batch, fora do Next.js) | Só é iniciado se `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estiverem presentes |

### Por que Supabase aqui?
Diferente de um Linktree estático puro, o encurtador de URL precisa persistir:
1. O mapeamento `short_code → destination_url` (se não for hardcoded em config).
2. Os eventos de clique (timestamp, referrer, user-agent) para analytics.
3. Os posts mockados do Instagram (fallback), para você poder curar manualmente sem depender da API.

Supabase é usado só nessas três funções — se as env vars não existirem, o site **degrada graciosamente** (ver seção 4).

---

## 3. Estrutura de Pastas Esperada

```
/app
  /[shortcode]
    route.ts          → resolve o redirecionamento + dispara analytics (fire-and-forget)
  /api
    /instagram
      route.ts         → busca feed via Meta API, fallback para mock
    /analytics
      route.ts         → endpoint interno de registro de clique (chamado pelo route de shortcode)
  /page.tsx            → página principal (Linktree)
  /layout.tsx
/components
  LinkButton.tsx
  InstagramFeed.tsx
  ProfileHeader.tsx
/lib
  supabase.ts          → client server-side (service role) — nunca importar no client component
  instagram.ts          → wrapper de chamada à Graph API + lógica de fallback
  shortener.ts          → lógica de resolução de short_code (DB ou config estático)
/config
  links.config.ts       → lista de links do Linktree (fonte de conteúdo, não hardcode no componente)
  instagram-mock.config.ts → posts mockados de fallback (curados manualmente)
/supabase
  schema.sql
  rls.sql
  seed.sql
/scripts
  analytics_pipeline.py → pipeline batch opcional (só roda se env vars de Supabase existirem)
.env.example
CONTENT.md               → conteúdo real (textos, links, bio) — separado deste arquivo
SKILL.md                 → este arquivo
```

---

## 4. Encurtador de URL — Lógica e Fallback

### Fluxo (`/app/[shortcode]/route.ts`)
1. Recebe `shortcode` via rota dinâmica.
2. Resolve o destino:
   - Se Supabase configurado → busca em `links` (tabela).
   - Se não configurado → busca em `shortener.config.ts` (mapa estático local, fallback sem BD).
3. Se não encontrado → redireciona para página 404 customizada ou home.
4. Redireciona (HTTP 302) para o destino **imediatamente** (não bloquear o usuário esperando o insert do analytics).
5. **Analytics fire-and-forget**: dispara `POST /api/analytics` de forma assíncrona (sem `await` bloqueante), passando `short_code`, `referrer`, `user_agent`, `timestamp`.
   - Se `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` ausentes → a função de analytics é um no-op (retorna cedo, loga em console apenas em dev).

### Regra crítica de fallback
```ts
// lib/shortener.ts (pseudo-lógica)
const hasSupabase = !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function resolveShortcode(code: string) {
  if (hasSupabase) {
    const result = await supabaseLookup(code);
    if (result) return result;
  }
  return staticLinksMap[code] ?? null; // fallback local mesmo com Supabase configurado, se não achar
}
```

### Pipeline de analytics em Python (opcional)
- Script batch (`/scripts/analytics_pipeline.py`) roda separado do Next.js (ex: cron job local, GitHub Actions, ou Railway).
- **Só inicia** se detectar `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` no ambiente; caso contrário, encerra com log informativo e status code 0 (não é erro, é comportamento esperado).
- Função: agregações periódicas (cliques por dia, top links, top referrers) gravadas em uma tabela `link_clicks_daily` para não sobrecarregar queries em tempo real no dashboard.

---

## 5. Feed do Instagram — Lógica e Fallback

### Fluxo (`/app/api/instagram/route.ts`)
1. Tenta buscar posts via **Meta Graph API** (`GET /{ig-user-id}/media` com `access_token`).
2. Se a chamada falhar (token expirado, rate limit, `INSTAGRAM_ACCESS_TOKEN` ausente, erro de rede) → cai no fallback:
   - Busca posts mockados em `config/instagram-mock.config.ts` (array local, sem BD) **ou** na tabela `instagram_posts_mock` do Supabase, se configurado (permite curar via painel/admin sem redeploy).
3. Resposta sempre no mesmo formato (normalizada), independente da fonte:
```ts
type InstagramPost = {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  source: "api" | "mock";
};
```
4. Componente `InstagramFeed.tsx` não sabe (nem precisa saber) se veio da API ou do mock — só consome o formato normalizado.

### Observações críticas
- Token de longa duração da Meta expira em ~60 dias — documentar no `.env.example` a necessidade de renovação, e logar aviso quando a resposta da API indicar erro de autenticação (não deixar falhar silenciosamente sem log).
- Cache do feed real (quando via API) por pelo menos 15–30 min (ISR ou `revalidate` do Next.js) para evitar rate limit da Meta.

---

## 6. Banco de Dados — Supabase (Schema, RLS e Seed)

### 6.1 Schema (`/supabase/schema.sql`)

```sql
-- Tabela de links encurtados
create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  short_code text unique not null,
  destination_url text not null,
  label text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Tabela de eventos de clique (analytics bruto)
create table if not exists public.link_clicks (
  id uuid primary key default gen_random_uuid(),
  link_id uuid not null references public.links(id) on delete cascade,
  clicked_at timestamptz not null default now(),
  referrer text,
  user_agent text,
  country text
);

-- Tabela de agregação diária (populada pelo pipeline Python)
create table if not exists public.link_clicks_daily (
  id uuid primary key default gen_random_uuid(),
  link_id uuid not null references public.links(id) on delete cascade,
  click_date date not null,
  total_clicks integer not null default 0,
  unique (link_id, click_date)
);

-- Tabela de posts mockados do Instagram (fallback curado manualmente)
create table if not exists public.instagram_posts_mock (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  permalink text not null,
  order_index integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Índices úteis
create index if not exists idx_link_clicks_link_id on public.link_clicks(link_id);
create index if not exists idx_link_clicks_clicked_at on public.link_clicks(clicked_at);
create index if not exists idx_links_short_code on public.links(short_code);
```

### 6.2 RLS — Row Level Security (`/supabase/rls.sql`)

**Princípio**: todo insert/select vindo do site público é feito via **API routes server-side com service role** (que ignora RLS). O RLS aqui serve para proteger contra acesso direto client-side (ex: se alguém usar a `anon key` do browser) e para permitir leitura pública controlada apenas do necessário (ex: lista de links ativos, se o front consumir direto do Supabase em vez do config estático).

```sql
alter table public.links enable row level security;
alter table public.link_clicks enable row level security;
alter table public.link_clicks_daily enable row level security;
alter table public.instagram_posts_mock enable row level security;

-- links: leitura pública apenas de links ativos (útil se o front ler direto do Supabase)
create policy "public_read_active_links"
  on public.links
  for select
  using (active = true);

-- links: nenhuma escrita client-side (só service role, que bypassa RLS)
-- (nenhuma policy de insert/update/delete para anon/authenticated = negado por padrão)

-- link_clicks: nenhuma leitura nem escrita client-side
-- (sem policies = tudo negado para anon/authenticated; só service role grava, via API route)

-- link_clicks_daily: leitura pública opcional, caso você queira expor um dashboard público
-- (deixar comentado por padrão — descomente se for expor analytics publicamente)
-- create policy "public_read_daily_clicks"
--   on public.link_clicks_daily
--   for select
--   using (true);

-- instagram_posts_mock: leitura pública dos posts ativos (consumido pelo fallback do feed)
create policy "public_read_active_mock_posts"
  on public.instagram_posts_mock
  for select
  using (active = true);

-- instagram_posts_mock: escrita apenas via service role (painel admin futuro, se houver)
```

### 6.3 Seed para testes (`/supabase/seed.sql`)

```sql
-- Links de exemplo
insert into public.links (short_code, destination_url, label) values
  ('ig', 'https://instagram.com/[PLACEHOLDER_USERNAME]', 'Instagram'),
  ('wpp', 'https://wa.me/[PLACEHOLDER_NUMERO]', 'WhatsApp'),
  ('portfolio', 'https://cavalcanteprofissional.github.io/portfolio', 'Portfólio')
on conflict (short_code) do nothing;

-- Cliques de teste (últimos 3 dias, distribuição fictícia)
insert into public.link_clicks (link_id, clicked_at, referrer, user_agent)
select id, now() - (interval '1 day' * s), 'instagram.com', 'seed-test-agent'
from public.links, generate_series(0, 2) as s
where short_code = 'ig';

-- Agregação diária de exemplo
insert into public.link_clicks_daily (link_id, click_date, total_clicks)
select id, current_date, 5 from public.links where short_code = 'ig'
on conflict (link_id, click_date) do update set total_clicks = excluded.total_clicks;

-- Posts mockados de exemplo (fallback do Instagram)
insert into public.instagram_posts_mock (image_url, caption, permalink, order_index) values
  ('[PLACEHOLDER_IMAGE_URL_1]', '[PLACEHOLDER_CAPTION_1]', '[PLACEHOLDER_PERMALINK_1]', 1),
  ('[PLACEHOLDER_IMAGE_URL_2]', '[PLACEHOLDER_CAPTION_2]', '[PLACEHOLDER_PERMALINK_2]', 2),
  ('[PLACEHOLDER_IMAGE_URL_3]', '[PLACEHOLDER_CAPTION_3]', '[PLACEHOLDER_PERMALINK_3]', 3);
```

> Rodar `schema.sql` → `rls.sql` → `seed.sql`, nessa ordem, via Supabase SQL editor ou CLI (`supabase db push` / `psql`).

---

## 7. Variáveis de Ambiente (`.env.example`)

```bash
# Supabase (opcional — se ausente, site funciona em modo fallback sem analytics)
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=       # nunca expor no client, só em API routes
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # só se for necessário leitura pública direta do client

# Instagram / Meta Graph API (opcional — se ausente, cai no fallback mockado)
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_BUSINESS_ACCOUNT_ID=

# Domínio do encurtador
NEXT_PUBLIC_SHORT_DOMAIN=link.seudominio.com
```

---

## 8. Design — Diretrizes Mobile-First

- Viewport alvo primário: 375–430px de largura (iPhone/Android médio).
- Botões de link: altura mínima de 48px (área de toque acessível), espaçamento vertical generoso.
- Avatar/foto de perfil centralizado no topo, bio curta abaixo.
- Feed do Instagram: grid 3 colunas em mobile, carrossel horizontal como alternativa se o grid ficar apertado.
- Dark mode como padrão é uma opção válida — decidir junto ao `CONTENT.md`/identidade visual (ex: paleta Sky Blue/Slate/Violet já usada em outros projetos, se fizer sentido aqui).
- Testar com Lighthouse mobile antes de considerar "pronto" (meta: performance ≥ 90).

---

## 9. Deploy

1. **Fase de teste**: Vercel (free tier), domínio `*.vercel.app` ou subdomínio de teste.
2. **Fase definitiva**: migrar para domínio próprio — apontar DNS (`A`/`CNAME`) conforme documentação da Vercel; configurar `link.seudominio.com` como domínio adicional no mesmo projeto (não precisa de projeto separado).
3. Variáveis de ambiente devem ser configuradas no painel da Vercel (Production + Preview), espelhando o `.env.example`.
4. Supabase: criar projeto free tier, rodar os scripts SQL da seção 6, copiar `SUPABASE_URL` e chaves para a Vercel.

---

## 10. Checklist de Implementação (ordem sugerida)

1. [ ] Scaffold Next.js + Tailwind, deploy inicial "hello world" na Vercel.
2. [ ] Página Linktree estática consumindo `links.config.ts` (sem BD ainda).
3. [ ] Rota `/[shortcode]` com fallback estático (sem Supabase).
4. [ ] Criar projeto Supabase, rodar `schema.sql` + `rls.sql` + `seed.sql`.
5. [ ] Conectar `lib/supabase.ts` e ativar analytics real (com fallback já testado antes).
6. [ ] Implementar `lib/instagram.ts` com fallback mockado primeiro (sem token ainda).
7. [ ] Ativar integração real com Meta Graph API, validar renovação/expiração de token.
8. [ ] Ajustes finos de design mobile-first + teste em dispositivos reais.
9. [ ] Configurar domínio definitivo e variáveis de produção.
10. [ ] Rodar pipeline Python de agregação (opcional) como cron (GitHub Actions).

---

## 11. Perguntas em aberto (preencher em `CONTENT.md`)

- Lista final de links (label + URL de destino).
- Texto de bio/headline do perfil.
- Username/ID da conta Instagram Business para a API.
- Posts mockados reais (imagens + legendas + permalinks) para o seed.
- Domínio final definitivo (para configurar DNS).
