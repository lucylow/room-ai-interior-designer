import { AuthoritativeModel, DesignOverlay } from '../core/types';
export interface ImportDropzoneModel {
  id:string; title:string; status:string; primaryValue:string; secondaryValue?:string; disabled:boolean; dirty:boolean; warnings:string[];
}
export function buildImportDropzoneModel(model:AuthoritativeModel,overlay?:DesignOverlay):ImportDropzoneModel {
  const warnings:string[]=[];
  if(!model.features.length) warnings.push('No imported source features.');
  if(overlay?.unresolvedAnchors.length) warnings.push(`${overlay.unresolvedAnchors.length} unresolved anchors.`);
  return {id:`vm_${Date.now()}`,title:'import dropzone',status:overlay?.isApproved?'approved':'editable',primaryValue:model.importedRevision,secondaryValue:overlay?.id,disabled:false,dirty:!!overlay&&!overlay.isApproved,warnings};
}
