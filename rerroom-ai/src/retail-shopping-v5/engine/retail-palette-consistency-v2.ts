/** RE:ROOM AI Retail Shopping Studio V5 — final workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import { scorePalette } from '../matching/palette-retail-fit-v2';

export interface PaletteConsistencyV2 { paletteId:string; score:number; matched:number; total:number; notes:string[]; }
export function evaluatePaletteConsistency(products:RetailProduct[],paletteId:string):PaletteConsistencyV2{const scored=products.map(p=>scorePalette(p,paletteId).score);const matched=scored.filter(s=>s>=.5).length;const total=products.length;const score=total?matched/total:1;return{paletteId,score,matched,total,notes:[`${matched}/${total} products match the palette threshold.`,score>.8?'Palette reads consistently.':'Consider a stronger anchor colour or material.']};}
