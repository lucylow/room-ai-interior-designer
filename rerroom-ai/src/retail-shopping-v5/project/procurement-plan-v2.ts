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


export interface ProcurementLineV2 { productId:string; quantity:number; phase:'now'|'later'|'optional'; targetPrice:number; currentPrice:number; notes:string[]; }
export interface ProcurementPlanV2 { roomId:string; lines:ProcurementLineV2[]; totalCurrent:number; totalTarget:number; phases:Record<string,number>; }
export function makeProcurementPlan(roomId:string,products:RetailProduct[],budget:number):ProcurementPlanV2 { const lines=products.map((p,i)=>({productId:p.id,quantity:1,phase:(i<2?'now':i<4?'later':'optional') as 'now'|'later'|'optional',targetPrice:Math.min(p.price.amount,budget/Math.max(1,products.length)),currentPrice:p.price.amount,notes:p.availability==='unknown'?['Revalidate availability']:[]})); return {roomId,lines,totalCurrent:products.reduce((s,p)=>s+p.price.amount,0),totalTarget:lines.reduce((s,l)=>s+l.targetPrice,0),phases:{now:lines.filter(l=>l.phase==='now').reduce((s,l)=>s+l.currentPrice,0),later:lines.filter(l=>l.phase==='later').reduce((s,l)=>s+l.currentPrice,0),optional:lines.filter(l=>l.phase==='optional').reduce((s,l)=>s+l.currentPrice,0)}}; }
