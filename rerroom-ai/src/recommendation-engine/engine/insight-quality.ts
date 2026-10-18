import type {Insight} from '../core/types';
export interface InsightQuality{id:string;score:number;issues:string[];}
export const insightQuality=(rows:Insight[]):InsightQuality[]=>rows.map(i=>{const issues:string[]=[];if(!i.evidence.length)issues.push('No evidence');if(i.confidence<.5)issues.push('Low confidence');if(!i.recommendedNextStep)issues.push('No next step');const score=Math.max(0,1-issues.length*.25);return {id:i.id,score,issues};});
