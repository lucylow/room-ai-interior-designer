import type {Recommendation,UserPreferences} from '../../core/types';
import {diversifyRecommendations} from '../retrieval-diversifier';
import {rankByWeightedUtility} from '../multiobjective/weighted-utility';
export interface FinalRankOptions{limit:number;maxPerCategory:number;}
export const finalRank=(rows:Recommendation[],prefs:UserPreferences,options:FinalRankOptions={limit:12,maxPerCategory:3})=>{
  const weights={score:.38,impact:.3,confidence:.2,cost:.07,effort:.05};
  const ranked=rankByWeightedUtility(rows,weights);
  const preferred=ranked.map(r=>prefs.priorities.includes(r.category)?{...r,score:Math.min(1,r.score+.08)}:r).sort((a,b)=>b.score-a.score);
  return diversifyRecommendations(preferred,options.limit,options.maxPerCategory);
};
export const finalScoreSummary=(rows:Recommendation[])=>({count:rows.length,mean:rows.length?rows.reduce((s,r)=>s+r.score,0)/rows.length:0,confidence:rows.length?rows.reduce((s,r)=>s+r.confidence,0)/rows.length:0,impact:rows.length?rows.reduce((s,r)=>s+r.expectedImpact,0)/rows.length:0});
