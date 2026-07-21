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
