import type {Recommendation} from '../core/types';
export const regretScore=(r:Recommendation)=>{const missedImpact=Math.max(0,1-r.expectedImpact);const uncertainty=1-r.confidence;const cost=Math.min(1,(r.estimatedCost??0)/5000);return Math.max(0,Math.min(1,missedImpact*.35+uncertainty*.45+cost*.2));};
export const minimizeRegret=(rows:Recommendation[])=>rows.slice().sort((a,b)=>regretScore(a)-regretScore(b));
