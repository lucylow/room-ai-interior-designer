/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory, FurnitureSlot, RoomEnvelope, RetailerId } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface ShoppingTimelineEventV2 { id:string; roomId:string; type:'concept-created'|'product-added'|'product-swapped'|'budget-changed'|'approval'|'checkout-recheck'; timestamp:string; summary:string; }
export class ShoppingTimelineV2 {private events:ShoppingTimelineEventV2[]=[];push(roomId:string,type:ShoppingTimelineEventV2['type'],summary:string){const event={id:id('timeline',`${roomId}:${type}:${this.events.length}`),roomId,type,timestamp:new Date().toISOString(),summary};this.events.push(event);return event;}list(roomId:string){return this.events.filter(e=>e.roomId===roomId);}latest(roomId:string){return [...this.list(roomId)].pop();}}
