/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory, FurnitureSlot, RoomEnvelope, RetailerId } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RetailCommand { id:string; label:string; command:string; icon:string; shortcut?:string; }
export const RETAIL_COMMANDS_V2:RetailCommand[]=[
{id:'search',label:'Search buyable furniture',command:'search',icon:'search',shortcut:'/'},
{id:'try',label:'Try in room',command:'try-in-room',icon:'cube'},
{id:'swap',label:'Swap current item',command:'swap',icon:'replace'},
{id:'cheaper',label:'Find cheaper',command:'cheaper',icon:'down'},
{id:'smaller',label:'Find smaller',command:'smaller',icon:'minimize'},
{id:'compare',label:'Compare options',command:'compare',icon:'columns'},
{id:'room-set',label:'Build room set',command:'room-set',icon:'layers'},
{id:'save',label:'Save room set',command:'save-set',icon:'bookmark'},
{id:'cart',label:'Open cart',command:'cart',icon:'shopping-cart'},
];
