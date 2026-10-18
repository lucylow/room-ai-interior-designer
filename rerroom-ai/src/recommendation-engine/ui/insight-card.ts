import type {Insight} from '../core/types';
export interface InsightCardModel {id:string;title:string;severity:string;metricLabel?:string;summary:string;nextStep:string;confidence:number;}
export const toInsightCard=(i:Insight):InsightCardModel=>({id:i.id,title:i.title,severity:i.severity,metricLabel:i.metric==null?undefined:`${i.metric.toFixed(0)}${i.unit??''}`,summary:i.summary,nextStep:i.recommendedNextStep??'Preview related recommendations.',confidence:i.confidence});
