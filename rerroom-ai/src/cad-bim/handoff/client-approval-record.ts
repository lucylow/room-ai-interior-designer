import { AuthoritativeModel, DesignOverlay, HandoffPackage } from '../core/types';
export interface HandoffArtifact { name:string; type:string; rows:number; warnings:string[]; }
export class ClientApprovalRecord {
  build(model:AuthoritativeModel,overlay:DesignOverlay,pkg?:HandoffPackage):HandoffArtifact {
    const warnings:string[]=[];
    if(!overlay.isApproved) warnings.push('Overlay is not approved.');
    if(overlay.authoritativeModelId!==model.id) warnings.push('Overlay/model mismatch.');
    if(pkg && pkg.sourceModelRevision!==model.importedRevision) warnings.push('Source revision mismatch.');
    const rows=model.features.length + overlay.elements.length + (pkg?.dimensions.length||0);
    return {name:'client approval record',type:'construction-handoff',rows,warnings};
  }
}
