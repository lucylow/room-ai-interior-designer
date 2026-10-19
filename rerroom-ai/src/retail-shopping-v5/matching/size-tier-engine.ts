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


export interface SizeTier { label:'micro'|'compact'|'standard'|'large'; maxWidth:number; maxDepth:number; note:string; }
export const SIZE_TIERS:SizeTier[]=[{label:'micro',maxWidth:60,maxDepth:45,note:'Best for compact layouts and narrow circulation.'},{label:'compact',maxWidth:100,maxDepth:60,note:'Flexible apartment-scale furniture.'},{label:'standard',maxWidth:180,maxDepth:90,note:'Common residential scale.'},{label:'large',maxWidth:400,maxDepth:150,note:'Best reserved for larger rooms.'}];
export function sizeTier(product:RetailProduct):SizeTier['label'] { const hit=SIZE_TIERS.find(t=>product.dimensions.width<=t.maxWidth&&product.dimensions.depth<=t.maxDepth); return hit?.label ?? 'large'; }
export function filterBySizeTier(items:RetailProduct[],tier:SizeTier['label']):RetailProduct[]{const target=SIZE_TIERS.find(t=>t.label===tier)??SIZE_TIERS[2]; return items.filter(i=>i.dimensions.width<=target.maxWidth&&i.dimensions.depth<=target.maxDepth);}
