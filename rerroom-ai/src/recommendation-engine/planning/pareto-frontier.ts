import type {Candidate} from '../core/types';
const dominates=(a:Candidate,b:Candidate)=>a.baseScore>=b.baseScore&&a.impact>=b.impact&&(a.cost??0)<=(b.cost??0)&&([a.baseScore,a.impact,-(a.cost??0)].some((v,i)=>[b.baseScore,b.impact,-(b.cost??0)][i]<v));
export const paretoFrontier=(rows:Candidate[]):Candidate[]=>rows.filter(a=>!rows.some(b=>a.id!==b.id&&dominates(b,a)));
export const frontierByCategory=(rows:Candidate[])=>Array.from(new Set(rows.map(r=>r.category))).map(c=>({category:c,items:paretoFrontier(rows.filter(r=>r.category===c))}));
