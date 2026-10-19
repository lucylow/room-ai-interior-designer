/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface FacetQueryV2 { room?:RoomType; style?:StyleName; paletteId?:string; categories?:ProductCategory[]; maxPrice?:number; maxWidth?:number; maxDepth?:number; color?:string; material?:string; sort?:'relevance'|'price-low'|'price-high'|'size-small'|'rating'; }
export function applyFacetQuery(products:RetailProduct[],q:FacetQueryV2):RetailProduct[]{const out=products.filter(p=>!q.room||p.roomTypes.includes(q.room)).filter(p=>!q.style||p.styles.includes(q.style)).filter(p=>!q.categories?.length||q.categories.includes(p.category)).filter(p=>q.maxPrice===undefined||p.price.amount<=q.maxPrice).filter(p=>q.maxWidth===undefined||p.dimensions.width<=q.maxWidth).filter(p=>q.maxDepth===undefined||p.dimensions.depth<=q.maxDepth).filter(p=>!q.color||p.colors.some(c=>text(c).includes(text(q.color!)))).filter(p=>!q.material||p.materials.some(m=>text(m).includes(text(q.material!))));
 switch(q.sort){case'price-low':return out.sort((a,b)=>a.price.amount-b.price.amount);case'price-high':return out.sort((a,b)=>b.price.amount-a.price.amount);case'size-small':return out.sort((a,b)=>(a.dimensions.width*a.dimensions.depth)-(b.dimensions.width*b.dimensions.depth));case'rating':return out.sort((a,b)=>(b.rating??0)-(a.rating??0));default:return out;}
}
