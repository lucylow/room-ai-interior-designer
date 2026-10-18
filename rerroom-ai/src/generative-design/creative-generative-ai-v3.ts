
import type {GenerationRequest,GenerationResult,DesignConcept} from './core/types';
import {generateCreativeDesign,refineCreativeDesign} from './creative-v2/creative-design-engine-v2';
import {exportCreativeProject} from './creative-v2/export/creative-project-export';
import {normalizeCreativeFilters,filterSignals} from './creative-v2/engine/creative-filter-model';
import {revisionChoices} from './creative-v2/engine/revision-engine-v2';
export async function runCreativeGenerativeAI(request:GenerationRequest):Promise<GenerationResult>{return generateCreativeDesign(request);}
export function refineCreativeGenerativeAI(concept:DesignConcept,prompt:string):DesignConcept{return refineCreativeDesign(concept,prompt);}
export function creativeGenerativeSummary(request:GenerationRequest){const filters=normalizeCreativeFilters(request.intent);return {roomId:request.room.roomId,roomType:request.room.roomType,styleFilters:filters.styles,paletteFilters:filters.palettes,signals:filterSignals(request.room,filters),availableRevisions:revisionChoices().map(x=>x.id),geometryPreserved:request.intent.preserveArchitecture};}
export function exportCreativeResult(result:GenerationResult){return exportCreativeProject(result);}
