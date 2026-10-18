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


export interface PaletteProfile { id:string; label:string; base:string[]; accent:string[]; metals:string[]; woodTones:string[]; forbidden:string[]; }
export interface PaletteFitV2 { productId:string; score:number; hits:string[]; paletteRisk:string[]; }

export const RETAIL_PALETTES: PaletteProfile[] = [
  { id:'warm-neutral', label:'Warm Neutral', base:['warm-white','sand','cream'], accent:['terracotta','olive'], metals:['brass'], woodTones:['oak','walnut'], forbidden:['neon'] },
  { id:'scandi-light', label:'Scandi Light', base:['white','oat','light-gray'], accent:['sage','dusty-blue'], metals:['matte-black'], woodTones:['birch','pine','oak'], forbidden:['high-gloss-red'] },
  { id:'industrial-graphite', label:'Industrial Graphite', base:['charcoal','black','concrete'], accent:['rust','cognac'], metals:['black','brass'], woodTones:['dark-oak','walnut'], forbidden:['pastel-pink'] },
  { id:'modern-neutral', label:'Modern Neutral', base:['white','black','beige','gray'], accent:['deep-green','navy'], metals:['chrome','black'], woodTones:['oak'], forbidden:['ornate-gold'] },
  { id:'organic-sage', label:'Organic Sage', base:['cream','sand','beige'], accent:['sage','clay'], metals:['black','brass'], woodTones:['oak','pine'], forbidden:['icy-blue'] },
];

export function findPalette(id:string): PaletteProfile { return RETAIL_PALETTES.find((p) => p.id === id) ?? RETAIL_PALETTES[0]; }

export function scorePalette(item: RetailProduct, paletteId:string): PaletteFitV2 {
  const palette = findPalette(paletteId);
  const hits:string[] = [];
  const risk:string[] = [];
  const text = normalizeText([...item.colors, ...item.materials, ...item.tags].join(' '));
  for (const token of [...palette.base, ...palette.accent, ...palette.woodTones, ...palette.metals]) if (text.includes(normalizeText(token))) hits.push(`Palette cue: ${token}`);
  for (const token of palette.forbidden) if (text.includes(normalizeText(token))) risk.push(`Potential clash: ${token}`);
  const score = clamp(.35 + hits.length*.08 - risk.length*.18);
  return { productId:item.id, score, hits, paletteRisk:risk };
}

export function filterByPalette(items: RetailProduct[], paletteId:string, minScore=.45): RetailProduct[] {
  return items.filter((item) => scorePalette(item, paletteId).score >= minScore).sort((a,b) => scorePalette(b, paletteId).score - scorePalette(a, paletteId).score);
}
