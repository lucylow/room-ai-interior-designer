import type {RoomContext,StyleFilter,DesignStyleId} from '../core/types';
import {StyleFilterEngine} from '../filters/style-filter-engine';
export interface StyleReasoning {primary:DesignStyleId;blend:Array<{styleId:DesignStyleId;weight:number}>;confidence:number;reasons:string[];warnings:string[];}
export const reasonStyle=(room:RoomContext,filter:StyleFilter,prompt:string,engine=new StyleFilterEngine()):StyleReasoning=>{
  const matches=engine.match(room,filter,prompt); const top=matches[0]??{styleId:'modern' as DesignStyleId,score:.4,reasons:[],conflicts:[]};
  const blend=engine.resolveBlend({...filter,enabled:filter.enabled.length?filter.enabled:[top.styleId]},3);
  const confidence=Math.min(.98,.45+top.score*.45+room.measurements.confidence*.1);
  const warnings=top.conflicts.slice();
  if(!room.measurements.confidence)warnings.push('Room measurement confidence is missing.');
  return {primary:top.styleId,blend,confidence,reasons:top.reasons,warnings};
};
