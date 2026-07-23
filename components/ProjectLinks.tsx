"use client";

import { useEffect, useState, useCallback } from "react";
import { icons } from "@/lib/icons";
import { fetchProjects } from "@/lib/projects";
import ProjectModal from "./ProjectModal";
import type { ResolvedProject } from "@/lib/projects";

type Lang = "pt" | "en" | "es";

const LANG_LABELS: Record<Lang, string> = { pt: "PT", en: "EN", es: "ES" };

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

const STORAGE_KEY = "linktree-projects-lang";

export default function ProjectLinks() {
  const [projects, setProjects] = useState<ResolvedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Lang>("pt");
  const [modalProject, setModalProject] = useState<ResolvedProject | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "es") setLang(saved);
    } catch { }
  }, []);

  useEffect(() => {
    fetchProjects(lang)
      .then(setProjects)
      .catch((err) => {
        console.warn("[projects-links] fetch failed:", err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, [lang]);

  const handleLangChange = useCallback((l: Lang) => {
    setLang(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { }
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 w-full h-12 px-5 rounded-xl bg-secondary border border-border animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (projects.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Projetos
        </h2>
        <div className="flex gap-1">
          {(Object.entries(LANG_LABELS) as [Lang, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleLangChange(key)}
              className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                lang === key
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => setModalProject(project)}
          style={{
            boxShadow:
              "0 0 4px hsla(212, 75%, 55%, 0.3), 0 0 8px hsla(212, 75%, 55%, 0.15)",
          }}
          className="flex items-center gap-3 w-full h-12 px-5 rounded-xl bg-secondary border border-border text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200 text-left"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 8px hsla(212, 75%, 55%, 0.6), 0 0 20px hsla(212, 75%, 55%, 0.4), 0 0 40px hsla(212, 75%, 55%, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 4px hsla(212, 75%, 55%, 0.3), 0 0 8px hsla(212, 75%, 55%, 0.15)";
          }}
        >
          <Icon name={project.icon} />
          <span className="text-sm font-medium truncate flex-1">{project.title}</span>
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              background: project.status === "andamento" ? "#eab308" : "#4ade80",
              boxShadow: project.status === "andamento"
                ? "0 0 4px rgba(234,179,8,0.6)"
                : "0 0 4px rgba(74,222,128,0.6)",
            }}
          />
        </button>
      ))}

      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
          lang={lang}
        />
      )}
    </div>
  );
}
