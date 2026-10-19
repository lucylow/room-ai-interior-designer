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


export interface RevisionSuggestionV2 { id:string; label:string; prompt:string; expectedEffect:string; risk:'low'|'medium'; }
export const RETAIL_REVISION_SUGGESTIONS_V2:RevisionSuggestionV2[]=[
{id:'rev-warmer',label:'Warm it up',prompt:'Make the furniture palette warmer without changing the room layout.',expectedEffect:'Shift wood, textile and accent cues warmer.',risk:'low'},
{id:'rev-smaller',label:'Make it smaller',prompt:'Swap oversized buyable pieces for compact alternatives while preserving style.',expectedEffect:'Improve circulation and reduce footprint.',risk:'low'},
{id:'rev-cheaper',label:'Lower the total',prompt:'Replace selected products with cheaper buyable alternatives while preserving style.',expectedEffect:'Reduce merchandise cost without rebuilding the concept.',risk:'low'},
{id:'rev-industrial',label:'Push industrial',prompt:'Swap selected pieces toward black metal and darker wood.',expectedEffect:'Increase industrial character.',risk:'medium'},
{id:'rev-scandi',label:'Push Scandinavian',prompt:'Use lighter woods, softer seating and cleaner forms.',expectedEffect:'Increase Scandinavian cues.',risk:'low'},
{id:'rev-storage',label:'Add storage',prompt:'Add buyable storage without violating the main circulation path.',expectedEffect:'Increase organization and function.',risk:'medium'},
];
