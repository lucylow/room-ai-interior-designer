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


export interface SceneSwap { id:string; timestamp:string; slotId:string; fromProductId?:string; toProductId:string; reason:string; reversible:boolean; }
export class ShoppingSceneSwapHistory {
  private swaps:SceneSwap[]=[];
  push(slotId:string,toProductId:string,fromProductId:string|undefined,reason:string):SceneSwap { const swap={id:stableId('swap',`${slotId}:${toProductId}:${this.swaps.length}`),timestamp:new Date().toISOString(),slotId,fromProductId,toProductId,reason,reversible:true}; this.swaps.push(swap); return {...swap}; }
  list():SceneSwap[]{ return this.swaps.map(s=>({...s})); }
  undo():SceneSwap|undefined { return this.swaps.pop(); }
  latestForSlot(slotId:string):SceneSwap|undefined { return [...this.swaps].reverse().find(s=>s.slotId===slotId); }
  summary():string[]{ return this.swaps.map(s=>`${s.slotId}: ${s.fromProductId??'empty'} → ${s.toProductId} · ${s.reason}`); }
}
