/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface RetailTrendInsight { label:string; value:number; narrative:string; }
export function retailTrendInsights(products:RetailProduct[]):RetailTrendInsight[]{const average=products.reduce((s,p)=>s+p.price.amount,0)/Math.max(1,products.length);const storage=products.filter(p=>p.category==='storage').length;const seating=products.filter(p=>p.category==='seating').length;return[{label:'Average snapshot price',value:average,narrative:`Average catalog snapshot price is ${money(average)}.`},{label:'Storage share',value:storage/Math.max(1,products.length),narrative:`${storage} of ${products.length} items are storage-oriented.`},{label:'Seating share',value:seating/Math.max(1,products.length),narrative:`${seating} of ${products.length} items are seating-oriented.`}];}
