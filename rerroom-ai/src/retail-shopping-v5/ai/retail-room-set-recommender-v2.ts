/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory, FurnitureSlot, RoomEnvelope, RetailerId } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import { scoreRetailStyle } from '../matching/retail-style-filter-engine';
import { scorePalette } from '../matching/palette-retail-fit-v2';

export interface RoomSetRecommendationV2 { id:string; title:string; style:StyleName; paletteId:string; productIds:string[]; subtotal:number; score:number; reasons:string[]; }
export function recommendRoomSetsV2(products:RetailProduct[],room:RoomEnvelope,budget:number,styles:StyleName[],palettes:string[]):RoomSetRecommendationV2[]{const sets:RoomSetRecommendationV2[]=[];for(const style of styles)for(const palette of palettes){const eligible=products.filter(p=>p.roomTypes.includes(room.roomType)).filter(p=>p.price.amount<=budget).sort((a,b)=>(scoreRetailStyle(b,style).score+scorePalette(b,palette).score)-(scoreRetailStyle(a,style).score+scorePalette(a,palette).score));const picked=eligible.slice(0,5);const subtotal=picked.reduce((s,p)=>s+p.price.amount,0);if(!picked.length)continue;sets.push({id:id('room-set-v2',`${room.id}:${style}:${palette}`),title:`${style} · ${palette.replaceAll('-',' ')}`,style,paletteId:palette,productIds:picked.map(p=>p.id),subtotal,score:clamp((styles.indexOf(style)+1)/styles.length*.2+(budget-subtotal)/Math.max(1,budget)*.3+.5),reasons:[`${picked.length} room-compatible products`,`${money(subtotal)} merchandise snapshot`,`${room.width.toFixed(1)} × ${room.depth.toFixed(1)} m room envelope`]});}return sets.sort((a,b)=>b.score-a.score).slice(0,10);}
