/** RE:ROOM AI Retail Shopping Studio V5 — final commerce module. */
import type { RetailProduct } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface ParetoProductV2 { product:RetailProduct; styleScore:number; fitScore:number; price:number; }
export function paretoFrontV2(items:ParetoProductV2[]):ParetoProductV2[]{return items.filter((candidate,i)=>!items.some((other,j)=>{if(i===j)return false;const noWorse=other.styleScore>=candidate.styleScore&&other.fitScore>=candidate.fitScore&&other.price<=candidate.price;const better=other.styleScore>candidate.styleScore||other.fitScore>candidate.fitScore||other.price<candidate.price;return noWorse&&better;}));}
export function paretoSummary(items:ParetoProductV2[]):string[]{return items.map(x=>`${x.product.name}: style ${Math.round(x.styleScore*100)}%, fit ${Math.round(x.fitScore*100)}%, ${money(x.price)}`);}
