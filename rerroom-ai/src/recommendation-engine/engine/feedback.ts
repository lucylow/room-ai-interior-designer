import type {Feedback,Recommendation} from '../core/types';
import {clamp} from '../core/math';
export interface FeedbackStats {accepted:number;rejected:number;edited:number;ignored:number;scoreBias:number;sampleSize:number;}
export const summarizeFeedback=(feedback:Feedback[]):FeedbackStats=>{
 const count=(x:string)=>feedback.filter(f=>f.action===x).length;const accepted=count('accepted'),rejected=count('rejected'),edited=count('edited'),ignored=count('ignored');
 const sample=feedback.length;const scoreBias=sample?clamp(.5+(accepted+edited*.5-rejected)/(sample*2)):.5;return {accepted,rejected,edited,ignored,scoreBias,sampleSize:sample};
};
export const personalizeFromFeedback=(items:Recommendation[],feedback:Feedback[]):Recommendation[]=>{
 const map=new Map(feedback.map(f=>[f.recommendationId,f.action]));return items.map(r=>{const a=map.get(r.id);const delta=a==='accepted'?.1:a==='edited'?.05:a==='rejected'?-0.12:a==='ignored'?-0.03:0;return {...r,score:clamp(r.score+delta)};}).sort((a,b)=>b.score-a.score);
};
