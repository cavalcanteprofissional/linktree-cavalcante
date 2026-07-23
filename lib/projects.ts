import { projectTranslations } from "@/config/projects-translations";
import { projectsMock } from "@/config/projects-mock.config";

export type ProjectStatus = "concluido" | "andamento";

export interface PortfolioProject {
  id: number;
  titleKey: string;
  descriptionKey: string;
  demoUrl: string;
  codeUrl: string;
  icon: string;
  tech: string[];
  status: ProjectStatus;
}

export interface ResolvedProject {
  id: number;
  title: string;
  description: string;
  demoUrl: string;
  codeUrl: string;
  icon: string;
  tech: string[];
  status: ProjectStatus;
}

const statusLabels: Record<ProjectStatus, { pt: string; en: string; es: string }> = {
  concluido: { pt: "Concluído", en: "Completed", es: "Completado" },
  andamento: { pt: "Em andamento", en: "In progress", es: "En progreso" },
};

export function getStatusLabel(status: ProjectStatus, lang: "pt" | "en" | "es"): string {
  return statusLabels[status]?.[lang] ?? status;
}

function resolveProject(p: PortfolioProject, lang: "pt" | "en" | "es"): ResolvedProject {
  return {
    id: p.id,
    title: projectTranslations[p.titleKey]?.[lang] ?? p.titleKey,
    description: projectTranslations[p.descriptionKey]?.[lang] ?? p.descriptionKey,
    demoUrl: p.demoUrl,
    codeUrl: p.codeUrl,
    icon: p.icon,
    tech: p.tech,
    status: p.status,
  };
}

export async function fetchProjects(lang: "pt" | "en" | "es"): Promise<ResolvedProject[]> {
  try {
    const res = await fetch("/api/projects", { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(`API /api/projects: ${res.status}`);
    const data: { projects: PortfolioProject[] } = await res.json();
    if (!data.projects || data.projects.length === 0) throw new Error("API retornou 0 projetos");
    return data.projects.map((p) => resolveProject(p, lang));
  } catch (err) {
    console.warn("[projects] API failed, using mock fallback:", err);
    return projectsMock.map((p) => resolveProject(p, lang));
  }
}
