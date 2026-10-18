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


import { IKEA_CA_V5_CATALOG, snapshotDisclaimer } from '../catalog/ikea-ca-current-snapshot';

import type { RetailQueryDsl } from '../search/retail-query-dsl';
import { normalizeRetailQuery, executeRetailQuery } from '../search/retail-query-dsl';

import type { RetailerAdapterV2 } from './retailer-adapter-registry';

export class IkeaCanadaSnapshotAdapterV5 implements RetailerAdapterV2 {
  readonly id:RetailerId = 'ikea-ca';
  readonly displayName = 'IKEA Canada';
  readonly capabilities = { catalog:true, livePrice:false, liveAvailability:false, purchaseLink:true, cartHandoff:false, roomPlanner:true };
  async search(query:RetailQueryDsl):Promise<RetailerResult> {
    const plan = normalizeRetailQuery(query);
    const products = executeRetailQuery(IKEA_CA_V5_CATALOG, plan.normalized);
    return { products, source:'snapshot', retrievedAt:V5_SNAPSHOT, warning:snapshotDisclaimer() };
  }
}
