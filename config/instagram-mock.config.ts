export interface InstagramMockPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
}

export const instagramMockPosts: InstagramMockPost[] = [
  {
    id: "mock-1",
    imageUrl: "https://placehold.co/400x400/1e293b/3b82f6?text=Em+Breve",
    caption: "Em breve — novos projetos sendo lançados",
    permalink: "https://github.com/cavalcanteprofissional",
  },
  {
    id: "mock-2",
    imageUrl: "https://placehold.co/400x400/1e293b/3b82f6?text=Data+AI",
    caption: "Análise de dados com inteligência artificial",
    permalink: "https://cavalcanteprofissional.github.io/portfolio",
  },
  {
    id: "mock-3",
    imageUrl: "https://placehold.co/400x400/1e293b/3b82f6?text=Contato",
    caption: "Fale comigo pelo WhatsApp",
    permalink: "https://wa.me/5585996859051",
  },
];
