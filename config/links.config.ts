export interface LinkItem {
  label: string;
  url: string;
  shortCode?: string;
  icon?: string;
}

export const links: LinkItem[] = [
  {
    label: "Instagram",
    url: "https://instagram.com/[PLACEHOLDER_USERNAME]",
    shortCode: "ig",
    icon: "instagram",
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/[PLACEHOLDER_NUMERO]",
    shortCode: "wpp",
    icon: "whatsapp",
  },
  {
    label: "Portfólio",
    url: "https://cavalcanteprofissional.github.io/portfolio",
    shortCode: "portfolio",
    icon: "external-link",
  },
  {
    label: "[PLACEHOLDER: label do link]",
    url: "[PLACEHOLDER: URL do link]",
    shortCode: "[PLACEHOLDER: shortcode]",
    icon: "link",
  },
];
