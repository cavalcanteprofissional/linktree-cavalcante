# TODO — LinkTree Cavalcante

---

## ✅ Etapas 1–12 Concluídas

Scaffold, página estática, encurtador, Supabase, analytics, feed Instagram, Meta API, paleta Corporate Blue, refinamentos perf/SEO/a11y, dashboard analytics, correção Instagram placeholder.

Mudanças entregues:
- `next/image` no avatar e Instagram feed (com `remotePatterns`)
- SVGs extraídos para `lib/icons.ts` + ícone `message-circle` corrigido
- `aria-hidden`, `focus-visible`, `aria-label`, `alt` fallback
- OG tags, sitemap, robots.txt, theme-color
- `app/error.tsx` + `app/not-found.tsx`
- Logs nos catch blocks silenciosos
- `noUncheckedIndexedAccess` ativado
- Dashboard analytics completo (6 APIs + Recharts)
- Validação de URLs no fetch do Instagram (ignora placeholders)
- Pipeline Python de agregação

---

## ✅ Etapa 13: Footer + Dashboard Button + Avatar Local

- [x] Foto de perfil baixada para `public/images/foto-perfil.webp`
- [x] `app/page.tsx` usando avatar local
- [x] `components/Footer.tsx` com assinatura (REF-FOOTER-ASSINATURA.md)
- [x] Footer incluído no `app/layout.tsx` (global)
- [x] Botão "📊 Analytics" no fim da página inicial
- [x] `REF-FOOTER-ASSINATURA.md` movido para `docs/`

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

## 📋 Domínio Definitivo (futuro)

- [ ] ...
