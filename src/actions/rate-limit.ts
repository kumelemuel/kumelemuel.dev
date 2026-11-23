/**
 * Upstash Redis adapter for the contact rate limit. The rules (limit, window, key, wait
 * message) live in src/lib/contact.ts; this file only talks to Redis.
 */
import { KL_KV_REST_API_TOKEN, KL_KV_REST_API_URL } from "astro:env/server";
import { Redis } from "@upstash/redis";
import { RATE_LIMIT_WINDOW_SECONDS } from "../lib/contact";

const redis = new Redis({ url: KL_KV_REST_API_URL, token: KL_KV_REST_API_TOKEN });

/**
 * Counts one send for `key` and returns the sends in the current window and its remaining
 * seconds. The window starts with the first send (EXPIRE NX) and is not extended by later ones.
 */
export async function hitRateLimit(key: string): Promise<{ count: number; ttlSeconds: number }> {
  const [count, , ttlSeconds] = await redis
    .multi()
    .incr(key)
    .expire(key, RATE_LIMIT_WINDOW_SECONDS, "NX")
    .ttl(key)
    .exec<[number, number, number]>();
  return { count, ttlSeconds };
}
