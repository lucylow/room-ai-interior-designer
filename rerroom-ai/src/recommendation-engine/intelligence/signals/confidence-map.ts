import type {RoomContext,Insight,Recommendation,Category} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface ConfidenceMapSignal {
  value:number;
  confidence:number;
  evidence:string[];
  category:Category;
}

export const confidencemapScore=(room:RoomContext):number=>clamp((room.measurements.confidence+room.safetyScore+room.accessibilityScore+room.visualBalanceScore)/4,0,1);

export const analyzeConfidenceMap=(room:RoomContext):ConfidenceMapSignal=>{
  const value=confidencemapScore(room);
  const confidence=clamp(.62+room.measurements.confidence*.25+(room.objects.length>3?.1:.03),0,1);
  return {value,confidence,evidence:[`Observed objects: ${room.objects.length}`,`Room type: ${room.roomType}`,`Signal value: ${round(value,3)}`],category:'spatial'};
};

export const confidencemapInsight=(room:RoomContext):Insight=>{
  const a=analyzeConfidenceMap(room);
  return {id:`sig-confidence-map-${room.roomId}`,severity:a.value<.35?'high':a.value<.58?'medium':'info',category:a.category,title:'Room confidence',summary:`Room confidence measures ${(a.value*100).toFixed(0)}% in the current model.`,metric:a.value,unit:'signal score',direction:a.value>.72?'improving':a.value<.42?'declining':'stable',evidence:[{id:`ev-sig-confidence-map-${room.roomId}`,kind:'model',label:'Derived AI signal',value:String(round(a.value,3)),confidence:a.confidence}],recommendedNextStep:a.value<.55?'Generate a targeted visual comparison for this signal.':'Keep this signal as a soft constraint for new recommendations.',confidence:a.confidence,createdAt:Date.now()};
};

export const confidencemapRecommendation=(room:RoomContext):Recommendation|null=>{
  const a=analyzeConfidenceMap(room);
  if(a.value>.62)return null;
  return {id:`sig-rec-confidence-map-${room.roomId}`,category:a.category,title:'Improve room confidence',summary:`Room confidence is below the preferred threshold.`,rationale:`The model estimated a ${(a.value*100).toFixed(0)}% score from structured room evidence.`,score:round((1-a.value)*.82,3),confidence:a.confidence,effort:'easy',expectedImpact:round((1-a.value)*.65,3),evidence:[{id:`ev-rec-confidence-map-${room.roomId}`,kind:'model',label:'Signal gap',value:String(round(1-a.value,3)),confidence:a.confidence}],actions:[{type:'none',payload:{signal:'confidence-map'}}],tradeoffs:['This is a heuristic preview signal, not a construction instruction.'],alternatives:['Compare a smaller intervention.','Wait for better room measurements.'],tags:['signal','ai','confidence-map'],createdAt:Date.now(),modelVersion:'reco-signal-v1'};
};
