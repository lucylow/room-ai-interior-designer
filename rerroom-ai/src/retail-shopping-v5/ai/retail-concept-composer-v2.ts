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


import { findPalette } from '../matching/palette-retail-fit-v2';

export interface RetailConceptComposerRequest { room:RoomType; style:StyleName; paletteId:string; budget:number; vibe:string; productIds:string[]; }
export interface RetailConceptComposerResult { title:string; story:string; moodWords:string[]; spatialNotes:string[]; shoppingNotes:string[]; }
export function composeRetailConcept(request:RetailConceptComposerRequest,products:RetailProduct[]):RetailConceptComposerResult { const palette=findPalette(request.paletteId); const chosen=products.filter(p=>request.productIds.includes(p.id)); const lead=chosen[0]?.name ?? 'selected furniture'; const story=`A ${request.style} ${request.room} built around ${lead}, using ${palette.label.toLowerCase()} cues while respecting a ${money(request.budget)} merchandise ceiling.`; return {title:`${request.style} ${palette.label} concept`,story,moodWords:[request.style,palette.label,request.vibe,'cohesive','buyable'],spatialNotes:chosen.slice(0,4).map(p=>`${p.name}: ${p.dimensions.width}×${p.dimensions.depth} cm footprint.`),shoppingNotes:chosen.slice(0,4).map(p=>`${p.name} · ${money(p.price.amount)} snapshot.`)}; }
