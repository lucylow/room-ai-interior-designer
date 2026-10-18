import type { CameraPose, CameraPresetId, SpatialScene, Vec3 } from './types';
import { clamp, lerp3 } from './vec';

const PRESET_OFFSETS: Record<CameraPresetId, Vec3> = {
  top: { x: 0, y: 9, z: 0.001 },
  hero: { x: 5.2, y: 3.1, z: 5.2 },
  'eye-level': { x: 2.4, y: 1.6, z: 4.2 },
  corner: { x: 0.8, y: 2.4, z: 0.8 },
  wide: { x: -1.5, y: 4.5, z: 7.5 },
  detail: { x: 1.2, y: 1.4, z: 1.8 },
  ceiling: { x: 3.5, y: 6.5, z: 3.5 },
};

export function roomTarget(scene: SpatialScene): Vec3 {
  return { x: scene.room.width / 2, y: Math.min(scene.room.ceiling * 0.45, 1.6), z: scene.room.depth / 2 };
}

export function cameraForPreset(scene: SpatialScene, preset: CameraPresetId): CameraPose {
  const target = roomTarget(scene);
  const o = PRESET_OFFSETS[preset];
  return {
    position: { x: target.x + o.x, y: o.y, z: target.z + o.z },
    target,
    fov: preset === 'wide' ? 60 : 48,
    near: 0.03,
    far: Math.max(50, Math.max(scene.room.width, scene.room.depth) * 8),
  };
}

export function clampCamera(pose: CameraPose, scene: SpatialScene): CameraPose {
  const maxDistance = Math.max(scene.room.width, scene.room.depth) * 2.5 + 2;
  const target = roomTarget(scene);
  const dx = pose.position.x - target.x;
  const dz = pose.position.z - target.z;
  const radius = Math.hypot(dx, dz);
  const scale = radius > maxDistance ? maxDistance / radius : 1;
  return {
    ...pose,
    position: {
      x: target.x + dx * scale,
      y: clamp(pose.position.y, 0.25, Math.max(0.3, scene.room.ceiling * 2)),
      z: target.z + dz * scale,
    },
    fov: clamp(pose.fov, 25, 80),
    near: Math.max(0.01, pose.near),
    far: Math.max(pose.near + 1, pose.far),
  };
}

export function interpolateCamera(a: CameraPose, b: CameraPose, t: number): CameraPose {
  const eased = t * t * (3 - 2 * t);
  return {
    position: lerp3(a.position, b.position, eased),
    target: lerp3(a.target, b.target, eased),
    fov: a.fov + (b.fov - a.fov) * eased,
    near: a.near + (b.near - a.near) * eased,
    far: a.far + (b.far - a.far) * eased,
  };
}
