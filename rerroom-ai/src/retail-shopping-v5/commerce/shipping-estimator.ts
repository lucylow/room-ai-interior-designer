/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  RetailProduct,
  RoomType,
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


export interface ShippingContext { postalCode?:string; roomType:RoomType; productCount:number; orderSubtotal:number; }
export interface ShippingEstimate { base:number; remoteSurcharge:number; sizeSurcharge:number; total:number; disclaimer:string; }

export function estimateShipping(context:ShippingContext, products:RetailProduct[]):ShippingEstimate {
  const oversized = products.filter((p) => Math.max(p.dimensions.width,p.dimensions.depth,p.dimensions.height) >= 180).length;
  const largeCount = products.filter((p) => p.dimensions.width >= 100 || p.dimensions.depth >= 70).length;
  const base = context.orderSubtotal >= 1000 ? 0 : 39 + Math.min(3, context.productCount) * 6;
  const remoteSurcharge = context.postalCode && /^[A-Za-z]\d[A-Za-z]/.test(context.postalCode) ? 0 : 19;
  const sizeSurcharge = oversized * 20 + largeCount * 7;
  return { base, remoteSurcharge, sizeSurcharge, total:base+remoteSurcharge+sizeSurcharge, disclaimer:'Demo estimate only; final delivery charges depend on retailer, destination, inventory, service level and checkout.' };
}

export function shippingTier(estimate:ShippingEstimate):'free'|'standard'|'large-item' { return estimate.total === 0 ? 'free' : estimate.total > 75 ? 'large-item' : 'standard'; }
