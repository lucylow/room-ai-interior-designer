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


export interface CartGroup { category:string; productIds:string[]; subtotal:number; share:number; }
export function groupCartLines(cart:ShoppingCart, products:RetailProduct[]):CartGroup[] {
  const map = new Map<string, CartGroup>();
  const total = cart.lines.reduce((s,l)=>s+l.estimatedTotal,0) || 1;
  for(const line of cart.lines){ const product=products.find(p=>p.id===line.productId); if(!product) continue; const key=product.category; const group=map.get(key) ?? {category:key,productIds:[],subtotal:0,share:0}; group.productIds.push(product.id); group.subtotal += line.estimatedTotal; group.share = group.subtotal/total; map.set(key,group); }
  return [...map.values()].sort((a,b)=>b.subtotal-a.subtotal);
}

export function roomKitNarrative(groups:CartGroup[]):string { if(!groups.length) return 'No products selected yet.'; const lead=groups.slice(0,3).map(g=>`${g.category} at ${money(g.subtotal)}`).join(', '); return `Your current room kit is led by ${lead}.`; }
