import { NextResponse } from "next/server";
import { fetchInstagramFeed } from "@/lib/instagram";

export const revalidate = 1800;

export async function GET() {
  try {
    const posts = await fetchInstagramFeed();
    return NextResponse.json({ posts, source: posts[0]?.source ?? "none" });
  } catch {
    return NextResponse.json({ posts: [], source: "error" }, { status: 500 });
  }
}
