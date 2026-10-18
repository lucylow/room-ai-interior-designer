import { RemodelProject, DesignOverlay, ConceptElement } from '../core/types';
import { LayoutPlan, QuickRevisionRequest } from '../planning/types';
import { parseQuickRevision } from './quick-revision-parser';
export interface QuickRevisionResult { overlay:DesignOverlay; layout?:LayoutPlan; notes:string[]; preservedFeatureIds:string[]; changedElementIds:string[]; }
export class QuickRevisionEngine {
 apply(project:RemodelProject,req:QuickRevisionRequest,current:DesignOverlay,layout?:LayoutPlan):QuickRevisionResult{
  const parsed=parseQuickRevision(req); const changed:string[]=[]; const next:ConceptElement[]=current.elements.map(e=>{let n={...e};
   if(parsed.changes.some(c=>c.kind==='material-change')) n={...n,appearance:{...n.appearance,material:'warmer-oak'},reasoning:n.reasoning+' Refined for warmer material.'};
   if(parsed.changes.some(c=>c.kind==='color-change')) n={...n,appearance:{...n.appearance,color:'soft-amber'},reasoning:n.reasoning+' Refined for requested color.'};
   if(parsed.changes.some(c=>c.kind==='resize')) n={...n,transformDelta:{...n.transformDelta,scale:{x:.93,y:.93,z:.93}},reasoning:n.reasoning+' Slightly reduced scale.'};
   if(n!==e) changed.push(e.id); return n;
  });
  const overlay={...current,id:`${current.id}-r${current.version+1}`,parentOverlayId:current.id,version:current.version+1,createdAt:new Date().toISOString(),createdBy:'ai' as const,elements:next,isApproved:false};
  return {overlay,layout,notes:[...parsed.changes.map(c=>`Applied ${c.kind}: ${c.value}`),parsed.preserve.length?'Authoritative anchors preserved.':'No explicit preservation flag.'],preservedFeatureIds:project.authoritativeModel.features.map(f=>f.id),changedElementIds:changed};
 }
}
