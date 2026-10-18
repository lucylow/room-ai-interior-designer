import type {Insight,Recommendation} from '../core/types';
export interface InsightLink {insightId:string;recommendationIds:string[];relationship:'direct'|'supporting'|'alternative';}
export const link=(insights:Insight[],recs:Recommendation[]):InsightLink[]=>insights.map(i=>({insightId:i.id,recommendationIds:recs.filter(r=>r.category===i.category).slice(0,4).map(r=>r.id),relationship:'direct'}));
