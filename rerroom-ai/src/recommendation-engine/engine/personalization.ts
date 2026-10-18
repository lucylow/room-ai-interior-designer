import type {Recommendation,UserPreferences} from '../core/types';
import type {RecommendationMemory} from './memory';
import {clamp} from '../core/math';
export const personalize=(items:Recommendation,prefs:UserPreferences,memory:RecommendationMemory,roomId:string):Recommendation=>{
 const explicit=prefs.priorities.some(p=>p.toLowerCase()===items.category.toLowerCase())?.08:0;const historical=memory.categoryBias(roomId,items.category);return {...items,score:clamp(items.score+explicit+historical)};
};
export const personalizeList=(items:Recommendation[],prefs:UserPreferences,memory:RecommendationMemory,roomId:string)=>items.map(r=>personalize(r,prefs,memory,roomId)).sort((a,b)=>b.score-a.score);
