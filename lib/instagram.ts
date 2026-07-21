import { hasSupabase, getSupabaseClient } from "./supabase";
import { instagramMockPosts } from "@/config/instagram-mock.config";

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  source: "api" | "mock";
}

const hasToken =
  !!process.env.INSTAGRAM_ACCESS_TOKEN &&
  !!process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

async function fetchFromApi(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN!;
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID!;

  const res = await fetch(
    `https://graph.facebook.com/v22.0/${accountId}/media?fields=id,media_url,caption,permalink&access_token=${token}`,
    { next: { revalidate: 1800 } }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error("[instagram] API error:", res.status, body);
    throw new Error(`Instagram API: ${res.status}`);
  }

  const data = await res.json();
  return (data.data ?? []).map((p: Record<string, string>) => ({
    id: p.id,
    imageUrl: p.media_url,
    caption: p.caption ?? "",
    permalink: p.permalink,
    source: "api" as const,
  }));
}

async function fetchFromSupabase(): Promise<InstagramPost[]> {
  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from("instagram_posts_mock")
      .select("id, image_url, caption, permalink")
      .eq("active", true)
      .order("order_index", { ascending: true });

    if (data && data.length > 0) {
      return data.map((p) => ({
        id: p.id,
        imageUrl: p.image_url,
        caption: p.caption ?? "",
        permalink: p.permalink,
        source: "mock" as const,
      }));
    }
  } catch {
    /* fallback silencioso */
  }
  return fetchFromConfig();
}

function fetchFromConfig(): InstagramPost[] {
  return instagramMockPosts.map((p) => ({ ...p, source: "mock" as const }));
}

export async function fetchInstagramFeed(): Promise<InstagramPost[]> {
  if (hasToken) {
    try {
      return await fetchFromApi();
    } catch (err) {
      console.warn("[instagram] API failed, falling back:", err);
    }
  }

  if (hasSupabase) {
    const fromDb = await fetchFromSupabase();
    if (fromDb.length > 0) return fromDb;
  }

  return fetchFromConfig();
}
