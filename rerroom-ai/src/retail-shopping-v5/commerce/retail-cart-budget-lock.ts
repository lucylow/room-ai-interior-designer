/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface CartBudgetLock { budget:number; locked:boolean; lockedAt?:string; reason?:string; }
export function createBudgetLock(budget:number):CartBudgetLock{return{budget,locked:false};}
export function lockBudget(lock:CartBudgetLock,reason='Client approved budget'):CartBudgetLock{return{...lock,locked:true,lockedAt:new Date().toISOString(),reason};}
export function canMutateCart(lock:CartBudgetLock,nextTotal:number):{allowed:boolean;message:string}{if(!lock.locked)return{allowed:true,message:'Budget lock disabled.'};return nextTotal<=lock.budget?{allowed:true,message:'Within locked budget.'}:{allowed:false,message:`Budget lock prevents ${money(nextTotal-lock.budget)} of additional spend.`};}
