import { Redis } from "@upstash/redis";

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;

export const hasKV = !!url && !!token;

export function getKV() {
  if (!hasKV) {
    throw new Error("KV_REST_API_URL not configured");
  }
  return new Redis({ url: url!, token: token! });
}
