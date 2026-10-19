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


import type { DemoRetailRoom } from '../demo/retail-demo-room-data-v2';

export interface RoomPackExportV2 { roomId:string; title:string; style:StyleName; palette:string; budget:number; selectedProductIds:string[]; productFacts:string[]; nextSteps:string[]; }
export function exportRoomPack(room:DemoRetailRoom,products:RetailProduct[]):RoomPackExportV2 { const selected=products.filter(p=>room.existingProductIds.includes(p.id)); return {roomId:room.id,title:room.name,style:room.style,palette:room.paletteId,budget:room.budget.totalBudget,selectedProductIds:selected.map(p=>p.id),productFacts:selected.flatMap(p=>[p.name,money(p.price.amount),`${p.dimensions.width}×${p.dimensions.depth}×${p.dimensions.height} cm`]),nextSteps:['Review in 2D','Try in 3D','Compare alternatives','Revalidate retailer before purchase']}; }
