/** Maintenance variation. Deterministic demo module; replace data adapters with production services later. */
import { CreativeUserIntent, CreativeConcept, DesignSignal, RefinementRequest } from "./types";
import { STYLE_CATALOG } from "./style-catalog";
import { PALETTE_CATALOG } from "./palette-catalog";

export interface MaintenanceVariationResult {
  id: string;
  module: "maintenance-variation";
  score: number;
  confidence: number;
  rationale: string;
  data: Record<string, unknown>;
}

export const MAINTENANCEVARIATION_MOCK_DATA = [
  {
    "id": "maintenance-variation-01",
    "roomType": "bathroom",
    "style": "desert-modern",
    "palette": "p06",
    "priority": 0.85,
    "budget": 1200,
    "note": "Maintenance variation mock rule 1: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "maintenance-variation-02",
    "roomType": "entryway",
    "style": "moody-modern",
    "palette": "p07",
    "priority": 0.55,
    "budget": 400,
    "note": "Maintenance variation mock rule 2: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "maintenance-variation-03",
    "roomType": "nursery",
    "style": "eclectic-modern",
    "palette": "p08",
    "priority": 0.61,
    "budget": 500,
    "note": "Maintenance variation mock rule 3: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "maintenance-variation-04",
    "roomType": "studio",
    "style": "naturalist",
    "palette": "p09",
    "priority": 0.67,
    "budget": 600,
    "note": "Maintenance variation mock rule 4: preserve architectural anchors and generate reversible aesthetic changes."
  },
  {
    "id": "maintenance-variation-05",
    "roomType": "media-room",
    "style": "urban-soft",
    "palette": "p10",
    "priority": 0.73,
    "budget": 700,
    "note": "Maintenance variation mock rule 5: preserve architectural anchors and generate reversible aesthetic changes."
  }
] as const;

export function runMaintenanceVariation(intent: CreativeUserIntent, index = 0): MaintenanceVariationResult {
  const style = STYLE_CATALOG.find((item) => item.id === intent.styles[0]) ?? STYLE_CATALOG.find((item) => item.id === "desert-modern")!;
  const palette = PALETTE_CATALOG.find((item) => item.id === intent.paletteIds[0]) ?? PALETTE_CATALOG.find((item) => item.id === "p06")!;
  const row = MAINTENANCEVARIATION_MOCK_DATA[index % MAINTENANCEVARIATION_MOCK_DATA.length];
  const userFit = intent.roomType === row.roomType ? 0.18 : 0.04;
  const styleFit = intent.styles.includes(row.style) ? 0.22 : style.id === row.style ? 0.11 : 0.03;
  const paletteFit = intent.paletteIds.includes(row.palette) ? 0.16 : palette.id === row.palette ? 0.08 : 0.02;
  const constraintFit = intent.mustKeep.length >= 0 && intent.avoid.length >= 0 ? 0.12 : 0;
  const score = Math.min(1, 0.30 + userFit + styleFit + paletteFit + constraintFit + Number(row.priority) * 0.22);
  return {
    id: String(row.id),
    module: "maintenance-variation",
    score: Number(score.toFixed(4)),
    confidence: Number((0.72 + Number(row.priority) * 0.20).toFixed(4)),
    rationale: String(row.note),
    data: { roomType: row.roomType, style: row.style, palette: row.palette, budget: row.budget },
  };
}

export function explainMaintenanceVariation(result: MaintenanceVariationResult): string[] {
  return [
    `Module ${result.module} matched room, style, and palette context.`,
    `Confidence ${Math.round(result.confidence * 100)}% reflects deterministic mock evidence.`,
    `Score ${result.score} is a demo ranking signal, not a construction decision.`,
    `Rationale: ${result.rationale}`,
  ];
}

export function mockMaintenanceVariationSignals(result: MaintenanceVariationResult): DesignSignal[] {
  return [
    { id: `${result.id}:room`, feature: "room-fit", value: result.score, confidence: result.confidence, source: "mock" },
    { id: `${result.id}:style`, feature: "style-fit", value: result.score * 0.93, confidence: result.confidence, source: "retrieval" },
    { id: `${result.id}:palette`, feature: "palette-fit", value: result.score * 0.91, confidence: result.confidence, source: "mock" },
  ];
}

export function buildMaintenanceVariationConcept(intent: CreativeUserIntent, index = 0): CreativeConcept {
  const style = STYLE_CATALOG.find((item) => item.id === intent.styles[0]) ?? STYLE_CATALOG[0];
  const palette = PALETTE_CATALOG.find((item) => item.id === intent.paletteIds[0]) ?? PALETTE_CATALOG[0];
  const result = runMaintenanceVariation(intent, index);
  const row = MAINTENANCEVARIATION_MOCK_DATA[index % MAINTENANCEVARIATION_MOCK_DATA.length];
  return {
    id: `v8-maintenance-variation-${index}`,
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

export function applyMaintenanceVariationRefinement(concept: CreativeConcept, refinement: RefinementRequest): CreativeConcept {
  const strength = Math.max(0, Math.min(1, refinement.strength));
  return { ...concept, id: `${concept.id}:r`, title: `${concept.title} · ${refinement.command}`, prompt: `${concept.prompt}; refinement=${refinement.command}`, score: Number(Math.min(1, concept.score + strength * 0.04).toFixed(4)), seed: refinement.seed ?? concept.seed + 1 };
}

export function validateMaintenanceVariation(intent: CreativeUserIntent, result: MaintenanceVariationResult): boolean {
  return intent.budgetCad >= 0 && result.score >= 0 && result.confidence <= 1;
}
