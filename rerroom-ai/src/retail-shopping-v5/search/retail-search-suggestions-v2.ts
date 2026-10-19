/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type {   RoomType, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface SearchSuggestionV2 { label:string; query:string; reason:string; }
export function makeSearchSuggestions(room:RoomType,style:StyleName,budget:number):SearchSuggestionV2[]{return [
 {label:'Best fit',query:`${room} ${style} furniture under ${money(budget)}`,reason:'Balanced fit/style/budget search'},
 {label:'Cheaper',query:`${room} ${style} furniture low price`,reason:'Reduce merchandise spend'},
 {label:'Smaller',query:`${room} ${style} compact furniture`,reason:'Protect circulation'},
 {label:'Warm wood',query:`${room} ${style} oak birch wood`,reason:'Shift material palette'},
 {label:'Storage',query:`${room} ${style} storage`,reason:'Increase functional capacity'},
];}
