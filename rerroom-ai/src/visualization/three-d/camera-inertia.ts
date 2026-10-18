import type { CameraPose, Vec3 } from '../core/types';
import { clamp, lerp3 } from '../core/vec';

export interface CameraVelocity {
  orbitX: number;
  orbitY: number;
  dolly: number;
  panX: number;
  panY: number;
}

export function decayVelocity(velocity: CameraVelocity, damping = 0.86): CameraVelocity {
  const d = clamp(damping, 0, 0.99);
  return {
    orbitX: velocity.orbitX * d,
    orbitY: velocity.orbitY * d,
    dolly: velocity.dolly * d,
    panX: velocity.panX * d,
    panY: velocity.panY * d,
  };
}

export function applyInertia(pose: CameraPose, velocity: CameraVelocity, dtMs: number): CameraPose {
  const dt = Math.min(50, Math.max(0, dtMs)) / 16.67;
  const target: Vec3 = {
    x: pose.target.x + velocity.panX * 0.02 * dt,
    y: pose.target.y + velocity.panY * 0.02 * dt,
    z: pose.target.z,
  };
  const dx = pose.position.x - pose.target.x;
  const dz = pose.position.z - pose.target.z;
  const angle = Math.atan2(dx, dz) + velocity.orbitX * 0.006 * dt;
  const distance = Math.max(0.35, Math.hypot(dx, dz) + velocity.dolly * 0.02 * dt);
  return {
    ...pose,
    position: lerp3(pose.position, {
      x: target.x + Math.sin(angle) * distance,
      y: Math.max(0.15, pose.position.y + velocity.orbitY * 0.006 * dt),
      z: target.z + Math.cos(angle) * distance,
    }, 0.9),
    target,
  };
}

export const ZERO_CAMERA_VELOCITY: CameraVelocity = { orbitX: 0, orbitY: 0, dolly: 0, panX: 0, panY: 0 };
