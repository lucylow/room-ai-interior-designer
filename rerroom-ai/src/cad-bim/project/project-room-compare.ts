import { ProjectWorkspaceState, LayoutPlan } from '../planning/types';

export interface ProjectRoomCompareResult { id:string; score:number; title:string; warnings:string[]; items:string[]; }
export function buildProjectRoomCompare(state:ProjectWorkspaceState):ProjectRoomCompareResult {
 const warnings:string[]=[]; const items:string[]=[];
 const planCount=state.plans.length, taskCount=state.tasks.length, done=state.tasks.filter(t=>t.status==='done').length;
 if(!state.activePlanId) warnings.push('No active plan selected.');
 if(state.project.status!=='approved' && state.project.status!=='handoff-ready') warnings.push('Project is not yet approved for handoff.');
 state.plans.slice(0,12).forEach((p:LayoutPlan)=>items.push(p.name));
 state.artifacts.slice(0,12).forEach(a=>items.push(a.name));
 const score=Math.max(0,Math.min(1,.35*(planCount?Math.min(1,planCount/4):0)+.2*(taskCount?done/Math.max(1,taskCount):0)+.25*(state.artifacts.length?1:.2)+.2*(warnings.length?0.5:1)));
 return {id:`ProjectRoomCompare-`+state.project.id,score,title:'Compares room readiness and design coverage across a multi-room project.',warnings,items};
}
