import type {Insight} from '../../core/types';
export const insightMomentum=(history:Insight[],window=6)=>{const rows=history.slice(-window);if(rows.length<2)return 0;let total=0;for(let i=1;i<rows.length;i++){const a=rows[i-1].metric??0,b=rows[i].metric??0;total+=b-a;}return total/(rows.length-1);};
export const momentumLabel=(history:Insight[])=>{const m=insightMomentum(history);return m>.05?'accelerating':m<-.05?'declining':'stable';};
