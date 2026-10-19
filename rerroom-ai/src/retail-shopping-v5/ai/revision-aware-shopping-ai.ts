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
import { parseShoppingIntent } from './shopping-intent-parser-v2';

import { scoreRetailStyle } from '../matching/retail-style-filter-engine';

export interface ShoppingRevisionRequest { current:RetailProduct[]; prompt:string; budget:number; room:RoomType; style:StyleName; palette:string; }
export interface ShoppingRevisionResult { keepIds:string[]; replaceIds:string[]; addIds:string[]; removeIds:string[]; narrative:string[]; }
export function reviseShoppingConcept(request:ShoppingRevisionRequest, catalog:RetailProduct[]):ShoppingRevisionResult {
  const intent=parseShoppingIntent(request.prompt); const narrative:string[]=[]; let keepIds=request.current.map(p=>p.id); const replaceIds:string[]=[]; const addIds:string[]=[]; const removeIds:string[]=[];
  const cheaper=intent.revisionTokens.includes('cheaper'); const smaller=intent.revisionTokens.includes('smaller');
  for(const product of request.current){
    const alternatives=catalog.filter(p=>p.roomTypes.includes(request.room)).filter(p=>p.category===product.category).filter(p=>!cheaper || p.price.amount<product.price.amount).filter(p=>!smaller || p.dimensions.width<product.dimensions.width).sort((a,b)=>scoreRetailStyle(b,request.style).score-scoreRetailStyle(a,request.style).score || a.price.amount-b.price.amount);
    const next=alternatives[0]; if(next && (cheaper || smaller || intent.revisionTokens.includes('replace'))){ keepIds=keepIds.filter(id=>id!==product.id); replaceIds.push(next.id); narrative.push(`Swap ${product.name} → ${next.name}.`); }
  }
  if(intent.roles.includes('storage')){ const extra=catalog.filter(p=>p.category==='storage').filter(p=>!keepIds.includes(p.id)).filter(p=>p.price.amount<=request.budget).sort((a,b)=>a.price.amount-b.price.amount)[0]; if(extra){ addIds.push(extra.id); narrative.push(`Add ${extra.name} for storage.`); }}
  return { keepIds, replaceIds, addIds, removeIds, narrative };
}
