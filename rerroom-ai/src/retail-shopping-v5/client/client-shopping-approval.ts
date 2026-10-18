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


export interface ClientShoppingApproval { id:string; projectId:string; revisionId:string; selectedProductIds:string[]; total: number; budget:number; status:'draft'|'approved'|'changes-requested'; clientComment?:string; approvedAt?:string; }
export function createClientApproval(projectId:string,revisionId:string,products:RetailProduct[],budget:number):ClientShoppingApproval { return { id:stableId('approval',`${projectId}:${revisionId}`),projectId,revisionId,selectedProductIds:products.map(p=>p.id),total:products.reduce((s,p)=>s+p.price.amount,0),budget,status:'draft' }; }
export function approveShopping(approval:ClientShoppingApproval,comment?:string):ClientShoppingApproval { return {...approval,status:'approved',clientComment:comment,approvedAt:new Date().toISOString()}; }
export function requestChanges(approval:ClientShoppingApproval,comment:string):ClientShoppingApproval { return {...approval,status:'changes-requested',clientComment:comment}; }
export function approvalSummary(approval:ClientShoppingApproval):string[] { return [`Status: ${approval.status}`,`Merchandise: ${money(approval.total)}`,`Budget: ${money(approval.budget)}`,`Headroom: ${money(approval.budget-approval.total)}`]; }
