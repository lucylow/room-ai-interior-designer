
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function batch_style_comparator(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(room.styleSignals[concept.styleId]??.5);
 return {id:'analysis-batch-style-comparator',label:'Compare Style Candidates Across The Same Room',score,confidence:.72,source:'creative-analysis',explanation:'compare style candidates across the same room'};
}
export function batch_style_comparatorBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>batch_style_comparator(room,c));}
