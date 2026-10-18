
import type {GenerationRequest,GenerationResult,DesignConcept,DesignInsight} from '../core/types';
import type {CreativeDirection,CreativeRunReport} from './types';
import {normalizeCreativeFilters,filterSignals} from './engine/creative-filter-model';
import {makeModernDirection,makeMinimalistDirection,makeScandinavianDirection,makeIndustrialDirection,makeJapandiDirection,makeMid_centuryDirection,makeBohemianDirection,makeOrganic_modernDirection,makeContemporaryDirection,makeWarm_minimalDirection} from './styles';
import {rankPalettes} from './engine/palette-mix-engine';
import {aggregateLayoutAdvice} from './engine/layout-advice-aggregator';
import {createGeneratedConcept} from './engine/concept-factory-v2';
import {selectCreativeConcepts,selectionInsight} from './engine/creative-selection-engine';
import {generateCreativeInsights} from './engine/creative-insight-engine-v2';
import {buildVariations} from './engine/concept-variation-engine';
import {recommendRevision,applyRevisionById} from './engine/revision-engine-v2';
import {clamp,stableSort} from '../core/utils';
import {evaluateCreativeControlSuite} from './engine/creative-control-suite';

const directionBuilders:any={modern:makeModernDirection,minimalist:makeMinimalistDirection,scandinavian:makeScandinavianDirection,industrial:makeIndustrialDirection,japandi:makeJapandiDirection,'mid-century':makeMid_centuryDirection,bohemian:makeBohemianDirection,'organic-modern':makeOrganic_modernDirection,contemporary:makeContemporaryDirection,'warm-minimal':makeWarm_minimalDirection};
export async function generateCreativeDesign(req:GenerationRequest):Promise<GenerationResult>{
 const started=Date.now();const filters=normalizeCreativeFilters(req.intent);const signals=filterSignals(req.room,filters);const trace=[`filters styles=${filters.styles.length} palettes=${filters.palettes.length}`];
 const styles=filters.styles.length?filters.styles:(Object.keys(directionBuilders) as string[]);const paletteRanks=rankPalettes(req.room,{...req.intent.colors,paletteIds:filters.palettes});const layouts=aggregateLayoutAdvice(req.room);trace.push(`styles=${styles.length}`,`palettes=${paletteRanks.length}`,`layouts=${layouts.length}`);
 const concepts:DesignConcept[]=[];
 for(let i=0;i<styles.length;i++){
  const sid=styles[i];const direction:CreativeDirection=directionBuilders[sid](req.room,req.intent.userPrompt);const chosenPalette=paletteRanks[i%Math.max(1,paletteRanks.length)]?.paletteIds[0];const adjusted={...direction,paletteId:chosenPalette??direction.paletteId,score:clamp(direction.score+(chosenPalette?req.room.colorSignals[chosenPalette]??0:0)*.08)};
  concepts.push(createGeneratedConcept(req.room,req.intent,adjusted,i));
 }
 if(req.previousConcept&&req.feedback?.length){const latest=req.feedback[req.feedback.length-1];const revision=latest.reason?recommendRevision(req.previousConcept,latest.reason):'warmer';concepts.unshift(applyRevisionById(req.previousConcept,revision));trace.push(`revised previous concept=${revision}`);}
 const controlSignals=concepts.length?evaluateCreativeControlSuite(req.room,concepts[0]).slice(0,24):[]; trace.push(`creative controls=${controlSignals.length}`);
 const controlBoost=controlSignals.length?controlSignals.reduce((sum,x)=>sum+x.score*x.confidence,0)/controlSignals.reduce((sum,x)=>sum+x.confidence,0):0;
 const ranked=stableSort(concepts,c=>clamp(c.score+controlBoost*.04));const selected=selectCreativeConcepts(req.room,ranked,signals).slice(0,req.candidateCount??8);const top=selected[0];const insights:DesignInsight[]=top?[...generateCreativeInsights(req.room,top),selectionInsight(selected)]:[selectionInsight(selected)];
 const warnings=req.room.measurements.confidence<.6?['Room measurement confidence is below preferred creative threshold. Verify source dimensions before construction use.']:[];
 return {concepts:selected,insights,selected:top,rejectedConcepts:ranked.slice(selected.length).map(c=>c.id),warnings,metrics:{durationMs:Date.now()-started,conceptsGenerated:concepts.length,conceptsReturned:selected.length,stylesConsidered:styles.length,palettesConsidered:paletteRanks.length,layoutsConsidered:layouts.length,topScore:top?.score??0,topConfidence:top?.confidence??0},trace};
}

export function refineCreativeDesign(concept:DesignConcept,prompt:string):DesignConcept{return applyRevisionById(concept,recommendRevision(concept,prompt));}
export function creativeReport(result:GenerationResult):CreativeRunReport{const c=result.selected??result.concepts[0];return {id:`report-${Date.now()}`,roomId:'unknown',selectedStyle:c?.styleId??'modern',selectedPalette:c?.paletteId??'none',selectedLayout:c?.layout?.[0]?.pattern?.toString()??'open-flow',directions:result.metrics.stylesConsidered??0,revisions:0,insights:result.insights.length,warnings:result.warnings,trace:result.trace};}
