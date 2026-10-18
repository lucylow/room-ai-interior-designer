/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface MaterialPreviewV2 { productId:string; primary:string; secondary:string; textureScale:number; roughness:number; metallic:number; }
export function materialPreviewV2(product:RetailProduct):MaterialPreviewV2{const metal=product.materials.some(m=>/metal|brass|steel/.test(m));const wood=product.materials.some(m=>/wood|oak|birch|pine/.test(m));return{productId:product.id,primary:wood?'wood':metal?'metal':'fabric',secondary:product.colors[0]??'neutral',textureScale:wood?.7:1,roughness:wood?.75:metal?.35:.9,metallic:metal?.75:0};}
