import type { SpatialScene } from '../core/types';
import { wallLength } from '../core/room-outline';

export interface WallRenderData {
  id: string;
  center: { x: number; y: number };
  length: number;
  angleDeg: number;
  thickness: number;
}

export function buildWallRenderData(scene: SpatialScene): WallRenderData[] {
  return scene.room.walls.map(wall => {
    const dx = wall.end.x - wall.start.x;
    const dy = wall.end.y - wall.start.y;
    return {
      id: wall.id,
      center: { x: (wall.start.x + wall.end.x) / 2, y: (wall.start.y + wall.end.y) / 2 },
      length: wallLength(wall.start, wall.end),
      angleDeg: Math.atan2(dy, dx) * 180 / Math.PI,
      thickness: wall.thickness,
    };
  });
}
