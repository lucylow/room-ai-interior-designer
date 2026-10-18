import type {Recommendation,RoomContext,Policy} from '../core/types';
import {clamp} from '../core/math';
export interface Critique {recommendationId:string;issues:string[];adjustedScore:number;approved:boolean;}
const collisionRisk=(room:RoomContext,r:Recommendation):number=>r.actions.some(a=>a.type==='move-object')&&room.circulationScore<.45?.35:0;
export const critique=(items:Recommendation[],room:RoomContext,policy:Policy):Critique[]=>items.map(r=>{
 const issues:string[]=[];if(!r.evidence.length&&policy.requireEvidence)issues.push('missing evidence');if(r.actions.length>policy.maxActions)issues.push('too many actions');if(r.category==='shopping'&&!policy.allowShopping)issues.push('shopping disabled');const risk=collisionRisk(room,r);if(risk>.2)issues.push('movement may reduce circulation');
 const costPenalty=r.estimatedCost==null?0:Math.min(.12,r.estimatedCost/10000);const adjusted=clamp(r.score-costPenalty-risk);return {recommendationId:r.id,issues,adjustedScore:adjusted,approved:issues.length===0};
});
