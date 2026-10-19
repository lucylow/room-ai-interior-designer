/** RE:ROOM AI Retail Shopping Studio V5 — final commerce module. */
import type { RetailProduct } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface SizePriceTradeoffV2 {
  productId:string;
  priceDelta:number;
  footprintDelta:number;
  efficiency:number;
  narrative:string;
}

export function sizePriceTradeoffs(reference:RetailProduct,candidates:RetailProduct[]):SizePriceTradeoffV2[]{
  const baseArea=reference.dimensions.width*reference.dimensions.depth;
  return candidates
    .filter(p=>p.id!==reference.id)
    .map(p=>{
      const area=p.dimensions.width*p.dimensions.depth;
      const priceDelta=p.price.amount-reference.price.amount;
      const footprintDelta=area-baseArea;
      const efficiency=(Math.abs(priceDelta)<1?1:1/(1+Math.abs(priceDelta)/100))*(footprintDelta<=0?1:.75);
      return {productId:p.id,priceDelta,footprintDelta,efficiency,narrative:`${p.name} changes price by ${money(priceDelta)} and footprint by ${Math.round(footprintDelta)} cm².`};
    })
    .sort((a,b)=>b.efficiency-a.efficiency);
}
