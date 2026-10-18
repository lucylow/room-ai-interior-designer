/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface RetailFacetIndex { styles:Map<StyleName,string[]>; categories:Map<ProductCategory,string[]>; rooms:Map<RoomType,string[]>; colors:Map<string,string[]>; materials:Map<string,string[]>; priceBuckets:Map<string,string[]>; }
export function buildRetailFacetIndex(products:RetailProduct[]=IKEA_CA_V5_CATALOG):RetailFacetIndex{
 const styles=new Map<StyleName,string[]>(),categories=new Map<ProductCategory,string[]>(),rooms=new Map<RoomType,string[]>(),colors=new Map<string,string[]>(),materials=new Map<string,string[]>(),priceBuckets=new Map<string,string[]>();
 const add=(m:Map<any,string[]>,k:any,v:string)=>m.set(k,[...(m.get(k)??[]),v]);
 for(const p of products){for(const s of p.styles)add(styles,s,p.id);add(categories,p.category,p.id);for(const r of p.roomTypes)add(rooms,r,p.id);for(const c of p.colors)add(colors,text(c),p.id);for(const m of p.materials)add(materials,text(m),p.id);const bucket=p.price.amount<75?'0-75':p.price.amount<150?'75-150':p.price.amount<300?'150-300':p.price.amount<500?'300-500':'500+';add(priceBuckets,bucket,p.id);}
 return {styles,categories,rooms,colors,materials,priceBuckets};
}
export function intersectFacet(index:RetailFacetIndex,keys:Array<[Map<any,string[]>,any]>):string[]{let result:string[]|undefined;for(const [map,key] of keys){const values=map.get(key)??[];result=result===undefined?[...values]:result.filter(id=>values.includes(id));}return result??[];}
export function facetCounts(index:RetailFacetIndex, products=IKEA_CA_V5_CATALOG){return {styles:Object.fromEntries([...index.styles].map(([k,v])=>[k,v.length])),categories:Object.fromEntries([...index.categories].map(([k,v])=>[k,v.length])),rooms:Object.fromEntries([...index.rooms].map(([k,v])=>[k,v.length])),prices:Object.fromEntries([...index.priceBuckets].map(([k,v])=>[k,v.length]))};}
