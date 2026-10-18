import type { AABB3, Rect2D, Vec2, Vec3 } from './types';
import { clamp, dist2, dot2, normalize2 } from './vec';

export function rectContains(rect: Rect2D, point: Vec2): boolean {
  return point.x >= rect.x && point.y >= rect.y &&
    point.x <= rect.x + rect.width && point.y <= rect.y + rect.height;
}

export function rectExpand(rect: Rect2D, amount: number): Rect2D {
  return { x: rect.x - amount, y: rect.y - amount, width: rect.width + amount * 2, height: rect.height + amount * 2 };
}

export function rectIntersection(a: Rect2D, b: Rect2D): Rect2D | null {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.width, b.x + b.width);
  const y2 = Math.min(a.y + a.height, b.y + b.height);
  return x2 <= x1 || y2 <= y1 ? null : { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
}

export function rectArea(rect: Rect2D): number { return Math.max(0, rect.width) * Math.max(0, rect.height); }

export function aabbFromCenter(center: Vec3, size: Vec3): AABB3 {
  const half = { x: Math.abs(size.x) / 2, y: Math.abs(size.y) / 2, z: Math.abs(size.z) / 2 };
  return {
    min: { x: center.x - half.x, y: center.y - half.y, z: center.z - half.z },
    max: { x: center.x + half.x, y: center.y + half.y, z: center.z + half.z },
  };
}

export function aabbIntersects(a: AABB3, b: AABB3, epsilon = 1e-6): boolean {
  return a.min.x <= b.max.x + epsilon && a.max.x + epsilon >= b.min.x &&
    a.min.y <= b.max.y + epsilon && a.max.y + epsilon >= b.min.y &&
    a.min.z <= b.max.z + epsilon && a.max.z + epsilon >= b.min.z;
}

export function pointToSegmentDistance(point: Vec2, a: Vec2, b: Vec2): number {
  const ab = { x: b.x - a.x, y: b.y - a.y };
  const denom = dot2(ab, ab);
  if (denom === 0) return dist2(point, a);
  const t = clamp(dot2({ x: point.x - a.x, y: point.y - a.y }, ab) / denom, 0, 1);
  return dist2(point, { x: a.x + ab.x * t, y: a.y + ab.y * t });
}

export function nearestPointOnSegment(point: Vec2, a: Vec2, b: Vec2): Vec2 {
  const ab = { x: b.x - a.x, y: b.y - a.y };
  const denom = dot2(ab, ab);
  if (denom === 0) return { ...a };
  const t = clamp(dot2({ x: point.x - a.x, y: point.y - a.y }, ab) / denom, 0, 1);
  return { x: a.x + ab.x * t, y: a.y + ab.y * t };
}

export function rotate2(point: Vec2, angle: number, origin: Vec2 = { x: 0, y: 0 }): Vec2 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const x = point.x - origin.x;
  const y = point.y - origin.y;
  return { x: origin.x + x * c - y * s, y: origin.y + x * s + y * c };
}

export function rectangleCorners(center: Vec2, width: number, height: number, rotation = 0): Vec2[] {
  const hw = width / 2, hh = height / 2;
  const local = [
    { x: -hw, y: -hh }, { x: hw, y: -hh },
    { x: hw, y: hh }, { x: -hw, y: hh },
  ];
  return local.map(point => rotate2({ x: center.x + point.x, y: center.y + point.y }, rotation, center));
}

export function polygonArea(points: Vec2[]): number {
  if (points.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i], b = points[(i + 1) % points.length];
    sum += a.x * b.y - b.x * a.y;
  }
  return Math.abs(sum) / 2;
}

export function polygonCentroid(points: Vec2[]): Vec2 {
  if (points.length === 0) return { x: 0, y: 0 };
  const areaFactor = points.reduce((sum, p, i) => {
    const q = points[(i + 1) % points.length];
    return sum + p.x * q.y - q.x * p.y;
  }, 0);
  const signedArea = areaFactor / 2;
  if (Math.abs(signedArea) < 1e-9) {
    return {
      x: points.reduce((s, p) => s + p.x, 0) / points.length,
      y: points.reduce((s, p) => s + p.y, 0) / points.length,
    };
  }
  let cx = 0, cy = 0;
  for (let i = 0; i < points.length; i += 1) {
    const p = points[i], q = points[(i + 1) % points.length];
    const cross = p.x * q.y - q.x * p.y;
    cx += (p.x + q.x) * cross;
    cy += (p.y + q.y) * cross;
  }
  return { x: cx / (6 * signedArea), y: cy / (6 * signedArea) };
}

export function pointInPolygon(point: Vec2, polygon: Vec2[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i], b = polygon[j];
    const intersects = (a.y > point.y) !== (b.y > point.y) &&
      point.x < ((b.x - a.x) * (point.y - a.y)) / ((b.y - a.y) || Number.EPSILON) + a.x;
    if (intersects) inside = !inside;
  }
  return inside;
}

export function segmentDirection(a: Vec2, b: Vec2): Vec2 {
  return normalize2({ x: b.x - a.x, y: b.y - a.y });
}
