import type {Recommendation} from '../core/types';
export const disagreementIndex=(rows:Recommendation[])=>{if(rows.length<2)return 0;const mean=rows.reduce((s,r)=>s+r.score,0)/rows.length;return rows.reduce((s,r)=>s+Math.abs(r.score-mean),0)/rows.length;};
export const disagreementWarnings=(rows:Recommendation[])=>disagreementIndex(rows)>.22?['Recommendation scores are spread widely; show fewer options and add evidence.']:[];
