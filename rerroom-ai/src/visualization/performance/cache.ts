export interface CacheEntry<T> {
  value: T;
  bytes: number;
  createdAt: number;
  expiresAt?: number;
}

export class LRUCache<T> {
  private map = new Map<string, CacheEntry<T>>();
  constructor(private readonly maxEntries = 50, private readonly maxBytes = 64 * 1024 * 1024) {}

  private prune(): void {
    const now = Date.now();
    for (const [key, entry] of this.map) {
      if (entry.expiresAt !== undefined && entry.expiresAt <= now) this.map.delete(key);
    }
    while (this.map.size > this.maxEntries || this.bytes() > this.maxBytes) {
      const first = this.map.keys().next().value as string | undefined;
      if (first === undefined) break;
      this.map.delete(first);
    }
  }

  get(key: string): T | undefined {
    this.prune();
    const entry = this.map.get(key);
    if (!entry) return undefined;
    this.map.delete(key);
    this.map.set(key, entry);
    return entry.value;
  }

  set(key: string, value: T, bytes = 0, ttlMs?: number): void {
    this.map.delete(key);
    this.map.set(key, {
      value,
      bytes: Math.max(0, bytes),
      createdAt: Date.now(),
      expiresAt: ttlMs ? Date.now() + ttlMs : undefined,
    });
    this.prune();
  }

  delete(key: string): boolean { return this.map.delete(key); }
  clear(): void { this.map.clear(); }
  size(): number { return this.map.size; }
  bytes(): number { return [...this.map.values()].reduce((sum, item) => sum + item.bytes, 0); }
}

export const assetCache = new LRUCache<unknown>(80, 128 * 1024 * 1024);
