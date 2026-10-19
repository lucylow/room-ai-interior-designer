/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  RetailProduct,
  FurnitureSlot,
  RoomEnvelope,
  ScenePatch,
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


import { evaluateSpatialFit } from '../matching/spatial-fit-v2';

export interface ProductPlacementV2 { id:string; productId:string; slotId:string; x:number; y:number; rotationDeg:number; fit:'good'|'tight'|'blocked'; note:string; }
export interface PlacementBoardV2 { roomId:string; revisionId:string; placements:ProductPlacementV2[]; selectedProductId?:string; }

export function tryProductInRoom(product: RetailProduct, slot:FurnitureSlot, room:RoomEnvelope, revisionId:string): ProductPlacementV2 {
  const fit = evaluateSpatialFit({ product, slot, room, allowTightFit:true });
  const note = fit.state === 'fits' ? `Placed with ${Math.round(fit.clearanceCm)} cm minimum clearance.` : fit.state === 'tight' ? `Placed as a tight-fit experiment; review circulation.` : fit.state === 'blocked' ? 'Placement blocked by clearance.' : 'Product footprint exceeds slot.';
  return { id:stableId('placement', `${revisionId}:${slot.id}:${product.id}`), productId:product.id, slotId:slot.id, x:slot.bbox.x, y:slot.bbox.y, rotationDeg:slot.bbox.rotationDeg, fit:fit.state === 'fits' ? 'good' : fit.state === 'tight' ? 'tight' : 'blocked', note };
}

export function movePlacement(placement:ProductPlacementV2, deltaX:number, deltaY:number):ProductPlacementV2 {
  return { ...placement, x:placement.x + deltaX, y:placement.y + deltaY };
}

export function rotatePlacement(placement:ProductPlacementV2, deltaDeg:number):ProductPlacementV2 {
  return { ...placement, rotationDeg:((placement.rotationDeg + deltaDeg) % 360 + 360) % 360 };
}

export function buildScenePatchForPlacement(placement:ProductPlacementV2, product:RetailProduct): ScenePatch {
  return { id:stableId('patch', placement.id), action:'replace', slotId:placement.slotId, productId:product.id, bbox:{ x:placement.x, y:placement.y, width:product.dimensions.width/100, height:product.dimensions.depth/100, rotationDeg:placement.rotationDeg }, reversible:true, source:'shopping-ai' };
}

export function placementBoardSummary(board:PlacementBoardV2, products:RetailProduct[]):string[] {
  return board.placements.map((placement) => {
    const item = products.find((product) => product.id === placement.productId);
    return `${item?.name ?? placement.productId}: ${placement.fit} · (${placement.x.toFixed(2)}, ${placement.y.toFixed(2)}) · ${Math.round(placement.rotationDeg)}°`;
  });
}
