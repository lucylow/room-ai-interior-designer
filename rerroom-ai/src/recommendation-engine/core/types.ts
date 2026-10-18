export type ID = string;
export type RoomType = 'living-room'|'bedroom'|'kitchen'|'office'|'dining-room'|'bathroom'|'entryway'|'nursery'|'studio'|'other';
export type Category = 'layout'|'style'|'color'|'lighting'|'storage'|'shopping'|'budget'|'safety'|'accessibility'|'maintenance'|'sustainability'|'construction'|'comfort'|'workflow'|'spatial';
export type Severity = 'info'|'low'|'medium'|'high'|'critical';
export type EvidenceKind = 'measurement'|'object'|'opening'|'style'|'preference'|'budget'|'history'|'catalog'|'rule'|'model'|'simulation';
export type Effort = 'tiny'|'easy'|'moderate'|'large'|'major';
export type FeedbackAction = 'accepted'|'rejected'|'saved'|'edited'|'ignored'|'snoozed';

export interface Vec3 { x:number; y:number; z:number; }
export interface Size3 { width:number; height:number; depth:number; }
export interface Rect { x:number; z:number; width:number; depth:number; }

export interface RoomObject {
  id:ID; type:string; label:string; position:Vec3; size:Size3; rotationY:number;
  material?:string; styleTags?:string[]; colorTags?:string[]; locked?:boolean; confidence?:number;
  attributes?:Record<string,string|number|boolean>;
}
export interface Opening { id:ID; kind:'door'|'window'|'arch'; x:number; z:number; width:number; height:number; swing?:'left'|'right'|'double'|'none'; }
export interface MeasurementSet { widthM:number; depthM:number; ceilingM:number; confidence:number; }
export interface RoomContext {
  roomId:ID; name:string; roomType:RoomType; measurements:MeasurementSet; objects:RoomObject[]; openings:Opening[];
  naturalLightScore:number; circulationScore:number; clutterScore:number; storageScore:number; visualBalanceScore:number;
  accessibilityScore:number; safetyScore:number; acousticScore:number; comfortScore:number; sustainabilityScore:number; workflowScore:number;
  styleSignals:Record<string,number>; colorSignals:Record<string,number>; inferredFunctions:string[]; constraints:string[];
}
export interface UserPreferences {
  preferredStyles:string[]; avoidedStyles:string[]; preferredColors:string[]; avoidedColors:string[]; materials:string[];
  dislikes:string[]; householdNeeds:string[]; priorities:string[]; budgetMin?:number; budgetMax?:number; currency:string;
  renovationHorizon:'now'|'soon'|'later'|'exploring'; maintenanceTolerance:'low'|'medium'|'high'; sustainabilityPriority:number;
  accessibilityPriority:number; shoppingEnabled:boolean; learningEnabled:boolean; historyEnabled:boolean;
}
export interface BudgetProfile { total:number; currency:string; allocated:Record<string,number>; hardCap?:number; flexibility:number; }
export interface CatalogItem {
  id:ID; name:string; category:string; styleTags:string[]; colorTags:string[]; materialTags:string[]; dimensions:Size3;
  price:number; currency:string; rating?:number; leadTimeDays?:number; sustainabilityScore?:number;
  accessibilityScore?:number; maintenanceScore?:number; roomTypes?:RoomType[]; features?:string[];
}
export interface Evidence { id:ID; kind:EvidenceKind; label:string; value:string; confidence:number; sourceId?:ID; weight?:number; }
export interface Action { type:'move-object'|'resize-object'|'rotate-object'|'add-object'|'remove-object'|'replace-object'|'change-surface'|'change-lighting'|'shop-item'|'create-task'|'none'; targetId?:ID; payload:Record<string,string|number|boolean>; }
export interface Recommendation {
  id:ID; category:Category; title:string; summary:string; rationale:string; score:number; confidence:number; effort:Effort;
  estimatedCost?:number; currency?:string; expectedImpact:number; evidence:Evidence[]; actions:Action[]; tradeoffs:string[]; alternatives:string[];
  tags:string[]; createdAt:number; expiresAt?:number; clusterId?:ID; modelVersion?:string;
}
export interface Insight {
  id:ID; severity:Severity; category:Category; title:string; summary:string; metric?:number; unit?:string;
  direction?:'improving'|'stable'|'declining'|'unknown'; evidence:Evidence[]; recommendedNextStep?:string; confidence:number;
  relatedRecommendationIds?:ID[]; createdAt?:number;
}
export interface RecommendationRequest {
  room:RoomContext; preferences:UserPreferences; budget?:BudgetProfile; catalog?:CatalogItem[]; recentRecommendations?:Recommendation[];
  previousInsights?:Insight[]; now?:number; requestedCategories?:Category[]; maxRecommendations?:number; userPrompt?:string; sessionId?:ID;
}
export interface RecommendationSet {
  recommendations:Recommendation[]; insights:Insight[]; assumptions:string[]; blockedIdeas:string[]; generatedAt:number; engineVersion:string; traceId:string;
  metrics:Record<string,number>; warnings:string[];
}
export interface Feature { name:string; value:number; confidence:number; source:EvidenceKind; }
export interface FeatureVector { values:Feature[]; createdAt:number; }
export interface Feedback { recommendationId:ID; action:FeedbackAction; reason?:string; createdAt:number; contextHash?:string; }
export interface Goal { id:ID; label:string; category:Category; importance:number; target:number; current?:number; deadline?:number; }
export interface ScenarioDelta { objectId?:ID; moveX?:number; moveZ?:number; rotate?:number; scale?:number; addType?:string; remove?:boolean; }
export interface Scenario { id:ID; name:string; description:string; deltas:ScenarioDelta[]; expectedOutcome:string; }
export interface Candidate {
  id:ID; title:string; category:Category; baseScore:number; impact:number; effort:Effort; cost?:number; tags:string[]; evidence:Evidence[];
  actions:Action[]; tradeoffs:string[]; alternatives:string[]; source:'rule'|'catalog'|'model'|'scenario';
}
export interface Policy { minConfidence:number; minScore:number; maxCostRatio:number; maxActions:number; allowShopping:boolean; allowConstruction:boolean; requireEvidence:boolean; }
export interface EngineTraceStep { name:string; durationMs:number; inputCount:number; outputCount:number; notes:string[]; }
export interface EngineTrace { id:ID; startedAt:number; steps:EngineTraceStep[]; totalMs:number; }
