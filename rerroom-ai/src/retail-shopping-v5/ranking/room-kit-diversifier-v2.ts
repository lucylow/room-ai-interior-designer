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


export function diversifyRoomKit(products:RetailProduct[],maxItems=6):RetailProduct[]{const result:RetailProduct[]=[]; const seenCategories=new Set<string>(); for(const product of products){if(result.length>=maxItems)break; if(!seenCategories.has(product.category)||result.length<2){result.push(product);seenCategories.add(product.category);}} for(const product of products){if(result.length>=maxItems)break; if(!result.includes(product))result.push(product);} return result;}
export function avoidNearDuplicateStyles(products:RetailProduct[]):RetailProduct[]{const seen=new Set<string>(); return products.filter(p=>{const key=p.styles.slice().sort().slice(0,2).join('|'); if(seen.has(key))return false; seen.add(key); return true;});}
