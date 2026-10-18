export type PlanLayerId =
  | 'background'
  | 'grid'
  | 'walls'
  | 'openings'
  | 'furniture'
  | 'measurements'
  | 'annotations'
  | 'selection'
  | 'labels';

export interface PlanLayer {
  id: PlanLayerId;
  label: string;
  visible: boolean;
  zIndex: number;
  interactive: boolean;
}

export const DEFAULT_PLAN_LAYERS: PlanLayer[] = [
  { id: 'background', label: 'Background', visible: true, zIndex: 0, interactive: false },
  { id: 'grid', label: 'Grid', visible: true, zIndex: 1, interactive: false },
  { id: 'walls', label: 'Walls', visible: true, zIndex: 10, interactive: true },
  { id: 'openings', label: 'Doors & windows', visible: true, zIndex: 11, interactive: true },
  { id: 'furniture', label: 'Furniture', visible: true, zIndex: 20, interactive: true },
  { id: 'measurements', label: 'Measurements', visible: true, zIndex: 30, interactive: false },
  { id: 'annotations', label: 'Annotations', visible: true, zIndex: 40, interactive: true },
  { id: 'selection', label: 'Selection', visible: true, zIndex: 50, interactive: true },
  { id: 'labels', label: 'Labels', visible: true, zIndex: 60, interactive: false },
];

export function toggleLayer(layers: PlanLayer[], id: PlanLayerId): PlanLayer[] {
  return layers.map(layer => layer.id === id ? { ...layer, visible: !layer.visible } : layer);
}
