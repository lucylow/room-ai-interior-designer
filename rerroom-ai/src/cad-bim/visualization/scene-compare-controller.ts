import { LayoutPlan } from '../planning/types';

export interface SceneCompareState { mode:'split'|'wipe'|'blend'; leftPlanId?:string; rightPlanId?:string; divider:number; labels:boolean; measurements:boolean; camera:'top'|'isometric'|'perspective'; }
export interface SceneDelta { placementAdded:string[]; placementRemoved:string[]; moved:string[]; rotated:string[]; changedCount:number; summary:string[]; }
export function createCompareState(left?:LayoutPlan,right?:LayoutPlan):SceneCompareState{
 return {mode:'split',leftPlanId:left?.id,rightPlanId:right?.id,divider:.5,labels:true,measurements:true,camera:'isometric'};
}
export function compareScenes(left:LayoutPlan,right:LayoutPlan):SceneDelta{
 const lm=new Map(left.placements.map(p=>[p.id,p])); const rm=new Map(right.placements.map(p=>[p.id,p])); const added:string[]=[],removed:string[]=[],moved:string[]=[],rotated:string[]=[];
 for(const [id,p] of rm){ if(!lm.has(id)) added.push(id); else { const a=lm.get(id)!; if(Math.hypot(a.position.x-p.position.x,a.position.z-p.position.z)>.05) moved.push(id); if(Math.abs(a.rotationY-p.rotationY)>.02) rotated.push(id); } }
 for(const id of lm.keys()) if(!rm.has(id)) removed.push(id);
 return {placementAdded:added,placementRemoved:removed,moved,rotated,changedCount:added.length+removed.length+moved.length+rotated.length,summary:[`${added.length} added`,`${removed.length} removed`,`${moved.length} moved`,`${rotated.length} rotated`]};
}
