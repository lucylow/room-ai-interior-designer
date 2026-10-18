import {clamp,mean} from '../core/math';
export interface Arm {id:string;pulls:number;rewardSum:number;prior:number;}
export const sampleScore=(a:Arm):number=>(a.rewardSum+a.prior)/(a.pulls+1);
export const selectArm=(arms:Arm[]):Arm=>[...arms].sort((a,b)=>sampleScore(b)-sampleScore(a))[0];
export const updateArm=(a:Arm,reward:number):Arm=>({...a,pulls:a.pulls+1,rewardSum:a.rewardSum+clamp(reward, -1, 1)});
export const armMeans=(arms:Arm[]):number=>mean(arms.map(sampleScore));
