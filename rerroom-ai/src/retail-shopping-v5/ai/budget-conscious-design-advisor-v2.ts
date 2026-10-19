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


export interface BudgetAdviceV2 { summary:string; actions:string[]; protectedCategories:string[]; cutCandidates:string[]; }
export function adviseBudget(products:RetailProduct[],budget:number):BudgetAdviceV2 { const subtotal=products.reduce((s,p)=>s+p.price.amount,0); const actions:string[]=[]; const protectedCategories=products.slice().sort((a,b)=>b.price.amount-a.price.amount).slice(0,2).map(p=>p.category); const cutCandidates=products.slice().sort((a,b)=>a.price.amount-b.price.amount).slice(0,4).map(p=>p.name); if(subtotal<=budget){actions.push(`There is ${money(budget-subtotal)} of merchandise headroom.`);}else{actions.push(`Reduce ${money(subtotal-budget)} before checkout.`);actions.push('Use substitution candidates instead of rebuilding the concept.');} return {summary:`${money(subtotal)} selected against ${money(budget)} merchandise budget.`,actions,protectedCategories,cutCandidates}; }
