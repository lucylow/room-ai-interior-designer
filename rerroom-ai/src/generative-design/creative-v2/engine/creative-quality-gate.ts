
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export interface CreativeQualityResult {pass:boolean;score:number;warnings:string[];checks:Record<string,boolean>;}
export function evaluateCreativeQuality(room:RoomContext,concept:DesignConcept,insights:DesignInsight[]):CreativeQualityResult{
 const checks={geometry:concept.render.geometryLock,confidence:concept.confidence>=.5,score:concept.score>=.45,layout:concept.layout.length>0,palette:!!concept.paletteId,prompt:concept.render.positivePrompt.length>50};
 const score=Object.values(checks).filter(Boolean).length/Object.keys(checks).length;const warnings:string[]=[];if(!checks.geometry)warnings.push('Geometry lock is not active.');if(!checks.confidence)warnings.push('Concept confidence is low.');if(!checks.layout)warnings.push('No layout advice attached.');if(!insights.length)warnings.push('No explainability insights attached.');
 return {pass:score>=.8,score:clamp(score),warnings,checks};
}
export function gateSignals(result:CreativeQualityResult):CreativeSignal[]{return Object.entries(result.checks).map(([id,ok])=>({id:`quality-${id}`,label:id,score:ok?1:0,confidence:.95,source:'creative-quality-gate',explanation:ok?'Check passed.':'Check requires review.'}));}
