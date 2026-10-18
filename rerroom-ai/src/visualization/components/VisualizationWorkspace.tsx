import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { CameraPresetId, SpatialScene, ViewMode } from '../core/types';
import { moveObject, resizeObject, rotateObject } from '../core/scene';
import { assertSpatialScene } from '../core/serialization';
import { createVisualizationStore, useVisualizationStore } from '../state/store';
import { selectPrimaryObject, selectSceneMetrics } from '../state/selectors';
import { commandLabel } from '../state/commands';
import { saveScene, localStorageAdapter } from '../state/scene-persistence';
import { makePersistedViewState, parsePersistedViewState, safePersistedJson } from '../state/view-persistence';
import { DEFAULT_PLAN_LAYERS, type PlanLayer } from '../two-d/layers';
import { PlanCanvas } from './PlanCanvas';
import { VisualizationToolbar } from './VisualizationToolbar';
import { TransformInspector } from './TransformInspector';
import { MeasurementPanel } from './MeasurementPanel';
import { SceneStats } from './SceneStats';
import { AISpatialSuggestions } from './AISpatialSuggestions';
import { ThreeSceneCanvas } from '../three-d/components/ThreeSceneCanvas';
import { SplitVisualization } from './SplitVisualization';
import { CompareVisualization } from './CompareVisualization';
import { SceneNavigator } from './SceneNavigator';
import { LayerPanel } from './LayerPanel';
import { AccessibilityPanel } from './AccessibilityPanel';
import { CameraPresetButtons } from '../three-d/components/CameraPresetButtons';
import './workspace.css';

let storageFailureReported = false;
let invalidEditReported = false;

function reportStorageFailure(): void {
  if (storageFailureReported) return;
  console.warn('[RE:ROOM] Visualization state could not be read or saved in this browser session.');
  storageFailureReported = true;
}

function reportInvalidEdit(): void {
  if (invalidEditReported) return;
  console.warn('[RE:ROOM] An invalid visualization edit was rejected.');
  invalidEditReported = true;
}

export interface VisualizationWorkspaceProps {
  initialScene: SpatialScene;
  aiEnabled?: boolean;
  localStorageEnabled?: boolean;
  onRequireAiConsent?: () => void;
}

