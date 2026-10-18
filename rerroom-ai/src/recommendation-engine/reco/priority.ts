import type {Recommendation,UserPreferences} from '../core/types';
import {clamp} from '../core/math';
export const priorityBoost=(r:Recommendation,p:UserPreferences):number=>{
  const explicit=p.priorities.some(x=>x.toLowerCase()===r.category.toLowerCase());
  const life=p.householdNeeds.some(x=>r.tags.some(t=>t.toLowerCase().includes(x.toLowerCase())));
  return clamp(r.score+(explicit?.1:0)+(life?.06:0));
};
export const applyPriority=(items:Recommendation[],p:UserPreferences)=>items.map(r=>({...r,score:priorityBoost(r,p)})).sort((a,b)=>b.score-a.score);
