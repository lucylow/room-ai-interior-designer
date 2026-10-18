import type {RoomContext,Insight,Recommendation,Category} from '../../core/types';
import {clamp,round} from '../../core/math';

export interface MaterialDiversitySignal {
  value:number;
  confidence:number;
  evidence:string[];
  category:Category;
}

export const materialdiversityScore=(room:RoomContext):number=>clamp(Math.min(1,new Set(room.objects.map(o=>o.material).filter(Boolean)).size/6),0,1);

export const analyzeMaterialDiversity=(room:RoomContext):MaterialDiversitySignal=>{
  const value=materialdiversityScore(room);
  const confidence=clamp(.62+room.measurements.confidence*.25+(room.objects.length>3?.1:.03),0,1);
  return {value,confidence,evidence:[`Observed objects: ${room.objects.length}`,`Room type: ${room.roomType}`,`Signal value: ${round(value,3)}`],category:'style'};
};

export const materialdiversityInsight=(room:RoomContext):Insight=>{
  const a=analyzeMaterialDiversity(room);
  return {id:`sig-material-diversity-${room.roomId}`,severity:a.value<.35?'high':a.value<.58?'medium':'info',category:a.category,title:'Material diversity',summary:`Material diversity measures ${(a.value*100).toFixed(0)}% in the current model.`,metric:a.value,unit:'signal score',direction:a.value>.72?'improving':a.value<.42?'declining':'stable',evidence:[{id:`ev-sig-material-diversity-${room.roomId}`,kind:'model',label:'Derived AI signal',value:String(round(a.value,3)),confidence:a.confidence}],recommendedNextStep:a.value<.55?'Generate a targeted visual comparison for this signal.':'Keep this signal as a soft constraint for new recommendations.',confidence:a.confidence,createdAt:Date.now()};
};

export const materialdiversityRecommendation=(room:RoomContext):Recommendation|null=>{
  const a=analyzeMaterialDiversity(room);
  if(a.value>.62)return null;
  return {id:`sig-rec-material-diversity-${room.roomId}`,category:a.category,title:'Improve material diversity',summary:`Material diversity is below the preferred threshold.`,rationale:`The model estimated a ${(a.value*100).toFixed(0)}% score from structured room evidence.`,score:round((1-a.value)*.82,3),confidence:a.confidence,effort:'easy',expectedImpact:round((1-a.value)*.65,3),evidence:[{id:`ev-rec-material-diversity-${room.roomId}`,kind:'model',label:'Signal gap',value:String(round(1-a.value,3)),confidence:a.confidence}],actions:[{type:'none',payload:{signal:'material-diversity'}}],tradeoffs:['This is a heuristic preview signal, not a construction instruction.'],alternatives:['Compare a smaller intervention.','Wait for better room measurements.'],tags:['signal','ai','material-diversity'],createdAt:Date.now(),modelVersion:'reco-signal-v1'};
};
