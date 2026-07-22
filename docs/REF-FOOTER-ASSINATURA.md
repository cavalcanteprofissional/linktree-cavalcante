# Footer — Assinatura "Produzido por"

> Parâmetros e estética usados no projeto **Grupo Suprimmil** para reuso em outros projetos.

---

## Arquivo da Assinatura

| Atributo | Valor |
|---|---|
| Arquivo | `public/images/assinatura-lucas.png` |
| Dimensões originais | 515 × 399 px |
| Formato | PNG com canal alpha (RGBA) |

---

## Código (Tailwind v4 + Next.js)

```tsx
import Image from "next/image"

// ...

<div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-500">
  <p>&copy; {new Date().getFullYear()} {NOME_EMPRESA}. Todos os direitos reservados.</p>
  <a
    href="https://github.com/SEU_USERNAME"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-light-400 hover:text-accent-500 transition-colors group"
  >
    <span className="text-xs">Produzido por</span>
    <Image
      src="/images/assinatura-lucas.png"
      alt="Lucas Cavalcante"
      width={103}
      height={80}
      className="h-7 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
    />
  </a>
</div>
```

---

## Parâmetros Visuais

| Elemento | Classe / Valor | Efeito |
|---|---|---|
| **Container** (barra inferior) | `mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-500` | Linha divisória sutil, layout responsivo (empilhado no mobile, lado a lado no desktop) |
| **Texto "Produzido por"** | `<span className="text-xs">` | Fonte pequena, mesma cor do container `text-light-500` (herdada) |
| **Imagem** | `h-7 w-auto opacity-70 group-hover:opacity-100 transition-opacity` | Altura fixa 28px, largura automática (mantém proporção), 70% opaco, 100% no hover |
| **Link** | `flex items-center gap-2 text-light-400 hover:text-accent-500 transition-colors group` | Flex row com gap, cor clara que muda para accent no hover; `group` para estilizar filhos |
| **Acessibilidade** | `target="_blank" rel="noopener noreferrer"` | Abre em nova aba segura |

---

## Comportamentos

- **Mobile (< sm):** barra empilha verticalmente (copyright em cima, assinatura embaixo)
- **Desktop (≥ sm):** copyright à esquerda, assinatura à direita
- **Hover:** texto do link muda para `accent-500`, imagem vai de 70% → 100% de opacidade
