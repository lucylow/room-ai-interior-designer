import { RetailerAdapter } from './retailer-contract';

export class RetailerRegistry {
  private readonly map = new Map<string, RetailerAdapter>();
  register(adapter: RetailerAdapter): void { this.map.set(adapter.id, adapter); }
  get(id: string): RetailerAdapter | undefined { return this.map.get(id); }
  list(): RetailerAdapter[] { return [...this.map.values()]; }
}

export function requireLiveCatalog(adapter: RetailerAdapter): void {
  if (!adapter.capability.liveCatalog) throw new Error('This adapter is snapshot-only; live catalog data is unavailable.');
}
