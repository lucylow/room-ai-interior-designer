export type ID = string;
export type Meters = number;
export type Radians = number;
export type Degrees = number;

export interface Vec2 { x: number; y: number; }
export interface Vec3 { x: number; y: number; z: number; }
export interface Size3 { width: number; depth: number; height: number; }
export interface Transform3 { position: Vec3; rotation: Vec3; scale: Vec3; }
export interface AABB2 { min: Vec2; max: Vec2; }
export interface AABB3 { min: Vec3; max: Vec3; }
export interface Line2 { start: Vec2; end: Vec2; }
export interface Polygon2 { points: Vec2[]; }

export type CADFileType = 'dxf'|'dwg'|'obj'|'svg'|'gltf'|'glb'|'step'|'stp'|'ifc'|'unknown';
export type SourceKind = 'wall'|'floor'|'ceiling'|'door'|'window'|'opening'|'column'|'beam'|'room'|'furniture'|'fixture'|'stair'|'annotation'|'other';
export type BIMClass = 'IfcWall'|'IfcSlab'|'IfcRoof'|'IfcSpace'|'IfcDoor'|'IfcWindow'|'IfcOpeningElement'|'IfcColumn'|'IfcBeam'|'IfcFurniture'|'IfcFurnishingElement'|'IfcBuildingElementProxy'|'Unknown';
export type AuthorityLevel = 'authoritative'|'derived'|'estimated'|'illustrative';
export type OverlayKind = 'aesthetic'|'furniture'|'material'|'lighting'|'color'|'finish'|'fixture'|'layout-proposal'|'annotation';
export type PatchOperation = 'add'|'replace'|'remove'|'move-proposal'|'resize-proposal'|'style';

export interface SourceDocument {
  id: ID;
  name: string;
  fileType: CADFileType;
  byteLength: number;
  checksum: string;
  unitSystem: 'mm'|'cm'|'m'|'in'|'ft'|'unknown';
  sourceUnitScaleToMeters: number;
  importedAt: string;
  coordinateSystem: string;
  revision?: string;
  authoringTool?: string;
}

export interface SourceFeature {
  id: ID;
  sourceDocumentId: ID;
  externalId?: string;
  kind: SourceKind;
  bimClass?: BIMClass;
  layer?: string;
  name?: string;
  levelId?: ID;
  authority: AuthorityLevel;
  geometry2d?: Polygon2;
  center?: Vec3;
  size?: Size3;
  transform?: Transform3;
  materialRef?: string;
  properties: Record<string, string|number|boolean|null>;
  sourceRefs: string[];
}

export interface SourceLevel {
  id: ID;
  name: string;
  elevation: number;
  height?: number;
  sourceRefs: string[];
}

export interface AnchorReference {
  sourceDocumentId: ID;
  sourceFeatureId: ID;
  externalId?: string;
  propertyPath?: string;
  dimensionKey?: string;
  confidence: number;
}

export interface DimensionalTruth {
  width?: number;
  depth?: number;
  height?: number;
  length?: number;
  area?: number;
  volume?: number;
  unit: 'm';
  toleranceMeters: number;
  measuredFrom: 'cad'|'bim'|'survey'|'scan'|'derived';
}

export interface AuthoritativeModel {
  id: ID;
  projectId: ID;
  document: SourceDocument;
  features: SourceFeature[];
  levels: SourceLevel[];
  dimensions: Record<ID, DimensionalTruth>;
  anchors: AnchorReference[];
  importedRevision: string;
  immutableGeometryHash: string;
}

export interface AestheticIntent {
  prompt: string;
  style?: string;
  palette?: string[];
  materials?: string[];
  preserveFeatures: ID[];
  budget?: number;
  constraints: string[];
  clientPreferences: Record<string,string|number|boolean>;
}

export interface ConceptElement {
  id: ID;
  anchor?: AnchorReference;
  kind: OverlayKind;
  semanticType: string;
  transformDelta?: { position?: Vec3; rotation?: Vec3; scale?: Vec3 };
  dimensions?: Size3;
  appearance: { material?: string; color?: string; roughness?: number; metalness?: number; lightTemperatureK?: number; intensity?: number };
  reasoning: string;
  confidence: number;
  source: 'ai'|'designer'|'catalog';
}

export interface DesignOverlay {
  id: ID;
  projectId: ID;
  authoritativeModelId: ID;
  parentOverlayId?: ID;
  version: number;
  createdAt: string;
  createdBy: 'ai'|'designer'|'system';
  intent: AestheticIntent;
  elements: ConceptElement[];
  unresolvedAnchors: string[];
  isApproved: boolean;
}

export interface OverlayPatch {
  id: ID;
  overlayId: ID;
  targetAnchor?: AnchorReference;
  operation: PatchOperation;
  path: string;
  before?: unknown;
  after?: unknown;
  rationale: string;
  createdAt: string;
  author: 'ai'|'designer'|'system';
}

export interface BIMPropertySet {
  name: string;
  properties: Record<string, string|number|boolean|null>;
}

export interface BIMEntity {
  id: ID;
  expressId: number;
  className: BIMClass;
  globalId?: string;
  name?: string;
  levelId?: ID;
  propertySets: BIMPropertySet[];
  sourceRefs: string[];
}

export interface BIMIndex {
  documentId: ID;
  entities: BIMEntity[];
  entityByExpressId: Record<number, BIMEntity>;
  wallIds: ID[];
  openingIds: ID[];
  spaceIds: ID[];
  fixtureIds: ID[];
}

export interface RemodelChangeRequest {
  id: ID;
  prompt: string;
  requestedAt: string;
  targetAnchors: AnchorReference[];
  parsedActions: Array<{ action: string; target?: string; value?: string|number }>; 
  preservesGeometry: boolean;
}

export type RemodelStatus = 'draft'|'imported'|'analyzed'|'concepting'|'iterating'|'client-review'|'approved'|'handoff-ready'|'issued';

export interface RemodelProject {
  id: ID;
  name: string;
  status: RemodelStatus;
  authoritativeModel: AuthoritativeModel;
  overlays: DesignOverlay[];
  activeOverlayId?: ID;
  changes: RemodelChangeRequest[];
  selectedFeatureIds: ID[];
  clientApprovedOverlayId?: ID;
}

export interface HandoffDimension {
  label: string;
  value: number;
  unit: 'mm';
  tolerance?: number;
  sourceAnchor?: AnchorReference;
  verification: 'source-cad'|'source-bim'|'survey'|'designer-confirmed'|'unverified';
}

export interface HandoffItem {
  id: ID;
  label: string;
  category: string;
  sourceFeatureId?: ID;
  dimensions: HandoffDimension[];
  material?: string;
  quantity?: number;
  notes: string[];
}

export interface HandoffPackage {
  id: ID;
  projectId: ID;
  sourceModelRevision: string;
  approvedOverlayId: ID;
  dimensions: HandoffDimension[];
  items: HandoffItem[];
  schedules: Record<string, Array<Record<string,string|number|null>>>;
  warnings: string[];
  issuedAt?: string;
  checksum?: string;
}

export interface ValidationIssue { severity: 'error'|'warning'|'info'; code: string; message: string; featureId?: ID; }
export interface ValidationResult { valid: boolean; issues: ValidationIssue[]; metrics: Record<string,number>; }
