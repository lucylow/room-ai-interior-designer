/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory, FurnitureSlot, RoomEnvelope, RetailerId } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import type { CartLine } from '../../retail-shopping-v4/domain/commerce-types';

export interface RetailCartSnapshotV2 { id:string; roomId:string; lineIds:string[]; subtotal:number; createdAt:string; notes:string[]; }
export function snapshotCart(roomId:string,lines:CartLine[]):RetailCartSnapshotV2{return{id:id('cart-snapshot',`${roomId}:${Date.now()}`),roomId,lineIds:lines.map(l=>l.id),subtotal:lines.reduce((s,l)=>s+l.estimatedTotal,0),createdAt:new Date().toISOString(),notes:['Snapshot for design-session history','Retail prices must be revalidated before purchase']};}
