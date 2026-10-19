import type { PurchaseOutcome } from '../types';

interface CachedOutcome {
  outcome: PurchaseOutcome;
  expiresAt: number;
}

const VALID_OUTCOMES = new Set<PurchaseOutcome>([
  'success',
  'pending',
  'cancelled',
  'failed',
  'deferred',
]);

/**
 * In-memory request deduplication for a client process. Production purchase
 * idempotency must also be persisted by the trusted backend.
 */
export class PurchaseIdempotencyStore {
  private readonly inFlight = new Map<string, Promise<PurchaseOutcome>>();
  private readonly completed = new Map<string, CachedOutcome>();

  constructor(
    private readonly ttlMs = 30_000,
    private readonly now: () => number = Date.now,
  ) {
    if (!Number.isSafeInteger(ttlMs) || ttlMs < 0) {
      throw new RangeError('invalid_idempotency_ttl');
    }
  }

  async execute(
    key: string,
    operation: () => Promise<PurchaseOutcome>,
  ): Promise<PurchaseOutcome> {
    const normalizedKey = this.normalizeKey(key);
    if (typeof operation !== 'function') {
      throw new TypeError('invalid_purchase_operation');
    }

    this.pruneExpired();
    const cached = this.completed.get(normalizedKey);
    if (cached) return cached.outcome;

    const active = this.inFlight.get(normalizedKey);
    if (active) return active;

    const task = Promise.resolve()
      .then(operation)
      .then((outcome) => {
        if (!VALID_OUTCOMES.has(outcome)) {
          throw new TypeError('invalid_purchase_outcome');
        }

        // Failures and cancellations are retryable; successful, pending, or
        // deferred outcomes are briefly cached to stop duplicate purchase taps.
        if (outcome === 'success' || outcome === 'pending' || outcome === 'deferred') {
          this.completed.set(normalizedKey, {
            outcome,
            expiresAt: this.now() + this.ttlMs,
          });
        }
        return outcome;
      });

    this.inFlight.set(normalizedKey, task);
    try {
      return await task;
    } finally {
      if (this.inFlight.get(normalizedKey) === task) {
        this.inFlight.delete(normalizedKey);
      }
    }
  }

  clear(key: string): void {
    const normalizedKey = this.normalizeKey(key);
    this.completed.delete(normalizedKey);
  }

  size(): number {
    this.pruneExpired();
    return this.inFlight.size + this.completed.size;
  }

  private normalizeKey(key: string): string {
    if (typeof key !== 'string' || key.trim().length === 0 || key.length > 512) {
      throw new TypeError('invalid_idempotency_key');
    }
    return key.trim();
  }

  private pruneExpired(): void {
    const now = this.now();
    for (const [key, value] of this.completed) {
      if (value.expiresAt <= now) this.completed.delete(key);
    }
  }
}
