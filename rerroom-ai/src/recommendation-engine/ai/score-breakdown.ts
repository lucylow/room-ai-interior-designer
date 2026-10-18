import type {Recommendation} from '../core/types';
import {round} from '../core/math';

export interface ScoreBreakdown {recommendationId:string;base:number;impact:number;confidence:number;costPenalty:number;effortPenalty:number;final:number;explanations:string[];}

const effortPenalty=(effort:Recommendation['effort']):number=>({tiny:0.02,easy:0.05,moderate:0.1,large:0.16,major:0.22})[effort];
export const explainScore=(r:Recommendation,budgetRatio=0):ScoreBreakdown=>{
  const costPenalty=Math.min(0.35,budgetRatio*0.35);
  const ep=effortPenalty(r.effort);
  const final=Math.max(0,Math.min(1,r.score*(0.7+0.3*r.confidence)+r.expectedImpact*0.15-costPenalty-ep));
  return {recommendationId:r.id,base:r.score,impact:r.expectedImpact,confidence:r.confidence,costPenalty,effortPenalty:ep,final:round(final,4),explanations:[`Base score ${(r.score*100).toFixed(0)}%.`,`Confidence ${(r.confidence*100).toFixed(0)}%.`,`Impact ${(r.expectedImpact*100).toFixed(0)}%.`,costPenalty>0?`Budget penalty ${(costPenalty*100).toFixed(0)}%.`:'No budget penalty.',`Effort penalty ${(ep*100).toFixed(0)}%.`]};
};
export const explainScores=(rows:Recommendation[],budgetRatio=0)=>rows.map(r=>explainScore(r,budgetRatio));
