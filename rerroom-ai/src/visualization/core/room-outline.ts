import type { SpatialScene, Vec2 } from './types';
import { polygonArea, polygonCentroid } from './geometry';

export function roomPolygon(scene: SpatialScene): Vec2[] {
  return [
    { x: 0, y: 0 },
    { x: scene.room.width, y: 0 },
    { x: scene.room.width, y: scene.room.depth },
    { x: 0, y: scene.room.depth },
  ];
}

export function roomCentroid(scene: SpatialScene): Vec2 {
  return polygonCentroid(roomPolygon(scene));
}

export function roomFloorArea(scene: SpatialScene): number {
  return polygonArea(roomPolygon(scene));
}

export function wallLength(start: Vec2, end: Vec2): number {
  return Math.hypot(end.x - start.x, end.y - start.y);
}

export function roomWallLength(scene: SpatialScene): number {
  return scene.room.walls.reduce((sum, wall) => sum + wallLength(wall.start, wall.end), 0);
}
