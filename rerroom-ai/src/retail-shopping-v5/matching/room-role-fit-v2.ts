/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  RetailProduct,
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


export interface RoomRoleFit { productId:string; role:string; score:number; reasons:string[]; }
const roleRules:Record<string,RegExp[]>= { sofa:[/sofa|sectional/], 'accent seating':[/chair|armchair/], 'coffee table':[/table/], storage:[/storage|dresser|bookcase|nightstand|shelf/], bed:[/^bed$/], nightstand:[/nightstand/], dresser:[/dresser/], desk:[/desk/] };
export function scoreRoomRole(product:RetailProduct,role:string):RoomRoleFit { const rules=roleRules[normalizeText(role)]??[]; const text=normalizeText(`${product.name} ${product.category} ${product.tags.join(' ')}`); const hits=rules.filter(r=>r.test(text)).length; const direct=product.category===normalizeText(role) || product.tags.some(t=>normalizeText(t).includes(normalizeText(role))); const score=clamp((direct?.6:0)+hits*.2+(product.tags.length>2?.1:0)); return {productId:product.id,role,score,reasons:[direct?'Direct role match':'Inferred role',...rules.map((r,i)=>r.test(text)?`Rule ${i+1} hit`:`Rule ${i+1} miss`)]}; }
