import type {Recommendation,Insight} from '../core/types';import {toCard} from './recommendation-card';import {toInsightCard} from './insight-card';
export interface AIDashboardModel {recommendations:ReturnType<typeof toCard>[];insights:ReturnType<typeof toInsightCard>[];empty:boolean;loading:boolean;warning?:string;}
export const dashboard=(recs:Recommendation[],insights:Insight[],loading=false,warning?:string):AIDashboardModel=>({recommendations:recs.map(toCard),insights:insights.map(toInsightCard),empty:!recs.length&&!insights.length,loading,warning});
