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
  ShoppingConstraints,
  RetailerContext,
  RetailerResult,
  Candidate,
  Recommendation,
  FurnitureSlot,
  RoomEnvelope,
  DesignIntent,
  Budget,
  ScenePatch,
  ShoppingCart,
  CartLine,
  Bundle,
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


export interface ValueProfile {
  qualityWeight: number;
  styleWeight: number;
  spatialWeight: number;
  priceWeight: number;
  availabilityWeight: number;
  longevityWeight: number;
}
export interface RetailTradeoff {
  productId: string;
  scores: Record<string, number>;
  weightedScore: number;
  narrative: string[];
}

export function defaultValueProfile(): ValueProfile {
  return { qualityWeight: .15, styleWeight: .22, spatialWeight: .25, priceWeight: .22, availabilityWeight: .06, longevityWeight: .10 };
}

function scorePrice(item: RetailProduct, budget: number): number {
  if (budget <= 0) return 0;
  const ratio = item.price.amount / budget;
  if (ratio <= .35) return 1;
  if (ratio <= .65) return .85;
  if (ratio <= .9) return .7;
  if (ratio <= 1) return .5;
  return 0;
}

function scoreLongevity(item: RetailProduct): number {
  const durable = ['solid-wood','oak-veneer','metal','birch'];
  const hits = item.materials.filter((m) => durable.some((term) => m.includes(term))).length;
  return clamp(.45 + hits * .2);
}

function scoreAvailability(item: RetailProduct): number {
  return item.availability === 'in-stock' ? 1 : item.availability === 'low-stock' ? .65 : item.availability === 'demo' ? .35 : .5;
}

export function buildRetailTradeoff(item: RetailProduct, budget: number, spatialScore: number, styleScore: number, profile = defaultValueProfile()): RetailTradeoff {
  const scores = {
    quality: scoreLongevity(item),
    style: clamp(styleScore),
    spatial: clamp(spatialScore),
    price: scorePrice(item, budget),
    availability: scoreAvailability(item),
    longevity: scoreLongevity(item),
  };
  const weightedScore =
    scores.quality * profile.qualityWeight +
    scores.style * profile.styleWeight +
    scores.spatial * profile.spatialWeight +
    scores.price * profile.priceWeight +
    scores.availability * profile.availabilityWeight +
    scores.longevity * profile.longevityWeight;
  const narrative = [
    `${item.name} balances spatial fit (${Math.round(scores.spatial * 100)}%) with style fit (${Math.round(scores.style * 100)}%).`,
    `Budget contribution is ${Math.round(scores.price * 100)}% under the current room budget policy.`,
    `Material durability signal is ${Math.round(scores.longevity * 100)}%.`,
  ];
  return { productId:item.id, scores, weightedScore:clamp(weightedScore), narrative };
}

export function rankRetailTradeoffs(items: RetailProduct[], budget: number, profile = defaultValueProfile()): RetailTradeoff[] {
  return items.map((item) => buildRetailTradeoff(item, budget, 1, item.styles.includes('modern') ? .9 : .75, profile)).sort((a,b) => b.weightedScore - a.weightedScore);
}
