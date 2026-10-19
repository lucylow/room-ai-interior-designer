/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  RetailProduct,
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


export interface StyleFilter { style: StyleName; includeKeywords: string[]; excludeKeywords: string[]; preferredMaterials: string[]; preferredColors: string[]; }
export interface StyleFilterResult { productId:string; score:number; hits:string[]; misses:string[]; }

export const RETAIL_STYLE_FILTERS: StyleFilter[] = [
  { style:'modern', includeKeywords:['clean','sleek','contemporary','glass','metal'], excludeKeywords:['ornate','rustic'], preferredMaterials:['metal','glass','oak'], preferredColors:['black','white','beige','charcoal'] },
  { style:'minimalist', includeKeywords:['simple','low-profile','compact','clean','modular'], excludeKeywords:['ornate','distressed'], preferredMaterials:['fiberboard','particleboard','metal'], preferredColors:['white','black','neutral'] },
  { style:'scandinavian', includeKeywords:['nordic','warm','light','soft','curved'], excludeKeywords:['ornate','heavy'], preferredMaterials:['birch','oak','pine','fabric'], preferredColors:['white','oak','beige','sage'] },
  { style:'industrial', includeKeywords:['metal','black','glass','workshop','loft'], excludeKeywords:['shabby-chic','ornate'], preferredMaterials:['metal','glass','wood'], preferredColors:['black','charcoal','wood','gold'] },
  { style:'japandi', includeKeywords:['natural','low-profile','quiet','wood','simple'], excludeKeywords:['glossy','ornate'], preferredMaterials:['oak','birch','wood','fabric'], preferredColors:['sand','beige','black','warm-white'] },
];

export function findStyleFilter(style: StyleName): StyleFilter {
  return RETAIL_STYLE_FILTERS.find((filter) => filter.style === style) ?? RETAIL_STYLE_FILTERS[0];
}

export function scoreRetailStyle(item: RetailProduct, style: StyleName): StyleFilterResult {
  const filter = findStyleFilter(style);
  const hits: string[] = [];
  const misses: string[] = [];
  if (item.styles.includes(style)) hits.push(`Tagged ${style}`); else misses.push(`Not directly tagged ${style}`);
  for (const key of filter.includeKeywords) {
    if (normalizeText(`${item.name} ${item.tags.join(' ')} ${item.materials.join(' ')}`).includes(normalizeText(key))) hits.push(`Matches ${key}`);
  }
  for (const key of filter.excludeKeywords) {
    if (normalizeText(`${item.name} ${item.tags.join(' ')}`).includes(normalizeText(key))) misses.push(`Contains excluded cue ${key}`);
  }
  for (const material of filter.preferredMaterials) if (item.materials.some((value) => value.includes(material))) hits.push(`Material ${material}`);
  for (const color of filter.preferredColors) if (item.colors.some((value) => normalizeText(value).includes(normalizeText(color)))) hits.push(`Colour ${color}`);
  const raw = (item.styles.includes(style) ? .45 : 0) + Math.min(.28, hits.length * .035) - Math.min(.25, misses.length * .05);
  return { productId:item.id, score:clamp(raw), hits, misses };
}

export function filterByStyle(items: RetailProduct[], style: StyleName, minScore = .35): RetailProduct[] {
  return items.filter((item) => scoreRetailStyle(item, style).score >= minScore).sort((a,b) => scoreRetailStyle(b, style).score - scoreRetailStyle(a, style).score);
}
