/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type {   ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface SceneLegendV2 { items:Array<{label:string;token:string;meaning:string}>; }
export function sceneLegendV2():SceneLegendV2{return{items:[{label:'Selected product',token:'selected',meaning:'Currently active furniture overlay'},{label:'Alternative',token:'alternative',meaning:'Different buyable candidate'},{label:'Tight fit',token:'tight',meaning:'Placement needs circulation review'},{label:'Snapshot',token:'snapshot',meaning:'Retail data must be revalidated'},{label:'CAD/BIM anchor',token:'authority',meaning:'Underlying spatial truth'}]};}
