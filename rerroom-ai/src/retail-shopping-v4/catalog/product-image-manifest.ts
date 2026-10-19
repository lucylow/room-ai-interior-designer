import { RetailProduct, RoomEnvelope, DesignIntent, Budget, ShoppingConstraints, FurnitureSlot, Candidate } from '../domain/commerce-types';

export interface ProductImageManifestConfig {
  weight: number;
  threshold: number;
  maxResults: number;
  mode: 'demo' | 'snapshot' | 'live';
  note?: string;
}

export interface ProductImageManifestInput {
  products: RetailProduct[];
  room?: RoomEnvelope;
  intent?: DesignIntent;
  budget?: Budget;
  constraints?: ShoppingConstraints;
  slot?: FurnitureSlot;
  candidates?: Candidate[];
  query?: string;
  now?: string;
}

export interface ProductImageManifestResult {
  engine: string;
  title: string;
  score: number;
  confidence: number;
  selected: RetailProduct[];
  reasons: string[];
  warnings: string[];
  metrics: Record<string, number>;
  actions: string[];
}

const DEFAULT_CONFIG: ProductImageManifestConfig = {
  weight: 1.12,
  threshold: 0.58,
  maxResults: 12,
  mode: 'demo',
  note: 'retailer image asset metadata and fallbacks',
};

function clamp(v: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, Number.isFinite(v) ? v : min));
}

function textScore(haystack: string[], needle: string): number {
  if (!needle.trim()) return 0.5;
  const q = needle.toLowerCase().split(/\s+/).filter(Boolean);
  const joined = haystack.join(' ').toLowerCase();
  if (!q.length) return 0.5;
  const hits = q.filter(token => joined.includes(token)).length;
  return hits / q.length;
}

function productFit(p: RetailProduct, input: ProductImageManifestInput): number {
  const roomScore = input.room ? (p.roomTypes.includes(input.room.roomType) ? 1 : 0.25) : 0.5;
  const styleScore = input.intent ? (p.styles.includes(input.intent.style) ? 1 : textScore(p.styles, input.intent.style)) : 0.5;
  const categoryScore = input.slot ? textScore([p.category, ...p.tags], input.slot.role) : 0.5;
  const budgetScore = input.budget ? clamp(1 - Math.max(0, p.price.amount - input.budget.total) / Math.max(1, input.budget.total)) : 0.5;
  const queryScore = textScore([p.name, p.category, ...p.tags, ...p.colors, ...p.materials], input.query ?? '');
  return clamp(roomScore * 0.22 + styleScore * 0.28 + categoryScore * 0.20 + budgetScore * 0.18 + queryScore * 0.12);
}

function metrics(selected: RetailProduct[]): Record<string, number> {
  const total = selected.reduce((s, p) => s + p.price.amount, 0);
  const avg = selected.length ? total / selected.length : 0;
  const avgHeight = selected.length ? selected.reduce((s, p) => s + p.dimensions.height, 0) / selected.length : 0;
  const avgWidth = selected.length ? selected.reduce((s, p) => s + p.dimensions.width, 0) / selected.length : 0;
  const demoRatio = selected.length ? selected.filter(p => p.demoOnly).length / selected.length : 0;
  const realRatio = selected.length ? 1 - demoRatio : 0;
  return { totalPrice: Number(total.toFixed(2)), averagePrice: Number(avg.toFixed(2)), averageHeightCm: Number(avgHeight.toFixed(1)), averageWidthCm: Number(avgWidth.toFixed(1)), demoRatio: Number(demoRatio.toFixed(2)), snapshotRatio: Number(realRatio.toFixed(2)) };
}

