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


import { evaluateSpatialFit, spatialFitLabel } from '../matching/spatial-fit-v2';
import { scoreRetailStyle } from '../matching/retail-style-filter-engine';
import { scorePalette } from '../matching/palette-retail-fit-v2';
import { scoreRoomRole } from '../matching/room-role-fit-v2';

export interface BuyableRankingContext { style:StyleName; paletteId:string; budget:number; room:RoomEnvelope; slot:FurnitureSlot; userPreferredRetailer?:RetailerId; }
export interface RankedBuyable { product:RetailProduct; score:number; fit:string; reasons:string[]; warnings:string[]; }
export function rankBuyables(products:RetailProduct[],ctx:BuyableRankingContext):RankedBuyable[]{return products.map(product=>{const fit=evaluateSpatialFit({product,slot:ctx.slot,room:ctx.room,allowTightFit:false}); const style=scoreRetailStyle(product,ctx.style); const palette=scorePalette(product,ctx.paletteId); const role=scoreRoomRole(product,ctx.slot.role); const price=product.price.amount<=ctx.budget?1:0; const retailer=ctx.userPreferredRetailer&&product.retailer===ctx.userPreferredRetailer?.07:0; const score=clamp(fit.score*.32+style.score*.24+palette.score*.16+role.score*.12+price*.12+retailer); const reasons=[`Spatial ${Math.round(fit.score*100)}%`,`Style ${Math.round(style.score*100)}%`,`Palette ${Math.round(palette.score*100)}%`,`Role ${Math.round(role.score*100)}%`]; const warnings=[...fit.reasons,...palette.paletteRisk]; if(product.availability==='unknown') warnings.push('Recheck live retailer availability.'); return {product,score,fit:spatialFitLabel(fit),reasons,warnings};}).filter(x=>x.score>.05).sort((a,b)=>b.score-a.score);}
