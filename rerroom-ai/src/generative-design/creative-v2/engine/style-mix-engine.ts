
import type {DesignStyleId,RoomContext,StyleFilter} from '../../core/types';
import type {CreativeDirection} from '../types';
import {STYLE_BY_ID,STYLE_LIBRARY} from '../../styles';
import {clamp} from '../../core/utils';

export interface StyleMixCandidate {id:string;styles:Array<{id:DesignStyleId;weight:number}>;score:number;confidence:number;language:string[];}
export function normalizeMix(filter:StyleFilter,limit=3):Array<{id:DesignStyleId;weight:number}>{
 const ids=(filter.enabled.length?filter.enabled:STYLE_LIBRARY.map(s=>s.id)).slice(0,limit);
 const raw=ids.map((id,i)=>({id,weight:filter.blendWeight?.[id]??(1/(i+1))}));
 const sum=raw.reduce((a,b)=>a+b.weight,0)||1;return raw.map(x=>({id:x.id,weight:x.weight/sum}));
}
export function scoreMix(room:RoomContext,filter:StyleFilter):StyleMixCandidate{
 const mix=normalizeMix(filter);const score=clamp(mix.reduce((a,x)=>a+(room.styleSignals[x.id]??.5)*x.weight,0));
 const language=mix.flatMap(x=>STYLE_BY_ID[x.id].keywords.slice(0,2));
 return {id:`mix-${mix.map(x=>x.id).join('-')}`,styles:mix,score,confidence:clamp(.55+room.measurements.confidence*.3),language};
}
export function generateMixes(room:RoomContext,filter:StyleFilter):StyleMixCandidate[]{
 const base=scoreMix(room,filter);const mixes=[base];
 for(let i=0;i<Math.min(3,STYLE_LIBRARY.length);i++){
  const copy:{enabled:DesignStyleId[];excluded:DesignStyleId[];primary?:DesignStyleId;intensity:'balanced';blendWeight?:Partial<Record<DesignStyleId,number>>}={enabled:[...filter.enabled],excluded:[...filter.excluded],primary:filter.primary,intensity:'balanced',blendWeight:{...filter.blendWeight}};
  copy.blendWeight={...copy.blendWeight,[STYLE_LIBRARY[i].id]:.4};
  const candidate=scoreMix(room,copy);if(!mixes.some(m=>m.id===candidate.id))mixes.push(candidate);
 }
 return mixes.sort((a,b)=>b.score-a.score);
}
