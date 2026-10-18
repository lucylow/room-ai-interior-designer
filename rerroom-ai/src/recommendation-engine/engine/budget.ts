import type {BudgetProfile,Recommendation,UserPreferences} from '../core/types';
import {clamp} from '../core/math';
export interface BudgetInsight {remaining:number;committed:number;ratio:number;status:'under'|'near'|'over';}
export const budgetInsight=(budget:BudgetProfile|undefined,items:Recommendation[]):BudgetInsight=>{
 if(!budget)return {remaining:0,committed:0,ratio:0,status:'under'};
 const committed=items.reduce((s,r)=>s+(r.estimatedCost??0),0);const ratio=committed/Math.max(1,budget.hardCap??budget.total);
 return {remaining:Math.max(0,budget.total-committed),committed,ratio,status:ratio>=.9?'over':ratio>.1?'near':'under'};
};
export const budgetAdjust=(items:Recommendation[],prefs:UserPreferences,budget?:BudgetProfile):Recommendation[]=>items.map(r=>{
 if(!budget&&!prefs.budgetMax)return r;const cap=budget?.hardCap??budget?.total??prefs.budgetMax!;
 const factor=r.estimatedCost==null?1:clamp(1-Math.max(0,r.estimatedCost-cap)/Math.max(1,cap)*1.2);
 return {...r,score:clamp(r.score*factor)};
});
