/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory, FurnitureSlot, RoomEnvelope, RetailerId } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RetailerComparisonV2 { productId:string; offers:Array<{retailer:RetailerId;price:number;availability:string;purchaseUrl:string;score:number}>; bestSnapshot?:{retailer:RetailerId;price:number}; }
export function compareRetailerOffers(productId:string,offers:RetailerComparisonV2['offers']):RetailerComparisonV2{const sorted=[...offers].sort((a,b)=>a.price-b.price);return{productId,offers:sorted,bestSnapshot:sorted[0]?{retailer:sorted[0].retailer,price:sorted[0].price}:undefined};}
