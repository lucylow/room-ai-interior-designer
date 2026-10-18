export type GeneratorMode = "mock" | "hybrid" | "remote" | "local";
export type DesignStyleId = string;
export type RoomType = string;
export type HexColor = string;

export interface CreativeUserIntent {
  roomType: RoomType;
  styles: DesignStyleId[];
  paletteIds: string[];
  budgetCad: number;
  mustKeep: string[];
  avoid: string[];
  layoutGoals: string[];
  prompt: string;
  seed?: number;
}

export interface DesignSignal {
  id: string;
  feature: string;
  value: number;
  confidence: number;
  source: "room" | "user" | "catalog" | "retrieval" | "mock";
}

export interface CreativeConcept {
  id: string;
  styleId: DesignStyleId;
  paletteId: string;
  roomType: RoomType;
  title: string;
  prompt: string;
  negativePrompt: string;
  layoutAdvice: string[];
  materials: string[];
  lighting: string[];
  tags: string[];
  score: number;
  confidence: number;
  seed: number;
}

export interface RefinementRequest {
  conceptId: string;
  command: string;
  strength: number;
  preserve: string[];
  seed?: number;
}

export interface MockGenerationRequest {
  intent: CreativeUserIntent;
  referenceImageId?: string;
  sourceSceneId?: string;
  mode: GeneratorMode;
  count: number;
}

export interface MockGenerationResult {
  concepts: CreativeConcept[];
  signals: DesignSignal[];
  retrievalTrace: string[];
  modelTrace: string[];
}

export interface ExplainableScore {
  dimension: string;
  contribution: number;
  rationale: string;
}
