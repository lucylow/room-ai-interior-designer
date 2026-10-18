import type {RoomContext,LayoutAdvice,UserPreferences} from '../core/types';
import {layoutSpaceMetrics} from './layout-space-metrics';
import {clamp,seeded} from '../core/utils';
export class LayoutSearchEngine{
 search(room:RoomContext,prefs:UserPreferences,strategies:LayoutAdvice[],iterations=40){
  const metric=layoutSpaceMetrics(room); const rand=seeded(Math.round(metric.roomArea*100)); const out:LayoutAdvice[]=[];
  for(let i=0;i<iterations;i++){
   const base=strategies[i%Math.max(1,strategies.length)]; if(!base)continue;
   const circulation=clamp(metric.circulationRatio+(rand()-.5)*.12); const balance=clamp(metric.balance+(rand()-.5)*.1);
   const score=clamp(circulation*.55+balance*.45-(metric.openingRisk*.18));
   out.push({...base,id:`search-${i+1}-${base.id}`,score,confidence:clamp(base.confidence*.88+.12),estimatedImprovement:{...base.estimatedImprovement,circulation:circulation-room.circulationScore,visualBalance:balance-room.visualBalanceScore}});
  }
  return out.sort((a,b)=>b.score-a.score).slice(0,12);
 }
}
