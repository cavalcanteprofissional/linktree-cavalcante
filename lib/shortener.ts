import { hasSupabase, getSupabaseClient } from "./supabase";
import { staticShortLinks } from "@/config/shortener-static.config";

export async function resolveShortcode(code: string): Promise<string | null> {
  if (hasSupabase) {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("links")
        .select("destination_url")
        .eq("short_code", code)
        .eq("active", true)
        .single();

      if (!error && data) {
        return data.destination_url;
      }
    } catch {
      // fallback to static map on error
    }
  }

  return staticShortLinks[code] ?? null;
}
