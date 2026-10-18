import { ProjectArtifact, ProjectActivity, ProjectMember, ProjectMilestone, ProjectTask, ProjectWorkspaceState } from '../planning/types';

export interface ActivityFeedResult { id:string; title:string; score:number; warnings:string[]; items:string[]; metadata:Record<string,string|number|boolean>; }

export class ActivityFeed {
 run(state:ProjectWorkspaceState):ActivityFeedResult {
   const warnings:string[]=[]; const items:string[]=[];
   const tasks=state.tasks; const artifacts=state.artifacts; const activities=state.activities;
   const {project}=state;
   const done=tasks.filter(t=>t.status==='done').length; const blocked=tasks.filter(t=>t.status==='blocked').length;
   if(blocked>0) warnings.push(`${blocked} blocked task(s).`);
   if(!state.activePlanId) warnings.push('No active layout plan selected.');
   if(project.status!=='approved' && project.status!=='handoff-ready') warnings.push('Client approval is not yet frozen.');
   tasks.slice(0,12).forEach(t=>items.push(t.title)); artifacts.slice(0,10).forEach(a=>items.push(a.name)); activities.slice(-5).forEach(a=>items.push(a.message));
   const score=Math.max(0,Math.min(1,.45*(tasks.length?done/Math.max(1,tasks.length):.3)+.25*(artifacts.length?1:.2)+.2*(blocked?0:.9)+.1*(project.status==='approved'||project.status==='handoff-ready'?1:.5)));
   return {id:`${project.id}-project-tool`,title:'$Produces a compact chronological activity feed.',score,warnings,items,metadata:{tasks:tasks.length,artifacts:artifacts.length,activities:activities.length,members:state.members.length,milestones:state.milestones.length}};
 }
}
