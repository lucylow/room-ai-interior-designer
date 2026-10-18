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


import type { BudgetScenarioV2, BudgetForecast } from './budget-scenarios-v2';
import { canAffordHardCap, forecastBudget } from './budget-scenarios-v2';

export interface ShoppingChoice { slotId: string; product: RetailProduct; quantity: number; priority: number; }
export interface OptimizedChoice extends ShoppingChoice { lineTotal: number; score: number; }
export interface HardCapOptimization { choices: OptimizedChoice[]; skipped: Array<{ slotId:string; reason:string }>; merchandise: number; forecast: BudgetForecast; }

function usefulness(product: RetailProduct, priority: number): number {
  const durability = product.materials.some((m) => /solid|metal|oak|birch/.test(m)) ? .12 : 0;
  const flexible = product.tags.some((t) => /compact|modular|multi|storage|matching/.test(t)) ? .08 : 0;
  return priority + durability + flexible;
}

export function optimizeUnderHardCap(choices: ShoppingChoice[], scenario: BudgetScenarioV2): HardCapOptimization {
  const ordered = [...choices].sort((a,b) => usefulness(b.product, b.priority) - usefulness(a.product, a.priority));
  const accepted: OptimizedChoice[] = [];
  const skipped: Array<{slotId:string;reason:string}> = [];
  let merchandise = 0;
  for (const choice of ordered) {
    const lineTotal = choice.product.price.amount * choice.quantity;
    const proposed = merchandise + lineTotal;
    if (canAffordHardCap(scenario, proposed)) {
      const score = usefulness(choice.product, choice.priority) / Math.max(1, lineTotal);
      accepted.push({ ...choice, lineTotal, score });
      merchandise = proposed;
    } else {
      skipped.push({ slotId:choice.slotId, reason:`Skipped ${choice.product.name}: hard budget cap would be exceeded.` });
    }
  }
  const forecast = forecastBudget(scenario, merchandise);
  return { choices:accepted, skipped, merchandise, forecast };
}

export function cheapestCandidatePerSlot(candidates: Record<string, RetailProduct[]>): ShoppingChoice[] {
  return Object.entries(candidates).flatMap(([slotId, products]) => {
    const product = [...products].sort((a,b) => a.price.amount - b.price.amount)[0];
    return product ? [{ slotId, product, quantity:1, priority:1 }] : [];
  });
}

export function maximizeCoverageUnderCap(candidates: Record<string, RetailProduct[]>, scenario: BudgetScenarioV2): HardCapOptimization {
  const choices = cheapestCandidatePerSlot(candidates).map((choice, index) => ({ ...choice, priority: 1 + (candidates[choice.slotId]?.length ?? 0) / 10 + index / 100 }));
  return optimizeUnderHardCap(choices, scenario);
}
