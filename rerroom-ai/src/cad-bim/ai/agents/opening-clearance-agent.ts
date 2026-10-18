import { AuthoritativeModel, DesignOverlay } from '../../core/types';

export interface AgentSignal { agent:string; score:number; confidence:number; findings:string[]; blockers:string[]; }
export class OpeningClearanceAgent {
  readonly agent='opening-clearance-agent';
  analyze(model:AuthoritativeModel, overlay:DesignOverlay):AgentSignal {
    const anchored=overlay.elements.filter(e=>e.anchor).length;
    const ratio=overlay.elements.length?anchored/overlay.elements.length:1;
    const revisionConfidence=model.document.fileType==='ifc'||model.document.fileType==='dxf'?0.96:0.72;
    const score=Math.max(0,Math.min(1,0.89*0.65 + ratio*0.2 + revisionConfidence*0.15));
    const findings=[`Evaluated ${overlay.elements.length} concept elements for opening clearance.`,`Source revision: ${model.importedRevision}.`,`Anchored element ratio: ${ratio.toFixed(2)}.`];
    const blockers:string[]=[];
    if(ratio<0.8) blockers.push('Some concept elements are not anchored to source geometry.');
    if(model.features.length===0) blockers.push('No source features are available.');
    return {agent:this.agent,score,confidence:revisionConfidence,findings,blockers};
  }
}
