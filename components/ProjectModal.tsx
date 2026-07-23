"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { icons } from "@/lib/icons";
import type { ResolvedProject } from "@/lib/projects";
import { getStatusLabel } from "@/lib/projects";

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

export default function ProjectModal({
  project,
  onClose,
  lang = "pt",
}: {
  project: ResolvedProject;
  onClose: () => void;
  lang?: "pt" | "en" | "es";
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const hasDemo = project.demoUrl && project.demoUrl !== "#";

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-sm bg-secondary border border-border rounded-2xl p-6 shadow-2xl animate-fade-in-up"
        style={{
          boxShadow:
            "0 0 4px hsla(212, 75%, 55%, 0.3), 0 0 8px hsla(212, 75%, 55%, 0.15)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
            <Icon name={project.icon} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: project.status === "andamento" ? "#eab308" : "#4ade80",
                  boxShadow: project.status === "andamento"
                    ? "0 0 4px rgba(234,179,8,0.6)"
                    : "0 0 4px rgba(74,222,128,0.6)",
                }}
              />
              <span className="text-xs text-muted-foreground font-medium">
                {getStatusLabel(project.status, lang)}
              </span>
            </div>
            <h2 className="text-lg font-bold text-foreground leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary/80"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {hasDemo && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
              </svg>
              Demo
            </a>
          )}
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-secondary border border-border text-foreground text-sm font-medium hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Código
          </a>
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}
