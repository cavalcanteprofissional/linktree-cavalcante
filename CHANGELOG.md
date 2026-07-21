# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

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

### Pendente para próximas versões

- [ ] Deploy inicial na Vercel (manual)
- [ ] Página Linktree estática com links reais (Etapa 2)
- [ ] Rota `/[shortcode]` com redirecionamento (Etapa 3)
- [ ] Projeto Supabase + schemas SQL (Etapa 4)
- [ ] Analytics real com Supabase (Etapa 5)
- [ ] Feed do Instagram com fallback mockado (Etapa 6)
- [ ] Integração Meta Graph API (Etapa 7)
- [ ] Pipeline Python de agregação (Etapa 10)
