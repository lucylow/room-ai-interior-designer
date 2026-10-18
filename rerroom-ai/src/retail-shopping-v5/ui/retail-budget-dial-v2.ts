/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface BudgetDialV2 { total:number; spent:number; remaining:number; percent:number; state:'safe'|'near-cap'|'over'; label:string; }
export function budgetDialV2(total:number,spent:number):BudgetDialV2{const percent=spent/Math.max(1,total);return{total,spent,remaining:total-spent,percent,state:percent>1?'over':percent>.88?'near-cap':'safe',label:`${money(spent)} of ${money(total)}`};}
