/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface DemoRetailRoomLargeV2 { id:string; label:string; roomType:RoomType; style:StyleName; palette:string; budget:number; productIds:string[]; prompt:string; }
const ids=(...x:string[])=>x;
export const DEMO_RETAIL_ROOMS_LARGE_V2:DemoRetailRoomLargeV2[]=[
{id:'apt-01',label:'Toronto Compact Living',roomType:'living',style:'minimalist',palette:'modern-neutral',budget:800,productIds:ids('ikea-lack-side-table','ikea-billy-white-40x28x202','ikea-poang-low-back'),prompt:'Keep circulation open and stay under $800.'},
{id:'apt-02',label:'Oak Scandinavian Bedroom',roomType:'bedroom',style:'scandinavian',palette:'scandi-light',budget:1200,productIds:ids('ikea-gullaberg-chest','ikea-storklinta-nightstand','ikea-gullaberg-bed-queen'),prompt:'Use light wood and quiet storage.'},
{id:'apt-03',label:'Industrial Studio',roomType:'studio',style:'industrial',palette:'industrial-graphite',budget:1000,productIds:ids('ikea-vittskar-table','ikea-billy-bookcase-effect','ikea-torsjo-table'),prompt:'Create an industrial workspace with metal accents.'},
{id:'apt-04',label:'Warm Neutral Guest Room',roomType:'guest',style:'organic-modern',palette:'warm-neutral',budget:950,productIds:ids('ikea-poang-armchair','ikea-storklinta-nightstand'),prompt:'Make a calm guest room with soft wood.'},
{id:'apt-05',label:'Modern Reading Corner',roomType:'living',style:'modern',palette:'modern-neutral',budget:650,productIds:ids('ikea-stockholm-armchair','ikea-lack-side-table'),prompt:'Create a compact reading corner.'},
];
