import type {RecommendationRequest} from '../core/types';
import {tokens,includesAny} from '../core/text';
export interface Intent {kind:'explain'|'compare'|'tighten-budget'|'style-change'|'move'|'add'|'remove'|'unknown';entities:string[];confidence:number;}
export const inferIntent=(prompt=''):Intent=>{
 const t=prompt.toLowerCase();const kind=includesAny(t,['why','explain'])?'explain':includesAny(t,['compare','difference'])?'compare':includesAny(t,['under','budget','cheaper'])?'tighten-budget':includesAny(t,['warmer','cooler','style','minimal','modern'])?'style-change':includesAny(t,['move','shift','closer','farther'])?'move':includesAny(t,['add','place','insert'])?'add':includesAny(t,['remove','delete'])?'remove':'unknown';
 return {kind,entities:tokens(prompt).slice(0,12),confidence:kind==='unknown'?.3:.82};
};
export const adaptRequest=(request:RecommendationRequest,intent:Intent):RecommendationRequest=>{
 if(intent.kind==='tighten-budget')return {...request,budget:request.budget?{...request.budget,flexibility:Math.min(request.budget.flexibility,.25)}:undefined,maxRecommendations:Math.min(request.maxRecommendations??10,8)};
 return request;
};
