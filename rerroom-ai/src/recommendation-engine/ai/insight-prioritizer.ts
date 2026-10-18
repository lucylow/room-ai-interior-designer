import type {Insight} from '../core/types';
export const priorityScore=(i:Insight)=>{const sev={info:.2,low:.35,medium:.6,high:.82,critical:1}[i.severity];const direction=i.direction==='declining'?.2:i.direction==='improving'?.05:0;return Math.min(1,sev*.6+i.confidence*.3+direction);};
export const prioritizeInsights=(rows:Insight[])=>rows.slice().sort((a,b)=>priorityScore(b)-priorityScore(a));
