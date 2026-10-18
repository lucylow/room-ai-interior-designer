import type {Recommendation} from '../core/types';
import {summarizeEvidence} from '../core/evidence';
export interface Explanation {headline:string;why:string[];tradeoffs:string[];confidenceLabel:string;}
export const explain=(r:Recommendation):Explanation=>({
  headline:r.title,
  why:[r.summary,r.evidence.length?`Evidence: ${summarizeEvidence(r.evidence)}`:'This idea is exploratory rather than evidence-heavy.'],
  tradeoffs:r.tradeoffs.length?r.tradeoffs:['No material tradeoff detected by the local evaluator.'],
  confidenceLabel:r.confidence>=.8?'high':r.confidence>=.6?'medium':'low'
});
