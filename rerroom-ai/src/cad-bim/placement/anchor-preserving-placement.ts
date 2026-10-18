import { AnchorReference, AuthoritativeModel } from '../core/types';
import { FurnitureSpec, PlacementCandidate } from '../planning/types';

export interface PlacementAnchorResult { candidate:PlacementCandidate; preserved:boolean; matchedFeatureId?:string; warning?:string; }

export function anchorPlacement(model:AuthoritativeModel,candidate:PlacementCandidate,spec:FurnitureSpec,preferredFeatureIds:string[]):PlacementAnchorResult{
  const match=preferredFeatureIds.map(id=>model.features.find(f=>f.id===id)).find(f=>f?.kind==='wall'||f?.kind==='window'||f?.kind==='door');
  if(!match) return {candidate,preserved:true};
  const cx=match.center?.x ?? 0; const cz=match.center?.z ?? 0;
  const dx=Math.abs(candidate.position.x-cx); const dz=Math.abs(candidate.position.z-cz);
  if(dx<Math.max(spec.dimensions.width,1.2) && dz<Math.max(spec.dimensions.depth,1.2)){
    const anchor:AnchorReference={sourceDocumentId:model.document.id,sourceFeatureId:match.id,confidence:1};
    return {...{candidate:{...candidate,anchor}},preserved:true,matchedFeatureId:match.id};
  }
  return {candidate,preserved:false,warning:`No trusted spatial anchor near selected ${match.kind}.`};
}
