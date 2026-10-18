export type RoomType = 'living_room'|'bedroom'|'kitchen'|'dining_room'|'home_office'|'entryway'|'bathroom'|'nursery'|'studio'|'media_room'|'guest_room'|'reading_nook';
export type CreativeStyleId = string;
export type PaletteId = string;
export interface CreativeStyleMock { id:string; name:string; family:string; description:string; signatureMaterials:string[]; preferredColors:string[]; lightingBias:'daylight'|'balanced'|'ambient'; furnitureLanguage:string[]; avoid:string[]; promptTokens:string[]; scoreWeights:{style:number;palette:number;material:number;layout:number}; }
export interface PaletteMock { id:string; name:string; mood:string; colors:string[]; roomFit:RoomType[]; styleFit:string[]; warmth:number; contrast:number; saturation:number; guidance:string[]; }
export interface LayoutAdviceMock { id:string; room:RoomType; style:string; title:string; priority:'high'|'medium'|'low'; advice:string; rationale:string; actions:string[]; avoid:string[]; tags:string[]; }
export interface CreativeConceptMock { id:string; room:RoomType; style:string; palette:string; title:string; story:string; prompt:string; layoutAdviceIds:string[]; furnitureRoles:string[]; mood:string; intensity:number; generatedSeed:number; variants:string[]; }
export interface RefinementMock { id:string; label:string; command:string; styleDelta?:string; paletteDelta?:string; layoutDelta?:string; furnitureDelta?:string; lightDelta?:string; expectedEffect:string; }
export interface MockUserPreference { id:string; name:string; favoriteStyles:string[]; favoritePalettes:string[]; rooms:RoomType[]; dislikes:string[]; budgetTier:'starter'|'mid'|'premium'; promptLanguage:string; }
export interface DesignScenarioMock { id:string; room:RoomType; brief:string; selectedStyle:string; selectedPalette:string; budget:number; constraints:string[]; preferredFurniture:string[]; iterations:string[]; }
export interface FurnitureAestheticMock { id:string; role:string; style:string; silhouette:string; materials:string[]; colors:string[]; scale:'compact'|'standard'|'oversized'; placementAdvice:string; compatiblePalettes:string[]; mockRetailTags:string[]; }
