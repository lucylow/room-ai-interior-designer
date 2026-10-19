/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface OrderSplitV2 { group:string; productIds:string[]; subtotal:number; rationale:string; }
export function splitOrder(products:RetailProduct[]):OrderSplitV2[]{const groups=new Map<string,RetailProduct[]>();for(const p of products){const g=p.category==='bed'||p.category==='storage'?'large-or-storage':p.category==='seating'?'upholstery-or-seating':'small-goods';groups.set(g,[...(groups.get(g)??[]),p]);}return[...groups].map(([group,items])=>({group,productIds:items.map(p=>p.id),subtotal:items.reduce((s,p)=>s+p.price.amount,0),rationale:group==='large-or-storage'?'May have different delivery/assembly constraints':'May be suitable for consolidated small-item handling.'}));}
