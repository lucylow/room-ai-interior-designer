/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface CompareSceneV2 { roomId:string; leftProductIds:string[]; rightProductIds:string[]; activeSide:'left'|'right'; camera:'top'|'perspective'; notes:string[]; }
export function compareSceneV2(roomId:string,left:RetailProduct[],right:RetailProduct[]):CompareSceneV2{return{roomId,leftProductIds:left.map(p=>p.id),rightProductIds:right.map(p=>p.id),activeSide:'left',camera:'perspective',notes:['Both variants share the same room geometry.','Only product overlays differ.','Use fixed camera for fair visual comparison.']};}
