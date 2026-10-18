/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

import { scoreRetailStyle } from '../matching/retail-style-filter-engine';

export interface BudgetEfficiency { productId:string; costPerStylePoint:number; costPerFitPoint:number; efficiency:number; explanation:string; }
export function calculateBudgetEfficiency(products:RetailProduct[],style:StyleName):BudgetEfficiency[]{return products.map(p=>{const styleScore=scoreRetailStyle(p,style).score;const fit=1;const efficiency=(styleScore*.65+fit*.35)/Math.max(1,p.price.amount);return{productId:p.id,costPerStylePoint:p.price.amount/Math.max(.01,styleScore),costPerFitPoint:p.price.amount,efficiency,explanation:`${Math.round(styleScore*100)}% style score at ${money(p.price.amount)}.`}}).sort((a,b)=>b.efficiency-a.efficiency);}
