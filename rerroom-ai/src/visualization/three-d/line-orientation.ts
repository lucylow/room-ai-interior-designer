import type { Vec3 } from '../core/types';
import { dist3 } from '../core/vec';

export interface SegmentPose3D {
  midpoint: Vec3;
  length: number;
  yaw: number;
  pitch: number;
}

export function segmentPose(a: Vec3, b: Vec3): SegmentPose3D {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;
  const horizontal = Math.hypot(dx, dz);
  return {
    midpoint: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: (a.z + b.z) / 2 },
    length: dist3(a, b),
    yaw: Math.atan2(dx, dz),
    pitch: Math.atan2(dy, Math.max(horizontal, 0.0001)),
  };
}
