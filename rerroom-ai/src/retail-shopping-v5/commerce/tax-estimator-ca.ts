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


export interface TaxProfile { jurisdiction:'ON'|'BC'|'AB'|'QC'|'NS'|'MB'|'SK'|'NB'|'NL'|'PE'|'YT'|'NT'|'NU'; rate:number; label:string; }
export const DEMO_TAX_PROFILES:TaxProfile[] = [
  { jurisdiction:'ON', rate:.13, label:'Ontario HST demo assumption' },
  { jurisdiction:'BC', rate:.12, label:'BC mixed-tax demo assumption' },
  { jurisdiction:'AB', rate:.05, label:'Alberta GST demo assumption' },
  { jurisdiction:'QC', rate:.14975, label:'Quebec combined demo assumption' },
];
export function taxFor(jurisdiction:TaxProfile['jurisdiction'], subtotal:number):number { return subtotal * (DEMO_TAX_PROFILES.find(p=>p.jurisdiction===jurisdiction)?.rate ?? .13); }
export function taxLabel(jurisdiction:TaxProfile['jurisdiction']):string { return DEMO_TAX_PROFILES.find(p=>p.jurisdiction===jurisdiction)?.label ?? 'Demo tax assumption'; }
