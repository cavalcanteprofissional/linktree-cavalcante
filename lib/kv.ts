import { createClient } from "@vercel/kv";

const kvUrl = process.env.KV_URL;
const kvToken = process.env.KV_REST_API_TOKEN;

export const hasKV = !!kvUrl && !!kvToken;

export function getKV() {
  if (!hasKV) {
    throw new Error("Vercel KV not configured");
  }
  return createClient({
    url: kvUrl!,
    token: kvToken!,
  });
}
