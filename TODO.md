# TODO — LinkTree Cavalcante

> Plano de implementação progressiva. Cada etapa é validada com Playwright antes de avançar.

---

## Setup GitHub MCP Server (Global) ✅

### Configuração
- [x] MCP GitHub adicionado ao config **global** `~/.config/opencode/opencode.json`
- [x] Token via `{env:GITHUB_TOKEN}` (interpolação segura, sem segredo em arquivo)
- [x] `opencode.json` local deletado (não precisa mais)
- [x] `.gitignore` revertido (sem entrada para `opencode.json`)
- [x] `GITHUB_TOKEN` salvo como variável de ambiente persistente do Windows (User scope)

### ▶️ Após reiniciar o opencode

O MCP GitHub estará disponível em **qualquer projeto**. Ao reiniciar, vou executar automaticamente:

1. `git init` + `git add .` + `git commit -m "v0.1.0: scaffold Next.js + dark mode + estrutura de pastas"`
2. `gh repo create linktree-cavalcante --public --description "Landing page pessoal estilo Linktree com encurtador de URL próprio e feed do Instagram"`
3. `git push origin main`
4. Iniciar **Etapa 2** — Página Linktree estática

---

## Etapa 1: Scaffold Next.js + Tailwind + Deploy Inicial ✅

### 1. Scaffold Next.js + Tailwind + Dark Mode
- [x] `npx create-next-app@latest .` com App Router, TypeScript, Tailwind
- [x] Estrutura de pastas: `components/`, `config/`, `lib/`, `supabase/`, `scripts/`
- [x] Tailwind dark mode configurado (estratégia `class`)
- [x] Paleta provisória: bg slate-900, texto slate-50, acento sky-400

### 2. Placeholders e Arquivos de Configuração
- [x] `config/links.config.ts` — array com tipagem `LinkItem[]`
- [x] `config/instagram-mock.config.ts` — array com tipagem `InstagramMockPost[]`
- [x] `components/LinkButton.tsx` — componente placeholder
- [x] `components/InstagramFeed.tsx` — componente placeholder
- [x] `components/ProfileHeader.tsx` — componente placeholder
- [x] `lib/supabase.ts` — client server-side (com fallback `hasSupabase`)
- [x] `lib/instagram.ts` — wrapper com tipo normalizado `InstagramPost`
- [x] `lib/shortener.ts` — lógica de resolução com fallback estático
- [x] `supabase/schema.sql` — 4 tabelas (links, link_clicks, link_clicks_daily, instagram_posts_mock)
- [x] `supabase/rls.sql` — políticas de Row Level Security
- [x] `supabase/seed.sql` — dados de exemplo com placeholders
- [x] `scripts/analytics_pipeline.py` — placeholder com detecção de env vars
- [x] `.env.example` — variáveis de ambiente documentadas
- [x] `CONTENT.md` — template para preenchimento de conteúdo real

### 3. Página Principal
- [x] Título: "LinkTree Cavalcante"
- [x] Subtítulo: "[PLACEHOLDER: bio/headline]"
- [x] Avatar placeholder (iniciais "LC")
- [x] Container centralizado mobile-first (max-w-md)
- [x] 3 skeletons como placeholder dos links

### 4. Vercel Deploy
- [ ] `git init && git add . && git commit -m "init: scaffold Next.js"`
- [ ] Criar repositório no GitHub
- [ ] Importar no dashboard Vercel como `linktree-cavalcante`

### 5. Validação com Playwright
- [x] Build limpo (`npm run build` sem erros)
- [x] Dev server local rodando
- [x] Screenshot mobile 375×812
- [x] Screenshot desktop 1280×800
- [x] DOM: h1 "LinkTree Cavalcante", classe `dark`, bg slate-900, 3 skeletons

---

## Etapa 2: Página Linktree Estática (🏁 PRÓXIMA)
- [ ] Popular `config/links.config.ts` com links reais do `CONTENT.md`
- [ ] Criar arquivo `config/shortener-static.config.ts` — mapa estático `short_code → URL`
- [ ] Implementar `components/ProfileHeader.tsx` (avatar + bio + headline)
- [ ] Implementar `components/LinkButton.tsx` (botão de link com ícone + label)
- [ ] Atualizar `app/page.tsx` para consumir `links.config.ts` e renderizar ProfileHeader + LinkButton
- [ ] Layout responsivo: mobile (375px) + tablet (768px) + desktop (1280px)
- [ ] Validação Playwright: screenshots + DOM

---

## Etapa 3: Rota `/[shortcode]` com Fallback Estático
- [ ] ...

---

## Etapa 4: Projeto Supabase + SQL
- [ ] ...

---

## Etapa 5: Conectar Supabase + Analytics Real
- [ ] ...

---

## Etapa 6: Feed Instagram com Fallback Mockado
- [ ] ...

---

## Etapa 7: Integração Real Meta Graph API
- [ ] ...

---

## Etapa 8: Ajustes Finos Mobile-First
- [ ] ...

---

## Etapa 9: Domínio Definitivo + Produção
- [ ] ...

---

## Etapa 10: Pipeline Python de Agregação (opcional)
- [ ] ...

---

## Como usar Vercel CLI (passo a passo)

```bash
# 1. Instalar CLI globalmente
npm i -g vercel

# 2. Fazer login
vercel login

# 3. Link ao projeto (depois do deploy manual no dashboard)
vercel link

# 4. Deploy para produção
vercel --prod
```
