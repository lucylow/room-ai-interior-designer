/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface NextBuyAction { productId:string; priority:number; reason:string; budgetImpact:number; }
export function whatToBuyNext(products:RetailProduct[],selected:RetailProduct[],budget:number):NextBuyAction[]{const selectedIds=new Set(selected.map(p=>p.id));return products.filter(p=>!selectedIds.has(p.id)).map((p,i)=>({productId:p.id,priority:clamp((1-i*.03)+(p.price.amount<=budget?.15:-.1)),reason:p.price.amount<=budget?'Within current budget headroom':'Would require budget revision',budgetImpact:p.price.amount})).sort((a,b)=>b.priority-a.priority).slice(0,10);}
