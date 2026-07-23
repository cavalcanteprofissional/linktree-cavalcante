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

## ✅ Etapa 17: Correção Hover Analytics Badge

- [x] `components/ProfileHeader.tsx`: badge aumentado para `w-8 h-8`; ícone para `w-4 h-4`; reposicionado `left-[66px] -top-2`; `pointer-events-auto`

## ❌ Etapa 18: Cancelada (desfeita)

O usuário solicitou desfazer. Restaurado `group`/`group-hover` do avatar com overlay GitHub. Badge mantido em `w-8 h-8` com `left-[66px] -top-2`, ícone `w-4 h-4`, `pointer-events-auto`.

## ✅ Etapa 19: Corrigir Transparência Badge Analytics no Hover

- [x] `components/ProfileHeader.tsx`: badge analytics `hover:bg-primary/20` → `hover:bg-primary/40` para compensar opacidade do overlay `group-hover:bg-black/40` do avatar atrás do badge

---

---

## ⏳ Etapa 20: Projetos Dinâmicos do Portfólio (Em Implementação)

### Escopo

Substituir os 5 botões fixos (LinkedIn, GitHub, WhatsApp, Portfólio, Lattes) por 5 botões de projetos buscados dinamicamente do portfólio, com modal contendo Demo + Código e seletor de idioma (PT/EN/ES).

### Arquitetura

- `/api/projects` (Next.js Route Handler) → busca `projects.json` do raw.githubusercontent, ordena por `id` desc, retorna top 5
- `lib/projects.ts` → fetch + resolve traduções via `config/projects-translations.ts`
- `components/ProjectLinks.tsx` → cliente: estado `lang`, fetch, renderiza 5 botões + toggle idioma
- `components/ProjectModal.tsx` → modal com backdrop, título, descrição, tech tags, botões Demo + Código
- `config/projects-mock.config.ts` → fallback estático (5 projetos) se a API falhar
- `config/projects-translations.ts` → mapa `titleKey` → `{ pt, en, es }` para todos os 16 projetos

### 20.1 — Config: Traduções
- [x] `config/projects-translations.ts`: mapa completo PT/EN/ES para todos os 16 projetos

### 20.2 — Config: Mock
- [x] `config/projects-mock.config.ts`: 5 projetos estáticos (ids 15, 14, 13, 12, 11) com `titleKey`, `descriptionKey`, `demoUrl`, `codeUrl`, `icon`, `tech`

### 20.3 — Lib: Projetos
- [x] `lib/projects.ts`: interface `PortfolioProject` + `ResolvedProject`, função `fetchProjects(lang)`: tenta API → resolve traduções → fallback mock

### 20.4 — API Route
- [x] `app/api/projects/route.ts`: GET, fetch `projects.json`, sort desc, top 5, ISR `revalidate: 1800`

### 20.5 — Componente: Modal
- [x] `components/ProjectModal.tsx`: backdrop, título, descrição, tech tags, Demo + Code buttons, close

### 20.6 — Componente: Links dos Projetos
- [x] `components/ProjectLinks.tsx`: `"use client"`, estado `lang` com localStorage, fetch, 5 skeletons, 5 buttons, toggle idioma, modal state

### 20.7 — Ícones
- [x] `lib/icons.ts`: adicionar paths SVG para `testtube`, `chart-line`, `robot`, `eye`, `brain`, `pie-chart`, `help-circle`, `newspaper`, `map`, `wrench`, `video`, `message-circle-question`, `scan-search`, `shopping-cart`

### 20.8 — Page
- [x] `app/page.tsx`: substituir `{links.map(...)}` por `<ProjectLinks />`

### 20.9 — Documentação
- [x] `docs/PROJECTS-API.md`: especificação da API de projetos do portfólio

### 20.10 — Build
- [x] `npm run build` sem erros

---

## ✅ Etapa 22: Status de Projeto (Concluído / Em Andamento)

### 22.1 — Portfolio: Adicionar status ao projects.json
- [x] `cavalcanteprofissional/portfolio/src/data/projects.json`: commit `deb71ab` com campo `status` em todos os 15 projetos (14 `concluido` + 1 `andamento`)

### 22.2 — Mock config
- [x] `config/projects-mock.config.ts`: adicionar `status` na interface `PortfolioProject` + nos 5 mocks

### 22.3 — Lib
- [x] `lib/projects.ts`: type `ProjectStatus`, campo `status` nas interfaces, export `getStatusLabel()` com PT/EN/ES

### 22.4 — Botão com dot
- [x] `components/ProjectLinks.tsx`: dot verde (`concluido`) ou amarelo (`andamento`) no canto direito de cada botão

