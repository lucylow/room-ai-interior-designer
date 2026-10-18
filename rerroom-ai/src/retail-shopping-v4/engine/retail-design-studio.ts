import { RetailProduct, RoomEnvelope, DesignIntent, Budget, ShoppingConstraints, FurnitureSlot, Recommendation } from '../domain/commerce-types';
import { buildStyleFitRanker } from '../ranking/style-fit-ranker';
import { buildPaletteFitRanker } from '../ranking/palette-fit-ranker';
import { buildPriceFitRanker } from '../ranking/price-fit-ranker';
import { buildSizeFitRanker } from '../ranking/size-fit-ranker';
import { buildRetailValueRanker } from '../ranking/value-ranker';
import { buildRetailSlotMatcher } from '../placement/slot-matcher';

export interface RetailStudioRequest {
  room: RoomEnvelope;
  intent: DesignIntent;
  budget: Budget;
  constraints: ShoppingConstraints;
  slots: FurnitureSlot[];
  query?: string;
  maxPerSlot?: number;
}

export interface RetailStudioSlotResult {
  slotId: string;
  role: string;
  candidates: RetailProduct[];
  primary?: RetailProduct;
  alternatives: RetailProduct[];
  score: number;
  reasons: string[];
  warningCount: number;
}

export interface RetailStudioResult {
  roomId: string;
  style: string;
  budget: number;
  projectedSpend: number;
  remainingBudget: number;
  slots: RetailStudioSlotResult[];
  metrics: { selectedProducts: number; alternativeProducts: number; styleCoverage: number; buyableCoverage: number };
  nextActions: string[];
}

function productRoleMatch(p: RetailProduct, role: string) {
  const hay = [p.category, ...p.tags, p.name].join(' ').toLowerCase();
  const tokens = role.toLowerCase().split(/\W+/).filter(Boolean);
  return tokens.length ? tokens.filter(t => hay.includes(t)).length / tokens.length : 0.5;
}

function uniqueProducts(products: RetailProduct[]) {
  const seen = new Set<string>();
  return products.filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return true; });
}

export function runRetailDesignStudio(products: RetailProduct[], request: RetailStudioRequest): RetailStudioResult {
  let remaining = request.budget.total - request.budget.committed - request.budget.reserved;
  const slotResults: RetailStudioSlotResult[] = [];

  for (const slot of request.slots) {
    const slotPool = products.filter(p => productRoleMatch(p, slot.role) >= 0.25 || p.category === slot.role);
    const pool = slotPool.length ? slotPool : products;
    const style = buildStyleFitRanker({ products: pool, room: request.room, intent: request.intent, budget: request.budget, constraints: request.constraints, slot, query: request.query });
    const palette = buildPaletteFitRanker({ products: pool, room: request.room, intent: request.intent, budget: request.budget, constraints: request.constraints, slot, query: request.query });
    const price = buildPriceFitRanker({ products: pool, room: request.room, intent: request.intent, budget: request.budget, constraints: request.constraints, slot, query: request.query });
    const size = buildSizeFitRanker({ products: pool, room: request.room, intent: request.intent, budget: request.budget, constraints: request.constraints, slot, query: request.query });
    const value = buildRetailValueRanker({ products: pool, room: request.room, intent: request.intent, budget: request.budget, constraints: request.constraints, slot, query: request.query });
    const match = buildRetailSlotMatcher({ products: pool, room: request.room, intent: request.intent, budget: request.budget, constraints: request.constraints, slot, query: request.query });

    const merged = uniqueProducts([...style.selected, ...palette.selected, ...price.selected, ...size.selected, ...value.selected, ...match.selected]);
    const ranked = merged.map(product => {
      const s = style.selected.includes(product) ? style.score : 0.25;
      const p = palette.selected.includes(product) ? palette.score : 0.2;
      const b = price.selected.includes(product) ? price.score : 0.2;
      const z = size.selected.includes(product) ? size.score : 0.2;
      const v = value.selected.includes(product) ? value.score : 0.2;
      const role = productRoleMatch(product, slot.role);
      const fit = match.selected.includes(product) ? match.score : 0.2;
      const total = s * 0.22 + p * 0.12 + b * 0.20 + z * 0.20 + v * 0.12 + role * 0.08 + fit * 0.06;
      return { product, total };
    }).sort((a,b) => b.total - a.total || a.product.price.amount - b.product.price.amount);

    const hardRemaining = Math.max(0, remaining);
    const chosen = ranked.find(row => row.product.price.amount <= hardRemaining);
    const primary = chosen?.product;
    const alternatives = ranked.filter(row => row.product.id !== primary?.id && row.product.price.amount <= hardRemaining).slice(0, request.maxPerSlot ?? 3).map(row => row.product);
    if (primary) remaining -= primary.price.amount;
    slotResults.push({
      slotId: slot.id,
      role: slot.role,
      candidates: ranked.slice(0, 8).map(r => r.product),
      primary,
      alternatives,
      score: Number((chosen?.total ?? 0).toFixed(3)),
      reasons: [style.title, palette.title, price.title, size.title, value.title, match.title, chosen ? 'Selected within the remaining hard budget.' : 'No candidate fit the remaining hard budget; slot left unfilled.'],
      warningCount: [style, palette, price, size, value, match].reduce((n, r) => n + r.warnings.length, 0),
    });
  }

  const selected = slotResults.flatMap(s => s.primary ? [s.primary] : []);
  const alternativeProducts = slotResults.flatMap(s => s.alternatives);
  const projectedSpend = selected.reduce((sum, p) => sum + p.price.amount, 0);
  const styleCoverage = selected.length ? selected.filter(p => p.styles.includes(request.intent.style)).length / selected.length : 0;
  const buyableCoverage = selected.length ? selected.filter(p => !p.demoOnly && p.url.startsWith('http')).length / selected.length : 0;

  return {
    roomId: request.room.id,
    style: request.intent.style,
    budget: request.budget.total,
    projectedSpend: Number(projectedSpend.toFixed(2)),
    remainingBudget: Number((request.budget.total - projectedSpend).toFixed(2)),
    slots: slotResults,
    metrics: {
      selectedProducts: selected.length,
      alternativeProducts: uniqueProducts(alternativeProducts).length,
      styleCoverage: Number(styleCoverage.toFixed(3)),
      buyableCoverage: Number(buyableCoverage.toFixed(3)),
    },
    nextActions: ['Try top product in room', 'Compare the three closest alternatives', 'Lock budget', 'Verify retailer availability', 'Save client-approved shopping revision'],
  };
}
