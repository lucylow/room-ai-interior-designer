
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function creative_palette_consistency(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(.5+(concept.paletteId? .25:0)+(concept.materials.length*.02));
 return {id:'analysis-creative-palette-consistency',label:'Estimate Palette Consistency Across Material Surfaces',score,confidence:.72,source:'creative-analysis',explanation:'estimate palette consistency across material surfaces'};
}
export function creative_palette_consistencyBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>creative_palette_consistency(room,c));}
