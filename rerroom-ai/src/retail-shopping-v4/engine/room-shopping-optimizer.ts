import { RetailProduct,RoomEnvelope,DesignIntent,Budget,ShoppingConstraints,FurnitureSlot,Recommendation } from '../domain/commerce-types';
import { rankForSlot } from './multi-objective-retail-ranking';
export interface SlotPlan { slotId:string; productId:string; score:number; price:number; fit:string; }
export function optimizeRoom(products:RetailProduct[],room:RoomEnvelope,intent:DesignIntent,budget:Budget,constraints:ShoppingConstraints,slots:FurnitureSlot[]):SlotPlan[]{
  let remaining=budget.total-budget.committed-budget.reserved;const out:SlotPlan[]=[];
  for(const slot of slots){const rows=rankForSlot(products,room,intent,{...budget,total:remaining},constraints,slot);const pick=rows.find(r=>r.product.price.amount<=remaining)||rows[0];if(pick){out.push({slotId:slot.id,productId:pick.product.id,score:pick.totalScore,price:pick.product.price.amount,fit:pick.fit});remaining-=Math.min(remaining,pick.product.price.amount);}}
  return out;
}
export function optimizationNarrative(plan:SlotPlan[],budget:Budget){const total=plan.reduce((s,x)=>s+x.price,0);return{items:plan.length,total,remaining:budget.total-budget.committed-budget.reserved-total,notes:['Budget is treated as a planning constraint, not an order total.','Verify delivery, taxes and current retailer prices before purchase.']};}
