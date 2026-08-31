// Simple in-memory rate limiter. Sufficient for single-instance deployments.
// For multi-instance (Vercel), swap for Upstash Redis when UPSTASH_REDIS_REST_URL is set.

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; remaining: number } {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1 }
  }

  if (bucket.count >= limit) {
    return { ok: false, remaining: 0 }
  }

  bucket.count += 1
  return { ok: true, remaining: limit - bucket.count }
}

// Periodic cleanup — prevents memory leak from stale buckets
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, b] of buckets.entries()) {
      if (b.resetAt < now) buckets.delete(key)
    }
  }, 60_000).unref?.()
}
