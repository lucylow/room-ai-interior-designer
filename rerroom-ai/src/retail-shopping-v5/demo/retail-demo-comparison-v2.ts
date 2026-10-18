/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface DemoComparisonV2 { title:string; left:string[]; right:string[]; prompt:string; }
export const DEMO_COMPARISONS_V2:DemoComparisonV2[]=[
 {title:'Scandi vs Industrial',left:['ikea-poang-armchair','ikea-billy-bookcase-effect'],right:['ikea-vittskar-table','ikea-torsjo-table'],prompt:'Which direction feels calmer while keeping the same room shell?'},
 {title:'Budget vs Upgrade',left:['ikea-poang-low-back','ikea-lack-side-table'],right:['ikea-poang-armchair','ikea-fratorp-glass'],prompt:'Compare a low-cost and higher-impact furniture package.'},
];
