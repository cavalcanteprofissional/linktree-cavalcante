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
