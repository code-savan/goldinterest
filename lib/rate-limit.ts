import { NextResponse } from "next/server";

/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Best-effort on serverless (each instance tracks its own counters), which
 * is enough to blunt brute force and spam scripts. If abuse persists,
 * graduate to a shared store (e.g. Upstash Redis) behind the same `limit()`
 * signature.
 */

type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

function prune(now: number, windowMs: number) {
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      while (b.hits.length > 0 && b.hits[0] <= now - windowMs) b.hits.shift();
      if (b.hits.length === 0) buckets.delete(k);
    }
  }
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim().slice(0, 80);
  return req.headers.get("x-real-ip")?.slice(0, 80) || "unknown";
}

/** Returns null when allowed, or a 429 JSON response when over budget. */
export function limit(
  req: Request,
  scope: string,
  opts: { limit: number; windowMs: number }
): NextResponse | null {
  const now = Date.now();
  prune(now, opts.windowMs);
  const key = `${scope}:${clientIp(req)}`;
  const bucket = buckets.get(key) ?? { hits: [] as number[] };
  buckets.set(key, bucket);
  while (bucket.hits.length > 0 && bucket.hits[0] <= now - opts.windowMs) bucket.hits.shift();
  if (bucket.hits.length >= opts.limit) {
    const retryAfter = Math.ceil((bucket.hits[0] + opts.windowMs - now) / 1000);
    return NextResponse.json(
      { error: "Too many tries. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(Math.max(1, retryAfter)) } }
    );
  }
  bucket.hits.push(now);
  return null;
}
