
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function batch_palette_comparator(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(room.colorSignals[concept.paletteId??'']??.5);
 return {id:'analysis-batch-palette-comparator',label:'Compare Palette Candidates Without Rebuilding Geometry',score,confidence:.72,source:'creative-analysis',explanation:'compare palette candidates without rebuilding geometry'};
}
export function batch_palette_comparatorBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>batch_palette_comparator(room,c));}
