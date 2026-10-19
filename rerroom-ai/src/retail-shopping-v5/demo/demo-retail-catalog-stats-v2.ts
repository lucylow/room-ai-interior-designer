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


import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
export function retailCatalogStatsV2(products=IKEA_CA_V5_CATALOG){ return {count:products.length,byCategory:Object.fromEntries([...new Set(products.map(p=>p.category))].map(c=>[c,products.filter(p=>p.category===c).length])),byStyle:Object.fromEntries([...new Set(products.flatMap(p=>p.styles))].map(s=>[s,products.filter(p=>p.styles.includes(s)).length])),price:{min:Math.min(...products.map(p=>p.price.amount)),max:Math.max(...products.map(p=>p.price.amount)),average:products.reduce((s,p)=>s+p.price.amount,0)/Math.max(1,products.length)}}; }
