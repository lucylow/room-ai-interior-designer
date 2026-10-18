import type {RoomContext,Recommendation,Insight} from '../../core/types';
import {digestInsights} from '../insight-workbench';
export interface FinalDigest{headline:string;topRecommendations:string[];topInsights:string[];warnings:string[];confidence:number;}
export const finalDigest=(room:RoomContext,recs:Recommendation[],insights:Insight[]):FinalDigest=>{
 const digest=digestInsights(insights);const warnings:string[]=[];
 if(room.measurements.confidence<.55)warnings.push('Improve room measurements for stronger spatial confidence.');
 if(!recs.length)warnings.push('No recommendation survived ranking and policy gates.');
 if(digest.averageConfidence<.55)warnings.push('Insight confidence is moderate or lower.');
 return {headline:`AI design summary for ${room.name}`,topRecommendations:recs.slice(0,5).map(r=>r.title),topInsights:digest.top.slice(0,5).map(i=>i.id),warnings,confidence:Math.min(digest.averageConfidence,recs.length?recs.reduce((s,r)=>s+r.confidence,0)/recs.length:.5)};
};
