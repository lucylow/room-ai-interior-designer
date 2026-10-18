import type { Rect2D, SceneObject, SpatialScene } from '../core/types';
import { objectPlanCenter, objectPlanSize } from '../core/transform';

export interface PlanItem {
  object: SceneObject;
  rect: Rect2D;
  rotationDeg: number;
  zIndex: number;
}

export function buildPlanItems(scene: SpatialScene): PlanItem[] {
  return scene.objects
    .filter(item => item.visible)
    .map((object, index) => {
      const center = objectPlanCenter(object);
      const size = objectPlanSize(object);
      return {
        object,
        rect: { x: center.x - size.width / 2, y: center.y - size.depth / 2, width: size.width, height: size.depth },
        rotationDeg: object.transform.rotationY * 180 / Math.PI,
        zIndex: 20 + index,
      };
    });
}

export function roomRect(scene: SpatialScene): Rect2D {
  return { x: 0, y: 0, width: scene.room.width, height: scene.room.depth };
}

export function itemCenter(planItem: PlanItem) {
  return { x: planItem.rect.x + planItem.rect.width / 2, y: planItem.rect.y + planItem.rect.height / 2 };
}
