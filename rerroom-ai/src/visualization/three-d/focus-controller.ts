import type { CameraPose, SceneObject, SpatialScene } from '../core/types';
import { cameraForPreset } from '../core/camera';
import { clamp, lerp3 } from '../core/vec';

export function cameraFocusedOnObject(scene: SpatialScene, object: SceneObject, distance = 2.4): CameraPose {
  const target = { ...object.transform.position };
  const width = Math.max(object.size.width, object.size.depth);
  const radius = Math.max(distance, width * 1.6);
  return {
    position: { x: target.x + radius, y: Math.max(1.2, target.y + radius * 0.65), z: target.z + radius },
    target,
    fov: 44,
    near: 0.03,
    far: Math.max(40, radius * 10),
  };
}

export function transitionToObject(current: CameraPose, scene: SpatialScene, id: string, progress: number): CameraPose {
  const object = scene.objects.find(item => item.id === id);
  if (!object) return current;
  const target = cameraFocusedOnObject(scene, object);
  const t = clamp(progress, 0, 1);
  return {
    position: lerp3(current.position, target.position, t),
    target: lerp3(current.target, target.target, t),
    fov: current.fov + (target.fov - current.fov) * t,
    near: current.near,
    far: current.far,
  };
}

export function presentationCamera(scene: SpatialScene): CameraPose {
  return cameraForPreset(scene, 'hero');
}
