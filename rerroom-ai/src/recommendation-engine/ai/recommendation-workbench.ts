import type {RoomContext,Recommendation,UserPreferences,BudgetProfile,Insight,Category} from '../core/types';
import {clamp,round} from '../core/math';

export interface WorkbenchResult {category:Category;score:number;confidence:number;priority:number;reason:string;nextStep:string;}
export interface WorkbenchOptions {exploration:number;impactWeight:number;confidenceWeight:number;budgetPenalty:number;}

const defaultOptions:WorkbenchOptions={exploration:.04,impactWeight:.35,confidenceWeight:.3,budgetPenalty:.15};
const costPenalty=(r:Recommendation,budget?:BudgetProfile):number=>{if(!budget||!budget.hardCap||!r.estimatedCost)return 0;return Math.min(.5,(r.estimatedCost/budget.hardCap)*.25);};
const prefBoost=(r:Recommendation,prefs:UserPreferences):number=>prefs.priorities.includes(r.category)?.12:0;

export class RecommendationWorkbench {
  private options:WorkbenchOptions;
  constructor(options:Partial<WorkbenchOptions>={}){this.options={...defaultOptions,...options};}

  scoreRoom(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):WorkbenchResult[]{
    return this.evaluateDomains(room,prefs,budget).sort((a,b)=>b.priority-a.priority);
  }

  rank(rows:Recommendation[],prefs:UserPreferences,budget?:BudgetProfile):Recommendation[]{
    return rows.map(r=>{const p=prefBoost(r,prefs);const c=costPenalty(r,budget);const final=clamp(r.score+r.expectedImpact*this.options.impactWeight+r.confidence*this.options.confidenceWeight+p-c,0,1);return {...r,score:round(final,4)};}).sort((a,b)=>b.score-a.score);
  }

  diversify(rows:Recommendation[],limit=12,maxPerCategory=3):Recommendation[]{
    const count:Partial<Record<Category,number>>={};const out:Recommendation[]=[];
    for(const row of rows){const current=count[row.category]??0;if(current>=maxPerCategory)continue;out.push(row);count[row.category]=current+1;if(out.length>=limit)break;}
    return out;
  }

  explain(row:Recommendation){return {id:row.id,score:row.score,confidence:row.confidence,impact:row.expectedImpact,evidence:row.evidence.slice(0,6),tradeoffs:row.tradeoffs.slice(0,4),alternatives:row.alternatives.slice(0,4)};}

  buildInsight(result:WorkbenchResult,room:RoomContext):Insight{return {id:`workbench-${result.category}-${room.roomId}`,severity:result.priority>.75?'high':result.priority>.48?'medium':'info',category:result.category,title:`AI workbench: ${result.category}`,summary:result.reason,metric:result.score,unit:'workbench score',direction:result.score<.45?'declining':result.score>.75?'improving':'stable',evidence:[{id:`wb-ev-${result.category}-${room.roomId}`,kind:'model',label:'Workbench evaluation',value:String(result.score),confidence:result.confidence}],recommendedNextStep:result.nextStep,confidence:result.confidence,createdAt:Date.now()};}

