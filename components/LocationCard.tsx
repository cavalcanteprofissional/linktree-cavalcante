"use client";

import { useEffect, useState } from "react";

const address = {
  label: "Casa",
  street: "R. Cap. Olavo, 1111",
  neighborhood: "Aerolândia",
  city: "Fortaleza",
  state: "CE",
  zip: "60850-685",
  lat: -3.785,
  lon: -38.475,
};

const fullAddress = `${address.street} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zip}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export default function LocationCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-full mt-6 rounded-xl border border-border overflow-hidden animate-fade-in-up"
      style={{ opacity: visible ? undefined : 0 }}
    >
      <div className="w-full overflow-hidden" style={{ aspectRatio: "2 / 1" }}>
        <img
          src="/images/map.svg"
          alt="Mapa de Fortaleza"
          className="w-full h-full block select-none pointer-events-none object-cover object-top"
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 bg-secondary border border-border rounded-full px-3 py-1">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: "hsl(212, 75%, 55%)",
                boxShadow: "0 0 0 0 hsla(212, 75%, 55%, 0.5)",
                animation: "loc-pulse 2s ease-in-out infinite",
              }}
            />
            <span className="text-[11px] text-muted-foreground">
              {address.city}, Brasil
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-2.5 h-2.5 text-muted-foreground"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir localização no Google Maps"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors bg-secondary border border-border"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
            </svg>
            Maps
          </a>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Capital do Ceará, um dos principais polos de tecnologia e inovação do
          Nordeste brasileiro. Reconhecida por suas praias paradisíacas, cultura
          rica e forte movimento de startups e eventos de tecnologia.
        </p>
      </div>

      <style>{`
        @keyframes loc-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 hsla(212, 75%, 55%, 0.5); }
          50% { opacity: 0.85; box-shadow: 0 0 0 5px hsla(212, 75%, 55%, 0); }
        }
      `}</style>
    </div>
  );
}
