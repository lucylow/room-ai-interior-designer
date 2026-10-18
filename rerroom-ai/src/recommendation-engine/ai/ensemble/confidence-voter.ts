import type {Recommendation} from '../../core/types';
export interface ConfidenceVoterResult{id:string;score:number;rank:number;reason:string;}
const adjusted=(r:Recommendation):number=>{const score=r.score,impact=r.expectedImpact,confidence=r.confidence;const costPenalty=Math.min(1,(r.estimatedCost??0)/5000);const novelty=Math.min(1,r.tags.length/8);const consistency=r.evidence.length>=2?.9:.55;return Math.max(0,Math.min(1,score*.35+impact*.25+confidence*.4));};
export const voteConfidenceVoter=(rows:Recommendation[]):ConfidenceVoterResult[]=>{const ranked=rows.map(r=>({id:r.id,score:adjusted(r),reason:'Confidence-first ensemble combines score, expected impact, confidence, and context.'})).sort((a,b)=>b.score-a.score);return ranked.map((r,i)=>({...r,rank:i+1}));};
export const topConfidenceVoter=(rows:Recommendation[],limit=5)=>voteConfidenceVoter(rows).slice(0,limit);
export const compareConfidenceVoter=(a:Recommendation,b:Recommendation)=>adjusted(a)-adjusted(b);
export const confidencevoterConfidence=(r:Recommendation)=>Math.min(1,r.confidence*(.7+adjusted(r)*.3));
export const confidencevoterExplain=(r:Recommendation)=>`Confidence-first ensemble: ${(adjusted(r)*100).toFixed(0)}% combined score.`;

// The voting layer is deliberately deterministic so a demo can reproduce a ranking.
// It is also small enough to run after every room edit on a phone without network access.
// Production telemetry can compare voter scores against accepted, rejected, saved and edited feedback.
// No model credential is required here; this is a transparent scoring layer above specialized agents.
