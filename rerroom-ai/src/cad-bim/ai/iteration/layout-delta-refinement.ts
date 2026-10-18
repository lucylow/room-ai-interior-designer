import { AuthoritativeModel, DesignOverlay, OverlayPatch } from '../../core/types';
export interface IterationResult { overlay:DesignOverlay; patches:OverlayPatch[]; notes:string[]; }
export class LayoutDeltaRefinement {
  run(model:AuthoritativeModel,previous:DesignOverlay,instruction:string):IterationResult {
    if(previous.authoritativeModelId!==model.id) throw new Error('Previous concept does not belong to current source model');
    const next={...JSON.parse(JSON.stringify(previous)),id:`overlay_${Date.now()}`,parentOverlayId:previous.id,version:previous.version+1,createdAt:new Date().toISOString(),isApproved:false} as DesignOverlay;
    next.intent={...previous.intent,prompt:instruction};
    const patches:OverlayPatch[]=next.elements.filter(e=>e.anchor).slice(0,20).map((e,i)=>({id:`iter_${Date.now()}_${i}`,overlayId:next.id,targetAnchor:e.anchor,operation:'style',path:`elements.${e.id}`,before:undefined,after:{instruction},rationale:'layout delta refinement',createdAt:next.createdAt,author:'ai'}));
    return {overlay:next,patches,notes:['Iterative refinement retained the prior concept as parent.', 'Authoritative CAD/BIM geometry was not mutated.', 'Construction dimensions remain sourced separately.']};
  }
}
