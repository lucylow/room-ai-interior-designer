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


export interface AvailabilityGateInput { product:RetailProduct; requirePurchaseReady:boolean; allowUnknown:boolean; }
export interface AvailabilityGateResult { allowed:boolean; state:string; reasons:string[]; }

export function gatePurchaseReadiness(input:AvailabilityGateInput):AvailabilityGateResult {
  const reasons:string[] = [];
  const { product } = input;
  if (product.demoOnly || product.availability === 'demo') reasons.push('Demo/snapshot product; live inventory must be revalidated.');
  if (product.availability === 'out-of-stock') reasons.push('Retailer reports out-of-stock.');
  if (product.availability === 'unknown' && !input.allowUnknown) reasons.push('Availability is unknown.');
  const allowed = !input.requirePurchaseReady || (product.availability === 'in-stock' && reasons.length === 0);
  return { allowed, state:product.availability, reasons };
}

export function availabilityBadge(product:RetailProduct):string {
  switch (product.availability) {
    case 'in-stock': return 'Available';
    case 'low-stock': return 'Low stock';
    case 'out-of-stock': return 'Out of stock';
    case 'demo': return 'Demo snapshot';
    default: return 'Recheck retailer';
  }
}
