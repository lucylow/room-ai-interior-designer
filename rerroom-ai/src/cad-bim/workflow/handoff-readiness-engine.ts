import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../core/types';
export interface HandoffReadinessEngineResult { ok:boolean; score:number; messages:string[]; issues:ValidationIssue[]; revision:string; }

export class HandoffReadinessEngine {
  /** evaluates readiness across anchors, revision, dimensions and approval. */
  run(model:AuthoritativeModel, overlay?:DesignOverlay, pkg?:HandoffPackage):HandoffReadinessEngineResult {
    const issues:ValidationIssue[]=[]; const messages:string[]=[]; let score=1;
    if(!model.document.id){score-=.3;issues.push({severity:'error',code:'MODEL_ID',message:'Authoritative model is missing a document id.'});}
    if(model.features.length===0){score-=.2;issues.push({severity:'warning',code:'NO_FEATURES',message:'The source model contains no semantic features.'});}
    if(overlay){
      if(overlay.authoritativeModelId!==model.id){score-=.35;issues.push({severity:'error',code:'MODEL_MISMATCH',message:'Overlay belongs to a different authoritative model.'});}
      const anchored=overlay.elements.filter(e=>!!e.anchor).length; const ratio=overlay.elements.length?anchored/overlay.elements.length:1;
      messages.push(`Anchored concept ratio ${ratio.toFixed(2)}`); if(ratio<.85){score-=.15;issues.push({severity:'warning',code:'GROUNDING',message:'Concept grounding is below release target.'});}
      if(overlay.unresolvedAnchors.length){score-=.2;issues.push({severity:'error',code:'ORPHANS',message:`${overlay.unresolvedAnchors.length} unresolved anchors remain.`});}
    }
    if(pkg && pkg.sourceModelRevision!==model.importedRevision){score-=.4;issues.push({severity:'error',code:'REVISION_DRIFT',message:'Handoff package targets an outdated source revision.'});}
    messages.push(`Source revision ${model.importedRevision}`); messages.push(`Feature count ${model.features.length}`);
    return {ok:!issues.some(i=>i.severity==='error'),score:Math.max(0,score),messages,issues,revision:model.importedRevision};
  }
}
