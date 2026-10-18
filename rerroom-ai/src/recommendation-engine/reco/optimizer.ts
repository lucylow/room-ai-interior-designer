import type {Recommendation} from '../core/types';
import {clamp} from '../core/math';
export interface ObjectiveWeights {impact:number;fit:number;cost:number;effort:number;confidence:number;diversity:number;}
export const defaultObjectiveWeights:ObjectiveWeights={impact:.3,fit:.2,cost:.14,effort:.08,confidence:.18,diversity:.1};
export const objectiveScore=(r:Recommendation,w=defaultObjectiveWeights):number=>{
 const costFit=r.estimatedCost==null ? .7 : clamp(1-r.estimatedCost/5000);
 const effort={tiny:1,easy:.9,moderate:.72,large:.5,major:.3}[r.effort];
 return clamp(r.expectedImpact*w.impact+r.score*w.fit+costFit*w.cost+effort*w.effort+r.confidence*w.confidence+w.diversity*.5);
};
export const optimize=(items:Recommendation[],max=10):Recommendation[]=>{
 const rest=[...items],out:Recommendation[]=[];
 while(rest.length&&out.length<max){let best=rest[0],bestScore=-1;for(const r of rest){const diversity=out.every(x=>x.category!==r.category)?1:.55;const s=objectiveScore(r,{...defaultObjectiveWeights,diversity});if(s>bestScore){bestScore=s;best=r;}}out.push(best);rest.splice(rest.indexOf(best),1);}return out;
};
