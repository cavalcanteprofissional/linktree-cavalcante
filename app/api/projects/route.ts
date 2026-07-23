import { NextResponse } from "next/server";

const PORTFOLIO_RAW_URL =
  "https://raw.githubusercontent.com/cavalcanteprofissional/portfolio/main/src/data/projects.json";

export const revalidate = 1800;

export async function GET() {
  try {
    const res = await fetch(PORTFOLIO_RAW_URL, { next: { revalidate: 1800 } });
    if (!res.ok) {
      console.error("[projects/api] Portfolio fetch error:", res.status);
      return NextResponse.json({ projects: [], source: "error" }, { status: 502 });
    }
    const data = await res.json();
    const projects = (data.projects ?? [])
      .toSorted((a: { id: number }, b: { id: number }) => b.id - a.id)
      .slice(0, 5)
      .map((p: { id: number; titleKey: string; descriptionKey: string; demoUrl: string; codeUrl: string; icon: string; tech: string[]; status: string }) => ({
        id: p.id,
        titleKey: p.titleKey,
        descriptionKey: p.descriptionKey,
        demoUrl: p.demoUrl,
        codeUrl: p.codeUrl,
        icon: p.icon,
        tech: p.tech,
        status: p.status,
      }));
    return NextResponse.json({ projects, source: "github" });
  } catch (err) {
    console.error("[projects/api] fetch failed:", err);
    return NextResponse.json({ projects: [], source: "error" }, { status: 500 });
  }
}
