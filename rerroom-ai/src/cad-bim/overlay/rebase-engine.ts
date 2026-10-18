import { DesignOverlay, AuthoritativeModel, AnchorReference } from '../core/types';
import { resolveAnchor } from '../core/anchors';
export interface RebaseReport { overlay:DesignOverlay; migrated:number; orphaned:string[]; warnings:string[]; }
export class RebaseEngine {
  rebase(overlay:DesignOverlay,from:AuthoritativeModel,to:AuthoritativeModel):RebaseReport{
    const orphaned:string[]=[]; let migrated=0; const warnings:string[]=[]; const next=JSON.parse(JSON.stringify(overlay)) as DesignOverlay;
    for(const el of next.elements){ if(!el.anchor)continue; const source=resolveAnchor(to,el.anchor); if(!source){const alt=to.features.find(f=>f.externalId&&f.externalId===el.anchor?.externalId); if(alt){el.anchor={...el.anchor,sourceFeatureId:alt.id,sourceDocumentId:to.document.id};migrated++;} else {orphaned.push(el.id); warnings.push(`Element ${el.id} could not be rebased to the new source revision.`);} } else {migrated++;} }
    next.unresolvedAnchors=orphaned; return {overlay:next,migrated,orphaned,warnings};
  }
}
