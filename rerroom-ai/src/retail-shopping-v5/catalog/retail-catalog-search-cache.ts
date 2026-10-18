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


export interface CatalogCacheEntry { queryKey:string; products:RetailProduct[]; createdAt:string; expiresAt:string; source:'live'|'snapshot'|'demo'; }
export class RetailCatalogSearchCache { private cache=new Map<string,CatalogCacheEntry>(); constructor(private ttlMs=5*60*1000){} get(queryKey:string,now=Date.now()):RetailProduct[]|undefined{const e=this.cache.get(queryKey); if(!e)return undefined; if(Date.parse(e.expiresAt)<=now){this.cache.delete(queryKey);return undefined;} return e.products.map(p=>({...p}));} set(queryKey:string,products:RetailProduct[],source:CatalogCacheEntry['source']='snapshot',now=Date.now()):void{this.cache.set(queryKey,{queryKey,products:products.map(p=>({...p})),createdAt:new Date(now).toISOString(),expiresAt:new Date(now+this.ttlMs).toISOString(),source});} clear():void{this.cache.clear();} stats(){return {size:this.cache.size,keys:[...this.cache.keys()]};}}
