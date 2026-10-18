import type { Opening, SpatialScene } from '../core/types';

export interface WallPrimitive {
  id: string;
  center: [number, number, number];
  size: [number, number, number];
  rotation: number;
}

export interface OpeningPrimitive {
  id: string;
  center: [number, number, number];
  size: [number, number, number];
  rotation: number;
  kind: Opening['kind'];
}

export function wallPrimitives(scene: SpatialScene): WallPrimitive[] {
  return scene.room.walls.map(wall => {
    const dx = wall.end.x - wall.start.x;
    const dz = wall.end.y - wall.start.y;
    const length = Math.hypot(dx, dz) || 1;
    return {
      id: wall.id,
      center: [(wall.start.x + wall.end.x) / 2, scene.room.ceiling / 2, (wall.start.y + wall.end.y) / 2],
      size: [length, scene.room.ceiling, Math.max(0.04, wall.thickness)],
      rotation: -Math.atan2(dz, dx),
    };
  });
}

export function openingPrimitives(scene: SpatialScene): OpeningPrimitive[] {
  return scene.room.openings.map(opening => {
    const wall = scene.room.walls.find(item => item.id === opening.wallId);
    if (!wall) return null;
    const dx = wall.end.x - wall.start.x;
    const dz = wall.end.y - wall.start.y;
    const length = Math.hypot(dx, dz) || 1;
    const t = Math.max(0, Math.min(1, opening.offset / length));
    return {
      id: opening.id,
      center: [wall.start.x + dx * t, opening.sillHeight + opening.height / 2, wall.start.y + dz * t],
      size: [opening.width, opening.height, wall.thickness + 0.04],
      rotation: -Math.atan2(dz, dx),
      kind: opening.kind,
    };
  }).filter((item): item is OpeningPrimitive => item !== null);
}

export function floorDimensions(scene: SpatialScene): [number, number] {
  return [scene.room.width, scene.room.depth];
}

export function ceilingHeight(scene: SpatialScene): number {
  return scene.room.ceiling;
}
