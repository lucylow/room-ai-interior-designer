export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export class MemoryStorage implements KeyValueStorage {
  private readonly map = new Map<string, string>();
  getItem(key: string): string | null { return this.map.get(key) ?? null; }
  setItem(key: string, value: string): void { this.map.set(key, value); }
  removeItem(key: string): void { this.map.delete(key); }
  clear(): void { this.map.clear(); }
}

export function getSafeBrowserStorage(): KeyValueStorage {
  try {
    const storage = globalThis.localStorage;
    const probe = '__rerroom_storage_probe__';
    storage.setItem(probe, '1');
    storage.removeItem(probe);
    return storage;
  } catch {
    return new MemoryStorage();
  }
}
