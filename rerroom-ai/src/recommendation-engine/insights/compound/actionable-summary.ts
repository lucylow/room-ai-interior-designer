import type {Insight} from '../../core/types';
export const actionableSummary=(rows:Insight[])=>rows.filter(i=>Boolean(i.recommendedNextStep)).sort((a,b)=>b.confidence-a.confidence).slice(0,6).map(i=>({id:i.id,title:i.title,nextStep:i.recommendedNextStep??'',confidence:i.confidence,severity:i.severity}));
