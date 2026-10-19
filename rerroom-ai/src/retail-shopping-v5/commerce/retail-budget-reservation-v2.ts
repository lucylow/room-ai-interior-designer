/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type {   RetailerId } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface BudgetReservationV2 { id:string; roomId:string; amount:number; purpose:string; expiresAt:string; status:'reserved'|'released'|'consumed'; }
export class BudgetReservationStoreV2 {private reservations=new Map<string,BudgetReservationV2>(); reserve(roomId:string,amount:number,purpose:string,ttlMinutes=60){const now=Date.now();const reservation={id:id('budget-reservation',`${roomId}:${purpose}:${now}`),roomId,amount,purpose,expiresAt:new Date(now+ttlMinutes*60000).toISOString(),status:'reserved' as const};this.reservations.set(reservation.id,reservation);return reservation;} get(idValue:string){return this.reservations.get(idValue);} release(idValue:string){const r=this.reservations.get(idValue);if(!r)return; r.status='released';} consume(idValue:string){const r=this.reservations.get(idValue);if(!r)return; r.status='consumed';} activeForRoom(roomId:string){return [...this.reservations.values()].filter(r=>r.roomId===roomId&&r.status==='reserved'&&Date.parse(r.expiresAt)>Date.now());} totalReserved(roomId:string){return this.activeForRoom(roomId).reduce((s,r)=>s+r.amount,0);} }
