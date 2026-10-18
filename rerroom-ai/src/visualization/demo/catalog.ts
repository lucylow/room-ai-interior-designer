import type { MaterialRef, SceneObject } from '../core/types';
import { makeObject } from '../core/scene';

export interface DemoCatalogItem {
  id: string;
  type: string;
  name: string;
  size: { width: number; height: number; depth: number };
  colors: string[];
  price: number;
  assetId: string;
  tags: string[];
}

export const DEMO_CATALOG: DemoCatalogItem[] = [
  {
    id: 'catalog-001', type: 'sofa', name: 'Cloud Sofa',
    size: { width: 2.21, height: 0.82, depth: 0.95 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 80, assetId: 'asset--001',
    tags: ["sofa", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-002', type: 'sofa', name: 'Lounge Sofa',
    size: { width: 2.4, height: 0.82, depth: 1.0 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 117, assetId: 'asset--002',
    tags: ["sofa", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-003', type: 'sofa', name: 'Modular Sofa',
    size: { width: 2.59, height: 0.82, depth: 0.95 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 154, assetId: 'asset--003',
    tags: ["sofa", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-004', type: 'sofa', name: 'Armless Sofa',
    size: { width: 2.21, height: 0.82, depth: 1.0 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 191, assetId: 'asset--004',
    tags: ["sofa", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-005', type: 'sofa', name: 'Corner Sofa',
    size: { width: 2.4, height: 0.82, depth: 0.95 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 228, assetId: 'asset--005',
    tags: ["sofa", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-006', type: 'sofa', name: 'Daybed',
    size: { width: 2.59, height: 0.82, depth: 1.0 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 265, assetId: 'asset--006',
    tags: ["sofa", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-007', type: 'chair', name: 'Accent Chair',
    size: { width: 0.78, height: 0.9, depth: 0.85 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 302, assetId: 'asset--007',
    tags: ["chair", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-008', type: 'chair', name: 'Dining Chair',
    size: { width: 0.85, height: 0.9, depth: 0.89 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 339, assetId: 'asset--008',
    tags: ["chair", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-009', type: 'chair', name: 'Lounge Chair',
    size: { width: 0.92, height: 0.9, depth: 0.85 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 376, assetId: 'asset--009',
    tags: ["chair", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-010', type: 'chair', name: 'Reading Chair',
    size: { width: 0.78, height: 0.9, depth: 0.89 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 413, assetId: 'asset--010',
    tags: ["chair", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-011', type: 'chair', name: 'Woven Chair',
    size: { width: 0.85, height: 0.9, depth: 0.85 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 450, assetId: 'asset--011',
    tags: ["chair", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-012', type: 'chair', name: 'Task Chair',
    size: { width: 0.92, height: 0.9, depth: 0.89 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 487, assetId: 'asset--012',
    tags: ["chair", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-013', type: 'table', name: 'Coffee Table',
    size: { width: 1.1, height: 0.75, depth: 0.7 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 524, assetId: 'asset--013',
    tags: ["table", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-014', type: 'table', name: 'Round Coffee Table',
    size: { width: 1.2, height: 0.75, depth: 0.73 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 561, assetId: 'asset--014',
    tags: ["table", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-015', type: 'table', name: 'Console Table',
    size: { width: 1.3, height: 0.75, depth: 0.7 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 598, assetId: 'asset--015',
    tags: ["table", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-016', type: 'table', name: 'Dining Table',
    size: { width: 1.1, height: 0.75, depth: 0.73 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 635, assetId: 'asset--016',
    tags: ["table", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-017', type: 'table', name: 'Side Table',
    size: { width: 1.2, height: 0.75, depth: 0.7 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 672, assetId: 'asset--017',
    tags: ["table", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-018', type: 'table', name: 'Desk',
    size: { width: 1.3, height: 0.75, depth: 0.73 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 709, assetId: 'asset--018',
    tags: ["table", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-019', type: 'rug', name: 'Wool Rug',
    size: { width: 1.84, height: 0.03, depth: 1.5 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 746, assetId: 'asset--019',
    tags: ["rug", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-020', type: 'rug', name: 'Flatweave Rug',
    size: { width: 2.0, height: 0.03, depth: 1.58 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 783, assetId: 'asset--020',
    tags: ["rug", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-021', type: 'rug', name: 'Round Rug',
    size: { width: 2.16, height: 0.03, depth: 1.5 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 820, assetId: 'asset--021',
    tags: ["rug", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-022', type: 'rug', name: 'Runner Rug',
    size: { width: 1.84, height: 0.03, depth: 1.58 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 857, assetId: 'asset--022',
    tags: ["rug", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-023', type: 'rug', name: 'Pattern Rug',
    size: { width: 2.0, height: 0.03, depth: 1.5 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 894, assetId: 'asset--023',
    tags: ["rug", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-024', type: 'rug', name: 'Neutral Rug',
    size: { width: 2.16, height: 0.03, depth: 1.58 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 931, assetId: 'asset--024',
    tags: ["rug", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-025', type: 'lamp', name: 'Floor Lamp',
    size: { width: 0.32, height: 1.6, depth: 0.35 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 968, assetId: 'asset--025',
    tags: ["lamp", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-026', type: 'lamp', name: 'Arc Lamp',
    size: { width: 0.35, height: 1.6, depth: 0.37 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1005, assetId: 'asset--026',
    tags: ["lamp", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-027', type: 'lamp', name: 'Table Lamp',
    size: { width: 0.38, height: 1.6, depth: 0.35 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1042, assetId: 'asset--027',
    tags: ["lamp", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-028', type: 'lamp', name: 'Pendant Lamp',
    size: { width: 0.32, height: 1.6, depth: 0.37 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1079, assetId: 'asset--028',
    tags: ["lamp", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-029', type: 'lamp', name: 'Sconce',
    size: { width: 0.35, height: 1.6, depth: 0.35 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1116, assetId: 'asset--029',
    tags: ["lamp", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-030', type: 'lamp', name: 'Desk Lamp',
    size: { width: 0.38, height: 1.6, depth: 0.37 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1153, assetId: 'asset--030',
    tags: ["lamp", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-031', type: 'cabinet', name: 'Media Cabinet',
    size: { width: 1.66, height: 1.1, depth: 0.5 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1190, assetId: 'asset--031',
    tags: ["cabinet", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-032', type: 'cabinet', name: 'Sideboard',
    size: { width: 1.8, height: 1.1, depth: 0.53 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1227, assetId: 'asset--032',
    tags: ["cabinet", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-033', type: 'cabinet', name: 'Tall Cabinet',
    size: { width: 1.94, height: 1.1, depth: 0.5 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1264, assetId: 'asset--033',
    tags: ["cabinet", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-034', type: 'cabinet', name: 'Low Credenza',
    size: { width: 1.66, height: 1.1, depth: 0.53 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1301, assetId: 'asset--034',
    tags: ["cabinet", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-035', type: 'cabinet', name: 'Storage Unit',
    size: { width: 1.8, height: 1.1, depth: 0.5 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1338, assetId: 'asset--035',
    tags: ["cabinet", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-036', type: 'cabinet', name: 'Bookcase',
    size: { width: 1.94, height: 1.1, depth: 0.53 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1375, assetId: 'asset--036',
    tags: ["cabinet", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-037', type: 'bed', name: 'Queen Bed',
    size: { width: 1.84, height: 0.55, depth: 2.1 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 1412, assetId: 'asset--037',
    tags: ["bed", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-038', type: 'bed', name: 'King Bed',
    size: { width: 2.0, height: 0.55, depth: 2.21 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 1449, assetId: 'asset--038',
    tags: ["bed", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-039', type: 'bed', name: 'Platform Bed',
    size: { width: 2.16, height: 0.55, depth: 2.1 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 1486, assetId: 'asset--039',
    tags: ["bed", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-040', type: 'bed', name: 'Daybed Frame',
    size: { width: 1.84, height: 0.55, depth: 2.21 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 1523, assetId: 'asset--040',
    tags: ["bed", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-041', type: 'bed', name: 'Twin Bed',
    size: { width: 2.0, height: 0.55, depth: 2.1 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 1560, assetId: 'asset--041',
    tags: ["bed", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-042', type: 'bed', name: 'Canopy Bed',
    size: { width: 2.16, height: 0.55, depth: 2.21 },
    colors: ["#D9D0C5", "#6C727D", "#B8B0A5"], price: 1597, assetId: 'asset--042',
    tags: ["bed", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-043', type: 'plant', name: 'Fiddle Leaf',
    size: { width: 0.46, height: 1.3, depth: 0.5 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1634, assetId: 'asset--043',
    tags: ["plant", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-044', type: 'plant', name: 'Olive Tree',
    size: { width: 0.5, height: 1.3, depth: 0.53 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1671, assetId: 'asset--044',
    tags: ["plant", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-045', type: 'plant', name: 'Snake Plant',
    size: { width: 0.54, height: 1.3, depth: 0.5 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1708, assetId: 'asset--045',
    tags: ["plant", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-046', type: 'plant', name: 'Monstera',
    size: { width: 0.46, height: 1.3, depth: 0.53 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1745, assetId: 'asset--046',
    tags: ["plant", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-047', type: 'plant', name: 'Palm',
    size: { width: 0.5, height: 1.3, depth: 0.5 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1782, assetId: 'asset--047',
    tags: ["plant", "demo", "visualization", "room-ai"],
  },
  {
    id: 'catalog-048', type: 'plant', name: 'Pothos',
    size: { width: 0.54, height: 1.3, depth: 0.53 },
    colors: ["#D7D2C8", "#8A7767", "#3A3C42"], price: 1819, assetId: 'asset--048',
    tags: ["plant", "demo", "visualization", "room-ai"],
  },
];

export const DEMO_MATERIALS: MaterialRef[] = [
  { id: 'mat-wall', name: 'Warm White Wall', color: '#F0EEE9', roughness: 0.92, metalness: 0.0, opacity: 1 },
  { id: 'mat-floor', name: 'Natural Oak', color: '#B9956F', roughness: 0.75, metalness: 0.0, opacity: 1 },
  { id: 'mat-fabric', name: 'Soft Fabric', color: '#D7D0C5', roughness: 0.94, metalness: 0.0, opacity: 1 },
  { id: 'mat-dark', name: 'Graphite', color: '#282C33', roughness: 0.52, metalness: 0.2, opacity: 1 },
  { id: 'mat-glass', name: 'Soft Glass', color: '#A8D6E7', roughness: 0.08, metalness: 0.0, opacity: 0.42 },
  { id: 'mat-brass', name: 'Brushed Brass', color: '#B8945D', roughness: 0.3, metalness: 0.78, opacity: 1 },
];

export function catalogObject(item: DemoCatalogItem, id: string, position = { x: 1, y: item.size.height / 2, z: 1 }): SceneObject {
  return makeObject({
    id, type: item.type, label: item.name,
    transform: { position, rotationY: 0, scale: { x: 1, y: 1, z: 1 } },
    size: item.size, visible: true, locked: false, assetId: item.assetId,
    materialId: item.type === 'lamp' ? 'mat-brass' : item.type === 'plant' ? 'mat-dark' : 'mat-fabric',
  });
}

export function findCatalogItem(id: string): DemoCatalogItem | undefined {
  return DEMO_CATALOG.find(item => item.id === id);
}
