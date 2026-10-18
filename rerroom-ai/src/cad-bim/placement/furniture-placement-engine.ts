import { AuthoritativeModel } from '../core/types';
import { RoomContext, RoomObject } from '../../core/types';
import { FurnitureSpec, LayoutPlan, PlanningContext, PlacementCandidate, Zone } from '../planning/types';
import { generateGridCandidates } from './candidate-grid';
import { detectCandidateConflicts } from './collision-engine';
import { evaluatePlacement } from './placement-objective';

export class FurniturePlacementEngine {
  propose(ctx:PlanningContext, room:RoomContext, zones:Zone[], catalog:FurnitureSpec[], preferredKinds:string[]=[]):LayoutPlan {
    const placements:PlacementCandidate[]=[]; const existing=room.objects.map((o:RoomObject)=>({placement:{id:o.id,furnitureId:o.id,position:o.position,rotationY:o.rotationY,score:1,feasibility:1,objectives:{},conflicts:[],reasons:['Existing source object']},spec:{id:o.id,name:o.label,category:o.type,dimensions:o.size,clearance:{front:.6,back:.15,left:.2,right:.2},tags:o.styleTags||[],roomTypes:[room.roomType]}} as const));
    zones.forEach((zone,zi)=>{
      const pool=catalog.filter(item=>item.roomTypes.includes(ctx.roomType) || preferredKinds.includes(item.category));
      const chosen=pool.slice(zi%2,zi%2+2); if(!chosen.length) return;
      for(const spec of chosen){
        const candidates=generateGridCandidates(spec,zone,{stepM:.45,rotations:spec.rotatable===false?[0]:[0,Math.PI/2],marginM:.12,maxCandidates:18});
        let best:PlacementCandidate|undefined;
        for(const c of candidates){
          const conflicts=detectCandidateConflicts(c,spec,existing as any); const scored=evaluatePlacement({...c,conflicts},spec,zone,{circulation:.32,zoneFit:.2,visibility:.16,wallFit:.1,balance:.12,access:.1});
          if(!best || scored.score>best.score) best=scored;
        }
        if(best) placements.push(best);
      }
    });
    const score=placements.length?placements.reduce((a,p)=>a+p.score,0)/placements.length:.25;
    return {id:`plan-${ctx.model.id}-${Date.now()}`,name:`${ctx.roomType} smart layout`,roomId:room.roomId,zoneIds:zones.map(z=>z.id),placements,score,circulationScore:Math.max(.5,score),visibilityScore:Math.min(1,score+.1),usabilityScore:Math.max(.45,score+.08),styleScore:.82,confidence:room.naturalLightScore>.4?.87:.74,createdAt:new Date().toISOString()};
  }
}
