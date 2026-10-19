export type RoomType =
  | 'living_room' | 'bedroom' | 'kitchen' | 'dining_room' | 'home_office'
  | 'entryway' | 'bathroom' | 'nursery' | 'studio' | 'media_room'
  | 'guest_room' | 'reading_nook' | 'mudroom' | 'basement' | 'open_plan';

export type DesignStyle =
  | 'modern' | 'minimalist' | 'scandinavian' | 'industrial' | 'japandi'
  | 'mid_century' | 'organic_modern' | 'bohemian' | 'contemporary'
  | 'warm_minimal' | 'quiet_luxury' | 'coastal_modern' | 'modern_farmhouse'
  | 'transitional' | 'art_deco' | 'new_nordic' | 'soft_industrial'
  | 'desert_modern' | 'moody_modern' | 'eclectic_modern' | 'craft_modern'
  | 'heritage_modern' | 'urban_soft' | 'naturalist';

export interface DatasetRecord {
  id: string;
  task: 'generation' | 'refinement' | 'ranking' | 'preference' | 'grounding' | 'quality' | 'dialogue';
  roomType: RoomType;
  style: DesignStyle;
  paletteId: string;
  prompt: string;
  normalizedPrompt: string;
  hardConstraints: string[];
  softPreferences: string[];
  avoid: string[];
  spatialAnchors: string[];
  expectedSignals: string[];
  response: string;
  rationale: string;
  source: 'synthetic_demo' | 'designer_template' | 'simulation';
  qualityTier: 'gold' | 'silver' | 'review';
}

export interface PreferenceRecord {
  id: string;
  roomType: RoomType;
  favoriteStyles: DesignStyle[];
  favoritePalettes: string[];
  likedFeatures: string[];
  dislikedFeatures: string[];
  budgetCad: number;
  importance: Record<string, number>;
  currentGoal: string;
  confidence: number;
}

export interface FeedbackRecord {
  id: string;
  conceptId: string;
  action: 'accept' | 'reject' | 'save' | 'refine' | 'swap' | 'compare';
  dimension: 'style' | 'palette' | 'layout' | 'lighting' | 'furniture' | 'material' | 'budget';
  comment: string;
  delta: number;
  sessionTurn: number;
}

export interface SpatialGroundingRecord {
  id: string;
  roomType: RoomType;
  sourceSceneId: string;
  anchors: Array<{ id: string; kind: string; x: number; y: number; width: number; depth: number; immutable: boolean }>;
  candidatePlacement: { role: string; x: number; y: number; width: number; depth: number; rotation: number };
  expectedDecision: 'accept' | 'reject' | 'adjust';
  rationale: string;
}

export interface QualityCase {
  id: string;
  prompt: string;
  predictedIssue: 'duplicate_furniture' | 'geometry_drift' | 'palette_conflict' | 'style_drift' | 'clearance_risk' | 'budget_violation' | 'unsupported_claim';
  severity: 'low' | 'medium' | 'high' | 'critical';
  expectedAction: 'pass' | 'flag' | 'block' | 'repair';
  evidence: string[];
}

export interface RankingPair {
  id: string;
  roomType: RoomType;
  query: string;
  preferredConceptId: string;
  alternateConceptId: string;
  reasons: string[];
  hardConstraintsSatisfied: boolean;
}

export interface BenchmarkCase {
  id: string;
  category: string;
  input: Record<string, unknown>;
  expected: Record<string, unknown>;
  tolerance: number;
}
