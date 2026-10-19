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


import { scoreRetailStyle } from '../matching/retail-style-filter-engine';
import { scorePalette } from '../matching/palette-retail-fit-v2';

export interface ShoppingExplanation { productId:string; headline:string; reasons:string[]; constraintsSatisfied:string[]; caveats:string[]; }
export function explainBuyableChoice(product:RetailProduct, style:StyleName, paletteId:string, budget:number, fitScore:number):ShoppingExplanation {
  const styleFit=scoreRetailStyle(product,style); const paletteFit=scorePalette(product,paletteId);
  const reasons=[`Style fit ${Math.round(styleFit.score*100)}%`,`Palette fit ${Math.round(paletteFit.score*100)}%`,`Spatial fit ${Math.round(fitScore*100)}%`];
  if(product.price.amount<=budget) reasons.push(`${money(product.price.amount)} CAD fits the item allowance.`);
  else reasons.push(`Exceeds the item allowance by ${money(product.price.amount-budget)}.`);
  const constraintsSatisfied=[...styleFit.hits.slice(0,3),...paletteFit.hits.slice(0,2)];
  const caveats=[...styleFit.misses.slice(0,2),...paletteFit.paletteRisk.slice(0,2)];
  if(product.availability==='unknown') caveats.push('Live availability not verified.');
  return { productId:product.id, headline:`${product.name} fits the concept because it aligns with style, palette and room constraints.`, reasons, constraintsSatisfied, caveats };
}
