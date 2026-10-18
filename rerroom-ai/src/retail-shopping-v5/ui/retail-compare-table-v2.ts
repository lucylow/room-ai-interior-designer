/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface CompareRow { label:string; values:string[]; }
export function compareProductsV2(products:RetailProduct[]):CompareRow[]{return[{label:'Product',values:products.map(p=>p.name)},{label:'Price',values:products.map(p=>money(p.price.amount))},{label:'Footprint',values:products.map(p=>`${p.dimensions.width}×${p.dimensions.depth} cm`)},{label:'Height',values:products.map(p=>`${p.dimensions.height} cm`)},{label:'Styles',values:products.map(p=>p.styles.slice(0,3).join(', '))},{label:'Materials',values:products.map(p=>p.materials.slice(0,3).join(', '))},{label:'Data',values:products.map(p=>p.availability==='unknown'?'Snapshot / recheck':'Live verified')}];}
