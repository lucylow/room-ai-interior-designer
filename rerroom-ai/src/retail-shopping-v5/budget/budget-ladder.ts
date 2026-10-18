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


export interface BudgetLadderStep { tier:'essential'|'balanced'|'upgrade'; budget:number; productIds:string[]; rationale:string[]; }

export function makeBudgetLadder(products: RetailProduct[], budget: number): BudgetLadderStep[] {
  const sorted = [...products].sort((a,b) => a.price.amount - b.price.amount);
  const low = sorted.filter((p) => p.price.amount <= budget * .28).slice(0, 4);
  const mid = sorted.filter((p) => p.price.amount <= budget * .55).slice(-4);
  const high = sorted.filter((p) => p.price.amount <= budget * .9).slice(-4);
  return [
    { tier:'essential', budget:budget*.45, productIds:low.map(p => p.id), rationale:['Low entry spend','Leaves room for decor or later upgrades','Good for demo concepts'] },
    { tier:'balanced', budget:budget*.70, productIds:mid.map(p => p.id), rationale:['Balances style and price','Suitable for complete room refreshes'] },
    { tier:'upgrade', budget:budget*.92, productIds:high.map(p => p.id), rationale:['Higher visual impact','Uses more of the available budget','Suitable for hero-piece upgrades'] },
  ];
}

export function compareBudgetLadders(steps: BudgetLadderStep[]): string[] {
  return steps.map((step) => `${step.tier}: ${money(step.budget)} · ${step.productIds.length} candidates · ${step.rationale[0]}`);
}
