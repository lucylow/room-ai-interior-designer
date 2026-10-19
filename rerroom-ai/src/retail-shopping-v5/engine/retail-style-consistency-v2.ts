/** RE:ROOM AI Retail Shopping Studio V5 — final workflow module. */
import type { RetailProduct, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface StyleConsistencyV2 { style:StyleName; score:number; consistency:number; deviations:string[]; }
export function evaluateStyleConsistency(products:RetailProduct[],style:StyleName):StyleConsistencyV2{const deviations=products.filter(p=>!p.styles.includes(style)).map(p=>p.name);const consistency=products.length?products.filter(p=>p.styles.includes(style)).length/products.length:1;return{style,score:clamp(.4+consistency*.6),consistency,deviations};}
export function styleConsistencyNote(result:StyleConsistencyV2):string{return result.deviations.length?`${Math.round(result.consistency*100)}% of selected products carry the target style. Review ${result.deviations.length} bridge pieces.`:`All selected products align with ${result.style}.`;}
