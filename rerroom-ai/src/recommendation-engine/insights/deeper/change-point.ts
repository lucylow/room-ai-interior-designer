import type {Insight} from '../../core/types';
export const detectChangePoint=(rows:Insight[],minimumGap=.12)=>{for(let i=2;i<rows.length;i++){const before=((rows[i-2].metric??0)+(rows[i-1].metric??0))/2;const after=rows[i].metric??0;if(Math.abs(after-before)>=minimumGap)return {index:i,gap:after-before};}return null;};
