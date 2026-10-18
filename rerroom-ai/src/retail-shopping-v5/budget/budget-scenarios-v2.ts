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


export interface BudgetScenarioV2 {
  id: string;
  label: string;
  totalBudget: number;
  roomBudget: number;
  designTier: 'entry' | 'balanced' | 'premium';
  taxRate: number;
  shipping: number;
  assembly: number;
  notes: string[];
}
export interface BudgetForecast {
  scenarioId: string;
  merchandise: number;
  tax: number;
  shipping: number;
  assembly: number;
  total: number;
  remaining: number;
  percentUsed: number;
  status: 'comfortable' | 'near-cap' | 'over-cap';
}

export const DEMO_BUDGET_SCENARIOS: BudgetScenarioV2[] = [
  { id:'starter-750', label:'Starter refresh', totalBudget:750, roomBudget:650, designTier:'entry', taxRate:.13, shipping:39, assembly:0, notes:['Focus on hero furniture + one storage piece.'] },
  { id:'balanced-1500', label:'Balanced room', totalBudget:1500, roomBudget:1200, designTier:'balanced', taxRate:.13, shipping:79, assembly:69, notes:['Mix practical storage with one stronger focal piece.'] },
  { id:'premium-2500', label:'Premium concept', totalBudget:2500, roomBudget:2050, designTier:'premium', taxRate:.13, shipping:99, assembly:129, notes:['Allow stronger material and seating upgrades.'] },
  { id:'scandi-1000', label:'Scandinavian edit', totalBudget:1000, roomBudget:850, designTier:'balanced', taxRate:.13, shipping:49, assembly:39, notes:['Prioritize light woods, soft seating and clean storage.'] },
  { id:'industrial-1200', label:'Industrial studio', totalBudget:1200, roomBudget:1020, designTier:'balanced', taxRate:.13, shipping:69, assembly:49, notes:['Prioritize metal accents, darker anchors and compact tables.'] },
];

export function forecastBudget(scenario: BudgetScenarioV2, merchandise: number): BudgetForecast {
  const tax = merchandise * scenario.taxRate;
  const total = merchandise + tax + scenario.shipping + scenario.assembly;
  const remaining = scenario.totalBudget - total;
  const percentUsed = scenario.totalBudget > 0 ? total / scenario.totalBudget : 1;
  return { scenarioId:scenario.id, merchandise, tax, shipping:scenario.shipping, assembly:scenario.assembly, total, remaining, percentUsed, status: remaining < 0 ? 'over-cap' : percentUsed > .88 ? 'near-cap' : 'comfortable' };
}

export function splitBudget(totalBudget: number, slots: string[]): Record<string, number> {
  if (!slots.length) return {};
  const weights = slots.map((slot) => /sofa|bed/.test(normalizeText(slot)) ? 3 : /storage/.test(normalizeText(slot)) ? 1.6 : /lighting|decor/.test(normalizeText(slot)) ? .5 : 1);
  const sum = weights.reduce((a,b) => a + b, 0);
  return Object.fromEntries(slots.map((slot, index) => [slot, totalBudget * weights[index] / sum]));
}

export function canAffordHardCap(scenario: BudgetScenarioV2, merchandise: number): boolean {
  return forecastBudget(scenario, merchandise).total <= scenario.totalBudget + 0.01;
}

export function nearestAffordablePrice(scenario: BudgetScenarioV2, currentMerchandise: number, candidatePrice: number): number {
  const availableBefore = Math.max(0, scenario.totalBudget - currentMerchandise - scenario.shipping - scenario.assembly);
  const preTaxAllowance = availableBefore / (1 + scenario.taxRate);
  return Math.min(candidatePrice, preTaxAllowance);
}
