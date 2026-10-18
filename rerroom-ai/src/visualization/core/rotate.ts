import type { SceneObject, SpatialScene } from './types';
import { wrapAngle } from './vec';
import { rotateObject } from './scene';

export function quantizeRotation(radians: number, incrementDegrees = 15): number {
  const step = Math.max(0.1, incrementDegrees) * Math.PI / 180;
  return wrapAngle(Math.round(radians / step) * step);
}

export function rotateBy(scene: SpatialScene, objectId: string, deltaRadians: number, snapDegrees = 15): SpatialScene {
  const object = scene.objects.find(item => item.id === objectId);
  if (!object || object.locked) return scene;
  return rotateObject(scene, objectId, quantizeRotation(object.transform.rotationY + deltaRadians, snapDegrees));
}

export function faceObjectToward(object: SceneObject, targetX: number, targetZ: number): SceneObject {
  const dx = targetX - object.transform.position.x;
  const dz = targetZ - object.transform.position.z;
  return { ...object, transform: { ...object.transform, rotationY: wrapAngle(Math.atan2(dx, dz)) } };
}
