
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function creative_layout_consistency(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(.45+(concept.layout.length*.08)+room.circulationScore*.2);
 return {id:'analysis-creative-layout-consistency',label:'Estimate Layout Consistency',score,confidence:.72,source:'creative-analysis',explanation:'estimate layout consistency'};
}
export function creative_layout_consistencyBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>creative_layout_consistency(room,c));}