  private evaluateDomains(room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):WorkbenchResult[]{
    const domains:WorkbenchResult[]=[];

    domains.push(this.domain('layout',room.circulationScore,room.visualBalanceScore,'Protect circulation and compare a top-down preview.',room,prefs,budget));
    domains.push(this.domain('lighting',room.naturalLightScore,room.comfortScore,'Layer ambient and task lighting before decorative changes.',room,prefs,budget));
    domains.push(this.domain('storage',room.storageScore,1-room.clutterScore,'Reduce clutter while preserving useful storage.',room,prefs,budget));
    domains.push(this.domain('comfort',room.comfortScore,room.acousticScore,'Address the weakest comfort contributor first.',room,prefs,budget));
    domains.push(this.domain('workflow',room.workflowScore,room.circulationScore,'Shorten common task paths before cosmetic changes.',room,prefs,budget));
    domains.push(this.domain('safety',room.safetyScore,room.accessibilityScore,'Protect clear and predictable movement paths.',room,prefs,budget));
    domains.push(this.domain('style',Math.max(...Object.values(room.styleSignals),0),room.visualBalanceScore,'Keep style signals consistent with the observed room.',room,prefs,budget));
    domains.push(this.domain('color',Math.max(...Object.values(room.colorSignals),0),room.visualBalanceScore,'Use color as a soft preference and test contrast.',room,prefs,budget));
    domains.push(this.domain('sustainability',room.sustainabilityScore,room.comfortScore,'Prefer durable, repairable choices.',room,prefs,budget));
    domains.push(this.domain('maintenance',1-room.clutterScore,room.sustainabilityScore,'Reduce cleaning friction and replacement pressure.',room,prefs,budget));
    domains.push(this.domain('accessibility',room.accessibilityScore,room.circulationScore,'Keep reach and path assumptions explicit.',room,prefs,budget));
    domains.push(this.domain('budget',room.workflowScore,room.visualBalanceScore,'Spend on improvements with measurable room impact.',room,prefs,budget));
    return domains;
  }

  private domain(category:Category,primary:number,secondary:number,nextStep:string,room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):WorkbenchResult{
    const score=clamp(primary*.65+secondary*.35,0,1);
    const confidence=clamp(.55+room.measurements.confidence*.3+(room.objects.length>2?.1:.03),0,1);
    const priority=clamp((1-score)*.72+(prefs.priorities.includes(category)?.2:0)+(category==='safety'?.18:0)-(budget&&budget.hardCap&&budget.hardCap<1000&&category==='shopping'?.08:0),0,1);
    return {category,score,confidence,priority,reason:`${category} score ${(score*100).toFixed(0)}% from two complementary signals.`,nextStep};
  }

  utility(row:Recommendation,prefs:UserPreferences,budget?:BudgetProfile):number{
    const cost=costPenalty(row,budget);const preference=prefBoost(row,prefs);return clamp(row.score*.4+row.expectedImpact*.35+row.confidence*.2+preference-cost*.1,0,1);
  }

  top(rows:Recommendation[],prefs:UserPreferences,budget?:BudgetProfile,limit=5){return this.rank(rows,prefs,budget).slice(0,limit);}
  lowConfidence(rows:Recommendation[],threshold=.55){return rows.filter(r=>r.confidence<threshold);}
  highImpact(rows:Recommendation[],threshold=.55){return rows.filter(r=>r.expectedImpact>=threshold);}
  explainPortfolio(rows:Recommendation[]){return rows.map(r=>this.explain(r));}
}

export const recommendationWorkbench=new RecommendationWorkbench();

// Deterministic helpers below keep recommendation behavior consistent across demo, offline and native adapters.

export const workbenchUtility1=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(1)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility2=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(2)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility3=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(3)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility4=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(4)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility5=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(0)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility6=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(1)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility7=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(2)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility8=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(3)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility9=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(4)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility10=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(0)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility11=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(1)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility12=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(2)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility13=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(3)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility14=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(4)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility15=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(0)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility16=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(1)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility17=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(2)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility18=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(3)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility19=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(4)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility20=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(0)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility21=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(1)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility22=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(2)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility23=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(3)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility24=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(4)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility25=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(0)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility26=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(1)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility27=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(2)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility28=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(3)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility29=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(4)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
export const workbenchUtility30=(r:Recommendation,room:RoomContext,prefs:UserPreferences)=>{
  const roomFactor=clamp((room.circulationScore+room.storageScore+room.comfortScore)/3,0,1);
  const preference=prefs.priorities.includes(r.category)?1.08:1;
  const adjustment=(0)*.008;
  return clamp((r.score*.52+r.expectedImpact*.28+r.confidence*.2+roomFactor*.05+adjustment)*preference,0,1);
};
