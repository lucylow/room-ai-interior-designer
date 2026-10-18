
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function creative_coverage_meter(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(.4+concept.nextPrompts.length*.05+(concept.visualKeywords.length/20));
 return {id:'analysis-creative-coverage-meter',label:'Measure Requested Feature Coverage',score,confidence:.72,source:'creative-analysis',explanation:'measure requested feature coverage'};
}
export function creative_coverage_meterBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>creative_coverage_meter(room,c));}
