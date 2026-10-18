import type {RoomContext,UserPreferences,Recommendation,Insight,Category} from '../core/types';
import {makeEvidence} from '../core/evidence';
import {clamp} from '../core/math';
import {action} from '../reco/factory';
const category:Category='sustainability';
const metricKey='sustainabilityScore' as keyof RoomContext;
const titles=["Prioritize durable materials over disposable trends", "Reuse strong existing pieces before replacing them", "Prefer repairable and long-life items"];
const tags=["sustainability", "durable", "reuse"];
export function generateRecommendations(room:RoomContext,prefs:UserPreferences):Recommendation[]{
 const signal=Number(room[metricKey]);
 const preferenceBoost=prefs.priorities.some(p=>p.toLowerCase()===category)?0.1:0;
 const confidence=clamp(room.measurements.confidence*.72+.23);
 return titles.map((title:string,index:number)=>{
  const severity=index===0?.12:index===1?.07:.03;
  const score=clamp((.5+signal*.35+severity+preferenceBoost)*(index===2?.94:1));
  const evidence=[makeEvidence('measurement',metricKey,String(signal.toFixed(2)),room.measurements.confidence,metricKey)];
  if(prefs.preferredStyles.length)evidence.push(makeEvidence('preference','preferred styles',prefs.preferredStyles.slice(0,3).join(', '),.8));
  return {id:`rule-sustainability-${room.roomId}-${index}`,category,title,summary:title+'.',rationale:`The sustainabilityScore signal and current preferences support this as an actionable starting point.`,score,confidence,effort:index===0?'easy':index===1?'moderate':'tiny',expectedImpact:clamp(.55+signal*.3+index*.03),evidence,actions:[action('none',{rule:'sustainability',index,signal})],tradeoffs:index===1?['May require moving more than one object.']:[],alternatives:['Test a smaller version first.'],tags:[...tags,'ai-rule'],createdAt:Date.now()};
 });
}
export function generateInsight(room:RoomContext):Insight{
 const raw=Number(room[metricKey]);const quality=metricKey==='clutterScore'?1-raw:raw;
 const severity=quality<.32?'high':quality<.52?'medium':quality<.68?'low':'info';
 return {id:`rule-insight-sustainability-${room.roomId}`,severity,category,title:`sustainability opportunity`,summary:`Current sustainabilityScore quality is ${(quality*100).toFixed(0)}%.`,metric:quality*100,unit:'%',direction:'unknown',evidence:[makeEvidence('rule','sustainability signal',raw.toFixed(2),room.measurements.confidence)],recommendedNextStep:quality<.6?'Review the first AI recommendation in this category.':'Keep the current setup and test alternatives.',confidence:clamp(room.measurements.confidence*.8+.15),createdAt:Date.now()};
}
export const ruleName='sustainability';
