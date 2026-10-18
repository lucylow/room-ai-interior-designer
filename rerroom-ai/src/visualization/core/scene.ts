import type { SceneObject, SpatialScene, Vec3 } from './types';
import { clampObjectToRoom, objectAabbHalfExtents } from './transform';

export function cloneScene(scene: SpatialScene): SpatialScene {
  return JSON.parse(JSON.stringify(scene)) as SpatialScene;
}

export function findObject(scene: SpatialScene, id: string): SceneObject | undefined {
  return scene.objects.find(item => item.id === id);
}

export function updateObject(scene: SpatialScene, id: string, update: (object: SceneObject) => SceneObject): SpatialScene {
  return {
    ...scene,
    metadata: { ...scene.metadata, version: scene.metadata.version + 1, updatedAt: Date.now() },
    objects: scene.objects.map(item => item.id === id ? update(item) : item),
  };
}

export function moveObject(scene: SpatialScene, id: string, delta: Vec3): SpatialScene {
  const object = findObject(scene, id);
  if (!object || object.locked) return scene;
  if (![delta.x, delta.y, delta.z].every(Number.isFinite)) return scene;
  const position = {
    x: object.transform.position.x + delta.x,
    y: object.transform.position.y + delta.y,
    z: object.transform.position.z + delta.z,
  };
  const candidate = { ...object, transform: { ...object.transform, position } };
  const half = objectAabbHalfExtents(candidate);
  if (half.x * 2 > scene.room.width || half.z * 2 > scene.room.depth || half.y * 2 > scene.room.ceiling) return scene;
  const next = updateObject(scene, id, item => clampObjectToRoom({
    ...item,
    transform: {
      ...item.transform,
      position: {
        x: position.x,
        y: Math.max(half.y, Math.min(scene.room.ceiling - half.y, position.y)),
        z: position.z,
      },
    },
  }, scene.room.width, scene.room.depth));
  return next;
}

export function rotateObject(scene: SpatialScene, id: string, rotationY: number): SpatialScene {
  const object = findObject(scene, id);
  if (!object || object.locked || !Number.isFinite(rotationY)) return scene;
  const normalized = Math.atan2(Math.sin(rotationY), Math.cos(rotationY));
  const candidate = {
    ...object,
    transform: { ...object.transform, rotationY: normalized },
  };
  const half = objectAabbHalfExtents(candidate);
  if (half.x * 2 > scene.room.width || half.z * 2 > scene.room.depth || half.y * 2 > scene.room.ceiling) return scene;
  return updateObject(scene, id, item => clampObjectToRoom({
    ...item,
    transform: { ...item.transform, rotationY: normalized },
  }, scene.room.width, scene.room.depth));
}

export function resizeObject(scene: SpatialScene, id: string, width: number, height: number, depth: number): SpatialScene {
  const object = findObject(scene, id);
  if (!object || object.locked || ![width, height, depth].every(Number.isFinite)) return scene;
  const scale = object.transform.scale;
  const size = {
    width: Math.min(Math.max(0.05, width), scene.room.width / scale.x),
    height: Math.min(Math.max(0.05, height), scene.room.ceiling / scale.y),
    depth: Math.min(Math.max(0.05, depth), scene.room.depth / scale.z),
  };
  const candidate = { ...object, size };
  const half = objectAabbHalfExtents(candidate);
  if (half.x * 2 > scene.room.width || half.z * 2 > scene.room.depth || half.y * 2 > scene.room.ceiling) return scene;
  return updateObject(scene, id, item => clampObjectToRoom({
    ...item,
    size,
  }, scene.room.width, scene.room.depth));
}

export function setObjectVisibility(scene: SpatialScene, id: string, visible: boolean): SpatialScene {
  return updateObject(scene, id, item => ({ ...item, visible }));
}

export function addObject(scene: SpatialScene, object: SceneObject): SpatialScene {
  if (findObject(scene, object.id)) return scene;
  return {
    ...scene,
    metadata: { ...scene.metadata, version: scene.metadata.version + 1, updatedAt: Date.now() },
    objects: [...scene.objects, object],
  };
}

export function removeObject(scene: SpatialScene, id: string): SpatialScene {
  return {
    ...scene,
    metadata: { ...scene.metadata, version: scene.metadata.version + 1, updatedAt: Date.now() },
    objects: scene.objects.filter(item => item.id !== id),
    measurements: scene.measurements.filter(item => item.id !== id),
  };
}

export function makeObject(partial: Partial<SceneObject> & Pick<SceneObject, 'id' | 'type' | 'label'>): SceneObject {
  return {
    id: partial.id,
    type: partial.type,
    label: partial.label,
    transform: partial.transform ?? { position: { x: 0, y: 0, z: 0 }, rotationY: 0, scale: { x: 1, y: 1, z: 1 } },
    size: partial.size ?? { width: 1, height: 1, depth: 1 },
    visible: partial.visible ?? true,
    locked: partial.locked ?? false,
    selected: partial.selected ?? false,
    materialId: partial.materialId,
    assetId: partial.assetId,
    metadata: partial.metadata,
  };
}
