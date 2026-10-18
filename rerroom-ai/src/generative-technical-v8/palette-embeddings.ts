/** Mock palette embeddings. Deterministic demo module; replace data adapters with production services later. */
import { CreativeUserIntent, CreativeConcept, DesignSignal, RefinementRequest } from "./types";
import { STYLE_CATALOG } from "./style-catalog";
import { PALETTE_CATALOG } from "./palette-catalog";

export interface PaletteEmbeddingsResult {
  id: string;
  module: "palette-embeddings";
  score: number;
  confidence: number;
  rationale: string;
  data: Record<string, unknown>;
}

export const PALETTEEMBEDDINGS_MOCK_DATA = [
  {
    "id": "palette-embeddings-01",
    "roomType": "kitchen",
    "style": "art-deco",
    "palette": "p03",
    "priority": 0.67,
    "budget": 900,
    "note": "Mock palette embeddings mock rule 1: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "palette-embeddings-02",
    "roomType": "dining-room",
    "style": "new-nordic",
    "palette": "p04",
    "priority": 0.73,
    "budget": 1000,
    "note": "Mock palette embeddings mock rule 2: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "palette-embeddings-03",
    "roomType": "home-office",
    "style": "soft-industrial",
    "palette": "p05",
    "priority": 0.79,
    "budget": 1100,
    "note": "Mock palette embeddings mock rule 3: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "palette-embeddings-04",
    "roomType": "bathroom",
    "style": "desert-modern",
    "palette": "p06",
    "priority": 0.85,
    "budget": 1200,
    "note": "Mock palette embeddings mock rule 4: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "palette-embeddings-05",
    "roomType": "entryway",
    "style": "moody-modern",
    "palette": "p07",
    "priority": 0.55,
    "budget": 400,
    "note": "Mock palette embeddings mock rule 5: preserve architectural anchors and generate reversible aesthetic changes."
  }
] as const;

export function runPaletteEmbeddings(intent: CreativeUserIntent, index = 0): PaletteEmbeddingsResult {
  const style = STYLE_CATALOG.find((item) => item.id === intent.styles[0]) ?? STYLE_CATALOG.find((item) => item.id === "art-deco")!;
  const palette = PALETTE_CATALOG.find((item) => item.id === intent.paletteIds[0]) ?? PALETTE_CATALOG.find((item) => item.id === "p03")!;
  const row = PALETTEEMBEDDINGS_MOCK_DATA[index % PALETTEEMBEDDINGS_MOCK_DATA.length];
  const userFit = intent.roomType === row.roomType ? 0.18 : 0.04;
  const styleFit = intent.styles.includes(row.style) ? 0.22 : style.id === row.style ? 0.11 : 0.03;
  const paletteFit = intent.paletteIds.includes(row.palette) ? 0.16 : palette.id === row.palette ? 0.08 : 0.02;
  const constraintFit = intent.mustKeep.length >= 0 && intent.avoid.length >= 0 ? 0.12 : 0;
  const score = Math.min(1, 0.30 + userFit + styleFit + paletteFit + constraintFit + Number(row.priority) * 0.22);
  return {
    id: String(row.id),
    module: "palette-embeddings",
    score: Number(score.toFixed(4)),
    confidence: Number((0.72 + Number(row.priority) * 0.20).toFixed(4)),
    rationale: String(row.note),
    data: { roomType: row.roomType, style: row.style, palette: row.palette, budget: row.budget },
  };
}

export function explainPaletteEmbeddings(result: PaletteEmbeddingsResult): string[] {
  return [
    `Module ${result.module} matched room, style, and palette context.`,
    `Confidence ${Math.round(result.confidence * 100)}% reflects deterministic mock evidence.`,
    `Score ${result.score} is a demo ranking signal, not a construction decision.`,
    `Rationale: ${result.rationale}`,
  ];
}

export function mockPaletteEmbeddingsSignals(result: PaletteEmbeddingsResult): DesignSignal[] {
  return [
    { id: `${result.id}:room`, feature: "room-fit", value: result.score, confidence: result.confidence, source: "mock" },
    { id: `${result.id}:style`, feature: "style-fit", value: result.score * 0.93, confidence: result.confidence, source: "retrieval" },
    { id: `${result.id}:palette`, feature: "palette-fit", value: result.score * 0.91, confidence: result.confidence, source: "mock" },
  ];
}

export function buildPaletteEmbeddingsConcept(intent: CreativeUserIntent, index = 0): CreativeConcept {
  const style = STYLE_CATALOG.find((item) => item.id === intent.styles[0]) ?? STYLE_CATALOG[0];
  const palette = PALETTE_CATALOG.find((item) => item.id === intent.paletteIds[0]) ?? PALETTE_CATALOG[0];
  const result = runPaletteEmbeddings(intent, index);
  const row = PALETTEEMBEDDINGS_MOCK_DATA[index % PALETTEEMBEDDINGS_MOCK_DATA.length];
  return {
    id: `v8-palette-embeddings-${index}`,
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

export function applyPaletteEmbeddingsRefinement(concept: CreativeConcept, refinement: RefinementRequest): CreativeConcept {
  const strength = Math.max(0, Math.min(1, refinement.strength));
  return { ...concept, id: `${concept.id}:r`, title: `${concept.title} · ${refinement.command}`, prompt: `${concept.prompt}; refinement=${refinement.command}`, score: Number(Math.min(1, concept.score + strength * 0.04).toFixed(4)), seed: refinement.seed ?? concept.seed + 1 };
}

export function validatePaletteEmbeddings(intent: CreativeUserIntent, result: PaletteEmbeddingsResult): boolean {
  return intent.budgetCad >= 0 && result.score >= 0 && result.confidence <= 1;
}
