/** RE:ROOM AI Retail Shopping Studio V5 — final commerce module. */
import type {   StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RetailShoppingEventV5 { name:'search'|'filter'|'try-in-room'|'swap'|'compare'|'budget-change'|'save-set'|'cart-add'|'approval'; roomId:string; productId?:string; metadata:Record<string,string|number|boolean>; timestamp:string; }
export function makeRetailEvent(name:RetailShoppingEventV5['name'],roomId:string,metadata:RetailShoppingEventV5['metadata']={},productId?:string):RetailShoppingEventV5{return{name,roomId,productId,metadata,timestamp:new Date().toISOString()};}
export function eventNarrative(event:RetailShoppingEventV5):string{return`${event.name} in ${event.roomId}${event.productId?` for ${event.productId}`:''}.`;}
