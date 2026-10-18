import type { VisualAsset } from '../performance/assets';

export const DEMO_ASSETS: VisualAsset[] = [
  { id: 'asset-001', uri: 'demo://model/sofa-001.glb', kind: 'model', bytes: 620000, mimeType: 'model/gltf-binary' },
  { id: 'asset-002', uri: 'demo://model/sofa-002.glb', kind: 'model', bytes: 710000, mimeType: 'model/gltf-binary' },
  { id: 'asset-003', uri: 'demo://model/chair-001.glb', kind: 'model', bytes: 410000, mimeType: 'model/gltf-binary' },
  { id: 'asset-004', uri: 'demo://model/table-001.glb', kind: 'model', bytes: 330000, mimeType: 'model/gltf-binary' },
  { id: 'asset-005', uri: 'demo://texture/oak.jpg', kind: 'texture', width: 2048, height: 2048, bytes: 820000, mimeType: 'image/jpeg' },
  { id: 'asset-006', uri: 'demo://texture/fabric.jpg', kind: 'texture', width: 2048, height: 2048, bytes: 790000, mimeType: 'image/jpeg' },
  { id: 'asset-007', uri: 'demo://texture/stone.jpg', kind: 'texture', width: 1536, height: 1536, bytes: 540000, mimeType: 'image/jpeg' },
  { id: 'asset-008', uri: 'demo://texture/brass.jpg', kind: 'texture', width: 1024, height: 1024, bytes: 300000, mimeType: 'image/jpeg' },
  { id: 'asset-009', uri: 'demo://thumbnail/living.png', kind: 'thumbnail', width: 512, height: 512, bytes: 110000, mimeType: 'image/png' },
  { id: 'asset-010', uri: 'demo://thumbnail/bedroom.png', kind: 'thumbnail', width: 512, height: 512, bytes: 105000, mimeType: 'image/png' },
];

export function assetById(id: string): VisualAsset | undefined {
  return DEMO_ASSETS.find(asset => asset.id === id);
}
