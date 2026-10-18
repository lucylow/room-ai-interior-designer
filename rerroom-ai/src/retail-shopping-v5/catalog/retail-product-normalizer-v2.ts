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


export interface ProductQualityReport { productId:string; completeness:number; issues:string[]; trustScore:number; }
export function assessProductQuality(product:RetailProduct):ProductQualityReport { const issues:string[]=[]; let completeness=1; if(!product.sku){issues.push('SKU missing');completeness-=.15;} if(!product.url||product.url==='#'){issues.push('purchase URL missing');completeness-=.15;} if(product.dimensions.width<=0||product.dimensions.depth<=0){issues.push('footprint dimensions missing');completeness-=.2;} if(!product.price||product.price.amount<=0){issues.push('price missing');completeness-=.2;} if(!product.colors.length){issues.push('colour data missing');completeness-=.05;} if(!product.materials.length){issues.push('material data missing');completeness-=.05;} const trust=clamp(completeness*(product.availability==='unknown'?.8:1)); return {productId:product.id,completeness:clamp(completeness),issues,trustScore:trust}; }
export function rankByDataTrust(products:RetailProduct[]):RetailProduct[]{return [...products].sort((a,b)=>assessProductQuality(b).trustScore-assessProductQuality(a).trustScore);}
