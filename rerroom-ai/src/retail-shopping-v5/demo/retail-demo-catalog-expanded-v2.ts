/** RE:ROOM AI Retail Shopping Studio V5 — final workflow module. */
import type {   ProductCategory } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface DemoCatalogBucketV2 { label:string; productIds:string[]; useCase:string; }
export const DEMO_CATALOG_BUCKETS_V2:DemoCatalogBucketV2[]=[
 {label:'Budget helpers',productIds:['ikea-lack-side-table','ikea-storklinta-nightstand','ikea-kallax-insert'],useCase:'Low-cost room refreshes'},
 {label:'Scandi anchors',productIds:['ikea-poang-armchair','ikea-rast-6-drawer','ikea-gullaberg-bed-queen'],useCase:'Light wood and soft forms'},
 {label:'Modern anchors',productIds:['ikea-fratorp-glass','ikea-billy-bookcase-effect','ikea-stockholm-armchair'],useCase:'Clean contemporary compositions'},
 {label:'Industrial cues',productIds:['ikea-vittskar-table','ikea-torsjo-table'],useCase:'Dark metal and stronger contrast'},
 {label:'Bedroom storage',productIds:['ikea-tonstad-6-drawer','ikea-tonstad-nightstand','ikea-gullaberg-chest'],useCase:'Room organization and storage'},
];
