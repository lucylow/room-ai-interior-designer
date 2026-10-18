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


import type { BudgetScenarioV2 } from '../budget/budget-scenarios-v2';
import { DEMO_BUDGET_SCENARIOS } from '../budget/budget-scenarios-v2';

export interface DemoRetailRoom { id:string; name:string; room:RoomEnvelope; slots:FurnitureSlot[]; style:StyleName; paletteId:string; budget:BudgetScenarioV2; existingProductIds:string[]; prompts:string[]; }
const livingRoom:RoomEnvelope={id:'demo-living-01',name:'Maple Loft Living Room',roomType:'living',width:5.4,depth:4.3,height:2.7,usableAreaM2:23.22,doorwayClearanceCm:90,circulationTargetCm:85,fixedObstacles:[]};
const bedroom:RoomEnvelope={id:'demo-bedroom-01',name:'North Bedroom',roomType:'bedroom',width:4.2,depth:3.7,height:2.55,usableAreaM2:15.54,doorwayClearanceCm:90,circulationTargetCm:75,fixedObstacles:[]};
const sofaSlot:FurnitureSlot={id:'slot-sofa',role:'sofa',anchorId:'cad-wall-west',bbox:{x:1.0,y:1.0,width:2.7,height:.9,rotationDeg:0}};
const loungeSlot:FurnitureSlot={id:'slot-lounge',role:'accent seating',anchorId:'cad-window-north',bbox:{x:3.6,y:1.2,width:1.3,height:1.0,rotationDeg:0}};
const tableSlot:FurnitureSlot={id:'slot-table',role:'coffee table',anchorId:'cad-center',bbox:{x:2.1,y:2.0,width:1.4,height:1.0,rotationDeg:0}};
const storageSlot:FurnitureSlot={id:'slot-storage',role:'storage',anchorId:'cad-wall-east',bbox:{x:4.2,y:.7,width:.9,height:2.1,rotationDeg:0}};
export const DEMO_RETAIL_ROOMS_V2:DemoRetailRoom[]=[
  {id:'demo-living-modern',name:'Modern Maple Loft',room:livingRoom,slots:[sofaSlot,loungeSlot,tableSlot,storageSlot],style:'modern',paletteId:'modern-neutral',budget:DEMO_BUDGET_SCENARIOS[1],existingProductIds:['ikea-lack-side-table'],prompts:['Try a real buyable sofa under $800','Make it warmer','Try a black coffee table','Add more storage without narrowing the walkway']},
  {id:'demo-living-scandi',name:'Scandinavian Family Living',room:livingRoom,slots:[sofaSlot,loungeSlot,tableSlot,storageSlot],style:'scandinavian',paletteId:'scandi-light',budget:DEMO_BUDGET_SCENARIOS[3],existingProductIds:['ikea-poang-armchair'],prompts:['Build a calm Scandinavian room under $1000','Swap the accent chair for something smaller','Use more light wood']},
  {id:'demo-bedroom-oak',name:'Oak Bedroom',room:bedroom,slots:[{id:'slot-bed',role:'bed',anchorId:'cad-wall-south',bbox:{x:.8,y:.8,width:2.1,height:1.0,rotationDeg:0}},{id:'slot-nightstand',role:'nightstand',anchorId:'cad-bed-side',bbox:{x:3.1,y:.9,width:.55,height:.55,rotationDeg:0}},{id:'slot-dresser',role:'dresser',anchorId:'cad-wall-east',bbox:{x:3.2,y:2.1,width:1.5,height:.6,rotationDeg:0}}],style:'scandinavian',paletteId:'warm-neutral',budget:DEMO_BUDGET_SCENARIOS[4],existingProductIds:['ikea-storklinta-nightstand'],prompts:['Build a warm oak bedroom','Find the best affordable nightstand','Keep the CAD bed anchor fixed']},
];
