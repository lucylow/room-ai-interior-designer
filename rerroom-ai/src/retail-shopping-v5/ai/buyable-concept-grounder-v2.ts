/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  RetailProduct,
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


import type { ShoppingIntentV2 } from './shopping-intent-parser-v2';

import { scoreRetailStyle } from '../matching/retail-style-filter-engine';

export interface GroundedConceptV2 { conceptId:string; title:string; style:StyleName; paletteId:string; recommendedProductIds:string[]; groundedClaims:string[]; ungroundedClaims:string[]; confidence:number; }
export function groundConcept(conceptId:string, title:string, intent:ShoppingIntentV2, products:RetailProduct[]):GroundedConceptV2 {
  const style=intent.style ?? 'modern'; const palette=intent.paletteId ?? 'modern-neutral';
  const candidates=products.filter(p=>p.roomTypes.includes(intent.room ?? 'living')).filter(p=>!intent.maxBudget || p.price.amount<=intent.maxBudget).sort((a,b)=>scoreRetailStyle(b,style).score-scoreRetailStyle(a,style).score);
  const selected=candidates.slice(0,8); const groundedClaims=selected.map(p=>`${p.name} is represented by a dated catalog snapshot at ${money(p.price.amount)} CAD.`);
  const ungroundedClaims=selected.filter(p=>p.availability==='unknown').map(p=>`${p.name} availability is not verified live.`);
  const confidence=clamp(.55+selected.length*.03-ungroundedClaims.length*.015);
  return {conceptId,title,style,paletteId:palette,recommendedProductIds:selected.map(p=>p.id),groundedClaims,ungroundedClaims,confidence};
}
