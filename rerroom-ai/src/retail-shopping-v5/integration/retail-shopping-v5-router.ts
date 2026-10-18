/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory, FurnitureSlot, RoomEnvelope, RetailerId } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RetailRouteV2 { path:string; label:string; purpose:string; }
export const RETAIL_ROUTES_V2:RetailRouteV2[]=[
{path:'/shop',label:'Shop',purpose:'Buyable catalog discovery'},
{path:'/shop/room-set',label:'Room set',purpose:'Whole-room package generation'},
{path:'/shop/product/:productId',label:'Product',purpose:'Product details and try-in-room'},
{path:'/shop/compare',label:'Compare',purpose:'Side-by-side product experiments'},
{path:'/shop/cart',label:'Cart',purpose:'Budget-aware shopping cart'},
{path:'/shop/saved',label:'Saved',purpose:'Saved concepts and room sets'},
{path:'/shop/procurement',label:'Procurement',purpose:'Client-approved purchasing handoff'},
];
