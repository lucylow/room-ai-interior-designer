import type { Rect2D, Vec2, Vec3, Viewport2D } from '../core/types';
import { clamp } from '../core/vec';

export interface PlanProjection {
  worldToScreen(point: Vec2): Vec2;
  screenToWorld(point: Vec2): Vec2;
  worldRectToScreen(rect: Rect2D): Rect2D;
  pixelsPerMeter: number;
}

export function createPlanProjection(viewport: Viewport2D, roomWidth: number, roomDepth: number, padding = 24): PlanProjection {
  const usableWidth = Math.max(1, viewport.width - padding * 2);
  const usableHeight = Math.max(1, viewport.height - padding * 2);
  const baseScale = Math.min(usableWidth / Math.max(roomWidth, 0.1), usableHeight / Math.max(roomDepth, 0.1));
  const scale = baseScale * clamp(viewport.zoom, 0.05, 20);
  const centerX = viewport.width / 2 + viewport.x;
  const centerY = viewport.height / 2 + viewport.y;

  return {
    pixelsPerMeter: scale,
    worldToScreen(point) {
      return { x: centerX + (point.x - roomWidth / 2) * scale, y: centerY + (point.y - roomDepth / 2) * scale };
    },
    screenToWorld(point) {
      return { x: roomWidth / 2 + (point.x - centerX) / scale, y: roomDepth / 2 + (point.y - centerY) / scale };
    },
    worldRectToScreen(rect) {
      const a = this.worldToScreen({ x: rect.x, y: rect.y });
      const b = this.worldToScreen({ x: rect.x + rect.width, y: rect.y + rect.height });
      return { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), width: Math.abs(b.x - a.x), height: Math.abs(b.y - a.y) };
    },
  };
}

export function world3DToPlan(point: Vec3): Vec2 {
  return { x: point.x, y: point.z };
}

export function planToWorld3D(point: Vec2, height = 0): Vec3 {
  return { x: point.x, y: height, z: point.y };
}
