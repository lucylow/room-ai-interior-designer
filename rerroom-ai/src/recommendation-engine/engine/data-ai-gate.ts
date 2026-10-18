import type {Recommendation,Insight,RoomContext,Policy} from '../core/types';
import {assessDataQuality} from '../ai/data-quality';
import {applyQualityGate} from '../ai/quality-gate';
export interface DataAIGate{recommendations:Recommendation[];insights:Insight[];warnings:string[];dataScore:number;}
export const dataAIGate=(room:RoomContext,recs:Recommendation[],insights:Insight[],policy:Policy):DataAIGate=>{
 const quality=assessDataQuality(room);const warnings=[...quality.warnings,...quality.missing.map(x=>`Missing: ${x}`)];
 const gated=applyQualityGate(recs,policy).accepted.map(r=>({...r,confidence:r.confidence*quality.score,score:r.score*(.6+.4*quality.score)}));
 const nextInsights=insights.map(i=>({...i,confidence:i.confidence*quality.score}));
 return {recommendations:gated,insights:nextInsights,warnings,dataScore:quality.score};
};
