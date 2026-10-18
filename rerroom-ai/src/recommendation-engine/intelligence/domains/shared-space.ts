import type {RoomContext,Insight,Recommendation} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface SharedSpaceAnalysis {
  score:number;
  confidence:number;
  gap:number;
  explanation:string;
  signals:string[];
}

const scoreSharedSpace=(room:RoomContext):number=>clamp(room.circulationScore*.25+room.comfortScore*.2+room.workflowScore*.25+room.visualBalanceScore*.3,0,1);

export const analyzeSharedSpace=(room:RoomContext):SharedSpaceAnalysis=>{
  const score=scoreSharedSpace(room);
  const gap=1-score;
  const confidence=clamp(.58+room.measurements.confidence*.28+(room.objects.length>2?.12:.03),0,1);
  const signals=[`Primary shared-space harmony score: ${round(score,3)}`,`Observed objects: ${room.objects.length}`,`Measurement confidence: ${round(room.measurements.confidence,3)}`];
  return {score,confidence,gap,explanation:`Shared-space harmony is ${(score*100).toFixed(0)}% in the current room model.`,signals};
};

export const toSharedSpaceInsight=(room:RoomContext):Insight=>{
  const a=analyzeSharedSpace(room);
  return {id:`ins-shared-space-${room.roomId}`,severity:a.score<.38?'high':a.score<.62?'medium':'info',category:'spatial',title:'Shared-space harmony AI insight',summary:a.explanation,metric:a.score,unit:'normalized score',direction:a.score>.72?'improving':a.score<.45?'declining':'stable',evidence:[{id:`ev-shared-space-${room.roomId}`,kind:'model',label:'Domain model',value:String(round(a.score,3)),confidence:a.confidence}],recommendedNextStep:'Generate one targeted variant and compare it against the current room.',confidence:a.confidence,createdAt:Date.now()};
};

export const toSharedSpaceRecommendation=(room:RoomContext):Recommendation|null=>{
  const a=analyzeSharedSpace(room);
  if(a.score>=.62)return null;
  return {id:`rec-shared-space-${room.roomId}`,category:'spatial',title:'Improve shared-space harmony',summary:a.explanation,rationale:`The estimated gap is ${(a.gap*100).toFixed(0)} points and is supported by ${a.signals.length} signals.`,score:round(clamp(a.gap*.86,0,1),3),confidence:a.confidence,effort:'moderate',expectedImpact:round(clamp(a.gap*.72,0,1),3),evidence:[{id:`ev-rec-shared-space-${room.roomId}`,kind:'model',label:'AI gap estimate',value:String(round(a.gap,3)),confidence:a.confidence}],actions:[{type:'none',payload:{domain:'shared-space'}}],tradeoffs:['Model output should be previewed in the 2D/3D scene.'],alternatives:['Try a smaller adjustment first.','Compare an alternate style or layout.'],tags:['ai','domain','shared-space'],createdAt:Date.now(),modelVersion:'reco-v3-domain'};
};

export const explainSharedSpace=(room:RoomContext):string=>analyzeSharedSpace(room).signals.join(' | ');
