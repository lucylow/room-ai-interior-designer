import type {Recommendation} from '../core/types';
import {clamp} from '../core/math';
export interface Tradeoff {recommendationId:string;gains:string[];costs:string[];balance:number;}
export const analyzeTradeoff=(r:Recommendation):Tradeoff=>{
 const gains:string[]=[];const costs=[...r.tradeoffs];if(r.expectedImpact>.7)gains.push('high expected impact');if(r.confidence>.75)gains.push('stronger evidence');if(r.effort==='tiny'||r.effort==='easy')gains.push('lower implementation effort');
 if(r.estimatedCost!=null&&r.estimatedCost>1000)costs.push('larger budget commitment');if(r.effort==='large'||r.effort==='major')costs.push('higher execution effort');
 const balance=clamp(.45+r.expectedImpact*.4+r.confidence*.25-(costs.length*.08));return {recommendationId:r.id,gains,costs,balance};
};
export const analyzeTradeoffs=(rs:Recommendation[])=>rs.map(analyzeTradeoff);
