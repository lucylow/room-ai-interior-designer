import type {RoomContext,Recommendation,Insight,UserPreferences,BudgetProfile} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface StorageAdvisorResult {
  score:number;
  confidence:number;
  priority:number;
  reasons:string[];
  blockers:string[];
  opportunities:string[];
}

const scoreFor=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):number=>clamp(room.storageScore*.55+(1-room.clutterScore)*.3+room.workflowScore*.15,0,1);

export const adviseStorageAdvisor=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):StorageAdvisorResult=>{
  const score=scoreFor(room,prefs,budget);
  const confidence=clamp(.58+room.measurements.confidence*.25+(prefs.historyEnabled?.08:.03),0,1);
  const priority=clamp((1-score)*.7+(prefs.priorities.includes('storage')?.22:.04)+(categorySafe(room,prefs,budget)?.04:0),0,1);
  const reasons:string[]=[];
  const blockers:string[]=[];
  const opportunities:string[]=[];
  if(score<.45) reasons.push('Storage advisor is materially below the preferred planning band.');
  if(score>=.45&&score<.7) reasons.push('Storage advisor has moderate opportunity for refinement.');
  if(score>=.7) reasons.push('Storage advisor is already reasonably healthy.');
  if(room.measurements.confidence<.5) blockers.push('Room measurement confidence is low.');
  if(budget?.hardCap!==undefined && (budget.hardCap??0)<=0) blockers.push('Budget cap is not usable.');
  if(priority>.55) opportunities.push('Prefer concealed and dual-purpose storage before adding display furniture.');
  return {score,confidence,priority,reasons,blockers,opportunities};
};

const categorySafe=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):boolean=>{
  return Boolean(room.roomId&&prefs.currency&&((budget?.total??1)>0));
};

export const recommendationFromStorageAdvisor=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):Recommendation|null=>{
  const a=adviseStorageAdvisor(room,prefs,budget);
  if(a.priority<.38)return null;
  const blocked=a.blockers.length>0;
  return {id:`advisor-storage-advisor-${room.roomId}`,category:'storage',title:'Storage advisor',summary:a.reasons[0]??'AI advisor detected an opportunity.',rationale:[...a.reasons,...a.opportunities].join(' '),score:round(a.priority*(blocked?.72:0.92),3),confidence:a.confidence,effort:'easy',expectedImpact:round((1-a.score)*.7,3),estimatedCost:undefined,currency:budget?.currency,evidence:[{id:`advisor-ev-storage-advisor-${room.roomId}`,kind:'model',label:'Specialized advisor score',value:String(round(a.score,3)),confidence:a.confidence}],actions:[{type:'none',payload:{advisor:'storage-advisor'}}],tradeoffs:['The advisor is a planning aid and should be validated in the visualization.'],alternatives:['Preview the smallest reversible change.','Compare another candidate before committing.'],tags:['advisor','ai','storage-advisor'],createdAt:Date.now(),modelVersion:'advisor-v1'};
};

export const insightFromStorageAdvisor=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):Insight=>{
  const a=adviseStorageAdvisor(room,prefs,budget);
  return {id:`advisor-insight-storage-advisor-${room.roomId}`,severity:a.priority>.72?'high':a.priority>.48?'medium':'info',category:'storage',title:'Storage advisor insight',summary:a.reasons.join(' '),metric:a.score,unit:'advisor score',direction:a.score<.45?'declining':a.score>.75?'improving':'stable',evidence:[{id:`advisor-ins-storage-advisor-${room.roomId}`,kind:'model',label:'Advisor evidence',value:String(round(a.score,3)),confidence:a.confidence}],recommendedNextStep:a.opportunities[0]??'Prefer concealed and dual-purpose storage before adding display furniture.',confidence:a.confidence,createdAt:Date.now()};
};

export const explainStorageAdvisor=(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile)=>{
  const a=adviseStorageAdvisor(room,prefs,budget);
  return {score:a.score,priority:a.priority,confidence:a.confidence,reasons:[...a.reasons],blockers:[...a.blockers],opportunities:[...a.opportunities]};
};
