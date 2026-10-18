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


import { scoreRetailStyle } from '../matching/retail-style-filter-engine';
import { scorePalette } from '../matching/palette-retail-fit-v2';

export interface StyleSetRequest { style: StyleName; paletteId:string; room:RoomType; budget:number; categories:ProductCategory[]; maxPerCategory?:number; }
export interface BuyableStyleSet { id:string; title:string; style:StyleName; paletteId:string; room:RoomType; productIds:string[]; subtotal:number; remaining:number; creativeNote:string; }

export function buildBuyableStyleSets(items: RetailProduct[], request: StyleSetRequest): BuyableStyleSet[] {
  const categoryCap = request.maxPerCategory ?? 2;
  const compatible = items.filter((item) => item.roomTypes.includes(request.room) && request.categories.includes(item.category));
  const byCategory = new Map<ProductCategory, RetailProduct[]>();
  for (const item of compatible) {
    const score = scoreRetailStyle(item, request.style).score + scorePalette(item, request.paletteId).score;
    const list = byCategory.get(item.category) ?? [];
    list.push({ ...item, tags:[...item.tags, `style-score:${score.toFixed(2)}`] });
    byCategory.set(item.category, list);
  }
  const picks:RetailProduct[] = [];
  for (const category of request.categories) {
    const candidates = [...(byCategory.get(category) ?? [])].sort((a,b) => b.tags.join(' ').localeCompare(a.tags.join(' ')) || a.price.amount - b.price.amount).slice(0, categoryCap);
    if (candidates[0]) picks.push(candidates[0]);
  }
  const subtotal = picks.reduce((sum, item) => sum + item.price.amount, 0);
  return [{ id:stableId('set', `${request.style}:${request.paletteId}:${request.room}:${subtotal}`), title:`${request.style} ${request.paletteId.replaceAll('-',' ')} set`, style:request.style, paletteId:request.paletteId, room:request.room, productIds:picks.map(p=>p.id), subtotal, remaining:request.budget-subtotal, creativeNote:`A ${request.style} ${request.room} kit using a ${request.paletteId.replaceAll('-',' ')} palette.` }];
}
