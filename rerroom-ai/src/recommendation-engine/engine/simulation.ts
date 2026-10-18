import type {RoomContext,Scenario,RoomObject,Recommendation} from '../core/types';
import {footprint,roomRect,contains,pairwiseOverlap} from '../core/geometry';
export interface SimulationResult {scenarioId:string;valid:boolean;circulation:number;overlap:number;boundaryViolations:number;notes:string[];deltaScore:number;}
const cloneObjects=(room:RoomContext):RoomObject[]=>room.objects.map(o=>({...o,position:{...o.position},size:{...o.size}}));
export const simulate=(room:RoomContext,scenario:Scenario):SimulationResult=>{
 const objects=cloneObjects(room);const notes:string[]=[];
 for(const d of scenario.deltas){const target=d.objectId?objects.find(o=>o.id===d.objectId):undefined;
  if(d.remove&&target){target.locked=true;target.position.x=999;target.position.z=999;continue;}
  if(target){target.position.x+=d.moveX??0;target.position.z+=d.moveZ??0;target.rotationY+=d.rotate??0;const s=d.scale??1;target.size.width*=s;target.size.depth*=s;}
 }
 const testRoom={...room,objects};const rect=roomRect(room);const boundaryViolations=objects.filter(o=>!o.locked&&!contains(rect,footprint(o))).length;
 const overlap=pairwiseOverlap(testRoom);const circulation=Math.max(0,room.circulationScore-boundaryViolations*.18-overlap*.35);
 if(boundaryViolations)notes.push(`${boundaryViolations} object(s) extend outside the room.`);if(overlap>.08)notes.push('The simulated arrangement introduces object overlap.');if(circulation<.45)notes.push('The simulated arrangement may feel constrained.');
 return {scenarioId:scenario.id,valid:boundaryViolations===0&&overlap<.1,circulation,overlap,boundaryViolations,notes,deltaScore:circulation-room.circulationScore};
};
export const simulateRecommendation=(room:RoomContext,r:Recommendation):SimulationResult=>simulate(room,{id:`scenario-${r.id}`,name:r.title,description:r.summary,deltas:r.actions.filter(a=>a.targetId).map(a=>({objectId:a.targetId,moveX:Number(a.payload.x??0),moveZ:Number(a.payload.z??0),rotate:Number(a.payload.rotation??0)})),expectedOutcome:r.summary});
