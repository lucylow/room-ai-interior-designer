/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  RetailProduct,
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


export interface PriceWatch { id:string; productId:string; targetPrice:number; currentPrice:number; currency:'CAD'|'USD'; lastCheckedAt:string; direction:'drop'|'raise'|'unchanged'; }
export interface PriceWatchUpdate { watch:PriceWatch; delta:number; message:string; }

export function createPriceWatch(product:RetailProduct, targetPrice:number):PriceWatch {
  return { id:stableId('watch', `${product.id}:${targetPrice}`), productId:product.id, targetPrice, currentPrice:product.price.amount, currency:product.price.currency, lastCheckedAt:V5_SNAPSHOT, direction:product.price.amount < targetPrice ? 'drop' : product.price.amount > targetPrice ? 'raise' : 'unchanged' };
}

export function updatePriceWatch(watch:PriceWatch, nextPrice:number, checkedAt=V5_SNAPSHOT):PriceWatchUpdate {
  const delta = nextPrice - watch.currentPrice;
  const direction = delta < -0.01 ? 'drop' : delta > 0.01 ? 'raise' : 'unchanged';
  const message = direction === 'drop' ? `Price dropped by ${money(Math.abs(delta))}.` : direction === 'raise' ? `Price increased by ${money(delta)}.` : 'Price unchanged.';
  return { watch:{ ...watch, currentPrice:nextPrice, lastCheckedAt:checkedAt, direction }, delta, message };
}

export function isTargetReached(watch:PriceWatch):boolean { return watch.currentPrice <= watch.targetPrice; }
