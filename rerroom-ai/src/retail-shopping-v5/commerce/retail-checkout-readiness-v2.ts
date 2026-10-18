/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface CheckoutReadiness { ready:boolean; score:number; blockers:string[]; checks:string[]; }
export function checkoutReadiness(products:RetailProduct[],cartBudget:number):CheckoutReadiness{const blockers:string[]=[];const checks:string[]=[];if(!products.length)blockers.push('No selected products.');if(products.some(p=>p.availability==='unknown'||p.availability==='demo'))blockers.push('One or more products require live availability revalidation.');const subtotal=products.reduce((s,p)=>s+p.price.amount,0);checks.push(`Snapshot subtotal ${money(subtotal)}.`);checks.push(subtotal<=cartBudget?'Budget check passed.':'Budget check failed.');if(subtotal>cartBudget)blockers.push(`Merchandise exceeds budget by ${money(subtotal-cartBudget)}.`);const score=clamp(1-blockers.length*.22);return{ready:blockers.length===0,score,blockers,checks};}
