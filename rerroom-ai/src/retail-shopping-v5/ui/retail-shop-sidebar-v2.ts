/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type {   StyleName } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface ShopSidebarV2 { title:string; filters:string[]; sections:string[]; primaryActions:string[]; footer:string[]; }
export function shopSidebarV2(style:StyleName,budget:number):ShopSidebarV2{return{title:'Shop the room',filters:[`Style: ${style}`,`Budget: ${money(budget)}`,'Room','Category','Colour','Material','Size'],sections:['Recommended','Alternatives','Room sets','Saved','Cart'],primaryActions:['Try in room','Swap','Compare','Save room set','Add to cart'],footer:['Snapshot products may need live verification.','CAD/BIM dimensions remain authoritative.']};}
