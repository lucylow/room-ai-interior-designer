/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, StyleName, RoomEnvelope } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface RoomStoryV2 { title:string; intro:string; bullets:string[]; shoppingSequence:string[]; }
export function roomStory(room:RoomEnvelope,style:StyleName,budget:number,products:RetailProduct[]):RoomStoryV2{const categories=[...new Set(products.map(p=>p.category))];return{title:`${style} ${room.name}`,intro:`A buyable ${style} room concept sized to the existing ${room.width.toFixed(1)} × ${room.depth.toFixed(1)} m envelope and a ${money(budget)} merchandise target.`,bullets:[`Use ${categories.slice(0,4).join(', ')} as the shopping backbone.`,`Preserve existing circulation and CAD/BIM anchors.`,`Keep product prices grounded in dated snapshots until live checkout.`],shoppingSequence:['Anchor the hero piece','Protect circulation','Add storage','Add accents','Recheck budget']};}
