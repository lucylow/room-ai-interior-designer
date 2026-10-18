/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface RetailPairing { productA:string; productB:string; score:number; rationale:string[]; }
export function pairProducts(a:RetailProduct[],b:RetailProduct[],style:StyleName):RetailPairing[]{const out:RetailPairing[]=[];for(const left of a.slice(0,12))for(const right of b.slice(0,12)){if(left.id===right.id)continue;const sharedStyle=left.styles.filter(s=>right.styles.includes(s)).includes(style);const materialMatch=left.materials.some(m=>right.materials.includes(m));const colorMatch=left.colors.some(c=>right.colors.includes(c));const score=(sharedStyle?.5:0)+(materialMatch?.25:0)+(colorMatch?.15:0)+.1;out.push({productA:left.id,productB:right.id,score,rationale:[sharedStyle?'Shared target style':'Different primary style',materialMatch?'Material continuity':'Material contrast',colorMatch?'Colour continuity':'Colour contrast']});}return out.sort((x,y)=>y.score-x.score).slice(0,24);}
