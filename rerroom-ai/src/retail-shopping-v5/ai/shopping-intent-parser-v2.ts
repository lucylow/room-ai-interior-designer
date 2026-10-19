/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  
  
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


export interface ShoppingIntentV2 { room?:RoomType; style?:StyleName; paletteId?:string; maxBudget?:number; maxWidth?:number; maxDepth?:number; roles:string[]; keywords:string[]; revisionTokens:string[]; }
const styles:StyleName[]=['modern','minimalist','scandinavian','industrial','japandi','mid-century','bohemian','organic-modern','contemporary'];
const paletteHints:Record<string,string>={warm:'warm-neutral',sage:'organic-sage',graphite:'industrial-graphite',scandi:'scandi-light',neutral:'modern-neutral'};
export function parseShoppingIntent(prompt:string):ShoppingIntentV2 {
  const text=normalizeText(prompt); const roles:string[]=[]; const keywords:string[]=[]; const revisionTokens:string[]=[];
  for(const role of ['sofa','seating','table','storage','bed','nightstand','desk','rug','lighting','dresser']) if(text.includes(role)) roles.push(role);
  const style=styles.find(s=>text.includes(normalizeText(s)));
  let paletteId:string|undefined; for(const [hint,id] of Object.entries(paletteHints)) if(text.includes(hint)) paletteId=id;
  const amount=text.match(/\$\s*(\d+(?:\.\d+)?)/); const maxBudget=amount ? Number(amount[1]) : undefined;
  const cm=text.match(/(\d+(?:\.\d+)?)\s*cm/); const maxWidth=cm ? Number(cm[1]) : undefined;
  for(const token of ['warmer','brighter','darker','cozier','minimal','industrial','scandinavian','swap','replace','cheaper','smaller','larger']) if(text.includes(token)) revisionTokens.push(token);
  keywords.push(...text.split(' ').filter(w=>w.length>3).slice(0,12));
  return { room:text.includes('bedroom')?'bedroom':text.includes('office')?'office':text.includes('dining')?'dining':text.includes('studio')?'studio':'living', style, paletteId, maxBudget, maxWidth, roles:[...new Set(roles)], keywords:[...new Set(keywords)], revisionTokens:[...new Set(revisionTokens)] };
}
