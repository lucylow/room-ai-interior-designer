import type {Feedback} from '../core/types';import {clamp} from '../core/math';
export const decayedWeight=(feedback:Feedback,now=Date.now(),halfLifeDays=21)=>Math.pow(.5,Math.max(0,now-feedback.createdAt)/(halfLifeDays*86400000));
export const weightedFeedback=(feedback:Feedback[],now=Date.now())=>feedback.map(f=>({feedback:f,weight:decayedWeight(f,now)}));
export const acceptanceSignal=(feedback:Feedback[],now=Date.now())=>{const rows=weightedFeedback(feedback,now);const den=rows.reduce((s,x)=>s+x.weight,0);if(!den)return .5;const num=rows.reduce((s,x)=>s+x.weight*((x.feedback.action==='accepted'||x.feedback.action==='edited')?1:0),0);return clamp(num/den);};
