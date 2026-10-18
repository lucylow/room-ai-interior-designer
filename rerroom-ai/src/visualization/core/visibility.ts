import type { SceneObject, SpatialScene } from './types';

export type VisualizationLayer = 'furniture' | 'fixtures' | 'architecture' | 'decor' | 'custom';

export function layerForObject(object: SceneObject): VisualizationLayer {
  if (['wall', 'door', 'window'].includes(object.type)) return 'architecture';
  if (['lamp', 'plant', 'rug'].includes(object.type)) return 'decor';
  if (['sink', 'cabinet', 'bed'].includes(object.type)) return 'fixtures';
  if (['sofa', 'table', 'chair'].includes(object.type)) return 'furniture';
  return 'custom';
}

export function objectsByLayer(scene: SpatialScene): Record<VisualizationLayer, SceneObject[]> {
  const result: Record<VisualizationLayer, SceneObject[]> = {
    furniture: [], fixtures: [], architecture: [], decor: [], custom: [],
  };
  for (const object of scene.objects) result[layerForObject(object)].push(object);
  return result;
}

export function setLayerVisibility(scene: SpatialScene, layer: VisualizationLayer, visible: boolean): SpatialScene {
  return {
    ...scene,
    objects: scene.objects.map(object => layerForObject(object) === layer ? { ...object, visible } : object),
    metadata: { ...scene.metadata, version: scene.metadata.version + 1, updatedAt: Date.now() },
  };
}
