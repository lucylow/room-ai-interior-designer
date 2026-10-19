/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface ShoppingRevisionBranch { id:string; parentId?:string; title:string; prompt:string; style:StyleName; paletteId:string; productIds:string[]; budget:number; createdAt:string; }
export function branchShoppingRevision(parentId:string|undefined,title:string,prompt:string,style:StyleName,paletteId:string,products:RetailProduct[],budget:number):ShoppingRevisionBranch{return{id:id('branch',`${title}:${Date.now()}`),parentId,title,prompt,style,paletteId,productIds:products.map(p=>p.id),budget,createdAt:new Date().toISOString()};}
export function branchDiff(a:ShoppingRevisionBranch,b:ShoppingRevisionBranch){return{added:b.productIds.filter(id=>!a.productIds.includes(id)),removed:a.productIds.filter(id=>!b.productIds.includes(id)),styleChanged:a.style!==b.style,paletteChanged:a.paletteId!==b.paletteId,budgetDelta:b.budget-a.budget};}
