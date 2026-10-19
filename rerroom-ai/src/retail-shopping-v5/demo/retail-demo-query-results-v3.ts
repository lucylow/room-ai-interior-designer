/** RE:ROOM AI Retail Shopping Studio V5 — final workflow module. */
import type {   StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface DemoQueryResultV3 { query:string; style:StyleName; budget:number; resultIds:string[]; notes:string[]; }
export const DEMO_QUERY_RESULTS_V3:DemoQueryResultV3[]=[
 {query:'modern living room under $750',style:'modern',budget:750,resultIds:['ikea-lack-side-table','ikea-billy-white-40x28x202','ikea-fratorp-glass'],notes:['Use hard-cap optimizer before finalizing.','FRÖTORP may consume a large share of the merchandise budget.']},
 {query:'scandinavian bedroom under $1200',style:'scandinavian',budget:1200,resultIds:['ikea-gullaberg-bed-queen','ikea-storklinta-nightstand','ikea-rast-6-drawer'],notes:['Keep the bed as the primary budget anchor.']},
 {query:'industrial studio under $1000',style:'industrial',budget:1000,resultIds:['ikea-vittskar-table','ikea-torsjo-table','ikea-billy-bookcase-effect'],notes:['Use darker materials as accents rather than every item.']},
];
