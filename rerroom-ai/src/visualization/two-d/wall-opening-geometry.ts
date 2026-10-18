import type { Opening, SpatialScene, WallSegment, Vec2 } from '../core/types';

export interface OpeningRect {
  opening: Opening;
  center: Vec2;
  angle: number;
}

export function openingGeometry(scene: SpatialScene, opening: Opening): OpeningRect | null {
  const wall = scene.room.walls.find(item => item.id === opening.wallId);
  if (!wall) return null;
  const dx = wall.end.x - wall.start.x;
  const dy = wall.end.y - wall.start.y;
  const length = Math.hypot(dx, dy) || 1;
  const t = Math.max(0, Math.min(1, opening.offset / length));
  return {
    opening,
    center: { x: wall.start.x + dx * t, y: wall.start.y + dy * t },
    angle: Math.atan2(dy, dx),
  };
}

export function wallCenter(wall: WallSegment): Vec2 {
  return { x: (wall.start.x + wall.end.x) / 2, y: (wall.start.y + wall.end.y) / 2 };
}
