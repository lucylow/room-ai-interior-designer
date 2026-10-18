import type {RoomContext,Insight,Recommendation} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface EntrywayAnalysis {
  score:number;
  confidence:number;
  gap:number;
  explanation:string;
  signals:string[];
}

const scoreEntryway=(room:RoomContext):number=>clamp(room.storageScore*.45+room.workflowScore*.3+room.circulationScore*.25,0,1);

export const analyzeEntryway=(room:RoomContext):EntrywayAnalysis=>{
  const score=scoreEntryway(room);
  const gap=1-score;
  const confidence=clamp(.58+room.measurements.confidence*.28+(room.objects.length>2?.12:.03),0,1);
  const signals=[`Primary entryway readiness score: ${round(score,3)}`,`Observed objects: ${room.objects.length}`,`Measurement confidence: ${round(room.measurements.confidence,3)}`];
  return {score,confidence,gap,explanation:`Entryway readiness is ${(score*100).toFixed(0)}% in the current room model.`,signals};
};

export const toEntrywayInsight=(room:RoomContext):Insight=>{
  const a=analyzeEntryway(room);
  return {id:`ins-entryway-${room.roomId}`,severity:a.score<.38?'high':a.score<.62?'medium':'info',category:'spatial',title:'Entryway readiness AI insight',summary:a.explanation,metric:a.score,unit:'normalized score',direction:a.score>.72?'improving':a.score<.45?'declining':'stable',evidence:[{id:`ev-entryway-${room.roomId}`,kind:'model',label:'Domain model',value:String(round(a.score,3)),confidence:a.confidence}],recommendedNextStep:'Generate one targeted variant and compare it against the current room.',confidence:a.confidence,createdAt:Date.now()};
};

export const toEntrywayRecommendation=(room:RoomContext):Recommendation|null=>{
  const a=analyzeEntryway(room);
  if(a.score>=.62)return null;
  return {id:`rec-entryway-${room.roomId}`,category:'spatial',title:'Improve entryway readiness',summary:a.explanation,rationale:`The estimated gap is ${(a.gap*100).toFixed(0)} points and is supported by ${a.signals.length} signals.`,score:round(clamp(a.gap*.86,0,1),3),confidence:a.confidence,effort:'moderate',expectedImpact:round(clamp(a.gap*.72,0,1),3),evidence:[{id:`ev-rec-entryway-${room.roomId}`,kind:'model',label:'AI gap estimate',value:String(round(a.gap,3)),confidence:a.confidence}],actions:[{type:'none',payload:{domain:'entryway'}}],tradeoffs:['Model output should be previewed in the 2D/3D scene.'],alternatives:['Try a smaller adjustment first.','Compare an alternate style or layout.'],tags:['ai','domain','entryway'],createdAt:Date.now(),modelVersion:'reco-v3-domain'};
};

export const explainEntryway=(room:RoomContext):string=>analyzeEntryway(room).signals.join(' | ');
