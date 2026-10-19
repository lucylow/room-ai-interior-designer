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


import type { DemoRetailRoom } from '../demo/retail-demo-room-data-v2';

export interface ShoppingStudioViewModel { roomName:string; budgetLabel:string; styleLabel:string; paletteLabel:string; recommendationCount:number; selectedCount:number; subtotalLabel:string; budgetRemainingLabel:string; warnings:string[]; quickActions:string[]; }
export function makeShoppingStudioVM(room:DemoRetailRoom,recommendations:RetailProduct[],selected:RetailProduct[]):ShoppingStudioViewModel { const subtotal=selected.reduce((s,p)=>s+p.price.amount,0); return {roomName:room.name,budgetLabel:money(room.budget.totalBudget),styleLabel:room.style,paletteLabel:room.paletteId,recommendationCount:recommendations.length,selectedCount:selected.length,subtotalLabel:money(subtotal),budgetRemainingLabel:money(room.budget.totalBudget-subtotal),warnings:['Live availability is not guaranteed by demo snapshot.'],quickActions:['Try in room','Cheaper alternative','Smaller alternative','Change style','Change palette','Save room set']}; }
