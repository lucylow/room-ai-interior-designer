import type {Recommendation} from '../../core/types';
export interface ContrastSet{anchor:string;alternatives:string[];dimension:string;}
export const buildContrastSets=(rows:Recommendation[]):ContrastSet[]=>rows.slice(0,5).map(anchor=>{const alternatives=rows.filter(r=>r.id!==anchor.id).filter(r=>r.category===anchor.category).slice(0,3).map(r=>r.id);return {anchor:anchor.id,alternatives,dimension:anchor.category};});
