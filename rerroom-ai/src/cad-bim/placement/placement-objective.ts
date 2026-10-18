import { FurnitureSpec, PlacementCandidate, Zone } from '../planning/types';

export interface PlacementObjectiveWeights { circulation:number; zoneFit:number; visibility:number; wallFit:number; balance:number; access:number; }
export function evaluatePlacement(p:PlacementCandidate,spec:FurnitureSpec,zone:Zone,weights:PlacementObjectiveWeights):PlacementCandidate{
  const centerX=(Math.min(...zone.polygon.map(q=>q.x))+Math.max(...zone.polygon.map(q=>q.x)))/2;
  const centerZ=(Math.min(...zone.polygon.map(q=>q.z))+Math.max(...zone.polygon.map(q=>q.z)))/2;
  const dist=Math.hypot(p.position.x-centerX,p.position.z-centerZ);
  const maxDist=Math.max(1,Math.hypot(zone.maxAreaM2,zone.maxAreaM2));
  const centerScore=Math.max(0,1-dist/maxDist); const visibility=Math.max(0,1-Math.abs(p.position.z-centerZ)/Math.max(1,zone.polygon.length));
  const zoneFit=zone.preferredAreaM2>0?Math.min(1,(spec.dimensions.width*spec.dimensions.depth)/zone.preferredAreaM2):.5;
  const wallFit=spec.preferredWallKinds?.length?0.65:.35; const access=Math.max(0,1-p.conflicts.length*.35);
  const score=weights.circulation*.8+weights.zoneFit*zoneFit+weights.visibility*visibility+weights.wallFit*wallFit+weights.balance*centerScore+weights.access*access;
  return {...p,score:Math.max(0,Math.min(1,score)),feasibility:access,objectives:{...p.objectives,centerScore,visibility,zoneFit,wallFit,access}};
}
