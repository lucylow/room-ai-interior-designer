/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface BundleRanking { ids:string[]; subtotal:number; diversity:number; styleScore:number; affordability:number; score:number; }
export function rankBundles(products:RetailProduct[],budget:number,style:StyleName,count=4):BundleRanking[]{const ranked:BundleRanking[]=[];const top=products.filter(p=>p.styles.includes(style)).slice(0,15);for(let i=0;i<top.length;i++)for(let j=i+1;j<top.length;j++){const pair=[top[i],top[j]];const subtotal=pair.reduce((s,p)=>s+p.price.amount,0);const cats=new Set(pair.map(p=>p.category)).size;const affordability=clamp(1-subtotal/Math.max(1,budget));const score=affordability*.35+(cats/2)*.2+.45;ranked.push({ids:pair.map(p=>p.id),subtotal,diversity:cats/2,styleScore:.9,affordability,score});}return ranked.sort((a,b)=>b.score-a.score).slice(0,count);}
