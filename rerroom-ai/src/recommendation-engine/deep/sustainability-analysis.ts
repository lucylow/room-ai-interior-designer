import type {RoomContext,UserPreferences,Recommendation,Insight,Category} from '../core/types';
import {makeEvidence} from '../core/evidence';
import {clamp} from '../core/math';
import {action} from '../reco/factory';
export interface SustainabilityAnalysis {signal:number;quality:number;gap:number;confidence:number;label:string;notes:string[];}
const category:Category='sustainability';
const metric='sustainabilityScore' as keyof RoomContext;
export const analyze=(room:RoomContext):SustainabilityAnalysis=>{
 const signal=clamp(Number(room[metric]));const quality=metric==='clutterScore'?1-signal:signal;const gap=clamp(.82-quality);const confidence=clamp(room.measurements.confidence*.78+.17);
 const notes:string[]=[];if(gap>.3)notes.push('Large improvement gap detected.');if(gap>.15)notes.push('A meaningful refinement may be visible in comparison mode.');if(confidence<.6)notes.push('Recheck measurements before relying on fine-grained suggestions.');
 return {signal,quality,gap,confidence,label:'Sustainability',notes};
};
export const suggestions=(room:RoomContext,prefs:UserPreferences):Recommendation[]=>{const a=analyze(room);const titles=["Reuse strong existing pieces", "Prefer longer-life materials", "Phase replacements thoughtfully"];return titles.map((title,i)=>({
 id:`deep-sustainability-${room.roomId}-${i}`,category,title,summary:`${title} using the current ${a.label.toLowerCase()} signal.`,rationale:`The engine sees a ${(a.quality*100).toFixed(0)}% quality signal and a ${(a.gap*100).toFixed(0)}% improvement gap.`,score:clamp(.48+a.quality*.25+a.gap*.35+(prefs.priorities.includes(category)?.08:0)),confidence:a.confidence,effort:i===0?'easy':i===1?'moderate':'tiny',expectedImpact:clamp(.55+a.gap*.35),evidence:[makeEvidence('measurement',a.label,a.signal.toFixed(2),room.measurements.confidence)],actions:[action('none',{engine:'sustainability',index:i,quality:a.quality})],tradeoffs:i===1?['May change the visual composition.']:[],alternatives:['Preview a smaller change first.'],tags:['deep-analysis','sustainability'],createdAt:Date.now()}));};
export const insight=(room:RoomContext):Insight=>{const a=analyze(room);const severity=a.quality<.3?'high':a.quality<.5?'medium':a.quality<.7?'low':'info';return {id:`deep-insight-sustainability-${room.roomId}`,severity,category,title:`Sustainability insight`,summary:`The current sustainability quality signal is ${(a.quality*100).toFixed(0)}%.`,metric:a.quality*100,unit:'%',direction:'unknown',evidence:[makeEvidence('model',a.label,a.signal.toFixed(2),a.confidence)],recommendedNextStep:a.gap>.16?'Preview the highest-impact option in 2D and 3D.':'Monitor after the next room edit.',confidence:a.confidence,createdAt:Date.now()};};
