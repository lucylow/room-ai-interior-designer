import { AuthoritativeModel, DesignOverlay, HandoffPackage } from '../core/types';
import { buildDimensionReport } from './dimension-report';
import { buildFinishSchedule } from './finish-schedule';
import { computePlanningQuantities } from '../bim/quantity-engine';
export function buildApprovalPackage(projectId:string,model:AuthoritativeModel,overlay:DesignOverlay):HandoffPackage{
  const dimensions=buildDimensionReport(model);const q=computePlanningQuantities(model);const schedules={finishes:buildFinishSchedule(model,overlay) as unknown as Array<Record<string,string|number|null>>,quantities:q.items.map(i=>({id:i.id,label:i.label,category:i.category,quantity:i.quantity??1}))};const warnings=['AI aesthetic concepts are not a substitute for engineering, permit, code, or field verification.','Source CAD/BIM dimensions are preserved; AI overlays do not rewrite authoritative geometry.','Any derived or estimated quantity must be verified before construction.'];return {id:`handoff_${Date.now()}`,projectId,sourceModelRevision:model.importedRevision,approvedOverlayId:overlay.id,dimensions,items:q.items,schedules,warnings};
}
