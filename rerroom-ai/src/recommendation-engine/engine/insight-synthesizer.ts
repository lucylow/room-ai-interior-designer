import type {Insight,Recommendation} from '../core/types';
import {joinNatural} from '../core/text';
import {clamp} from '../core/math';
export const synthesize=(insights:Insight[],recommendations:Recommendation[]):Insight[]=>{
 const high=insights.filter(i=>i.severity==='high'||i.severity==='critical');if(!high.length)return insights;
 const related=recommendations.filter(r=>high.some(i=>i.category===r.category)).slice(0,4).map(r=>r.id);
 const top=high.slice(0,3);const title=`${top.length} areas need attention`;const summary=`The current room model identifies ${joinNatural(top.map(i=>i.title.toLowerCase()))}.`;
 return [{id:`synth-${Date.now()}`,severity:'high',category:top[0].category,title,summary,evidence:top.flatMap(i=>i.evidence).slice(0,6),recommendedNextStep:related.length?'Start with the highest-confidence recommendation and preview its effect in 2D/3D.':'Recheck room measurements before acting.',confidence:clamp(top.reduce((s,i)=>s+i.confidence,0)/top.length),relatedRecommendationIds:related,createdAt:Date.now()},...insights];
};
