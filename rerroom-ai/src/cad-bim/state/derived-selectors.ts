import { ProjectWorkspaceState, LayoutPlan, ViewMode } from '../planning/types';
type WorkspaceAction={type:'select';ids:string[]}|{type:'set-view';mode:ViewMode}|{type:'set-active-plan';id:string}|{type:'add-plan';plan:LayoutPlan};
export class DerivedSelectors {
 apply(state:ProjectWorkspaceState,action:WorkspaceAction):ProjectWorkspaceState{
  switch(action.type){
   case 'select': return {...state,selectedIds:[...action.ids]};
   case 'set-view': return {...state,viewMode:action.mode};
   case 'set-active-plan': return {...state,activePlanId:action.id};
   case 'add-plan': return {...state,plans:[...state.plans,action.plan],activePlanId:action.plan.id};
   default: return state;
  }
 }
 summary(state:ProjectWorkspaceState):{title:string;value:string;notes:string[]}[]{
  const plan=state.plans.find(p=>p.id===state.activePlanId); const notes:string[]=[];
  if(!plan) notes.push('Choose a plan to begin.'); if(state.selectedIds.length) notes.push(`${state.selectedIds.length} item(s) selected.`);
  return [{title:'Calculates active plan, selected placements, room summary, and review state.',value:plan?.name||'No active plan',notes}];
 }
}
