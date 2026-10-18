import { describe, expect, it } from 'vitest';
import { makePersistedViewState, parsePersistedViewState, safePersistedJson } from '../../visualization/state/view-persistence';

const input = {
  mode: 'plan' as const,
  viewport: { x: 0, y: 0, zoom: 1, width: 800, height: 600, rotation: 0 },
  camera: { position: { x: 2, y: 3, z: 4 }, target: { x: 0, y: 0, z: 0 }, fov: 50, near: 0.1, far: 100 },
  toggles: { showGrid: true, showDimensions: true, showLabels: true, showOpenings: true, showShadows: true, showCeiling: false, showFurniture: true, reducedMotion: false, presentationMode: false },
};

describe('persisted visualization view state', () => {
  it('round-trips valid view preferences', () => {
    const state = makePersistedViewState(input);
    expect(parsePersistedViewState(safePersistedJson(state))).toEqual(state);
  });

  it('rejects non-finite viewport values and malformed camera settings', () => {
    expect(() => makePersistedViewState({ ...input, viewport: { ...input.viewport, zoom: Number.NaN } })).toThrow(/viewport/i);
    const malformed = { ...makePersistedViewState(input), camera: { ...input.camera, near: 200, far: 100 } };
    expect(() => safePersistedJson(malformed)).toThrow(/camera/i);
  });

  it('rejects unknown view modes and unsupported view versions', () => {
    expect(() => parsePersistedViewState(JSON.stringify({ ...makePersistedViewState(input), mode: 'future-mode' }))).toThrow(/malformed/i);
    expect(() => parsePersistedViewState(JSON.stringify({ ...makePersistedViewState(input), version: 99 }))).toThrow(/malformed/i);
  });
});
