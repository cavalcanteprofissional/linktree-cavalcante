export interface InstagramMockPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
}

export const instagramMockPosts: InstagramMockPost[] = [
  {
    id: "mock-1",
    imageUrl: "https://placehold.co/400x400/1e293b/38bdf8?text=Post+1",
    caption: "[PLACEHOLDER: legenda do post 1]",
    permalink: "#",
  },
  {
    id: "mock-2",
    imageUrl: "https://placehold.co/400x400/1e293b/38bdf8?text=Post+2",
    caption: "[PLACEHOLDER: legenda do post 2]",
    permalink: "#",
  },
  {
    id: "mock-3",
    imageUrl: "https://placehold.co/400x400/1e293b/38bdf8?text=Post+3",
    caption: "[PLACEHOLDER: legenda do post 3]",
    permalink: "#",
  },
];
