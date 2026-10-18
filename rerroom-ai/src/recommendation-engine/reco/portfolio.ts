import type {Recommendation} from '../core/types';
import {clamp} from '../core/math';
export interface Portfolio {primary:Recommendation[];alternatives:Recommendation[];byCategory:Record<string,number>;cost:number;impact:number;}
export const buildPortfolio=(items:Recommendation[],max=12):Portfolio=>{
  const chosen:Recommendation[]=[];const counts:Record<string,number>={};
  for(const r of [...items].sort((a,b)=>b.score-a.score)){
    const limit=r.category==='shopping'?3:2; if((counts[r.category]??0)>=limit)continue;
    const diversity=chosen.every(x=>x.category!==r.category)||r.score>Math.max(...chosen.filter(x=>x.category===r.category).map(x=>x.score),-1)+.06;
    if(diversity){chosen.push(r);counts[r.category]=(counts[r.category]??0)+1;}
    if(chosen.length>=max)break;
  }
  const cost=chosen.reduce((s,r)=>s+(r.estimatedCost??0),0);const impact=chosen.reduce((s,r)=>s+r.expectedImpact,0)/Math.max(1,chosen.length);
  return {primary:chosen,alternatives:items.filter(r=>!chosen.includes(r)).slice(0,Math.max(3,Math.floor(max/2))),byCategory:counts,cost,impact:clamp(impact)};
};
