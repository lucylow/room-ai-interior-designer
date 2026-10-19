import { AnchorReference, DesignOverlay, OverlayPatch } from '../../core/types';
export function SetMaterial(overlay:DesignOverlay, anchor:AnchorReference|undefined, value:unknown, rationale:string):OverlayPatch {
  const id=`patch_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
  return {id,overlayId:overlay.id,targetAnchor:anchor,operation:'style',path:'material',before:undefined,after:value,rationale,createdAt:new Date().toISOString(),author:'ai'};
}
