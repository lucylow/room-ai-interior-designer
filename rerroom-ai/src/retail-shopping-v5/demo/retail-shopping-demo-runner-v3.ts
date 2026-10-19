/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, StyleName, FurnitureSlot, RoomEnvelope } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import { diversifyRoomKit } from '../ranking/room-kit-diversifier-v2';
import { evaluateSpatialFit, spatialFitLabel } from '../matching/spatial-fit-v2';
import { buildShoppingReport, type RetailShoppingReportV2 } from '../project/retail-shopping-report-v2';

import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';

export interface DemoRunV3 { id:string; prompt:string; style:StyleName; palette:string; budget:number; selected:RetailProduct[]; subtotal:number; savingsTarget?:number; report:RetailShoppingReportV2; }
export function runDemoV3(prompt:string,room:RoomEnvelope,slots:FurnitureSlot[],style:StyleName,palette:string,budget:number,products=IKEA_CA_V5_CATALOG):DemoRunV3{const candidates=products.filter(p=>p.roomTypes.includes(room.roomType)).filter(p=>p.price.amount<=budget);const selected=diversifyRoomKit(candidates.filter(p=>p.styles.includes(style)),Math.min(4,slots.length));const subtotal=selected.reduce((s,p)=>s+p.price.amount,0);const labels=selected.map((p,i)=>{const slot=slots[i]??slots[0];return spatialFitLabel(evaluateSpatialFit({product:p,slot,room,allowTightFit:true}));});return{id:id('demo-v3',prompt),prompt,style,palette,budget,selected,subtotal,savingsTarget:Math.max(0,budget-subtotal),report:buildShoppingReport(room.id,room.name,style,palette,budget,selected,labels)};}
