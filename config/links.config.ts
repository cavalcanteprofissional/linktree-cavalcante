export interface LinkItem {
  label: string;
  url: string;
  shortCode?: string;
  icon?: string;
}

export const links: LinkItem[] = [
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/cavalcante-lucas",
    shortCode: "in",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    url: "https://github.com/cavalcanteprofissional",
    shortCode: "github",
    icon: "github",
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/5585996859051",
    shortCode: "wpp",
    icon: "message-circle",
  },
  {
    label: "Portfólio",
    url: "https://cavalcanteprofissional.github.io/portfolio",
    shortCode: "portfolio",
    icon: "briefcase",
  },
  {
    label: "Lattes",
    url: "http://lattes.cnpq.br/7686247677030579",
    shortCode: "lattes",
    icon: "book-open",
  },
];
