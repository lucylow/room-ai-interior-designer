import { AnchorReference, AuthoritativeModel, RemodelProject, Size3, Vec3 } from '../core/types';
import { RoomType } from '../../core/types';

export type ZoneType = 'living'|'circulation'|'dining'|'work'|'sleep'|'storage'|'service'|'entry'|'activity'|'buffer';
export type PlacementIntent = 'functional'|'aesthetic'|'storage'|'circulation'|'view'|'lighting'|'accessibility';
export type ViewMode = 'plan'|'perspective'|'orthographic'|'section'|'elevation'|'orbit';
export type RevisionKind = 'layout'|'furniture'|'finish'|'lighting'|'camera'|'annotation'|'project';

export interface PlanPoint { x:number; z:number; }
export interface PlanRect { x:number; z:number; width:number; depth:number; }
export interface Zone {
  id:string; name:string; type:ZoneType; polygon:PlanPoint[]; priority:number;
  minAreaM2:number; preferredAreaM2:number; maxAreaM2:number; colorKey:string;
  notes:string[];
}
export interface FurnitureSpec {
  id:string; name:string; category:string; dimensions:Size3; clearance:{front:number;back:number;left:number;right:number};
  tags:string[]; roomTypes:RoomType[]; anchors?:AnchorReference[]; price?:number; weight?:number;
  stackable?:boolean; wallMounted?:boolean; rotatable?:boolean; preferredWallKinds?:string[];
}
export interface PlacementCandidate {
  id:string; furnitureId:string; position:Vec3; rotationY:number; score:number; feasibility:number;
  objectives:Record<string,number>; conflicts:string[]; reasons:string[]; anchor?:AnchorReference;
}
export interface LayoutPlan {
  id:string; name:string; roomId:string; zoneIds:string[]; placements:PlacementCandidate[];
  score:number; circulationScore:number; visibilityScore:number; usabilityScore:number;
  styleScore:number; confidence:number; createdAt:string; parentPlanId?:string;
}
export interface RevisionSnapshot {
  id:string; projectId:string; parentId?:string; label:string; createdAt:string; author:'ai'|'designer'|'client';
  modelRevision:string; overlayId?:string; layoutPlanId?:string; note:string; payloadHash:string;
}
export interface QuickRevisionRequest {
  id:string; prompt:string; createdAt:string; currentPlanId?:string; currentOverlayId?:string;
  targetIds:string[]; preserveAnchors:boolean; requestedMode:'micro'|'normal'|'major';
}
export interface ProjectArtifact {
  id:string; projectId:string; type:'cad'|'bim'|'render'|'plan'|'revision'|'schedule'|'note'|'approval';
  name:string; version:number; status:'draft'|'review'|'approved'|'archived'; createdAt:string; checksum:string; tags:string[];
}
export interface ProjectTask {
  id:string; projectId:string; title:string; ownerRole:'designer'|'architect'|'client'|'contractor'|'system';
  status:'todo'|'in-progress'|'blocked'|'done'; priority:'low'|'medium'|'high'; dueDay:number; linkedIds:string[];
}
export interface ProjectMilestone { id:string; projectId:string; name:string; status:'upcoming'|'active'|'complete'; day:number; requiredTaskIds:string[]; }
export interface ProjectMember { id:string; projectId:string; name:string; role:'designer'|'architect'|'client'|'contractor'|'observer'; initials:string; }
export interface ProjectActivity { id:string; projectId:string; day:number; kind:'import'|'layout'|'revision'|'comment'|'approval'|'handoff'|'task'; message:string; actor:string; linkedIds:string[]; }
export interface ProjectWorkspaceState {
  project: RemodelProject; zones:Zone[]; furniture:FurnitureSpec[]; plans:LayoutPlan[]; activePlanId?:string;
  revisions:RevisionSnapshot[]; tasks:ProjectTask[]; milestones:ProjectMilestone[]; members:ProjectMember[]; artifacts:ProjectArtifact[];
  activities:ProjectActivity[]; viewMode:ViewMode; selectedIds:string[];
}

export interface PlanningContext { model:AuthoritativeModel; roomType:RoomType; goal:string; preserveFeatureIds:string[]; budget?:number; }

export function rectPolygon(rect:PlanRect):PlanPoint[] {
  return [{x:rect.x,z:rect.z},{x:rect.x+rect.width,z:rect.z},{x:rect.x+rect.width,z:rect.z+rect.depth},{x:rect.x,z:rect.z+rect.depth}];
}
export function areaOfPolygon(points:PlanPoint[]):number {
  if(points.length < 3) return 0;
  let sum = 0;
  for(let i=0;i<points.length;i++){ const a=points[i]; const b=points[(i+1)%points.length]; sum += a.x*b.z-b.x*a.z; }
  return Math.abs(sum)/2;
}
