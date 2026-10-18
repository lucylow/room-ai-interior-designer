/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

import type { Bundle } from '../../retail-shopping-v4/domain/commerce-types';

export interface RoomSetCardV2 { id:string; title:string; style:string; palette:string; subtotal:string; productCount:number; actions:string[]; }
export function roomSetCardV2(set:Bundle):RoomSetCardV2{return{id:set.id,title:set.title,style:set.style,palette:'selected palette',subtotal:money(set.subtotal),productCount:set.productIds.length,actions:['Try whole set','View in 2D','View in 3D','Edit set','Save']};}
