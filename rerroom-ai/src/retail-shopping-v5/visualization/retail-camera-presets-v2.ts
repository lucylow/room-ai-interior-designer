/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type {   ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface RetailCameraPresetV2 { id:string; label:string; position:[number,number,number]; target:[number,number,number]; fov:number; }
export const RETAIL_CAMERA_PRESETS_V2:RetailCameraPresetV2[]=[
{id:'hero',label:'Hero',position:[4,3,4],target:[0,1,0],fov:42},{id:'wide',label:'Wide',position:[6,3.2,6],target:[0,1,0],fov:55},{id:'top',label:'Top',position:[0,7,0],target:[0,0,0],fov:50},{id:'corner',label:'Corner',position:[-4,2.7,4],target:[0,1,0],fov:45},{id:'eye',label:'Eye level',position:[3,1.6,3],target:[0,1.2,0],fov:48},];
