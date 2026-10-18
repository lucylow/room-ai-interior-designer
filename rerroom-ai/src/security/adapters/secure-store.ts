export interface SecureStoreAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  readonly backend: 'native-keychain' | 'web-encrypted' | 'memory';
}

export class MemorySecureStore implements SecureStoreAdapter {
  readonly backend = 'memory' as const;
  private readonly map = new Map<string, unknown>();

  async get<T>(key: string): Promise<T | null> { return (this.map.get(key) as T | undefined) ?? null; }
  async set<T>(key: string, value: T): Promise<void> { this.map.set(key, value); }
  async remove(key: string): Promise<void> { this.map.delete(key); }
  async clear(): Promise<void> { this.map.clear(); }
}

export interface NativeKeychainBridge {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

export class NativeKeychainSecureStore implements SecureStoreAdapter {
  readonly backend = 'native-keychain' as const;
  constructor(private readonly bridge: NativeKeychainBridge) {}
  get<T>(key: string): Promise<T | null> { return this.bridge.getItem<T>(key); }
  set<T>(key: string, value: T): Promise<void> { return this.bridge.setItem(key, value); }
  remove(key: string): Promise<void> { return this.bridge.removeItem(key); }
  clear(): Promise<void> { return this.bridge.clear(); }
}
