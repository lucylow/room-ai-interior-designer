import { describe, expect, it } from 'vitest';
import { deserializeScene, safeCloneScene, serializeScene } from '../../visualization/core/serialization';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';
import { loadScene, saveScene, type SceneStorageAdapter } from '../../visualization/state/scene-persistence';

function memoryAdapter(initial?: [string, string]): SceneStorageAdapter {
  const values = new Map<string, string>(initial ? [initial] : []);
  return {
    get: key => values.get(key) ?? null,
    set: (key, value) => { values.set(key, value); },
    remove: key => { values.delete(key); },
  };
}

describe('scene serialization', () => {
  it('round-trips a scene without changing its persisted timestamp', () => {
    const raw = serializeScene(DEMO_ROOMS[0]);
    const parsed = deserializeScene(raw);
    expect(parsed.room.width).toBe(DEMO_ROOMS[0].room.width);
    expect(parsed.objects.length).toBe(DEMO_ROOMS[0].objects.length);
    expect(parsed.metadata.updatedAt).toBe(DEMO_ROOMS[0].metadata.updatedAt);
  });

  it('clones without shared object references', () => {
    const clone = safeCloneScene(DEMO_ROOMS[0]);
    clone.objects[0].label = 'changed';
    expect(clone.objects[0].label).not.toBe(DEMO_ROOMS[0].objects[0].label);
  });

  it('rejects non-finite dimensions before they can be serialized as null', () => {
    const invalid = { ...DEMO_ROOMS[0], room: { ...DEMO_ROOMS[0].room, width: Number.NaN } };
    expect(() => serializeScene(invalid)).toThrow(/room.width/i);
  });

  it('rejects unknown future schemas and invalid object geometry', () => {
    expect(() => deserializeScene(JSON.stringify({ schema: 99, scene: DEMO_ROOMS[0] }))).toThrow(/unsupported/i);
    const invalid = structuredClone(DEMO_ROOMS[0]);
    invalid.objects[0].size.width = Number.POSITIVE_INFINITY;
    expect(() => serializeScene(invalid)).toThrow(/object.width/i);
  });

  it('preserves malformed stored data instead of overwriting it with a default scene', () => {
    const key = 'room:test';
    const corrupt = '{not valid json';
    const adapter = memoryAdapter([key, corrupt]);
    expect(() => loadScene(adapter, key)).toThrow(/preserved/i);
    expect(() => saveScene(adapter, key, DEMO_ROOMS[1])).toThrow();
    expect(adapter.get(key)).toBe(corrupt);
  });

  it('preserves unsupported future scene records during recovery', () => {
    const key = 'room:future';
    const future = JSON.stringify({ schema: 99, scene: DEMO_ROOMS[0] });
    const adapter = memoryAdapter([key, future]);
    expect(() => loadScene(adapter, key)).toThrow(/preserved/i);
    expect(() => saveScene(adapter, key, DEMO_ROOMS[1])).toThrow();
    expect(adapter.get(key)).toBe(future);
  });
});
