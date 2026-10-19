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


export interface RawRetailRecord {
  retailer: string;
  sku: string;
  title: string;
  price?: number | string;
  currency?: string;
  widthCm?: number;
  depthCm?: number;
  heightCm?: number;
  categories?: string[];
  colors?: string[];
  materials?: string[];
  styles?: string[];
  url?: string;
  source?: 'live' | 'snapshot' | 'demo';
}

export interface NormalizationIssue { field: string; message: string; severity: 'info' | 'warning' | 'error'; }
export interface NormalizedFeed { products: RetailProduct[]; issues: NormalizationIssue[]; source: 'live' | 'snapshot' | 'demo'; }

function parseMoney(value: number | string | undefined): number | undefined {
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  if (!value) return undefined;
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function inferCategory(labels: string[] = []): ProductCategory {
  const joined = normalizeText(labels.join(' '));
  if (/sofa|sectional|couch/.test(joined)) return 'sofa';
  if (/chair|armchair|stool/.test(joined)) return 'seating';
  if (/table|desk/.test(joined)) return 'tables';
  if (/dresser|bookcase|shelf|cabinet|nightstand|storage/.test(joined)) return 'storage';
  if (/bed/.test(joined)) return 'bed';
  if (/lamp|light/.test(joined)) return 'lighting';
  if (/rug/.test(joined)) return 'rug';
  return 'decor';
}

function parseStyle(labels: string[]): StyleName[] {
  const text = normalizeText(labels.join(' '));
  const styles: StyleName[] = [];
  const rules: Array<[RegExp, StyleName]> = [
    [/minimal/, 'minimalist'],
    [/scandi|nordic/, 'scandinavian'],
    [/industrial|loft|metal/, 'industrial'],
    [/modern|contemporary/, 'modern'],
    [/mid century/, 'mid-century'],
    [/japandi/, 'japandi'],
    [/organic|natural/, 'organic-modern'],
    [/boho|bohemian/, 'bohemian'],
  ];
  for (const [rule, style] of rules) if (rule.test(text)) styles.push(style);
  return [...new Set(styles)];
}

export function normalizeRetailFeed(records: RawRetailRecord[], capturedAt = V5_SNAPSHOT): NormalizedFeed {
  const issues: NormalizationIssue[] = [];
  const products: RetailProduct[] = [];
  const source = records.some((r) => r.source === 'live') ? 'live' : records.some((r) => r.source === 'snapshot') ? 'snapshot' : 'demo';

  records.forEach((record, index) => {
    const price = parseMoney(record.price);
    if (price === undefined) issues.push({ field: `records[${index}].price`, message: 'Missing or invalid price', severity: 'error' });
    const width = record.widthCm ?? 0;
    const depth = record.depthCm ?? 0;
    const height = record.heightCm ?? 0;
    if (width <= 0 || depth <= 0 || height <= 0) issues.push({ field: `records[${index}].dimensions`, message: 'Dimensions are incomplete', severity: 'warning' });
    if (!record.url) issues.push({ field: `records[${index}].url`, message: 'No purchase link supplied', severity: 'warning' });
    if (!record.sku) issues.push({ field: `records[${index}].sku`, message: 'SKU is missing', severity: 'error' });
    if (price === undefined || !record.sku) return;
    const tags = [...new Set([...(record.categories ?? []), ...(record.colors ?? []), ...(record.materials ?? [])].map(normalizeText))];
    products.push({
      id: stableId('retail', `${record.retailer}:${record.sku}`),
      retailer: record.retailer as RetailerId,
      sku: record.sku,
      name: record.title,
      category: inferCategory([...(record.categories ?? []), record.title]),
      roomTypes: ['living','bedroom','office','studio'],
      styles: parseStyle([record.title, ...(record.styles ?? []), ...(record.materials ?? [])]),
      colors: record.colors ?? [],
      materials: record.materials ?? [],
      tags,
      dimensions: { width, depth, height },
      price: { amount: price, currency: 'CAD', capturedAt, source: source === 'live' ? 'retailer' : 'mock' },
      url: record.url ?? '#',
      availability: source === 'demo' ? 'demo' : 'unknown',
      freshUntil: new Date(Date.parse(capturedAt) + 86400000).toISOString(),
    });
  });

  return { products, issues, source };
}

export function mergeRetailFeeds(primary: RetailProduct[], secondary: RetailProduct[]): RetailProduct[] {
  const bySku = new Map(primary.map((item) => [`${item.retailer}:${item.sku}`, item]));
  for (const item of secondary) {
    const key = `${item.retailer}:${item.sku}`;
    if (!bySku.has(key)) bySku.set(key, item);
  }
  return [...bySku.values()];
}

export function freshnessHours(item: RetailProduct, nowIso = new Date().toISOString()): number {
  const captured = Date.parse(item.price.capturedAt);
  const now = Date.parse(nowIso);
  if (!Number.isFinite(captured) || !Number.isFinite(now)) return Infinity;
  return Math.max(0, (now - captured) / 3600000);
}
