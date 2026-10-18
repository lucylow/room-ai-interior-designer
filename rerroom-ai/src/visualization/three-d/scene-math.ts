import type { CameraPose, Vec3 } from '../core/types';
import { normalize3, sub3 } from '../core/vec';

export function lookDirection(camera: CameraPose): Vec3 {
  return normalize3(sub3(camera.target, camera.position));
}

export function cameraDistance(camera: CameraPose): number {
  return Math.hypot(
    camera.position.x - camera.target.x,
    camera.position.y - camera.target.y,
    camera.position.z - camera.target.z,
  );
}

export function azimuthFromCamera(camera: CameraPose): number {
  return Math.atan2(
    camera.position.x - camera.target.x,
    camera.position.z - camera.target.z,
  );
}

export function elevationFromCamera(camera: CameraPose): number {
  const dx = camera.position.x - camera.target.x;
  const dz = camera.position.z - camera.target.z;
  return Math.atan2(camera.position.y - camera.target.y, Math.hypot(dx, dz));
}
