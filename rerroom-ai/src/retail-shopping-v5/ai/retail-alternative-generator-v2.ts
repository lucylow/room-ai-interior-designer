/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

import { scoreRetailStyle } from '../matching/retail-style-filter-engine';

export interface AlternativeRequestV2 { product:RetailProduct; products:RetailProduct[]; style:StyleName; budget:number; mode:'cheaper'|'smaller'|'different'; }
export interface AlternativeResultV2 { alternatives:RetailProduct[]; explanation:string[]; }
export function generateAlternativesV2(req:AlternativeRequestV2):AlternativeResultV2{let candidates=req.products.filter(p=>p.category===req.product.category).filter(p=>p.id!==req.product.id).filter(p=>p.styles.includes(req.style));if(req.mode==='cheaper')candidates=candidates.filter(p=>p.price.amount<req.product.price.amount);if(req.mode==='smaller')candidates=candidates.filter(p=>p.dimensions.width<req.product.dimensions.width&&p.dimensions.depth<=req.product.dimensions.depth);if(req.mode==='different')candidates=candidates.sort((a,b)=>scoreRetailStyle(b,req.style).score-scoreRetailStyle(a,req.style).score);candidates=candidates.filter(p=>p.price.amount<=req.budget).slice(0,8);return{alternatives:candidates,explanation:candidates.map(p=>`${p.name}: ${money(p.price.amount)} · ${p.dimensions.width}×${p.dimensions.depth} cm · ${req.mode} option.`)};}
