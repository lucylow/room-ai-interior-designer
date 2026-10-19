/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  RetailProduct,
  RoomType,
  StyleName,
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


import { scoreRetailStyle } from '../matching/retail-style-filter-engine';
import { scorePalette } from '../matching/palette-retail-fit-v2';

export interface RoomSetPrompt { room:RoomType; style:StyleName; palette:string; budget:number; mustHave:string[]; avoid:string[]; }
export interface RoomSetResult { id:string; prompt:RoomSetPrompt; products:RetailProduct[]; subtotal:number; notes:string[]; }
export function generateRoomSet(products:RetailProduct[], prompt:RoomSetPrompt):RoomSetResult {
  const eligible=products.filter(p=>p.roomTypes.includes(prompt.room)).filter(p=>scoreRetailStyle(p,prompt.style).score>.35).filter(p=>scorePalette(p,prompt.palette).score>.35).filter(p=>!prompt.avoid.some(a=>normalizeText(p.name).includes(normalizeText(a))));
  const priorities=['sofa','bed','seating','tables','storage','lighting','rug']; const chosen:RetailProduct[]=[]; let subtotal=0;
  for(const category of priorities){ const candidate=eligible.filter(p=>p.category===category).sort((a,b)=>scoreRetailStyle(b,prompt.style).score-scoreRetailStyle(a,prompt.style).score || a.price.amount-b.price.amount).find(p=>subtotal+p.price.amount<=prompt.budget); if(candidate){ chosen.push(candidate); subtotal+=candidate.price.amount; }}
  const notes=[`Generated ${chosen.length} buyable candidates under a ${money(prompt.budget)} merchandise budget.`];
  if(!chosen.some(p=>p.category==='storage')) notes.push('Storage was not found within the remaining budget.');
  return { id:stableId('roomset',`${prompt.room}:${prompt.style}:${prompt.palette}:${prompt.budget}`),prompt,products:chosen,subtotal,notes };
}
