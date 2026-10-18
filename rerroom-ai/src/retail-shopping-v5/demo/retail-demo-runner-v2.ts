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


import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
import type { DemoRetailRoom } from './retail-demo-room-data-v2';
import type { DemoShoppingScenarioV2 } from './retail-demo-scenarios-v2';
import { DEMO_RETAIL_ROOMS_V2 } from './retail-demo-room-data-v2';
import { DEMO_SHOPPING_SCENARIOS_V2 } from './retail-demo-scenarios-v2';
import { parseShoppingIntent } from '../ai/shopping-intent-parser-v2';
import { executeRetailQuery, normalizeRetailQuery } from '../search/retail-query-dsl';
import { filterByStyle } from '../matching/retail-style-filter-engine';
import { filterByPalette } from '../matching/palette-retail-fit-v2';

export interface DemoRunV2 { scenarioId:string; query:string[]; selected:string[]; subtotal:number; warnings:string[]; explanation:string[]; }

export function runRetailDemoV2(scenarioId:string):DemoRunV2 {
  const scenario=DEMO_SHOPPING_SCENARIOS_V2.find(s=>s.id===scenarioId) ?? DEMO_SHOPPING_SCENARIOS_V2[0];
  const room=DEMO_RETAIL_ROOMS_V2.find(r=>r.id===scenario.roomId) ?? DEMO_RETAIL_ROOMS_V2[0];
  const intent=parseShoppingIntent(scenario.prompt);
  const style=intent.style ?? room.style;
  const palette=intent.paletteId ?? room.paletteId;
  const budget=intent.maxBudget ?? scenario.maxBudget;
  const candidates=executeRetailQuery(IKEA_CA_V5_CATALOG,{room:room.room.roomType,styles:[style],maxPrice:budget,limit:20});
  const ranked=filterByPalette(filterByStyle(candidates,style,.30),palette,.30).slice(0,8);
  const chosen=ranked.slice(0,Math.min(room.slots.length,3));
  const subtotal=chosen.reduce((sum,p)=>sum+p.price.amount,0);
  const warnings=chosen.some(p=>p.availability==='unknown')?['Live availability is not verified in the snapshot.']:[];
  if(subtotal>budget) warnings.push('Demo safety: selected subtotal exceeded requested merchandise budget; choose hard-cap optimizer for purchase planning.');
  return {scenarioId,query:[`room=${room.room.roomType}`,`style=${style}`,`palette=${palette}`,`budget=${money(budget)}`],selected:chosen.map(p=>p.name),subtotal, warnings, explanation:chosen.map(p=>`${p.name} · ${money(p.price.amount)} · ${p.styles.join('/')}`)};
}
