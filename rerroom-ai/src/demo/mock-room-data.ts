import type { RoomStateModel } from '../security/types';

export const DEMO_ROOM: RoomStateModel = {
  id: 'demo-living-room',
  name: 'Demo Living Room',
  roomType: 'living-room',
  imageAssetId: 'demo://room/living-room-01',
  layoutAssetId: 'demo://layout/living-room-01',
  objects: [
    { id: 'sofa-1', type: 'sofa', label: 'Cloud Sofa', x: 0, y: 0, z: 0, width: 2.4, height: 0.82, depth: 0.95, rotationY: 0, locked: false },
    { id: 'table-1', type: 'table', label: 'Oak Coffee Table', x: 0, y: 0, z: 1.25, width: 1.2, height: 0.42, depth: 0.7, rotationY: 0, locked: false },
    { id: 'rug-1', type: 'rug', label: 'Textured Rug', x: 0, y: 0, z: 0.75, width: 2.6, height: 0.02, depth: 2.1, rotationY: 0, locked: true },
  ],
  measurements: { widthM: 4.2, depthM: 5.1, ceilingM: 2.55 },
  updatedAt: Date.now(),
  version: 1,
  sensitivity: 'sensitive',
};
