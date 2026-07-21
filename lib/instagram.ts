export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  source: "api" | "mock";
}

export async function fetchInstagramFeed(): Promise<InstagramPost[]> {
  // [PLACEHOLDER] Será implementado na Etapa 6
  return [];
}
