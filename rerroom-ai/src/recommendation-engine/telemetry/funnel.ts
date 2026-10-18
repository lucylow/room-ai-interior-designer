import type {AIEvent} from './event-types';
export interface FunnelStep{name:string;count:number;rate:number;}
export const recommendationFunnel=(events:AIEvent[]):FunnelStep[]=>{const steps=['recommendation_generated','recommendation_viewed','recommendation_accepted'] as const;const total=events.filter(e=>e.name===steps[0]).length;return steps.map((step,index)=>{const count=events.filter(e=>e.name===step).length;return {name:step,count,rate:total?count/total:0};});};
