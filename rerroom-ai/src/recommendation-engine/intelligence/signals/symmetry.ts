import type {RoomContext,Insight,Recommendation,Category} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface SymmetrySignal {
  value:number;
  confidence:number;
  evidence:string[];
  category:Category;
}

export const symmetryScore=(room:RoomContext):number=>clamp(room.visualBalanceScore*.8+room.styleSignals.classic*.2,0,1);

export const analyzeSymmetry=(room:RoomContext):SymmetrySignal=>{
  const value=symmetryScore(room);
  const confidence=clamp(.62+room.measurements.confidence*.25+(room.objects.length>3?.1:.03),0,1);
  return {value,confidence,evidence:[`Observed objects: ${room.objects.length}`,`Room type: ${room.roomType}`,`Signal value: ${round(value,3)}`],category:'spatial'};
};

export const symmetryInsight=(room:RoomContext):Insight=>{
  const a=analyzeSymmetry(room);
  return {id:`sig-symmetry-${room.roomId}`,severity:a.value<.35?'high':a.value<.58?'medium':'info',category:a.category,title:'Visual symmetry',summary:`Visual symmetry measures ${(a.value*100).toFixed(0)}% in the current model.`,metric:a.value,unit:'signal score',direction:a.value>.72?'improving':a.value<.42?'declining':'stable',evidence:[{id:`ev-sig-symmetry-${room.roomId}`,kind:'model',label:'Derived AI signal',value:String(round(a.value,3)),confidence:a.confidence}],recommendedNextStep:a.value<.55?'Generate a targeted visual comparison for this signal.':'Keep this signal as a soft constraint for new recommendations.',confidence:a.confidence,createdAt:Date.now()};
};

export const symmetryRecommendation=(room:RoomContext):Recommendation|null=>{
  const a=analyzeSymmetry(room);
  if(a.value>.62)return null;
  return {id:`sig-rec-symmetry-${room.roomId}`,category:a.category,title:'Improve visual symmetry',summary:`Visual symmetry is below the preferred threshold.`,rationale:`The model estimated a ${(a.value*100).toFixed(0)}% score from structured room evidence.`,score:round((1-a.value)*.82,3),confidence:a.confidence,effort:'easy',expectedImpact:round((1-a.value)*.65,3),evidence:[{id:`ev-rec-symmetry-${room.roomId}`,kind:'model',label:'Signal gap',value:String(round(1-a.value,3)),confidence:a.confidence}],actions:[{type:'none',payload:{signal:'symmetry'}}],tradeoffs:['This is a heuristic preview signal, not a construction instruction.'],alternatives:['Compare a smaller intervention.','Wait for better room measurements.'],tags:['signal','ai','symmetry'],createdAt:Date.now(),modelVersion:'reco-signal-v1'};
};
