import type {Recommendation} from '../core/types';
export const effortHours=(r:Recommendation)=>({tiny:.25,easy:1,moderate:3,large:8,major:20}[r.effort]);
export const valuePerHour=(r:Recommendation)=>r.expectedImpact/Math.max(.25,effortHours(r));
export const orderByValuePerHour=(rows:Recommendation[])=>rows.slice().sort((a,b)=>valuePerHour(b)-valuePerHour(a));
