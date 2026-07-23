# Seção de Localização — Portfólio

## Referência

O design abaixo foi inspirado na seção de localidade de [Lucasbsilva11/Portfolio](https://lucasbsilva11.github.io/Portfolio/):

- Mapa como fundo visual (imagem estática ou interativa)
- **Popup card flutuante** com efeito glass (backdrop-filter blur) sobre o mapa
- Badge com dot pulsante + nome da cidade + ícone de mapa
- Título com destaque de cor no país/estado
- Divisor sutil
- Parágrafo descritivo sobre a cidade
- Animação flutuante suave (float up/down) no card

---

## Estrutura HTML

```html
<section class="location section" id="localidade">
  <div class="container">
    <div class="location-header">
      <span class="label">Localidade</span>
      <h2 class="section-title">
        Onde estou <span class="accent">no mundo.</span>
      </h2>
    </div>
  </div>

  <div class="location-map-wrap">
    <!-- Mapa -->
    <iframe class="map-frame-desktop" src="..." loading="lazy"></iframe>
    <img class="map-img-mobile" src="map-mobile.jpg" alt="Mapa de Fortaleza" loading="lazy" />

    <!-- Overlay sutil sobre o mapa -->
    <div class="map-overlay"></div>

    <!-- Card flutuante (glass effect) -->
    <article class="location-card">
      <div class="loc-badge">
        <span class="loc-dot"></span>
        Fortaleza, Brasil
        <svg><!-- map-pin icon --></svg>
      </div>

      <h3 class="loc-title">
        Fortaleza<br>
        <span class="accent">Ceará</span>
      </h3>

      <div class="loc-divider"></div>

      <p class="loc-bio">
        Capital do Ceará, um dos principais polos de tecnologia e inovação do Nordeste brasileiro.
        Reconhecida por suas praias paradisíacas, cultura rica e forte movimento de startups.
      </p>
    </article>
  </div>
</section>
```

---

## CSS

```css
/* ── Seção ── */
.location {
  padding: 80px 0 0;
}

.location > .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.location-header {
  margin-bottom: 40px;
}

.location-header .label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.location-header .section-title {
  margin-bottom: 0;
}

/* ── Mapa wrapper ── */
.location-map-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

/* Desktop: iframe interativo */
.map-frame-desktop {
  display: block;
  width: 100%;
  height: 480px;
  border: 0;
  filter: grayscale(0.4) brightness(0.55) contrast(1.15);
}

/* Mobile: imagem estática */
.map-img-mobile {
  display: none;
  width: 100%;
  height: auto;
}

/* Overlay escuro sobre o mapa */
.map-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.05) 60%
  );
  pointer-events: none;
}

/* ── Card flutuante ── */
.location-card {
  position: absolute;
  left: 55%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(15, 20, 35, 0.16);
  backdrop-filter: blur(22px) saturate(160%);
  -webkit-backdrop-filter: blur(22px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  padding: 28px 28px 24px;
  width: 310px;
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
  animation: loc-float 4s ease-in-out infinite;
}

@keyframes loc-float {
  0%, 100% { transform: translateY(-50%); }
  50%      { transform: translateY(calc(-50% - 7px)); }
}

/* ── Badge ── */
.loc-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 4px 12px 4px 8px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
}

.loc-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  animation: loc-pulse 2s ease-in-out infinite;
}

@keyframes loc-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
  50%      { opacity: 0.85; box-shadow: 0 0 0 5px rgba(74, 222, 128, 0); }
}

.loc-badge svg {
  width: 11px;
  height: 11px;
}

/* ── Título ── */
.loc-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
  line-height: 1.25;
}

.loc-title .accent {
  color: var(--primary);
}

/* ── Separador ── */
.loc-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 18px 0;
}

/* ── Bio ── */
.loc-bio {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.75;
  margin: 0;
}

.loc-bio strong {
  color: rgba(255, 255, 255, 0.88);
}

/* ── Responsivo ── */
@media (max-width: 768px) {
  .map-frame-desktop { display: none; }
  .map-img-mobile { display: block; }

  .location-card {
    left: 50%;
    top: 250px;
    transform: translate(-50%, -50%);
    width: calc(100% - 48px);
    max-width: 300px;
  }

  .loc-badge { display: none; }
  .loc-title { display: none; }
  .loc-divider { display: none; }

  .map-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.45) 100%
    );
  }
}
```

---

## Imagens do Mapa

Para gerar as imagens estáticas do mapa (desktop e mobile) use o serviço **Mapbox Static API** com estilo escuro:

### Desktop (480px altura, landscape)

```
https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+4f8ef7(-38.475,-3.785)/-38.475,-3.785,11,0/1200x480@2x?access_token=SEU_TOKEN
```

### Mobile (portrait, largura total)

```
https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l+4f8ef7(-38.475,-3.785)/-38.475,-3.785,11,0/400x600@2x?access_token=SEU_TOKEN
```

> **Nota:** Substitua `SEU_TOKEN` por um token público da Mapbox (criar em [mapbox.com](https://account.mapbox.com/)). As coordenadas `-38.475,-3.785` são de Fortaleza.

---

## Adaptação para Next.js + React

Se o portfólio usar React/Next.js, o componente fica:

```tsx
"use client";

export default function LocationSection() {
  return (
    <section className="location section" id="localidade">
      <div className="container">
        <div className="location-header">
          <span className="label">Localidade</span>
          <h2 className="section-title">
            Onde estou <span className="accent">no mundo.</span>
          </h2>
        </div>
      </div>

      <div className="location-map-wrap">
        <img
          className="map-frame-desktop"
          src="/images/map-desktop.png"
          alt="Mapa de Fortaleza"
          loading="lazy"
        />
        <img
          className="map-img-mobile"
          src="/images/map-mobile.png"
          alt="Mapa de Fortaleza"
          loading="lazy"
        />

        <div className="map-overlay" />

        <article className="location-card">
          <div className="loc-badge">
            <span className="loc-dot" />
            Fortaleza, Brasil
            <MapPinIcon />
          </div>

          <h3 className="loc-title">
            Fortaleza<br />
            <span className="accent">Ceará</span>
          </h3>

          <div className="loc-divider" />

          <p className="loc-bio">
            Capital do Ceará, um dos principais polos de tecnologia e inovação do Nordeste brasileiro.
            Reconhecida por suas praias paradisíacas, cultura rica e forte movimento de startups.
          </p>
        </article>
      </div>
    </section>
  );
}

function MapPinIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
```

---

## Resumo dos Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `src/components/Location.tsx` | Componente React da seção |
| `public/images/map-desktop.png` | Mapa estático desktop (gerado via Mapbox) |
| `public/images/map-mobile.png` | Mapa estático mobile (gerado via Mapbox) |
| `src/styles/location.css` | Estilos da seção |

---

## Dependências

Nenhuma — usa apenas CSS nativo e imagens estáticas. Para o mapa interativo (opcional), pode-se substituir a imagem por um iframe do OpenStreetMap com os mesmos filtros CSS escuros.
