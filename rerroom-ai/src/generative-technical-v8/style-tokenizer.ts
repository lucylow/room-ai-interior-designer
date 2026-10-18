/** Style tokenization. Deterministic demo module; replace data adapters with production services later. */
import { CreativeUserIntent, CreativeConcept, DesignSignal, RefinementRequest } from "./types";
import { STYLE_CATALOG } from "./style-catalog";
import { PALETTE_CATALOG } from "./palette-catalog";

export interface StyleTokenizerResult {
  id: string;
  module: "style-tokenizer";
  score: number;
  confidence: number;
  rationale: string;
  data: Record<string, unknown>;
}

export const STYLETOKENIZER_MOCK_DATA = [
  {
    "id": "style-tokenizer-01",
    "roomType": "studio",
    "style": "naturalist",
    "palette": "p09",
    "priority": 0.67,
    "budget": 600,
    "note": "Style tokenization mock rule 1: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "style-tokenizer-02",
    "roomType": "media-room",
    "style": "urban-soft",
    "palette": "p10",
    "priority": 0.73,
    "budget": 700,
    "note": "Style tokenization mock rule 2: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "style-tokenizer-03",
    "roomType": "guest-room",
    "style": "heritage-modern",
    "palette": "p11",
    "priority": 0.79,
    "budget": 800,
    "note": "Style tokenization mock rule 3: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "style-tokenizer-04",
    "roomType": "reading-room",
    "style": "craft-modern",
    "palette": "p12",
    "priority": 0.85,
    "budget": 900,
    "note": "Style tokenization mock rule 4: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "style-tokenizer-05",
    "roomType": "living-room",
    "style": "modern",
    "palette": "p01",
    "priority": 0.55,
    "budget": 1000,
    "note": "Style tokenization mock rule 5: preserve architectural anchors and generate reversible aesthetic changes."
  }
] as const;

export function runStyleTokenizer(intent: CreativeUserIntent, index = 0): StyleTokenizerResult {
  const style = STYLE_CATALOG.find((item) => item.id === intent.styles[0]) ?? STYLE_CATALOG.find((item) => item.id === "naturalist")!;
  const palette = PALETTE_CATALOG.find((item) => item.id === intent.paletteIds[0]) ?? PALETTE_CATALOG.find((item) => item.id === "p09")!;
  const row = STYLETOKENIZER_MOCK_DATA[index % STYLETOKENIZER_MOCK_DATA.length];
  const userFit = intent.roomType === row.roomType ? 0.18 : 0.04;
  const styleFit = intent.styles.includes(row.style) ? 0.22 : style.id === row.style ? 0.11 : 0.03;
  const paletteFit = intent.paletteIds.includes(row.palette) ? 0.16 : palette.id === row.palette ? 0.08 : 0.02;
  const constraintFit = intent.mustKeep.length >= 0 && intent.avoid.length >= 0 ? 0.12 : 0;
  const score = Math.min(1, 0.30 + userFit + styleFit + paletteFit + constraintFit + Number(row.priority) * 0.22);
  return {
    id: String(row.id),
    module: "style-tokenizer",
    score: Number(score.toFixed(4)),
    confidence: Number((0.72 + Number(row.priority) * 0.20).toFixed(4)),
    rationale: String(row.note),
    data: { roomType: row.roomType, style: row.style, palette: row.palette, budget: row.budget },
  };
}

export function explainStyleTokenizer(result: StyleTokenizerResult): string[] {
  return [
    `Module ${result.module} matched room, style, and palette context.`,
    `Confidence ${Math.round(result.confidence * 100)}% reflects deterministic mock evidence.`,
    `Score ${result.score} is a demo ranking signal, not a construction decision.`,
    `Rationale: ${result.rationale}`,
  ];
}

export function mockStyleTokenizerSignals(result: StyleTokenizerResult): DesignSignal[] {
  return [
    { id: `${result.id}:room`, feature: "room-fit", value: result.score, confidence: result.confidence, source: "mock" },
    { id: `${result.id}:style`, feature: "style-fit", value: result.score * 0.93, confidence: result.confidence, source: "retrieval" },
    { id: `${result.id}:palette`, feature: "palette-fit", value: result.score * 0.91, confidence: result.confidence, source: "mock" },
  ];
}

export function buildStyleTokenizerConcept(intent: CreativeUserIntent, index = 0): CreativeConcept {
  const style = STYLE_CATALOG.find((item) => item.id === intent.styles[0]) ?? STYLE_CATALOG[0];
  const palette = PALETTE_CATALOG.find((item) => item.id === intent.paletteIds[0]) ?? PALETTE_CATALOG[0];
  const result = runStyleTokenizer(intent, index);
  const row = STYLETOKENIZER_MOCK_DATA[index % STYLETOKENIZER_MOCK_DATA.length];
  return {
    id: `v8-style-tokenizer-${index}`,
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

export function applyStyleTokenizerRefinement(concept: CreativeConcept, refinement: RefinementRequest): CreativeConcept {
  const strength = Math.max(0, Math.min(1, refinement.strength));
  return { ...concept, id: `${concept.id}:r`, title: `${concept.title} · ${refinement.command}`, prompt: `${concept.prompt}; refinement=${refinement.command}`, score: Number(Math.min(1, concept.score + strength * 0.04).toFixed(4)), seed: refinement.seed ?? concept.seed + 1 };
}

export function validateStyleTokenizer(intent: CreativeUserIntent, result: StyleTokenizerResult): boolean {
  return intent.budgetCad >= 0 && result.score >= 0 && result.confidence <= 1;
}
