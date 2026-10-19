/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface StyleShoppingCoach { selectedStyle:StyleName; keep:Array<string>; avoid:Array<string>; suggestedMaterials:string[]; suggestedProducts:string[]; narrative:string[]; }
export function coachStyleShopping(style:StyleName,products:RetailProduct[]):StyleShoppingCoach{const keep=products.filter(p=>p.styles.includes(style)).slice(0,8).map(p=>p.name);const avoid=products.filter(p=>!p.styles.includes(style)).slice(0,4).map(p=>p.name);const materialMap:Record<string,string[]>={modern:['oak','metal','glass'],minimalist:['fiberboard','metal','light wood'],scandinavian:['birch','oak','pine','fabric'],industrial:['metal','glass','dark wood']};const materials=materialMap[style]??['wood','metal','fabric'];return{selectedStyle:style,keep,avoid,suggestedMaterials:materials,suggestedProducts:products.filter(p=>p.styles.includes(style)).slice(0,6).map(p=>p.id),narrative:[`Keep ${style} cues consistent across hero and supporting pieces.`,`Use ${materials.join(', ')} as a practical material language.`,`Avoid allowing one novelty item to dominate the palette.`]};}
