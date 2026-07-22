"use client";

import { icons } from "@/lib/icons";

const socials = [
  { label: "LinkedIn", url: "https://linkedin.com/in/cavalcante-lucas", icon: "linkedin" },
  { label: "GitHub", url: "https://github.com/cavalcanteprofissional", icon: "github" },
  { label: "WhatsApp", url: "https://wa.me/5585996859051", icon: "whatsapp" },
  { label: "Instagram", url: "https://instagram.com/cavalcanteprofissional", icon: "instagram" },
  { label: "Portfólio", url: "https://cavalcanteprofissional.github.io/portfolio", icon: "globe" },
  { label: "Lattes", url: "http://lattes.cnpq.br/7686247677030579", icon: "book-open" },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center justify-center gap-4 mt-2">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          style={{
            boxShadow:
              "0 0 4px hsla(212, 75%, 55%, 0.3), 0 0 8px hsla(212, 75%, 55%, 0.15)",
          }}
          className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-200"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 8px hsla(212, 75%, 55%, 0.6), 0 0 20px hsla(212, 75%, 55%, 0.4), 0 0 40px hsla(212, 75%, 55%, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 4px hsla(212, 75%, 55%, 0.3), 0 0 8px hsla(212, 75%, 55%, 0.15)";
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path d={icons[s.icon] ?? icons.link} />
          </svg>
        </a>
      ))}
    </div>
  );
}
