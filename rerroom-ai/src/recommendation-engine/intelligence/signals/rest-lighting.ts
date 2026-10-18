import type {RoomContext,Insight,Recommendation,Category} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface RestLightingSignal {
  value:number;
  confidence:number;
  evidence:string[];
  category:Category;
}

export const restlightingScore=(room:RoomContext):number=>clamp(room.comfortScore*.4+room.naturalLightScore*.3+(1-room.workflowScore)*.3,0,1);

export const analyzeRestLighting=(room:RoomContext):RestLightingSignal=>{
  const value=restlightingScore(room);
  const confidence=clamp(.62+room.measurements.confidence*.25+(room.objects.length>3?.1:.03),0,1);
  return {value,confidence,evidence:[`Observed objects: ${room.objects.length}`,`Room type: ${room.roomType}`,`Signal value: ${round(value,3)}`],category:'lighting'};
};

export const restlightingInsight=(room:RoomContext):Insight=>{
  const a=analyzeRestLighting(room);
  return {id:`sig-rest-lighting-${room.roomId}`,severity:a.value<.35?'high':a.value<.58?'medium':'info',category:a.category,title:'Rest lighting readiness',summary:`Rest lighting readiness measures ${(a.value*100).toFixed(0)}% in the current model.`,metric:a.value,unit:'signal score',direction:a.value>.72?'improving':a.value<.42?'declining':'stable',evidence:[{id:`ev-sig-rest-lighting-${room.roomId}`,kind:'model',label:'Derived AI signal',value:String(round(a.value,3)),confidence:a.confidence}],recommendedNextStep:a.value<.55?'Generate a targeted visual comparison for this signal.':'Keep this signal as a soft constraint for new recommendations.',confidence:a.confidence,createdAt:Date.now()};
};

export const restlightingRecommendation=(room:RoomContext):Recommendation|null=>{
  const a=analyzeRestLighting(room);
  if(a.value>.62)return null;
  return {id:`sig-rec-rest-lighting-${room.roomId}`,category:a.category,title:'Improve rest lighting readiness',summary:`Rest lighting readiness is below the preferred threshold.`,rationale:`The model estimated a ${(a.value*100).toFixed(0)}% score from structured room evidence.`,score:round((1-a.value)*.82,3),confidence:a.confidence,effort:'easy',expectedImpact:round((1-a.value)*.65,3),evidence:[{id:`ev-rec-rest-lighting-${room.roomId}`,kind:'model',label:'Signal gap',value:String(round(1-a.value,3)),confidence:a.confidence}],actions:[{type:'none',payload:{signal:'rest-lighting'}}],tradeoffs:['This is a heuristic preview signal, not a construction instruction.'],alternatives:['Compare a smaller intervention.','Wait for better room measurements.'],tags:['signal','ai','rest-lighting'],createdAt:Date.now(),modelVersion:'reco-signal-v1'};
};
