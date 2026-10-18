/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

import { scoreRetailStyle } from '../matching/retail-style-filter-engine';

export interface LookComposerV2 { style:StyleName; paletteId:string; hero:RetailProduct|null; supporting:RetailProduct[]; accents:string[]; copy:string; }
export function composeLook(style:StyleName,paletteId:string,products:RetailProduct[],budget:number):LookComposerV2{const eligible=products.filter(p=>p.price.amount<=budget).sort((a,b)=>scoreRetailStyle(b,style).score-scoreRetailStyle(a,style).score);const hero=eligible[0]??null;const supporting=eligible.slice(1,5);const accents=style==='industrial'?['charcoal','black','cognac']:style==='scandinavian'?['sage','oat','light wood']:style==='minimalist'?['white','soft gray','black']:['warm white','oak','deep green'];return{style,paletteId,hero,supporting,accents,copy:`A ${style} look anchored by ${hero?.name??'a hero piece'}, supported by ${supporting.length} buyable companions and ${accents.join(', ')} accents.`};}
