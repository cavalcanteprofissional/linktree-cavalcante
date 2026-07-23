# SKILL.md — Water Pool Reflection Effect (Background)

## Objetivo
Implementar um efeito de fundo (background) de página que simula uma superfície de água/piscina com reflexo abstrato, renderizado via WebGL, reagindo em tempo real ao movimento do mouse e a cliques (gerando ondas/ripples).

Este efeito **não** reflete o conteúdo real da página — é puramente decorativo/abstrato (gradiente, cor sólida ou céu simulado refletido), servindo como camada de fundo (`z-index` inferior a todo o conteúdo).

---

## Stack e Requisitos Técnicos

- **Framework:** Next.js (App Router ou Pages Router — detectar automaticamente pelo projeto atual)
- **Renderização:** WebGL puro ou via biblioteca leve (`ogl`, `three.js` com `React Three Fiber`, ou shader customizado com `regl`). Preferência: **React Three Fiber (R3F)**, por já ser comum no ecossistema React e permitir integração declarativa.
- **Shader:** Fragment shader customizado em GLSL simulando:
  - Superfície de água com normal map procedural (ruído tipo Perlin/Simplex para ondulação constante)
  - Reflexo abstrato (gradiente de "céu" fake ou cor de fundo customizável via props)
  - Refração leve (distorção do plano de fundo abaixo da água)
  - Fresnel effect (bordas mais reflexivas, centro mais transparente/refrativo)
- **Performance:** GPU-intensive é aceitável, mas deve:
  - Rodar a 60fps em desktop de médio porte
  - Ter fallback de qualidade reduzida (menor resolução de render, menos iterações de ruído) em mobile ou dispositivos sem suporte WebGL2
  - Pausar o loop de renderização quando a aba não está em foco (`document.visibilitychange`)

---

## Interatividade (requisito principal desta versão)

### Movimento do mouse
- A posição do cursor (normalizada para coordenadas UV do shader, -1 a 1 ou 0 a 1) deve ser passada como uniform (`uMouse: vec2`) ao fragment shader a cada frame.
- O movimento do mouse deve gerar uma **distorção contínua e suave** na superfície da água, como se o cursor "empurrasse" a água — não apenas um brilho estático seguindo o ponteiro.
- Suavizar o movimento com interpolação (lerp/damping) entre a posição anterior e a nova, para evitar transições bruscas.

### Clique do mouse
- Cada clique deve dar origem a uma **onda circular (ripple)** que se propaga a partir do ponto clicado e se dissipa com o tempo (decaimento de amplitude).
- Suportar múltiplas ondas simultâneas (múltiplos cliques seguidos), com um limite razoável (ex: até 5-8 ondas ativas ao mesmo tempo, usando um array de uniforms ou textura de estado).
- Cada onda precisa de: ponto de origem (`vec2`), tempo de início (`float`), e ser removida do array quando sua amplitude decair a ~0.

### Toque (mobile)
- Mapear eventos de `touchmove` e `touchstart` para o mesmo comportamento de mouse move e clique, respectivamente.

---

## Estrutura de Componentes Sugerida

```
/components
  /WaterBackground
    WaterBackground.tsx       -> componente principal, monta o Canvas do R3F
    WaterMaterial.ts          -> shaderMaterial customizado (vertex + fragment)
    useMouseRipples.ts        -> hook que gerencia estado de mouse + array de ripples
    shaders/
      water.vert.glsl
      water.frag.glsl
```

- `WaterBackground` deve ser um componente client-side (`"use client"`), posicionado com `position: fixed; inset: 0; z-index: -1;` (ou equivalente via Tailwind: `fixed inset-0 -z-10`).
- Deve aceitar props opcionais para customização básica: `baseColor`, `reflectionColor`, `waveSpeed`, `rippleIntensity`.

---

## Critérios de Aceite

1. O efeito cobre 100% do viewport como background fixo, sem interferir na interação com o conteúdo acima (mouse events devem passar por cima do canvas via listener no `window`, não bloqueando cliques em botões/links — usar `pointer-events: none` no canvas e capturar eventos no documento).
2. Mover o mouse gera distorção visível e suave na água em tempo real.
3. Clicar gera uma onda que se propaga e desaparece naturalmente (sem "sumir" abruptamente).
4. Sem quedas de frame perceptíveis em uso normal (validar visualmente via Playwright MCP, incluindo captura de screenshot em diferentes momentos da interação).
5. Funciona em pelo menos as duas últimas versões de Chrome, Firefox e Safari.
6. Fallback gracioso (ex: gradiente estático sem shader) caso `WebGL2RenderingContext` não esteja disponível.

---

## Validação (Playwright MCP — subagente obrigatório)

- Abrir a página, aguardar o canvas montar.
- Simular `mousemove` em ao menos 3 posições diferentes e capturar screenshot após cada uma, confirmando alteração visual da superfície.
- Simular `click` em um ponto e capturar screenshots em t=0s, t=0.5s e t=1.5s para confirmar a propagação e dissipação da onda.
- Verificar no console do navegador que não há erros de compilação de shader (`gl.getShaderInfoLog`) nem warnings de contexto WebGL perdido.

---

## Fora de Escopo (nesta versão)
- Reflexo real do conteúdo da página (DOM-to-texture)
- Física de fluidos real (Navier-Stokes completo) — usar aproximação via ruído + ripples, não simulação física exata
- Suporte a WebGPU
