import { RetailProduct, RoomEnvelope, DesignIntent, Budget, ShoppingConstraints, FurnitureSlot } from '../domain/commerce-types';
import { runRetailDesignStudio, RetailStudioResult } from './retail-design-studio';

export interface SimulationCase { name: string; style: string; budget: number; query?: string; }
export interface SimulationOutcome extends SimulationCase { result: RetailStudioResult; deltaFromBudget: number; budgetPass: boolean; }

export function simulateRetailConcept(products: RetailProduct[], room: RoomEnvelope, baseIntent: DesignIntent, constraints: ShoppingConstraints, slots: FurnitureSlot[], scenarios: SimulationCase[]): SimulationOutcome[] {
  return scenarios.map(scenario => {
    const intent: DesignIntent = { ...baseIntent, style: scenario.style, secondaryStyles: [baseIntent.style, ...baseIntent.secondaryStyles].filter(Boolean).slice(0, 3) };
    const budget: Budget = { total: scenario.budget, committed: 0, reserved: 0, shippingAllowance: 0, taxRate: 0.13, assemblyAllowance: 0, currency: 'CAD', hardCap: true };
    const result = runRetailDesignStudio(products, { room, intent, budget, constraints, slots, query: scenario.query, maxPerSlot: 3 });
    return { ...scenario, result, deltaFromBudget: Number((scenario.budget - result.projectedSpend).toFixed(2)), budgetPass: result.projectedSpend <= scenario.budget };
  });
}

export function bestBudgetPass(outcomes: SimulationOutcome[]) { return outcomes.filter(o => o.budgetPass).sort((a,b) => b.result.metrics.styleCoverage - a.result.metrics.styleCoverage || b.result.remainingBudget - a.result.remainingBudget)[0]; }
export function scenarioSummary(outcomes: SimulationOutcome[]) { return outcomes.map(o => ({ name: o.name, style: o.style, budget: o.budget, projectedSpend: o.result.projectedSpend, remaining: o.result.remainingBudget, budgetPass: o.budgetPass, selected: o.result.metrics.selectedProducts })); }
