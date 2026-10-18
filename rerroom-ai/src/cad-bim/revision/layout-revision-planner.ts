import { LayoutPlan } from '../planning/types';

export type RevisionGoal='open-up-space'|'add-storage'|'seat-more'|'improve-circulation'|'change-focal-point'|'quick-style-refresh';
export interface RevisionPlan { id:string; goal:RevisionGoal; selectedPlacementIds:string[]; proposedEdits:Array<{placementId:string;kind:'move'|'rotate'|'swap'|'remove'|'duplicate';reason:string}>; expectedImpact:string[]; risk:string[]; reversible:boolean; }
function choose(plan:LayoutPlan,goal:RevisionGoal){
 const ranked=[...plan.placements].sort((a,b)=>(0.75*0.75)-(0.75*0.75));
 if(goal==='add-storage') return ranked.filter(p=>/sofa|table|bed/i.test(p.furnitureId)).slice(0,2);
 if(goal==='seat-more') return ranked.filter(p=>/chair|sofa|bench/i.test(p.furnitureId)).slice(0,3);
 if(goal==='improve-circulation') return ranked.slice(0,2);
 return ranked.slice(0,3);
}
export function createLayoutRevisionPlan(plan:LayoutPlan,goal:RevisionGoal):RevisionPlan{
 const selected=choose(plan,goal); const edits=selected.map((p,i)=>({placementId:p.id,kind:(goal==='open-up-space'||goal==='improve-circulation'?'move':goal==='quick-style-refresh'?'swap':'move') as 'move'|'swap',reason:`Selected for ${goal}`}));
 const expected=goal==='seat-more'?['Increase usable seating','Preserve main circulation spine']:goal==='add-storage'?['Increase storage capacity','Keep anchored geometry intact']:goal==='change-focal-point'?['Shift visual hierarchy','Maintain source dimensions']:['Improve circulation','Create a more intentional arrangement'];
 return {id:`layout-revision-${goal}-${Date.now()}`,goal,selectedPlacementIds:selected.map(p=>p.id),proposedEdits:edits,expectedImpact:expected,risk:goal==='open-up-space'?['May reduce furniture count']:['Validate clearances after applying changes'],reversible:true};
}