function warnings(selected: RetailProduct[], input: ProductImageManifestInput): string[] {
  const out: string[] = [];
  if (!selected.length) out.push('No catalog candidates passed the current filters.');
  if (selected.some(p => p.price.amount > (input.budget?.total ?? Number.POSITIVE_INFINITY))) out.push('Some candidates exceed the current item budget.');
  if (selected.some(p => p.availability === 'unknown')) out.push('Availability is not confirmed for snapshot products.');
  if (selected.some(p => p.demoOnly)) out.push('Some candidates are demo-only and are not purchasable.');
  if (input.room && selected.some(p => p.dimensions.width > (input.room?.width ?? 0) * 100)) out.push('At least one candidate may exceed room width assumptions.');
  return out;
}

export function buildProductImageManifest(input: ProductImageManifestInput, overrides: Partial<ProductImageManifestConfig> = {}): ProductImageManifestResult {
  const config = { ...DEFAULT_CONFIG, ...overrides };
  const pool = input.products
    .map(product => ({ product, score: productFit(product, input) }))
    .filter(row => row.score >= config.threshold)
    .sort((a, b) => b.score - a.score || a.product.price.amount - b.product.price.amount)
    .slice(0, config.maxResults);
  const selected = pool.map(row => row.product);
  const score = pool.length ? clamp(pool.reduce((s, row) => s + row.score, 0) / pool.length) : 0;
  const confidence = clamp(score * 0.72 + (selected.length >= 3 ? 0.18 : selected.length ? 0.08 : 0) + (input.intent ? 0.08 : 0));
  const why = selected.slice(0, 4).map(p => `${p.name} matches ${input.intent?.style ?? 'the current concept'} and remains inside the evaluated retail candidate set.`);
  const actions = selected.slice(0, 3).map(p => `Try ${p.name} in room`);
  actions.push('Compare alternatives', 'Check current retailer availability', 'Save approved choice');
  return {
    engine: 'catalog.ProductImageManifest',
    title: 'retailer image asset metadata and fallbacks',
    score: Number(score.toFixed(3)),
    confidence: Number(confidence.toFixed(3)),
    selected,
    reasons: why.length ? why : ['Adjust the filters or raise the budget to widen the candidate set.'],
    warnings: warnings(selected, input),
    metrics: metrics(selected),
    actions,
  };
}

export function scoreProductImageManifestProduct(product: RetailProduct, input: ProductImageManifestInput): number {
  return Number(productFit(product, input).toFixed(3));
}

export function explainProductImageManifest(product: RetailProduct, input: ProductImageManifestInput): string {
  const score = scoreProductImageManifestProduct(product, input);
  const room = input.room ? ` for ${input.room.roomType}` : '';
  const style = input.intent ? ` in ${input.intent.style} style` : '';
  const budget = input.budget ? ` with a $${input.budget.total.toFixed(0)} CAD planning cap` : '';
  return `${product.name} scores ${score.toFixed(2)}${style}${room}${budget} using ${'sku / price / dimensions / styles / availability'}.`;
}

export function selectProductImageManifestAlternative(products: RetailProduct[], input: ProductImageManifestInput, excludeId?: string): RetailProduct | undefined {
  return products
    .filter(p => p.id !== excludeId)
    .map(p => ({ p, score: scoreProductImageManifestProduct(p, input) }))
    .filter(row => row.score >= 0.4)
    .sort((a, b) => b.score - a.score || a.p.price.amount - b.p.price.amount)[0]?.p;
}

export function buildProductImageManifestAudit(result: ProductImageManifestResult): {
  selectedCount: number;
  hasWarnings: boolean;
  demoOnlyCount: number;
  projectedSpend: number;
  confidenceBand: 'high' | 'medium' | 'low';
} {
  const projectedSpend = result.metrics.totalPrice ?? 0;
  const demoOnlyCount = Math.round((result.metrics.demoRatio ?? 0) * result.selected.length);
  const confidenceBand = result.confidence >= 0.8 ? 'high' : result.confidence >= 0.55 ? 'medium' : 'low';
  return { selectedCount: result.selected.length, hasWarnings: result.warnings.length > 0, demoOnlyCount, projectedSpend, confidenceBand };
}
