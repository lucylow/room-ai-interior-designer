import type {RoomContext,UserPreferences,DesignStyleId,LayoutAdvice} from '../core/types';
import {layoutSpaceMetrics} from './layout-space-metrics';
import {LayoutSearchEngine} from './layout-search';
import {checkLayoutConsistency} from './layout-consistency';
export class LayoutAdviceEngine{
 recommend(room:RoomContext,prefs:UserPreferences,style:DesignStyleId,templates:LayoutAdvice[]){
  const metrics=layoutSpaceMetrics(room);
  const searched=new LayoutSearchEngine().search(room,prefs,templates,Math.max(24,templates.length*8));
  return searched.map(row=>{const check=checkLayoutConsistency(room,row);return {...row,score:row.score*check.score,confidence:row.confidence*check.score,tradeoffs:[...row.tradeoffs,...check.warnings]};}).filter(x=>x.confidence>.4);
 }
}
