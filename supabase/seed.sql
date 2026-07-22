-- Links de exemplo
insert into public.links (short_code, destination_url, label) values
  ('in', 'https://linkedin.com/in/cavalcante-lucas', 'LinkedIn'),
  ('github', 'https://github.com/cavalcanteprofissional', 'GitHub'),
  ('wpp', 'https://wa.me/5585996859051', 'WhatsApp'),
  ('portfolio', 'https://cavalcanteprofissional.github.io/portfolio', 'Portfólio'),
  ('lattes', 'http://lattes.cnpq.br/7686247677030579', 'Lattes')
on conflict (short_code) do nothing;

-- Cliques de teste (últimos 3 dias, distribuição fictícia)
insert into public.link_clicks (link_id, clicked_at, referrer, user_agent)
select id, now() - (interval '1 day' * s), 'instagram.com', 'seed-test-agent'
from public.links, generate_series(0, 2) as s
where short_code = 'portfolio';

-- Agregação diária de exemplo
insert into public.link_clicks_daily (link_id, click_date, total_clicks)
select id, current_date, 5 from public.links where short_code = 'portfolio'
on conflict (link_id, click_date) do update set total_clicks = excluded.total_clicks;

-- Posts mockados de exemplo (fallback do Instagram)
insert into public.instagram_posts_mock (image_url, caption, permalink, order_index) values
  ('https://placehold.co/400x400/1e293b/3b82f6?text=Em+Breve', 'Em breve — novos projetos sendo lançados', 'https://github.com/cavalcanteprofissional', 1),
  ('https://placehold.co/400x400/1e293b/3b82f6?text=Data+AI', 'Análise de dados com inteligência artificial', 'https://cavalcanteprofissional.github.io/portfolio', 2),
  ('https://placehold.co/400x400/1e293b/3b82f6?text=Contato', 'Fale comigo pelo WhatsApp', 'https://wa.me/5585996859051', 3);
