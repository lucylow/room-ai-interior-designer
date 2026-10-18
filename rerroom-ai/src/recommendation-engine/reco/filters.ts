import type {Recommendation,Policy} from '../core/types';
export const filterPolicy=(items:Recommendation[],policy:Policy,roomBudget:number|undefined):Recommendation[]=>items.filter(r=>{
  if(r.confidence<policy.minConfidence||r.score<policy.minScore)return false;
  if(policy.requireEvidence&&!r.evidence.length)return false;
  if(r.actions.length>policy.maxActions)return false;
  if(r.category==='shopping'&&!policy.allowShopping)return false;
  if(r.category==='construction'&&!policy.allowConstruction)return false;
  if(roomBudget!=null&&r.estimatedCost!=null&&r.estimatedCost>roomBudget*policy.maxCostRatio)return false;
  return true;
});
export const conservativePolicy:Policy={minConfidence:.45,minScore:.45,maxCostRatio:1,maxActions:4,allowShopping:true,allowConstruction:true,requireEvidence:true};
