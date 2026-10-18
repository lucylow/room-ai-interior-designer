export class NonceReplayGuard {
  private readonly seen = new Map<string, number>();
  constructor(private readonly ttlMs = 120_000) {}
  accept(nonce: string, now = Date.now()): boolean {
    this.gc(now);
    if (this.seen.has(nonce)) return false;
    this.seen.set(nonce, now);
    return true;
  }
  private gc(now: number): void { for (const [nonce, createdAt] of this.seen) if (now - createdAt > this.ttlMs) this.seen.delete(nonce); }
}
