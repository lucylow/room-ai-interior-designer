import { afterEach, describe, expect, it, vi } from 'vitest';
import { hydrateDomain, persistDomain } from '../../state/persistence/persist-domain';
import { MemoryStorage, type KeyValueStorage } from '../../security/storage';

const originalWarn = console.warn;
afterEach(() => { console.warn = originalWarn; vi.restoreAllMocks(); });

describe('domain persistence failure handling', () => {
  it('preserves corrupt stored bytes instead of deleting them during hydration', () => {
    const storage = new MemoryStorage();
    storage.setItem('state', '{corrupt');
    const hydrate = vi.fn();
    console.warn = vi.fn();
    const restored = hydrateDomain({ key: 'state', schema: 1, storage, select: () => ({}), hydrate });
    expect(restored).toBe(false);
    expect(hydrate).not.toHaveBeenCalled();
    expect(storage.getItem('state')).toBe('{corrupt');
  });

  it('does not throw when storage writes are denied', () => {
    const storage: KeyValueStorage = {
      getItem: () => null,
      setItem: () => { throw new Error('sensitive browser exception'); },
      removeItem: () => undefined,
      clear: () => undefined,
    };
    console.warn = vi.fn();
    expect(() => persistDomain({ key: 'state', schema: 1, storage, select: () => ({ value: 1 }), hydrate: () => undefined })).not.toThrow();
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Local state write failed'));
  });
});
