import type { SceneObject, SpatialScene, Vec2 } from '../core/types';
import { pointInPolygon, rectangleCorners } from '../core/geometry';

export function hitTestObject(object: SceneObject, point: Vec2): boolean {
  const center = { x: object.transform.position.x, y: object.transform.position.z };
  const corners = rectangleCorners(
    center,
    object.size.width * object.transform.scale.x,
    object.size.depth * object.transform.scale.z,
    object.transform.rotationY,
  );
  return pointInPolygon(point, corners);
}

export function hitTestScene(scene: SpatialScene, point: Vec2): SceneObject | undefined {
  const candidates = [...scene.objects].filter(item => item.visible).reverse();
  return candidates.find(object => hitTestObject(object, point));
}

export function nearestObject(scene: SpatialScene, point: Vec2): SceneObject | undefined {
  return scene.objects.filter(item => item.visible).sort((a, b) => {
    const da = Math.hypot(a.transform.position.x - point.x, a.transform.position.z - point.y);
    const db = Math.hypot(b.transform.position.x - point.x, b.transform.position.z - point.y);
    return da - db;
  })[0];
}
