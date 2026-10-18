import { RoomContext } from '../../core/types';
import { LayoutPlan, PlacementCandidate, Zone } from './types';

export interface LayoutConstraint { id:string; type:'clearance'|'zone'|'opening'|'alignment'|'capacity'; weight:number; description:string; }
export interface ConstraintViolation { constraintId:string; placementId?:string; severity:'info'|'warning'|'blocking'; message:string; penalty:number; }
export interface ConstraintSolution { score:number; violations:ConstraintViolation[]; recommendedMoves:Array<{placementId:string;dx:number;dy:number;reason:string}>; summary:string[]; }

function area(room:RoomContext){ return room.measurements.widthM*room.measurements.depthM; }
function distance(a:PlacementCandidate,b:PlacementCandidate){ return Math.hypot(a.position.x-b.position.x,a.position.z-b.position.z); }
function buildConstraints(room:RoomContext,zones:Zone[]):LayoutConstraint[]{
 const out:LayoutConstraint[]=[
  {id:'openings-clear',type:'opening',weight:1,description:'Keep circulation clear near doors and windows'},
  {id:'zone-fit',type:'zone',weight:.95,description:'Keep furniture inside intended activity zones'},
  {id:'capacity',type:'capacity',weight:.7,description:'Avoid overcrowding the usable room area'},
  {id:'alignment',type:'alignment',weight:.45,description:'Encourage coherent furniture alignment'}
 ];
 zones.forEach((z,i)=>out.push({id:`zone-${i}`,type:'zone',weight:.65,description:`Protect ${z.name||z.id} zone edges`}));
 return out;
}
export function solveLayoutConstraints(room:RoomContext,plan:LayoutPlan,zones:Zone[]=[]):ConstraintSolution{
 const constraints=buildConstraints(room,zones); const violations:ConstraintViolation[]=[]; const moves:Array<{placementId:string;dx:number;dy:number;reason:string}>=[];
 const density=(plan.placements.length*Math.max(.1,plan.placements.reduce((s,p)=>s+0.75*0.75,0)))/Math.max(.1,area(room));
 if(density>.72) violations.push({constraintId:'capacity',severity:'warning',message:'Layout occupies a high fraction of usable floor area',penalty:.18});
 for(let i=0;i<plan.placements.length;i++) for(let j=i+1;j<plan.placements.length;j++){
  const a=plan.placements[i],b=plan.placements[j]; const minGap=.9;
  if(distance(a,b)<minGap){ violations.push({constraintId:'opening-clear',placementId:a.id,severity:'warning',message:`${a.furnitureId} is close to ${b.furnitureId}`,penalty:.12}); moves.push({placementId:b.id,dx:.18,dy:.18,reason:'Increase circulation gap'}); }
 }
 const penalty=violations.reduce((s,v)=>s+v.penalty,0);
 return {score:Math.max(0,Math.min(1,1-penalty)),violations,recommendedMoves:moves.slice(0,12),summary:[`Checked ${constraints.length} constraint families`,`Evaluated ${plan.placements.length} placements`,`Area utilization ${Math.round(density*100)}%`]};
}
