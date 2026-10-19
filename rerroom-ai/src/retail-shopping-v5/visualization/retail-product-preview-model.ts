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


export interface RetailPreviewModel { productId:string; worldWidthM:number; worldDepthM:number; worldHeightM:number; materialTokens:string[]; displayName:string; previewMode:'wireframe'|'proxy'|'asset'; }
export function toRetailPreview(product:RetailProduct, mode:RetailPreviewModel['previewMode']='proxy'):RetailPreviewModel { return { productId:product.id, worldWidthM:product.dimensions.width/100, worldDepthM:product.dimensions.depth/100, worldHeightM:product.dimensions.height/100, materialTokens:[...product.materials,...product.colors], displayName:product.name, previewMode:mode }; }
export function previewFootprint(preview:RetailPreviewModel):string { return `${preview.worldWidthM.toFixed(2)} × ${preview.worldDepthM.toFixed(2)} m`; }
export function comparePreviews(a:RetailPreviewModel,b:RetailPreviewModel):string[] { return [`Width delta ${(a.worldWidthM-b.worldWidthM).toFixed(2)} m`,`Depth delta ${(a.worldDepthM-b.worldDepthM).toFixed(2)} m`,`Height delta ${(a.worldHeightM-b.worldHeightM).toFixed(2)} m`]; }
