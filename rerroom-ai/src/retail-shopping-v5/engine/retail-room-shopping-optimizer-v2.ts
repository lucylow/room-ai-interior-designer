/** RE:ROOM AI Retail Shopping Studio V5 — final threshold module. */
import type { RetailProduct, RoomEnvelope, FurnitureSlot, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

import { evaluateSpatialFit } from '../matching/spatial-fit-v2';
import { scoreRetailStyle } from '../matching/retail-style-filter-engine';

export interface ShoppingOptimizerInputV2 { room:RoomEnvelope; slots:FurnitureSlot[]; products:RetailProduct[]; style:StyleName; budget:number; }
export interface ShoppingOptimizerChoiceV2 { slotId:string; product:RetailProduct; score:number; reason:string; }
export interface ShoppingOptimizerResultV2 { choices:ShoppingOptimizerChoiceV2[]; subtotal:number; remaining:number; coverage:number; notes:string[]; }

export function optimizeRoomShoppingV2(input:ShoppingOptimizerInputV2):ShoppingOptimizerResultV2 {
  const choices:ShoppingOptimizerChoiceV2[]=[];
  let subtotal=0;
  for(const slot of input.slots){
    const candidates=input.products
      .filter(product=>product.price.amount+subtotal<=input.budget)
      .map(product=>{
        const fit=evaluateSpatialFit({product,slot:slot,room:input.room,allowTightFit:false});
        const style=scoreRetailStyle(product,input.style).score;
        const value=(product.price.amount<=input.budget*.25)?.9:.6;
        return {product,score:clamp(fit.score*.5+style*.35+value*.15),fit};
      })
      .filter(x=>x.fit.state!=='too-large'&&x.fit.state!=='blocked')
      .sort((a,b)=>b.score-a.score);
    const winner=candidates[0];
    if(!winner) continue;
    choices.push({slotId:slot.id,product:winner.product,score:winner.score,reason:`${Math.round(winner.score*100)}% combined fit/style/budget score.`});
    subtotal+=winner.product.price.amount;
  }
  return {choices,subtotal,remaining:input.budget-subtotal,coverage:input.slots.length?choices.length/input.slots.length:1,notes:[`Covered ${choices.length}/${input.slots.length} furniture slots.`,`Merchandise spend ${money(subtotal)} against ${money(input.budget)} budget.`,choices.length<input.slots.length?'Some slots remain intentionally unfilled.':'All requested slots received a candidate.']};
}
