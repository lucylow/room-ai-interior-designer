import { AuthoritativeModel } from '../core/types';
import { RoomContext, UserPreferences } from '../../core/types';
import { FurnitureSpec, LayoutPlan, Zone } from '../planning/types';
import { LayoutOptimizer } from '../layout/layout-optimizer';
import { scorePlan } from '../planning/space-planning-score';

export interface SpacePlanningAdvice { headline:string; plans:LayoutPlan[]; insights:string[]; warnings:string[]; dataConfidence:number; }
export class SpacePlanningAdvisor {
 advise(model:AuthoritativeModel,room:RoomContext,prefs:UserPreferences,zones:Zone[],catalog:FurnitureSpec[],count=4):SpacePlanningAdvice{
  const warnings:string[]=[]; const insights:string[]=[];
  if(room.measurements.confidence<.7) warnings.push('Room dimensions have limited confidence; confirm source data before construction use.');
  const optimizer=new LayoutOptimizer(); const plans=optimizer.optimize({model,roomType:room.roomType,goal:prefs.priorities.join(', '),preserveFeatureIds:model.features.map(f=>f.id),budget:prefs.budgetMax},room,zones,catalog,count);
  if(plans[0]){const s=scorePlan(plans[0].placements,zones);insights.push(`Top plan circulation signal: ${(s.circulation*100).toFixed(0)}%.`);insights.push(`Top plan usability signal: ${(s.usability*100).toFixed(0)}%.`);if(s.issues.length)insights.push(...s.issues);}
  const dataConfidence=.5*room.measurements.confidence+.3*(model.features.length?1:0)+.2*(zones.length?1:0);
  return {headline:'AI generated space-planning options grounded in the imported room model.',plans,insights,warnings,dataConfidence:Math.max(0,Math.min(1,dataConfidence))};
 }
}
