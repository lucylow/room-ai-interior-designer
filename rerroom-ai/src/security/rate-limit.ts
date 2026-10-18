export interface RateLimitDecision { allowed: boolean; remaining: number; retryAfterMs: number; }

export class SlidingWindowLimiter {
  private hits = new Map<string, number[]>();
  constructor(private readonly max: number, private readonly windowMs: number) {}

  check(key: string, now = Date.now()): RateLimitDecision {
    const start = now - this.windowMs;
    const current = (this.hits.get(key) ?? []).filter((timestamp) => timestamp > start);
    if (current.length >= this.max) {
      const retryAfterMs = Math.max(0, (current[0] + this.windowMs) - now);
      this.hits.set(key, current);
      return { allowed: false, remaining: 0, retryAfterMs };
    }
    current.push(now);
    this.hits.set(key, current);
    return { allowed: true, remaining: this.max - current.length, retryAfterMs: 0 };
  }

  clear(): void { this.hits.clear(); }
}
