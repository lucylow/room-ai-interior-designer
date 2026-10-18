import { RoomContext, UserPreferences } from '../../core/types';
import { AuthoritativeModel } from '../core/types';
import { FurnitureSpec, LayoutPlan, Zone } from '../planning/types';
import { LayoutOptimizer } from '../layout/layout-optimizer';
export interface RoomAdvice { roomId:string; layouts:LayoutPlan[]; confidence:number; notes:string[]; }
export interface MultiRoomAdvice { rooms:RoomAdvice[]; sharedStyle:string; warnings:string[]; }
export class MultiRoomSpaceAdvisor {
 advise(rooms:Array<{model:AuthoritativeModel;context:RoomContext;zones:Zone[]}>,prefs:UserPreferences,catalog:FurnitureSpec[]):MultiRoomAdvice{
  const warnings:string[]=[]; const result:RoomAdvice[]=[];
  for(const room of rooms){
   const layouts=new LayoutOptimizer().optimize({model:room.model,roomType:room.context.roomType,goal:prefs.priorities.join(', '),preserveFeatureIds:room.model.features.map(f=>f.id),budget:prefs.budgetMax},room.context,room.zones,catalog,3);
   const confidence=Math.max(.2,Math.min(1,.6*room.context.measurements.confidence+.4*(room.model.features.length?1:.3)));
   if(confidence<.65) warnings.push(`${room.context.name}: confirm source measurements.`);
   result.push({roomId:room.context.roomId,layouts,confidence,notes:[`Generated ${layouts.length} layouts for ${room.context.name}.`,'Source geometry remains authoritative.']});
  }
  const sharedStyle=prefs.preferredStyles[0]||'balanced';
  return {rooms:result,sharedStyle,warnings};
 }
}
