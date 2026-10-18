import type {RoomContext,Insight,Recommendation,Category} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface RoomDensitySignal {
  value:number;
  confidence:number;
  evidence:string[];
  category:Category;
}

export const roomdensityScore=(room:RoomContext):number=>clamp(Math.min(1,room.objects.length/20),0,1);

export const analyzeRoomDensity=(room:RoomContext):RoomDensitySignal=>{
  const value=roomdensityScore(room);
  const confidence=clamp(.62+room.measurements.confidence*.25+(room.objects.length>3?.1:.03),0,1);
  return {value,confidence,evidence:[`Observed objects: ${room.objects.length}`,`Room type: ${room.roomType}`,`Signal value: ${round(value,3)}`],category:'spatial'};
};

export const roomdensityInsight=(room:RoomContext):Insight=>{
  const a=analyzeRoomDensity(room);
  return {id:`sig-room-density-${room.roomId}`,severity:a.value<.35?'high':a.value<.58?'medium':'info',category:a.category,title:'Room object density',summary:`Room object density measures ${(a.value*100).toFixed(0)}% in the current model.`,metric:a.value,unit:'signal score',direction:a.value>.72?'improving':a.value<.42?'declining':'stable',evidence:[{id:`ev-sig-room-density-${room.roomId}`,kind:'model',label:'Derived AI signal',value:String(round(a.value,3)),confidence:a.confidence}],recommendedNextStep:a.value<.55?'Generate a targeted visual comparison for this signal.':'Keep this signal as a soft constraint for new recommendations.',confidence:a.confidence,createdAt:Date.now()};
};

export const roomdensityRecommendation=(room:RoomContext):Recommendation|null=>{
  const a=analyzeRoomDensity(room);
  if(a.value>.62)return null;
  return {id:`sig-rec-room-density-${room.roomId}`,category:a.category,title:'Improve room object density',summary:`Room object density is below the preferred threshold.`,rationale:`The model estimated a ${(a.value*100).toFixed(0)}% score from structured room evidence.`,score:round((1-a.value)*.82,3),confidence:a.confidence,effort:'easy',expectedImpact:round((1-a.value)*.65,3),evidence:[{id:`ev-rec-room-density-${room.roomId}`,kind:'model',label:'Signal gap',value:String(round(1-a.value,3)),confidence:a.confidence}],actions:[{type:'none',payload:{signal:'room-density'}}],tradeoffs:['This is a heuristic preview signal, not a construction instruction.'],alternatives:['Compare a smaller intervention.','Wait for better room measurements.'],tags:['signal','ai','room-density'],createdAt:Date.now(),modelVersion:'reco-signal-v1'};
};
