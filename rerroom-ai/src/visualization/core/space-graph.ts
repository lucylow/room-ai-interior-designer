import type { SpatialScene, Vec2 } from './types';
import { objectPlanCenter } from './transform';
import { dist2 } from './vec';

export interface SpaceNode {
  id: string;
  point: Vec2;
  kind: 'room' | 'object' | 'opening';
}

export interface SpaceEdge {
  from: string;
  to: string;
  distance: number;
  walkable: boolean;
}

export interface SpaceGraph {
  nodes: SpaceNode[];
  edges: SpaceEdge[];
}

export function buildSpaceGraph(scene: SpatialScene, walkThreshold = 2.5): SpaceGraph {
  const nodes: SpaceNode[] = [
    { id: `room:${scene.metadata.roomId}`, point: { x: scene.room.width / 2, y: scene.room.depth / 2 }, kind: 'room' },
    ...scene.objects.filter(item => item.visible).map(item => ({ id: item.id, point: objectPlanCenter(item), kind: 'object' as const })),
    ...scene.room.openings.map(item => ({ id: item.id, point: openingPoint(scene, item.id), kind: 'opening' as const })),
  ];
  const edges: SpaceEdge[] = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const distance = dist2(nodes[i].point, nodes[j].point);
      edges.push({ from: nodes[i].id, to: nodes[j].id, distance, walkable: distance <= walkThreshold });
    }
  }
  return { nodes, edges };
}

function openingPoint(scene: SpatialScene, openingId: string): Vec2 {
  const opening = scene.room.openings.find(item => item.id === openingId);
  const wall = opening && scene.room.walls.find(item => item.id === opening.wallId);
  if (!opening || !wall) return { x: 0, y: 0 };
  const length = Math.hypot(wall.end.x - wall.start.x, wall.end.y - wall.start.y) || 1;
  const t = Math.min(1, Math.max(0, opening.offset / length));
  return {
    x: wall.start.x + (wall.end.x - wall.start.x) * t,
    y: wall.start.y + (wall.end.y - wall.start.y) * t,
  };
}
