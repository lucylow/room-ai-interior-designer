import type {Candidate,Recommendation,UserPreferences,BudgetProfile,RoomContext} from '../core/types';
import {clamp} from '../core/math';
import {effortWeight,evidenceScore} from './factory';
export interface ScoreWeights { relevance:number; impact:number; confidence:number; effort:number; cost:number; novelty:number; preference:number; }
export const defaultWeights:ScoreWeights={relevance:.22,impact:.22,confidence:.16,effort:.08,cost:.1,novelty:.08,preference:.14};
export const preferenceMatch=(c:Candidate,p:UserPreferences):number=>{
  const text=(c.tags.join(' ')+' '+c.title).toLowerCase();
  let s=.5;for(const x of p.preferredStyles)if(text.includes(x.toLowerCase()))s+=.08;for(const x of p.avoidedStyles)if(text.includes(x.toLowerCase()))s-=.18;for(const x of p.dislikes)if(text.includes(x.toLowerCase()))s-=.12;return clamp(s);
};
export const costFit=(cost:number|undefined,b:BudgetProfile|undefined,p:UserPreferences):number=>{const cap=b?.hardCap??b?.total??p.budgetMax;if(cost==null||cap==null||cap<=0)return .65;return clamp(1-Math.max(0,cost-cap)/cap*2);};
export const scoreCandidate=(c:Candidate,room:RoomContext,p:UserPreferences,b:BudgetProfile|undefined,weights=defaultWeights):number=>clamp(
  c.baseScore*weights.relevance+c.impact*weights.impact+evidenceScore(c.evidence)*weights.confidence+effortWeight(c.effort)*weights.effort+
  costFit(c.cost,b,p)*weights.cost+(c.tags.includes('new')?.95:.7)*weights.novelty+preferenceMatch(c,p)*weights.preference
);
export const scoreRecommendations=(recs:Recommendation[],p:UserPreferences):Recommendation[]=>recs.map(r=>({...r,score:clamp(r.score*(.8+.2*(p.learningEnabled?1:.9))) })).sort((a,b)=>b.score-a.score);
export const calibrate=(raw:number,confidence:number):number=>clamp(raw*(.7+.3*confidence));
