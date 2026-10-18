export type DataSensitivity = 'public' | 'internal' | 'personal' | 'sensitive' | 'restricted';

export type DataClass =
  | 'identity'
  | 'contact'
  | 'room-image'
  | 'room-video'
  | 'room-layout'
  | 'measurement'
  | 'device'
  | 'shopping'
  | 'construction'
  | 'financial'
  | 'credential'
  | 'ai-prompt'
  | 'ai-output'
  | 'telemetry'
  | 'subscription';

export type ProcessingPurpose =
  | 'core-design'
  | 'room-understanding'
  | 'ai-generation'
  | 'ai-memory'
  | 'shopping'
  | 'construction'
  | 'analytics'
  | 'support'
  | 'security';

export type ConsentScope =
  | 'local-storage'
  | 'cloud-storage'
  | 'ai-processing'
  | 'ai-memory'
  | 'analytics'
  | 'commerce'
  | 'construction-sharing'
  | 'diagnostics';

export type DataOrigin = 'user' | 'device' | 'ai' | 'server' | 'catalog' | 'demo';

export interface DataEnvelope<T> {
  value: T;
  dataClass: DataClass;
  sensitivity: DataSensitivity;
  origin: DataOrigin;
  purpose: ProcessingPurpose;
  containsDirectIdentifier?: boolean;
  retentionDays?: number;
}

export interface ConsentDecision {
  scope: ConsentScope;
  granted: boolean;
  updatedAt: number;
  source: 'onboarding' | 'settings' | 'feature-prompt' | 'system-default';
  version: number;
}

export interface SessionSnapshot {
  status: 'signed-out' | 'signing-in' | 'authenticated' | 'refreshing' | 'expired';
  userId?: string;
  accessToken?: string;
  accessTokenExpiresAt?: number;
  scopes: string[];
  sessionVersion: number;
}

export interface AuditEvent {
  id: string;
  timestamp: number;
  action:
    | 'auth'
    | 'read'
    | 'write'
    | 'delete'
    | 'export'
    | 'ai-request'
    | 'ai-rejected'
    | 'privacy-change'
    | 'sync'
    | 'security';
  subject: string;
  outcome: 'success' | 'denied' | 'error';
  metadata: Record<string, string | number | boolean | null>;
  requestId?: string;
}

export interface SanitizedAIContext {
  requestId: string;
  purpose: ProcessingPurpose;
  fields: Array<{
    name: string;
    dataClass: DataClass;
    value: unknown;
    sensitivity: DataSensitivity;
    redacted: boolean;
  }>;
  policyVersion: string;
}

export interface AIDataPolicy {
  allowClasses: ReadonlyArray<DataClass>;
  maxPromptChars: number;
  allowImages: boolean;
  allowMeasurements: boolean;
  allowShoppingHistory: boolean;
  allowConstructionDetails: boolean;
  retentionDays: number;
}

export interface RoomObjectState {
  id: string;
  type: 'sofa' | 'table' | 'rug' | 'lamp' | 'cabinet' | 'bed' | 'chair' | 'plant' | 'custom';
  label: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  rotationY: number;
  locked: boolean;
}

export interface RoomStateModel {
  id: string;
  name: string;
  roomType: 'living-room' | 'bedroom' | 'kitchen' | 'office' | 'dining-room' | 'bathroom' | 'other';
  imageAssetId?: string;
  layoutAssetId?: string;
  objects: RoomObjectState[];
  measurements: {
    widthM?: number;
    depthM?: number;
    ceilingM?: number;
  };
  updatedAt: number;
  version: number;
  sensitivity: DataSensitivity;
}

export interface DesignStateModel {
  id: string;
  roomId: string;
  style: string;
  prompt: string;
  createdAt: number;
  status: 'draft' | 'generating' | 'ready' | 'failed';
  generatedAssetIds: string[];
  approved: boolean;
  version: number;
}

export interface SafeAIActionBase {
  actionId: string;
  targetId?: string;
  reason?: string;
}

export type SafeAIAction =
  | (SafeAIActionBase & { type: 'move'; dx: number; dy: number; dz: number })
  | (SafeAIActionBase & { type: 'resize'; width: number; height: number; depth: number })
  | (SafeAIActionBase & { type: 'rotate'; rotationY: number })
  | (SafeAIActionBase & { type: 'add'; object: Omit<RoomObjectState, 'id'> })
  | (SafeAIActionBase & { type: 'remove' })
  | (SafeAIActionBase & { type: 'replace'; replacementType: RoomObjectState['type']; label: string })
  | (SafeAIActionBase & { type: 'style'; style: string });

export interface AIInsight {
  id: string;
  severity: 'info' | 'low' | 'medium' | 'high';
  category: 'privacy' | 'spatial' | 'design' | 'cost' | 'safety';
  title: string;
  summary: string;
  evidence: string[];
  source: 'local-rules' | 'model' | 'demo';
}

export interface AIResult<T> {
  requestId: string;
  provider: 'demo' | 'remote';
  model: string;
  createdAt: number;
  output: T;
  policyVersion: string;
  rejectedFields: string[];
}

export interface MutationEnvelope<T> {
  idempotencyKey: string;
  mutationId: string;
  entity: string;
  entityId: string;
  version: number;
  createdAt: number;
  payload: T;
  attempts: number;
  status: 'queued' | 'sending' | 'acked' | 'failed';
  lastError?: string;
}

export interface FeatureEntitlements {
  aiGeneration: boolean;
  advancedAI: boolean;
  cloudSync: boolean;
  shopping: boolean;
  construction: boolean;
  collaboration: boolean;
}
