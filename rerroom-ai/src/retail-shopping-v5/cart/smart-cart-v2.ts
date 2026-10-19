/**
 * RE:ROOM AI Retail Shopping Studio V5
 * Demo-first commerce intelligence.
 *
 * Design rule: catalog facts are snapshots; spatial dimensions come from the
 * underlying CAD/BIM scene; shopping suggestions are reversible overlays.
 */

import type {
  RetailProduct,
  ShoppingCart,
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


export interface SmartCartSummary { subtotal:number; tax:number; shipping:number; total:number; itemCount:number; budgetRemaining:number; warnings:string[]; }
export interface SmartCartState { cart:ShoppingCart; selectedRoomId:string; lastAction:string; }

export class SmartCartV2 {
  private state:SmartCartState;
  constructor(roomId:string) {
    const now = new Date().toISOString();
    this.state = { cart:{ id:stableId('cart',roomId), roomId, currency:'CAD', lines:[], createdAt:now, updatedAt:now }, selectedRoomId:roomId, lastAction:'created' };
  }
  snapshot():ShoppingCart { return JSON.parse(JSON.stringify(this.state.cart)) as ShoppingCart; }
  add(product:RetailProduct, quantity=1):ShoppingCart { const existing = this.state.cart.lines.find(line=>line.productId===product.id); if(existing) existing.quantity += quantity; else this.state.cart.lines.push({ id:stableId('line',`${this.state.cart.id}:${product.id}`), productId:product.id, quantity, unitPrice:product.price.amount, estimatedTotal:product.price.amount*quantity, addedAt:new Date().toISOString() }); this.recalculate(); this.state.lastAction='added'; return this.snapshot(); }
  remove(productId:string):ShoppingCart { this.state.cart.lines = this.state.cart.lines.filter(line=>line.productId!==productId); this.recalculate(); this.state.lastAction='removed'; return this.snapshot(); }
  setQuantity(productId:string, quantity:number):ShoppingCart { const line=this.state.cart.lines.find(l=>l.productId===productId); if(line) line.quantity=Math.max(1,Math.floor(quantity)); this.recalculate(); this.state.lastAction='quantity-updated'; return this.snapshot(); }
  private recalculate():void { this.state.cart.lines=this.state.cart.lines.map(line=>({...line,estimatedTotal:line.unitPrice*line.quantity})); this.state.cart.updatedAt=new Date().toISOString(); }
  summary(budget=Infinity, taxRate=.13, shipping=0):SmartCartSummary { const subtotal=this.state.cart.lines.reduce((s,l)=>s+l.estimatedTotal,0); const tax=subtotal*taxRate; const total=subtotal+tax+shipping; const warnings:string[]=[]; if(total>budget) warnings.push(`Cart exceeds budget by ${money(total-budget)}.`); if(!this.state.cart.lines.length) warnings.push('Cart is empty.'); return { subtotal,tax,shipping,total,itemCount:this.state.cart.lines.reduce((s,l)=>s+l.quantity,0),budgetRemaining:budget-total,warnings }; }
}
