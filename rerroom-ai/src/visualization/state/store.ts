import { useSyncExternalStore } from 'react';
import type { CameraPose, SelectionState, SpatialScene, ViewMode, Viewport2D, VisualizationState, VisualizationToggles } from '../core/types';
import { SceneHistory } from './history';
import { clearSelection } from '../core/selection';
import { roomTarget } from '../core/camera';
import { assertSpatialScene } from '../core/serialization';

export interface VisualizationStore {
  getSnapshot(): VisualizationState;
  subscribe(listener: () => void): () => void;
  setMode(mode: ViewMode): void;
  setViewport(update: Partial<Viewport2D>): void;
  setCamera(camera: CameraPose): void;
  setSelection(selection: SelectionState): void;
  setToggles(update: Partial<VisualizationToggles>): void;
  commit(scene: SpatialScene, label: string): void;
  undo(): void;
  redo(): void;
  reset(): void;
}

export function createVisualizationStore(scene: SpatialScene): VisualizationStore {
  assertSpatialScene(scene);
  const history = new SceneHistory(scene);
  let state: VisualizationState = {
    scene: history.current(),
    mode: 'split',
    viewport: { x: 0, y: 0, zoom: 1, width: 390, height: 844, rotation: 0 },
    camera: {
      position: { x: scene.room.width / 2 + 4, y: 3, z: scene.room.depth / 2 + 4 },
      target: roomTarget(scene), fov: 48, near: 0.03, far: 100,
    },
    selection: clearSelection(),
    compare: { enabled: false, split: 0.5, showDiffOnly: false },
    toggles: {
      showGrid: true, showDimensions: true, showLabels: true, showOpenings: true,
      showShadows: true, showCeiling: false, showFurniture: true,
      reducedMotion: false, presentationMode: false,
    },
    historyIndex: history.index,
    historySize: history.size,
  };
  const listeners = new Set<() => void>();
  const publish = () => { for (const listener of listeners) listener(); };

  return {
    getSnapshot: () => state,
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); },
    setMode(mode) { state = { ...state, mode }; publish(); },
    setViewport(update) { state = { ...state, viewport: { ...state.viewport, ...update } }; publish(); },
    setCamera(camera) { state = { ...state, camera }; publish(); },
    setSelection(selection) { state = { ...state, selection }; publish(); },
    setToggles(update) { state = { ...state, toggles: { ...state.toggles, ...update } }; publish(); },
    commit(nextScene, label) {
      assertSpatialScene(nextScene);
      state = { ...state, scene: history.push(nextScene, label), historyIndex: history.index, historySize: history.size };
      publish();
    },
    undo() {
      state = { ...state, scene: history.undo(), historyIndex: history.index, historySize: history.size };
      publish();
    },
    redo() {
      state = { ...state, scene: history.redo(), historyIndex: history.index, historySize: history.size };
      publish();
    },
    reset() {
      history.clear(scene);
      state = { ...state, scene: history.current(), selection: clearSelection(), historyIndex: history.index, historySize: history.size };
      publish();
    },
  };
}

export function useVisualizationStore(store: VisualizationStore): VisualizationState {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}
