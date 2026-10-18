import { encodeVersioned, decodeVersioned } from './codec';
import type { KeyValueStorage } from '../../security/storage';
import { getSafeBrowserStorage } from '../../security/storage';

export interface PersistConfig<T> {
  key: string;
  schema: number;
  storage?: KeyValueStorage;
  select: () => T;
  hydrate: (value: T) => void;
}

const reportedFailures = new Set<string>();

function reportFailure(operation: 'read' | 'write', key: string): void {
  if (reportedFailures.has(`${operation}:${key}`)) return;
  console.warn(`[RE:ROOM] Local state ${operation} failed; saved data was not intentionally removed.`);
  reportedFailures.add(`${operation}:${key}`);
}

export function persistDomain<T>(config: PersistConfig<T>): void {
  const storage = config.storage ?? getSafeBrowserStorage();
  try {
    storage.setItem(config.key, encodeVersioned(config.select(), config.schema));
  } catch {
    reportFailure('write', config.key);
  }
}

export function hydrateDomain<T>(config: PersistConfig<T>): boolean {
  const storage = config.storage ?? getSafeBrowserStorage();
  let raw: string | null;
  try {
    raw = storage.getItem(config.key);
  } catch {
    reportFailure('read', config.key);
    return false;
  }
  if (!raw) return false;
  try {
    const record = decodeVersioned<T>(raw);
    if (record.schema !== config.schema) return false;
    config.hydrate(record.value);
    return true;
  } catch {
    // Keep the original bytes for recovery instead of deleting unparseable user state.
    reportFailure('read', config.key);
    return false;
  }
}