export function VisualizationWorkspace({ initialScene, aiEnabled = false, localStorageEnabled = false, onRequireAiConsent }: VisualizationWorkspaceProps) {
  assertSpatialScene(initialScene);
  const [store] = useState(() => createVisualizationStore(initialScene));
  const [storageConsentAtMount] = useState(localStorageEnabled);
  const canUseLocalStorage = storageConsentAtMount && localStorageEnabled;
  const state = useVisualizationStore(store);
  const [baseline] = useState(initialScene);
  const [layers, setLayers] = useState<PlanLayer[]>(() => DEFAULT_PLAN_LAYERS.filter(layer => layer.id !== 'annotations'));
  const [highContrast, setHighContrast] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<CameraPresetId>('hero');
  const canvasRef = useRef<HTMLDivElement>(null);
  const primary = useMemo(() => selectPrimaryObject(state), [state]);
  const metrics = useMemo(() => selectSceneMetrics(state), [state]);
  const storageKey = `rerroom:visualization:${state.scene.metadata.roomId}`;

  useEffect(() => {
    if (!canUseLocalStorage) return;
    try {
      const raw = localStorage.getItem(`${storageKey}:view`);
      if (!raw) return;
      const persisted = parsePersistedViewState(raw);
      store.setMode(persisted.mode);
      store.setViewport(persisted.viewport);
      store.setCamera(persisted.camera);
      store.setToggles(persisted.toggles);
    } catch {
      // Leave corrupt or future-version view records untouched for recovery.
      reportStorageFailure();
    }
  }, [canUseLocalStorage, storageKey, store]);

  useEffect(() => {
    const element = canvasRef.current;
    if (!element || typeof ResizeObserver === 'undefined') return;
    const update = () => store.setViewport({ width: element.clientWidth, height: element.clientHeight });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    update();
    return () => observer.disconnect();
  }, [store]);

  useEffect(() => {
    if (!canUseLocalStorage) return;
    try {
      saveScene(localStorageAdapter, storageKey, state.scene);
      const view = makePersistedViewState({ mode: state.mode, viewport: state.viewport, camera: state.camera, toggles: state.toggles });
      const viewKey = `${storageKey}:view`;
      const existingView = localStorage.getItem(viewKey);
      if (existingView !== null) parsePersistedViewState(existingView);
      localStorage.setItem(viewKey, safePersistedJson(view));
    } catch {
      // Storage quota/private-mode errors must not interrupt editing.
      reportStorageFailure();
    }
  }, [canUseLocalStorage, storageKey, state.scene, state.mode, state.viewport, state.camera, state.toggles]);

  function commitScene(next: SpatialScene, label: string) {
    if (next === state.scene) return;
    try {
      assertSpatialScene(next);
      store.commit(next, label);
    } catch {
      reportInvalidEdit();
    }
  }

  function setPosition(id: string, axis: 'x' | 'y' | 'z', value: number, label: string) {
    const object = state.scene.objects.find(item => item.id === id);
    if (!object || !Number.isFinite(value)) return;
    const delta = { x: 0, y: 0, z: 0 };
    delta[axis] = value - object.transform.position[axis];
    commitScene(moveObject(state.scene, id, delta), label);
  }

  function setRotation(id: string, value: number, label: string) {
    if (!Number.isFinite(value)) return;
    commitScene(rotateObject(state.scene, id, value), label);
  }

  function setObjectSize(id: string, axis: 'width' | 'height' | 'depth', value: number, label: string) {
    const object = state.scene.objects.find(item => item.id === id);
    if (!object || !Number.isFinite(value)) return;
    const size = { ...object.size, [axis]: value };
    commitScene(resizeObject(state.scene, id, size.width, size.height, size.depth), label);
  }

  function select(id: string) {
    store.setSelection({ selectedIds: [id], primaryId: id, mode: 'object' });
  }

  function setMode(mode: ViewMode) { store.setMode(mode); }

  return (
    <div className="visualization-workspace">
      <VisualizationToolbar
        mode={state.mode}
        onMode={setMode}
        onUndo={() => store.undo()}
        onRedo={() => store.redo()}
        canUndo={state.historyIndex > 0}
        canRedo={state.historyIndex < state.historySize - 1}
      />
      <SceneStats scene={state.scene} />
      <div className="visualization-workspace-main">
        <div className="visualization-workspace-canvas" ref={canvasRef}>
          {state.mode === 'plan' ? (
            <PlanCanvas scene={state.scene} viewport={state.viewport} selectedIds={state.selection.selectedIds} layers={layers} onSelect={select} />
          ) : state.mode === 'split' ? (
            <SplitVisualization scene={state.scene} viewport={state.viewport} selectedIds={state.selection.selectedIds} layers={layers} onSelect={select} />
          ) : state.mode === 'compare' ? (
            <CompareVisualization before={baseline} after={state.scene} viewport={state.viewport} selectedIds={state.selection.selectedIds} />
          ) : (
            <ThreeSceneCanvas
              scene={state.scene}
              selectedIds={state.selection.selectedIds}
              showGrid={state.toggles.showGrid}
              cameraPreset={cameraPreset}
              tourPlaying={state.mode === 'tour'}
              reducedMotion={state.toggles.reducedMotion}
              onSelect={select}
              onUsePlan={() => store.setMode('plan')}
            />
          )}
          <span className="visualization-object-count">{metrics.visibleObjectCount} objects</span>
        </div>
        <aside className="visualization-workspace-tools" aria-label="Visualization tools">
          <TransformInspector
            object={primary}
          onMove={(axis, value) => primary && setPosition(primary.id, axis, value, `Move ${primary.label}`)}
          onRotate={(value) => primary && setRotation(primary.id, value, `Rotate ${primary.label}`)}
          onResize={(axis, value) => primary && setObjectSize(primary.id, axis, value, `Resize ${primary.label}`)}
          />
          <SceneNavigator scene={state.scene} selectedId={state.selection.primaryId} onSelect={select} />
          <LayerPanel layers={layers} onChange={setLayers} />
          <AccessibilityPanel
            reducedMotion={state.toggles.reducedMotion}
            showLabels={state.toggles.showLabels}
            highContrast={highContrast}
            onChange={(patch) => {
              const { highContrast: nextContrast, ...toggles } = patch;
              store.setToggles(toggles);
              if (nextContrast !== undefined) setHighContrast(nextContrast);
            }}
          />
          <section className="visualization-camera-presets" aria-label="3D camera presets">
            <strong>Camera views</strong>
            <CameraPresetButtons onChange={(preset) => { setCameraPreset(preset); store.setMode('three-d'); }} />
            <button type="button" onClick={() => store.setMode('tour')}>Play room tour</button>
          </section>
        </aside>
      </div>
      <div className="visualization-workspace-footer">
        <MeasurementPanel measurements={state.scene.measurements} />
        <AISpatialSuggestions
          scene={state.scene}
          aiEnabled={aiEnabled}
          onRequireConsent={onRequireAiConsent}
          onPreview={preview => commitScene(preview, commandLabel({ type: 'visibility', objectId: 'none', visible: true, label: 'AI layout preview' }))}
        />
      </div>
    </div>
  );
}
