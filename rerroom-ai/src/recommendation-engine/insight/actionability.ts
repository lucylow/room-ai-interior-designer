import type {Insight,Recommendation} from '../core/types';import {clamp} from '../core/math';
export interface Actionability {insightId:string;linkedCount:number;hasNextStep:boolean;score:number;}
export const scoreActionability=(insights:Insight[],recs:Recommendation[]):Actionability[]=>insights.map(i=>{const linked=recs.filter(r=>r.category===i.category).length;return {insightId:i.id,linkedCount:linked,hasNextStep:Boolean(i.recommendedNextStep),score:clamp(linked*.12+(i.recommendedNextStep?.4:0)+i.confidence*.48)}});