### 22.5 — Modal com badge
- [x] `components/ProjectModal.tsx`: badge status com dot + label traduzido no header, abaixo do ícone

### 22.6 — API Route
- [x] `app/api/projects/route.ts`: adicionar `status: p.status` no `.map()` da resposta

### 22.7 — Build
- [x] `npm run build` sem erros

---

## ✅ Etapa 23: Mapa SVG com Terraink (não sobreposto)

### 23.1 — Obter SVG do Terraink
- [x] Recolher mapa SVG de Fortaleza gerado em [terraink.app](https://terraink.app)
- [x] Salvar em `public/images/map.svg` (32 MB, estilo blueprint)

### 23.2 — Redesenhar LocationCard
- [x] `components/LocationCard.tsx`: substituir iframe OSM por `<img src="/images/map.svg">` no topo
- [x] Conteúdo (badge, título, bio, Maps) posicionado **abaixo** do SVG — sem sobreposição
- [x] Layout limpo: SVG full‑width com `aspect-ratio: 1/1` + `p-4` para textos

### 23.3 — Build
- [x] `npm run build` sem erros

---

## ✅ Etapa 21: LocationCard Redesenhado (baseado no Lucasbsilva11)

### 21.1 — Documentação
- [x] `docs/PORTFOLIO-LOCATION-SECTION.md`: especificação para adicionar seção de localização similar no portfólio `cavalcanteprofissional/portfolio`

### 21.2 — Ícone map-pin
- [x] `lib/icons.ts`: adicionar path SVG para `map-pin`

### 21.3 — LocationCard refatorado
- [x] `components/LocationCard.tsx`: redesign inspirado no portfolio de referência — mapa h-72 com overlay glass card no rodapé; badge com dot pulsante + "Fortaleza, Brasil" + map-pin; título com destaque no estado; divisor; bio sobre Fortaleza; botão Maps minimalista; animação pulse no dot

### 21.4 — Build
- [x] `npm run build` sem erros

---

---

## ✅ Etapa 24: Pool Effect + Interação com Mouse

### 24.1 — Pool Effect (fundo de piscina)
- [x] `components/PoolEffect.tsx`: overlay `fixed inset-0 pointer-events-none z-0` com 5 gradientes radiais animados em loop de 20s simulando cáusticas de água, tons azuis Corporate Blue

### 24.2 — Mouse Interaction (tilt 3D + ripple no clique)
- [x] `components/MouseInteraction.tsx`: container com `perspective(800px)` que aplica `rotateX/rotateY` nos filhos baseado na posição do cursor/ toque (±8° max)
- [x] Ripple no clique: círculo expansivo de 48px com `scale(0→3)` + fade-out em 0.7s
- [x] Suporte touch: `touchmove` para tilt, `touchstart` para ripple

### 24.3 — Integração
- [x] `app/page.tsx`: `<PoolEffect />` antes de `<MouseInteraction>`; `<main>` envolvido em `<MouseInteraction>` com `relative z-10`

### 24.4 — Correções (efeito invisível)
- [x] `app/globals.css`: adicionar `@keyframes pool-drift` e `@keyframes ripple-expand` (estava no `<style>` JSX que o Turbopack pode não processar)
- [x] `components/PoolEffect.tsx`: opacidades aumentadas (0.10→0.25, 0.06→0.18, 0.05→0.14, 0.07→0.20, 0.04→0.10); `<style>` removido (keyframes agora no globals.css)
- [x] `components/MouseInteraction.tsx`: tilt aumentado de ±8° para ±12°; `.group-tilt` fantasma removido; `<style>` removido (keyframes no globals.css)

### 🔴 24.5 — Pool Effect não funcionava (tentativa 1)
- [x] **Causa raiz**: `background-position` animado via `@keyframes` conflitava com `background` inline (shorthand). O shorthand define implicitamente `background-position: 0% 0%`, anulando o estado inicial da animação (`50% 50%`). Além disso, `background-size: 200%` + `at X% Y%` nas gradients deslocava os centros para fora do viewport, deixando o efeito invisível.
- [x] **Solução 1**: substituir a animação de `background-position` por múltiplas `<div>` físicas com `transform: translate()` animado. Cada div tem `-inset-1/2` (200% do viewport) e um único `radial-gradient` centrado. As animações movem as divs em direções opostas com durações diferentes. Opacidades aumentadas para 25-35%.

### 🔴 24.6 — Pool Effect: SVG Filter (parecia fumaça)
- [x] **Tentativa 2**: SVG `<filter>` com `feTurbulence` + `feDisplacementMap` — resultado parecia fumaça com manchas pretas nas bordas. O `feDisplacementMap` distorce os gradientes mas o ruído suave não produz feixes de luz típicos de cáusticas.
- [x] `components/PoolEffect.tsx`: desfeito, volta para divs

### 🔴 24.7 — Pool Effect: divs + mix-blend-mode (water caustics)
- [x] **Solução final**: múltiplas divs com `radial-gradient` azul/cian/branco, animação via `transform: translate() + rotate()` com `cubic-bezier`, e `mix-blend-mode: screen` nas camadas superiores. O screen cria pontos claros nas sobreposições, simulando feixes de luz na água. `filter: blur()` para profundidade.
  - `components/PoolEffect.tsx`: 4 divs com gradientes concentrados (30-50% de raio), animações independentes, mix-blend-mode screen, blur de 2-4px
  - `app/globals.css`: keyframes `water-1..4` com translate + rotate + scale

---

## ✅ Etapa 25: Water Pool Reflection Background (R3F + WebGL)

### 25.1 — Dependências
- [x] `npm install three @react-three/fiber @types/three`

### 25.2 — Shaders GLSL
- [x] `components/WaterBackground/shaders/water.vert.glsl`
- [x] `components/WaterBackground/shaders/water.frag.glsl`

### 25.3 — ShaderMaterial
- [x] `components/WaterBackground/WaterMaterial.ts`: `createWaterMaterial()` factory com uniforms tipados (Vector2/Vector4), shader GLSL inline, transparent + depthWrite=false

### 25.4 — Hook de interação
- [x] `components/WaterBackground/useMouseRipples.ts`: escuta mousemove/click/touch no `window`, damping 0.08 no smoothMouse, pending ripples com startTime sincronizado com clock do R3F, cleanup após 4s, limite de 8 ripples

### 25.5 — Componente principal
- [x] `components/WaterBackground/WaterBackground.tsx`: fixed inset-0 z-0 pointer-events-none, Canvas com alpha, fallback CSS gradient para sem WebGL2, pausa render loop via visibilitychange
- [x] `components/WaterBackground/index.ts`: barrel export

### 25.6 — Integração
- [x] `app/page.tsx`: `<PoolEffect />` → `<WaterBackground />`

### 25.7 — Limpeza
- [x] `app/globals.css`: keyframes `water-1..4` e `pool-drift-*` removidos

### 🔴 25.8 — Correção: Hydration mismatch (WebGL2 check no SSR)
- [x] **Causa**: `if (typeof window !== "undefined")` causava server render fallback e client render Canvas → classes diferentes → mismatch.
- [x] **Solução**: usar `useState(false)` (server + client initial state iguais) + `useEffect` para setar o valor real. Wrapper `<div>` sempre com a mesma classe.

### Shader — Fragment (resumo)

- Normal map procedural via fbm 4 oitavas (ruído value noise)
- Mouse distortion: desloca normal na direção do cursor com `smoothstep(0.35, 0.0, dist)`, intensidade 0.4
- Ripples: `sin(dist * 22.0 - age * 5.0) * amplitude * exp(-1.3 * age)`, soma para normal (dir * wave * 0.6)
- Fresnel: `pow(1.0 - dot(normal, viewDir), 3.0)`
- Fake reflection: gradiente vertical `vec3(0.04,0.10,0.22)` → `vec3(0.18,0.40,0.65)`
- Refração: `vec3(0.01,0.04,0.10)` → `vec3(0.08,0.18,0.32)`
- Output: `mix(refraction, reflection, fresnel * 0.55) + specular + mouseGlow + rippleGlow`

---

---

## ✅ Etapa 26: Boot Experience Imersiva (CRT + Boot Splash + Som)

### 26.1 — CrtOverlay refeito
- [x] `components/CrtOverlay.tsx`: boot splash escuro (`hsl(215,45%,8%)`) cobre a tela — igual ao `#boot-splash` do portfolio
- [x] Conteúdo carrega atrás do overlay, revelado após fade-out (2.2s + 0.7s transition)
- [x] Som de boot sintetizado via Web Audio API (hum 60Hz + flyback whine 12kHz + pop + noise burst)
- [x] Glitch/flicker digitais nos primeiros 2s (glitch com hue-rotate, flicker com opacidade rápida)
- [x] Sequência: dark screen → flash → scanlines + wobble → glitch/flicker → fade-out → conteúdo

### 26.2 — Keyframes
- [x] `app/globals.css`: `@keyframes crt-glitch`, `crt-flicker`, `.animate-crt-glitch`, `.animate-crt-flicker`

### 26.3 — Build
- [x] `npm run build` sem erros

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
