# API de Projetos do Portfólio

## Onde a API Vive

A API **NÃO** fica no repositório do portfólio nem em um repositório separado.

Ela é uma **Next.js Route Handler** dentro deste próprio repositório (`linktree_cavalcante`), no caminho:

```
app/api/projects/route.ts
```

Ela faz fetch do arquivo `projects.json` hospedado no repositório do portfólio via `raw.githubusercontent.com`.

**Nenhuma modificação no repositório do portfólio é necessária.** O mesmo padrão já é usado pela rota `/api/instagram`.

---

## Endpoint

```
GET /api/projects
```

### Resposta (200 OK)

```json
{
  "projects": [
    {
      "id": 15,
      "titleKey": "project.15.title",
      "descriptionKey": "project.15.description",
      "demoUrl": "#",
      "codeUrl": "https://github.com/cavalcanteprofissional/cd-price-tracker",
      "icon": "shopping-cart",
      "tech": ["Python", "Playwright", "Next.js", "TypeScript", "Supabase", "Recharts", "GitHub Actions"]
    },
    {
      "id": 14,
      "titleKey": "project.14.title",
      "descriptionKey": "project.14.description",
      "demoUrl": "https://jobmatch-frontend-u6vt.onrender.com",
      "codeUrl": "https://github.com/cavalcanteprofissional/jobmatch-ai",
      "icon": "scan-search",
      "tech": ["Python", "FastAPI", "scikit-learn", "XGBoost", "React", "TypeScript", "Tailwind CSS", "Docker"]
    }
  ],
  "source": "github"
}
```

### Resposta (erro)

```json
{
  "projects": [],
  "source": "error"
}
```

Status: `502` (portfólio offline) ou `500` (erro interno).

---

## Cache

- `revalidate: 1800` (30 minutos — ISR do Next.js)
- O conteúdo é servido do cache até expirar, mesmo que o portfólio fique offline.

---

## Como os Dados São Consumidos

```
Portfolio GitHub
   │ fetch raw.githubusercontent.com
   ▼
LinkTree /api/projects  (ISR 30min)
   │ sort by id desc
   │ top 5
   ▼
LinkTree /components/ProjectLinks.tsx  (client component)
   │ fetch("/api/projects")
   │ resolve translations via config/projects-translations.ts
   │ render 5 buttons + modal
   ▼
Usuário vê 5 projetos com modal (Demo + Código)
```

### Fluxo de Falha

Se `/api/projects` falhar, `lib/projects.ts` faz fallback silencioso para `config/projects-mock.config.ts` (5 projetos estáticos com dados manuais).

---

## Arquivos Envolvidos

| Arquivo | Função |
|---------|--------|
| `app/api/projects/route.ts` | Route Handler: busca, ordena, retorna top 5 |
| `lib/projects.ts` | Interface + função `fetchProjects(lang)` com fallback |
| `config/projects-mock.config.ts` | 5 projetos mockados (fallback) |
| `config/projects-translations.ts` | Mapa `titleKey` → `{ pt, en, es }` para resolução de idioma |
| `components/ProjectLinks.tsx` | Componente cliente: fetch, toggle idioma, modal |
| `components/ProjectModal.tsx` | Modal com Demo + Código |

---

## Mapeamento de Ícones

O campo `icon` retornado pela API usa strings Lucide. O `lib/icons.ts` mapeia cada string para um path SVG:

| Chave API | Ícone |
|-----------|-------|
| `testtube` | TestTube |
| `chart-line` | TrendingUp |
| `robot` | Bot |
| `eye` | Eye |
| `brain` | Brain |
| `pie-chart` | PieChart |
| `help-circle` | HelpCircle |
| `newspaper` | Newspaper |
| `map` | Map |
| `wrench` | Wrench |
| `video` | Video |
| `message-circle-question` | MessageCircleQuestion |
| `scan-search` | ScanSearch |
| `shopping-cart` | ShoppingCart |

Se alguma chave não for encontrada, o ícone fallback é `link`.

---

## Adicionando Novos Projetos

Quando novos projetos forem adicionados ao portfólio:

1. A API `/api/projects` **já irá buscá-los automaticamente** — o `projects.json` é fetchado em tempo real
2. A ordenação por `id` descendente garante que os 5 mais recentes apareçam
3. **Apenas** se o novo projeto tiver um `titleKey` ou `descriptionKey` inédito, será necessário:
   - Adicionar a entrada em `config/projects-translations.ts`
   - Se o `icon` também for novo, adicionar o path SVG em `lib/icons.ts`
4. O arquivo `config/projects-mock.config.ts` deve ser atualizado manualmente para refletir os 5 projetos mais recentes (fallback)
