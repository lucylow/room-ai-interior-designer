import type {Recommendation} from '../core/types';
export interface ExperimentArm {id:string;name:string;weight:number;recommendations:Recommendation[];}
export interface ExperimentResult {winnerId?:string;arms:ExperimentArm[];exposure:number;}
export const normalizeArms=(arms:ExperimentArm[]):ExperimentArm[]=>{const total=arms.reduce((s,a)=>s+a.weight,0)||1;return arms.map(a=>({...a,weight:a.weight/total}));};
export const expose=(arms:ExperimentArm[],seed=0):ExperimentArm=>{const x=Math.abs(Math.sin(seed*12.9898)*43758.5453)%1;let cursor=0;for(const a of normalizeArms(arms)){cursor+=a.weight;if(x<=cursor)return a;}return arms.at(-1)!;};
