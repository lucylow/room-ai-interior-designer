import { IKEA_CANADA_SNAPSHOT } from '../catalog/ikea-ca-snapshot';
import { ROOM, INTENT, BUDGET, CONSTRAINTS, SLOTS } from './mock-room';
import { runRetailDesignStudio } from '../engine/retail-design-studio';
import { simulateRetailConcept, scenarioSummary } from '../engine/retail-shopping-simulator';

const result = runRetailDesignStudio(IKEA_CANADA_SNAPSHOT, {
  room: ROOM, intent: INTENT, budget: BUDGET, constraints: CONSTRAINTS, slots: SLOTS,
  query: 'buyable Scandinavian furniture for a compact living room', maxPerSlot: 3,
});

const scenarios = simulateRetailConcept(IKEA_CANADA_SNAPSHOT, ROOM, INTENT, CONSTRAINTS, SLOTS, [
  { name: 'Lean demo', style: 'minimalist', budget: 750 },
  { name: 'Scandinavian target', style: 'scandinavian', budget: 1500 },
  { name: 'Industrial branch', style: 'industrial', budget: 1800 },
]);

console.log(JSON.stringify({
  demo: 'RE:ROOM Buyable Shopping Studio',
  snapshotProducts: IKEA_CANADA_SNAPSHOT.length,
  result: { projectedSpend: result.projectedSpend, remainingBudget: result.remainingBudget, selectedProducts: result.metrics.selectedProducts, styleCoverage: result.metrics.styleCoverage, buyableCoverage: result.metrics.buyableCoverage, slots: result.slots.map(slot => ({ slotId: slot.slotId, primary: slot.primary?.name, alternatives: slot.alternatives.map(p => p.name) })) },
  scenarios: scenarioSummary(scenarios),
  note: 'Retail data is a checked snapshot/demo layer; production price, inventory, taxes, delivery, images and checkout must come from an authorized live retailer integration.',
}, null, 2));
