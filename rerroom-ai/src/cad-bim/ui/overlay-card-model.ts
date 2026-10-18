import { AuthoritativeModel, DesignOverlay } from '../core/types';
export interface OverlayCardModel {
  id:string; title:string; status:string; primaryValue:string; secondaryValue?:string; disabled:boolean; dirty:boolean; warnings:string[];
}
export function buildOverlayCardModel(model:AuthoritativeModel,overlay?:DesignOverlay):OverlayCardModel {
  const warnings:string[]=[];
  if(!model.features.length) warnings.push('No imported source features.');
  if(overlay?.unresolvedAnchors.length) warnings.push(`${overlay.unresolvedAnchors.length} unresolved anchors.`);
  return {id:`vm_${Date.now()}`,title:'overlay card',status:overlay?.isApproved?'approved':'editable',primaryValue:model.importedRevision,secondaryValue:overlay?.id,disabled:false,dirty:!!overlay&&!overlay.isApproved,warnings};
}
