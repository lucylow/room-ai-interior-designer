import type {RoomContext,Insight,Recommendation} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface BathroomAnalysis {
  score:number;
  confidence:number;
  gap:number;
  explanation:string;
  signals:string[];
}

const scoreBathroom=(room:RoomContext):number=>clamp(room.workflowScore*.3+room.storageScore*.2+room.safetyScore*.3+room.accessibilityScore*.2,0,1);

export const analyzeBathroom=(room:RoomContext):BathroomAnalysis=>{
  const score=scoreBathroom(room);
  const gap=1-score;
  const confidence=clamp(.58+room.measurements.confidence*.28+(room.objects.length>2?.12:.03),0,1);
  const signals=[`Primary bathroom utility score: ${round(score,3)}`,`Observed objects: ${room.objects.length}`,`Measurement confidence: ${round(room.measurements.confidence,3)}`];
  return {score,confidence,gap,explanation:`Bathroom utility is ${(score*100).toFixed(0)}% in the current room model.`,signals};
};

export const toBathroomInsight=(room:RoomContext):Insight=>{
  const a=analyzeBathroom(room);
  return {id:`ins-bathroom-${room.roomId}`,severity:a.score<.38?'high':a.score<.62?'medium':'info',category:'spatial',title:'Bathroom utility AI insight',summary:a.explanation,metric:a.score,unit:'normalized score',direction:a.score>.72?'improving':a.score<.45?'declining':'stable',evidence:[{id:`ev-bathroom-${room.roomId}`,kind:'model',label:'Domain model',value:String(round(a.score,3)),confidence:a.confidence}],recommendedNextStep:'Generate one targeted variant and compare it against the current room.',confidence:a.confidence,createdAt:Date.now()};
};

export const toBathroomRecommendation=(room:RoomContext):Recommendation|null=>{
  const a=analyzeBathroom(room);
  if(a.score>=.62)return null;
  return {id:`rec-bathroom-${room.roomId}`,category:'spatial',title:'Improve bathroom utility',summary:a.explanation,rationale:`The estimated gap is ${(a.gap*100).toFixed(0)} points and is supported by ${a.signals.length} signals.`,score:round(clamp(a.gap*.86,0,1),3),confidence:a.confidence,effort:'moderate',expectedImpact:round(clamp(a.gap*.72,0,1),3),evidence:[{id:`ev-rec-bathroom-${room.roomId}`,kind:'model',label:'AI gap estimate',value:String(round(a.gap,3)),confidence:a.confidence}],actions:[{type:'none',payload:{domain:'bathroom'}}],tradeoffs:['Model output should be previewed in the 2D/3D scene.'],alternatives:['Try a smaller adjustment first.','Compare an alternate style or layout.'],tags:['ai','domain','bathroom'],createdAt:Date.now(),modelVersion:'reco-v3-domain'};
};

export const explainBathroom=(room:RoomContext):string=>analyzeBathroom(room).signals.join(' | ');
