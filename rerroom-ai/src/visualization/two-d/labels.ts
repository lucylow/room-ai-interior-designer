import type { SpatialScene } from '../core/types';
import { formatMeters } from '../core/units';
import { objectPlanCenter } from '../core/transform';

export interface PlanLabel {
  id: string;
  text: string;
  x: number;
  y: number;
  priority: number;
}

export function objectLabels(scene: SpatialScene): PlanLabel[] {
  return scene.objects.filter(item => item.visible).map(object => {
    const point = objectPlanCenter(object);
    const area = object.size.width * object.size.depth;
    return {
      id: object.id,
      text: object.label,
      x: point.x,
      y: point.y,
      priority: Math.max(1, Math.round(area * 10)),
    };
  }).sort((a, b) => b.priority - a.priority);
}

export function roomDimensionLabels(scene: SpatialScene): PlanLabel[] {
  return [
    { id: 'room-width', text: formatMeters(scene.room.width), x: scene.room.width / 2, y: -0.18, priority: 100 },
    { id: 'room-depth', text: formatMeters(scene.room.depth), x: -0.18, y: scene.room.depth / 2, priority: 100 },
  ];
}

export function measurementLabel(value: number): string {
  return formatMeters(value);
}
