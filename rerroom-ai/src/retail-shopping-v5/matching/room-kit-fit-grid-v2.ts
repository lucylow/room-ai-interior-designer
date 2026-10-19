/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, StyleName, FurnitureSlot, RoomEnvelope } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

import { evaluateSpatialFit, spatialFitLabel } from './spatial-fit-v2';
import { scoreRetailStyle } from './retail-style-filter-engine';

export interface SlotProductMatrix { slotId:string; rows:Array<{productId:string;fit:number;style:number;price:number;overall:number;label:string}>; }
export function buildSlotProductMatrix(products:RetailProduct[],room:RoomEnvelope,slots:FurnitureSlot[],style:StyleName,budget:number):SlotProductMatrix[]{return slots.map(slot=>({slotId:slot.id,rows:products.map(p=>{const fit=evaluateSpatialFit({product:p,slot,room,allowTightFit:true});const styleScore=scoreRetailStyle(p,style).score;const priceScore=p.price.amount<=budget?.1:0;const overall=clamp(fit.score*.45+styleScore*.4+priceScore);return{productId:p.id,fit:fit.score,style:styleScore,price:priceScore,overall,label:spatialFitLabel(fit)}}).sort((a,b)=>b.overall-a.overall).slice(0,12)}));}
