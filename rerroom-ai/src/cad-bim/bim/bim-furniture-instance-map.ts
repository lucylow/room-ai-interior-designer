import { AuthoritativeModel } from '../core/types';
import { LayoutPlan, Zone, ProjectWorkspaceState } from '../planning/types';

export interface BIMFurnitureInstanceMapResult {
  id:string; score:number; summary:string; warnings:string[]; rows:Array<Record<string,string|number|boolean>>; 
}

export class BIMFurnitureInstanceMap {
  build(model:AuthoritativeModel,plan?:LayoutPlan,zones:Zone[]=[],_workspace?:ProjectWorkspaceState):BIMFurnitureInstanceMapResult {
    const warnings:string[]=[]; const rows:Array<Record<string,string|number|boolean>>=[];
    const sourceCount=model.features.length; const placementCount=plan?.placements.length||0; const zoneCount=zones.length;
    const anchored=model.features.filter(f=>f.authority==='authoritative').length;
    if(!anchored) warnings.push('No authoritative source features are available.');
    if(!plan) warnings.push('No layout plan selected.');
    for(const f of model.features.slice(0,24)) rows.push({id:f.id,kind:f.kind,authority:f.authority,level:f.levelId||'level-1'});
    for(const z of zones.slice(0,12)) rows.push({id:z.id,zone:z.name,priority:z.priority,area:z.preferredAreaM2});
    for(const p of (plan?.placements||[]).slice(0,20)) rows.push({id:p.id,furniture:p.furnitureId,score:Number(p.score.toFixed(3)),conflicts:p.conflicts.length});
    const score=Math.max(0,Math.min(1,.35*(anchored/Math.max(1,sourceCount))+.3*(placementCount?Math.min(1,placementCount/8):.2)+.2*(zoneCount?Math.min(1,zoneCount/5):.2)+.15*(warnings.length?0.5:1)));
    return {id:`$BIMFurnitureInstanceMap-`+model.id,score,summary:'$Links furniture concepts to existing or proposed BIM instance references.',warnings,rows};
  }
}
