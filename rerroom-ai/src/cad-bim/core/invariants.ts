import { AuthoritativeModel, DesignOverlay, ValidationIssue, ValidationResult } from './types';
import { resolveAnchor } from './anchors';

export function validateAuthoritativeModel(model: AuthoritativeModel): ValidationResult {
  const issues:ValidationIssue[]=[];
  const ids=new Set<string>();
  for(const f of model.features){
    if(ids.has(f.id)) issues.push({severity:'error',code:'DUPLICATE_FEATURE_ID',message:`Duplicate feature id ${f.id}`,featureId:f.id});
    ids.add(f.id);
    if(f.authority==='authoritative' && !model.dimensions[f.id] && (f.kind==='wall'||f.kind==='floor'||f.kind==='door'||f.kind==='window')) issues.push({severity:'warning',code:'MISSING_DIMENSION',message:`Authoritative feature ${f.id} has no stored dimensional truth`,featureId:f.id});
  }
  if(!model.document.id) issues.push({severity:'error',code:'MISSING_DOCUMENT_ID',message:'Source document id is required'});
  return {valid:!issues.some(i=>i.severity==='error'),issues,metrics:{features:model.features.length,levels:model.levels.length,anchors:model.anchors.length}};
}
export function validateOverlay(model:AuthoritativeModel,overlay:DesignOverlay):ValidationResult {
  const issues:ValidationIssue[]=[];
  for(const e of overlay.elements){
    if(e.anchor && !resolveAnchor(model,e.anchor)) issues.push({severity:'warning',code:'ORPHAN_ANCHOR',message:`Overlay element ${e.id} references a missing feature`,featureId:e.anchor.sourceFeatureId});
    if(e.dimensions && Object.values(e.dimensions).some(v=>!Number.isFinite(v)||v<0)) issues.push({severity:'error',code:'INVALID_DIMENSIONS',message:`Invalid dimensions for ${e.id}`});
  }
  return {valid:!issues.some(i=>i.severity==='error'),issues,metrics:{elements:overlay.elements.length,unresolved:overlay.unresolvedAnchors.length}};
}
