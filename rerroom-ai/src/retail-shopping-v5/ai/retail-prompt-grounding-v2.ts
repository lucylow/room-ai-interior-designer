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


import type { ShoppingIntentV2 } from './shopping-intent-parser-v2';

export interface GroundedShoppingPrompt { system:string; context:string; constraints:string[]; allowedActions:string[]; safetyNotes:string[]; }
export function buildGroundedShoppingPrompt(room:RoomEnvelope,intent:ShoppingIntentV2,budget:number):GroundedShoppingPrompt { return {system:'You are a constrained interior-shopping design assistant. Suggest only catalog-grounded products; never invent price, dimensions, inventory or retailer checkout state.',context:`Room ${room.name} is ${room.width}m × ${room.depth}m × ${room.height}m.`,constraints:[`Budget <= ${money(budget)}`,`Room role = ${room.roomType}`,`AI cannot modify authoritative CAD/BIM dimensions`,`Use reversible scene overlays only`,intent.style?`Style = ${intent.style}`:'No fixed style',intent.paletteId?`Palette = ${intent.paletteId}`:'No fixed palette'],allowedActions:['search catalog','rank buyable items','place reversible product overlay','create alternatives','explain tradeoffs'],safetyNotes:['Revalidate live retailer state at checkout.','Do not present demo snapshots as guaranteed inventory.','Do not turn aesthetic placement into construction geometry.']}; }
