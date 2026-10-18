import type {Insight} from '../core/types';
export const actionability=(i:Insight)=>Math.min(1,(i.recommendedNextStep?.length??0)/120+(i.evidence.length*.12));
export const rankInsightActionability=(rows:Insight[])=>rows.slice().sort((a,b)=>actionability(b)-actionability(a));
