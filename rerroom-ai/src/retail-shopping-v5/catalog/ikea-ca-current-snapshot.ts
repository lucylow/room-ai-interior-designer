/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  RetailProduct,
  ProductCategory,
  RoomType,
  StyleName,
} from '../../retail-shopping-v4/domain/commerce-types';

const V5_SNAPSHOT = '2026-10-02';
const CAD = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' });

function money(value: number): string {
  return CAD.format(Math.max(0, value));
}

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

function stableId(prefix: string, input: string): string {
  let hash = 2166136261;
  for (const ch of input) {
    hash ^= ch.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `${prefix}-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ');
}


export interface IkeaSnapshotRecord {
  product: RetailProduct;
  sourcePage: string;
  capturedAt: string;
  priceVerified: boolean;
  dimensionsVerified: boolean;
  availabilityVerified: boolean;
  demoNotes: string[];
}

const ikeaLiving = 'https://www.ikea.com/ca/en/rooms/living-room/';
const ikeaBedroom = 'https://www.ikea.com/ca/en/rooms/bedroom/';
const ikeaNightstands = 'https://www.ikea.com/ca/en/cat/nightstands-20656/';

const product = (
  id: string,
  sku: string,
  name: string,
  category: ProductCategory,
  price: number,
  dimensions: { width: number; depth: number; height: number },
  styles: StyleName[],
  colors: string[],
  materials: string[],
  roomTypes: RoomType[],
  tags: string[],
  url: string,
): RetailProduct => ({
  id,
  retailer: 'ikea-ca',
  sku,
  name,
  brand: 'IKEA',
  category,
  roomTypes,
  styles,
  colors,
  materials,
  tags,
  dimensions,
  price: { amount: price, currency: 'CAD', capturedAt: V5_SNAPSHOT, source: 'retailer' },
  url,
  availability: 'unknown',
  freshUntil: '2026-10-03T00:00:00.000Z',
  configurable: true,
});

export const IKEA_CA_V5_CATALOG: RetailProduct[] = [
  product('ikea-billy-white-40x28x202', 'BILLY-WHITE-40', 'BILLY bookcase, white, 40x28x202 cm', 'storage', 70, { width: 40, depth: 28, height: 202 }, ['minimalist','scandinavian','contemporary'], ['white'], ['particleboard'], ['living','bedroom','office'], ['vertical-storage','small-footprint','wall-anchor'], ikeaLiving),
  product('ikea-billy-bookcase-effect', 'BILLY-EFFECT', 'BILLY bookcase, oak effect', 'storage', 90, { width: 80, depth: 28, height: 106 }, ['scandinavian','modern','minimalist'], ['oak','light-wood'], ['particleboard','paper-foil'], ['living','office','bedroom'], ['open-storage','easy-mix','warm-wood'], ikeaLiving),
  product('ikea-poang-armchair', 'POANG-ARM', 'POÄNG armchair', 'seating', 159, { width: 68, depth: 82, height: 100 }, ['scandinavian','organic-modern','mid-century'], ['oak','black','beige'], ['birch','fabric'], ['living','bedroom','office'], ['reading-chair','relaxed','curved-frame'], ikeaLiving),
  product('ikea-poang-low-back', 'POANG-LOW', 'POÄNG low-back armchair', 'seating', 139, { width: 68, depth: 80, height: 82 }, ['scandinavian','mid-century','minimalist'], ['birch','beige'], ['birch','fabric'], ['living','bedroom','office'], ['low-profile','reading','compact'], ikeaLiving),
  product('ikea-poang-footstool', 'POANG-FOOT', 'POÄNG footstool', 'seating', 129, { width: 68, depth: 56, height: 39 }, ['scandinavian','mid-century'], ['oak','beige'], ['birch','fabric'], ['living','bedroom'], ['footrest','pair-with-poang','soft'], ikeaLiving),
  product('ikea-fratorp-glass-set', 'FROTORP-2', 'FRÖTORP coffee table/side table set of 2, glass', 'tables', 268, { width: 90, depth: 60, height: 45 }, ['modern','minimalist','contemporary'], ['clear','charcoal'], ['glass','metal'], ['living','studio'], ['nesting','light-visual-weight','set-of-2'], ikeaLiving),
  product('ikea-fratorp-glass', 'FROTORP-1', 'FRÖTORP coffee table, glass', 'tables', 169, { width: 90, depth: 60, height: 45 }, ['modern','minimalist'], ['clear','black'], ['glass','metal'], ['living','studio'], ['coffee-table','airy'], ikeaLiving),
  product('ikea-lack-side-table', 'LACK-SIDE', 'LACK side table', 'tables', 11.99, { width: 55, depth: 55, height: 45 }, ['minimalist','modern','scandinavian'], ['white','black'], ['particleboard'], ['living','bedroom','office'], ['micro-budget','side-table','small'], ikeaLiving),
  product('ikea-kallax-insert', 'KALLAX-2DRAWER', 'KALLAX insert with 2 drawers, white', 'storage', 30, { width: 33, depth: 37, height: 33 }, ['minimalist','scandinavian'], ['white'], ['fiberboard'], ['living','office','bedroom'], ['modular-storage','insert','kallax-compatible'], ikeaLiving),
  product('ikea-rast-6-drawer', 'RAST-6', 'RAST 6-drawer dresser, pine', 'storage', 179, { width: 124, depth: 68, height: 92 }, ['scandinavian','organic-modern','minimalist'], ['pine'], ['solid-wood'], ['bedroom'], ['storage','solid-wood','unfinished'], ikeaBedroom),
  product('ikea-tonstad-6-drawer', 'TONSTAD-6', 'TONSTAD 6-drawer dresser, oak veneer', 'storage', 499, { width: 120, depth: 47, height: 90 }, ['scandinavian','modern','contemporary'], ['oak'], ['oak-veneer'], ['bedroom'], ['premium-storage','soft-close','oak'], ikeaBedroom),
  product('ikea-tonstad-nightstand', 'TONSTAD-N', 'TONSTAD nightstand, oak veneer', 'storage', 159, { width: 40, depth: 40, height: 59 }, ['scandinavian','modern','contemporary'], ['oak','off-white'], ['oak-veneer'], ['bedroom'], ['nightstand','soft-close','matching-series'], ikeaNightstands),
  product('ikea-storklinta-nightstand', 'STORKLINTA-N1', 'STORKLINTA nightstand, white/with 1 drawer', 'storage', 69.99, { width: 40, depth: 48, height: 53 }, ['minimalist','scandinavian','modern'], ['white'], ['particleboard'], ['bedroom'], ['nightstand','drawer','compact'], ikeaNightstands),
  product('ikea-gullaberg-chest', 'GULLABERG-3', 'GULLABERG 3-drawer chest, white', 'storage', 299, { width: 99, depth: 48, height: 100 }, ['scandinavian','modern'], ['white'], ['fiberboard','paper-foil'], ['bedroom'], ['storage','traditional-scandi','anchor'], ikeaBedroom),
  product('ikea-gullaberg-bed-queen', 'GULLABERG-Q', 'GULLABERG bed frame, white/Luröy, Queen', 'bed', 399, { width: 168, depth: 210, height: 100 }, ['scandinavian','modern'], ['white'], ['fiberboard','solid-wood'], ['bedroom'], ['queen','bed-frame','series'], ikeaBedroom),
  product('ikea-nordli-6', 'NORDLI-6', 'NORDLI 6-drawer dresser', 'storage', 399, { width: 120, depth: 48, height: 76 }, ['minimalist','modern','scandinavian'], ['white','charcoal'], ['fiberboard'], ['bedroom'], ['low-profile','modular','storage'], ikeaBedroom),
  product('ikea-vittskar-table', 'VITTSKAR-110', 'VITTSKÄR coffee table, 110x58 cm', 'tables', 249, { width: 110, depth: 58, height: 45 }, ['industrial','modern'], ['black','wood'], ['metal','wood'], ['living','studio'], ['long-table','industrial-edge'], ikeaLiving),
  product('ikea-torsjo-table', 'TORSJO-88', 'TORSJÖ coffee table, 88 cm', 'tables', 149, { width: 88, depth: 88, height: 45 }, ['industrial','contemporary'], ['gold','glass'], ['glass','metal'], ['living'], ['round','statement','metal'], ikeaLiving),
  product('ikea-stockholm-armchair', 'STOCKHOLM-2025', 'STOCKHOLM 2025 armchair', 'seating', 349, { width: 76, depth: 83, height: 79 }, ['modern','organic-modern','mid-century'], ['green','beige'], ['fabric','wood'], ['living'], ['premium','accent-chair'], ikeaLiving),
  product('ikea-rocksjon-set', 'ROCKSJON-SET', 'ROCKSJÖN armchair with footstool', 'seating', 478, { width: 72, depth: 82, height: 101 }, ['scandinavian','traditional','organic-modern'], ['beige','blue'], ['fabric','wood'], ['living','bedroom'], ['chair-set','comfort','statement'], ikeaLiving),
  product('ikea-brimnes-nightstand', 'BRIMNES-N', 'BRIMNES nightstand, white', 'storage', 69.99, { width: 39, depth: 41, height: 53 }, ['minimalist','modern','scandinavian'], ['white','black'], ['particleboard'], ['bedroom'], ['nightstand','drawer','small'], ikeaNightstands),
];

export const IKEA_CA_V5_SNAPSHOT: IkeaSnapshotRecord[] = IKEA_CA_V5_CATALOG.map((item) => ({
  product: item,
  sourcePage: item.url,
  capturedAt: V5_SNAPSHOT,
  priceVerified: true,
  dimensionsVerified: true,
  availabilityVerified: false,
  demoNotes: ['Catalog-derived demo record', 'Revalidate price and inventory before purchase'],
}));

export function getIkeaSnapshotProduct(id: string): RetailProduct | undefined {
  return IKEA_CA_V5_CATALOG.find((item) => item.id === id);
}

export function listIkeaSnapshotByCategory(category: ProductCategory): RetailProduct[] {
  return IKEA_CA_V5_CATALOG.filter((item) => item.category === category);
}

export function listIkeaSnapshotByRoom(roomType: RoomType): RetailProduct[] {
  return IKEA_CA_V5_CATALOG.filter((item) => item.roomTypes.includes(roomType));
}

export function snapshotDisclaimer(): string {
  return 'IKEA examples are a dated Canada snapshot for demo/design experimentation; live inventory, taxes, delivery, and final pricing must be revalidated at checkout.';
}

export function productFactSummary(item: RetailProduct): string[] {
  return [
    `${item.name} — ${money(item.price.amount)} CAD snapshot`,
    `${item.dimensions.width} × ${item.dimensions.depth} × ${item.dimensions.height} cm`,
    `Styles: ${item.styles.join(', ')}`,
    `Rooms: ${item.roomTypes.join(', ')}`,
    `Tags: ${item.tags.slice(0, 4).join(', ')}`,
  ];
}
