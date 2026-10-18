/** RE:ROOM AI Retail Shopping Studio V5 — final commerce module. */
import type { RetailProduct, RoomType, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RetailDemoValidationV5 { passed:boolean; checks:Array<{name:string;passed:boolean;message:string}>; }
export function validateRetailDemoV5(products:RetailProduct[]):RetailDemoValidationV5{const checks=[
{name:'Catalog has items',passed:products.length>0,message:`${products.length} records loaded.`},
{name:'Prices grounded',passed:products.every(p=>p.price.amount>0),message:'All records contain positive snapshot prices.'},
{name:'Dimensions grounded',passed:products.every(p=>p.dimensions.width>0&&p.dimensions.depth>0&&p.dimensions.height>0),message:'All records have 3D dimensions.'},
{name:'Retail links present',passed:products.every(p=>p.url&&p.url!=='#'),message:'All demo records have retailer/category links.'},
{name:'Styles present',passed:products.every(p=>p.styles.length>0),message:'All records include style metadata.'},
{name:'No fake live inventory',passed:products.every(p=>p.availability==='unknown'||p.availability==='demo'||p.availability==='in-stock'),message:'No record claims unsupported inventory state.'},
];return{passed:checks.every(c=>c.passed),checks};}
