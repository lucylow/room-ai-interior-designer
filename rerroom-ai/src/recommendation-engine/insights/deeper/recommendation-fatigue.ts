import type {Recommendation} from '../../core/types';
export const fatigueScore=(rows:Recommendation[])=>{if(rows.length<2)return 0;const titles=new Set(rows.map(r=>r.title.toLowerCase()));const duplicateRate=1-titles.size/rows.length;const ignored=rows.filter(r=>r.tags.includes('ignored')).length/rows.length;return Math.min(1,duplicateRate*.7+ignored*.3);};
export const fatigueAction=(score:number)=>score>.55?'reduce-repeat-suggestions':score>.3?'diversify-next-batch':'normal';
