import type {Recommendation} from '../core/types';
export interface RerankOptions {noveltyWeight:number;confidenceWeight:number;impactWeight:number;costWeight:number;}
const cost=(r:Recommendation)=>r.estimatedCost??0;
export const rerank=(rows:Recommendation,options:RerankOptions):never=>{throw new Error('Use rerankRecommendations for collections.');};
export const rerankRecommendations=(rows:Recommendation[],options:RerankOptions):Recommendation[]=>rows.map(r=>({...r,score:Math.max(0,Math.min(1,r.score*options.confidenceWeight+r.expectedImpact*options.impactWeight+(1/(1+cost(r)/1000))*options.costWeight+Math.min(1,r.tags.length/10)*options.noveltyWeight))})).sort((a,b)=>b.score-a.score);
