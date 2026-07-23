import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const hasKV = !!url && !!token;

export function getKV() {
  if (!hasKV) {
    throw new Error("Upstash Redis not configured");
  }
  return new Redis({ url: url!, token: token! });
}
