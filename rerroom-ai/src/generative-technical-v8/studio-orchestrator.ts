import { CreativeConcept, MockGenerationRequest, MockGenerationResult, RefinementRequest, DesignSignal } from "./types";
import { STYLE_CATALOG } from "./style-catalog";
import { PALETTE_CATALOG } from "./palette-catalog";
import { buildStyleFilterConcept, runStyleFilter, mockStyleFilterSignals } from "./style-filter";
import { buildPaletteFilterConcept, runPaletteFilter, mockPaletteFilterSignals } from "./palette-filter";
import { buildLayoutAdvisorConcept } from "./layout-advisor";
import { buildPromptPlannerConcept } from "./prompt-planner";
import { buildVariationGeneratorConcept } from "./variation-generator";
import { buildCreativeSearchConcept } from "./creative-search";
import { buildConceptRankingConcept } from "./concept-ranking";
import { buildDesignRationaleConcept } from "./design-rationale";

export interface StudioRun { requestId: string; concepts: CreativeConcept[]; signals: DesignSignal[]; trace: string[]; warnings: string[]; }

const MODULES = [buildStyleFilterConcept, buildPaletteFilterConcept, buildLayoutAdvisorConcept, buildPromptPlannerConcept, buildVariationGeneratorConcept, buildCreativeSearchConcept, buildConceptRankingConcept, buildDesignRationaleConcept];

export function generateCreativeStudio(request: MockGenerationRequest): MockGenerationResult {
  const trace: string[] = [];
  const concepts: CreativeConcept[] = [];
  const signals: DesignSignal[] = [];
  const styles = request.intent.styles.length ? request.intent.styles : STYLE_CATALOG.slice(0, 4).map((s) => s.id);
  const palettes = request.intent.paletteIds.length ? request.intent.paletteIds : PALETTE_CATALOG.slice(0, 4).map((p) => p.id);
  styles.slice(0, 4).forEach((styleId, index) => {
    const intent = { ...request.intent, styles: [styleId], paletteIds: [palettes[index % palettes.length]] };
    MODULES.forEach((module, moduleIndex) => {
      const concept = module(intent, (request.intent.seed ?? 73000) + index * 17 + moduleIndex);
      concepts.push(concept);
      trace.push(`${module.name || "anonymous"}:${concept.id}`);
    });
    const styleResult = runStyleFilter(intent, index);
    const paletteResult = runPaletteFilter(intent, index);
    signals.push(...mockStyleFilterSignals(styleResult), ...mockPaletteFilterSignals(paletteResult));
  });
  concepts.sort((a, b) => b.score - a.score);
  return {
    concepts: concepts.slice(0, request.count * 2),
    signals,
    retrievalTrace: trace.slice(0, 32),
    modelTrace: [`mode=${request.mode}`, `styles=${styles.join(",")}`, `palettes=${palettes.join(",")}`, `count=${request.count}`],
  };
}

export function refineCreativeStudio(concept: CreativeConcept, refinement: RefinementRequest): CreativeConcept {
  const delta = refinement.strength * 0.03;
  const preservePenalty = refinement.preserve.length ? 0.01 : 0;
  return { ...concept, id: `${concept.id}:${refinement.command.replace(/\s+/g, "-").toLowerCase()}`, title: `${concept.title} · ${refinement.command}`, prompt: `${concept.prompt}; preserve=${refinement.preserve.join(",")}`, score: Math.min(1, Number((concept.score + delta - preservePenalty).toFixed(4))), seed: refinement.seed ?? concept.seed + 1 };
}

export function validateStudio(result: MockGenerationResult): string[] {
  const warnings: string[] = [];
  if (!result.concepts.length) warnings.push("No concepts generated");
  if (result.concepts.some((c) => c.confidence < 0.6)) warnings.push("Low-confidence concept in result set");
  if (result.concepts.some((c) => !c.negativePrompt.includes("warped geometry"))) warnings.push("Missing geometry guardrail");
  return warnings;
}
