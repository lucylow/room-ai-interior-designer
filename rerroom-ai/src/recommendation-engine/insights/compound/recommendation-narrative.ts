import type {Recommendation} from '../../core/types';
export const recommendationNarrative=(r:Recommendation)=>({title:r.title,why:r.rationale,impact:`Expected impact ${(r.expectedImpact*100).toFixed(0)}%`,confidence:`Confidence ${(r.confidence*100).toFixed(0)}%`,effort:`Effort ${r.effort}`,tradeoffs:r.tradeoffs.slice(0,3),alternatives:r.alternatives.slice(0,3)});
