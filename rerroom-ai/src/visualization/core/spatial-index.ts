import type { AABB3, SceneObject, SpatialScene, Vec3 } from './types';
import { aabbFromCenter, aabbIntersects } from './geometry';
import { objectAabbHalfExtents } from './transform';

interface IndexedObject {
  id: string;
  box: AABB3;
}

function boxForObject(object: SceneObject): AABB3 {
  const half = objectAabbHalfExtents(object);
  return aabbFromCenter(object.transform.position, { x: half.x * 2, y: half.y * 2, z: half.z * 2 });
}

export class SpatialIndex {
  private items = new Map<string, IndexedObject>();

  build(scene: SpatialScene): void {
    this.items.clear();
    for (const object of scene.objects) {
      if (object.visible) this.items.set(object.id, { id: object.id, box: boxForObject(object) });
    }
  }

  upsert(object: SceneObject): void {
    if (!object.visible) {
      this.items.delete(object.id);
      return;
    }
    this.items.set(object.id, { id: object.id, box: boxForObject(object) });
  }

  remove(id: string): void { this.items.delete(id); }

  queryBox(box: AABB3): string[] {
    const ids: string[] = [];
    for (const item of this.items.values()) {
      if (aabbIntersects(item.box, box)) ids.push(item.id);
    }
    return ids;
  }

  queryRadius(center: Vec3, radius: number): string[] {
    const box = aabbFromCenter(center, { x: radius * 2, y: radius * 2, z: radius * 2 });
    return this.queryBox(box);
  }

  size(): number { return this.items.size; }
}
