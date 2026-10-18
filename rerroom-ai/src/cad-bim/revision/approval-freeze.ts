import { RemodelProject, DesignOverlay } from '../core/types';
export interface ApprovalFreeze { approvedOverlayId:string; sourceModelRevision:string; frozenAt:string; lockedFeatureIds:string[]; }
export function freezeApprovedConcept(project:RemodelProject,overlay:DesignOverlay):ApprovalFreeze{
 return {approvedOverlayId:overlay.id,sourceModelRevision:project.authoritativeModel.importedRevision,frozenAt:new Date().toISOString(),lockedFeatureIds:project.authoritativeModel.features.map(f=>f.id)};
}
