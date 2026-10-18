import type { SceneObject } from '../core/types';
import { objectPlanCenter, objectPlanSize } from '../core/transform';

export interface SelectionHandle {
  id: 'nw' | 'ne' | 'se' | 'sw' | 'rotate';
  x: number;
  y: number;
}

export interface SelectionOverlay {
  objectId: string;
  center: { x: number; y: number };
  width: number;
  height: number;
  rotationDeg: number;
  handles: SelectionHandle[];
}

export function selectionOverlay(object: SceneObject): SelectionOverlay {
  const center = objectPlanCenter(object);
  const size = objectPlanSize(object);
  const dx = size.width / 2;
  const dy = size.depth / 2;
  return {
    objectId: object.id,
    center,
    width: size.width,
    height: size.depth,
    rotationDeg: object.transform.rotationY * 180 / Math.PI,
    handles: [
      { id: 'nw', x: center.x - dx, y: center.y - dy },
      { id: 'ne', x: center.x + dx, y: center.y - dy },
      { id: 'se', x: center.x + dx, y: center.y + dy },
      { id: 'sw', x: center.x - dx, y: center.y + dy },
      { id: 'rotate', x: center.x, y: center.y - dy - 0.25 },
    ],
  };
}
