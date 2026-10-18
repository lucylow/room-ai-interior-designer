import type {Recommendation,Insight,RoomContext} from '../core/types';
import {mean,clamp} from '../core/math';
export interface QualityReport {recommendationCoverage:number;evidenceCoverage:number;confidence:number;diversity:number;insightCoverage:number;warnings:string[];}
export const qualityReport=(room:RoomContext,recs:Recommendation[],insights:Insight[]):QualityReport=>{
 const evidenceCoverage=recs.length?mean(recs.map(r=>r.evidence.length?1:0)):0;const confidence=recs.length?mean(recs.map(r=>r.confidence)):0;
 const cats=new Set(recs.map(r=>r.category));const diversity=clamp(cats.size/Math.min(8,Math.max(1,recs.length)));const insightCoverage=clamp(insights.length/8);
 const warnings:string[]=[];if(room.measurements.confidence<.55)warnings.push('Room measurement confidence is low.');if(evidenceCoverage<.8)warnings.push('Some recommendations lack evidence.');if(diversity<.35)warnings.push('Recommendations are concentrated in a small number of categories.');
 return {recommendationCoverage:clamp(recs.length/10),evidenceCoverage,confidence,diversity,insightCoverage,warnings};
};
