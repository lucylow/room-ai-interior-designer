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


import type { RetailQueryDsl } from '../search/retail-query-dsl';

export interface RetailerAdapterV2 {
  id:RetailerId;
  displayName:string;
  capabilities: { catalog:boolean; livePrice:boolean; liveAvailability:boolean; purchaseLink:boolean; cartHandoff:boolean; roomPlanner:boolean };
  search(query:RetailQueryDsl):Promise<RetailerResult>;
}

export class RetailerAdapterRegistryV2 {
  private adapters = new Map<RetailerId, RetailerAdapterV2>();
  register(adapter:RetailerAdapterV2):void { this.adapters.set(adapter.id, adapter); }
  get(id:RetailerId):RetailerAdapterV2|undefined { return this.adapters.get(id); }
  list():RetailerAdapterV2[] { return [...this.adapters.values()]; }
  async searchAll(query:RetailQueryDsl):Promise<RetailerResult[]> {
    const results:RetailerResult[] = [];
    for (const adapter of this.adapters.values()) results.push(await adapter.search(query));
    return results;
  }
}
