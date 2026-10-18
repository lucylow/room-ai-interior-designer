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


import { scoreRetailStyle } from '../matching/retail-style-filter-engine';

export interface SubstitutionRequest { original:RetailProduct; alternatives:RetailProduct[]; maxPrice:number; requiredStyle?:StyleName; maxWidth?:number; maxDepth?:number; }
export interface SubstitutionOption { product:RetailProduct; priceDelta:number; sizeDelta:number; styleSimilarity:number; explanation:string; }

export function findSubstitutions(request:SubstitutionRequest):SubstitutionOption[] {
  return request.alternatives.filter(a=>a.id!==request.original.id).map((product)=>{
    const styleSimilarity=request.requiredStyle ? scoreRetailStyle(product,request.requiredStyle).score : .65;
    const sizeDelta=Math.abs(product.dimensions.width-request.original.dimensions.width)+Math.abs(product.dimensions.depth-request.original.dimensions.depth);
    const priceDelta=product.price.amount-request.original.price.amount;
    const reasons:string[]=[];
    if(product.price.amount<=request.maxPrice) reasons.push('within budget');
    if(request.maxWidth===undefined || product.dimensions.width<=request.maxWidth) reasons.push('width compatible');
    if(request.maxDepth===undefined || product.dimensions.depth<=request.maxDepth) reasons.push('depth compatible');
    if(styleSimilarity>.65) reasons.push('style-consistent');
    return { product, priceDelta, sizeDelta, styleSimilarity, explanation:`${product.name} is ${money(Math.abs(priceDelta))} ${priceDelta<0?'less':'more'} than the current item and ${reasons.join(', ')}.` };
  }).filter(option=>option.product.price.amount<=request.maxPrice).sort((a,b)=>(b.styleSimilarity-a.styleSimilarity)||(a.priceDelta-b.priceDelta));
}
