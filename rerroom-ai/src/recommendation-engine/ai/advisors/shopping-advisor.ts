import type {RoomContext,Recommendation,Insight,UserPreferences,BudgetProfile} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface ShoppingAdvisorResult {
  score:number;
  confidence:number;
  priority:number;
  reasons:string[];
  blockers:string[];
  opportunities:string[];
}

const scoreFor=(room:RoomContext,_prefs:UserPreferences,_budget?:BudgetProfile):number=>clamp(room.measurements.confidence*.5+room.styleSignals.modern*.15+room.storageScore*.2+room.circulationScore*.15,0,1);

export const adviseShoppingAdvisor=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):ShoppingAdvisorResult=>{
  const score=scoreFor(room,prefs,budget);
  const confidence=clamp(.58+room.measurements.confidence*.25+(prefs.historyEnabled?.08:.03),0,1);
  const priority=clamp((1-score)*.7+(prefs.priorities.includes('shopping')?.22:.04)+(categorySafe(room,prefs,budget)?.04:0),0,1);
  const reasons:string[]=[];
  const blockers:string[]=[];
  const opportunities:string[]=[];
  if(score<.45) reasons.push('Shopping advisor is materially below the preferred planning band.');
  if(score>=.45&&score<.7) reasons.push('Shopping advisor has moderate opportunity for refinement.');
  if(score>=.7) reasons.push('Shopping advisor is already reasonably healthy.');
  if(room.measurements.confidence<.5) blockers.push('Room measurement confidence is low.');
  if(budget?.hardCap!==undefined && (budget.hardCap??0)<=0) blockers.push('Budget cap is not usable.');
  if(priority>.55) opportunities.push('Only shop after measurements and layout are stable.');
  return {score,confidence,priority,reasons,blockers,opportunities};
};

const categorySafe=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):boolean=>{
  return Boolean(room.roomId&&prefs.currency&&((budget?.total??1)>0));
};

export const recommendationFromShoppingAdvisor=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):Recommendation|null=>{
  const a=adviseShoppingAdvisor(room,prefs,budget);
  if(a.priority<.38)return null;
  const blocked=a.blockers.length>0;
  return {id:`advisor-shopping-advisor-${room.roomId}`,category:'shopping',title:'Shopping advisor',summary:a.reasons[0]??'AI advisor detected an opportunity.',rationale:[...a.reasons,...a.opportunities].join(' '),score:round(a.priority*(blocked?.72:0.92),3),confidence:a.confidence,effort:'easy',expectedImpact:round((1-a.score)*.7,3),estimatedCost:undefined,currency:budget?.currency,evidence:[{id:`advisor-ev-shopping-advisor-${room.roomId}`,kind:'model',label:'Specialized advisor score',value:String(round(a.score,3)),confidence:a.confidence}],actions:[{type:'none',payload:{advisor:'shopping-advisor'}}],tradeoffs:['The advisor is a planning aid and should be validated in the visualization.'],alternatives:['Preview the smallest reversible change.','Compare another candidate before committing.'],tags:['advisor','ai','shopping-advisor'],createdAt:Date.now(),modelVersion:'advisor-v1'};
};

export const insightFromShoppingAdvisor=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):Insight=>{
  const a=adviseShoppingAdvisor(room,prefs,budget);
  return {id:`advisor-insight-shopping-advisor-${room.roomId}`,severity:a.priority>.72?'high':a.priority>.48?'medium':'info',category:'shopping',title:'Shopping advisor insight',summary:a.reasons.join(' '),metric:a.score,unit:'advisor score',direction:a.score<.45?'declining':a.score>.75?'improving':'stable',evidence:[{id:`advisor-ins-shopping-advisor-${room.roomId}`,kind:'model',label:'Advisor evidence',value:String(round(a.score,3)),confidence:a.confidence}],recommendedNextStep:a.opportunities[0]??'Only shop after measurements and layout are stable.',confidence:a.confidence,createdAt:Date.now()};
};

export const explainShoppingAdvisor=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile)=>{
  const a=adviseShoppingAdvisor(room,prefs,budget);
  return {score:a.score,priority:a.priority,confidence:a.confidence,reasons:[...a.reasons],blockers:[...a.blockers],opportunities:[...a.opportunities]};
};
