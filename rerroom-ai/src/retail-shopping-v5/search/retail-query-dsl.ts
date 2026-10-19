/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  RetailProduct,
  RetailerId,
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


export interface RetailQueryDsl {
  room?: RoomType;
  roles?: string[];
  styles?: StyleName[];
  requireAllStyles?: boolean;
  colors?: string[];
  materials?: string[];
  categories?: ProductCategory[];
  maxPrice?: number;
  minPrice?: number;
  maxWidth?: number;
  maxDepth?: number;
  maxHeight?: number;
  minWidth?: number;
  minDepth?: number;
  keywords?: string[];
  excludeIds?: string[];
  retailer?: RetailerId;
  limit?: number;
}

export interface RetailQueryPlan { normalized: RetailQueryDsl; clauses: string[]; explanation: string; }

export function normalizeRetailQuery(query: RetailQueryDsl): RetailQueryPlan {
  const normalized: RetailQueryDsl = {
    room: query.room,
    roles: [...new Set((query.roles ?? []).map(normalizeText).filter(Boolean))],
    styles: [...new Set(query.styles ?? [])],
    requireAllStyles: Boolean(query.requireAllStyles),
    colors: [...new Set((query.colors ?? []).map(normalizeText).filter(Boolean))],
    materials: [...new Set((query.materials ?? []).map(normalizeText).filter(Boolean))],
    categories: [...new Set(query.categories ?? [])],
    maxPrice: query.maxPrice,
    minPrice: query.minPrice,
    maxWidth: query.maxWidth,
    maxDepth: query.maxDepth,
    maxHeight: query.maxHeight,
    minWidth: query.minWidth,
    minDepth: query.minDepth,
    keywords: [...new Set((query.keywords ?? []).map(normalizeText).filter(Boolean))],
    excludeIds: [...new Set(query.excludeIds ?? [])],
    retailer: query.retailer,
    limit: Math.min(100, Math.max(1, query.limit ?? 24)),
  };
  const clauses: string[] = [];
  if (normalized.room) clauses.push(`room:${normalized.room}`);
  if (normalized.categories?.length) clauses.push(`category:${normalized.categories.join('|')}`);
  if (normalized.styles?.length) clauses.push(`${normalized.requireAllStyles ? 'all' : 'any'}-styles:${normalized.styles.join('|')}`);
  if (normalized.colors?.length) clauses.push(`colors:${normalized.colors.join('|')}`);
  if (normalized.maxPrice !== undefined) clauses.push(`price<=${money(normalized.maxPrice)}`);
  if (normalized.maxWidth !== undefined) clauses.push(`width<=${normalized.maxWidth}cm`);
  if (normalized.maxDepth !== undefined) clauses.push(`depth<=${normalized.maxDepth}cm`);
  if (normalized.maxHeight !== undefined) clauses.push(`height<=${normalized.maxHeight}cm`);
  return { normalized, clauses, explanation: clauses.length ? `Shopping query compiled from ${clauses.length} constraints.` : 'Broad discovery query.' };
}

function textHit(haystack: string[], needles: string[]): number {
  if (!needles.length) return 0;
  const text = normalizeText(haystack.join(' '));
  return needles.reduce((score, needle) => score + (text.includes(needle) ? 1 : 0), 0) / needles.length;
}

export function matchesRetailQuery(item: RetailProduct, query: RetailQueryDsl): boolean {
  if (query.excludeIds?.includes(item.id)) return false;
  if (query.retailer && item.retailer !== query.retailer) return false;
  if (query.room && !item.roomTypes.includes(query.room)) return false;
  if (query.categories?.length && !query.categories.includes(item.category)) return false;
  if (query.styles?.length) {
    const hits = query.styles.filter((style) => item.styles.includes(style)).length;
    if (query.requireAllStyles ? hits !== query.styles.length : hits === 0) return false;
  }
  if (query.maxPrice !== undefined && item.price.amount > query.maxPrice) return false;
  if (query.minPrice !== undefined && item.price.amount < query.minPrice) return false;
  if (query.maxWidth !== undefined && item.dimensions.width > query.maxWidth) return false;
  if (query.maxDepth !== undefined && item.dimensions.depth > query.maxDepth) return false;
  if (query.maxHeight !== undefined && item.dimensions.height > query.maxHeight) return false;
  if (query.minWidth !== undefined && item.dimensions.width < query.minWidth) return false;
  if (query.minDepth !== undefined && item.dimensions.depth < query.minDepth) return false;
  const terms = query.keywords ?? [];
  if (terms.length) {
    const hit = textHit([item.name, ...item.tags, ...item.colors, ...item.materials], terms);
    if (hit === 0) return false;
  }
  return true;
}

export function executeRetailQuery(items: RetailProduct[], query: RetailQueryDsl): RetailProduct[] {
  const plan = normalizeRetailQuery(query);
  return items.filter((item) => matchesRetailQuery(item, plan.normalized)).slice(0, plan.normalized.limit ?? 24);
}

export function querySummary(plan: RetailQueryPlan): string[] {
  return [
    plan.explanation,
    ...plan.clauses.map((clause) => `• ${clause}`),
    `Limit: ${plan.normalized.limit}`,
  ];
}
