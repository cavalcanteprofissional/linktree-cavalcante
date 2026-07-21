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
