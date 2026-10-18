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


export interface ShareableShoppingBoard { id:string; roomName:string; style:StyleName; paletteId:string; budget:number; productIds:string[]; subtotal:number; disclaimer:string; shareToken:string; }
export function makeShareableBoard(roomName:string,style:StyleName,paletteId:string,budget:number,products:RetailProduct[]):ShareableShoppingBoard { return {id:stableId('share',`${roomName}:${style}:${paletteId}`),roomName,style,paletteId,budget,productIds:products.map(p=>p.id),subtotal:products.reduce((s,p)=>s+p.price.amount,0),disclaimer:'Demo/share view. Verify retailer pricing and inventory before purchase.',shareToken:stableId('token',`${roomName}:${Date.now()}`)}; }
export function shareBoardText(board:ShareableShoppingBoard,products:RetailProduct[]):string { const names=products.filter(p=>board.productIds.includes(p.id)).map(p=>`${p.name} (${money(p.price.amount)})`); return `${board.roomName} · ${board.style} · ${board.paletteId}\n${names.join('\n')}\nMerchandise: ${money(board.subtotal)}\n${board.disclaimer}`; }
