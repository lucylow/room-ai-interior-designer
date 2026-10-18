import type {Recommendation,Insight} from '../core/types';import {clampSentence} from '../core/text';
export const narrateRecommendation=(r:Recommendation):string=>clampSentence(`${r.title}. ${r.summary} Confidence is ${Math.round(r.confidence*100)}%, based on ${r.evidence.length} evidence item(s).`,220);
export const narrateInsight=(i:Insight):string=>clampSentence(`${i.title}. ${i.summary}${i.recommendedNextStep?` Next: ${i.recommendedNextStep}`:''}`,220);
