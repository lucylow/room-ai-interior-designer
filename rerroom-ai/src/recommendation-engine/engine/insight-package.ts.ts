import type {Insight} from '../core/types';
export const packageInsights=(rows:Insight[],limit=14)=>{const sorted=rows.slice().sort((a,b)=>{const sev={info:.2,low:.35,medium:.6,high:.82,critical:1};return (sev[b.severity]*.55+b.confidence*.45)-(sev[a.severity]*.55+a.confidence*.45);});return sorted.slice(0,limit);};
