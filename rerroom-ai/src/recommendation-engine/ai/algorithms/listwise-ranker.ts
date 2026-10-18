import type {Recommendation} from '../../core/types';
export interface ListwiseRow{id:string;position:number;score:number;normalized:number;}
export const listwiseRank=(rows:Recommendation[]):ListwiseRow[]=>{const max=Math.max(...rows.map(r=>r.score),0);const min=Math.min(...rows.map(r=>r.score),0);const range=Math.max(.0001,max-min);return rows.slice().sort((a,b)=>b.score-a.score).map((r,position)=>({id:r.id,position:position+1,score:r.score,normalized:(r.score-min)/range}));};
