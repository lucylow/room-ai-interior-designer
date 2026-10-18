import type { SceneObject, VisualizationState } from '../core/types';
import { selectedObjects } from '../core/selection';
import { analyzeScene } from '../core/scene-metrics';
import { objectsByLayer } from '../core/visibility';

export const selectScene = (state: VisualizationState) => state.scene;
export const selectPrimaryObject = (state: VisualizationState): SceneObject | undefined =>
  state.scene.objects.find(item => item.id === state.selection.primaryId);
export const selectSelectedObjects = (state: VisualizationState): SceneObject[] =>
  selectedObjects(state.scene.objects, state.selection);
export const selectSceneMetrics = (state: VisualizationState) => analyzeScene(state.scene);
export const selectLayers = (state: VisualizationState) => objectsByLayer(state.scene);
export const selectIsEditing = (state: VisualizationState) => state.mode === 'plan' || state.mode === 'three-d';
export const selectPresentation = (state: VisualizationState) => state.toggles.presentationMode;
