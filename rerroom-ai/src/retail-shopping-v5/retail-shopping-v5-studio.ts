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
  StyleName,
} from '../retail-shopping-v4/domain/commerce-types';

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


import type { DemoRetailRoom } from './demo/retail-demo-room-data-v2';
import type { ShoppingIntentV2 } from './ai/shopping-intent-parser-v2';
import type { RankedBuyable } from './ranking/buyable-ensemble-ranker-v2';
import type { ShoppingExplanation } from './ai/shopping-explanation-engine-v2';
import type { RevisionSuggestionV2 } from './ai/retail-revision-suggestion-engine-v2';
import type { RetailConceptComposerResult } from './ai/retail-concept-composer-v2';
import type { ShoppingProvenanceV2 } from './project/design-to-shop-provenance-v2';
import { parseShoppingIntent } from './ai/shopping-intent-parser-v2';
import { normalizeRetailQuery, executeRetailQuery, querySummary } from './search/retail-query-dsl';
import { rankBuyables } from './ranking/buyable-ensemble-ranker-v2';
import { diversifyRoomKit } from './ranking/room-kit-diversifier-v2';
import { optimizeUnderHardCap } from './budget/hard-cap-optimizer';
import { explainBuyableChoice } from './ai/shopping-explanation-engine-v2';
import { makeShoppingProvenance } from './project/design-to-shop-provenance-v2';
import { composeRetailConcept } from './ai/retail-concept-composer-v2';
import { RETAIL_REVISION_SUGGESTIONS_V2 } from './ai/retail-revision-suggestion-engine-v2';
import { demoBudgetReport } from './demo/demo-budget-report-v2';

import { IKEA_CA_V5_CATALOG } from './catalog/ikea-ca-current-snapshot';
import type { RetailQueryDsl } from './search/retail-query-dsl';

export interface RetailShoppingV5Request { room:DemoRetailRoom; prompt:string; budget:number; style?:StyleName; paletteId?:string; preferRetailer?:RetailerId; }
export interface RetailShoppingV5Result { intent:ShoppingIntentV2; queryPlan:string[]; ranked:RankedBuyable[]; selected:RetailProduct[]; budgetReport:ReturnType<typeof demoBudgetReport>; explanations:ShoppingExplanation[]; concept:RetailConceptComposerResult; revisionOptions:RevisionSuggestionV2[]; provenance:ShoppingProvenanceV2[]; }

export function runRetailShoppingV5(request:RetailShoppingV5Request, catalog=IKEA_CA_V5_CATALOG):RetailShoppingV5Result {
  const intent=parseShoppingIntent(request.prompt);
  const style=request.style ?? intent.style ?? request.room.style;
  const palette=request.paletteId ?? intent.paletteId ?? request.room.paletteId;
  const query:RetailQueryDsl={room:request.room.room.roomType,styles:[style],maxPrice:request.budget,categories:request.room.slots.map(slot=>slot.role==='bed'?'bed':slot.role==='storage'?'storage':slot.role.includes('table')?'tables':'seating') as ProductCategory[],retailer:request.preferRetailer,limit:40};
  const plan=normalizeRetailQuery(query);
  const candidates=executeRetailQuery(catalog,query);
  const rankedAll=request.room.slots.flatMap((slot)=>rankBuyables(candidates,{style,paletteId:palette,budget:request.budget,room:request.room.room,slot,userPreferredRetailer:request.preferRetailer}));
  const dedup=[...new Map(rankedAll.map(r=>[r.product.id,r])).values()].sort((a,b)=>b.score-a.score);
  const selected=diversifyRoomKit(dedup.map(r=>r.product),Math.min(6,request.room.slots.length));
  const hard=optimizeUnderHardCap(selected.map((product,index)=>({slotId:request.room.slots[index]?.id ?? `slot-${index}`,product,quantity:1,priority:1-index*.05})),request.room.budget);
  const finalProducts=hard.choices.map(c=>c.product);
  const explanations=finalProducts.map((product,_index)=>explainBuyableChoice(product,style,palette,request.budget,rankedAll.find(r=>r.product.id===product.id)?.score??.5));
  const provenance=finalProducts.map((product,index)=>makeShoppingProvenance(product,'concept-v5',style,palette,request.room.slots[index] ?? request.room.slots[0],`cad-anchor-${index+1}`));
  const concept=composeRetailConcept({room:request.room.room.roomType,style,paletteId:palette,budget:request.budget,vibe:'buyable design studio',productIds:finalProducts.map(p=>p.id)},catalog);
  return {intent,queryPlan:querySummary(plan),ranked:rankedAll,selected:finalProducts,budgetReport:demoBudgetReport(finalProducts,request.budget),explanations,concept,revisionOptions:RETAIL_REVISION_SUGGESTIONS_V2.slice(0,6),provenance};
}
