import type {RoomContext,Insight,Recommendation} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface StudioAnalysis {
  score:number;
  confidence:number;
  gap:number;
  explanation:string;
  signals:string[];
}

const scoreStudio=(room:RoomContext):number=>clamp(room.circulationScore*.3+room.storageScore*.2+room.workflowScore*.3+room.visualBalanceScore*.2,0,1);

export const analyzeStudio=(room:RoomContext):StudioAnalysis=>{
  const score=scoreStudio(room);
  const gap=1-score;
  const confidence=clamp(.58+room.measurements.confidence*.28+(room.objects.length>2?.12:.03),0,1);
  const signals=[`Primary studio flexibility score: ${round(score,3)}`,`Observed objects: ${room.objects.length}`,`Measurement confidence: ${round(room.measurements.confidence,3)}`];
  return {score,confidence,gap,explanation:`Studio flexibility is ${(score*100).toFixed(0)}% in the current room model.`,signals};
};

export const toStudioInsight=(room:RoomContext):Insight=>{
  const a=analyzeStudio(room);
  return {id:`ins-studio-${room.roomId}`,severity:a.score<.38?'high':a.score<.62?'medium':'info',category:'spatial',title:'Studio flexibility AI insight',summary:a.explanation,metric:a.score,unit:'normalized score',direction:a.score>.72?'improving':a.score<.45?'declining':'stable',evidence:[{id:`ev-studio-${room.roomId}`,kind:'model',label:'Domain model',value:String(round(a.score,3)),confidence:a.confidence}],recommendedNextStep:'Generate one targeted variant and compare it against the current room.',confidence:a.confidence,createdAt:Date.now()};
};

export const toStudioRecommendation=(room:RoomContext):Recommendation|null=>{
  const a=analyzeStudio(room);
  if(a.score>=.62)return null;
  return {id:`rec-studio-${room.roomId}`,category:'spatial',title:'Improve studio flexibility',summary:a.explanation,rationale:`The estimated gap is ${(a.gap*100).toFixed(0)} points and is supported by ${a.signals.length} signals.`,score:round(clamp(a.gap*.86,0,1),3),confidence:a.confidence,effort:'moderate',expectedImpact:round(clamp(a.gap*.72,0,1),3),evidence:[{id:`ev-rec-studio-${room.roomId}`,kind:'model',label:'AI gap estimate',value:String(round(a.gap,3)),confidence:a.confidence}],actions:[{type:'none',payload:{domain:'studio'}}],tradeoffs:['Model output should be previewed in the 2D/3D scene.'],alternatives:['Try a smaller adjustment first.','Compare an alternate style or layout.'],tags:['ai','domain','studio'],createdAt:Date.now(),modelVersion:'reco-v3-domain'};
};

export const explainStudio=(room:RoomContext):string=>analyzeStudio(room).signals.join(' | ');
