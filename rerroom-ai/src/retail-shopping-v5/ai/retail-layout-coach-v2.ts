/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, FurnitureSlot, RoomEnvelope } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import { evaluateSpatialFit } from '../matching/spatial-fit-v2';

export interface LayoutAdviceV2 { slotId:string; productCandidates:RetailProduct[]; advice:string[]; circulationTargetCm:number; }
export function coachLayoutV2(room:RoomEnvelope,slots:FurnitureSlot[],products:RetailProduct[]):LayoutAdviceV2[]{return slots.map(slot=>{const ranked=products.map(p=>({p,fit:evaluateSpatialFit({product:p,slot,room,allowTightFit:true})})).filter(x=>x.fit.state!=='too-large').sort((a,b)=>b.fit.score-a.fit.score).slice(0,6);const min=ranked[0]?.fit.clearanceCm??0;return{slotId:slot.id,productCandidates:ranked.map(x=>x.p),advice:[`Target ${room.circulationTargetCm} cm circulation in this room.`,`Best current footprint leaves about ${Math.round(min)} cm minimum slot clearance.`,slot.role.includes('table')?'Keep table edges visually light near circulation.':'Anchor this role to the existing spatial slot.'],circulationTargetCm:room.circulationTargetCm};});}
