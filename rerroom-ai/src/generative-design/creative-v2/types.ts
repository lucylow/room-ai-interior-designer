
export type CreativeControlMode = 'style'|'palette'|'layout'|'camera'|'materials'|'furniture'|'lighting'|'budget'|'atmosphere';
export type CreativeConfidenceBand = 'low'|'medium'|'high';
export interface CreativeFilterState { styles:string[]; primaryStyle?:string; palettes:string[]; roomTypes:string[]; controls:CreativeControlMode[]; intensity:number; preserveArchitecture:boolean; preserveFurniture:boolean; }
export interface CreativeSignal { id:string; label:string; score:number; confidence:number; source:string; explanation:string; }
export interface CreativeDirection { id:string; title:string; styleId:string; paletteId:string; layoutPattern:string; keywords:string[]; avoid:string[]; promptTokens:string[]; score:number; confidence:number; reasons:string[]; }
export interface CreativeRevision { id:string; label:string; description:string; controls:CreativeControlMode[]; delta:number; preserves:string[]; touches:string[]; reversible:boolean; }
export interface CreativeInsightCard { id:string; kind:string; title:string; summary:string; metric?:number; unit?:string; confidence:number; actions:string[]; evidence:string[]; }
export interface CreativeScenario { id:string; name:string; roomId:string; prompt:string; styles:string[]; palettes:string[]; layoutGoals:string[]; revisionPrompts:string[]; expectedViews:string[]; }
export interface CreativeRunReport { id:string; roomId:string; selectedStyle:string; selectedPalette:string; selectedLayout:string; directions:number; revisions:number; insights:number; warnings:string[]; trace:string[]; }
export const CREATIVE_STYLE_IDS=['modern','minimalist','scandinavian','industrial','japandi','mid-century','bohemian','organic-modern','contemporary','warm-minimal'] as const;
export const CREATIVE_ROOM_TYPES=['living-room','bedroom','kitchen','office','dining-room','bathroom','entryway','nursery','studio','other'] as const;
