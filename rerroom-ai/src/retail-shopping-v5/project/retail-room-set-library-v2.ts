/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type {   RoomType, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface RoomSetLibraryItem { id:string; name:string; room:RoomType; style:StyleName; paletteId:string; productIds:string[]; subtotal:number; tags:string[]; }
export class RetailRoomSetLibraryV2 { private items=new Map<string,RoomSetLibraryItem>(); save(item:Omit<RoomSetLibraryItem,'id'>){const saved={...item,id:id('set',`${item.name}:${Date.now()}`)};this.items.set(saved.id,saved);return saved;} get(idValue:string){return this.items.get(idValue);} list(){return [...this.items.values()];} findByStyle(style:StyleName){return this.list().filter(i=>i.style===style);} findAffordable(budget:number){return this.list().filter(i=>i.subtotal<=budget);} remove(idValue:string){this.items.delete(idValue);} }
