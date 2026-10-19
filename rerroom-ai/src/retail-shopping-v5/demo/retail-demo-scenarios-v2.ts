/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  
  
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


export interface DemoShoppingScenarioV2 { id:string; roomId:string; title:string; prompt:string; maxBudget:number; expectedBehavior:string[]; }
export const DEMO_SHOPPING_SCENARIOS_V2:DemoShoppingScenarioV2[]=[
  {id:'demo-01',roomId:'demo-living-scandi',title:'Scandi $1K room',prompt:'Build a calm Scandinavian room under $1,000 with light wood and compact seating.',maxBudget:1000,expectedBehavior:['style-filter=scandinavian','palette=scandi-light','hard-cap=true','try-in-room=true']},
  {id:'demo-02',roomId:'demo-living-modern',title:'Modern $750 refresh',prompt:'Try a modern living room refresh under $750 with a coffee table and storage.',maxBudget:750,expectedBehavior:['style-filter=modern','budget-cap=750','leave-unfilled-if-needed=true']},
  {id:'demo-03',roomId:'demo-bedroom-oak',title:'Oak bedroom swap',prompt:'Make the bedroom warmer, use more oak, and replace the nightstand with a buyable option.',maxBudget:1200,expectedBehavior:['palette=warm-neutral','swap-existing-product=true','anchor-preserved=true']},
  {id:'demo-04',roomId:'demo-living-modern',title:'Industrial branch',prompt:'Create an industrial branch with darker furniture and metal accents.',maxBudget:1500,expectedBehavior:['style-filter=industrial','palette=industrial-graphite','revision-branch=true']},
  {id:'demo-05',roomId:'demo-living-scandi',title:'Cheaper revision',prompt:'Keep the Scandinavian concept but make every selected product cheaper where possible.',maxBudget:1000,expectedBehavior:['revision-token=cheaper','substitution-engine=true']},
];
