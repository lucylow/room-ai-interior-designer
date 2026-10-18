import type { Vec2, Vec3 } from './types';

export const v2 = (x = 0, y = 0): Vec2 => ({ x, y });
export const v3 = (x = 0, y = 0, z = 0): Vec3 => ({ x, y, z });

export const add2 = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y });
export const sub2 = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x - b.x, y: a.y - b.y });
export const scale2 = (a: Vec2, k: number): Vec2 => ({ x: a.x * k, y: a.y * k });
export const dot2 = (a: Vec2, b: Vec2): number => a.x * b.x + a.y * b.y;
export const len2 = (a: Vec2): number => Math.hypot(a.x, a.y);
export const dist2 = (a: Vec2, b: Vec2): number => len2(sub2(a, b));
export const normalize2 = (a: Vec2): Vec2 => {
  const l = len2(a);
  return l === 0 ? { x: 0, y: 0 } : scale2(a, 1 / l);
};

export const add3 = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
export const sub3 = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
export const scale3 = (a: Vec3, k: number): Vec3 => ({ x: a.x * k, y: a.y * k, z: a.z * k });
export const dot3 = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z;
export const len3 = (a: Vec3): number => Math.hypot(a.x, a.y, a.z);
export const dist3 = (a: Vec3, b: Vec3): number => len3(sub3(a, b));
export const normalize3 = (a: Vec3): Vec3 => {
  const l = len3(a);
  return l === 0 ? { x: 0, y: 0, z: 0 } : scale3(a, 1 / l);
};

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const lerp2 = (a: Vec2, b: Vec2, t: number): Vec2 => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });
export const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t) });

export const wrapAngle = (radians: number): number => {
  const twoPi = Math.PI * 2;
  const value = radians % twoPi;
  return value < -Math.PI ? value + twoPi : value > Math.PI ? value - twoPi : value;
};

export const almostEqual = (a: number, b: number, epsilon = 1e-6): boolean =>
  Math.abs(a - b) <= epsilon;
