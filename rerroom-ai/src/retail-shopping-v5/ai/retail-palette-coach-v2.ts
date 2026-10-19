/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import { scorePalette } from '../matching/palette-retail-fit-v2';

export interface PaletteAdviceV2 {
  paletteId: string;
  anchorProducts: RetailProduct[];
  supportingProducts: RetailProduct[];
  accentProducts: RetailProduct[];
  suggestions: string[];
}
export function coachPaletteV2(paletteId: string, products: RetailProduct[]): PaletteAdviceV2 {
  const scored = products.map(product => ({ product, score: scorePalette(product, paletteId).score }));
  const ordered = scored.sort((a,b)=>b.score-a.score);
  const anchors = ordered.slice(0,3).map(x=>x.product);
  const support = ordered.slice(3,7).map(x=>x.product);
  const accents = ordered.slice(7,11).map(x=>x.product);
  return { paletteId, anchorProducts:anchors, supportingProducts:support, accentProducts:accents, suggestions:[`Use the highest-scoring item as the visual anchor.`,`Use ${support.length} supporting pieces to repeat the palette quietly.`,`Reserve accent products for contrast rather than competing focal points.`] };
}
