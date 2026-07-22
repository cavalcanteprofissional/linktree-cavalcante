# TODO — LinkTree Cavalcante

---

## ✅ Etapas 1–13 Concluídas

Scaffold, página estática, encurtador, Supabase, analytics, feed Instagram, Meta API, paleta Corporate Blue, refinamentos perf/SEO/a11y, dashboard analytics, correção Instagram placeholder, footer + avatar local.

---

## ✅ Etapa 14: Animações, Neon, Social Icons, Localização

### 14.1 — Animações Globais
- [x] `globals.css`: @keyframes CRT flash, scanlines, fadeInUp, neon glow
- [x] `components/CrtOverlay.tsx`: efeito ligar monitor (1x por sessão)
- [x] `app/layout.tsx`: incluir CrtOverlay

### 14.2 — Neon Glow nos Botões
- [x] `components/LinkButton.tsx`: box-shadow glow nas bordas, intensifica no hover

### 14.3 — Social Icons (fora do footer)
- [x] `components/SocialIcons.tsx`: LinkedIn, GitHub, Instagram, WhatsApp em círculos
- [x] `app/page.tsx`: posicionar entre LinkButtons e InstagramFeed

### 14.4 — Animação Instagram Cards
- [x] `components/InstagramFeed.tsx`: stagger fadeInUp com --index

### 14.5 — Localização + Mapa
- [x] `components/LocationCard.tsx`: endereço + mapa OpenStreetMap (iframe)
- [x] `app/page.tsx`: adicionar antes do Analytics link

### 14.6 — Dashboard: Animações Recharts
- [x] `components/dashboard/ClicksChart.tsx`: animationDuration + animationEasing
- [x] `components/dashboard/LinksChart.tsx`: animationDuration + animationEasing
- [x] `components/dashboard/StatCard.tsx`: fadeInUp entrance

### 14.7 — Build + Validação
- [x] `npm run build` sem erros

---

## ✅ Etapa 15: Correções Finais e Ajustes de UI

- [x] `lib/icons.ts`: adicionado `bar-chart` e `globe`
- [x] `components/SocialIcons.tsx`: WhatsApp corrigido (`whatsapp`), adicionados Portfólio (`globe`) e Lattes (`book-open`)
- [x] `app/page.tsx`: SocialIcons após LocationCard; link Analytics removido (agora no avatar)
- [x] `components/ProfileHeader.tsx`: avatar linkável ao GitHub com neon glow + overlay; `object-[center_55%]`; bio `whitespace-nowrap`; Analytics badge posição 45° com hover idêntico aos sociais
- [x] `components/Footer.tsx`: quebra "Todos os direitos reservados" via `<br class="hidden sm:block" />`

---

## ✅ Etapa 16: Animações Dashboard por Seção com Scroll

- [x] `components/dashboard/AnimatedSection.tsx`: fadeInUp com IntersectionObserver + delay sequencial + callback onVisible
- [x] `app/dashboard/page.tsx`: cada seção envolta em AnimatedSection com delays (100, 300, 500, 700, 900ms); observeVisibility nas seções abaixo da dobra; onVisible dispara setChartVisible/setLinksVisible
- [x] `components/dashboard/ClicksChart.tsx`: animationDuration 2000ms; key re-renderiza gráfico quando visible muda
- [x] `components/dashboard/LinksChart.tsx`: animationDuration 1500ms; key re-renderiza gráfico quando visible muda
- [x] `components/dashboard/StatCard.tsx`: removido animate-fade-in-up (AnimatedSection gerencia)

---

## 🔄 Pendente: Deploy Vercel

1. Acesse https://vercel.com/login e faça login com GitHub
2. **"Add New..." → "Project"** → importe `cavalcanteprofissional/linktree-cavalcante`
3. Em **Environment Variables**, adicione:
   - `SUPABASE_URL` = `https://ezcrzdbfdxchqpckrfan.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = (copiar do `.env.local`)
   - `INSTAGRAM_ACCESS_TOKEN` = (copiar do `.env.local`)
   - `INSTAGRAM_BUSINESS_ACCOUNT_ID` = `17841412670747535`
4. **"Deploy"** e validar domínio
