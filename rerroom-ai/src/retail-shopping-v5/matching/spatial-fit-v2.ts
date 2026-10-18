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


export interface SpatialFitInput {
  product: RetailProduct;
  slot: FurnitureSlot;
  room: RoomEnvelope;
  safetyMarginCm?: number;
  allowTightFit?: boolean;
}
export interface SpatialFitResult {
  state: 'fits' | 'tight' | 'too-large' | 'blocked';
  score: number;
  clearanceCm: number;
  widthPenalty: number;
  depthPenalty: number;
  reasons: string[];
}

function extentAfterRotation(width: number, depth: number, rotationDeg: number): { width:number; depth:number } {
  const r = Math.abs(((rotationDeg % 180) + 180) % 180);
  const quarter = r > 45 && r < 135;
  return quarter ? { width: depth, depth: width } : { width, depth };
}

function slotEnvelope(slot: FurnitureSlot): { width:number; depth:number; rotation:number } {
  return { width: Math.max(0.01, slot.bbox.width), depth: Math.max(0.01, slot.bbox.height), rotation: slot.bbox.rotationDeg };
}

export function evaluateSpatialFit(input: SpatialFitInput): SpatialFitResult {
  const margin = input.safetyMarginCm ?? 8;
  const product = input.product;
  const slot = slotEnvelope(input.slot);
  const rotated = extentAfterRotation(product.dimensions.width, product.dimensions.depth, slot.rotation);
  const availableWidth = Math.max(0, slot.width * 100 - margin * 2);
  const availableDepth = Math.max(0, slot.depth * 100 - margin * 2);
  const widthRatio = rotated.width / Math.max(1, availableWidth);
  const depthRatio = rotated.depth / Math.max(1, availableDepth);
  const widthPenalty = Math.max(0, widthRatio - 1);
  const depthPenalty = Math.max(0, depthRatio - 1);
  const minClearance = Math.min(availableWidth - rotated.width, availableDepth - rotated.depth);
  const reasons: string[] = [];
  if (availableWidth <= 0 || availableDepth <= 0) reasons.push('Slot has no usable footprint.');
  if (widthPenalty > 0) reasons.push(`Needs ${Math.round(rotated.width - availableWidth)} cm more width.`);
  if (depthPenalty > 0) reasons.push(`Needs ${Math.round(rotated.depth - availableDepth)} cm more depth.`);
  if (product.requiresWallAnchor) reasons.push('Requires wall anchoring review.');

  if (widthPenalty > 0 || depthPenalty > 0) return { state: 'too-large', score: 0, clearanceCm: minClearance, widthPenalty, depthPenalty, reasons };
  if (minClearance < 0) return { state: 'blocked', score: 0.05, clearanceCm: minClearance, widthPenalty, depthPenalty, reasons: ['Clearance is obstructed.'] };
  const score = clamp(minClearance / Math.max(20, input.room.circulationTargetCm), 0.2, 1);
  const state = score < 0.45 ? 'tight' : 'fits';
  if (state === 'tight' && !input.allowTightFit) reasons.push('Tight fit excluded by policy.');
  return { state, score, clearanceCm: minClearance, widthPenalty, depthPenalty, reasons };
}

export function spatialFitLabel(result: SpatialFitResult): string {
  if (result.state === 'fits') return `${Math.round(result.clearanceCm)} cm clear`;
  if (result.state === 'tight') return `Tight · ${Math.round(result.clearanceCm)} cm clear`;
  if (result.state === 'blocked') return 'Blocked';
  return 'Too large';
}

export function rankSpatialFits(items: RetailProduct[], slot: FurnitureSlot, room: RoomEnvelope): Array<{ item:RetailProduct; fit:SpatialFitResult }> {
  return items
    .map((item) => ({ item, fit: evaluateSpatialFit({ product:item, slot, room }) }))
    .filter((entry) => entry.fit.state !== 'too-large' && entry.fit.state !== 'blocked')
    .sort((a,b) => b.fit.score - a.fit.score);
}
