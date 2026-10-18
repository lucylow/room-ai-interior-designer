import type {RoomContext,UserPreferences,Insight} from '../core/types';
import {makeEvidence} from '../core/evidence';
import {clamp} from '../core/math';
export const metricInsight=(room:RoomContext,key:keyof Pick<RoomContext,'naturalLightScore'|'circulationScore'|'clutterScore'|'storageScore'|'visualBalanceScore'|'accessibilityScore'|'safetyScore'|'comfortScore'>,category:Insight['category'],title:string,now=Date.now()):Insight=>{
  const raw=Number(room[key]);const betterHigher=key!=='clutterScore';const score=betterHigher?raw:1-raw;
  const severity=score<.35?'high':score<.55?'medium':score<.7?'low':'info';
  return {id:`ins-${room.roomId}-${key}`,severity,category,title,summary:`${title} signal is ${(score*100).toFixed(0)}% based on current room inputs.`,metric:score*100,unit:'%',direction:'unknown',evidence:[makeEvidence('measurement',key,raw.toFixed(2),room.measurements.confidence,key)],recommendedNextStep:score<.6?'Review the related recommendations':'Monitor the signal after the next edit.',confidence:clamp(room.measurements.confidence*.75+.2),createdAt:now};
};
export const preferenceConflictInsight=(room:RoomContext,prefs:UserPreferences):Insight|undefined=>{
  const conflicts=prefs.avoidedStyles.filter(s=>prefs.preferredStyles.includes(s));if(!conflicts.length)return undefined;
  return {id:`ins-pref-conflict-${room.roomId}`,severity:'medium',category:'style',title:'Preference conflict',summary:`Preferred and avoided style lists overlap for ${conflicts.join(', ')}.`,evidence:[makeEvidence('preference','overlap',conflicts.join(','),.95)],recommendedNextStep:'Resolve the overlap before using personalized ranking.',confidence:.95,createdAt:Date.now()};
};
