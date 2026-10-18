import type {Recommendation,Insight,UserPreferences,BudgetProfile,RoomContext} from '../core/types';
import {scoreRecommendations} from '../reco/scorer';import {dedupe} from '../reco/dedup';import {filterPolicy,conservativePolicy} from '../reco/filters';import {optimize} from '../reco/optimizer';import {applyPriority} from '../reco/priority';import {uncertaintyAdjustedScore} from '../reco/uncertainty';
export const ensembleRecommendations=(items:Recommendation[],room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile,max=12):Recommendation[]=>{
 let out=dedupe(items);out=scoreRecommendations(out,prefs);out=applyPriority(out,prefs);out=out.map(r=>({...r,score:uncertaintyAdjustedScore(r)}));out=filterPolicy(out,conservativePolicy,budget?.total??prefs.budgetMax);return optimize(out,max);
};
export const ensembleInsights=(items:Insight[]):Insight[]=>{const seen=new Set<string>();const weight={info:.2,low:.4,medium:.65,high:.85,critical:1};return items.filter(i=>{const k=`${i.category}:${i.title}`;if(seen.has(k))return false;seen.add(k);return true;}).sort((a,b)=>weight[b.severity]-weight[a.severity]);};
