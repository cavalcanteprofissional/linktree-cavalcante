export interface PortfolioProject {
  id: number;
  titleKey: string;
  descriptionKey: string;
  demoUrl: string;
  codeUrl: string;
  icon: string;
  tech: string[];
  status: "concluido" | "andamento";
}

export const projectsMock: PortfolioProject[] = [
  {
    id: 15,
    titleKey: "project.15.title",
    descriptionKey: "project.15.description",
    demoUrl: "#",
    codeUrl: "https://github.com/cavalcanteprofissional/cd-price-tracker",
    icon: "shopping-cart",
    tech: ["Python", "Playwright", "Next.js", "TypeScript", "Supabase", "Recharts", "GitHub Actions"],
    status: "andamento",
  },
  {
    id: 14,
    titleKey: "project.14.title",
    descriptionKey: "project.14.description",
    demoUrl: "https://jobmatch-frontend-u6vt.onrender.com",
    codeUrl: "https://github.com/cavalcanteprofissional/jobmatch-ai",
    icon: "scan-search",
    tech: ["Python", "FastAPI", "scikit-learn", "XGBoost", "React", "TypeScript", "Tailwind CSS", "Docker"],
    status: "concluido",
  },
  {
    id: 13,
    titleKey: "project.13.title",
    descriptionKey: "project.13.description",
    demoUrl: "https://pro-git-app-bot-owjnuwabjucpds3nannzwh.streamlit.app/",
    codeUrl: "https://github.com/cavalcanteprofissional/pro-git-qa-bot",
    icon: "message-circle-question",
    tech: ["Python", "Streamlit", "LangChain", "Ollama", "Git"],
    status: "concluido",
  },
  {
    id: 12,
    titleKey: "project.12.title",
    descriptionKey: "project.12.description",
    demoUrl: "https://sanova-micromedicao-dashboard-hlmw3spgxuthzebvxa7thg.streamlit.app/",
    codeUrl: "https://github.com/cavalcanteprofissional/sanova-micromedicao-dashboard-",
    icon: "chart-line",
    tech: ["Python", "Streamlit", "Pandas", "NumPy", "Plotly", "Cohere API", "Poetry", "Pytest"],
    status: "concluido",
  },
  {
    id: 11,
    titleKey: "project.11.title",
    descriptionKey: "project.11.description",
    demoUrl: "https://ceara-alternativo.vercel.app/",
    codeUrl: "https://github.com/cavalcanteprofissional/ceara-alternativo",
    icon: "newspaper",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    status: "concluido",
  },
];
