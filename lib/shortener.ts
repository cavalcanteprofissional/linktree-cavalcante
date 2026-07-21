import { hasSupabase } from "./supabase";

const staticLinksMap: Record<string, string> = {};

export async function resolveShortcode(code: string): Promise<string | null> {
  if (hasSupabase) {
    // [PLACEHOLDER] Será implementado na Etapa 3
  }
  return staticLinksMap[code] ?? null;
}
