
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function creative_tradeoff_meter(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(concept.score*.55+concept.confidence*.25+room.comfortScore*.2);
 return {id:'analysis-creative-tradeoff-meter',label:'Expose Quality Tradeoffs',score,confidence:.72,source:'creative-analysis',explanation:'expose quality tradeoffs'};
}
export function creative_tradeoff_meterBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>creative_tradeoff_meter(room,c));}
