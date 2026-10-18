import { RetailProduct,DesignIntent,RoomEnvelope,Budget,ShoppingConstraints,FurnitureSlot,Candidate } from '../domain/commerce-types';
import { recommend } from './recommendations';
export interface RankingWeights { style:number; palette:number; room:number; spatial:number; budget:number; value:number; }
export const DEFAULT_WEIGHTS:RankingWeights={style:.25,palette:.15,room:.15,spatial:.20,budget:.15,value:.10};
export function rerank(candidates:Candidate[],weights:RankingWeights=DEFAULT_WEIGHTS){
  return candidates.map(c=>({...c,totalScore:c.styleScore*weights.style+c.paletteScore*weights.palette+c.roomScore*weights.room+c.fitScore*weights.spatial+c.budgetScore*weights.budget+c.valueScore*weights.value})).sort((a,b)=>b.totalScore-a.totalScore);
}
export function paretoFront(candidates:Candidate[]){
  return candidates.filter((a,i)=>!candidates.some((b,j)=>j!==i&&b.styleScore>=a.styleScore&&b.fitScore>=a.fitScore&&b.budgetScore>=a.budgetScore&&b.valueScore>=a.valueScore&&(b.styleScore>a.styleScore||b.fitScore>a.fitScore||b.budgetScore>a.budgetScore||b.valueScore>a.valueScore)));
}
export function rankForSlot(products:RetailProduct[],room:RoomEnvelope,intent:DesignIntent,budget:Budget,constraints:ShoppingConstraints,slot:FurnitureSlot){
  return rerank(recommend(products,room,intent,budget,constraints,slot));
}
