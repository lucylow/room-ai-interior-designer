
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function creative_style_consistency(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(.45+(concept.visualKeywords.filter((x:string)=>x.length>4).length/30));
 return {id:'analysis-creative-style-consistency',label:'Estimate Style Consistency Across Concept Fields',score,confidence:.72,source:'creative-analysis',explanation:'estimate style consistency across concept fields'};
}
export function creative_style_consistencyBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>creative_style_consistency(room,c));}
