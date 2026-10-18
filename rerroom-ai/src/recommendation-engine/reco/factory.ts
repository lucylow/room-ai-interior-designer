import type {Action,Candidate,Effort,Evidence,Recommendation} from '../core/types';
import {clamp} from '../core/math';
export const candidate=(x:Omit<Candidate,'id'> & {id?:string}):Candidate=>({id:x.id ?? `cand-${Date.now()}-${Math.random().toString(16).slice(2)}`,...x});
export const recommendationFromCandidate=(c:Candidate,now:number,modelVersion='local-ensemble'):Recommendation=>({id:c.id,category:c.category,title:c.title,summary:c.title,rationale:`Generated from ${c.source} evidence and spatial preference signals.`,score:clamp(c.baseScore),confidence:clamp(c.evidence.reduce((s,e)=>s+e.confidence,0)/Math.max(1,c.evidence.length)),effort:c.effort,estimatedCost:c.cost,currency:c.cost==null?undefined:'CAD',expectedImpact:clamp(c.impact),evidence:c.evidence,actions:c.actions,tradeoffs:c.tradeoffs,alternatives:c.alternatives,tags:c.tags,createdAt:now,modelVersion});
export const action=(type:Action['type'],payload:Action['payload'],targetId?:string):Action=>({type,targetId,payload});
export const effortWeight=(e:Effort):number=>({tiny:1,easy:.92,moderate:.75,large:.5,major:.3}[e]);
export const evidenceScore=(e:Evidence[]):number=>e.length?e.reduce((s,x)=>s+x.confidence*(x.weight??1),0)/e.reduce((s,x)=>s+(x.weight??1),0):0;
