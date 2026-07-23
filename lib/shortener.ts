import { staticShortLinks } from "@/config/shortener-static.config";

export async function resolveShortcode(code: string): Promise<string | null> {
  return staticShortLinks[code] ?? null;
}
