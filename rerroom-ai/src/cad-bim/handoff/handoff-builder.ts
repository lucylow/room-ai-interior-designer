import { AuthoritativeModel, DesignOverlay, HandoffPackage } from '../core/types';
import { buildApprovalPackage } from './approval-package';
export class HandoffBuilder {
  build(projectId:string,model:AuthoritativeModel,overlay:DesignOverlay):HandoffPackage { if(!overlay.isApproved) throw new Error('Client approval is required before handoff'); if(overlay.authoritativeModelId!==model.id) throw new Error('Overlay does not belong to source model'); return buildApprovalPackage(projectId,model,overlay); }
}
