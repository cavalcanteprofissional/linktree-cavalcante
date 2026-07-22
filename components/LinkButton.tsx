"use client";

import { icons } from "@/lib/icons";

function Icon({ name }: { name: string }) {
  const path = icons[name] ?? icons.link;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 shrink-0"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export default function LinkButton({
  label,
  url,
  icon,
}: {
  label: string;
  url: string;
  icon?: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${label} em nova aba`}
      style={{
        boxShadow:
          "0 0 4px hsla(212, 75%, 55%, 0.3), 0 0 8px hsla(212, 75%, 55%, 0.15)",
      }}
      className="flex items-center gap-3 w-full h-12 px-5 rounded-xl bg-secondary border border-border text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 8px hsla(212, 75%, 55%, 0.6), 0 0 20px hsla(212, 75%, 55%, 0.4), 0 0 40px hsla(212, 75%, 55%, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 4px hsla(212, 75%, 55%, 0.3), 0 0 8px hsla(212, 75%, 55%, 0.15)";
      }}
    >
      {icon && <Icon name={icon} />}
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
