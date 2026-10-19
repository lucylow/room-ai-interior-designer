/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type {   StyleName } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface DemoProductExampleV2 { name:string; price:number; style:StyleName; role:string; headline:string; }
export const DEMO_PRODUCT_LIBRARY_V2:DemoProductExampleV2[] = [
 ...IKEA_CA_V5_CATALOG.map(p=>({name:p.name,price:p.price.amount,style:p.styles[0]??'modern',role:p.category,headline:`Try ${p.name} in the room.`})),
];
export function demoProductRowsV2(limit=30){return DEMO_PRODUCT_LIBRARY_V2.slice(0,limit);}
