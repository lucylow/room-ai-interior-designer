import type {Recommendation,Policy} from '../core/types';
import {clamp} from '../core/math';
export const defaultPolicy:Policy={minConfidence:.45,minScore:.45,maxCostRatio:1, maxActions:4,allowShopping:true,allowConstruction:false,requireEvidence:true};
export const sanitizeRecommendation=(r:Recommendation,policy:Policy):Recommendation=>({...r,score:clamp(r.score),confidence:clamp(r.confidence),actions:r.actions.slice(0,policy.maxActions),evidence:r.evidence.slice(0,8)});
export const sanitizeAll=(items:Recommendation[],policy=defaultPolicy)=>items.map(r=>sanitizeRecommendation(r,policy));
