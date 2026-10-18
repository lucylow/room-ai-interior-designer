/** RE:ROOM AI Retail Shopping Studio V5 — final threshold module. */
import type { RetailProduct, RoomEnvelope, FurnitureSlot, RoomType, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface DemoQaCheckV4 { name:string; passed:boolean; detail:string; }
export function runRetailDemoQaV4(products:RetailProduct[]):DemoQaCheckV4[]{const checks:DemoQaCheckV4[]=[];checks.push({name:'Snapshot prices populated',passed:products.every(p=>p.price.amount>0),detail:`${products.filter(p=>p.price.amount>0).length}/${products.length} priced.`});checks.push({name:'Footprints populated',passed:products.every(p=>p.dimensions.width>0&&p.dimensions.depth>0),detail:'Width/depth available for scene testing.'});checks.push({name:'Retail IDs populated',passed:products.every(p=>p.sku.length>0),detail:'SKU identifiers available.'});checks.push({name:'Styles populated',passed:products.every(p=>p.styles.length>0),detail:'Style tags available.'});checks.push({name:'Room compatibility populated',passed:products.every(p=>p.roomTypes.length>0),detail:'Room types available.'});return checks;}
