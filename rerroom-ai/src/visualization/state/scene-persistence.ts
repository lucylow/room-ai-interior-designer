import type { SpatialScene } from '../core/types';
import { deserializeScene, serializeScene } from '../core/serialization';

export interface SceneStorageAdapter {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

export const localStorageAdapter: SceneStorageAdapter = {
  get: key => typeof localStorage === 'undefined' ? null : localStorage.getItem(key),
  set: (key, value) => { if (typeof localStorage !== 'undefined') localStorage.setItem(key, value); },
  remove: key => { if (typeof localStorage !== 'undefined') localStorage.removeItem(key); },
};

export function saveScene(adapter: SceneStorageAdapter, key: string, scene: SpatialScene): void {
  const serialized = serializeScene(scene);
  const existing = adapter.get(key);
  if (existing !== null) {
    // Preserve corrupt or newer-schema records for recovery instead of overwriting them with defaults.
    deserializeScene(existing);
  }
  adapter.set(key, serialized);
}

export function loadScene(adapter: SceneStorageAdapter, key: string): SpatialScene | null {
  const raw = adapter.get(key);
  if (!raw) return null;
  try {
    return deserializeScene(raw);
  } catch {
    throw new Error('Saved visualization data is invalid or uses an unsupported version. Existing data was preserved.');
  }
}

export function deleteScene(adapter: SceneStorageAdapter, key: string): void {
  adapter.remove(key);
}
