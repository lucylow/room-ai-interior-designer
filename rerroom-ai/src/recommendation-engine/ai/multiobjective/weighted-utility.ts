import type {Recommendation} from '../../core/types';
export interface UtilityWeights{score:number;impact:number;confidence:number;cost:number;effort:number;}
export const weightedUtility=(r:Recommendation,w:UtilityWeights)=>{const cost=Math.min(1,(r.estimatedCost??0)/5000);const effort={tiny:.05,easy:.12,moderate:.24,large:.45,major:.7}[r.effort];return Math.max(0,Math.min(1,r.score*w.score+r.expectedImpact*w.impact+r.confidence*w.confidence+(1-cost)*w.cost+(1-effort)*w.effort));};
export const rankByWeightedUtility=(rows:Recommendation[],w:UtilityWeights)=>rows.slice().sort((a,b)=>weightedUtility(b,w)-weightedUtility(a,w));
