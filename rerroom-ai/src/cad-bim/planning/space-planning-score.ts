import { PlacementCandidate, Zone } from './types';

export interface SpacePlanningScore { total:number; circulation:number; adjacency:number; usability:number; balance:number; visibility:number; density:number; issues:string[]; }

export function scorePlan(placements:PlacementCandidate[], zones:Zone[]):SpacePlanningScore {
  const issues:string[]=[]; const assigned=new Map<string,number>();
  for(const z of zones) assigned.set(z.type,0);
  let collisions=0, clear=0, visibility=0;
  for(const p of placements){
    const conflict=p.conflicts.length; collisions += conflict;
    clear += Math.max(0,p.feasibility);
    visibility += p.objectives.visibility ?? 0;
  }
  const circulation=placements.length?Math.max(0,1-collisions/(placements.length*2)):.5;
  const density=zones.length?Math.min(1,placements.length/(zones.length*4)):.2;
  const usability=placements.length?clear/placements.length:.4;
  const balance=Math.max(0,1-Math.abs(.5-density));
  const adjacency=Math.min(1,zones.filter(z=>z.priority>=20).length/4);
  if(collisions) issues.push(`${collisions} placement conflict(s) should be resolved.`);
  if(circulation<.65) issues.push('Circulation is constrained around the primary furniture path.');
  if(density>.9) issues.push('Furniture density may feel visually crowded.');
  const total=.27*circulation+.20*adjacency+.22*usability+.15*balance+.11*(visibility/Math.max(1,placements.length))+.05*density;
  return {total:Math.max(0,Math.min(1,total)),circulation,adjacency,usability,balance,visibility:Math.max(0,Math.min(1,visibility/Math.max(1,placements.length))),density,issues};
}
