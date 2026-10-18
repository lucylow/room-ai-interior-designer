import { FurnitureSpec, PlacementCandidate, Zone } from '../planning/types';

export interface FocalpointscoreFactors {
  roomWidth:number; roomDepth:number; openingPenalty?:number; viewBias?:number; activityBias?:number; anchorBias?:number;
}
export function focalPointScore(candidate:PlacementCandidate,spec:FurnitureSpec,zone:Zone,factors:FocalpointscoreFactors):number {
  const cx=(Math.min(...zone.polygon.map(p=>p.x))+Math.max(...zone.polygon.map(p=>p.x)))/2;
  const cz=(Math.min(...zone.polygon.map(p=>p.z))+Math.max(...zone.polygon.map(p=>p.z)))/2;
  const center=Math.max(0,1-Math.hypot(candidate.position.x-cx,candidate.position.z-cz)/Math.max(1,Math.hypot(factors.roomWidth,factors.roomDepth)));
  const open=1-(factors.openingPenalty??0); const view=factors.viewBias??.5; const activity=factors.activityBias??.5; const anchor=factors.anchorBias??.5;
  return Math.max(0,Math.min(1, .28*center+.16*open+.16*view+.14*activity+.12*anchor+.14*(candidate.conflicts.length?0:.85)));
}
