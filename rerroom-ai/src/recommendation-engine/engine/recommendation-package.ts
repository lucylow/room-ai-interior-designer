import type {Recommendation,Insight,Policy} from '../core/types';
import {applyQualityGate} from '../ai/quality-gate';
import {diversifyRecommendations} from '../ai/retrieval-diversifier';
export const packageRecommendations=(rows:Recommendation[],insights:Insight[],policy:Policy,limit=12)=>{const gated=applyQualityGate(rows,policy).accepted;const diversified=diversifyRecommendations(gated,limit);const qualityCoverage=diversified.length?diversified.filter(r=>r.evidence.length>0).length/diversified.length:0;return {recommendations:diversified,insights:insights.slice(0,16),qualityCoverage,rejectedCount:rows.length-gated.length};};
