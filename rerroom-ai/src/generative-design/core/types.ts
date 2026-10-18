export type DesignStyleId =
  | 'modern' | 'minimalist' | 'scandinavian' | 'industrial' | 'japandi'
  | 'mid-century' | 'bohemian' | 'organic-modern' | 'contemporary' | 'warm-minimal';

export type StyleIntensity = 'subtle' | 'balanced' | 'expressive' | 'editorial';
export type GenerationMode = 'photo-restyle' | 'rough-3d-restyle' | 'cad-bim-overlay' | 'concept-board' | 'layout-only' | 'hybrid';
export type RefinementMode = 'keep-geometry' | 'keep-layout' | 'keep-selected' | 'explore' | 'surgical';
export type ColorTemperature = 'warm' | 'neutral' | 'cool' | 'mixed';
export type SurfaceKind = 'wall' | 'floor' | 'ceiling' | 'trim' | 'cabinet' | 'counter' | 'upholstery' | 'metal' | 'accent';
export type LayoutPattern = 'conversation' | 'focal-wall' | 'open-flow' | 'reading-nook' | 'work-zone' | 'dining-zone' | 'gallery' | 'symmetry' | 'asymmetry' | 'flexible';

export interface Hsl { h:number; s:number; l:number; }
export interface Rgb { r:number; g:number; b:number; }
export interface ColorToken { name:string; hex:string; hsl?:Hsl; role:'background'|'surface'|'primary'|'secondary'|'accent'|'text'|'metal'|'natural'; temperature:ColorTemperature; lightness:number; saturation:number; }
export interface ColorPalette {
  id:string; name:string; description:string; tags:string[]; colors:ColorToken[];
  contrastTarget:number; warmth:number; saturationLevel:number; naturalness:number;
}
export interface StyleProfile {
  id:DesignStyleId; name:string; summary:string; keywords:string[]; avoidKeywords:string[];
  materials:string[]; furnitureShapes:string[]; lightingTerms:string[]; architecturalTerms:string[];
  decorTerms:string[]; paletteFamilies:string[]; preferredLayoutPatterns:LayoutPattern[];
  textureLevel:number; ornamentLevel:number; contrastLevel:number; warmth:number; softness:number;
  geometryTolerance:number; imagePromptPrefix:string; negativePrompt:string[];
}
export interface StyleFilter { enabled:DesignStyleId[]; excluded:DesignStyleId[]; primary?:DesignStyleId; intensity:StyleIntensity; blendWeight?:Partial<Record<DesignStyleId,number>>; }
export interface ColorFilter { paletteIds:string[]; customColors:string[]; temperature?:ColorTemperature; minContrast?:number; maxSaturation?:number; preserveExistingAccents:boolean; }
export interface DesignIntent {
  roomType:string; userPrompt:string; style:StyleFilter; colors:ColorFilter; priorities:string[];
  preserveArchitecture:boolean; preserveOpenings:boolean; preserveMeasurements:boolean; preserveExistingFurniture:string[];
  desiredChanges:string[]; prohibitedChanges:string[]; budget?:number; currency?:string;
}
export interface SpatialConstraint { id:string; label:string; kind:'clearance'|'opening'|'wall'|'dimension'|'visibility'|'circulation'|'accessibility'|'safety'; severity:'soft'|'hard'; value:number; source:string; }
export interface FurnitureIdea {
  id:string; type:string; label:string; dimensions:{width:number;height:number;depth:number};
  placement:{x:number;z:number;rotation:number}; styleTags:string[]; materialTags:string[]; colorTags:string[];
  confidence:number; reason:string; removable:boolean; source:'catalog'|'procedural'|'existing';
}
export interface LayoutAdvice {
  id:string; title:string; pattern:LayoutPattern; summary:string; rationale:string; score:number; confidence:number;
  changes:Array<{type:'move'|'rotate'|'add'|'remove'|'replace'|'group'|'align'; targetId?:string; x?:number; z?:number; rotation?:number; value?:string}>;
  constraintsRespected:string[]; tradeoffs:string[]; estimatedImprovement:Record<string,number>;
}
export interface MaterialRecipe { id:string; label:string; surfaces:Partial<Record<SurfaceKind,string>>; textureWords:string[]; priceTier:'low'|'mid'|'high'|'premium'; maintenance:'low'|'medium'|'high'; sustainability:number; }
export interface CameraPlan { id:string; label:string; position:{x:number;y:number;z:number}; target:{x:number;y:number;z:number}; lensMm:number; crop:'wide'|'standard'|'portrait'; reason:string; }
export interface RenderSpec {
  id:string; mode:GenerationMode; positivePrompt:string; negativePrompt:string[]; styleId:DesignStyleId;
  paletteId?:string; camera?:CameraPlan; geometryLock:boolean; seed:number; strength:number; preserveDepth:number;
  materialRecipeId?:string; outputAspect:'1:1'|'4:3'|'3:2'|'16:9'|'9:16'; notes:string[];
}
export interface DesignConcept {
  id:string; title:string; subtitle:string; styleId:DesignStyleId; paletteId?:string; score:number; confidence:number;
  conceptText:string; visualKeywords:string[]; furniture:FurnitureIdea[]; layout:LayoutAdvice[]; materials:MaterialRecipe[];
  render:RenderSpec; evidence:string[]; tradeoffs:string[]; nextPrompts:string[]; createdAt:number;
}
export interface DesignVariant { id:string; parentId?:string; label:string; concept:DesignConcept; delta:string[]; novelty:number; compatibility:number; }
export interface DesignFeedback { conceptId:string; action:'accept'|'reject'|'save'|'reroll'|'refine'|'compare'; reason?:string; createdAt:number; dimensionsChanged?:boolean; styleOverride?:DesignStyleId; paletteOverride?:string; }
export interface DesignSession { id:string; roomId:string; sourceType:'photo'|'rough-3d'|'cad'|'bim'|'hybrid'; sourceRevisionId?:string; currentConceptId?:string; history:string[]; feedback:DesignFeedback[]; lockedObjectIds:string[]; styleFilter:StyleFilter; colorFilter:ColorFilter; }
export interface GenerationRequest { intent:DesignIntent; room:RoomContext; previousConcept?:DesignConcept; previousSession?:DesignSession; feedback?:DesignFeedback[]; candidateCount?:number; now?:number; }
export interface GenerationResult { concepts:DesignConcept[]; insights:DesignInsight[]; selected?:DesignConcept; rejectedConcepts:string[]; warnings:string[]; metrics:Record<string,number>; trace:string[]; }
export interface DesignInsight { id:string; kind:'style'|'color'|'layout'|'balance'|'trend'|'tradeoff'|'opportunity'|'warning'; title:string; summary:string; confidence:number; evidence:string[]; actions:string[]; metric?:number; unit?:string; }
export interface VisualEdit { id:string; targetId?:string; kind:'style'|'color'|'material'|'furniture'|'lighting'|'layout'|'camera'; description:string; values:Record<string,string|number|boolean>; reversible:boolean; }
export interface GenerativePolicy { maxBudgetRatio:number; maxStyleBlend:number; minGeometryConfidence:number; maxFurnitureAdditions:number; permitStructuralChanges:boolean; permitFurnitureChanges:boolean; requireSourceLock:boolean; }
export interface StyleMatch { styleId:DesignStyleId; score:number; reasons:string[]; conflicts:string[]; }
export interface PaletteMatch { paletteId:string; score:number; reasons:string[]; conflicts:string[]; }
export interface PromptBundle { system:string; user:string; positive:string; negative:string[]; constraints:string[]; styleTokens:string[]; colorTokens:string[]; layoutTokens:string[]; }
export interface GenerationTraceStep { stage:string; startedAt:number; durationMs:number; inputs:number; outputs:number; notes:string[]; }
export interface GenerationTrace { id:string; steps:GenerationTraceStep[]; totalMs:number; }
export type RoomContext = import('../../core/types').RoomContext;
export type UserPreferences = import('../../core/types').UserPreferences;

