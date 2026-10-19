/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type {   ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface DemoBudgetLadderV2 { room:string; tiers:Array<{budget:number;label:string;productIds:string[]}>; }
export const DEMO_BUDGET_LADDERS_V2:DemoBudgetLadderV2[]=[
 {room:'living-room',tiers:[{budget:500,label:'Micro refresh',productIds:['ikea-lack-side-table','ikea-billy-white-40x28x202']},{budget:750,label:'Balanced',productIds:['ikea-poang-low-back','ikea-lack-side-table','ikea-billy-white-40x28x202']},{budget:1200,label:'Fuller look',productIds:['ikea-poang-armchair','ikea-fratorp-glass','ikea-billy-bookcase-effect']}]},
 {room:'bedroom',tiers:[{budget:500,label:'Starter',productIds:['ikea-storklinta-nightstand','ikea-rast-6-drawer']},{budget:900,label:'Balanced',productIds:['ikea-gullaberg-chest','ikea-storklinta-nightstand']},{budget:1400,label:'Premium',productIds:['ikea-gullaberg-bed-queen','ikea-tonstad-nightstand','ikea-gullaberg-chest']}]},
];
