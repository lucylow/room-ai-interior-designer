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


import { assessProductQuality } from '../catalog/retail-product-normalizer-v2';

export interface RetailProductCardV2 { id:string; title:string; priceLabel:string; dimensionsLabel:string; stylesLabel:string; paletteScore:number; fitLabel:string; dataTrustLabel:string; demoLabel:string; actions:string[]; }
export function makeRetailProductCard(product:RetailProduct,fitLabel:string,paletteScore:number):RetailProductCardV2 { const trust=assessProductQuality(product); return {id:product.id,title:product.name,priceLabel:money(product.price.amount),dimensionsLabel:`${product.dimensions.width} × ${product.dimensions.depth} × ${product.dimensions.height} cm`,stylesLabel:product.styles.slice(0,3).join(' · '),paletteScore,fitLabel,dataTrustLabel:`${Math.round(trust.trustScore*100)}% data trust`,demoLabel:product.availability==='unknown'?'Snapshot · recheck live':'Live availability verified',actions:['Try in room','Swap','Compare','Add to room kit']}; }
