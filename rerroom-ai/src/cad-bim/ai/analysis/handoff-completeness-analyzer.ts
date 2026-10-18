import { AuthoritativeModel, DesignOverlay, ValidationIssue } from '../../core/types';
export interface AnalysisReport { title:string; score:number; findings:string[]; issues:ValidationIssue[]; }
export class HandoffCompletenessAnalyzer {
  run(model:AuthoritativeModel,overlay:DesignOverlay,previous?:DesignOverlay):AnalysisReport {
    const issues:ValidationIssue[]=[]; const findings:string[]=[]; let score=.86;
    const anchored=overlay.elements.filter(e=>e.anchor).length; const ratio=overlay.elements.length?anchored/overlay.elements.length:1;
    findings.push(`Evaluated ${overlay.elements.length} concept elements for checks whether approved concept elements have source anchors.`);
    findings.push(`Anchored ratio: ${ratio.toFixed(2)}.`); findings.push(`Authoritative revision: ${model.importedRevision}.`);
    if(ratio<.8){score-=.15;issues.push({severity:'warning',code:'LOW_GROUNDING',message:'Some concept elements are not anchored to source geometry.'});}
    if(previous){const changed=JSON.stringify(previous.intent)!==JSON.stringify(overlay.intent);findings.push(`Prior concept intent changed: ${changed}.`);}
    return {title:'checks whether approved concept elements have source anchors',score:Math.max(0,Math.min(1,score)),findings,issues};
  }
}
