import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function CadLayerRule(model:AuthoritativeModel,_overlay:DesignOverlay,_pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // retain CAD layer provenance on imported features
  if(model.document.fileType==='dxf') for(const f of model.features) if(!f.layer) issues.push({severity:'warning',code:'MISSING_CAD_LAYER',message:`DXF feature ${f.id} has no retained layer.`});
  return issues;
}
