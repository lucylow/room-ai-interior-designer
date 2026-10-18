import { RemodelProject, HandoffPackage } from '../core/types';

export interface ChecklistItem { id:string; stage:'import'|'plan'|'design'|'review'|'approval'|'handoff'; title:string; done:boolean; blocker?:string; }
export interface RemodelChecklist { projectId:string; completion:number; items:ChecklistItem[]; blockers:string[]; nextBestAction:string; }
export function buildRemodelChecklist(project:RemodelProject,handoff?:HandoffPackage):RemodelChecklist{
 const items:ChecklistItem[]=[
  {id:'source',stage:'import',title:'Authoritative CAD/BIM source attached',done:Boolean(project.authoritativeModel?.id)},
  {id:'rooms',stage:'plan',title:'Room geometry reviewed',done:project.status!=='draft'},
  {id:'layout',stage:'plan',title:'Furniture layout approved',done:Boolean(project.activeOverlayId)},
  {id:'concept',stage:'design',title:'Aesthetic concept refined',done:project.status==='approved'||project.status==='handoff-ready'},
  {id:'review',stage:'review',title:'Client review completed',done:project.status==='approved'||project.status==='handoff-ready'},
  {id:'handoff',stage:'handoff',title:'Construction handoff generated',done:Boolean(handoff?.id)}
 ];
 const blockers=items.filter(i=>!i.done).map(i=>i.title); const completion=items.filter(i=>i.done).length/items.length;
 return {projectId:project.id,completion,items,blockers,nextBestAction:blockers[0]||'Ready for final release review'};
}
