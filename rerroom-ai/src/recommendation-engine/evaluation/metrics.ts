import type {Recommendation} from '../core/types';import {mean} from '../core/math';
export interface RankingMetrics {n:number;meanScore:number;meanConfidence:number;meanImpact:number;costCoverage:number;}
export const rankingMetrics=(rs:Recommendation[]):RankingMetrics=>({n:rs.length,meanScore:mean(rs.map(r=>r.score)),meanConfidence:mean(rs.map(r=>r.confidence)),meanImpact:mean(rs.map(r=>r.expectedImpact)),costCoverage:rs.length?rs.filter(r=>r.estimatedCost!=null).length/rs.length:0});
export const topK=(rs:Recommendation[],k=5)=>rs.slice(0,k);
