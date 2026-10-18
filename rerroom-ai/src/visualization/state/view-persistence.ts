import { safeJsonParse } from '../../security/safe-json';
import type { CameraPose, Viewport2D, ViewMode, VisualizationToggles } from '../core/types';

export interface PersistedViewState {
  version: 2;
  mode: ViewMode;
  viewport: Viewport2D;
  camera: CameraPose;
  toggles: VisualizationToggles;
}

const VIEW_MODES: ViewMode[] = ['plan', 'three-d', 'split', 'tour', 'compare'];
const TOGGLE_KEYS: Array<keyof VisualizationToggles> = [
  'showGrid', 'showDimensions', 'showLabels', 'showOpenings', 'showShadows', 'showCeiling', 'showFurniture', 'reducedMotion', 'presentationMode',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function finiteIn(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
}

function validateViewState(value: unknown): asserts value is PersistedViewState {
  if (!isRecord(value) || value.version !== 2 || !VIEW_MODES.includes(value.mode as ViewMode) || !isRecord(value.viewport) || !isRecord(value.camera) || !isRecord(value.toggles)) {
    throw new Error('Unsupported or malformed visualization view state.');
  }
  const viewport = value.viewport;
  if (!finiteIn(viewport.x, -100_000, 100_000) || !finiteIn(viewport.y, -100_000, 100_000) ||
      !finiteIn(viewport.zoom, 0.01, 100) || !finiteIn(viewport.width, 0, 20_000) || !finiteIn(viewport.height, 0, 20_000) ||
      !finiteIn(viewport.rotation, -1000, 1000)) throw new Error('Invalid visualization viewport.');

  const camera = value.camera;
  for (const axis of ['x', 'y', 'z']) {
    if (!isRecord(camera.position) || !isRecord(camera.target) || !finiteIn(camera.position[axis], -1000, 1000) || !finiteIn(camera.target[axis], -1000, 1000)) {
      throw new Error('Invalid visualization camera position.');
    }
  }
  if (!finiteIn(camera.fov, 1, 179) || !finiteIn(camera.near, 0.001, 1000) || !finiteIn(camera.far, 1, 1_000_000) || (camera.far as number) <= (camera.near as number)) {
    throw new Error('Invalid visualization camera settings.');
  }
  const toggles = value.toggles;
  if (!isRecord(toggles) || TOGGLE_KEYS.some(key => typeof toggles[key] !== 'boolean')) throw new Error('Invalid visualization toggles.');
}

export function makePersistedViewState(input: Omit<PersistedViewState, 'version'>): PersistedViewState {
  const state: PersistedViewState = { version: 2, ...input };
  validateViewState(state);
  return state;
}

export function parsePersistedViewState(raw: string): PersistedViewState {
  if (raw.length > 64_000) throw new Error('Visualization view state is too large.');
  const value: unknown = safeJsonParse(raw);
  validateViewState(value);
  return value;
}

export function safePersistedJson(state: PersistedViewState): string {
  validateViewState(state);
  return JSON.stringify(state);
}
