import type { SpatialScene } from '../core/types';
import { catalogObject, DEMO_MATERIALS, findCatalogItem } from './catalog';
import { LIGHTING_PRESETS } from '../three-d/lighting';

interface RoomSeed {
  id: string;
  name: string;
  type: 'living-room' | 'bedroom' | 'kitchen' | 'office' | 'dining-room';
  width: number;
  depth: number;
  ceiling: number;
  objectCatalogIds: string[];
}

const ROOM_SEEDS: RoomSeed[] = [
  { id: 'room-demo-living-01', name: 'Warm Minimal Living Room', type: 'living-room', width: 5.6, depth: 4.4, ceiling: 2.8, objectCatalogIds: ['catalog-001','catalog-007','catalog-013','catalog-019','catalog-025','catalog-043'] },
  { id: 'room-demo-living-02', name: 'Gallery Living Room', type: 'living-room', width: 6.2, depth: 4.8, ceiling: 2.9, objectCatalogIds: ['catalog-003','catalog-008','catalog-014','catalog-021','catalog-027','catalog-048'] },
  { id: 'room-demo-bedroom-01', name: 'Quiet Bedroom', type: 'bedroom', width: 4.7, depth: 4.1, ceiling: 2.65, objectCatalogIds: ['catalog-037','catalog-010','catalog-016','catalog-031','catalog-044'] },
  { id: 'room-demo-bedroom-02', name: 'Boutique Bedroom', type: 'bedroom', width: 5.2, depth: 4.5, ceiling: 2.8, objectCatalogIds: ['catalog-039','catalog-011','catalog-017','catalog-034','catalog-046'] },
  { id: 'room-demo-office-01', name: 'Focused Home Office', type: 'office', width: 3.8, depth: 3.6, ceiling: 2.6, objectCatalogIds: ['catalog-018','catalog-012','catalog-024','catalog-030','catalog-045'] },
  { id: 'room-demo-office-02', name: 'Creative Studio Office', type: 'office', width: 4.9, depth: 3.9, ceiling: 2.8, objectCatalogIds: ['catalog-023','catalog-006','catalog-018','catalog-036','catalog-042'] },
  { id: 'room-demo-dining-01', name: 'Scandinavian Dining', type: 'dining-room', width: 4.8, depth: 3.7, ceiling: 2.7, objectCatalogIds: ['catalog-022','catalog-009','catalog-010','catalog-034','catalog-041'] },
  { id: 'room-demo-dining-02', name: 'Dinner Party Room', type: 'dining-room', width: 5.8, depth: 4.0, ceiling: 2.85, objectCatalogIds: ['catalog-025','catalog-028','catalog-009','catalog-010','catalog-012'] },
  { id: 'room-demo-kitchen-01', name: 'Compact Kitchen', type: 'kitchen', width: 4.5, depth: 3.3, ceiling: 2.7, objectCatalogIds: ['catalog-031','catalog-033','catalog-018','catalog-020'] },
  { id: 'room-demo-living-03', name: 'Open Plan Lounge', type: 'living-room', width: 7.2, depth: 5.2, ceiling: 3.0, objectCatalogIds: ['catalog-002','catalog-008','catalog-015','catalog-020','catalog-026','catalog-042','catalog-048'] },
  { id: 'room-demo-bedroom-03', name: 'Sunlit Bedroom', type: 'bedroom', width: 5.4, depth: 4.3, ceiling: 2.9, objectCatalogIds: ['catalog-038','catalog-011','catalog-016','catalog-029','catalog-045','catalog-047'] },
  { id: 'room-demo-office-03', name: 'Executive Study', type: 'office', width: 5.3, depth: 4.0, ceiling: 2.75, objectCatalogIds: ['catalog-030','catalog-024','catalog-012','catalog-036','catalog-044'] },
];

function walls(width: number, depth: number) {
  return [
    { id: 'wall-north', start: { x: 0, y: 0 }, end: { x: width, y: 0 }, thickness: 0.12 },
    { id: 'wall-east', start: { x: width, y: 0 }, end: { x: width, y: depth }, thickness: 0.12 },
    { id: 'wall-south', start: { x: width, y: depth }, end: { x: 0, y: depth }, thickness: 0.12 },
    { id: 'wall-west', start: { x: 0, y: depth }, end: { x: 0, y: 0 }, thickness: 0.12 },
  ];
}

function makeScene(seed: RoomSeed, index: number): SpatialScene {
  const objects = seed.objectCatalogIds.flatMap((catalogId, objectIndex) => {
    const item = findCatalogItem(catalogId);
    if (!item) return [];
    const margin = 0.45;
    const x = margin + ((objectIndex + 1) / (seed.objectCatalogIds.length + 1)) * (seed.width - margin * 2);
    const z = margin + ((objectIndex * 1.13) % Math.max(0.5, seed.depth - margin * 2));
    return [catalogObject(item, `${seed.id}-object-${objectIndex + 1}`, { x, y: item.size.height / 2, z: Math.min(seed.depth - margin, z) })];
  });
  return {
    metadata: { id: `${seed.id}-scene`, roomId: seed.id, version: 1, unit: 'm', createdAt: 1735689600000 + index * 86400000, updatedAt: 1735689600000 + index * 86400000 },
    room: {
      width: seed.width, depth: seed.depth, ceiling: seed.ceiling,
      walls: walls(seed.width, seed.depth),
      openings: [
        { id: `${seed.id}-door`, wallId: 'wall-west', offset: Math.min(seed.depth * 0.35, 1.2), width: 0.9, height: 2.05, sillHeight: 0, kind: 'door', swing: 'left' },
        { id: `${seed.id}-window`, wallId: 'wall-north', offset: Math.min(seed.width * 0.55, 2.4), width: 1.6, height: 1.2, sillHeight: 0.9, kind: 'window' },
      ],
      floorMaterialId: 'mat-floor',
      wallMaterialId: 'mat-wall',
    },
    objects,
    measurements: [
      { id: `${seed.id}-measure-width`, kind: 'distance', a: { x: 0, y: 0, z: 0 }, b: { x: seed.width, y: 0, z: 0 }, value: seed.width, unit: 'm', label: 'Room width', visible: true },
      { id: `${seed.id}-measure-depth`, kind: 'distance', a: { x: 0, y: 0, z: 0 }, b: { x: 0, y: 0, z: seed.depth }, value: seed.depth, unit: 'm', label: 'Room depth', visible: true },
    ],
    materials: DEMO_MATERIALS,
    lighting: LIGHTING_PRESETS[index % LIGHTING_PRESETS.length],
  };
}

export const DEMO_ROOMS: SpatialScene[] = ROOM_SEEDS.map(makeScene);

export function getDemoRoom(id: string): SpatialScene {
  return DEMO_ROOMS.find(scene => scene.metadata.roomId === id) ?? DEMO_ROOMS[0];
}

export function cycleDemoRoom(currentId: string, step = 1): SpatialScene {
  const index = DEMO_ROOMS.findIndex(scene => scene.metadata.roomId === currentId);
  const next = (Math.max(0, index) + step + DEMO_ROOMS.length) % DEMO_ROOMS.length;
  return DEMO_ROOMS[next];
}
