/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface RetailImageAsset { productId:string; kind:'hero'|'alternate'|'thumbnail'; url:string; source:'retailer'|'demo'; alt:string; }
export function resolveRetailImages(product:RetailProduct):RetailImageAsset[]{return [
 {productId:product.id,kind:'hero',url:product.url,source:'retailer',alt:`${product.name} product page`},
 {productId:product.id,kind:'thumbnail',url:product.url,source:'retailer',alt:`${product.name} thumbnail placeholder`},
 {productId:product.id,kind:'alternate',url:product.url,source:'retailer',alt:`${product.name} alternate view placeholder`},
];}
export function demoImageLabel(product:RetailProduct){return `${product.name} · image provider adapter pending live asset response`}
