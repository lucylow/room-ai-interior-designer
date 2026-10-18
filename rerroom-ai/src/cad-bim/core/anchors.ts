import { AnchorReference, AuthoritativeModel, SourceFeature } from './types';

export function makeAnchor(model: AuthoritativeModel, feature: SourceFeature, propertyPath?: string, dimensionKey?: string): AnchorReference {
  return { sourceDocumentId: model.document.id, sourceFeatureId: feature.id, externalId: feature.externalId, propertyPath, dimensionKey, confidence: feature.authority === 'authoritative' ? 1 : feature.authority === 'derived' ? .85 : .55 };
}
export function anchorKey(anchor: AnchorReference): string { return [anchor.sourceDocumentId,anchor.sourceFeatureId,anchor.externalId||'',anchor.propertyPath||'',anchor.dimensionKey||''].join('|'); }
export function sameAnchor(a?:AnchorReference,b?:AnchorReference):boolean { return !!a&&!!b&&anchorKey(a)===anchorKey(b); }
export function resolveAnchor(model: AuthoritativeModel, anchor: AnchorReference): SourceFeature | undefined {
  return model.features.find(f=>f.id===anchor.sourceFeatureId) || model.features.find(f=>f.externalId && f.externalId===anchor.externalId);
}
export function guardAnchor(model: AuthoritativeModel, anchor: AnchorReference): void {
  if(anchor.sourceDocumentId!==model.document.id) throw new Error('Anchor belongs to a different source document');
  if(!resolveAnchor(model,anchor)) throw new Error(`Anchor ${anchor.sourceFeatureId} could not be resolved`);
}
