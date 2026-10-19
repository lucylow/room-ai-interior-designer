/** RE:ROOM AI Retail Shopping Studio V5 — final workflow module. */
import type { RetailProduct, RoomType, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import { templateFor } from '../project/room-set-template-engine-v2';

export interface RoomSetAIRequestV2 { room:RoomType; style:StyleName; paletteId:string; budget:number; prompt:string; }
export interface RoomSetAIResultV2 { title:string; summary:string; slotQueries:string[]; productIds:string[]; decisionNotes:string[]; }
export function generateRoomSetAI(req:RoomSetAIRequestV2,products:RetailProduct[]):RoomSetAIResultV2{const template=templateFor(req.room,req.style);const slots=template?.slots??[{role:'hero',category:'seating',priority:1}];const productIds:string[]=[];const decisionNotes:string[]=[];let remaining=req.budget;for(const slot of slots.sort((a,b)=>b.priority-a.priority)){const matches=products.filter(p=>p.category===slot.category).filter(p=>p.roomTypes.includes(req.room)).filter(p=>p.styles.includes(req.style)).sort((a,b)=>a.price.amount-b.price.amount);const pick=matches.find(p=>p.price.amount<=remaining*.75)||matches[0];if(pick&&pick.price.amount<=remaining){productIds.push(pick.id);remaining-=pick.price.amount;decisionNotes.push(`Selected ${pick.name} for ${slot.role}.`);}else decisionNotes.push(`No ${slot.role} candidate fit the remaining budget.`);}return{title:`${req.style} ${req.room} shopping concept`,summary:`${productIds.length} catalog-grounded items fit the current shopping model.`,slotQueries:slots.map(s=>`${s.role}:${s.category}`),productIds,decisionNotes};}
