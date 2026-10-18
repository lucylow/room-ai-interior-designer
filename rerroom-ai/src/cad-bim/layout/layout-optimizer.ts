import { FurniturePlacementEngine } from '../placement/furniture-placement-engine';
import { PlanningContext, FurnitureSpec, LayoutPlan, Zone } from '../planning/types';
import { RoomContext } from '../../core/types';
import { scorePlan } from '../planning/space-planning-score';

export class LayoutOptimizer {
  optimize(ctx:PlanningContext,room:RoomContext,zones:Zone[],catalog:FurnitureSpec[],variants=5):LayoutPlan[]{
    const engine=new FurniturePlacementEngine(); const results:LayoutPlan[]=[];
    for(let i=0;i<variants;i++){
      const shuffled=[...catalog].sort((a,b)=>(a.id.charCodeAt(i%a.id.length)-b.id.charCodeAt(i%b.id.length)));
      const plan=engine.propose(ctx,room,zones,shuffled);
      const score=scorePlan(plan.placements,zones);
      results.push({...plan,score:score.total,circulationScore:score.circulation,usabilityScore:score.usability,visibilityScore:score.visibility,styleScore:.72+i*.025});
    }
    return results.sort((a,b)=>b.score-a.score);
  }
}
