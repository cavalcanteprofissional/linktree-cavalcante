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

      if (error && process.env.NODE_ENV === "development") {
        console.warn(`[shortener] Supabase lookup failed for "${code}":`, error);
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[shortener] Supabase exception for "${code}":`, err);
      }
    }
  }

  return staticShortLinks[code] ?? null;
}
