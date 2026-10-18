/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface ProcurementCheck { label:string; required:boolean; completed:boolean; note?:string; }
export function procurementChecklist(products:RetailProduct[]):ProcurementCheck[]{return[
 {label:'Verify live price',required:true,completed:false,note:'Snapshot values are not checkout truth.'},
 {label:'Verify stock',required:true,completed:false,note:'Check retailer inventory for destination.'},
 {label:'Verify dimensions',required:true,completed:true,note:'Catalog footprint stored; confirm configured variant.'},
 {label:'Verify delivery access',required:true,completed:false,note:'Confirm doorway, elevator and delivery path.'},
 {label:'Verify assembly',required:true,completed:false,note:'Add assembly allowance where applicable.'},
 {label:'Confirm client approval',required:true,completed:false,note:`${products.length} product records selected.`},
];}
