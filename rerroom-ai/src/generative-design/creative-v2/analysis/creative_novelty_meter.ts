
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function creative_novelty_meter(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(.35+(concept.materials.length*.04)+(concept.visualKeywords.length*.015));
 return {id:'analysis-creative-novelty-meter',label:'Estimate Novelty Without Structural Edits',score,confidence:.72,source:'creative-analysis',explanation:'estimate novelty without structural edits'};
}
export function creative_novelty_meterBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>creative_novelty_meter(room,c));}
