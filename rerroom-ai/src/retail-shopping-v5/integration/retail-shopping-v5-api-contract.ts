/** RE:ROOM AI Retail Shopping Studio V5 — final workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import type { RetailerId } from '../../retail-shopping-v4/domain/commerce-types';

export interface RetailShoppingApiV5Request { roomId:string; prompt:string; style?:StyleName; paletteId?:string; budget:number; retailer?:RetailerId; mode:'demo'|'live'; }
export interface RetailShoppingApiV5Response { requestId:string; products:RetailProduct[]; subtotal:number; budget:number; warnings:string[]; mode:'demo'|'live'; }
export const RETAIL_SHOPPING_V5_API={search:'/api/retail/search',recommend:'/api/retail/recommend',tryInRoom:'/api/retail/try-in-room',roomSet:'/api/retail/room-set',cart:'/api/retail/cart',validate:'/api/retail/validate-checkout'} as const;
export function validateApiRequest(req:RetailShoppingApiV5Request):string[]{const errors:string[]=[];if(!req.roomId.trim())errors.push('roomId required');if(!req.prompt.trim())errors.push('prompt required');if(req.budget<0)errors.push('budget must be non-negative');if(req.mode==='live'&&!req.retailer)errors.push('live requests need a retailer adapter');return errors;}
