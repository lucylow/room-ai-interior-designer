/** Recommendation evidence. Deterministic demo module; replace data adapters with production services later. */
import { CreativeUserIntent, CreativeConcept, DesignSignal, RefinementRequest } from "./types";
import { STYLE_CATALOG } from "./style-catalog";
import { PALETTE_CATALOG } from "./palette-catalog";

export interface RecommendationEvidenceResult {
  id: string;
  module: "recommendation-evidence";
  score: number;
  confidence: number;
  rationale: string;
  data: Record<string, unknown>;
}

export const RECOMMENDATIONEVIDENCE_MOCK_DATA = [
  {
    "id": "recommendation-evidence-01",
    "roomType": "reading-room",
    "style": "craft-modern",
    "palette": "p12",
    "priority": 0.85,
    "budget": 1200,
    "note": "Recommendation evidence mock rule 1: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "recommendation-evidence-02",
    "roomType": "living-room",
    "style": "modern",
    "palette": "p01",
    "priority": 0.55,
    "budget": 400,
    "note": "Recommendation evidence mock rule 2: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "recommendation-evidence-03",
    "roomType": "bedroom",
    "style": "minimalist",
    "palette": "p02",
    "priority": 0.61,
    "budget": 500,
    "note": "Recommendation evidence mock rule 3: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "recommendation-evidence-04",
    "roomType": "kitchen",
    "style": "scandinavian",
    "palette": "p03",
    "priority": 0.67,
    "budget": 600,
    "note": "Recommendation evidence mock rule 4: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "recommendation-evidence-05",
    "roomType": "dining-room",
    "style": "industrial",
    "palette": "p04",
    "priority": 0.73,
    "budget": 700,
    "note": "Recommendation evidence mock rule 5: preserve architectural anchors and generate reversible aesthetic changes."
  }
] as const;

export function runRecommendationEvidence(intent: CreativeUserIntent, index = 0): RecommendationEvidenceResult {
  const style = STYLE_CATALOG.find((item) => item.id === intent.styles[0]) ?? STYLE_CATALOG.find((item) => item.id === "craft-modern")!;
  const palette = PALETTE_CATALOG.find((item) => item.id === intent.paletteIds[0]) ?? PALETTE_CATALOG.find((item) => item.id === "p12")!;
  const row = RECOMMENDATIONEVIDENCE_MOCK_DATA[index % RECOMMENDATIONEVIDENCE_MOCK_DATA.length];
  const userFit = intent.roomType === row.roomType ? 0.18 : 0.04;
  const styleFit = intent.styles.includes(row.style) ? 0.22 : style.id === row.style ? 0.11 : 0.03;
  const paletteFit = intent.paletteIds.includes(row.palette) ? 0.16 : palette.id === row.palette ? 0.08 : 0.02;
  const constraintFit = intent.mustKeep.length >= 0 && intent.avoid.length >= 0 ? 0.12 : 0;
  const score = Math.min(1, 0.30 + userFit + styleFit + paletteFit + constraintFit + Number(row.priority) * 0.22);
  return {
    id: String(row.id),
    module: "recommendation-evidence",
    score: Number(score.toFixed(4)),
    confidence: Number((0.72 + Number(row.priority) * 0.20).toFixed(4)),
    rationale: String(row.note),
    data: { roomType: row.roomType, style: row.style, palette: row.palette, budget: row.budget },
  };
}

export function explainRecommendationEvidence(result: RecommendationEvidenceResult): string[] {
  return [
    `Module ${result.module} matched room, style, and palette context.`,
    `Confidence ${Math.round(result.confidence * 100)}% reflects deterministic mock evidence.`,
    `Score ${result.score} is a demo ranking signal, not a construction decision.`,
    `Rationale: ${result.rationale}`,
  ];
}

export function mockRecommendationEvidenceSignals(result: RecommendationEvidenceResult): DesignSignal[] {
  return [
    { id: `${result.id}:room`, feature: "room-fit", value: result.score, confidence: result.confidence, source: "mock" },
    { id: `${result.id}:style`, feature: "style-fit", value: result.score * 0.93, confidence: result.confidence, source: "retrieval" },
    { id: `${result.id}:palette`, feature: "palette-fit", value: result.score * 0.91, confidence: result.confidence, source: "mock" },
  ];
}

export function buildRecommendationEvidenceConcept(intent: CreativeUserIntent, index = 0): CreativeConcept {
  const style = STYLE_CATALOG.find((item) => item.id === intent.styles[0]) ?? STYLE_CATALOG[0];
  const palette = PALETTE_CATALOG.find((item) => item.id === intent.paletteIds[0]) ?? PALETTE_CATALOG[0];
  const result = runRecommendationEvidence(intent, index);
  const row = RECOMMENDATIONEVIDENCE_MOCK_DATA[index % RECOMMENDATIONEVIDENCE_MOCK_DATA.length];
  return {
    id: `v8-recommendation-evidence-${index}`,
    styleId: String(row.style),
    paletteId: String(row.palette),
    roomType: intent.roomType,
    title: `${String(row.style)} / ${String(row.palette)} / ${intent.roomType}`,
    prompt: `${style.label} interior concept with ${palette.name} palette; ${intent.prompt}`,
    negativePrompt: "warped geometry, blocked openings, impossible dimensions, floating furniture, excessive clutter",
    layoutAdvice: ["Preserve doors/windows", "Maintain primary circulation", "Anchor furniture to room geometry"],
    materials: style.preferredMaterials.slice(0, 3),
    lighting: style.lightingBias.slice(0, 3),
    tags: [String(row.style), String(row.palette), intent.roomType, "demo", "iterative"],
    score: result.score,
    confidence: result.confidence,
    seed: intent.seed ?? 82000 + index,
  };
}

export function applyRecommendationEvidenceRefinement(concept: CreativeConcept, refinement: RefinementRequest): CreativeConcept {
  const strength = Math.max(0, Math.min(1, refinement.strength));
  return { ...concept, id: `${concept.id}:r`, title: `${concept.title} · ${refinement.command}`, prompt: `${concept.prompt}; refinement=${refinement.command}`, score: Number(Math.min(1, concept.score + strength * 0.04).toFixed(4)), seed: refinement.seed ?? concept.seed + 1 };
}

export function validateRecommendationEvidence(intent: CreativeUserIntent, result: RecommendationEvidenceResult): boolean {
  return intent.budgetCad >= 0 && result.score >= 0 && result.confidence <= 1;
}
