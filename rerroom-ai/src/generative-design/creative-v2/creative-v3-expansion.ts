
import type {DesignConcept,DesignIntent,GenerationRequest,RoomContext} from '../core/types';
import type {CreativeDirection,CreativeFilterState,CreativeInsightCard,CreativeRunReport,CreativeSignal} from './types';
import {normalizeCreativeFilters,filterSignals} from './engine/creative-filter-model';
import {generateCreativeDesign} from './creative-design-engine-v2';
import {refineCreativeDesign} from './creative-design-engine-v2';
import {applyRevisionSeries} from './engine/revision-engine-v2';
import {aggregateLayoutAdvice} from './engine/layout-advice-aggregator';
import {styleChips,paletteChips,filterSummary} from './ui/creative-filter-view-model';
import {runCreativeStudioSuite} from './engine/creative-studio-suite';

export interface CreativeWorkspaceSnapshot {filters:CreativeFilterState;filterSummary:string;styleChips:number;paletteChips:number;layoutOptions:number;signals:CreativeSignal[];}
export function createCreativeWorkspaceSnapshot(room:RoomContext,intent:DesignIntent):CreativeWorkspaceSnapshot{
 const filters=normalizeCreativeFilters(intent);return {filters,filterSummary:filterSummary(filters),styleChips:styleChips(filters).length,paletteChips:paletteChips(filters).length,layoutOptions:aggregateLayoutAdvice(room).length,signals:filterSignals(room,filters)};
}
export async function generateFilteredCreativeWorkspace(request:GenerationRequest){return generateCreativeDesign(request);}
export function refineCreativeWorkspace(concept:DesignConcept,prompts:string[]):DesignConcept{return prompts.length?applyRevisionSeries(concept,prompts):concept;}
export function creativeStudioForConcept(room:RoomContext,concept:DesignConcept){return runCreativeStudioSuite(room,concept);}
export function creativeComparisonRows(concepts:DesignConcept[]){return concepts.map(c=>({id:c.id,style:c.styleId,palette:c.paletteId??'custom',score:Number(c.score.toFixed(3)),confidence:Number(c.confidence.toFixed(3)),geometryLocked:c.render.geometryLock,layout:c.layout[0]?.pattern??'open-flow'}));}
export function creativeWorkspaceReport(room:RoomContext,result:{concepts:DesignConcept[];insights:{length:number};warnings:string[];trace:string[]}):CreativeRunReport{const c=result.concepts[0];return {id:`workspace-report-${Date.now()}`,roomId:room.roomId,selectedStyle:c?.styleId??'modern',selectedPalette:c?.paletteId??'none',selectedLayout:String(c?.layout[0]?.pattern??'open-flow'),directions:result.concepts.length,revisions:0,insights:result.insights.length,warnings:result.warnings,trace:result.trace};}
