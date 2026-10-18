import { FurnitureSpec, PlacementCandidate, PlanPoint, Zone } from '../planning/types';
import { metersToMillimeters } from '../core/units';

export interface CandidateGridOptions { stepM:number; rotations:number[]; marginM:number; maxCandidates:number; }

function inside(poly:PlanPoint[], x:number, z:number):boolean{
  let hit=false; for(let i=0,j=poly.length-1;i<poly.length;j=i++){
    const a=poly[i],b=poly[j]; if(((a.z>z)!==(b.z>z)) && x < (b.x-a.x)*(z-a.z)/(b.z-a.z)+a.x) hit=!hit;
  } return hit;
}

export function generateGridCandidates(furniture:FurnitureSpec, zone:Zone, opts:CandidateGridOptions):PlacementCandidate[]{
  const minX=Math.min(...zone.polygon.map(p=>p.x))+opts.marginM; const maxX=Math.max(...zone.polygon.map(p=>p.x))-furniture.dimensions.width-opts.marginM;
  const minZ=Math.min(...zone.polygon.map(p=>p.z))+opts.marginM; const maxZ=Math.max(...zone.polygon.map(p=>p.z))-furniture.dimensions.depth-opts.marginM;
  const out:PlacementCandidate[]=[]; let idx=0;
  for(let x=minX;x<=maxX && out.length<opts.maxCandidates;x+=opts.stepM){
    for(let z=minZ;z<=maxZ && out.length<opts.maxCandidates;z+=opts.stepM){
      const cX=x+furniture.dimensions.width/2,cZ=z+furniture.dimensions.depth/2;
      if(!inside(zone.polygon,cX,cZ)) continue;
      for(const rotationY of opts.rotations){
        out.push({id:`cand-${furniture.id}-${idx++}`,furnitureId:furniture.id,position:{x:cX,y:furniture.dimensions.height/2,z:cZ},rotationY,score:0,feasibility:1,objectives:{distanceToCenter:0,circulation:0,visibility:0,wallFit:0,zoneFit:1},conflicts:[],reasons:[`Grid candidate snapped every ${metersToMillimeters(opts.stepM)}mm.`]});
        if(out.length>=opts.maxCandidates) break;
      }
    }
  }
  return out;
}
