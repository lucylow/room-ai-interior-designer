import type {Insight} from '../core/types';import {clamp} from '../core/math';
export interface InsightPriority {id:string;urgency:number;confidence:number;impact:number;score:number;}
export const prioritize=(items:Insight[]):InsightPriority[]=>items.map(i=>{const sev={info:.2,low:.4,medium:.65,high:.85,critical:1}[i.severity];const impact=i.metric==null?.5:clamp(Math.abs(i.metric/100-.75));return {id:i.id,urgency:sev,confidence:i.confidence,impact,score:clamp(sev*.45+i.confidence*.3+impact*.25)}}).sort((a,b)=>b.score-a.score);
